/**
 * Cột D (Toạ độ): các dạng đã thấy trong xlsx —
 *   "45.774272, 4.829994"
 *   "Paris: 48.8566, 2.3522; Manchester: 53.4808, -2.2426"
 *   "- Berlin (Đức): 52.51..., 13.40... - Moscow ..."
 *   "Thượng Hải - 31.24..., 121.47... Hồ Nam - 3..."
 * Bắt mọi cặp số thập phân, nhãn = đoạn text đứng trước mỗi cặp.
 */

const PAIR_RE = /(-?\d{1,3}\.\d+)\s*,\s*(-?\d{1,3}\.\d+)/g

/** Dọn nhãn thô: bỏ dấu đầu dòng, dấu ':' / '-' cuối, khoảng trắng thừa. */
function cleanLabel(raw) {
  return raw
    .replace(/^[\s;,•·–—-]+/, '')
    .replace(/[\s:–—-]+$/, '')
    .trim()
}

/**
 * @param {string} raw           text ô D
 * @param {string} fallbackLabel nhãn thay thế (thường là ô C)
 * @returns {{ lat: number, lng: number, label: string }[]}
 */
export function parseCoordsCell(raw, fallbackLabel) {
  const text = String(raw ?? '').trim()
  if (!text) return []

  const locations = []
  let lastEnd = 0
  for (const m of text.matchAll(PAIR_RE)) {
    const lat = Number(m[1])
    const lng = Number(m[2])
    if (Math.abs(lat) > 90 || Math.abs(lng) > 180) continue
    const label = cleanLabel(text.slice(lastEnd, m.index)) || fallbackLabel
    locations.push({ lat, lng, label })
    lastEnd = m.index + m[0].length
  }
  return locations
}
