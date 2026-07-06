/**
 * Trang Trắc nghiệm — TUẦN 1: placeholder. Tuần 4 gắn lại khung QuizPage
 * (đã park) với nội dung câu hỏi do nhóm review.
 */
import { quizQuestions } from '@/data/quizPlaceholder'
import './QuizPlaceholderPage.css'

export default function QuizPlaceholderPage() {
  return (
    <div className="quiz-placeholder">
      <div className="quiz-placeholder__card">
        <span className="quiz-placeholder__icon" aria-hidden="true">
          📝
        </span>
        <h2 className="quiz-placeholder__title">Trắc nghiệm đang được xây dựng</h2>
        <p className="quiz-placeholder__text">
          Khu vực kiểm tra kiến thức sẽ mở cửa ở giai đoạn cuối. Hiện đã có {quizQuestions.length}{' '}
          câu hỏi mẫu — bộ câu hỏi đầy đủ do nhóm biên soạn và review.
        </p>
      </div>
    </div>
  )
}
