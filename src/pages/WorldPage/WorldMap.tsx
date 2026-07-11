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

// Chủ quyền Hoàng Sa / Trường Sa — sao vàng 5 cánh nhỏ + tên, cỡ ngang nhãn
// tỉnh trên tile (tile nước ngoài ghi nhãn theo quy ước "tranh chấp", không
// thể hiện chủ quyền Việt Nam). Không tương tác, chỉ hiện z>=5 (.map-near).
const ARCHIPELAGOS = [
  { lat: 16.4, lng: 112.0, name: 'Hoàng Sa' },
  { lat: 9.6, lng: 113.8, name: 'Trường Sa' },
]

// Sao 5 cánh: outer R 5.7 / inner r 2.28, tâm (6,6), đỉnh hướng lên
const STAR_POINTS =
  '6,0.3 7.34,4.16 11.42,4.24 8.17,6.7 9.35,10.61 6,8.28 2.65,10.61 3.83,6.7 0.58,4.24 4.66,4.16'

const archipelagoIcon = (name: string) =>
  new DivIcon({
    html: `<div class="world-archipelago"><svg viewBox="0 0 12 11" width="11" height="10" aria-hidden="true"><polygon points="${STAR_POINTS}"/></svg><span>${name}</span></div>`,
    className: 'world-overlay-wrap',
    iconSize: [0, 0],
  })

// Việt hóa nhãn tiếng Anh nướng sẵn trong tile CARTO quanh Việt Nam (Hanoi,
// Ho Chi Minh City, VIETNAM… + nhãn lỗi "X Ward"). Mỗi entry là 1 hộp đè đúng
// bbox chữ gốc (đo từ tile PNG, xem scratchpad/measure.mjs) chứa chữ tiếng Việt;
// dot thành phố của tile nằm ngoài hộp nên giữ nguyên (dot: true = dot gốc bị
// hộp che, vẽ lại). align = phía neo hộp: right/left = mép cạnh dot, hộp nở về
// hướng ngược lại nếu chữ Việt dài hơn; w/h = kích thước tối thiểu che chữ gốc.
type ViLabel = {
  id: string
  z: 3 | 4 | 5 | 6 | 7
  lat: number
  lng: number
  text: string
  kind: 'town' | 'city' | 'country'
  align: 'left' | 'right' | 'center'
  w: number
  h: number
  bg?: string
  dot?: boolean
}

const VI_LABELS: ViLabel[] = [
  // Nhãn VIETNAM các zoom vắt ngang đường bờ biển → nền gradient đất→biển
  { id: 'vietnam-z3', z: 3, lat: 16.0, lng: 108.06, text: 'VIỆT NAM', kind: 'country', align: 'center', w: 60, h: 13, bg: 'linear-gradient(90deg,#0b0b0b 58%,#262626 74%)' },
  { id: 'vietnam-z4', z: 4, lat: 15.9613, lng: 107.9297, text: 'VIỆT NAM', kind: 'country', align: 'center', w: 62, h: 12, bg: 'linear-gradient(90deg,#0b0b0b 38%,#262626 55%)' },
  { id: 'hanoi-z5', z: 5, lat: 21.0435, lng: 105.9961, text: 'Hà Nội', kind: 'town', align: 'right', w: 37, h: 12 },
  { id: 'vietnam-z5', z: 5, lat: 15.9402, lng: 107.9517, text: 'VIỆT NAM', kind: 'country', align: 'center', w: 67, h: 13, bg: 'linear-gradient(90deg,#0b0b0b 60%,#262626 75%)' },
  { id: 'hcmc-z5', z: 5, lat: 10.747, lng: 105.3369, text: 'Thành phố\nHồ Chí Minh', kind: 'town', align: 'center', w: 70, h: 24, bg: '#0b0b0b' },
  { id: 'hanoi-z6', z: 6, lat: 21.0332, lng: 105.9302, text: 'Hà Nội', kind: 'town', align: 'right', w: 37, h: 11 },
  { id: 'haiphong-z6', z: 6, lat: 20.8383, lng: 106.6113, text: 'Hải Phòng', kind: 'town', align: 'left', w: 57, h: 14, bg: 'linear-gradient(90deg,#101010 8%,#262626 26%)' },
  { id: 'vietnam-z6', z: 6, lat: 15.9402, lng: 107.9517, text: 'VIỆT NAM', kind: 'country', align: 'center', w: 76, h: 14, bg: 'linear-gradient(90deg,#0c0c0c 55%,#262626 72%)' },
  { id: 'donghoi-z6', z: 6, lat: 17.4345, lng: 106.6992, text: 'Đồng Hới', kind: 'town', align: 'right', w: 85, h: 14 },
  { id: 'pleiku-z6', z: 6, lat: 13.9767, lng: 108.0835, text: 'Pleiku', kind: 'town', align: 'right', w: 69, h: 11 },
  { id: 'hcmc-z6', z: 6, lat: 10.7793, lng: 106.062, text: 'Thành phố\nHồ Chí Minh', kind: 'town', align: 'center', w: 74, h: 27 },
  { id: 'hanoi-z7', z: 7, lat: 21.023, lng: 105.8972, text: 'HÀ NỘI', kind: 'city', align: 'right', w: 46, h: 12 },
  { id: 'honggai-z7', z: 7, lat: 20.9512, lng: 107.1387, text: 'Hạ Long', kind: 'town', align: 'right', w: 85, h: 12, dot: true },
  { id: 'campha-z7', z: 7, lat: 21.0076, lng: 107.2375, text: 'Cẩm Phả', kind: 'town', align: 'left', w: 82, h: 11, bg: '#262626' },
  { id: 'donghoi-z7', z: 7, lat: 17.445, lng: 106.5784, text: 'Đồng Hới', kind: 'town', align: 'left', w: 84, h: 14, bg: 'linear-gradient(90deg,#111111 38%,#262626 58%)' },
  { id: 'quangtri-z7', z: 7, lat: 16.7309, lng: 107.2266, text: 'Quảng Trị', kind: 'town', align: 'right', w: 87, h: 14 },
  { id: 'danang-z7', z: 7, lat: 16.0669, lng: 108.2483, text: 'ĐÀ NẴNG', kind: 'city', align: 'right', w: 60, h: 12 },
  { id: 'pleiku-z7', z: 7, lat: 13.9767, lng: 108.0396, text: 'Pleiku', kind: 'town', align: 'right', w: 68, h: 12 },
  { id: 'dalat-z7', z: 7, lat: 11.9372, lng: 108.479, text: 'Đà Lạt', kind: 'town', align: 'right', w: 40, h: 11 },
  { id: 'hcmc-z7', z: 7, lat: 10.7955, lng: 106.2927, text: 'THÀNH PHỐ\nHỒ CHÍ MINH', kind: 'city', align: 'center', w: 82, h: 27, bg: '#0a0a0a' },
]

