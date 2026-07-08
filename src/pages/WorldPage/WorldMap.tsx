/**
 * Bản đồ World — Leaflet trên nền CARTO dark, marker glow theo giai đoạn.
 * MapController phản ứng khi ?event đổi: luôn đi qua bounds để 1..n locations
 * chung một code path; lần đầu (deep-link khi load) và reduced-motion thì
 * snap tức thì thay vì fly.
 */
import { useEffect, useMemo, useRef } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import L, { DivIcon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { EraId, HistoricalEvent } from '@/types/events'
import EventMarker from './EventMarker'
import './WorldMap.css'

// Nhãn chủ quyền Hoàng Sa / Trường Sa — vẽ đè lên tile CARTO (tile nước ngoài
// ghi nhãn theo quy ước "tranh chấp", không thể hiện chủ quyền Việt Nam).
// Không tương tác, nằm dưới marker sự kiện. Zoom xa (<5) hai quần đảo chỉ cách
// vài chục px → gộp 1 nhãn chung ("--far"), z>=5 tách 2 nhãn đúng vị trí ("--near").
const SOVEREIGNTY_LABELS: { lat: number; lng: number; name: string; variant: string }[] = [
  { lat: 13.2, lng: 113.2, name: 'Quần đảo Hoàng Sa & Trường Sa', variant: 'far' },
  { lat: 16.4, lng: 112.0, name: 'Quần đảo Hoàng Sa', variant: 'near' },
  { lat: 9.6, lng: 113.8, name: 'Quần đảo Trường Sa', variant: 'near' },
]

const sovereigntyIcon = (name: string, variant: string) =>
  new DivIcon({
    html: `<div class="world-sovereignty world-sovereignty--${variant}"><span>${name}</span><span class="world-sovereignty__nation">Việt Nam</span></div>`,
    className: 'world-sovereignty-wrap',
    iconSize: [0, 0],
  })

// Nhãn "Biển Đông" đè đúng vị trí nhãn biển đa ngữ "南海/South China Sea" của
// CARTO (anchor cố định ~15.06,114.95; render từ z5). Chỉ hiện z>=5 — dưới đó
// nhãn gốc không render, lớp che sẽ đè nhầm vùng khác.
const SEA_LABEL = { lat: 15.06, lng: 114.95 }

const seaIcon = new DivIcon({
  html: `<div class="world-sea-label"><span>Biển Đông</span></div>`,
  className: 'world-sovereignty-wrap',
  iconSize: [0, 0],
})

// Toggle class "map-near" trên container khi z>=5 — CSS quyết định nhãn nào hiện
function ZoomGate() {
  const map = useMap()
  useEffect(() => {
    const update = () => {
      map.getContainer().classList.toggle('map-near', map.getZoom() >= 5)
    }
    update()
    map.on('zoomend', update)
    return () => {
      map.off('zoomend', update)
    }
  }, [map])
  return null
}

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
        // z8+ tile CARTO render nhãn hành chính TQ đặt trái phép trên Hoàng Sa
        // (Sansha/Qilianyu/Yongle Qundao) — cap z7; app chỉ cần z5 khi chọn event
        maxZoom={7}
        zoomControl={false}
        scrollWheelZoom
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapController selected={selected} />
        <ZoomGate />
        <Marker
          position={[SEA_LABEL.lat, SEA_LABEL.lng]}
          icon={seaIcon}
          interactive={false}
          keyboard={false}
          zIndexOffset={-1100}
        />
        {SOVEREIGNTY_LABELS.map((s) => (
          <Marker
            key={s.name}
            position={[s.lat, s.lng]}
            icon={sovereigntyIcon(s.name, s.variant)}
            interactive={false}
            keyboard={false}
            zIndexOffset={-1000}
          />
        ))}
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
