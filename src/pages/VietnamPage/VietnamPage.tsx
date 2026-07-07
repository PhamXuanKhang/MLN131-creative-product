/**
 * Vietnam Mode — entry mỏng: lấy events era 'vietnam' từ adapter,
 * VietnamRenderer (tre mọc theo scroll + card giấy dó) lo phần trình bày.
 */
import { ERAS, getEventsByEra } from '@/data/adapter'
import VietnamRenderer from './VietnamRenderer'
import './VietnamPage.css'

const era = ERAS.find((e) => e.id === 'vietnam')!

export default function VietnamPage() {
  const events = getEventsByEra('vietnam')
  return (
    <div className="vietnam-page">
      <VietnamRenderer era={era} events={events} />
    </div>
  )
}
