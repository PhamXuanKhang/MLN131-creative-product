/**
 * Bản đồ World — Leaflet trên nền CARTO dark, marker glow theo giai đoạn.
 * MapController phản ứng khi ?event đổi: luôn đi qua bounds để 1..n locations
 * chung một code path; lần đầu (deep-link khi load) và reduced-motion thì
 * snap tức thì thay vì fly.
 */
import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { EraId, HistoricalEvent } from '@/types/events'
import EventMarker from './EventMarker'
import './WorldMap.css'

function MapController({ selected }: { selected: HistoricalEvent | null }) {
  const map = useMap()
  const firstRun = useRef(true)

  useEffect(() => {
    const isFirst = firstRun.current
    firstRun.current = false
    if (!selected || selected.locations.length === 0) return

    const bounds = L.latLngBounds(
      selected.locations.map((l) => [l.lat, l.lng] as [number, number]),
    )
    const wide = window.innerWidth > 720
    const opts = {
      // né EventPanel (520px bên phải) + thanh timeline dưới
      paddingTopLeft: [60, 80] as [number, number],
      paddingBottomRight: [wide ? 560 : 24, 150] as [number, number],
      maxZoom: 5,
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isFirst || prefersReduced) {
      map.fitBounds(bounds, { ...opts, animate: false })
    } else {
      map.flyToBounds(bounds, { ...opts, duration: 1.2 })
    }
  }, [selected, map])

  return null
}

interface WorldMapProps {
  events: HistoricalEvent[]
  selected: HistoricalEvent | null
  eraFilter: EraId | null
  onSelect: (slug: string) => void
}

export default function WorldMap({ events, selected, eraFilter, onSelect }: WorldMapProps) {
  // Bounds ban đầu = toàn bộ locations (không phụ thuộc filter)
  const allBounds = useMemo(
    () =>
      L.latLngBounds(
        events.flatMap((e) => e.locations.map((l) => [l.lat, l.lng] as [number, number])),
      ),
    [events],
  )

  // Filter ẩn markers era khác; event đang active luôn hiện (deep-link xuyên filter)
  const visible = eraFilter
    ? events.filter((e) => e.era === eraFilter || e.slug === selected?.slug)
    : events

  return (
    <div className="world-map">
      <MapContainer
        bounds={allBounds}
        boundsOptions={{ padding: [40, 40] }}
        minZoom={2}
        zoomControl={false}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapController selected={selected} />
        {visible.map((event) =>
          event.locations.map((loc, i) => (
            <EventMarker
              key={`${event.slug}-${i}`}
              event={event}
              location={loc}
              isActive={selected?.slug === event.slug}
              onSelect={onSelect}
            />
          )),
        )}
      </MapContainer>
    </div>
  )
}
