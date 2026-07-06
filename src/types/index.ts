// Kiểu dữ liệu domain dùng chung cho toàn app.

/** Một trận đánh cụ thể trong một chiến dịch. */
export interface Battle {
  id: string
  name: string
  coordinates: { lat: number; lng: number }
  description: string
  image: string
  date?: string
}

/** Một chiến dịch trong kháng chiến chống Mỹ (1960–1975). */
export interface Campaign {
  id: number
  year: number
  name: string
  coordinates: { lat: number; lng: number }
  description: string
  image: string
  partyGuideline: string
  significance: string
  battles: Battle[]
}

/** Một câu hỏi trắc nghiệm, liên kết về chiến dịch tương ứng qua campaignId. */
export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  campaignId: number
}
