// LEGACY (park, chưa mount) — khung UI tái dùng tuần 4 với nội dung câu hỏi
// do nhóm review; hiện chạy trên quizPlaceholder + eventSlug thay campaignId.
import { useState, useMemo } from 'react'
import { quizQuestions } from '@/data/quizPlaceholder'
import { getEventBySlug } from '@/data/adapter'
import type { QuizQuestion } from '@/types/events'
import './QuizPage.css'

interface QuizPageProps {
  onBack: () => void
  onViewEvent: (eventSlug: string) => void
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const TOTAL_QUESTIONS = 10

const PARTICLES = [...Array(15)].map(() => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
  animationDuration: `${8 + Math.random() * 8}s`,
}))

function QuizPage({ onBack, onViewEvent }: QuizPageProps) {
  const questions = useMemo(() => shuffleArray(quizQuestions).slice(0, TOTAL_QUESTIONS), [])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answeredCorrectly, setAnsweredCorrectly] = useState<boolean | null>(null)
  const [wrongCount, setWrongCount] = useState(0)

  const current: QuizQuestion = questions[currentIndex]

  const handleSelect = (index: number) => {
    if (showResult) return
    setSelectedOption(index)
  }

  const handleConfirm = () => {
    if (selectedOption === null) return
    const correct = selectedOption === current.correctIndex
    if (correct) {
      setScore((s) => s + 1)
    } else {
      setWrongCount((w) => w + 1)
    }
    setAnsweredCorrectly(correct)
    setShowResult(true)
  }

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
      setShowResult(false)
      setAnsweredCorrectly(null)
    }
  }

  const handleRestart = () => {
    window.location.reload()
  }

  const getGrade = () => {
    const pct = (score / questions.length) * 100
    if (pct >= 90) return { label: 'Xuất sắc! 🏆', color: '#ffd700' }
    if (pct >= 70) return { label: 'Giỏi! 🎖️', color: '#4caf50' }
    if (pct >= 50) return { label: 'Khá! 👍', color: '#ff9800' }
    return { label: 'Cần ôn lại! 📖', color: '#ff5252' }
  }

  // === FINISHED SCREEN ===
  if (finished) {
    const grade = getGrade()
    return (
      <div className="quiz-page">
        <div className="quiz-bg">
          <div className="quiz-particles">
            {PARTICLES.map((style, i) => (
              <div key={i} className="q-particle" style={style} />
            ))}
          </div>
        </div>

        <div className="quiz-result-card">
          <div className="result-icon">📋</div>
          <h1>Kết quả kiểm tra</h1>

          <div className="result-score-ring">
            <svg viewBox="0 0 120 120" className="score-svg">
              <circle cx="60" cy="60" r="50" className="ring-bg" />
              <circle
                cx="60"
                cy="60"
                r="50"
                className="ring-fill"
                style={{
                  strokeDasharray: `${(score / questions.length) * 314} 314`,
                  stroke: grade.color,
                }}
              />
            </svg>
            <div className="score-text">
              <span className="score-num">{score}</span>
              <span className="score-denom">/{questions.length}</span>
            </div>
          </div>

          <p className="result-grade" style={{ color: grade.color }}>
            {grade.label}
          </p>
          <p className="result-detail">
            Bạn trả lời đúng {score}/{questions.length} câu hỏi (
            {Math.round((score / questions.length) * 100)}%)
          </p>

          <div className="result-actions">
            <button className="btn-restart" onClick={handleRestart}>
              🔄 Làm lại
            </button>
            <button className="btn-back-map" onClick={onBack}>
              🗺️ Về bản đồ
            </button>
          </div>
        </div>
      </div>
    )
  }

  // === QUESTION SCREEN ===
  return (
    <div className="quiz-page">
      <div className="quiz-bg">
        <div className="quiz-particles">
          {PARTICLES.map((style, i) => (
            <div key={i} className="q-particle" style={style} />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="quiz-header">
        <button className="quiz-back-btn" onClick={onBack}>
          ← Quay lại bản đồ
        </button>
        <h1>
          <span className="quiz-flag">🇻🇳</span> Kiểm tra kiến thức
        </h1>
        <p className="quiz-subtitle">Kháng chiến chống Mỹ 1960 - 1975</p>
      </header>

      {/* Progress */}
      <div className="quiz-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          />
        </div>
        <span className="progress-text">
          Câu {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Question Card */}
      <div className="quiz-card" key={current.id}>
        <div className="question-number">Câu {currentIndex + 1}</div>
        <h2 className="question-text">{current.question}</h2>

        <div className="options-list">
          {current.options.map((opt, idx) => {
            let cls = 'option-btn'
            if (showResult) {
              if (idx === current.correctIndex) cls += ' correct'
              else if (idx === selectedOption) cls += ' wrong'
            } else if (idx === selectedOption) {
              cls += ' selected'
            }
            return (
              <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
                <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                <span className="option-text">{opt}</span>
                {showResult && idx === current.correctIndex && (
                  <span className="option-icon">✓</span>
                )}
                {showResult && idx === selectedOption && idx !== current.correctIndex && (
                  <span className="option-icon">✗</span>
                )}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div
            className={`explanation-box ${answeredCorrectly ? 'explanation-correct' : 'explanation-wrong'}`}
          >
            <p className="explanation-label">
              {answeredCorrectly ? '✅ Chính xác!' : '❌ Chưa đúng!'}
            </p>
            <p>{current.explanation}</p>
            {current.eventSlug &&
              (() => {
                const event = getEventBySlug(current.eventSlug)
                return event ? (
                  <button className="btn-go-to-map" onClick={() => onViewEvent(current.eventSlug)}>
                    🗺️ Xem sự kiện «{event.title}» trên bản đồ
                  </button>
                ) : null
              })()}
          </div>
        )}

        {/* Action buttons */}
        <div className="quiz-actions">
          {!showResult ? (
            <button
              className="btn-confirm"
              disabled={selectedOption === null}
              onClick={handleConfirm}
            >
              Xác nhận
            </button>
          ) : (
            <button className="btn-next" onClick={handleNext}>
              {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}
            </button>
          )}
        </div>
      </div>

      {/* Score indicator */}
      <div className="quiz-score-indicator">
        ✅ {score} đúng &nbsp;|&nbsp; ❌ {wrongCount} sai
      </div>
    </div>
  )
}

export default QuizPage
