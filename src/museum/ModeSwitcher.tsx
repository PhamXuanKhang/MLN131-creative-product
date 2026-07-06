import { NavLink } from 'react-router-dom'

const MODES = [
  { to: '/the-gioi', label: 'Thế giới' },
  { to: '/viet-nam', label: 'Việt Nam' },
  { to: '/trac-nghiem', label: 'Trắc nghiệm' },
]

export default function ModeSwitcher() {
  return (
    <nav className="mode-switcher" aria-label="Chọn khu trưng bày">
      {MODES.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `mode-switcher__link${isActive ? ' mode-switcher__link--active' : ''}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
