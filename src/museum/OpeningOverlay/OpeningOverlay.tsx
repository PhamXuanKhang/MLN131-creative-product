/**
 * Opening — intro overlay phủ lên shell (không phải route), hiện mỗi lần load app.
 * Layout 60/40: nội dung + thống kê | cuộn phim dọc với đèn pin bám chuột
 * (chỉ trong cột phim, mặc định sáng giữa cuộn phim).
 * "BẮT ĐẦU HÀNH TRÌNH" → film transition đóng màn → shell (đã render sẵn
 * bên dưới với dữ liệu thật) lộ ra.
 */
import { useEffect, useMemo, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { getAllEvents, getStats } from '@/data/adapter'
import { useMuseumStore } from '@/store/useMuseumStore'
import { playTransition } from '@/shared/Transition/playTransition'
import { play, startOpeningAmbient, stopOpeningAmbient } from '@/shared/AudioManager/audioManager'
import FilmStrip from './FilmStrip'
import { useFlashlight } from './useFlashlight'
import './OpeningOverlay.css'

const MIN_FILM_FRAME_COUNT = 18

export default function OpeningOverlay() {
  const rootRef = useRef<HTMLDivElement>(null)
  const filmRef = useRef<HTMLElement>(null)
  const startedAudioRef = useRef(false)
  const dismissOpening = useMuseumStore((s) => s.dismissOpening)

  const stats = useMemo(() => getStats(), [])
  const filmEvents = useMemo(() => {
    const eventsWithImages = getAllEvents().filter((event) => event.image.thumb)
    if (eventsWithImages.length >= MIN_FILM_FRAME_COUNT) return eventsWithImages

    const repeatedEvents = [...eventsWithImages]
    while (repeatedEvents.length < MIN_FILM_FRAME_COUNT && eventsWithImages.length > 0) {
      repeatedEvents.push(...eventsWithImages)
    }
    return repeatedEvents.slice(0, MIN_FILM_FRAME_COUNT)
  }, [])

  useFlashlight(filmRef)

  useEffect(() => {
    startOpeningAmbient()
    return () => stopOpeningAmbient()
  }, [])

  // Khoá scroll trang khi opening hiện — thanh scroll của shell phía sau nằm
  // trên <html> (global.css set overflow-y: auto cho html nên khoá body không đủ)
  useEffect(() => {
    const prev = document.documentElement.style.overflowY
    document.documentElement.style.overflowY = 'hidden'
    return () => {
      document.documentElement.style.overflowY = prev
    }
  }, [])

  const { contextSafe } = useGSAP(
    () => {
      // Reduced-motion: vẫn giữ cuộn phim (chậm hơn) vì motion là cốt lõi
      // của bảo tàng; chỉ bỏ entrance stagger. Đèn pin đứng yên (gate trong hook).
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      gsap.fromTo(
        '.film-reel',
        { yPercent: -50 },
        { yPercent: 0, duration: reduced ? 84 : 28, ease: 'none', repeat: -1 },
      )
      if (reduced) return
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

  const startAudio = () => {
    if (startedAudioRef.current) return
    startedAudioRef.current = true
    startOpeningAmbient()
  }

  const closeOpening = () => {
    startAudio()
    play('click')
    stopOpeningAmbient()
    fadeContent()
    // GỌI NGOÀI contextSafe của Opening: timeline của film transition phải
    // thuộc context của <Transition/>, không thì bị revert khi Opening unmount
    // giữa chừng (film che xong → dismissOpening → cleanup giết timeline).
    playTransition(() => dismissOpening())
  }

  const yearCount = stats.yearSpan[1] - stats.yearSpan[0]

  return (
    <div className="opening" ref={rootRef} data-theme="neutral" onPointerDown={startAudio}>
      <button type="button" className="opening__skip" onClick={closeOpening}>
        Bỏ qua mở đầu
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

          <button type="button" className="opening__cta opening__reveal" onClick={closeOpening}>
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
