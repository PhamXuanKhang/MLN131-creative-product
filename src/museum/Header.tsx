import ModeSwitcher from './ModeSwitcher'
import { useMuseumStore } from '@/store/useMuseumStore'

export default function Header() {
  const audioMuted = useMuseumStore((s) => s.audioMuted)
  const toggleMute = useMuseumStore((s) => s.toggleMute)

  return (
    <header className="museum-header">
      <div className="museum-header__brand">
        <span className="museum-header__eyebrow">Bảo tàng số</span>
        <span className="museum-header__title">Chủ nghĩa xã hội khoa học</span>
      </div>
      <ModeSwitcher />
      <button
        type="button"
        className="museum-header__mute"
        onClick={toggleMute}
        aria-pressed={audioMuted}
        aria-label={audioMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
        title={audioMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
      >
        {audioMuted ? '🔇' : '🔊'}
      </button>
    </header>
  )
}
