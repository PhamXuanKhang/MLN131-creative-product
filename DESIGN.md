---
version: 2.0
name: bao-tang-so-cnxh-design
description: Hệ thiết kế cho "Bảo tàng số tương tác — Chủ nghĩa xã hội khoa học" (MLN131 · FPT University). Một bảo tàng, nhiều phòng — ba theme đổi qua data-theme trên <html> (neutral / world / vietnam) trên cùng một bộ semantic token --c-*; ngôn ngữ hình ảnh "phim tư liệu + giấy dó" — nền tối, giấy sáng làm bề mặt nội dung, accent đất (đồng cổ / nâu phim / tre), glow accent thay bóng phẳng. Serif hiển thị (Playfair Display) + Noto Serif (hero) + Roboto (body). Motion là cốt lõi nhưng reduced-motion là đường chính — CSS mặc định luôn là trạng thái hoàn chỉnh.

themes:
  neutral: # Opening, Quiz, Knowledge — nền tối trung tính, giấy sáng
    c-bg: "#0f0f0f"
    c-surface: "#1c1c1c"
    c-paper: "#efe6d4"
    c-accent: "#b89b6a"
    c-ink: "rgba(255,255,255,0.9)"
    c-ink-muted: "rgba(255,255,255,0.6)"
    c-line: "rgba(255,255,255,0.14)"
    c-glow: "0 0 18px rgba(184,155,106,0.35)"
  world: # old film — phòng Thế giới
    c-bg: "#111111"
    c-surface: "#1a1a1a"
    c-paper: "#d8c8a5"
    c-accent: "#8b6b3e"
    c-ink: "rgba(228,218,197,0.92)"
    c-ink-muted: "rgba(228,218,197,0.6)"
    c-line: "rgba(216,200,165,0.18)"
    c-glow: "0 0 18px rgba(216,200,165,0.3)"
  vietnam: # tre & giấy dó — phòng Việt Nam
    c-bg: "#17361e"
    c-surface: "#406343"
    c-paper: "#f5ecd8"
    c-accent: "#c69c5d"
    c-ink: "rgba(245,236,216,0.94)"
    c-ink-muted: "rgba(245,236,216,0.65)"
    c-line: "rgba(245,236,216,0.2)"
    c-glow: "0 0 18px rgba(198,156,93,0.35)"

era-colors: # theme-independent — marker / timeline / chips / legend ở mọi theme
  era-birth: "#d4a94e" # vàng cổ
  era-lenin: "#c25b4e" # đỏ gạch
  era-post-lenin: "#7f9db3" # xanh thép
  era-vietnam: "#8fae62" # xanh tre

paper-ink: # mực nâu trên nền --c-paper (hardcode có chủ đích, xem Colors)
  ink-strong: "#211a10" # tiêu đề trên giấy
  ink: "#2c2417" # body trên giấy
  ink-soft: "#3a2f1d" # summary/lead
  ink-label: "#6e5631" # nhãn phụ, era pill
  ink-accent: "#8b6b3e" # date, caret, đường kẻ
  ink-link: "#8b5a2b" # link nguồn
  ink-faint: "#8a7a5e" # credit, thiếu dữ liệu

typography:
  display: # Playfair Display — tiêu đề mục, tên sự kiện, chỉ số, watermark năm
    fontFamily: PlayfairDisplay, "Times New Roman", serif
    token: --font-display
  title: # Noto Serif — hero (Opening title dùng display; token giữ cho landing-scale)
    fontFamily: NotoSerif, "Times New Roman", serif
    token: --font-title
  body: # Roboto — nội dung, nhãn, metadata
    fontFamily: Roboto, system-ui, sans-serif
    token: --font-body
  scale:
    opening-title: "clamp(2.4rem, 5.2vw, 4.2rem) / 700 / 1.12"
    section-title: "clamp(1.9rem, 4vw, 3rem) / 1.2"
    panel-title: "1.35rem / 1.35"
    card-title: "1.12rem / 700 / 1.35"
    stat-number: "2rem (display)"
    year-watermark: "clamp(3.5rem, 9vw, 7rem) / 700, màu paper 10% opacity"
    eyebrow: "0.75–0.78rem, letter-spacing 0.22–0.28em, uppercase, màu --c-accent"
    body: "0.92–0.98rem / 1.65–1.75"
    label-micro: "0.68–0.78rem"

rounded: # token --r-* (dùng chung mọi theme)
  xs: 3px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  pill: 50px
  full: 9999px
  circle: 50%

