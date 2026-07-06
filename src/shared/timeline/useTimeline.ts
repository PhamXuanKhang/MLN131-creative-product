/**
 * Logic timeline dùng chung (không đụng DOM): events → vị trí 0..1 theo năm
 * + trạng thái active. Client: FilmStripTimeline (Opening, tuần 1),
 * HorizontalTimeline (World, tuần 2), WheelTimeline (Vietnam, stretch).
 */
import { useMemo } from 'react'
import type { HistoricalEvent } from '@/types/events'

export interface TimelineItem {
  event: HistoricalEvent
  /** Vị trí tương đối 0..1 theo năm trong khoảng [minYear, maxYear] */
  position: number
  isActive: boolean
}

export interface TimelineData {
  items: TimelineItem[]
  minYear: number
  maxYear: number
}

export function useTimeline(
  events: HistoricalEvent[],
  { activeSlug = null }: { activeSlug?: string | null } = {},
): TimelineData {
  return useMemo(() => {
    const years = events.map((e) => e.year).filter((y) => y > 0)
    const minYear = years.length > 0 ? Math.min(...years) : 0
    const maxYear = years.length > 0 ? Math.max(...years) : 0
    const span = Math.max(1, maxYear - minYear)

    const items = events.map((event) => ({
      event,
      position: event.year > 0 ? (event.year - minYear) / span : 0,
      isActive: event.slug === activeSlug,
    }))

    return { items, minYear, maxYear }
  }, [events, activeSlug])
}
