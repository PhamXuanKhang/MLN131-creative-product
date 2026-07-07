/**
 * Mode switcher — NavLink giữ href + active class; click thường được intercept
 * để đi qua film transition (theme flip xảy ra lúc màn bị che). Ctrl/middle-click,
 * back-forward và direct URL không đổi hành vi.
 */
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { playTransition } from '@/shared/Transition/playTransition'
import { useMuseumStore } from '@/store/useMuseumStore'

const MODES = [
  { to: '/the-gioi', label: 'Thế giới' },
  { to: '/viet-nam', label: 'Việt Nam' },
  { to: '/trac-nghiem', label: 'Trắc nghiệm' },
]

export default function ModeSwitcher() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isTransitioning = useMuseumStore((s) => s.isTransitioning)

  return (
    <nav className="mode-switcher" aria-label="Chọn khu trưng bày">
      {MODES.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `mode-switcher__link${isActive ? ' mode-switcher__link--active' : ''}`
          }
          onClick={(e) => {
            // Giữ hành vi trình duyệt cho mở tab mới / cửa sổ mới
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
            e.preventDefault()
            if (to === pathname || isTransitioning) return
            playTransition(() => navigate(to))
          }}
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
