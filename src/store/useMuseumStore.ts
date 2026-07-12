/**
 * Store toàn cục (zustand). Lưu ý phân chia state:
 * - Mode (route) và sự kiện đang chọn (?event=<slug>) sống trong URL —
 *   xem useSelectedEvent — để deep-link/refresh hoạt động miễn phí.
 * - Store chỉ giữ state không thuộc URL: opening, filter, ambient, transition.
 */
import { create } from 'zustand'
import type { EraId } from '@/types/events'
import type { ChatMessage } from '@/types/chat'

export type AmbientKey = 'world' | 'vietnam' | null

interface MuseumState {
  /** Opening overlay còn hiển thị không trong runtime hiện tại. Reload sẽ hiện lại. */
  openingVisible: boolean
  eraFilter: EraId | null
  ambient: AmbientKey
  isTransitioning: boolean
  /** Chat Panel (hỏi đáp, Ctrl+K) đang mở. */
  chatOpen: boolean
  /** Lịch sử hội thoại — giữ trong store để đóng/mở panel không mất, hết phiên là mất. */
  chatMessages: ChatMessage[]
  /** Trạng thái request cũng ở store để đóng/mở panel không tạo request song song. */
  chatPending: boolean
  chatError: string | null
  dismissOpening: () => void
  setEraFilter: (era: EraId | null) => void
  setAmbient: (key: AmbientKey) => void
  setTransitioning: (value: boolean) => void
  setChatOpen: (value: boolean) => void
  beginChatRequest: (message: ChatMessage) => boolean
  completeChatRequest: (message: ChatMessage) => void
  failChatRequest: (message: string) => void
}

export const useMuseumStore = create<MuseumState>((set, get) => ({
  openingVisible: true,
  eraFilter: null,
  ambient: null,
  isTransitioning: false,
  chatOpen: false,
  chatMessages: [],
  chatPending: false,
  chatError: null,

  dismissOpening: () => set({ openingVisible: false }),
  setEraFilter: (era) => set({ eraFilter: era }),
  setAmbient: (key) => set({ ambient: key }),
  setTransitioning: (value) => set({ isTransitioning: value }),
  setChatOpen: (value) => set({ chatOpen: value }),
  beginChatRequest: (message) => {
    if (get().chatPending) return false
    set((s) => ({
      chatMessages: [...s.chatMessages, message],
      chatPending: true,
      chatError: null,
    }))
    return true
  },
  completeChatRequest: (message) =>
    set((s) => ({
      chatMessages: [...s.chatMessages, message],
      chatPending: false,
      chatError: null,
    })),
  failChatRequest: (message) =>
    set((s) => ({
      chatMessages:
        s.chatMessages.at(-1)?.role === 'user' ? s.chatMessages.slice(0, -1) : s.chatMessages,
      chatPending: false,
      chatError: message,
    })),
}))
