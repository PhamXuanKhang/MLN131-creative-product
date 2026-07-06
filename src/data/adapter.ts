/**
 * Adapter — chỗ DUY NHẤT biết cấu trúc content.json.
 * Quiz, Knowledge, Timeline, Opening, renderer đều tiêu thụ HistoricalEvent[]
 * từ đây, không đọc JSON trực tiếp.
 */
import type { EraId, EraMeta, HistoricalEvent } from '@/types/events'
import content from './content.json'

export const ERAS: EraMeta[] = [
  { id: 'birth', label: 'Sự ra đời của CNXH khoa học', range: 'Thế kỷ XIX', order: 0 },
  {
    id: 'lenin',
    label: 'Thời kỳ V.I. Lênin vận dụng và phát triển',
    range: 'Đầu thế kỷ XX',
    order: 1,
  },
  {
    id: 'post-lenin',
    label: 'Từ sau khi V.I. Lênin qua đời đến nay',
    range: '1924 – nay',
    order: 2,
  },
  { id: 'vietnam', label: 'Chủ nghĩa xã hội tại Việt Nam', range: '1930 – nay', order: 3 },
]

const ERA_IDS = new Set<string>(ERAS.map((e) => e.id))
const eraOrder = (era: EraId) => ERAS.find((e) => e.id === era)?.order ?? 99

function validate(raw: (typeof content)['events']): HistoricalEvent[] {
  const seen = new Set<string>()
  const valid: HistoricalEvent[] = []
  for (const e of raw) {
    if (!e.id || !e.slug || !ERA_IDS.has(e.era)) {
      if (import.meta.env.DEV) console.warn('[adapter] bỏ event không hợp lệ:', e.id ?? e)
      continue
    }
    if (seen.has(e.slug)) {
      if (import.meta.env.DEV) console.warn('[adapter] slug trùng, bỏ:', e.slug)
      continue
    }
    seen.add(e.slug)
    valid.push(e as HistoricalEvent)
  }
  return valid
}

const events: HistoricalEvent[] = validate(content.events).sort(
  (a, b) => eraOrder(a.era) - eraOrder(b.era) || a.year - b.year || a.order - b.order,
)

const bySlug = new Map(events.map((e) => [e.slug, e]))

export function getAllEvents(): HistoricalEvent[] {
  return events
}

export function getEventsByEra(era: EraId): HistoricalEvent[] {
  return events.filter((e) => e.era === era)
}

export function getEventBySlug(slug: string | null | undefined): HistoricalEvent | null {
  return (slug && bySlug.get(slug)) || null
}

export interface MuseumStats {
  totalEvents: number
  eraCount: number
  yearSpan: [number, number]
  missingCount: number
}

export function getStats(): MuseumStats {
  const years = events.map((e) => e.year).filter((y) => y > 0)
  return {
    totalEvents: events.length,
    eraCount: ERAS.length,
    yearSpan: [Math.min(...years), Math.max(...years)],
    missingCount: events.filter((e) => e.incomplete?.length).length,
  }
}
