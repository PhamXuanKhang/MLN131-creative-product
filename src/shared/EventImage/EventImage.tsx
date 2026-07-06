/**
 * Ảnh sự kiện theo asset pipeline: chọn thumb/full theo ngữ cảnh,
 * fallback placeholder giấy dó khi sự kiện chưa có ảnh (điểm degrade
 * duy nhất cho incomplete['image']).
 */
import { useState } from 'react'
import type { HistoricalEvent } from '@/types/events'
import './EventImage.css'

const PLACEHOLDER = '/images/placeholder-giay-do.svg'

interface EventImageProps {
  event: HistoricalEvent
  variant: 'thumb' | 'full'
  className?: string
}

export default function EventImage({ event, variant, className }: EventImageProps) {
  const src = event.image[variant]
  const [failed, setFailed] = useState(false)
  const isPlaceholder = !src || failed

  return (
    <div
      className={`event-image${isPlaceholder ? ' event-image--placeholder' : ''}${className ? ` ${className}` : ''}`}
    >
      <img
        className="event-image__img"
        src={isPlaceholder ? PLACEHOLDER : src}
        alt={event.title}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      {isPlaceholder && <span className="event-image__caption">{event.title}</span>}
    </div>
  )
}
