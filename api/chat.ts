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
import content from '../src/data/content.json' with { type: 'json' }

const MODEL = 'gpt-5.4-mini'
const OPENAI_URL = 'https://api.openai.com/v1/responses'

/** Giới hạn đầu vào — client cũng tự giới hạn, đây là hàng rào thật. */
const MAX_MESSAGES = 12
const MAX_MESSAGE_LENGTH = 4000
const MAX_TOTAL_LENGTH = 20000

interface IncomingMessage {
  role: 'user' | 'assistant'
  content: string
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
