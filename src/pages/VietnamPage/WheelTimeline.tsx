/**
 * WheelTimeline — cung ¼ bánh xe fixed mép phải (desktop ≥1024px):
 * 8 chấm đặt THEO TỈ LỆ NĂM (useTimeline) — cho thấy khoảng trống 1946→1976
 * mà các section chia đều cố tình ẩn — kiêm điều hướng nhanh (click → cuộn
 * tới section). Xoay nhẹ + progress fill gắn ở VietnamRenderer khi motion bật.
 */
import { useMemo } from 'react'
import type { HistoricalEvent } from '@/types/events'
import { useTimeline } from '@/shared/timeline/useTimeline'
import { spreadPositions } from '@/shared/timeline/spreadPositions'
import './WheelTimeline.css'

const VIEW_W = 160
const VIEW_H = 520
const CX = 460 // tâm bánh xe nằm ngoài mép phải → cung bung về trái
const CY = 260
const R = 380
const ANGLE_SPAN = 70 // độ, đối xứng quanh apex

function pointAt(position: number): { x: number; y: number } {
  const deg = -ANGLE_SPAN / 2 + position * ANGLE_SPAN
  const rad = (deg * Math.PI) / 180
  return { x: CX - R * Math.cos(rad), y: CY + R * Math.sin(rad) }
}

// Cung vẽ bằng polyline qua chính pointAt → khớp tuyệt đối với vị trí chấm
const ARC_PATH = Array.from({ length: 25 }, (_, i) => pointAt(i / 24))
  .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
  .join(' ')

interface WheelTimelineProps {
  events: HistoricalEvent[]
  activeSlug: string | null
  onSelect: (slug: string) => void
}

export default function WheelTimeline({ events, activeSlug, onSelect }: WheelTimelineProps) {
  const { items } = useTimeline(events, { activeSlug })
  const dots = useMemo(() => spreadPositions(items, 0.05), [items])

  return (
    <nav className="wheel-timeline" aria-label="Dòng thời gian Việt Nam theo năm">
      <div className="wheel-timeline__rotor">
        <svg
          className="wheel-timeline__svg"
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          aria-hidden="true"
        >
          <path className="wheel-timeline__arc" d={ARC_PATH} />
          <path className="wheel-timeline__progress" d={ARC_PATH} pathLength="1" />
        </svg>
        {dots.map(({ event, position, isActive }) => {
          const { x, y } = pointAt(position)
          return (
            <button
              key={event.slug}
              type="button"
              className={`wheel-timeline__dot${isActive ? ' wheel-timeline__dot--active' : ''}`}
              style={{ left: `${(x / VIEW_W) * 100}%`, top: `${(y / VIEW_H) * 100}%` }}
              onClick={() => onSelect(event.slug)}
              aria-label={`${event.dateLabel} — ${event.title}`}
            >
              <span className="wheel-timeline__year">{event.year}</span>
              <span className="wheel-timeline__label">{event.title}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
