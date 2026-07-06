/**
 * Shell bảo tàng — layout route: header + mode switcher LUÔN giống nhau,
 * chỉ theme và nội dung (Outlet) đổi theo route.
 */
import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import './MuseumShell.css'

type ThemeId = 'neutral' | 'world' | 'vietnam'

const THEME_BY_PATH: Record<string, ThemeId> = {
  '/the-gioi': 'world',
  '/viet-nam': 'vietnam',
  '/trac-nghiem': 'neutral',
}

export default function MuseumShell() {
  const { pathname } = useLocation()
  const theme = THEME_BY_PATH[pathname] ?? 'world'

  // Set trên <html> (không phải div của shell) để overlay/portal cùng nhận theme
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  return (
    <div className="museum-shell">
      <Header />
      <main className="museum-shell__main">
        <Outlet />
      </main>
    </div>
  )
}
