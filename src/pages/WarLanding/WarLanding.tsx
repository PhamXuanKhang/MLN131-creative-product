import { useState } from 'react'
import './WarLanding.css'

interface WarLandingProps {
  onEnter: () => void
}

const PARTICLES = [...Array(20)].map(() => ({
  left: `${Math.random() * 100}%`,
  animationDelay: `${Math.random() * 5}s`,
  animationDuration: `${10 + Math.random() * 10}s`,
}))

function WarLanding({ onEnter }: WarLandingProps) {
  const [isLeaving, setIsLeaving] = useState(false)

  const handleEnter = () => {
    setIsLeaving(true)
    window.setTimeout(() => {
      onEnter()
    }, 450)
  }

  return (
    <section className={`war-landing ${isLeaving ? 'war-landing--leaving' : ''}`}>
      <div className="war-landing__backdrop" aria-hidden="true">
        <div className="war-landing__shade" />
        <div className="war-landing__grain" />
        <div className="war-landing__particles">
          {PARTICLES.map((style, i) => (
            <div key={i} className="war-landing__dot" style={style} />
          ))}
        </div>
      </div>

      <div className="war-landing__scroll">
        <div className="war-landing__shell">
          <header className="war-landing__header">
            <div className="war-landing__ornament" aria-hidden="true">
              <span className="war-landing__spark">★</span>
              <span className="war-landing__bar" />
              <span className="war-landing__spark">★</span>
            </div>

            <p className="war-landing__eyebrow">Bản Đồ Tương Tác</p>
            <h1 className="war-landing__title">
              21 MÙA XUÂN KHÁNG CHIẾN CHỐNG MỸ - NON SÔNG LIỀN MỘT DẢI
            </h1>
            <p className="war-landing__years">1960 — 1975</p>

            <div className="war-landing__ornament" aria-hidden="true">
              <span className="war-landing__spark">★</span>
              <span className="war-landing__bar" />
              <span className="war-landing__spark">★</span>
            </div>
          </header>

          <blockquote className="war-landing__quote">
            <p className="war-landing__quote-text">
              &ldquo;Không có gì quý hơn độc lập, tự do.&rdquo;
            </p>
            <footer className="war-landing__quote-author">— Chủ tịch Hồ Chí Minh, 1966</footer>
          </blockquote>

          <p className="war-landing__summary">
            Khám phá các chiến dịch quân sự lớn trong cuộc kháng chiến chống Mỹ cứu nước qua bản đồ
            tương tác — từ phong trào Đồng Khởi đến ngày giải phóng miền Nam, thống nhất đất nước.
          </p>

          <div className="war-landing__stats" aria-label="Thống kê tổng quan">
            <article className="war-landing__stat">
              <strong>10</strong>
              <span>Chiến dịch</span>
            </article>
            <article className="war-landing__stat">
              <strong>35</strong>
              <span>Trận đánh</span>
            </article>
            <article className="war-landing__stat">
              <strong>15</strong>
              <span>Năm kháng chiến</span>
            </article>
            <article className="war-landing__stat">
              <strong>∞</strong>
              <span>Hy sinh</span>
            </article>
          </div>

          <button type="button" className="war-landing__cta" onClick={handleEnter}>
            <span>Khám phá bản đồ</span>
            <span aria-hidden="true">&rarr;</span>
          </button>

          <footer className="war-landing__footer">
            <p>Dự án học phần VNR202 — Lịch sử Việt Nam</p>
            <p>Nhóm 2 | 2026</p>
          </footer>
        </div>
      </div>
    </section>
  )
}

export default WarLanding
