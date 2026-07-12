/**
 * Sửa nội dung TẠI NGUỒN docs/content.xlsx (một lần, tái lập được) — sau đó
 * chạy `npm run convert` để sinh lại src/data/content.json.
 *
 * Nội dung sửa (rà soát 07/2026):
 * - Dấu câu hỏng ",." ",,." trong title; thiếu dấu kết câu/ngoặc trong mô tả.
 * - "Lion" → "Lyon"; "Trung Quố" cụt; "Hồ Nam" (nhầm — đúng là Nam Hồ, Gia Hưng);
 *   nhãn địa điểm lỗi "[object Object]" (lenin-06); ngày dính nhãn (post-lenin-07).
 * - Mốc sai: Hội nghị 81 đảng họp THÁNG 11/1960 (không phải 1/1960) — theo
 *   tulieuvankien.dangcongsan.vn/...thang-11-1960-tai-matxcova-nga-3374.
 * - Nguồn: bỏ utm_source=chatgpt.com; thay link chết (bktt.vn), link bị chặn
 *   (luatminhkhue), link trang danh sách chung (?page=1) và link lạc đề
 *   bằng nguồn chính thống đã kiểm tra HTTP 200 ngày 12/07/2026.
 * - Tọa độ Hà Nội sai (20.975, 105.322 — lệch ~50km) và Hương Cảng lệch.
 */
import ExcelJS from 'exceljs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseWorkbook } from '../convert/parse.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const FILE = path.join(root, 'docs/content.xlsx')

const COLS = { stt: 1, date: 2, place: 3, coords: 4, title: 5, description: 6, sources: 7 }

/**
 * Mỗi fix: { col, set } đặt nguyên giá trị, hoặc { col, replace: [pattern, to][] }
 * biến đổi text hiện tại (pattern string = literal, RegExp giữ nguyên);
 * replace PHẢI khớp ít nhất một pattern, không thì báo lỗi.
 */
