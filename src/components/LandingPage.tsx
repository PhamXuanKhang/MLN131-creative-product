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
            <span className="title-sub">Hành Trình Tìm Đường Cứu Nước</span>
            <span className="title-main">NGUYỄN ÁI QUỐC</span>
            <span className="title-year">1911 - 1941</span>
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
            "Tôi muốn đi ra nước ngoài, xem nước Pháp và các nước khác. 
            Sau khi xem xét họ làm như thế nào, tôi sẽ trở về giúp đồng bào ta."
          </p>
          <span className="quote-author">— Nguyễn Tất Thành, 1911</span>
        </section>

        {/* Thống kê nhanh */}
        <section className="quick-stats">
          <div className="stat-item">
            <span className="stat-number">30</span>
            <span className="stat-label">Năm Bôn Ba</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">28</span>
            <span className="stat-label">Quốc Gia</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Châu Lục</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">∞</span>
            <span className="stat-label">Di Sản</span>
          </div>
        </section>

        {/* Nút vào trang chính - đơn giản */}
        <div className="enter-section" onClick={handleEnter}>
          <span className="enter-text">Nhấn để bắt đầu hành trình</span>
          <span className="enter-arrow">↓</span>
        </div>

        {/* Footer */}
        <footer className="landing-footer">
          <p>Dự án học phần HCM202 - Tư tưởng Hồ Chí Minh</p>
          <p className="team-info">Nhóm 8 | 2026</p>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage
