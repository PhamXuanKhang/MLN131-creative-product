/**
 * Knowledge Panel — tra cứu sự kiện (Ctrl+K hoặc nút Tra cứu trên header):
 * search không dấu trên title/summary + filter era (tái dùng EraFilter/store),
 * kết quả group theo giai đoạn; chọn → mở EventPanel qua ?event= trên route
 * hiện tại. Pattern command-palette (tham khảo 21st.dev), CSS thuần --c-*.
 */
import { useEffect, useRef, useState } from 'react'
import { ERAS, getAllEvents } from '@/data/adapter'
import { useMuseumStore } from '@/store/useMuseumStore'
import { useSelectedEvent } from '../useSelectedEvent'
import EraFilter from '@/pages/WorldPage/EraFilter'
import { ERA_COLOR } from '@/pages/WorldPage/eraColors'
import './KnowledgePanel.css'

/** Bỏ dấu tiếng Việt để search "doi moi" khớp "Đổi mới". */
const normalize = (s: string) =>
  s
    .toLowerCase()
    .replaceAll('đ', 'd')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')

const ALL_EVENTS = getAllEvents()

export default function KnowledgePanel() {
  const setKnowledgeOpen = useMuseumStore((s) => s.setKnowledgeOpen)
  const eraFilter = useMuseumStore((s) => s.eraFilter)
  const { select } = useSelectedEvent()
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const close = () => setKnowledgeOpen(false)

  // Autofocus input khi mở; đóng thì trả focus về phần tử trước đó (nút Tra cứu)
  useEffect(() => {
    const previous = document.activeElement
    inputRef.current?.focus()
    return () => {
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setKnowledgeOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setKnowledgeOpen])

  const q = normalize(query.trim())
  const filtered = ALL_EVENTS.filter(
    (ev) =>
      (!eraFilter || ev.era === eraFilter) &&
      (!q || normalize(ev.title).includes(q) || normalize(ev.summary).includes(q)),
  )
  const groups = ERAS.map((era) => ({
    era,
    events: filtered.filter((ev) => ev.era === era.id),
  })).filter((group) => group.events.length > 0)

  const pick = (slug: string) => {
    select(slug)
    close()
  }

  return (
    <div className="knowledge" role="dialog" aria-modal="true" aria-label="Tra cứu sự kiện">
      <div className="knowledge__backdrop" onClick={close} />
      <div className="knowledge__box">
        <input
          ref={inputRef}
          className="knowledge__input"
          type="text"
          placeholder="Tìm sự kiện theo tên hoặc nội dung…"
          aria-label="Tìm sự kiện"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && filtered.length > 0) pick(filtered[0].slug)
          }}
        />
        <div className="knowledge__filter">
          <EraFilter />
        </div>
        <div className="knowledge__results">
          {groups.length === 0 && <p className="knowledge__empty">Không tìm thấy sự kiện nào.</p>}
          {groups.map(({ era, events }) => (
            <section key={era.id} className="knowledge__group">
              <h3 className="knowledge__group-title">{era.label}</h3>
              <ul className="knowledge__list">
                {events.map((ev) => (
                  <li key={ev.slug}>
                    <button type="button" className="knowledge__row" onClick={() => pick(ev.slug)}>
                      <span
                        className="knowledge__dot"
                        style={{ background: ERA_COLOR[ev.era] }}
                        aria-hidden="true"
                      />
                      <span className="knowledge__title">{ev.title}</span>
                      <span className="knowledge__date">{ev.dateLabel}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
