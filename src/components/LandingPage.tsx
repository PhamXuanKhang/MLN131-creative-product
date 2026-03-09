import { useState } from 'react'
import './LandingPage.css'

interface LandingPageProps {
  onEnter: () => void
}

function LandingPage({ onEnter }: LandingPageProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleEnter = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      onEnter()
    }, 800)
  }

  return (
    <div className={`landing-page ${isTransitioning ? 'fade-out' : ''}`}>
      {/* Background với hiệu ứng */}
      <div className="landing-bg">
        <div className="bg-overlay"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}></div>
          ))}
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="landing-content">
        {/* Header */}
        <header className="landing-header">
          <div className="header-decoration">
            <span className="star">★</span>
            <span className="line"></span>
            <span className="star">★</span>
          </div>
          <h1 className="main-title">
            <span className="title-sub">Các Chiến Dịch Quân Sự Lớn</span>
            <span className="title-main">KHÁNG CHIẾN CHỐNG MỸ</span>
            <span className="title-year">1960 - 1975</span>
          </h1>
          <div className="header-decoration">
            <span className="star">★</span>
            <span className="line"></span>
            <span className="star">★</span>
          </div>
        </header>

        {/* Phần giới thiệu */}
        <section className="intro-section">
          <p className="intro-quote">
            "Không có gì quý hơn độc lập, tự do."
          </p>
          <span className="quote-author">— Chủ tịch Hồ Chí Minh, 1966</span>
        </section>

        {/* Thống kê nhanh */}
        <section className="quick-stats">
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Chiến Dịch Lớn</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">15</span>
            <span className="stat-label">Năm Kháng Chiến</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">17</span>
            <span className="stat-label">Trận Đánh</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Hy Sinh</span>
          </div>
        </section>

        {/* Nút vào trang chính */}
        <div className="enter-section" onClick={handleEnter}>
          <span className="enter-text">Nhấn để khám phá bản đồ chiến dịch</span>
          <span className="enter-arrow">↓</span>
        </div>

        {/* Footer */}
        <footer className="landing-footer">
          <p>Dự án học phần VNR202 - Lịch sử Việt Nam</p>
          <p className="team-info">Nhóm 8 | 2026</p>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage
