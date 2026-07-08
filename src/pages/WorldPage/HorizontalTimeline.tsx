/**
 * Timeline ngang — thanh overlay dưới map: 33 sự kiện gom thành ~9 cụm theo
 * giai đoạn (vừa khung, không scroll), mỗi cụm có badge số + khoảng năm + dãy
 * chấm sự kiện; cụm chứa sự kiện đang xem hiện thêm dòng tên sự kiện. Nút
 * ◀ ▶ ở hai đầu đi tuần tự qua từng sự kiện. Hai chiều qua URL: click →
 * select(slug); active đổi (click marker/deep-link) → highlight cụm tương ứng.
 */
import { useEffect, useMemo, useRef } from 'react'
import type { EraId, HistoricalEvent } from '@/types/events'
import { ERA_COLOR } from './eraColors'
import './HorizontalTimeline.css'

/** Cỡ cụm mong muốn — 33 sự kiện / 4 ≈ 9 cụm, vừa khung 1024px+ */
const GROUP_TARGET_SIZE = 4

/**
 * Năm ước lượng cho event year<=0 (dữ liệu xlsx chưa có năm): trung điểm
 * năm hợp lệ liền kề trong cùng era theo order — tự đúng lại khi nhóm sửa
 * xlsx. Chỉ dùng để SẮP THỨ TỰ/gom cụm; hiển thị vẫn dùng dateLabel gốc.
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

/** Sắp lại theo era → năm (ước lượng cho year<=0) → order, không mutate event. */
function orderByEstimatedYear(events: HistoricalEvent[]): HistoricalEvent[] {
  const sortYear = new Map(
    events.map((e) => [e.slug, e.year > 0 ? e.year : estimateYear(e, events)]),
  )
  const eras = [...new Set(events.map((e) => e.era))]
  return eras.flatMap((era) =>
    events
      .filter((e) => e.era === era)
      .sort(
        (a, b) => (sortYear.get(a.slug) ?? 0) - (sortYear.get(b.slug) ?? 0) || a.order - b.order,
      ),
  )
}

interface TimelineGroup {
  era: EraId
  label: string
  events: HistoricalEvent[]
}

/** Chia sự kiện (đã sort era → year) thành các cụm liên tiếp trong từng era. */
function buildGroups(events: HistoricalEvent[]): TimelineGroup[] {
  const groups: TimelineGroup[] = []
  const eras = [...new Set(events.map((e) => e.era))]
  for (const era of eras) {
    const eraEvents = events.filter((e) => e.era === era)
    const chunkCount = Math.max(1, Math.round(eraEvents.length / GROUP_TARGET_SIZE))
    for (let i = 0; i < chunkCount; i++) {
      const start = Math.round((i * eraEvents.length) / chunkCount)
      const end = Math.round(((i + 1) * eraEvents.length) / chunkCount)
      const chunk = eraEvents.slice(start, end)
      const years = chunk.map((e) => e.year).filter((y) => y > 0)
      const label = years.length
        ? Math.min(...years) === Math.max(...years)
          ? String(years[0])
          : `${Math.min(...years)}–${Math.max(...years)}`
        : chunk[0].dateLabel
      groups.push({ era, label, events: chunk })
    }
  }
  return groups
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
    </svg>
  )
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
  const ordered = useMemo(() => orderByEstimatedYear(events), [events])
  const groups = useMemo(() => buildGroups(ordered), [ordered])

  // ◀ ▶ đi tuần tự; khi đang lọc era thì chỉ đi trong era đó
  const navList = useMemo(
    () => (eraFilter === null ? ordered : ordered.filter((e) => e.era === eraFilter)),
    [ordered, eraFilter],
  )
  const navIndex = activeSlug ? navList.findIndex((e) => e.slug === activeSlug) : -1
  const goPrev = () => {
    const target = navIndex === -1 ? navList[navList.length - 1] : navList[navIndex - 1]
    if (target) onSelect(target.slug)
  }
  const goNext = () => {
    const target = navIndex === -1 ? navList[0] : navList[navIndex + 1]
    if (target) onSelect(target.slug)
  }

  // Scrollbar ẩn — nếu màn hẹp làm track tràn, tự cuộn chấm active vào giữa
  const scrollerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!activeSlug || !scroller || scroller.scrollWidth <= scroller.clientWidth) return
    const dot = scroller.querySelector<HTMLElement>(`[data-slug="${CSS.escape(activeSlug)}"]`)
    if (!dot) return
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    scroller.scrollTo({
      left: dot.offsetLeft + dot.offsetWidth / 2 - scroller.clientWidth / 2,
      behavior: prefersReduced ? 'auto' : 'smooth',
    })
  }, [activeSlug])

  return (
    <div className="h-timeline" role="group" aria-label="Dòng thời gian sự kiện">
      <button
        type="button"
        className="h-timeline__nav"
        disabled={navIndex === 0}
        onClick={goPrev}
        aria-label="Sự kiện trước"
      >
        <Chevron direction="left" />
      </button>
      <div className="h-timeline__scroller" ref={scrollerRef}>
        <div className="h-timeline__track">
          {groups.map((group, groupIndex) => {
            const activeEvent = group.events.find((e) => e.slug === activeSlug) ?? null
            const activeIndex = activeEvent ? group.events.indexOf(activeEvent) : -1
            const filtered = eraFilter !== null && group.era !== eraFilter && !activeEvent
            return (
              <div
                key={group.events[0].slug}
                className={[
                  'h-timeline__group',
                  activeEvent && 'h-timeline__group--active',
                  filtered && 'h-timeline__group--filtered',
                ]
                  .filter(Boolean)
                  .join(' ')}
                style={{ '--marker-color': ERA_COLOR[group.era] } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="h-timeline__head"
                  disabled={filtered}
                  onClick={() => onSelect(group.events[0].slug)}
                  aria-label={`Cụm ${group.label} — ${group.events.length} sự kiện`}
                >
                  <span className="h-timeline__badge">{groupIndex + 1}</span>
                  <span className="h-timeline__range">{group.label}</span>
                </button>
                <span className="h-timeline__dots">
                  {group.events.map((event) => (
                    <button
                      key={event.slug}
                      type="button"
                      data-slug={event.slug}
                      className={[
                        'h-timeline__dot',
                        event.slug === activeSlug && 'h-timeline__dot--active',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      disabled={filtered}
                      onClick={() => onSelect(event.slug)}
                      aria-label={`${event.dateLabel} — ${event.title}`}
                      aria-current={event.slug === activeSlug ? 'true' : undefined}
                    />
                  ))}
                </span>
                {activeEvent && (
                  <span className="h-timeline__current">
                    <b>{activeEvent.year > 0 ? activeEvent.year : activeEvent.dateLabel}</b>
                    <span className="h-timeline__count">
                      {' '}
                      ({activeIndex + 1}/{group.events.length})
                    </span>
                    {' · '}
                    {activeEvent.title}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <button
        type="button"
        className="h-timeline__nav"
        disabled={navIndex === navList.length - 1}
        onClick={goNext}
        aria-label="Sự kiện tiếp theo"
      >
        <Chevron direction="right" />
      </button>
    </div>
  )
}
