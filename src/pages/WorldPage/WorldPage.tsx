/**
 * World Mode — TUẦN 1: danh sách theo giai đoạn để chứng minh pipeline.
 * Tuần 2 thay bằng WorldRenderer (Leaflet + HorizontalTimeline).
 */
import { ERAS, getEventsByEra } from '@/data/adapter'
import EventGrid from './EventGrid'
import './WorldPage.css'

export default function WorldPage() {
  return (
    <div className="world-page">
      {ERAS.map((era) => {
        const events = getEventsByEra(era.id)
        if (events.length === 0) return null
        return (
          <section key={era.id} className="world-page__era">
            <header className="world-page__era-header">
              <h2 className="world-page__era-title">{era.label}</h2>
              <span className="world-page__era-range">
                {era.range} · {events.length} sự kiện
              </span>
            </header>
            <EventGrid events={events} />
          </section>
        )
      })}
    </div>
  )
}