elevation:
  glow-theme: "var(--c-glow) — chữ ký nâng độ theo theme (accent glow)"
  shadow-md: "0 8px 30px rgba(0,0,0,0.3)"
  shadow-lg: "0 10px 40px rgba(0,0,0,0.5)"
  paper-vignette: "inset 0 0 28px rgba(139,107,62,0.12) — vignette ấm trên card giấy"

z-index:
  parallax: 0
  content: 1
  wheel-timeline: 5
  header: 100
  event-panel: 200
  opening: 300
  film-transition: 400

components:
  museum-header:
    surface: "color-mix(var(--c-bg) 82%, transparent) + backdrop-blur 8px"
    border: "1px solid var(--c-line)"
    position: "sticky top 0, z 100"
  mode-switcher:
    shape: "pill (--r-pill), viền --c-line"
    active: "nền --c-accent, chữ --c-bg"
    note: "Click thường đi qua film transition; ctrl/middle-click giữ hành vi trình duyệt."
  opening-cta:
    backgroundColor: "var(--c-accent)"
    textColor: "var(--c-bg)"
    rounded: "{rounded.pill}"
    shadow: "var(--c-glow)"
    note: "Viên thuốc accent + glow — nút hành động chính duy nhất của Opening."
  film-transition:
    note: "Màn film che kín (yPercent -100→0), onCovered chạy lúc bị che (navigate/đổi theme), rồi mở xuống. Reduced-motion: chạy onCovered ngay, không film."
  event-panel:
    surface: "var(--c-surface), trượt từ phải, width min(520px, 100%)"
    paper: "var(--c-paper) + mực nâu {paper-ink}, paper reveal clip-path + typing caret #8b6b3e"
    note: "Panel chi tiết DÙNG CHUNG mọi mode — mở qua ?event=<slug>, đóng bằng Esc/backdrop."
  world-marker:
    color: "var(--era-*) theo giai đoạn, DivIcon glow"
    active: "glow mạnh + scale"
  h-timeline-dot:
    color: "var(--era-*)"
    note: "Vị trí 0..1 theo năm (useTimeline) + spreadPositions chống chồng."
  era-filter-chip:
    note: "Chip pill kiêm legend, màu --era-*."
  giay-do-card:
    backgroundColor: "var(--c-paper)"
    ink: "{paper-ink}"
    border: "1px dashed var(--c-accent) (active: solid + var(--c-glow))"
    shadow: "{elevation.paper-vignette} + shadow-md"
    rounded: "{rounded.sm}"
    note: "Button-card giấy dó của Vietnam Mode; hover lift -3px; media 4:3."
  bamboo-stalk:
    stroke: "color-mix(--era-vietnam 70%, --c-paper), 12px, linecap round"
    note: "SVG pathLength=1, stroke-dashoffset scrub theo scroll; node mấu tre --era-vietnam + lá border-radius 0 100%."
  parallax-background:
    note: "4 lớp fixed sau content: trời (gradient tĩnh) → núi (silhouette color-mix surface/bg) → sương (feGaussianBlur, opacity 0.14) → tre tiền cảnh (tối). pointer-events none."
  wheel-timeline:
    note: "Cung ¼ bánh xe fixed mép phải (≥1024px), chấm THEO TỈ LỆ NĂM, progress fill --c-accent (pathLength=1), xoay nhẹ ±6° theo scroll. Active: --c-accent + glow."

---

## Overview

"Bảo tàng số tương tác — Chủ nghĩa xã hội khoa học" là sản phẩm học phần MLN131: một single-page app (React + Vite + TypeScript) tổ chức như **một bảo tàng nhiều phòng** — Opening (sảnh phim), Thế giới (bản đồ Leaflet "old film"), Việt Nam (chuyện cuộn "tre – giấy dó"), Trắc nghiệm. Toàn bộ tiếng Việt, giọng trang nghiêm, tư liệu.

Bản sắc thị giác là **"phim tư liệu + giấy dó"**: nền tối làm không gian trưng bày, **giấy sáng (`--c-paper`) là bề mặt nội dung** (panel chi tiết, card sự kiện) với mực nâu ấm, và **accent đất** (đồng cổ / nâu phim / tre) cho hành động, viền, glow. Ba phòng không đổi ngôn ngữ — chỉ đổi tông qua `data-theme` trên `<html>`: cùng một bộ semantic token `--c-*`, component viết một lần chạy đúng ở mọi phòng.

