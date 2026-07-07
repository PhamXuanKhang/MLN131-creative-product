/**
 * Chống chồng dot trên trục thời gian (2 event cùng 1848, cụm 1945/1946...):
 * quét theo chiều tăng đảm bảo khoảng cách tối thiểu, vượt 1 thì scale lại.
 * Dùng chung: HorizontalTimeline (World), WheelTimeline (Vietnam).
 */
import type { TimelineItem } from './useTimeline'

export function spreadPositions(items: TimelineItem[], minGap = 0.011): TimelineItem[] {
  const sorted = [...items].sort((a, b) => a.position - b.position)
  let prev = -Infinity
  const spread = sorted.map((item) => {
    const pos = Math.max(item.position, prev + minGap)
    prev = pos
    return { ...item, position: pos }
  })
  const last = spread[spread.length - 1]
  if (last && last.position > 1) {
    const scale = 1 / last.position
    return spread.map((i) => ({ ...i, position: i.position * scale }))
  }
  return spread
}
