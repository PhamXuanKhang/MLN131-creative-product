/**
 * npm run convert — docs/content.xlsx → src/data/content.json + ảnh + báo cáo.
 * Chạy lại được nhiều lần (idempotent). Cờ: --force-images tải lại toàn bộ ảnh.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseWorkbook } from './parse.mjs'
import { processImages } from './images.mjs'
import { buildReport } from './report.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
const forceImages = process.argv.includes('--force-images')

const xlsxPath = path.join(root, 'docs', 'content.xlsx')
const { events, eraHeaders, skipped } = await parseWorkbook(xlsxPath)

if (events.length === 0 || eraHeaders.length !== 4) {
  console.error(
    `❌ Cấu trúc sheet không như kỳ vọng: ${eraHeaders.length} giai đoạn, ${events.length} sự kiện.`,
  )
  console.error('Header giai đoạn tìm thấy:', eraHeaders)
  process.exit(1)
}

// Overrides thủ công (ảnh cho hàng Category/bài báo, sửa toạ độ...)
const overridesPath = path.join(root, 'scripts', 'convert', 'overrides.json')
const overrides = JSON.parse(readFileSync(overridesPath, 'utf8'))
for (const event of events) {
  const patch = overrides[event.id]
  if (!patch) continue
  const { imageUrl, ...fields } = patch
  if (imageUrl) event._raw.imageUrl = imageUrl
  Object.assign(event, fields)
  // Field đã được override thì không còn tính là thiếu
  event.incomplete = event.incomplete.filter((f) => !(f in fields) || !fields[f])
  if (fields.locations?.length) event.incomplete = event.incomplete.filter((f) => f !== 'locations')
}

console.log(`Đang xử lý ảnh cho ${events.length} sự kiện${forceImages ? ' (--force-images)' : ''}…`)
const { downloaded, cached, failed } = await processImages(events, { root, forceImages })

const ok = events.filter((e) => e.image.full).length
const imageStats = { ok, missing: events.length - ok, downloaded, cached, failed }

// Ghi content.json (strip _raw, bỏ incomplete rỗng)
const jsonEvents = events.map(({ _raw, incomplete, ...rest }) => ({
  ...rest,
  ...(incomplete.length > 0 ? { incomplete } : {}),
}))
const contentPath = path.join(root, 'src', 'data', 'content.json')
writeFileSync(
  contentPath,
  `${JSON.stringify({ sourceFile: 'docs/content.xlsx', eventCount: jsonEvents.length, events: jsonEvents }, null, 2)}\n`,
)

const { markdown, summary } = buildReport({ events, eraHeaders, skipped, imageStats })
writeFileSync(path.join(root, 'docs', 'content-report.md'), markdown)

console.log(`\n✅ ${summary}`)
console.log(`→ ${path.relative(root, contentPath)}`)
console.log(`→ docs/content-report.md (gửi nhóm)`)
if (failed.length > 0) {
  console.log(`\n⚠ ${failed.length} ảnh không tải được — xem docs/content-report.md`)
}
