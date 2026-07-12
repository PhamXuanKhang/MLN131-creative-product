/** Kiểu dữ liệu hội thoại Hỏi đáp — dùng chung cho ChatPanel và store.
    api/chat.ts (Vercel Function) giữ bản khai báo riêng để không phụ thuộc alias @. */

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  /** Slug các sự kiện được dùng làm căn cứ — hiển thị chip "Xem sự kiện". */
  refs?: string[]
}

/** Body trả về từ POST /api/chat. */
export interface ChatResponse {
  answer: string
  refs: string[]
}
