/**
 * Film transition dùng chung — mount MỘT lần trong MuseumShell.
 * API mệnh lệnh: playTransition(onCovered) — màn film che kín, gọi onCovered
 * (navigate / đổi theme khi đang bị che), rồi mở ra.
 */
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useMuseumStore } from '@/store/useMuseumStore'
import { play } from '@/shared/AudioManager/audioManager'
import { setPlayFn } from './playTransition'
import './Transition.css'

export default function Transition() {
  const rootRef = useRef<HTMLDivElement>(null)

  useGSAP(
    (_, contextSafe) => {
      const el = rootRef.current
      if (!el || !contextSafe) return

      setPlayFn(
        contextSafe((onCovered: () => void) => {
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (prefersReduced) {
            onCovered()
            return
          }
          const { setTransitioning } = useMuseumStore.getState()
          setTransitioning(true)
          play('film')
          gsap
            .timeline({
              onComplete: () => {
                setTransitioning(false)
                gsap.set(el, { visibility: 'hidden' })
              },
            })
            .set(el, { visibility: 'visible' })
            .fromTo(el, { yPercent: -100 }, { yPercent: 0, duration: 0.4, ease: 'power2.in' })
            .add(() => onCovered())
            .to(el, { yPercent: 100, duration: 0.45, ease: 'power2.out' }, '+=0.15')
        }),
      )

      return () => {
        setPlayFn(null)
      }
    },
    { scope: rootRef },
  )

  return (
    <div className="film-transition" ref={rootRef} aria-hidden="true">
      <div className="film-transition__frame" />
    </div>
  )
}
