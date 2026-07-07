/**
 * VietnamRenderer — kể chuyện cuộn dọc "tre mọc": thân tre SVG chạy giữa,
 * mỗi sự kiện một section (node mấu tre + card giấy dó xen kẽ trái/phải),
 * nền parallax phía sau. Click card → select(slug) mở EventPanel dùng chung
 * từ MuseumShell (không render panel riêng).
 *
 * CSS mặc định là TRẠNG THÁI HOÀN CHỈNH (tre vẽ đủ, card hiện đủ) —
 * GSAP/ScrollTrigger chỉ thêm motion khi prefers-reduced-motion cho phép.
 */
import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { EraMeta, HistoricalEvent } from '@/types/events'
import { useSelectedEvent } from '@/museum/useSelectedEvent'
import { useMuseumStore } from '@/store/useMuseumStore'
import { play } from '@/shared/AudioManager/audioManager'
import ParallaxBackground from './ParallaxBackground'
import GiayDoCard from './GiayDoCard'
import WheelTimeline from './WheelTimeline'
import './VietnamRenderer.css'

gsap.registerPlugin(ScrollTrigger)

interface VietnamRendererProps {
  era: EraMeta
  events: HistoricalEvent[]
}

export default function VietnamRenderer({ era, events }: VietnamRendererProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const { event: selected, select } = useSelectedEvent()
  // Khi opening đóng, scrollbar <html> trở lại → layout đổi; đưa vào dependencies
  // để useGSAP revert + tạo lại trigger với số đo đúng (thay cho refresh thủ công)
  const openingVisible = useMuseumStore((s) => s.openingVisible)

  // Section đang ở dải giữa viewport → chấm active trên WheelTimeline.
  // Dùng IntersectionObserver (không phụ thuộc GSAP) để hoạt động cả khi
  // reduced-motion tắt toàn bộ ScrollTrigger.
  const [activeSlug, setActiveSlug] = useState<string | null>(null)
  useEffect(() => {
    const sections = rootRef.current?.querySelectorAll('.vn-section')
    if (!sections?.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSlug(entry.target.getAttribute('data-slug'))
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [events.length])

  const scrollToSection = (slug: string) => {
    const section = rootRef.current?.querySelector(`.vn-section[data-slug="${CSS.escape(slug)}"]`)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    section?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' })
  }

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      // Thân tre mọc theo scroll — ngòi bám reading line ~65% viewport
      gsap.fromTo(
        '.vn-stalk__main, .vn-stalk__highlight',
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.vn-sections',
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        },
      )

      // Parallax: 3 lớp trôi ngược tốc độ khác nhau theo cùng tiến trình trang
      // (lớp fixed nên yPercent nhỏ là đủ chiều sâu; trời đứng yên)
      const pageScrub = {
        trigger: '.vn-sections',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      }
      gsap.to('.vn-parallax__mountains', { yPercent: -8, ease: 'none', scrollTrigger: pageScrub })
      gsap.to('.vn-parallax__mist', { yPercent: -16, ease: 'none', scrollTrigger: pageScrub })
      gsap.to('.vn-parallax__foreground', { yPercent: -28, ease: 'none', scrollTrigger: pageScrub })

      // WheelTimeline: progress fill + xoay nhẹ rotor theo tiến trình trang
      gsap.fromTo(
        '.wheel-timeline__progress',
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, ease: 'none', scrollTrigger: pageScrub },
      )
      gsap.fromTo(
        '.wheel-timeline__rotor',
        { rotation: 6 },
        // transformOrigin = tâm bánh xe (CX,CY của WheelTimeline) → chấm trượt dọc cung
        { rotation: -6, ease: 'none', transformOrigin: '460px 260px', scrollTrigger: pageScrub },
      )

      // Node pop + card bung từ node — event-like, không scrub để card
      // không bao giờ đứng nửa chừng
      gsap.utils.toArray<HTMLElement>('.vn-section').forEach((section, i) => {
        const card = section.querySelector('.giay-do-card')
        const node = section.querySelector('.vn-node')
        if (!card || !node) return
        const cardOnLeft = i % 2 === 0 // nth-of-type(odd) → card bên trái trục tre
        gsap
          .timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          })
          .from(node, { scale: 0, duration: 0.35, ease: 'back.out(2)' })
          .from(
            card,
            {
              autoAlpha: 0,
              scale: 0.88,
              x: cardOnLeft ? 24 : -24,
              duration: 0.6,
              ease: 'back.out(1.4)',
            },
            '-=0.1',
          )
      })
    },
    // revertOnUpdate: khi openingVisible đổi phải revert context cũ trước khi
    // tạo lại — không thì .from() mới chụp trạng thái ẩn của tween cũ (card kẹt ẩn)
    { scope: rootRef, dependencies: [events.length, openingVisible], revertOnUpdate: true },
  )

  return (
    <div className="vn-renderer" ref={rootRef}>
      <ParallaxBackground />
      <WheelTimeline events={events} activeSlug={activeSlug} onSelect={scrollToSection} />

      <div className="vn-renderer__content">
        <header className="vn-intro">
          <p className="vn-intro__eyebrow">{era.range}</p>
          <h2 className="vn-intro__title">{era.label}</h2>
          <p className="vn-intro__sub">
            {events.length} sự kiện — từ Cương lĩnh 1930 đến hôm nay
          </p>
          <span className="vn-intro__hint" aria-hidden="true">
            Cuộn để khám phá ↓
          </span>
        </header>

        <div className="vn-sections">
          {/* Thân tre: pathLength=1 → dash math 0..1, không cần đo chiều cao */}
          <svg
            className="vn-stalk"
            viewBox="0 0 24 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="vn-stalk__main" d="M12 0 V100" pathLength="1" />
            <path className="vn-stalk__highlight" d="M9 0 V100" pathLength="1" />
          </svg>

          {events.map((event) => (
            <section key={event.id} className="vn-section" data-slug={event.slug}>
              {event.year > 0 && (
                <span className="vn-section__year" aria-hidden="true">
                  {event.year}
                </span>
              )}
              <span className="vn-node" aria-hidden="true" />
              <GiayDoCard
                event={event}
                active={selected?.slug === event.slug}
                onOpen={() => {
                  play('paper')
                  select(event.slug)
                }}
              />
            </section>
          ))}
        </div>

        <footer className="vn-outro">
          <p className="vn-outro__quote">
            Hành trình vẫn tiếp tục — Việt Nam trên con đường đi lên chủ nghĩa xã hội.
          </p>
        </footer>
      </div>
    </div>
  )
}
