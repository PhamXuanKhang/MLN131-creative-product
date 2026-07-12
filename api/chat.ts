/**
 * POST /api/chat — Vercel Function (Node), cầu nối DUY NHẤT tới OpenAI.
 * Frontend chỉ gửi { messages }; OPENAI_API_KEY đọc từ Vercel Environment
 * Variables (xem README), không bao giờ xuống trình duyệt.
 *
 * Model khóa cứng gpt-5.4-mini qua Responses API, structured output
 * { answer, refs } — refs là slug sự kiện để UI mở EventPanel.
 * Ngữ cảnh = toàn bộ 33 sự kiện từ content.json (bundle lúc build, ~44KB);
 * prompt ép trả lời tiếng Việt và chỉ dùng dữ liệu bảo tàng.
 *
 * File này nằm ngoài tsconfig của app (Vercel tự compile) nên tự khai báo
 * kiểu tối giản thay vì import từ src/ (tránh phụ thuộc alias @).
 */
import content from '../src/data/content.json'

const MODEL = 'gpt-5.4-mini'
const OPENAI_URL = 'https://api.openai.com/v1/responses'

/** Giới hạn đầu vào — client cũng tự giới hạn, đây là hàng rào thật. */
const MAX_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 4000
const MAX_TOTAL_LENGTH = 20000
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 6
const RATE_LIMIT_TIMEOUT_MS = 3000
const RATE_LIMIT_SCRIPT = `
local count = redis.call("INCR", KEYS[1])
if count == 1 then
  redis.call("PEXPIRE", KEYS[1], ARGV[1])
end
local ttl = redis.call("PTTL", KEYS[1])
return {count, ttl}
`.trim()

interface IncomingMessage {
  role: 'user' | 'assistant'
  content: string
}

interface RateLimitResult {
  allowed: boolean
  resetAt: number
}

// Nhãn giai đoạn — bản sao từ src/data/adapter.ts (ERAS)
const ERA_LABELS: Record<string, string> = {
  birth: 'Sự ra đời của CNXH khoa học (thế kỷ XIX)',
  lenin: 'Thời kỳ V.I. Lênin vận dụng và phát triển (đầu thế kỷ XX)',
  'post-lenin': 'Từ sau khi V.I. Lênin qua đời đến nay (1924 – nay)',
  vietnam: 'Chủ nghĩa xã hội tại Việt Nam (1930 – nay)',
}

const VALID_SLUGS = new Set(content.events.map((ev) => ev.slug))

const MUSEUM_CONTEXT = content.events
  .map((ev) =>
    [
      `[${ev.slug}] ${ev.title}`,
      `Giai đoạn: ${ERA_LABELS[ev.era] ?? ev.era} · Thời gian: ${ev.dateLabel || 'chưa rõ'}`,
      ev.locations?.length
        ? `Địa điểm: ${ev.locations.map((l: { label: string }) => l.label).join('; ')}`
        : '',
      ev.description,
      ev.sources?.length ? `Nguồn: ${ev.sources.join(' ; ')}` : '',
    ]
      .filter(Boolean)
      .join('\n'),
  )
  .join('\n\n---\n\n')

const INSTRUCTIONS = `Bạn là trợ lý hỏi đáp của "Bảo tàng số Chủ nghĩa xã hội khoa học" (môn MLN131, FPT University).

Quy tắc bắt buộc:
- Luôn trả lời bằng tiếng Việt, ngắn gọn, thân thiện, đúng học thuật.
- CHỈ dùng thông tin trong DỮ LIỆU BẢO TÀNG bên dưới. Tuyệt đối không bổ sung kiến thức bên ngoài, không suy diễn thêm mốc thời gian hay nhân vật không có trong dữ liệu.
- Nếu dữ liệu không đủ để trả lời, nói rõ điều đó và gợi ý người xem khám phá các phòng trưng bày (Thế giới, Việt Nam, Trắc nghiệm).
- Trường "refs": liệt kê slug (chuỗi trong ngoặc vuông) của tối đa 3 sự kiện được dùng làm căn cứ; để mảng rỗng nếu câu trả lời không dựa trên sự kiện cụ thể.

DỮ LIỆU BẢO TÀNG (${content.events.length} sự kiện, 4 giai đoạn):

${MUSEUM_CONTEXT}`

const RESPONSE_FORMAT = {
  format: {
    type: 'json_schema',
    name: 'museum_answer',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        answer: { type: 'string' },
        refs: { type: 'array', items: { type: 'string' } },
      },
      required: ['answer', 'refs'],
      additionalProperties: false,
    },
  },
}

function jsonError(status: number, message: string): Response {
  return Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } })
}

function getClientAddress(request: Request): string {
  const forwarded =
    request.headers.get('x-vercel-forwarded-for') ?? request.headers.get('x-forwarded-for')
  const address = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip')?.trim()
  return address || 'unknown'
}

