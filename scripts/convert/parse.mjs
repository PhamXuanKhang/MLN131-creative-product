/**
 * Đọc docs/content.xlsx → danh sách event chuẩn hoá (chưa xử lý ảnh).
 * Giai đoạn nhận diện THEO THỨ TỰ hàng header (hàng chỉ có cột A),
 * không match chuỗi tiêu đề — nhóm có thể sửa câu chữ thoải mái.
 */
import ExcelJS from 'exceljs'
import { parseDateCell } from './dates.mjs'
import { parseCoordsCell } from './coords.mjs'

const ERA_ORDER = ['birth', 'lenin', 'post-lenin', 'vietnam']

const COLS = {
  stt: 1,
  date: 2,
  place: 3,
  coords: 4,
  title: 5,
  description: 6,
  sources: 7,
  image: 8,
}

/** Giá trị thô của ô (Date/number/string) — dùng cho cột B. */
function cellRaw(row, col) {
  const v = row.getCell(col).value
  if (v && typeof v === 'object' && !(v instanceof Date)) {
    if (v.richText) return v.richText.map((r) => r.text).join('')
    if (v.result !== undefined) return v.result
    if (v.text !== undefined) return v.text
  }
  return v
}

/** Text của ô; với ô hyperlink ưu tiên URL đích. */
function cellText(row, col, { preferLink = false } = {}) {
  const v = row.getCell(col).value
  if (v == null) return ''
  if (v instanceof Date) return v.toISOString()
  if (typeof v === 'object') {
    if (preferLink && v.hyperlink) return String(v.hyperlink).trim()
    if (v.richText)
      return v.richText
        .map((r) => r.text)
        .join('')
        .trim()
    if (v.text !== undefined) return String(v.text).trim()
    if (v.result !== undefined) return String(v.result).trim()
    if (v.hyperlink) return String(v.hyperlink).trim()
    return ''
  }
  return String(v).trim()
}

export function slugify(text, maxLen = 60) {
  let s = text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, (c) => (c === 'đ' ? 'd' : 'D'))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  if (s.length > maxLen) {
    s = s.slice(0, maxLen)
    const cut = s.lastIndexOf('-')
    if (cut > maxLen * 0.6) s = s.slice(0, cut)
  }
  return s
}


/**
 * @param {string} filePath đường dẫn content.xlsx
 * @returns {Promise<{ events: object[], eraHeaders: {row:number, era:string, text:string}[], skipped: {row:number, reason:string, text:string}[] }>}
 */
export async function parseWorkbook(filePath) {
  const wb = new ExcelJS.Workbook()
  await wb.xlsx.readFile(filePath)
  const ws = wb.worksheets[0]

  const events = []
  const eraHeaders = []
  const skipped = []
  const usedSlugs = new Map()
  let eraIndex = -1
  let orderInEra = 0

  ws.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return // header

    const colA = cellText(row, COLS.stt)
    const place = cellText(row, COLS.place)
    const title = cellText(row, COLS.title)
    const description = cellText(row, COLS.description)

    // Hàng tiêu đề giai đoạn: hoặc chỉ có cột A, hoặc là merged cell
    // (Excel trả cùng một text cho mọi cột trong vùng merge)
    const isPlainHeader = colA && !place && !title && !description
    const isMergedHeader = colA && place === colA && title === colA
    if (isPlainHeader || isMergedHeader) {
      eraIndex += 1
      orderInEra = 0
      eraHeaders.push({ row: rowNumber, era: ERA_ORDER[eraIndex] ?? `era-${eraIndex}`, text: colA })
      return
    }

    if (!place && !title && !description) {
      const stray = cellText(row, COLS.date)
      if (stray) skipped.push({ row: rowNumber, reason: 'hàng lạc (chỉ có cột B)', text: stray })
      return
    }

    if (eraIndex < 0 || eraIndex >= ERA_ORDER.length) {
      skipped.push({ row: rowNumber, reason: 'ngoài 4 giai đoạn đã biết', text: title || place })
      return
    }

    const era = ERA_ORDER[eraIndex]
    orderInEra += 1
    const sttNum = Number(colA)
    const order = Number.isInteger(sttNum) && sttNum > 0 ? sttNum : orderInEra
    const id = `${era}-${String(order).padStart(2, '0')}`

    let slug = slugify(title) || id
    if (usedSlugs.has(slug)) {
      const n = usedSlugs.get(slug) + 1
      usedSlugs.set(slug, n)
      slug = `${slug}-${n}`
    } else {
      usedSlugs.set(slug, 1)
    }

    const { dateLabel, year } = parseDateCell(cellRaw(row, COLS.date))
    const rawCoords = cellText(row, COLS.coords)
    const locations = parseCoordsCell(rawCoords, place)
    const sources = cellText(row, COLS.sources, { preferLink: true })
      .split(/[\n;]+/)
      .map((s) => s.trim())
      .filter(Boolean)
    // Ô ảnh: display text có thể chứa '#/media/File:...' còn hyperlink chỉ là
    // trang bài viết — ưu tiên bản có 'File:' để resolve được ảnh Wikimedia
    const imageText = cellText(row, COLS.image)
    const imageLink = cellText(row, COLS.image, { preferLink: true })
    const rawImageUrl = /File:/.test(imageText) && !/File:/.test(imageLink) ? imageText : imageLink

    const incomplete = []
    if (!year) incomplete.push('year')
    if (locations.length === 0) incomplete.push('locations')
    if (!description) incomplete.push('description')
    if (sources.length === 0) incomplete.push('sources')

    events.push({
      id,
      slug,
      era,
      order,
      title,
      dateLabel,
      year,
      locations,
      description,
      image: { thumb: '', full: '' },
      images: [],
      sources,
      incomplete,
      // _raw giữ text gốc cho report + bước ảnh; index.mjs sẽ strip trước khi ghi JSON
      _raw: { row: rowNumber, place, coords: rawCoords, imageUrl: rawImageUrl },
    })
  })

  return { events, eraHeaders, skipped }
}
