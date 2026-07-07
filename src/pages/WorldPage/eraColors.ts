/**
 * Màu + nhãn ngắn theo giai đoạn cho World renderer (marker, timeline, chips).
 * Giá trị trỏ tới token --era-* trong tokens.css — DivIcon HTML nằm trong
 * document nên CSS var vẫn resolve được.
 */
import type { EraId } from '@/types/events'

export const ERA_COLOR: Record<EraId, string> = {
  birth: 'var(--era-birth)',
  lenin: 'var(--era-lenin)',
  'post-lenin': 'var(--era-post-lenin)',
  vietnam: 'var(--era-vietnam)',
}

/** Nhãn ngắn cho chips/legend — label đầy đủ của EraMeta quá dài. */
export const ERA_SHORT_LABEL: Record<EraId, string> = {
  birth: 'Thế kỷ XIX',
  lenin: 'Thời Lênin',
  'post-lenin': 'Sau 1924',
  vietnam: 'Việt Nam',
}
