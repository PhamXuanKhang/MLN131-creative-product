/**
 * Grid card sự kiện — placeholder TUẦN 1 để chứng minh adapter/deep-link/panel.
 * Tuần 2 WorldRenderer (Leaflet) thay grid này; wiring click → ?event giữ nguyên.
 */
import type { HistoricalEvent } from '@/types/events'
import { useSelectedEvent } from '@/museum/useSelectedEvent'
import EventImage from '@/shared/EventImage/EventImage'
import './EventGrid.css'

export default function EventGrid({ events }: { events: HistoricalEvent[] }) {
  const { event: selected, select } = useSelectedEvent()

  return (
    <div className="event-grid">
      {events.map((event) => (
        <button
          key={event.id}
          type="button"
          className={`event-card${selected?.slug === event.slug ? ' event-card--active' : ''}`}
          onClick={() => select(event.slug)}
        >
          <EventImage event={event} variant="thumb" className="event-card__thumb" />
          <span className="event-card__date">{event.dateLabel}</span>
          <span className="event-card__title">{event.title}</span>
        </button>
      ))}
    </div>
  )
}