async function consumeRateLimit(address: string): Promise<RateLimitResult> {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!redisUrl || !redisToken) {
    throw new Error('thiếu cấu hình Upstash Redis')
  }

  const response = await fetch(redisUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([
      'EVAL',
      RATE_LIMIT_SCRIPT,
      '1',
      `museum:chat:rate:${address}`,
      String(RATE_LIMIT_WINDOW_MS),
    ]),
    signal: AbortSignal.timeout(RATE_LIMIT_TIMEOUT_MS),
  })
  if (!response.ok) throw new Error(`Upstash Redis trả lỗi ${response.status}`)

  const payload: unknown = await response.json()
  const result = (payload as { result?: unknown }).result
  if (!Array.isArray(result) || result.length !== 2) {
    throw new Error('phản hồi Upstash Redis không hợp lệ')
  }

  const count = Number(result[0])
  const ttl = Number(result[1])
  if (!Number.isFinite(count) || !Number.isFinite(ttl) || ttl < 0) {
    throw new Error('kết quả Upstash Redis không hợp lệ')
  }
  return { allowed: count <= RATE_LIMIT_MAX_REQUESTS, resetAt: Date.now() + ttl }
}

/** Chỉ nhận mảng messages hợp lệ, lượt cuối phải là câu hỏi của người dùng. */
function parseMessages(body: unknown): IncomingMessage[] | null {
  if (typeof body !== 'object' || body === null) return null
  const raw = (body as { messages?: unknown }).messages
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > MAX_MESSAGES) return null
  let total = 0
  const messages: IncomingMessage[] = []
  for (const item of raw) {
    if (typeof item !== 'object' || item === null) return null
    const { role, content: text } = item as { role?: unknown; content?: unknown }
    if (role !== 'user' && role !== 'assistant') return null
    if (typeof text !== 'string' || !text.trim() || text.length > MAX_MESSAGE_LENGTH) return null
    total += text.length
    if (total > MAX_TOTAL_LENGTH) return null
    messages.push({ role, content: text.trim() })
  }
  if (messages[messages.length - 1].role !== 'user') return null
  return messages
}

/** Rút text từ response thô của Responses API (không dùng SDK). */
function extractOutputText(data: unknown): string | null {
  const output = (data as { output?: unknown }).output
  if (!Array.isArray(output)) return null
  for (const item of output) {
    if (item?.type !== 'message' || !Array.isArray(item.content)) continue
    for (const part of item.content) {
      if (part?.type === 'output_text' && typeof part.text === 'string') return part.text
    }
  }
  return null
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'Phương thức không được hỗ trợ.' },
      { status: 405, headers: { Allow: 'POST', 'Cache-Control': 'no-store' } },
    )
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('[api/chat] thiếu OPENAI_API_KEY')
    return jsonError(500, 'Trợ lý chưa được cấu hình trên máy chủ.')
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError(400, 'Yêu cầu không hợp lệ.')
  }
  const messages = parseMessages(body)
  if (!messages) return jsonError(400, 'Câu hỏi trống hoặc quá dài.')

  let rateLimit: RateLimitResult
  try {
    rateLimit = await consumeRateLimit(getClientAddress(request))
  } catch (err) {
    console.error('[api/chat] không kiểm tra được rate limit:', err)
    return Response.json(
      { error: 'Trợ lý tạm thời chưa sẵn sàng, vui lòng thử lại sau.' },
      { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '30' } },
    )
  }
  if (!rateLimit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000))
    return Response.json(
      { error: 'Bạn gửi câu hỏi quá nhanh. Vui lòng thử lại sau ít phút.' },
      {
        status: 429,
        headers: { 'Cache-Control': 'no-store', 'Retry-After': String(retryAfter) },
      },
    )
  }

  let upstream: globalThis.Response
  try {
    upstream = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        instructions: INSTRUCTIONS,
        input: messages,
        text: RESPONSE_FORMAT,
        max_output_tokens: 2000,
      }),
    })
  } catch (err) {
    console.error('[api/chat] lỗi mạng tới OpenAI:', err)
    return jsonError(502, 'Không kết nối được với trợ lý.')
  }

  if (!upstream.ok) {
    // Không trả chi tiết upstream về client (có thể chứa thông tin nhạy cảm)
    console.error('[api/chat] OpenAI trả lỗi', upstream.status, await upstream.text())
    return jsonError(502, 'Trợ lý đang gặp sự cố, vui lòng thử lại sau.')
  }

  try {
    const data: unknown = await upstream.json()
    const text = extractOutputText(data)
    if (!text) throw new Error('không có output_text')
    const parsed: unknown = JSON.parse(text)
    const { answer, refs } = parsed as { answer?: unknown; refs?: unknown }
    if (typeof answer !== 'string' || !answer.trim()) throw new Error('answer rỗng')
    const validRefs = Array.isArray(refs)
      ? refs.filter((slug): slug is string => typeof slug === 'string' && VALID_SLUGS.has(slug))
      : []
    return Response.json({ answer: answer.trim(), refs: validRefs })
  } catch (err) {
    console.error('[api/chat] phản hồi OpenAI không hợp lệ:', err)
    return jsonError(502, 'Trợ lý trả lời không hợp lệ, vui lòng thử lại.')
  }
}
