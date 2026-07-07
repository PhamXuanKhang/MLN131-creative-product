/**
 * World Mode — WorldRenderer: Leaflet map full-viewport + EraFilter +
 * HorizontalTimeline. Selection sống trong URL (?event=<slug>) —
 * marker/timeline chỉ gọi select(slug), EventPanel do MuseumShell mở.
 */
import { getAllEvents } from '@/data/adapter'
import { useSelectedEvent } from '@/museum/useSelectedEvent'
import { useMuseumStore } from '@/store/useMuseumStore'
import WorldMap from './WorldMap'
import EraFilter from './EraFilter'
import HorizontalTimeline from './HorizontalTimeline'
import './WorldPage.css'

const events = getAllEvents()

export default function WorldPage() {
  const { event: selected, select } = useSelectedEvent()
  const eraFilter = useMuseumStore((s) => s.eraFilter)

  return (
    <div className="world-page">
      <WorldMap events={events} selected={selected} eraFilter={eraFilter} onSelect={select} />
      <EraFilter />
      <HorizontalTimeline
        events={events}
        activeSlug={selected?.slug ?? null}
        eraFilter={eraFilter}
        onSelect={select}
      />
    </div>
  )
}
