/**
 * Sự kiện đang chọn = ?event=<slug> trên URL (source of truth) —
 * deep-link và refresh hoạt động ở mọi mode.
 */
import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getEventBySlug } from '@/data/adapter'
import type { HistoricalEvent } from '@/types/events'

export function useSelectedEvent(): {
  event: HistoricalEvent | null
  select: (slug: string | null) => void
} {
  const [params, setParams] = useSearchParams()
  const event = getEventBySlug(params.get('event'))

  const select = useCallback(
    (slug: string | null) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          if (slug) next.set('event', slug)
          else next.delete('event')
          return next
        },
        { replace: false },
      )
    },
    [setParams],
  )

  return { event, select }
}
