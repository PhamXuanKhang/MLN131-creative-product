/**
 * Hiệu ứng đèn pin trong cột phim: pointermove (rAF-throttle) → tween ngắn
 * --torch-x/y trên element (overwrite: 'auto' tự giết tween cũ) — đèn "đuổi
 * theo" chuột có độ trễ mượt, không re-render React. Chuột rời cột phim →
 * trôi êm về giữa cuộn phim. Reduced-motion: không track (đèn tĩnh ở giữa).
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
        gsap.to(el, {
          '--torch-x': `${x}%`,
          '--torch-y': `${y}%`,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: 'auto',
        })
      })
    }

    const onLeave = () => {
      // Trôi êm về mặc định: giữa cuộn phim
      gsap.to(el, {
        '--torch-x': '50%',
        '--torch-y': '50%',
        duration: 1.2,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
      gsap.killTweensOf(el, '--torch-x,--torch-y')
    }
  }, [ref])
}
