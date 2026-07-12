/**
 * Shell bảo tàng — layout route: header + mode switcher LUÔN giống nhau,
 * chỉ theme và nội dung (Outlet) đổi theo route.
 */
import { Suspense, useEffect, useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import OpeningOverlay from './OpeningOverlay/OpeningOverlay'
import ChatPanel from './ChatPanel/ChatPanel'
import { useSelectedEvent } from './useSelectedEvent'
import EventPanel from '@/shared/EventPanel/EventPanel'
import Transition from '@/shared/Transition/Transition'
import { useAudio } from '@/shared/AudioManager/useAudio'
import { useMuseumStore } from '@/store/useMuseumStore'
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
  const { event, select } = useSelectedEvent()
  const openingVisible = useMuseumStore((s) => s.openingVisible)
  const chatOpen = useMuseumStore((s) => s.chatOpen)
  const setAmbientMode = useMuseumStore((s) => s.setAmbient)
  useAudio()

  // Set trên <html> (không phải div của shell) để overlay/portal cùng nhận theme
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme
    setAmbientMode(theme === 'neutral' ? null : theme)
  }, [theme, setAmbientMode])

  // Ctrl/Cmd+K toggle Chat Panel (Hỏi đáp) — bỏ qua khi Opening còn phủ
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        const state = useMuseumStore.getState()
        if (!state.openingVisible) state.setChatOpen(!state.chatOpen)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="museum-shell">
      <Header />
      <main className="museum-shell__main">
        <Suspense fallback={<div className="museum-shell__loading">Đang mở phòng…</div>}>
          <Outlet />
        </Suspense>
      </main>
      {chatOpen && <ChatPanel />}
      {event && <EventPanel key={event.slug} event={event} onClose={() => select(null)} />}
      {openingVisible && <OpeningOverlay />}
      <Transition />
    </div>
  )
}
