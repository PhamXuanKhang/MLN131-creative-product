import ModeSwitcher from './ModeSwitcher'
import { useMuseumStore } from '@/store/useMuseumStore'

export default function Header() {
  const setChatOpen = useMuseumStore((s) => s.setChatOpen)

  return (
    <header className="museum-header">
      <div className="museum-header__brand">
        <span className="museum-header__eyebrow">Bảo tàng số</span>
        <span className="museum-header__title">Chủ nghĩa xã hội khoa học</span>
      </div>
      <ModeSwitcher />
      <button
        type="button"
        className="museum-header__search"
        onClick={() => setChatOpen(true)}
        title="Hỏi đáp về nội dung bảo tàng (Ctrl+K)"
      >
        Hỏi đáp
        <kbd aria-hidden="true">Ctrl K</kbd>
      </button>
    </header>
  )
}
