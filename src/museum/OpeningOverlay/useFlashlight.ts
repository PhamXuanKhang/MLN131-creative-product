/**
 * Hiệu ứng đèn pin: pointermove (rAF-throttle) → ghi CSS var --torch-x/y
 * trực tiếp lên element — không re-render React, mask position là thứ
 * duy nhất thay đổi. Reduced-motion: không track (CSS hiển thị layer tĩnh).
 */
import { useEffect, type RefObject } from 'react'
import gsap from 'gsap'

export function useFlashlight(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0
    let lastEvent: PointerEvent | null = null

    const onMove = (e: PointerEvent) => {
      lastEvent = e
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        if (!lastEvent) return
        const rect = el.getBoundingClientRect()
        const x = ((lastEvent.clientX - rect.left) / rect.width) * 100
        const y = ((lastEvent.clientY - rect.top) / rect.height) * 100
        gsap.killTweensOf(el, '--torch-x,--torch-y')
        el.style.setProperty('--torch-x', `${x}%`)
        el.style.setProperty('--torch-y', `${y}%`)
      })
    }

    const onLeave = () => {
      // Trôi về giữa khi chuột rời khỏi film
      gsap.to(el, { '--torch-x': '50%', '--torch-y': '40%', duration: 1.2, ease: 'power2.out' })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [ref])
}