const FIXES = {
  'birth-01': [
    {
      col: 'title',
      set: 'Phong trào đấu tranh của giai cấp công nhân tại thành phố Lyon, Pháp giương cao khẩu hiệu về kinh tế và chính trị.',
    },
  ],
  'birth-05': [{ col: 'date', set: 'Tháng 2/1848' }],
  'birth-06': [{ col: 'title', replace: [['Tây Âu,.', 'Tây Âu.']] }],
  'birth-09': [{ col: 'title', replace: [['công nhân,,.', 'công nhân.']] }],
  'birth-11': [
    { col: 'title', replace: [['Đuyrinh",.', 'Đuyrinh".']] },
    {
      col: 'sources',
      set: 'https://www.quanlynhanuoc.vn/2024/07/25/gia-tri-tu-tuong-ph-angghen-ve-chu-nghia-duy-vat-bien-chung-trong-tac-pham-chong-duyrinh/',
    },
  ],
  'lenin-02': [
    { col: 'title', replace: [['tại Nga,,.', 'tại Nga.']] },
    { col: 'date', set: '06/11/1917 - 07/11/1917' },
  ],
  'lenin-03': [{ col: 'date', set: '02/03/1919 - 06/03/1919' }],
  'lenin-04': [{ col: 'date', set: 'Tháng 3/1921' }],
  'lenin-06': [{ col: 'place', set: 'Gorki (nay là Gorki Leninskiye), ngoại ô Mátxcơva, Nga' }],
  'post-lenin-01': [
    { col: 'date', set: '01/07/1921' },
    // "Hồ Nam" đọc thành tỉnh Hồ Nam (Hunan) — đúng là Nam Hồ (South Lake), Gia Hưng
    { col: 'coords', replace: [['Hồ Nam', 'Nam Hồ, Gia Hưng, Chiết Giang']] },
    { col: 'place', replace: [['Hồ Nam', 'Nam Hồ']] },
    {
      col: 'description',
      set: '- Đại hội lần thứ nhất của CPC họp với 13 đại biểu, đại diện cho khoảng 50 đảng viên, đánh dấu sự ra đời của chính đảng mác-xít ở Trung Quốc.\n\n- Sau này Đảng Cộng sản Trung Quốc chính thức lấy ngày 1/7/1921 làm ngày thành lập để kỷ niệm thường niên.',
    },
    {
      col: 'sources',
      set: 'https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/phong-trao-cong-san-cong-nhan-quoc-te/cac-dang-cong-san-cong-nhan/dang-cong-san-trung-quoc-3267',
    },
  ],
  'post-lenin-02': [
    {
      col: 'description',
      set: '- Sau Chiến tranh thế giới thứ hai, Liên Xô mở rộng ảnh hưởng sang Đông Âu, góp phần hình thành hệ thống các nước xã hội chủ nghĩa ở châu Âu (Ba Lan, Tiệp Khắc, Đông Đức, Hungary, Romania, Bulgaria, Albania, v.v.).\n\n- Thắng lợi của Hồng quân Liên Xô và phong trào giải phóng dân tộc thúc đẩy sự mở rộng của trật tự xã hội chủ nghĩa trên phạm vi toàn cầu, tạo tiền đề cho sự đối lập giữa hai hệ thống: tư bản chủ nghĩa và xã hội chủ nghĩa.',
    },
  ],
  'post-lenin-03': [
    {
      col: 'description',
      set: '- Hội nghị đại biểu các Đảng Cộng sản và công nhân quốc tế họp tại Moskva tháng 11/1957, tổng kết thực tiễn xây dựng chủ nghĩa xã hội và thông qua 9 quy luật chung của công cuộc cải tạo xã hội chủ nghĩa.\n\n- Văn kiện từ hội nghị này trở thành cơ sở quan trọng để các Đảng Mác – Lênin vận dụng trong đường lối xây dựng mô hình xã hội chủ nghĩa ở các nước xã hội chủ nghĩa, trong đó có Việt Nam.',
    },
    {
      col: 'sources',
      set: 'https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/su-kien-va-nhan-chung/hoi-nghi-dai-bieu-cac-dang-cong-san-va-dang-cong-nhan-thang-11-1957-tai-matxcova-nga-3370',
    },
  ],
  'post-lenin-04': [
    { col: 'date', set: 'Tháng 11/1960' },
    {
      col: 'description',
      set: '- Hội nghị đại biểu của 81 Đảng Cộng sản và Đảng Công nhân quốc tế họp ở Moskva tháng 11/1960, phân tích tình hình quốc tế và đưa ra khái niệm về “thời đại hiện nay”, nhấn mạnh thời đại quá độ từ chủ nghĩa tư bản lên chủ nghĩa xã hội trên phạm vi toàn thế giới.\n\n- Hội nghị thông qua bản Tuyên ngôn mới, bổ sung và phát triển nội dung Tuyên ngôn năm 1957, được coi là cương lĩnh cách mạng chung cho các Đảng Mác – Lênin trên thế giới.',
    },
    {
      col: 'sources',
      set: 'https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/su-kien-va-nhan-chung/hoi-nghi-dai-bieu-cac-dang-cong-san-va-dang-cong-nhan-thang-11-1960-tai-matxcova-nga-3374',
    },
  ],
  'post-lenin-06': [
    {
      col: 'description',
      set: '- Cuối thập niên 1980, cải tổ (perestroika) và công khai (glasnost) ở Liên Xô cùng với khủng hoảng kinh tế – xã hội dẫn tới mất ổn định chính trị, làm suy yếu hệ thống XHCN.\n\n- Năm 1989, các chế độ XHCN Đông Âu lần lượt sụp đổ; đến cuối năm 1991, Liên Xô tan rã, hệ thống xã hội chủ nghĩa thế giới bị thu hẹp mạnh, chỉ còn một số nước như Trung Quốc, Việt Nam, Cuba, Lào, Bắc Triều Tiên tiếp tục con đường XHCN.',
    },
    {
      col: 'sources',
      set: 'https://nhandan.vn/bai-hoc-tu-su-sup-do-cua-chu-nghia-xa-hoi-o-lien-xo-va-dong-au-post308642.html',
    },
  ],
  'post-lenin-07': [
    { col: 'place', replace: [[/08\/11\/2002\s*(?=Đại)/, '']] },
    {
      col: 'description',
      set: '- Đại hội XVI đã tổng kết quá trình lãnh đạo của Đảng Cộng sản Trung Quốc trong giai đoạn cải cách – mở cửa, xác lập tư tưởng “Ba đại diện” là cơ sở lý luận quan trọng để CPC tiếp tục cầm quyền trong điều kiện kinh tế thị trường xã hội chủ nghĩa.\n\n- Đại hội đề ra mục tiêu tiếp tục hiện đại hóa, thúc đẩy công nghiệp hóa, đô thị hóa và hội nhập kinh tế quốc tế, vừa củng cố vai trò lãnh đạo của Đảng, vừa mở rộng thành phần kinh tế ngoài quốc doanh.',
    },
  ],
  'post-lenin-08': [
    { col: 'date', set: '18/10/2017 - 24/10/2017' },
    { col: 'place', replace: [[/Trung Quố(?!c)/, 'Trung Quốc']] },
    {
      col: 'description',
      set: '- Đại hội XIX xác lập “Tư tưởng về chủ nghĩa xã hội đặc sắc Trung Quốc trong thời đại mới” của Tập Cận Bình, đưa tư tưởng này vào Cương lĩnh Đảng, khẳng định bước phát triển mới của mô hình XHCN mang đặc sắc Trung Quốc.\n\n- Đại hội đề ra mục tiêu đến giữa thế kỷ XXI xây dựng Trung Quốc trở thành nước xã hội chủ nghĩa hiện đại toàn diện, đồng thời nhấn mạnh vai trò lãnh đạo toàn diện của Đảng trong mọi lĩnh vực.',
    },
  ],
  'vietnam-01': [
    { col: 'coords', set: '22.3193, 114.1694' },
    {
      col: 'sources',
      set: 'https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/su-kien-va-nhan-chung/ngay-thanh-lap-dang-cong-san-viet-nam-3-2-1930-3342',
    },
  ],
  'vietnam-02': [
    {
      col: 'sources',
      set: 'https://tulieuvankien.dangcongsan.vn/ho-so-su-kien-nhan-chung/su-kien-va-nhan-chung/cach-mang-thang-8-va-quoc-khanh-291945-cua-nuoc-viet-nam-dan-chu-cong-hoa-3310',
    },
  ],
  'vietnam-04': [{ col: 'coords', set: '21.0367, 105.8347' }],
  'vietnam-05': [{ col: 'coords', set: '21.0367, 105.8347' }],
  'vietnam-06': [
    { col: 'coords', set: '21.0367, 105.8347' },
    {
      col: 'description',
      set: 'Đại hội VII thông qua Cương lĩnh năm 1991, xác định mô hình xã hội xã hội chủ nghĩa và phương hướng xây dựng đất nước trong thời kỳ quá độ.',
    },
  ],
  'vietnam-07': [
    { col: 'coords', set: '21.0043, 105.7871' },
    {
      col: 'sources',
      set: 'https://tulieuvankien.dangcongsan.vn/ban-chap-hanh-trung-uong-dang/dai-hoi-dang/lan-thu-xi/cuong-linh-xay-dung-dat-nuoc-trong-thoi-ky-qua-do-len-chu-nghia-xa-hoi-bo-sung-phat-trien-nam-2011-1528',
    },
  ],
  'vietnam-08': [{ col: 'coords', set: '21.0043, 105.7871' }],
}

