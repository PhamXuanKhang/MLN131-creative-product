/**
 * Chat Panel — hỏi đáp về nội dung bảo tàng (Ctrl+K hoặc nút Hỏi đáp trên header).
 * Gửi câu hỏi + lịch sử phiên tới POST /api/chat (Vercel Function, OpenAI phía
 * server — frontend không bao giờ thấy API key). Trả lời kèm refs (slug sự kiện)
 * → chip "Xem sự kiện" mở EventPanel qua ?event=; sự kiện Việt Nam điều hướng
 * về /viet-nam (giữ đúng logic panel Tra cứu cũ). Lịch sử sống trong store —
 * đóng/mở panel không mất, hết phiên trình duyệt là mất. Pattern hội thoại
 * tham khảo 21st.dev (AI assistant message bar), CSS thuần --c-*.
 */
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getEventBySlug } from '@/data/adapter'
import { useMuseumStore } from '@/store/useMuseumStore'
import { useSelectedEvent } from '../useSelectedEvent'
import type { ChatResponse } from '@/types/chat'
import './ChatPanel.css'

/** Giới hạn phía client — server cũng tự kiểm tra lại. */
const MAX_INPUT_LENGTH = 500
/** Chỉ gửi các lượt gần nhất — đủ ngữ cảnh, không phình request. */
const HISTORY_LIMIT = 10

const GREETING =
  'Xin chào! Tôi là trợ lý của bảo tàng. Hãy hỏi tôi về 33 sự kiện đang trưng bày — ' +
  'từ sự ra đời của chủ nghĩa xã hội khoa học đến con đường đi lên CNXH ở Việt Nam.'

export default function ChatPanel() {
  const setChatOpen = useMuseumStore((s) => s.setChatOpen)
  const messages = useMuseumStore((s) => s.chatMessages)
  const pending = useMuseumStore((s) => s.chatPending)
  const error = useMuseumStore((s) => s.chatError)
  const beginRequest = useMuseumStore((s) => s.beginChatRequest)
  const { select } = useSelectedEvent()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const close = () => setChatOpen(false)

  // Autofocus input khi mở; đóng thì trả focus về phần tử trước đó (nút Hỏi đáp)
  useEffect(() => {
    const previous = document.activeElement
    inputRef.current?.focus()
    return () => {
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setChatOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setChatOpen])

  // Luôn cuộn xuống tin mới nhất / chỉ báo đang trả lời
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, pending, error])

  const send = async () => {
    const question = input.trim()
    if (!question || !beginRequest({ role: 'user', content: question })) return
    setInput('')

    const history = useMuseumStore
      .getState()
      .chatMessages.slice(-HISTORY_LIMIT)
      .map(({ role, content }) => ({ role, content }))

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data: Partial<ChatResponse> & { error?: string } = await res.json()
      if (!res.ok || typeof data.answer !== 'string') {
        throw new Error(data.error ?? 'Phản hồi không hợp lệ')
      }
      // Store giữ request đang chạy nên đóng/mở panel không thể xen thêm câu hỏi.
      useMuseumStore.getState().completeChatRequest({
        role: 'assistant',
        content: data.answer,
        refs: (data.refs ?? []).filter((slug) => getEventBySlug(slug)),
      })
    } catch {
      useMuseumStore
        .getState()
        .failChatRequest('Trợ lý đang gặp sự cố, bạn thử lại sau ít phút nhé.')
    }
  }

  const openEvent = (slug: string) => {
    const ev = getEventBySlug(slug)
    if (ev?.era === 'vietnam' && pathname !== '/viet-nam') {
      navigate(`/viet-nam?event=${slug}`)
    } else {
      select(slug)
    }
    close()
  }

  return (
    <div className="chat" role="dialog" aria-modal="true" aria-label="Hỏi đáp về nội dung bảo tàng">
      <div className="chat__backdrop" onClick={close} />
      <div className="chat__box">
        <header className="chat__header">
          <span className="chat__header-title">Hỏi đáp</span>
          <span className="chat__header-sub">Trợ lý trả lời từ nội dung trưng bày</span>
        </header>

        <div className="chat__messages" ref={scrollRef} aria-live="polite">
          <div className="chat__bubble chat__bubble--bot">{GREETING}</div>

          {messages.map((msg, i) => (
            <div key={i} className="chat__turn">
              <div
                className={
                  msg.role === 'user' ? 'chat__bubble chat__bubble--user' : 'chat__bubble chat__bubble--bot'
                }
              >
                {msg.content}
              </div>
              {msg.refs && msg.refs.length > 0 && (
                <div className="chat__refs">
                  {msg.refs.map((slug) => (
                    <button
                      key={slug}
                      type="button"
                      className="chat__ref"
                      onClick={() => openEvent(slug)}
                    >
                      Xem sự kiện: <span className="chat__ref-title">{getEventBySlug(slug)?.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {pending && (
            <div className="chat__bubble chat__bubble--bot chat__typing" aria-label="Đang trả lời">
              <span />
              <span />
              <span />
            </div>
          )}
          {error && <p className="chat__error">{error}</p>}
        </div>

        <form
          className="chat__composer"
          onSubmit={(e) => {
            e.preventDefault()
            void send()
          }}
        >
          <input
            ref={inputRef}
            className="chat__input"
            type="text"
            placeholder="Đặt câu hỏi về các sự kiện, giai đoạn…"
            aria-label="Câu hỏi"
            maxLength={MAX_INPUT_LENGTH}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="chat__send" disabled={pending || !input.trim()}>
            Gửi
          </button>
        </form>
      </div>
    </div>
  )
}
