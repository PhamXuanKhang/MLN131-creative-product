/**
 * Event Panel dùng chung — World, Vietnam, Knowledge, Quiz jump đều mở panel
 * này (root ở MuseumShell, remount theo ?event=<slug> nhờ key={slug}).
 * Paper reveal GSAP + typing content + lightbox ảnh hero.
 */
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import type { HistoricalEvent } from '@/types/events'
import { ERAS } from '@/data/adapter'
import EventImage from '@/shared/EventImage/EventImage'
import './EventPanel.css'


interface EventPanelProps {
  event: HistoricalEvent
  onClose: () => void
  /** Typing text cho nội dung sau paper reveal */
  enableTyping?: boolean
}

export default function EventPanel({ event, onClose, enableTyping = true }: EventPanelProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [typedText, setTypedText] = useState('')

  const eraMeta = ERAS.find((e) => e.id === event.era)
  const paragraphs = event.description
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
  const firstParagraph = paragraphs[0] ?? ''
  const isTyping = enableTyping && typedText.length > 0 && typedText.length < firstParagraph.length
  const hasSources = event.sources.length > 0
  const images = event.images?.length ? event.images : event.image.full ? [event.image] : []
  const hasImage = images.length > 0

  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

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
      if (lightboxIndex !== null) setLightboxIndex(null)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, lightboxIndex])

  useEffect(() => {
    if (!enableTyping || !firstParagraph) return

    const step = Math.max(1, Math.ceil(firstParagraph.length / 90))
    let nextLength = 0
    const tick = window.setInterval(() => {
      nextLength = Math.min(firstParagraph.length, nextLength + step)
      setTypedText(firstParagraph.slice(0, nextLength))
      if (nextLength >= firstParagraph.length) window.clearInterval(tick)
    }, 16)

    return () => window.clearInterval(tick)
  }, [enableTyping, event.slug, firstParagraph])

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap
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
    },
    { scope: rootRef, dependencies: [event.slug] },
  )

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
            onClick={() => setLightboxIndex(0)}
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

          <div className="event-panel__body event-panel__reveal">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className={i === 0 && isTyping ? 'event-panel__body-text--typing' : undefined}>
                  {i === 0 && enableTyping ? typedText : p}
                </p>
              ))
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
          {images.length > 1 && (
            <div className="event-panel__gallery event-panel__reveal" aria-label="Thư viện ảnh">
              {images.map((image, index) => (
                <button
                  key={image.full}
                  type="button"
                  className="event-panel__gallery-item"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={`Phóng to ảnh ${index + 1}`}
                >
                  <img src={image.thumb} alt={`${event.title} - ảnh ${index + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="event-panel__lightbox"
          role="dialog"
          aria-label={`Ảnh: ${event.title}`}
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="event-panel__lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Đóng ảnh"
          >
            ✕
          </button>
          <img src={images[lightboxIndex].full} alt={event.title} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  )
}

