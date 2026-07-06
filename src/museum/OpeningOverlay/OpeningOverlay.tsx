/**
 * Opening — intro overlay phủ lên shell (không phải route), hiện 1 lần/session.
 * Layout 60/40: nội dung + thống kê | cuộn phim dọc với hiệu ứng đèn pin.
 * "BẮT ĐẦU HÀNH TRÌNH" → film transition đóng màn → shell (đã render sẵn
 * bên dưới với dữ liệu thật) lộ ra.
 */
import { useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { getAllEvents, getStats } from '@/data/adapter'
import { useMuseumStore } from '@/store/useMuseumStore'
import { playTransition } from '@/shared/Transition/playTransition'
import { play } from '@/shared/AudioManager/audioManager'
import FilmStrip from './FilmStrip'
import { useFlashlight } from './useFlashlight'
import './OpeningOverlay.css'

const FILM_FRAME_COUNT = 12

export default function OpeningOverlay() {
  const rootRef = useRef<HTMLDivElement>(null)
  const filmRef = useRef<HTMLElement>(null)
  const dismissOpening = useMuseumStore((s) => s.dismissOpening)

  const stats = useMemo(() => getStats(), [])
  const filmEvents = useMemo(
    () =>
      getAllEvents()
        .filter((e) => e.image.thumb)
        .slice(0, FILM_FRAME_COUNT),
    [],
  )

  useFlashlight(filmRef)

  const { contextSafe } = useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.to('.film-reel', { yPercent: -50, duration: 48, ease: 'none', repeat: -1 })
      gsap
        .timeline()
        .from('.opening', { autoAlpha: 0, duration: 0.5, ease: 'power1.out' })
        .from(
          '.opening__reveal',
          { y: 26, autoAlpha: 0, stagger: 0.09, duration: 0.5, ease: 'power2.out' },
          '-=0.15',
        )
    },
    { scope: rootRef },
  )

  const fadeContent = contextSafe(() => {
    gsap.to('.opening__content > *', {
      y: -14,
      autoAlpha: 0,
      stagger: 0.04,
      duration: 0.3,
      ease: 'power1.in',
    })
  })

  const handleStart = () => {
    play('click')
    fadeContent()
    // GỌI NGOÀI contextSafe của Opening: timeline của film transition phải
    // thuộc context của <Transition/>, không thì bị revert khi Opening unmount
    // giữa chừng (film che xong → dismissOpening → cleanup giết timeline).
    playTransition(() => dismissOpening())
  }

  const yearCount = stats.yearSpan[1] - stats.yearSpan[0]

  return (
    <div className="opening" ref={rootRef} data-theme="neutral">
      <button type="button" className="opening__skip" onClick={dismissOpening}>
        Bỏ qua ›
      </button>

      <div className="opening__grid">
        <section className="opening__content">
          <p className="opening__eyebrow opening__reveal">MLN131 · FPT University</p>
          <h1 className="opening__title opening__reveal">
            Chủ nghĩa xã hội
            <br />
            khoa học
          </h1>
          <p className="opening__sub opening__reveal">
            Bảo tàng số tương tác — hành trình từ những xưởng dệt Lyon năm 1831 đến Việt Nam hôm
            nay.
          </p>

          <ul className="opening__stats opening__reveal">
            <li>
              <strong>{stats.totalEvents}</strong>
              <span>sự kiện</span>
            </li>
            <li>
              <strong>{stats.eraCount}</strong>
              <span>giai đoạn</span>
            </li>
            <li>
              <strong>{yearCount}+</strong>
              <span>năm lịch sử</span>
            </li>
          </ul>

          <button type="button" className="opening__cta opening__reveal" onClick={handleStart}>
            Bắt đầu hành trình
          </button>
        </section>

        <section className="opening__film" ref={filmRef} aria-hidden="true">
          <FilmStrip events={filmEvents} />
          <div className="opening__torch" />
        </section>
      </div>
    </div>
  )
}
