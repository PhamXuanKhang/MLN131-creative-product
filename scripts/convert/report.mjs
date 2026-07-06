/**
 * Báo cáo thiếu dữ liệu: in console + ghi docs/content-report.md để gửi nhóm.
 */

const FIELD_LABELS = {
  year: 'năm (cột B không có năm)',
  locations: 'toạ độ (cột D)',
  description: 'thông tin đi kèm (cột F)',
  sources: 'nguồn thông tin (cột G)',
  image: 'ảnh minh hoạ (cột H)',
  imageSource: 'nguồn ảnh (cột I)',
}

export function buildReport({ events, eraHeaders, skipped, imageStats }) {
  const byEra = {}
  for (const e of events) byEra[e.era] = (byEra[e.era] ?? 0) + 1

  const withIssues = events.filter((e) => e.incomplete.length > 0)
  const longTitles = events.filter((e) => e.title.length > 80)

  const lines = []
  lines.push('# Báo cáo dữ liệu content.xlsx')
  lines.push('')
  lines.push('> Sinh tự động bởi `npm run convert` — không sửa tay file này.')
  lines.push('')
  lines.push('## Tổng quan')
  lines.push('')
  lines.push(`- Tổng sự kiện: **${events.length}**`)
  for (const h of eraHeaders) {
    lines.push(`- \`${h.era}\` (hàng ${h.row}: "${h.text}"): ${byEra[h.era] ?? 0} sự kiện`)
  }
  lines.push(`- Ảnh: **${imageStats.ok} có** / **${imageStats.missing} thiếu**`)
  if (skipped.length > 0) {
    lines.push(
      `- Hàng bị bỏ qua: ${skipped.map((s) => `hàng ${s.row} (${s.reason}: "${s.text}")`).join('; ')}`,
    )
  }
  lines.push('')

  if (withIssues.length > 0) {
    lines.push('## Sự kiện thiếu dữ liệu')
    lines.push('')
    lines.push('| Hàng | ID | Sự kiện | Thiếu |')
    lines.push('|---|---|---|---|')
    for (const e of withIssues) {
      const missing = e.incomplete.map((f) => FIELD_LABELS[f] ?? f).join('; ')
      const title = e.title.length > 60 ? `${e.title.slice(0, 60)}…` : e.title
      lines.push(`| ${e._raw.row} | \`${e.id}\` | ${title} | ${missing} |`)
    }
    lines.push('')
  }

  const coordIssues = events.filter((e) => e.incomplete.includes('locations') && e._raw.coords)
  if (coordIssues.length > 0) {
    lines.push('## Ô toạ độ không parse được (text gốc)')
    lines.push('')
    for (const e of coordIssues)
      lines.push(`- \`${e.id}\` (hàng ${e._raw.row}): \`${e._raw.coords}\``)
    lines.push('')
  }

  if (imageStats.failed.length > 0) {
    lines.push('## Ảnh không tải được')
    lines.push('')
    lines.push(
      'Điền link ảnh trực tiếp vào cột H của xlsx, hoặc vào `scripts/convert/overrides.json` theo id.',
    )
    lines.push('')
    for (const f of imageStats.failed)
      lines.push(`- \`${f.id}\`: ${f.note} — \`${f.url || '(trống)'}\``)
    lines.push('')
  }

  if (longTitles.length > 0) {
    lines.push('## Tên sự kiện dài (>80 ký tự — cân nhắc rút gọn cột E)')
    lines.push('')
    for (const e of longTitles) lines.push(`- \`${e.id}\` (${e.title.length} ký tự): ${e.title}`)
    lines.push('')
  }

  const summary =
    `${events.length} sự kiện | ` +
    eraHeaders.map((h) => `${h.era} ${byEra[h.era] ?? 0}`).join(' · ') +
    ` | ảnh: ${imageStats.ok} có / ${imageStats.missing} thiếu | ${withIssues.length} sự kiện còn thiếu field`

  return { markdown: `${lines.join('\n')}\n`, summary }
}
