/**
 * Cuộn phim dọc — frame nhân đôi 2 set để GSAP loop yPercent:-50 liền mạch.
 */
import type { HistoricalEvent } from '@/types/events'

export default function FilmStrip({ events }: { events: HistoricalEvent[] }) {
  return (
    <div className="film-reel">
      {[0, 1].map((copy) => (
        <div className="film-reel__set" key={copy} aria-hidden={copy === 1}>
          {events.map((event) => (
            <figure className="film-frame" key={`${copy}-${event.id}`}>
              <img src={event.image.thumb} alt="" loading="eager" draggable={false} />
              <figcaption>{event.year > 0 ? event.year : event.dateLabel}</figcaption>
            </figure>
          ))}
        </div>
      ))}
    </div>
  )
}