**Đặc trưng chính:**
- **Một hệ token, ba theme**: `neutral` / `world` / `vietnam` — component mới CHỈ dùng `--c-*` (+ `--era-*`, font/radius/shadow), không biết mình đang ở theme nào.
- **Màu giai đoạn (`--era-*`) độc lập theme**: vàng cổ / đỏ gạch / xanh thép / xanh tre — ngôn ngữ dữ liệu xuyên suốt marker, timeline, chip, node tre.
- **Giấy là nơi đọc**: nội dung dài luôn nằm trên `--c-paper` với thang mực nâu cố định; nền tối chỉ mang UI điều hướng.
- **Glow accent (`--c-glow`) là chữ ký nâng độ** cho trạng thái active/CTA; bóng đen chỉ cho panel nổi lớn.
- **Motion là nội dung nhưng reduced-motion là đường chính**: CSS mặc định luôn là trạng thái hoàn chỉnh; GSAP chỉ thêm chuyển động khi được phép.

## Colors

### Semantic theme tokens (`--c-*`)
Đổi theo `[data-theme]` trên `<html>` (MuseumShell set theo route; Opening tự ghim `neutral`):
- **`--c-bg` / `--c-surface`** — canvas và bề mặt nổi của phòng (neutral than, world đen phim, vietnam lục tre).
- **`--c-paper`** — bề mặt nội dung sáng (giấy); world ngả vàng phim cũ, vietnam là giấy dó `#f5ecd8`.
- **`--c-accent`** — hành động, viền active, glow: đồng cổ / nâu phim / tre-mật ong.
- **`--c-ink` / `--c-ink-muted`** — chữ trên nền tối (không dùng trên giấy).
- **`--c-line`** — hairline mờ; **`--c-glow`** — glow accent theo theme.

### Mực trên giấy (hardcode có chủ đích)
Trên `--c-paper`, chữ dùng **thang nâu cố định** (không theo theme — giấy sáng ở mọi phòng): `#211a10` tiêu đề · `#2c2417` body · `#3a2f1d` lead · `#6e5631` nhãn · `#8b6b3e` date/caret/kẻ · `#8b5a2b` link · `#8a7a5e` credit. Precedent: EventPanel.css, GiayDoCard.css.

### Màu giai đoạn (`--era-*`, `:root`)
`--era-birth #d4a94e` · `--era-lenin #c25b4e` · `--era-post-lenin #7f9db3` · `--era-vietnam #8fae62`. Map qua `ERA_COLOR` (src/pages/WorldPage/eraColors.ts). Đây là màu **dữ liệu**, không phải màu theme — giữ nguyên khi đổi phòng.

### Sao chủ quyền (`--c-star`, `:root`)
`--c-star #d4a94e` — sao vàng 5 cánh Hoàng Sa/Trường Sa trên WorldMap. Vàng cổ cùng họ `--era-birth` nhưng là token riêng: không tái dùng màu dữ liệu era cho semantics chủ quyền.

### Layer 2 LEGACY (sẽ xoá tuần 4)
`--gold / --bg / --surface / --red / --n-*`… trong `:root` của tokens.css chỉ còn QuizPage cũ tiêu thụ. **Component mới không được dùng.** Font (`--font-*`), radius (`--r-*`), shadow (`--shadow-*`) là token dùng chung, không phải legacy.

## Typography

1. **Playfair Display** (`--font-display`) — serif hiển thị: tiêu đề mục, tên sự kiện, chỉ số Opening, watermark năm.
2. **Noto Serif** (`--font-title`) — dự phòng hero scale (landing cũ); hiện Opening dùng display.
3. **Roboto** (`--font-body`) — body, nhãn, metadata, nút.

Nguyên tắc: **serif kể chuyện, sans dẫn hướng** — Roboto không mang tiêu đề hiển thị, serif không mang nhãn cấu trúc nhỏ. Eyebrow luôn uppercase + letter-spacing rộng (0.22–0.28em) màu `--c-accent`.

## Layout

- Header sticky (z 100) + `main` flex-column; mỗi phòng tự chọn: World full-viewport (`flex:1; overflow:hidden`), Vietnam document-flow cao nhiều viewport (scroller là `<html>` — bắt buộc cho ScrollTrigger).
- Nội dung đọc canh giữa `max-width` ~1080px; hiệu ứng (parallax, film) full-bleed phía sau/trên.
- Responsive desktop-first: <720px giản lược hiệu ứng (tắt sương/tiền cảnh, tre về mép trái, 1 cột); WheelTimeline chỉ ≥1024px.

## Elevation & Depth

| Mức | Xử lý | Dùng cho |
|---|---|---|
| 0 — Phẳng | Không viền/bóng | Nền, đa số bề mặt |
| 1 — Hairline | `1px var(--c-line)` | Header, chip, nút viền, mấu nối |
| 2 — Glow accent | `var(--c-glow)` | Active (dot/card/marker), CTA, focus |
| 3 — Bóng panel | `--shadow-md/lg` (+ vignette ấm trên giấy) | EventPanel, card giấy dó, lightbox |

