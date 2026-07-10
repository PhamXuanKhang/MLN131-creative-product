/**
 * Bước ảnh: resolve URL cột H hoặc ảnh đã lọc trong assets/crawled/<id>/ →
 * public/images/optimized + public/images/thumb. Link HTML được crawl thành
 * ảnh ứng viên để nhóm xóa ảnh không liên quan trước lần export cuối.
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
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
const IMAGE_EXTS = new Set(Object.values(EXT_BY_TYPE))

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

export function resolveImageUrl(raw) {
  const url = String(raw ?? '').trim()
  if (!url) return { url: null, note: 'thiếu link ảnh' }
  if (!/^https?:\/\//i.test(url)) return { url: null, note: `không phải URL: ${url}` }

  const fileMatch = url.match(/(?:commons\.wikimedia\.org\/wiki\/|#\/media\/)File:(.+?)(?:[?#]|$)/i)
  if (fileMatch) {
    return { url: `https://commons.wikimedia.org/wiki/Special:FilePath/${fileMatch[1]}?width=1600` }
  }
  if (/\/wiki\/Category:/i.test(url)) return { url: null, note: 'trang Category Commons — cần chọn ảnh cụ thể' }
  return { url }
}

function normalizeUrl(candidate, pageUrl) {
  const trimmed = String(candidate ?? '').trim()
  if (!trimmed || trimmed.startsWith('data:')) return null
  try {
    return new URL(trimmed.replace(/&amp;/g, '&'), pageUrl).toString()
  } catch {
    return null
  }
}

function imageCandidatesFromHtml(html, pageUrl) {
  const urls = []
  const seen = new Set()
  const add = (raw) => {
    const url = normalizeUrl(raw, pageUrl)
    if (!url || seen.has(url)) return
    seen.add(url)
    urls.push(url)
  }

  for (const match of html.matchAll(/<meta[^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]+content=["']([^"']+)["'][^>]*>/gi)) add(match[1])
  for (const match of html.matchAll(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*>/gi)) add(match[1])
  for (const match of html.matchAll(/<img[^>]+(?:src|data-src|data-original)=["']([^"']+)["'][^>]*>/gi)) add(match[1])
  for (const match of html.matchAll(/<source[^>]+srcset=["']([^"']+)["'][^>]*>/gi)) {
    for (const part of match[1].split(',')) add(part.trim().split(/\s+/)[0])
  }

  return urls.filter((url) => !/\.(svg)(?:[?#]|$)/i.test(url)).slice(0, 12)
}

async function fetchUrl(url) {
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
    return { buffer: Buffer.from(await res.arrayBuffer()), type, finalUrl: res.url }
  }
  return { error: 'quá số lần thử (429/5xx)' }
}

async function fetchImage(url) {
  const result = await fetchUrl(url)
  if (result.error) return result
  const ext = EXT_BY_TYPE[result.type]
  if (!ext) return { error: `không phải ảnh (content-type: ${result.type || '?'})` }
  return { ...result, ext }
}

function listImageFiles(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir)
    .filter((f) => IMAGE_EXTS.has(path.extname(f).slice(1).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((f) => path.join(dir, f))
}

function findRawFiles(rawDir, id) {
  return listImageFiles(rawDir).filter((file) => path.basename(file).startsWith(`${id}.`))
}

function findPrimaryRawFile(rawDir, id) {
  return listImageFiles(rawDir).find((file) => path.parse(file).name === id) ?? null
}

function extensionFromPath(file) {
  return path.extname(file).slice(1).toLowerCase() || 'jpg'
}

async function deriveIfStale(rawPath, outPath, width, quality) {
  if (existsSync(outPath) && statSync(outPath).mtimeMs >= statSync(rawPath).mtimeMs) return
  await sharp(rawPath)
    .flatten({ background: '#ffffff' })
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality })
    .toFile(outPath)
}

async function crawlHtmlImages(event, pageUrl, crawledDir, failed, forceImages) {
  const eventDir = path.join(crawledDir, event.id)
  if (forceImages) rmSync(eventDir, { recursive: true, force: true })
  mkdirSync(eventDir, { recursive: true })
  const existing = listImageFiles(eventDir)
  if (!forceImages && existing.length > 0) return { crawled: 0, skipped: existing.length }

  const page = await fetchUrl(pageUrl)
  if (page.error) {
    failed.push({ id: event.id, url: pageUrl, note: page.error })
    return { crawled: 0, skipped: 0 }
  }
  if (!/^text\/html\b/i.test(page.type)) return { crawled: 0, skipped: 0 }

  const html = page.buffer.toString('utf8')
  const candidates = imageCandidatesFromHtml(html, page.finalUrl ?? pageUrl)
  const manifest = []
  let crawled = 0

  for (const [index, candidate] of candidates.entries()) {
    await sleep(200)
    const image = await fetchImage(candidate)
    if (image.error) {
      manifest.push({ url: candidate, skipped: image.error })
      continue
    }
    const filename = `${String(index + 1).padStart(2, '0')}.${image.ext}`
    writeFileSync(path.join(eventDir, filename), image.buffer)
    manifest.push({ file: filename, url: candidate })
    crawled += 1
  }

  writeFileSync(path.join(eventDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
  return { crawled, skipped: 0 }
}

async function selectedRawFiles(event, dirs, forceImages, failed) {
  const existingRaw = forceImages ? [] : findRawFiles(dirs.rawDir, event.id)
  if (event._raw.preferRaw) {
    const primaryRaw = findPrimaryRawFile(dirs.rawDir, event.id)
    if (primaryRaw) return { files: [primaryRaw], cached: 1 }
  }

  const crawledFiles = forceImages ? [] : listImageFiles(path.join(dirs.crawledDir, event.id))
  if (crawledFiles.length > 0) return { files: crawledFiles, cached: crawledFiles.length }

  if (existingRaw.length > 0) return { files: existingRaw, cached: existingRaw.length }

  const { url, note } = resolveImageUrl(event._raw.imageUrl)
  if (!url) {
    failed.push({ id: event.id, url: event._raw.imageUrl, note: note ?? 'không resolve được' })
    return { files: [], cached: 0, downloaded: 0, crawled: 0 }
  }

  await sleep(300)
  const image = await fetchImage(url)
  if (!image.error) {
    const rawPath = path.join(dirs.rawDir, `${event.id}.${image.ext}`)
    writeFileSync(rawPath, image.buffer)
    return { files: [rawPath], cached: 0, downloaded: 1, crawled: 0 }
  }

  const page = await fetchUrl(url)
  if (page.error) {
    failed.push({ id: event.id, url, note: image.error })
    return { files: [], cached: 0, downloaded: 0, crawled: 0 }
  }
  if (!/^text\/html\b/i.test(page.type)) {
    failed.push({ id: event.id, url, note: image.error })
    return { files: [], cached: 0, downloaded: 0, crawled: 0 }
  }

  const crawl = await crawlHtmlImages(event, url, dirs.crawledDir, failed, forceImages)
  return { files: listImageFiles(path.join(dirs.crawledDir, event.id)), cached: 0, downloaded: 0, crawled: crawl.crawled }
}

export async function processImages(events, { root, forceImages = false }) {
  const rawDir = path.join(root, 'assets', 'raw')
  const crawledDir = path.join(root, 'assets', 'crawled')
  const optDir = path.join(root, 'public', 'images', 'optimized')
  const thumbDir = path.join(root, 'public', 'images', 'thumb')
  for (const dir of [rawDir, crawledDir, optDir, thumbDir]) mkdirSync(dir, { recursive: true })

  let downloaded = 0
  let cached = 0
  let crawled = 0
  const failed = []

  for (const event of events) {
    const selected = await selectedRawFiles(event, { rawDir, crawledDir }, forceImages, failed)
    downloaded += selected.downloaded ?? 0
    cached += selected.cached ?? 0
    crawled += selected.crawled ?? 0

    const images = []
    for (const [index, rawPath] of selected.files.entries()) {
      const suffix = index === 0 ? event.id : `${event.id}-${String(index + 1).padStart(2, '0')}`
      const sourceRaw = rawPath.startsWith(rawDir) ? rawPath : path.join(rawDir, `${suffix}.${extensionFromPath(rawPath)}`)
      if (sourceRaw !== rawPath && (!existsSync(sourceRaw) || statSync(sourceRaw).mtimeMs < statSync(rawPath).mtimeMs)) {
        copyFileSync(rawPath, sourceRaw)
      }

      const optPath = path.join(optDir, `${suffix}.jpg`)
      const thumbPath = path.join(thumbDir, `${suffix}.jpg`)
      try {
        await deriveIfStale(sourceRaw, optPath, 1600, 80)
        await deriveIfStale(sourceRaw, thumbPath, 400, 70)
        images.push({ thumb: `/images/thumb/${suffix}.jpg`, full: `/images/optimized/${suffix}.jpg` })
      } catch (err) {
        failed.push({ id: event.id, url: rawPath, note: `sharp lỗi: ${err.message}` })
      }
    }

    event.images = images
    event.image = images[0] ?? { thumb: '', full: '' }
    if (images.length === 0) event.incomplete.push('image')
  }

  return { downloaded, cached, crawled, failed }
}
