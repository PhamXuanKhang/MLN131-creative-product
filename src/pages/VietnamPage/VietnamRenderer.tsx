/**
 * VietnamRenderer — kể chuyện cuộn dọc "tre mọc": thân tre ẢNH THẬT (đốt tre
 * repeat-y) chạy giữa, mỗi sự kiện một section (CÀNH TRE ẢNH vươn từ thân ra
 * card giấy dó xen kẽ trái/phải), 2 khóm tre ảnh rủ hai mép nền đen.
 * Click card → select(slug) mở EventPanel dùng chung từ MuseumShell.
 *
 * CSS mặc định là TRẠNG THÁI HOÀN CHỈNH (thân/cành hiện đủ, card hiện đủ) —
 * GSAP/ScrollTrigger chỉ thêm motion (reveal clip-path) khi
 * prefers-reduced-motion cho phép.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
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
          if (entry.isIntersecting) {
            const slug = entry.target.getAttribute('data-slug')
            setActiveSlug(slug)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [events.length])

  const scrollToSection = useCallback((slug: string) => {
    const section = rootRef.current?.querySelector(`.vn-section[data-slug="${CSS.escape(slug)}"]`)
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    section?.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'center' })
  }, [])

  // Deep-link ?event= (từ Quiz/Knowledge hoặc load thẳng URL) → cuộn tới section.
  // Chờ opening đóng (opening khóa scroll <html>, cuộn sớm sẽ mất); bỏ qua nếu
  // section đã ở giữa viewport (user vừa click card đang xem).
  useEffect(() => {
    if (openingVisible || !selected || selected.era !== 'vietnam') return
    const section = rootRef.current?.querySelector(
      `.vn-section[data-slug="${CSS.escape(selected.slug)}"]`,
    )
    if (!section) return
    const bounds = section.getBoundingClientRect()
    const centerTop = window.innerHeight * 0.45
    const centerBottom = window.innerHeight * 0.55
    if (bounds.top <= centerBottom && bounds.bottom >= centerTop) return
    scrollToSection(selected.slug)
  }, [selected, openingVisible, scrollToSection])

  useGSAP(
    () => {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) return

      // Thân tre mọc theo scroll — reveal clip-path từ trên xuống,
      // ngòi bám reading line ~65% viewport
      gsap.fromTo(
        '.vn-stalk',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          ease: 'none',
          scrollTrigger: {
            trigger: '.vn-sections',
            start: 'top 65%',
            end: 'bottom 65%',
            scrub: 0.6,
          },
        },
      )

      // Khóm tre 2 bên trôi nhẹ ngược chiều cuộn theo tiến trình trang
      // (lớp fixed nên yPercent nhỏ là đủ chiều sâu)
      const pageScrub = {
        trigger: '.vn-sections',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.6,
      }
      gsap.to('.vn-parallax__bamboo', { yPercent: -5, ease: 'none', scrollTrigger: pageScrub })

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

      // Cành tre vươn ra (reveal clip-path từ gốc) → card bung đè lên
      // ngọn cành — event-like, không scrub để không đứng nửa chừng
      gsap.utils.toArray<HTMLElement>('.vn-section').forEach((section, i) => {
        const card = section.querySelector('.giay-do-card')
        const branch = section.querySelector('.vn-branch')
        if (!card) return
        const cardOnLeft = i % 2 === 0 // nth-of-type(odd) → card bên trái trục tre
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        })
        if (branch) {
          // Hiện dần từ gốc (phía thân tre) ra ngọn — card-trái dùng ảnh mirror
          // nên gốc nằm mép phải nội dung → thu inset trái thay vì inset phải
          tl.fromTo(
            branch,
            { clipPath: cardOnLeft ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' },
            {
              clipPath: cardOnLeft ? 'inset(0 0 0 0%)' : 'inset(0 0% 0 0)',
              duration: 0.5,
              ease: 'power2.inOut',
            },
            0.1,
          )
        }
        tl.from(
          card,
          {
            autoAlpha: 0,
            scale: 0.88,
            x: cardOnLeft ? 24 : -24,
            duration: 0.6,
            ease: 'back.out(1.4)',
          },
          0.4,
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
          {/* Thân tre: ảnh đốt thật repeat-y — mối tile nằm đúng mấu nên liền mạch */}
          <div className="vn-stalk" aria-hidden="true" />

          {events.map((event, i) => (
            <section key={event.id} className="vn-section" data-slug={event.slug}>
              {event.year > 0 && (
                <span className="vn-section__year" aria-hidden="true">
                  {event.year}
                </span>
              )}
              {/* Cành mirror sẵn trong file cho card-trái — không scaleX(-1)
                  CSS vì mirror quanh origin gốc cành làm lệch hộp */}
              <img
                className="vn-branch"
                src={
                  i % 2 === 0
                    ? '/images/decor/bamboo-branch-left.webp'
                    : '/images/decor/bamboo-branch.webp'
                }
                alt=""
                aria-hidden="true"
                decoding="async"
              />
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
