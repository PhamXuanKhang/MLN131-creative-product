/**
 * Card giấy dó — target tương tác duy nhất của mỗi section (button-card,
 * theo precedent EventGrid tuần 1). Nội dung chi tiết mở qua EventPanel chung.
 */
import type { HistoricalEvent } from '@/types/events'
import EventImage from '@/shared/EventImage/EventImage'
import './GiayDoCard.css'

interface GiayDoCardProps {
  event: HistoricalEvent
  active: boolean
  onOpen: () => void
}

export default function GiayDoCard({ event, active, onOpen }: GiayDoCardProps) {
  return (
    <button
      type="button"
      className={`giay-do-card${active ? ' giay-do-card--active' : ''}`}
      onClick={onOpen}
    >
      <EventImage event={event} variant="thumb" className="giay-do-card__media" />
      <span className="giay-do-card__date">{event.dateLabel}</span>
      <span className="giay-do-card__title">{event.title}</span>
      <span className="giay-do-card__summary">{event.description}</span>
      <span className="giay-do-card__more">Xem chi tiết →</span>
    </button>
  )
}
