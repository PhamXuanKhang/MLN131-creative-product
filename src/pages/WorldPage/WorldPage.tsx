/**
 * World Mode — WorldRenderer: Leaflet map full-viewport + EraFilter +
 * HorizontalTimeline. Selection sống trong URL (?event=<slug>) —
 * marker/timeline chỉ gọi select(slug), EventPanel do MuseumShell mở.
 */
import { Navigate } from 'react-router-dom'
import { ERAS, getAllEvents } from '@/data/adapter'
import { useSelectedEvent } from '@/museum/useSelectedEvent'
import { useMuseumStore } from '@/store/useMuseumStore'
import WorldMap from './WorldMap'
import EraFilter from './EraFilter'
import HorizontalTimeline from './HorizontalTimeline'
import './WorldPage.css'

// Phòng thế giới chỉ trưng 3 giai đoạn quốc tế — sự kiện Việt Nam có phòng riêng (/viet-nam)
const events = getAllEvents().filter((e) => e.era !== 'vietnam')
const worldEras = ERAS.filter((e) => e.id !== 'vietnam')

export default function WorldPage() {
  const { event: selected, select } = useSelectedEvent()
  const eraFilter = useMuseumStore((s) => s.eraFilter)
  const worldEraFilter = eraFilter === 'vietnam' ? null : eraFilter

  if (selected?.era === 'vietnam') {
    return <Navigate to={`/viet-nam?event=${encodeURIComponent(selected.slug)}`} replace />
  }

  return (
    <div className="world-page">
      <WorldMap events={events} selected={selected} eraFilter={worldEraFilter} onSelect={select} />
      <EraFilter eras={worldEras} />
      <HorizontalTimeline
        events={events}
        activeSlug={selected?.slug ?? null}
        eraFilter={worldEraFilter}
        onSelect={select}
      />
    </div>
  )
}
