/**
 * Một marker cho một (event × location) — event nhiều địa điểm render nhiều
 * marker, click marker nào cũng chọn cùng slug (URL là source of truth).
 * Pattern DivIcon + useMemo icon kế thừa từ MapView cũ.
 */
import { useMemo } from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import { DivIcon } from 'leaflet'
import type { EraId, EventLocation, HistoricalEvent } from '@/types/events'
import { ERA_COLOR } from './eraColors'

function createEraIcon(era: EraId, isActive: boolean) {
  const size = isActive ? 22 : 14
  return new DivIcon({
    html: `<div class="world-marker${isActive ? ' world-marker--active' : ''}" style="--marker-color:${ERA_COLOR[era]}"></div>`,
    className: 'world-marker-wrap',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

interface EventMarkerProps {
  event: HistoricalEvent
  location: EventLocation
  isActive: boolean
  onSelect: (slug: string) => void
}

export default function EventMarker({ event, location, isActive, onSelect }: EventMarkerProps) {
  const icon = useMemo(() => createEraIcon(event.era, isActive), [event.era, isActive])

  return (
    <Marker
      position={[location.lat, location.lng]}
      icon={icon}
      zIndexOffset={isActive ? 1000 : 0}
      eventHandlers={{ click: () => onSelect(event.slug) }}
    >
      <Tooltip direction="top" offset={[0, -10]}>
        {event.year > 0 ? `${event.year} — ${event.title}` : event.title}
      </Tooltip>
    </Marker>
  )
}