/** Text hiện tại của ô — cùng logic đọc với parse.mjs (richText/hyperlink/formula). */
function currentText(cell, { preferLink = false } = {}) {
  const v = cell.value
  if (v == null) return ''
  if (v instanceof Date) return v.toISOString()
  if (typeof v === 'object') {
    if (preferLink && v.hyperlink) return String(v.hyperlink).trim()
    if (v.richText) return v.richText.map((r) => r.text).join('').trim()
    if (v.text !== undefined) return String(v.text).trim()
    if (v.result !== undefined) return String(v.result).trim()
    if (v.hyperlink) return String(v.hyperlink).trim()
    return ''
  }
  return String(v).trim()
}

const { events } = await parseWorkbook(FILE)
const rowById = new Map(events.map((e) => [e.id, e._raw.row]))

const wb = new ExcelJS.Workbook()
await wb.xlsx.readFile(FILE)
const ws = wb.worksheets[0]

let changed = 0
const problems = []

for (const [id, fixes] of Object.entries(FIXES)) {
  const rowNumber = rowById.get(id)
  if (!rowNumber) {
    problems.push(`${id}: không tìm thấy hàng trong xlsx`)
    continue
  }
  const row = ws.getRow(rowNumber)
  for (const fix of fixes) {
    const cell = row.getCell(COLS[fix.col])
    const before = currentText(cell, { preferLink: fix.col === 'sources' })
    let after
    if (fix.set !== undefined) {
      after = fix.set
    } else {
      after = before
      let matched = false
      for (const [pattern, to] of fix.replace) {
        if (pattern instanceof RegExp ? pattern.test(after) : after.includes(pattern)) matched = true
        after = pattern instanceof RegExp ? after.replace(pattern, to) : after.replaceAll(pattern, to)
      }
      if (!matched) {
        problems.push(`${id}.${fix.col}: không khớp pattern nào — giá trị hiện tại: "${before}"`)
        continue
      }
    }
    if (after === before) continue
    cell.value = after // ghi chuỗi thuần — bỏ richText/hyperlink cũ, parse.mjs đọc bình thường
    changed += 1
    console.log(`${id}.${fix.col}:\n  − ${before}\n  + ${after}`)
  }
}

// Bỏ utm_source=chatgpt.com trên MỌI ô nguồn (cột G)
ws.eachRow((row, rowNumber) => {
  if (rowNumber === 1) return
  const cell = row.getCell(COLS.sources)
  const before = currentText(cell, { preferLink: true })
  if (!before) return
  const after = before
    .replace(/\?utm_source=chatgpt\.com/g, '')
    .replace(/&utm_source=chatgpt\.com/g, '')
    .replace(/\?$/, '')
  if (after !== before) {
    cell.value = after
    changed += 1
    console.log(`hàng ${rowNumber}.sources:\n  − ${before}\n  + ${after}`)
  }
})

if (problems.length) {
  console.error('\nKHÔNG GHI FILE — có vấn đề:')
  for (const p of problems) console.error(`  ✖ ${p}`)
  process.exit(1)
}

await wb.xlsx.writeFile(FILE)
console.log(`\nĐã ghi ${FILE} — ${changed} ô thay đổi. Chạy tiếp: npm run convert`)
