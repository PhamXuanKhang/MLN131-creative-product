/**
 * Cột B (Thời gian): exceljs trả về Date (ô định dạng ngày), số (serial Excel
 * chưa định dạng) hoặc chuỗi tự do. Chuẩn hoá thành { dateLabel, year }.
 */

const EXCEL_EPOCH_UTC = Date.UTC(1899, 11, 30) // serial 0 = 30/12/1899
const MS_PER_DAY = 86_400_000

/** @param {Date} d */
function formatDMY(d) {
  const dd = String(d.getUTCDate()).padStart(2, '0')
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}/${d.getUTCFullYear()}`
}

/** Năm đại diện = năm ĐẦU TIÊN xuất hiện (khoảng "1848–1895" sort ở đầu khoảng). */
function extractYear(text) {
  const m = /1[89]\d{2}|20\d{2}/.exec(text)
  return m ? Number(m[0]) : 0
}

/**
 * @param {unknown} value  giá trị thô của ô B
 * @returns {{ dateLabel: string, year: number }}
 */
export function parseDateCell(value) {
  if (value instanceof Date) {
    const label = formatDMY(value)
    return { dateLabel: label, year: value.getUTCFullYear() }
  }
  if (typeof value === 'number' && value > 1000 && value < 60000) {
    const d = new Date(EXCEL_EPOCH_UTC + Math.round(value) * MS_PER_DAY)
    const label = formatDMY(d)
    return { dateLabel: label, year: d.getUTCFullYear() }
  }
  const text = String(value ?? '').trim()
  return { dateLabel: text, year: extractYear(text) }
}