const viLabelIcon = (l: ViLabel) =>
  new DivIcon({
    html: `<div class="world-vi-label world-vi-label--${l.kind} world-vi-label--${l.align} world-vi-label--z${l.z}" style="min-width:${l.w}px;min-height:${l.h}px;${l.bg ? `background:${l.bg}` : ''}">${l.text
      .split('\n')
      .map((line) => `<span>${line}</span>`)
      .join('')}${l.dot ? '<i></i>' : ''}</div>`,
    className: 'world-overlay-wrap',
    iconSize: [0, 0],
  })

// Nhãn "Biển Đông" đè đúng vị trí nhãn biển đa ngữ "南海/South China Sea" của
// CARTO (anchor cố định ~15.06,114.95; render từ z5). Chỉ hiện z>=5 — dưới đó
// nhãn gốc không render, lớp che sẽ đè nhầm vùng khác.
const SEA_LABEL = { lat: 15.06, lng: 114.95 }

const WORLD_PAN_BOUNDS = L.latLngBounds(
  [-85, -240] as [number, number],
  [85, 240] as [number, number],
)

const seaIcon = new DivIcon({
  html: `<div class="world-sea-label"><span>Biển Đông</span></div>`,
  className: 'world-overlay-wrap',
  iconSize: [0, 0],
})

// Toggle class "map-near" (z>=5) + data-zoom trên container — CSS quyết định
// nhãn nào hiện ở zoom nào (sao HS-TS theo map-near, nhãn Việt hóa theo data-zoom)
function ZoomGate() {
  const map = useMap()
  useEffect(() => {
    const update = () => {
      const container = map.getContainer()
      const zoom = Math.round(map.getZoom())
      container.classList.toggle('map-near', zoom >= 5)
      container.dataset.zoom = String(zoom)
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
        maxBounds={WORLD_PAN_BOUNDS}
        maxBoundsViscosity={0.35}
        zoomControl={false}
        scrollWheelZoom
        worldCopyJump
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
        {ARCHIPELAGOS.map((a) => (
          <Marker
            key={a.name}
            position={[a.lat, a.lng]}
            icon={archipelagoIcon(a.name)}
            interactive={false}
            keyboard={false}
            zIndexOffset={-1000}
          />
        ))}
        {VI_LABELS.map((l) => (
          <Marker
            key={l.id}
            position={[l.lat, l.lng]}
            icon={viLabelIcon(l)}
            interactive={false}
            keyboard={false}
            zIndexOffset={-1200}
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
