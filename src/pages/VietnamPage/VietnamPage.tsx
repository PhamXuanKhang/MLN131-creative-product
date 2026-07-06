/**
 * Vietnam Mode — TUẦN 1: danh sách era 'vietnam' để chứng minh theme + data.
 * Tuần 3 thay bằng VietnamRenderer (tre mọc theo scroll + card giấy dó).
 */
import { ERAS, getEventsByEra } from '@/data/adapter'
import EventGrid from '@/pages/WorldPage/EventGrid'
import './VietnamPage.css'

const era = ERAS.find((e) => e.id === 'vietnam')!

export default function VietnamPage() {
  const events = getEventsByEra('vietnam')
  return (
    <div className="vietnam-page">
      <header className="vietnam-page__header">
        <h2 className="vietnam-page__title">{era.label}</h2>
        <p className="vietnam-page__sub">
          {era.range} · {events.length} sự kiện — từ Cương lĩnh 1930 đến hôm nay
        </p>
      </header>
      <EventGrid events={events} />
    </div>
  )
}
