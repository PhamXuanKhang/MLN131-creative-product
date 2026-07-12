/**
 * Audit dữ liệu src/data/content.json — chạy SAU npm run convert.
 *   node scripts/content-fixes/audit.mjs          # kiểm tra offline
 *   node scripts/content-fixes/audit.mjs --urls   # kèm kiểm tra HTTP mọi nguồn
 *
 * Lỗi (exit 1): trường rỗng, "[object Object]", dấu câu hỏng (",." ",," " ."…),
 * ngày dính vào nhãn địa điểm, URL sai định dạng / dính utm / "?" cuối,
 * slug trùng, ảnh khai báo nhưng thiếu file, description không có dấu kết câu.
 * Cảnh báo (không fail): title > 80 ký tự.
 */
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const content = JSON.parse(readFileSync(path.join(root, 'src/data/content.json'), 'utf8'))
const checkUrls = process.argv.includes('--urls')

const errors = []
const warnings = []

// [^\S\n]{2,}: bắt khoảng trắng kép cùng dòng, bỏ qua ngắt đoạn \n\n hợp lệ
const BAD_PUNCT = /,\.|,,|;;|\.\.(?!\.)|[^\S\n]{2,}| [,.;:]|\.,/u
const DATE_GLUED = /\d{1,2}\/\d{1,2}\/\d{4}\p{L}/u
const SENTENCE_END = /[.!?…)”"]$/u

const slugSeen = new Map()

for (const ev of content.events) {
  const where = ev.id

  // Trường bắt buộc
  for (const field of ['title', 'description', 'dateLabel', 'slug']) {
    if (!String(ev[field] ?? '').trim()) errors.push(`${where}: trường "${field}" rỗng`)
  }
  if (!ev.sources?.length) errors.push(`${where}: không có nguồn`)
  if (!ev.locations?.length) errors.push(`${where}: không có địa điểm`)
  if (!ev.year) warnings.push(`${where}: year = 0 (không bắt được năm từ "${ev.dateLabel}")`)

  // Slug trùng
  if (slugSeen.has(ev.slug)) errors.push(`${where}: slug trùng với ${slugSeen.get(ev.slug)}`)
  slugSeen.set(ev.slug, where)

  // Chuỗi hiển thị đáng ngờ
  const textFields = [
    ['title', ev.title],
    ['description', ev.description],
    ['dateLabel', ev.dateLabel],
    ...(ev.locations ?? []).map((l, i) => [`locations[${i}].label`, l.label]),
  ]
  for (const [name, value] of textFields) {
    const text = String(value ?? '')
    if (text.includes('[object Object]')) errors.push(`${where}: ${name} chứa "[object Object]"`)
    const bad = BAD_PUNCT.exec(text)
    if (bad) errors.push(`${where}: ${name} có dấu câu bất thường "${bad[0]}" — “…${text.slice(Math.max(0, bad.index - 20), bad.index + 8)}…”`)
    if (DATE_GLUED.test(text)) errors.push(`${where}: ${name} có ngày dính vào chữ — "${text}"`)
  }
  if (ev.description && !SENTENCE_END.test(ev.description.trim())) {
    errors.push(`${where}: description thiếu dấu kết câu — “…${ev.description.trim().slice(-40)}”`)
  }
  if (ev.title.length > 80) warnings.push(`${where}: title dài ${ev.title.length} ký tự`)

  // Nguồn
  for (const src of ev.sources ?? []) {
    let url
    try {
      url = new URL(src)
    } catch {
      errors.push(`${where}: URL sai định dạng — ${src}`)
      continue
    }
    if (!/^https?:$/.test(url.protocol)) errors.push(`${where}: URL không phải http(s) — ${src}`)
    if ([...url.searchParams.keys()].some((k) => k.startsWith('utm_')))
      errors.push(`${where}: URL dính tham số utm — ${src}`)
    if (src.endsWith('?')) errors.push(`${where}: URL thừa "?" cuối — ${src}`)
  }

  // Ảnh khai báo phải tồn tại trên đĩa
  for (const img of [ev.image, ...(ev.images ?? [])]) {
    for (const kind of ['thumb', 'full']) {
      const rel = img?.[kind]
      if (rel && !existsSync(path.join(root, 'public', rel))) {
        errors.push(`${where}: thiếu file ảnh ${rel}`)
      }
    }
  }
}

// Kiểm tra HTTP (tùy chọn) — GET theo redirect, UA trình duyệt vì nhiều báo VN chặn bot
async function checkUrl(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 20000)
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/pdf;q=0.9,*/*;q=0.8',
      },
    })
    return { status: res.status, finalUrl: res.url }
  } catch (err) {
    return { status: 0, error: err.name === 'AbortError' ? 'timeout' : String(err.cause ?? err) }
  } finally {
    clearTimeout(timer)
  }
}

if (checkUrls) {
  const all = content.events.flatMap((ev) => ev.sources.map((src) => ({ id: ev.id, src })))
  console.log(`Kiểm tra HTTP ${all.length} nguồn…`)
  for (const { id, src } of all) {
    const r = await checkUrl(src)
    if (r.status >= 200 && r.status < 400) {
      const note = r.finalUrl && r.finalUrl !== src ? ` → redirect ${r.finalUrl}` : ''
      console.log(`  OK  ${r.status} ${id} ${src}${note}`)
    } else {
      errors.push(`${id}: nguồn không truy cập được (${r.status || r.error}) — ${src}`)
      console.log(`  ERR ${r.status || r.error} ${id} ${src}`)
    }
  }
}

console.log('')
for (const w of warnings) console.log(`⚠ ${w}`)
for (const e of errors) console.log(`✖ ${e}`)
console.log(`\n${content.events.length} sự kiện — ${errors.length} lỗi, ${warnings.length} cảnh báo`)
process.exit(errors.length > 0 ? 1 : 0)
