/**
 * Kiểu dữ liệu chính của bảo tàng — theo PLAN.md §2.2.
 * Nguồn: docs/content.xlsx → scripts/convert → src/data/content.json → adapter.ts.
 */

export type EraId = 'birth' | 'lenin' | 'post-lenin' | 'vietnam'

export interface EventLocation {
  lat: number
  lng: number
  label: string
}

export interface HistoricalEvent {
  id: string
  /** 'tuyen-ngon-dang-cong-san' → ?event=... đẹp, ổn định */
  slug: string
  era: EraId
  /** STT trong giai đoạn */
  order: number
  title: string
  /** Chuỗi hiển thị (hỗ trợ khoảng thời gian, nhiều đợt) */
  dateLabel: string
  /** Năm đại diện để sort/timeline; 0 nếu không xác định được */
  year: number
  locations: EventLocation[]
  /** Nội dung sự kiện từ docs/content.xlsx */
  description: string
  /** Đường dẫn theo asset pipeline; chuỗi rỗng nếu chưa có ảnh */
  image: { thumb: string; full: string }
  imageSource: string
  sources: string[]
  /** Các field còn thiếu từ xlsx */
  incomplete?: string[]
}

export interface EraMeta {
  id: EraId
  label: string
  range: string
  order: number
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  /** Trỏ tới HistoricalEvent.slug để jump "xem sự kiện trên bản đồ" */
  eventSlug: string
}
