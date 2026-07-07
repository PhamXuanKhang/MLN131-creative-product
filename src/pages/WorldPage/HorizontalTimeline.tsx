/**
 * Timeline ngang (1831→nay) — thanh overlay dưới map, xây trên useTimeline
 * (vị trí 0..1 theo năm). Hai chiều qua URL: click dot → select(slug);
 * active đổi (click marker/deep-link) → auto-center dot trong scroller.
 */
import { useEffect, useMemo, useRef } from 'react'
import { useTimeline } from '@/shared/timeline/useTimeline'
import { spreadPositions } from '@/shared/timeline/spreadPositions'
import type { EraId, HistoricalEvent } from '@/types/events'
import { ERA_COLOR } from './eraColors'
import './HorizontalTimeline.css'

/**
 * Năm ước lượng cho event year<=0 (dữ liệu xlsx chưa có năm): trung điểm
 * năm hợp lệ liền kề trong cùng era theo order — tự đúng lại khi nhóm sửa xlsx.
 */
function estimateYear(event: HistoricalEvent, events: HistoricalEvent[]): number {
  const mates = events
    .filter((e) => e.era === event.era && e.year > 0)
    .sort((a, b) => a.order - b.order)
  const prev = [...mates].reverse().find((e) => e.order < event.order)
  const next = mates.find((e) => e.order > event.order)
  if (prev && next) return Math.round((prev.year + next.year) / 2)
  return prev?.year ?? next?.year ?? 0
}

interface HorizontalTimelineProps {
  events: HistoricalEvent[]
  activeSlug: string | null
  eraFilter: EraId | null
  onSelect: (slug: string) => void
}

export default function HorizontalTimeline({
  events,
  activeSlug,
  eraFilter,
  onSelect,
}: HorizontalTimelineProps) {
  // Patch bản copy cho year<=0 — không mutate HistoricalEvent gốc từ adapter
  const patched = useMemo(
    () => events.map((e) => (e.year > 0 ? e : { ...e, year: estimateYear(e, events) })),
    [events],
  )
  const { items, minYear, maxYear } = useTimeline(patched, { activeSlug })
  const dots = useMemo(() => spreadPositions(items), [items])

  const ticks = useMemo(() => {
    const span = Math.max(1, maxYear - minYear)
    const result: { year: number; position: number }[] = []
    for (let y = Math.ceil(minYear / 20) * 20; y <= maxYear; y += 20) {
      result.push({ year: y, position: (y - minYear) / span })
    }
    return result
  }, [minYear, maxYear])

  // Sync ngược: cuộn dot active vào giữa scroller (không dùng scrollIntoView
  // vì có thể cuộn cả ancestor)
  const scrollerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!activeSlug || !scroller) return
    const dot = scroller.querySelector<HTMLElement>(`[data-slug="${CSS.escape(activeSlug)}"]`)
    if (!dot) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.scrollTo({
      left: dot.offsetLeft + dot.offsetWidth / 2 - scroller.clientWidth / 2,
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }, [activeSlug])

  return (
    <div className="h-timeline">
      <div className="h-timeline__scroller" ref={scrollerRef}>
        <div className="h-timeline__track">
          <div className="h-timeline__inner">
            <div className="h-timeline__axis" aria-hidden="true" />
            {ticks.map((tick) => (
              <div
                key={tick.year}
                className="h-timeline__tick"
                style={{ left: `${tick.position * 100}%` }}
                aria-hidden="true"
              >
                <span>{tick.year}</span>
              </div>
            ))}
            {dots.map(({ event, position, isActive }) => {
              const filtered = eraFilter !== null && event.era !== eraFilter && !isActive
              return (
                <button
                  key={event.slug}
                  type="button"
                  data-slug={event.slug}
                  className={[
                    'h-timeline__dot',
                    isActive && 'h-timeline__dot--active',
                    filtered && 'h-timeline__dot--filtered',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  style={
                    {
                      left: `${position * 100}%`,
                      '--marker-color': ERA_COLOR[event.era],
                    } as React.CSSProperties
                  }
                  disabled={filtered}
                  onClick={() => onSelect(event.slug)}
                  aria-label={`${event.dateLabel} — ${event.title}`}
                >
                  <span className="h-timeline__label">
                    <span className="h-timeline__label-date">{event.dateLabel}</span>
                    <span className="h-timeline__label-title">{event.title}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
