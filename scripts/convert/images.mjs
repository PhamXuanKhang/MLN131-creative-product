/**
 * Bước ảnh: resolve URL cột H → tải về assets/raw/<id>.<ext> → sharp sinh
 * public/images/optimized/<id>.jpg (~1600px) + public/images/thumb/<id>.jpg (~400px).
 * Idempotent: raw đã có thì không tải lại (trừ --force-images); derivative chỉ
 * sinh lại khi thiếu hoặc cũ hơn raw.
 */
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const UA = 'MLN131-museum-convert/1.0 (vh7t10@gmail.com)'
const EXT_BY_TYPE = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/tiff': 'tif',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Chuẩn hoá URL cột H thành URL tải được (hoặc note vì sao không).
 * @returns {{ url: string|null, note?: string }}
 */
export function resolveImageUrl(raw) {
  const url = String(raw ?? '').trim()
  if (!url) return { url: null, note: 'thiếu link ảnh' }
  if (!/^https?:\/\//i.test(url)) return { url: null, note: `không phải URL: ${url}` }

  // Trang File: của Commons hoặc #/media/File: của Wikipedia → Special:FilePath
  const fileMatch = url.match(/(?:commons\.wikimedia\.org\/wiki\/|#\/media\/)File:(.+?)(?:[?#]|$)/i)
  if (fileMatch) {
    return { url: `https://commons.wikimedia.org/wiki/Special:FilePath/${fileMatch[1]}?width=1600` }
  }
  if (/\/wiki\/Category:/i.test(url)) {
    return {
      url: null,
      note: 'trang Category Commons — cần chọn 1 ảnh cụ thể (điền overrides.json)',
    }
  }
  // Còn lại cứ thử tải — content-type sẽ quyết định có phải ảnh không
  return { url }
}

async function fetchImage(url) {
  for (let attempt = 0; attempt < 2; attempt++) {
    let res
    try {
      res = await fetch(url, {
        headers: { 'User-Agent': UA },
        redirect: 'follow',
        signal: AbortSignal.timeout(30_000),
      })
    } catch (err) {
      return { error: `fetch lỗi: ${err.cause?.message ?? err.message}` }
    }
    if (res.status === 429 || res.status >= 500) {
      await sleep(1500)
      continue
    }
    if (!res.ok) return { error: `HTTP ${res.status}` }
    const type = (res.headers.get('content-type') ?? '').split(';')[0].trim()
    const ext = EXT_BY_TYPE[type]
    if (!ext) return { error: `không phải ảnh (content-type: ${type || '?'})` }
    return { buffer: Buffer.from(await res.arrayBuffer()), ext }
  }
  return { error: 'quá số lần thử (429/5xx)' }
}

function findRawFile(rawDir, id) {
  if (!existsSync(rawDir)) return null
  const hit = readdirSync(rawDir).find((f) => f.startsWith(`${id}.`))
  return hit ? path.join(rawDir, hit) : null
}

async function deriveIfStale(rawPath, outPath, width, quality) {
  if (existsSync(outPath) && statSync(outPath).mtimeMs >= statSync(rawPath).mtimeMs) return
  await sharp(rawPath)
    .flatten({ background: '#ffffff' })
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality })
    .toFile(outPath)
}

/**
 * Xử lý ảnh cho toàn bộ events (mutate event.image / event.incomplete).
 * @param {object[]} events  mỗi event có _raw.imageUrl
 * @param {{ root: string, forceImages?: boolean }} opts
 * @returns {Promise<{ downloaded: number, cached: number, failed: {id:string, url:string, note:string}[] }>}
 */
export async function processImages(events, { root, forceImages = false }) {
  const rawDir = path.join(root, 'assets', 'raw')
  const optDir = path.join(root, 'public', 'images', 'optimized')
  const thumbDir = path.join(root, 'public', 'images', 'thumb')
  for (const dir of [rawDir, optDir, thumbDir]) mkdirSync(dir, { recursive: true })

  let downloaded = 0
  let cached = 0
  const failed = []

  for (const event of events) {
    const { url, note } = resolveImageUrl(event._raw.imageUrl)
    let rawPath = forceImages ? null : findRawFile(rawDir, event.id)

    if (!rawPath && url) {
      await sleep(300)
      const result = await fetchImage(url)
      if (result.error) {
        failed.push({ id: event.id, url, note: result.error })
      } else {
        rawPath = path.join(rawDir, `${event.id}.${result.ext}`)
        writeFileSync(rawPath, result.buffer)
        downloaded += 1
      }
    } else if (!rawPath && !url) {
      failed.push({ id: event.id, url: event._raw.imageUrl, note: note ?? 'không resolve được' })
    } else if (rawPath) {
      cached += 1
    }

    if (rawPath) {
      const optPath = path.join(optDir, `${event.id}.jpg`)
      const thumbPath = path.join(thumbDir, `${event.id}.jpg`)
      try {
        await deriveIfStale(rawPath, optPath, 1600, 80)
        await deriveIfStale(rawPath, thumbPath, 400, 70)
        event.image = {
          thumb: `/images/thumb/${event.id}.jpg`,
          full: `/images/optimized/${event.id}.jpg`,
        }
        if (!event.imageSource) event.incomplete.push('imageSource')
      } catch (err) {
        failed.push({ id: event.id, url: rawPath, note: `sharp lỗi: ${err.message}` })
        event.incomplete.push('image')
      }
    } else {
      event.incomplete.push('image')
    }
  }

  return { downloaded, cached, failed }
}
