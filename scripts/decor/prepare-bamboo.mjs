/**
 * Xuất 3 asset tre trang trí cho phòng Việt Nam từ ảnh nguồn assets/raw/decor/
 * (ảnh tre thật tải về, nền trong suốt — pngimg.com, dùng phi thương mại).
 * Chạy tay khi đổi nguồn: node scripts/decor/prepare-bamboo.mjs
 * KHÔNG thuộc pipeline `npm run convert` (pipeline đó dành cho ảnh sự kiện).
 *
 * - bamboo-cluster.webp: khóm tre nguyên (thân đứng + lá) → treo rủ 2 mép cửa sổ.
 * - bamboo-cane.webp: 1 đốt thân cắt đúng chu kỳ mấu (y 626→1228, cửa sổ
 *   x 473..587 luôn đục 100%) → background repeat-y làm thân giữa, mối nối
 *   nằm ngay mấu nên không lộ.
 * - bamboo-branch.webp: cành + lá bên phải cây trong ảnh nguồn, bỏ mảnh thân
 *   thừa, gốc cành sát mép trái → reveal bằng clip-path dẫn ra card sự kiện.
 */
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
const RAW = path.join(root, 'assets/raw/decor')
const OUT = path.join(root, 'public/images/decor')

const clusterSrc = path.join(RAW, 'bamboo-cluster-source.png') // pngimg bamboo_PNG50, 1200x1867
const branchSrc = path.join(RAW, 'bamboo-branch-source.png') // pngimg bamboo_PNG15, 564x447

// Khóm bên: giữ nguyên bố cục (thân sát trái, lá tỏa phải), hạ chiều cao đủ 68vh retina
await sharp(clusterSrc)
  .trim()
  .resize({ height: 1400, withoutEnlargement: true })
  .webp({ quality: 80 })
  .toFile(path.join(OUT, 'bamboo-cluster.webp'))

// Thân giữa: đốt mấu-tới-mấu của cây trước (thẳng đứng tuyệt đối trong nguồn render)
await sharp(clusterSrc)
  .extract({ left: 473, top: 626, width: 114, height: 602 })
  .resize({ width: 64 })
  .webp({ quality: 82 })
  .toFile(path.join(OUT, 'bamboo-cane.webp'))

// Cành: vùng bên phải thân trong bamboo_PNG15, trim rồi bỏ nốt mảnh thân trái
const branchArea = await sharp(branchSrc)
  .extract({ left: 130, top: 0, width: 430, height: 440 })
  .toBuffer()
const trimmed = await sharp(branchArea).trim().toBuffer({ resolveWithObject: true })
const noCane = await sharp(trimmed.data)
  .extract({ left: 90, top: 0, width: trimmed.info.width - 90, height: trimmed.info.height })
  .toBuffer()
const branch = await sharp(noCane).trim().toBuffer()
await sharp(branch).webp({ quality: 85 }).toFile(path.join(OUT, 'bamboo-branch.webp'))
// Bản mirror sẵn cho section card-trái — mirror bằng CSS scaleX(-1) lệch hộp
// khi transform-origin đặt ở gốc cành, nên xuất 2 file
await sharp(branch).flop().webp({ quality: 85 }).toFile(path.join(OUT, 'bamboo-branch-left.webp'))

for (const f of [
  'bamboo-cluster.webp',
  'bamboo-cane.webp',
  'bamboo-branch.webp',
  'bamboo-branch-left.webp',
]) {
  const meta = await sharp(path.join(OUT, f)).metadata()
  console.log(f, meta.width + 'x' + meta.height)
}