Thứ tự lớp cố định: parallax 0 → content 1 → wheel 5 → header 100 → panel 200 → opening 300 → film transition 400.

## Motion

- **GSAP + ScrollTrigger cho scene** (film strip, tre mọc scrub, bloom card, parallax, film transition, paper reveal, typing); **CSS cho micro-interaction** (hover lift, focus, opacity nhỏ).
- **Reduced-motion là đường chính**: check `matchMedia('(prefers-reduced-motion: reduce)')` đầu mỗi `useGSAP`, early-return trước khi tạo tween — CSS mặc định đã là trạng thái cuối (tre vẽ đủ, card hiện, progress fill đủ). Ngoại lệ có chủ đích: cuộn phim Opening giữ motion chậm hơn (motion là cốt lõi trải nghiệm đó).
- Bloom/reveal dùng `toggleActions` (không scrub) để không bao giờ đứng nửa chừng; scrub chỉ cho tiến trình liên tục (tre, parallax, progress).
- Idiom: `gsap.registerPlugin` module scope; mọi tween trong `useGSAP({ scope, dependencies, revertOnUpdate: true })` khi dependency đổi layout.

## Shapes

| Token | Dùng |
|---|---|
| `--r-xs` 3px | Media trong card, nhãn wheel |
| `--r-sm` 8px | Card giấy dó, lightbox img, nút mặc định |
| `--r-pill` 50px | Mode switcher, CTA, era pill, skip |
| `--r-full` / circle | Nút đóng tròn, chấm timeline/wheel, node |

Hình học đặc trưng: lá tre `border-radius: 0 100% 0 100%`; viền giấy dó `dashed var(--c-accent)`; sprocket phim bằng repeating-gradient.

## Components

### Shell & điều hướng
- **`museum-header`** — kính mờ tối, hairline dưới, sticky; brand eyebrow accent + title display.
- **`mode-switcher`** — pill 3 phòng; active nền accent chữ bg; click thường đi qua **film transition** (theme flip lúc màn che), ctrl/middle-click giữ nguyên.
- **`film-transition`** — màn che toàn cục (z 400), API mệnh lệnh `playTransition(onCovered)`.

### Trưng bày
- **`event-panel`** — panel chi tiết dùng chung (z 200): hero ảnh, giấy `--c-paper` với paper reveal + typing caret, nguồn, lightbox. Mở qua `?event=<slug>`.
- **`world-marker` / `h-timeline-dot` / `era-filter-chip`** — bộ World: màu `--era-*`, active glow; timeline 0..1 theo năm (useTimeline + spreadPositions).
- **`giay-do-card`** — button-card giấy dó (Vietnam): media 4:3, date uppercase nâu, title display, summary clamp 3 dòng; bloom từ node khi motion.
- **`bamboo-stalk` + `vn-node`** — thân tre SVG scrub theo scroll, node mấu + lá tại mỗi sự kiện, watermark năm sau section.
- **`parallax-background`** — 4 lớp fixed (trời/núi/sương/tre) tốc độ -8/-16/-28 yPercent.
- **`wheel-timeline`** — cung ¼ mép phải, chấm theo tỉ lệ năm (lộ khe 1946→1976), progress fill accent, điều hướng nhanh.
- **`opening`** — sảnh 60/40: nội dung + stats | cuộn phim dọc + đèn pin bám chuột; CTA pill accent.

## Do's & Don'ts

### Do
- Mọi màu/viền/glow/bo góc lấy từ token: `--c-*`, `--era-*`, `--r-*`, `--shadow-*`, `--font-*`. Trên giấy dùng đúng thang mực nâu đã liệt kê.
- Viết component "mù theme" — chỉ `--c-*`, để cả ba phòng dùng được.
- CSS mặc định = trạng thái hoàn chỉnh; GSAP chỉ thêm motion sau check reduced-motion.
- Serif (display) cho tiêu đề, Roboto cho body/nhãn; eyebrow uppercase accent.
- Active/CTA nâng độ bằng `var(--c-glow)`; hover card lift nhẹ -2/-3px.

### Don't
- Đừng dùng token Layer-2 legacy (`--gold`, `--bg`, `--red`…) cho bất kỳ component mới nào — chúng sẽ bị xoá tuần 4.
- Đừng hardcode màu mới ngoài thang mực-trên-giấy; cần sắc thái mới thì `color-mix` từ token.
- Đừng đặt chữ `--c-ink` lên giấy hay mực nâu lên nền tối.
- Đừng hide-content-chờ-GSAP (nội dung ẩn vĩnh viễn khi reduced-motion); đừng scrub các reveal rời rạc.
- Đừng thêm scroller phụ (overflow) cho trang scroll-story — ScrollTrigger bám `<html>`.
