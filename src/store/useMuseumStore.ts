/**
 * Store toàn cục (zustand). Lưu ý phân chia state:
 * - Mode (route) và sự kiện đang chọn (?event=<slug>) sống trong URL —
 *   xem useSelectedEvent — để deep-link/refresh hoạt động miễn phí.
 * - Store chỉ giữ state không thuộc URL: opening, filter, audio, transition.
 */
import { create } from 'zustand'
import type { EraId } from '@/types/events'

export type AmbientKey = 'world' | 'vietnam' | null

interface MuseumState {
  /** Opening overlay còn hiển thị không trong runtime hiện tại. Reload sẽ hiện lại. */
  openingVisible: boolean
  eraFilter: EraId | null
  audioMuted: boolean
  ambient: AmbientKey
  isTransitioning: boolean
  dismissOpening: () => void
  setEraFilter: (era: EraId | null) => void
  toggleMute: () => void
  setAmbient: (key: AmbientKey) => void
  setTransitioning: (value: boolean) => void
}

export const useMuseumStore = create<MuseumState>((set) => ({
  openingVisible: true,
  eraFilter: null,
  audioMuted: false,
  ambient: null,
  isTransitioning: false,

  dismissOpening: () => set({ openingVisible: false }),
  setEraFilter: (era) => set({ eraFilter: era }),
  toggleMute: () => set((s) => ({ audioMuted: !s.audioMuted })),
  setAmbient: (key) => set({ ambient: key }),
  setTransitioning: (value) => set({ isTransitioning: value }),
}))
