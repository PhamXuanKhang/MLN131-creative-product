/**
 * Event Panel dùng chung — World, Vietnam, Knowledge, Quiz jump đều mở panel
 * này (root ở MuseumShell, remount theo ?event=<slug> nhờ key={slug}).
 * Paper reveal GSAP + typing summary (TextPlugin) + lightbox ảnh hero.
 */
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import type { HistoricalEvent } from '@/types/events'
import { ERAS } from '@/data/adapter'
import EventImage from '@/shared/EventImage/EventImage'
import './EventPanel.css'

gsap.registerPlugin(TextPlugin)

interface EventPanelProps {
  event: HistoricalEvent
  onClose: () => void
  /** Typing text cho summary sau paper reveal */
  enableTyping?: boolean
}

export default function EventPanel({ event, onClose, enableTyping = true }: EventPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Focus nút đóng khi mở; đóng thì trả focus về phần tử trước (marker/dot/row)
  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus()
    return () => {
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (lightboxOpen) setLightboxOpen(false)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, lightboxOpen])

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return
      const summary = event.summary.trim()
      const tl = gsap
        .timeline()
        .fromTo(
          '.event-panel',
          { xPercent: 100 },
          { xPercent: 0, duration: 0.45, ease: 'power3.out' },
        )
        .fromTo(
          '.event-panel__paper',
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 0.5, ease: 'power2.inOut' },
          '-=0.15',
        )
        .fromTo(
          '.event-panel__reveal',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.07, ease: 'power2.out' },
          '-=0.2',
        )
      if (enableTyping && summary) {
        const el = rootRef.current?.querySelector('.event-panel__summary')
        // Xoá text từ t=0 (trước khi panel hiện) rồi gõ lại sau reveal
        tl.set('.event-panel__summary', { text: '' }, 0).to(
          '.event-panel__summary',
          {
            text: summary,
            duration: Math.min(2.2, summary.length * 0.018),
            ease: 'none',
            onStart: () => el?.classList.add('event-panel__summary--typing'),
            onComplete: () => el?.classList.remove('event-panel__summary--typing'),
          },
          '-=0.1',
        )
      }
    },
    { scope: rootRef, dependencies: [event.slug, enableTyping] },
  )

  const eraMeta = ERAS.find((e) => e.id === event.era)
  const paragraphs = event.description.split(/\n+/).filter((p) => p.trim())
  const hasSources = event.sources.length > 0
  const hasSummary = Boolean(event.summary.trim())
  const hasImage = Boolean(event.image.full)

  return (
    <div className="event-panel-root" ref={rootRef}>
      <div className="event-panel__backdrop" onClick={onClose} aria-hidden="true" />
      <aside
        className="event-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="event-panel-title"
      >
        <button
          ref={closeRef}
          type="button"
          className="event-panel__close"
          onClick={onClose}
          aria-label="Đóng"
        >
          ✕
        </button>

        {hasImage ? (
          <button
            type="button"
            className="event-panel__hero-btn"
            onClick={() => setLightboxOpen(true)}
            aria-label="Phóng to ảnh"
          >
            <EventImage event={event} variant="full" className="event-panel__hero" />
          </button>
        ) : (
          <EventImage event={event} variant="full" className="event-panel__hero" />
        )}

        <div className="event-panel__paper">
          <div className="event-panel__meta event-panel__reveal">
            <span className="event-panel__date">{event.dateLabel || 'Chưa rõ thời gian'}</span>
            {eraMeta && <span className="event-panel__era">{eraMeta.label}</span>}
          </div>

          <h2 id="event-panel-title" className="event-panel__title event-panel__reveal">
            {event.title}
          </h2>

          {event.locations.length > 0 && (
            <p className="event-panel__locations event-panel__reveal">
              📍 {event.locations.map((l) => l.label).join(' · ')}
            </p>
          )}

          {hasSummary && (
            <p className="event-panel__summary event-panel__reveal">{event.summary}</p>
          )}

          <div className="event-panel__body event-panel__reveal">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => <p key={i}>{p}</p>)
            ) : (
              <p className="event-panel__missing">Nội dung chi tiết đang được nhóm bổ sung.</p>
            )}
          </div>

          {hasSources && (
            <div className="event-panel__sources event-panel__reveal">
              <h3>Nguồn thông tin</h3>
              <ul>
                {event.sources.map((s) => (
                  <li key={s}>
                    <a href={s} target="_blank" rel="noreferrer">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.imageSource && (
            <p className="event-panel__credit event-panel__reveal">
              Nguồn ảnh:{' '}
              <a href={event.imageSource} target="_blank" rel="noreferrer">
                {event.imageSource}
              </a>
            </p>
          )}
        </div>
      </aside>

      {lightboxOpen && (
        <div
          className="event-panel__lightbox"
          role="dialog"
          aria-label={`Ảnh: ${event.title}`}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            className="event-panel__lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Đóng ảnh"
          >
            ✕
          </button>
          <img src={event.image.full} alt={event.title} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}
