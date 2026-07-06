---
version: 1.0
name: hanh-trinh-cuu-nuoc-design
description: Hệ thiết kế cho ứng dụng giáo dục lịch sử "Hồ Chí Minh – Hành Trình Cứu Nước" (10 chiến dịch kháng chiến chống Mỹ 1960–1975). Ngôn ngữ hình ảnh mang tính tưởng niệm, trang nghiêm và yêu nước — nền tối navy làm canvas, vàng kim (#ffd700) là màu chủ đạo, đỏ cờ Việt Nam (#da251d) là màu phụ; chữ serif hiển thị (Playfair Display cho tiêu đề, Noto Serif cho hero landing) kết hợp sans body (Roboto). Chữ ký hình ảnh là góc bo mềm, gradient vàng, và hiệu ứng glow vàng thay cho đổ bóng phẳng.

colors:
  primary: "#ffd700"
  on-primary: "#0a0a15"
  bg-deep: "#050816"
  bg: "#0a0a15"
  surface: "#14141e"
  surface-2: "#1a1a2e"
  surface-3: "#16213e"
  gold: "#ffd700"
  gold-light: "#ffec8b"
  gold-mid: "#f0c040"
  gold-deep: "#daa520"
  gold-amber: "#ffb300"
  gold-muted: "#b8a068"
  gold-tint: "#f5e8b9"
  gold-sand: "#d4c5a0"
  red: "#da251d"
  red-bright: "#ff4444"
  red-soft: "#ff6b6b"
  text-strong: "#ffffff"
  text: "rgba(255,255,255,0.87)"
  text-muted: "rgba(255,255,255,0.6)"
  text-faint: "rgba(255,255,255,0.5)"
  n-100: "#eeeeee"
  n-300: "#cccccc"
  n-500: "#999999"
  n-700: "#666666"
  success: "#4caf50"
  error: "#f44336"
  info: "#64b5f6"
  border-gold-faint: "rgba(255,215,0,0.15)"
  border-gold: "rgba(255,215,0,0.3)"
  hairline: "rgba(255,255,255,0.15)"
  hairline-soft: "rgba(255,255,255,0.08)"

typography:
  hero-title:
    fontFamily: NotoSerif, "Times New Roman", serif
    fontSize: clamp(1.8rem, 4vw, 3.2rem)
    fontWeight: 700
    lineHeight: 1.22
    letterSpacing: 0.04em
  display-lg:
    fontFamily: PlayfairDisplay, "Times New Roman", serif
    fontSize: 1.8rem
    fontWeight: 700
    lineHeight: 1.2
  display-md:
    fontFamily: PlayfairDisplay, "Times New Roman", serif
    fontSize: 1.5rem
    fontWeight: 700
    letterSpacing: 0.5px
  display-sm:
    fontFamily: PlayfairDisplay, "Times New Roman", serif
    fontSize: 1.4rem
    fontWeight: 700
  eyebrow:
    fontFamily: PlayfairDisplay, "Times New Roman", serif
    fontSize: 1.2rem
    fontWeight: 400
    letterSpacing: 0.2em
    textTransform: uppercase
  stat-number:
    fontFamily: PlayfairDisplay, "Times New Roman", serif
    fontSize: clamp(2rem, 3vw, 2.5rem)
    fontWeight: 700
    lineHeight: 1
  quote:
    fontFamily: PlayfairDisplay, "Times New Roman", serif
    fontSize: 1.3rem
    fontWeight: 400
    fontStyle: italic
    lineHeight: 1.8
  body-lg:
    fontFamily: Roboto, system-ui, sans-serif
    fontSize: 1.15rem
    fontWeight: 600
    lineHeight: 1.6
  body:
    fontFamily: Roboto, system-ui, sans-serif
    fontSize: 0.95rem
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: Roboto, system-ui, sans-serif
    fontSize: 0.9rem
    fontWeight: 400
    lineHeight: 1.6
  caption:
    fontFamily: Roboto, system-ui, sans-serif
    fontSize: 0.85rem
    fontWeight: 400
  micro:
    fontFamily: Roboto, system-ui, sans-serif
    fontSize: 0.78rem
    fontWeight: 600
  badge:
    fontFamily: Roboto, system-ui, sans-serif
    fontSize: 0.75rem
    fontWeight: 600
    letterSpacing: 0.5px

rounded:
  xs: 3px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 28px
  pill: 50px
  full: 9999px
  circle: 50%

spacing:
  xxs: 2px
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 24px
  3xl: 32px
  4xl: 40px

elevation:
  glow-gold-sm: "0 0 12px rgba(255,215,0,0.4)"
  glow-gold-md: "0 0 20px rgba(255,215,0,0.6)"
  shadow-sm: "0 2px 12px rgba(0,0,0,0.3)"
  shadow-md: "0 8px 30px rgba(0,0,0,0.3)"
  shadow-lg: "0 10px 40px rgba(0,0,0,0.5)"

components:
  hero-title:
    fontFamily: "{typography.hero-title}"
    fill: "linear-gradient(135deg, {colors.gold}, {colors.gold-light}, {colors.gold-deep})"
    note: "Gradient vàng clip vào chữ (background-clip:text)."
  eyebrow:
    textColor: "{colors.gold-muted}"
    typography: "{typography.eyebrow}"
  stat-tile:
    backgroundColor: "rgba(255,255,255,0.04)"
    borderColor: "{colors.border-gold-faint}"
    numberColor: "{colors.gold}"
    labelColor: "{colors.n-600}"
    typography: "{typography.stat-number}"
    rounded: "{rounded.lg}"
    note: "Panel kính mờ (backdrop-blur) chứa 4 chỉ số, phân cách bằng viền vàng mờ."
  cta-button:
    backgroundColor: "linear-gradient(135deg, {colors.gold}, {colors.gold-mid}, {colors.gold-deep})"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.lg} 42px"
    shadow: "0 4px 25px rgba(255,215,0,0.25)"
    note: "Nút hành động chính, viên thuốc vàng gradient + glow vàng."
  map-header:
    backgroundColor: "linear-gradient(180deg, rgba(10,10,15,0.95), transparent)"
    titleColor: "{colors.text-strong}"
    typography: "{typography.display-md}"
    subtitleColor: "{colors.text-faint}"
  quiz-nav-btn:
    backgroundColor: "rgba(255,255,255,0.07)"
    borderColor: "{colors.border-gold}"
    textColor: "{colors.gold}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
    shadow: "{elevation.shadow-sm}"
    note: "Nút kính mờ viền vàng ở góc header bản đồ."
  guide-hint:
    backgroundColor: "rgba(20,20,30,0.9)"
    borderColor: "{colors.border-gold}"
    rounded: "{rounded.3xl}"
    note: "Pill gợi ý thao tác, pulse glow vàng."
  timeline-dot:
    backgroundColor: "{colors.red}"
    activeBackgroundColor: "{colors.gold}"
    activeGlow: "{elevation.glow-gold-md}"
    rounded: "{rounded.circle}"
    note: "Chấm dòng thời gian đỏ; active chuyển vàng + glow."
  location-card:
    backgroundColor: "linear-gradient(135deg, {colors.surface-2}, {colors.surface-3})"
    borderColor: "rgba(255,215,0,0.2)"
    titleColor: "{colors.gold}"
    rounded: "{rounded.lg}"
    shadow: "{elevation.shadow-lg}"
    note: "Panel trượt chi tiết chiến dịch/trận đánh."
  collapsible-section:
    borderColor: "{colors.hairline-soft}"
    rounded: "{rounded.sm}"
    guidelineAccent: "{colors.info}"
    battlesAccent: "{colors.red-soft}"
    significanceAccent: "{colors.gold}"
    note: "Mục gập: Đường lối của Đảng (xanh), Các trận đánh (đỏ), Ý nghĩa lịch sử (vàng)."
  type-badge:
    campaignColor: "{colors.gold}"
    battleColor: "{colors.red-soft}"
    typography: "{typography.badge}"
    rounded: "{rounded.md}"
  quiz-card:
    backgroundColor: "linear-gradient(135deg, {colors.surface-2}, {colors.surface-3})"
    borderColor: "{colors.border-gold-faint}"
    rounded: "{rounded.lg}"
    shadow: "0 8px 40px rgba(0,0,0,0.4)"
    questionColor: "{colors.n-100}"
    typography: "{typography.body-lg}"
  quiz-option:
    backgroundColor: "rgba(255,255,255,0.04)"
    borderColor: "rgba(255,255,255,0.1)"
    textColor: "{colors.n-200}"
    selectedColor: "{colors.gold}"
    correctColor: "{colors.success}"
    wrongColor: "{colors.error}"
    rounded: "{rounded.md}"
  score-ring:
    trackColor: "{colors.hairline-soft}"
    numberColor: "{colors.text-strong}"
    note: "Vòng điểm SVG; màu ring theo grade (dynamic)."
  sovereignty-label:
    nameColor: "{colors.red}"
    countryColor: "{colors.red}"
    typography: "{typography.display-md}"
    note: "Nhãn Hoàng Sa / Trường Sa + 'VIỆT NAM', đỏ viền trắng trên bản đồ."

---


## Overview

"Hồ Chí Minh – Hành Trình Cứu Nước" là một sản phẩm giáo dục lịch sử: một single-page app (React + Vite + TypeScript) lấy **bản đồ Leaflet tương tác** làm trung tâm, tái hiện 10 chiến dịch lớn của cuộc kháng chiến chống Mỹ 1960–1975 qua ba màn: **Landing → Bản đồ → Quiz**. Toàn bộ nội dung bằng tiếng Việt, giọng điệu trang nghiêm và tưởng niệm.

Ngôn ngữ hình ảnh xoay quanh một bộ ba màu mang tính biểu tượng: **nền tối navy** làm canvas nghiêm cẩn, **vàng kim** (`{colors.gold}`) là màu chủ đạo cho tiêu đề, điểm nhấn và hành động, và **đỏ cờ Việt Nam** (`{colors.red}`) làm màu phụ cho chủ quyền (Hoàng Sa & Trường Sa), dòng thời gian và các nhấn mạnh. Vàng và đỏ gợi trực tiếp lá cờ Tổ quốc — đây là lựa chọn có chủ đích, không phải trang trí.

Chữ mang phần lớn bản sắc. Ba face phân vai: **Noto Serif** cho tiêu đề hero của Landing; **Playfair Display** (serif hiển thị) cho mọi tiêu đề mục, tên chiến dịch, chỉ số và trích dẫn; **Roboto** (sans) cho nội dung, nhãn, metadata. Serif kể chuyện, sans dẫn hướng.

Khác với ngôn ngữ editorial phẳng-góc-vuông, sản phẩm này dùng **góc bo mềm**, **gradient vàng** (clip vào chữ tiêu đề và tô nút), và **hiệu ứng glow vàng** làm chữ ký nâng độ (elevation) — thay cho đổ bóng cứng. Hairline vàng mờ và các panel kính mờ (backdrop-blur) tạo chiều sâu trên nền tối.

**Đặc trưng chính:**
- Bộ ba màu biểu tượng: nền tối + vàng kim (chủ đạo) + đỏ cờ (phụ) — gợi cờ Tổ quốc.
- Hệ ba face: Noto Serif (hero) + Playfair Display (hiển thị) + Roboto (body).
- Góc bo mềm ở mọi bề mặt tương tác; nút hành động là viên thuốc (pill) gradient vàng.
- Glow vàng + gradient là chữ ký nâng độ, thay cho bóng phẳng.
- Lớp phủ chủ quyền Hoàng Sa & Trường Sa với nhãn đỏ viền trắng — điểm nhấn nội dung–chính trị.

## Colors

### Chủ đạo & nhấn
- **Vàng kim** (`{colors.gold}` — `#ffd700`): màu chủ đạo. Tiêu đề, điểm nhấn, viền, hành động, glow. Có cả thang phái sinh: `gold-light` `#ffec8b` (hover/điểm sáng gradient), `gold-mid` `#f0c040`, `gold-deep` `#daa520` (điểm tối gradient), `gold-amber` `#ffb300` (gradient nút "Tiếp"), `gold-muted` `#b8a068` (eyebrow), `gold-tint` `#f5e8b9` (chữ trên nền sáng), `gold-sand` `#d4c5a0` (trích dẫn).
- **Đỏ cờ** (`{colors.red}` — `#da251d`): màu phụ. Nhãn chủ quyền, chấm dòng thời gian, popup, nút xác nhận/làm lại. Phái sinh: `red-bright` `#ff4444` (điểm sáng gradient), `red-soft` `#ff6b6b` (nhãn trận đánh).

### Bề mặt (nền tối)
- **Bg-deep** (`{colors.bg-deep}` — `#050816`): nền sâu nhất, dùng cho hero Landing.
- **Bg** (`{colors.bg}` — `#0a0a15`): canvas chuẩn (bản đồ, nền chung).
- **Surface** (`{colors.surface}` — `#14141e`): panel/hint.
- **Surface-2 / Surface-3** (`#1a1a2e` / `#16213e`): cặp điểm cho gradient thẻ (location-card, quiz-card, result-card).

### Chữ
- **Text-strong** (`#ffffff`) cho tiêu đề nổi bật; **Text** (`rgba(255,255,255,0.87)`) là body mặc định; **Text-muted** (`0.6`) và **Text-faint** (`0.5`) cho phụ đề/metadata. Thang xám đục `n-100…n-800` (`#eee`→`#555`) cho phân cấp chữ trong thẻ.

### Ngữ nghĩa (quiz)
- **Success** `#4caf50` (đáp án đúng), **Error** `#f44336` (đáp án sai), **Info** `#64b5f6` (mục "Đường lối của Đảng").

## Typography

### Font Family
1. **Noto Serif** — tiêu đề hero của Landing (`{typography.hero-title}`), fluid `clamp(1.8rem, 4vw, 3.2rem)`, weight 700.
2. **Playfair Display** — serif hiển thị cho mọi tiêu đề mục, tên chiến dịch, chỉ số, trích dẫn (eyebrow, display-lg/md/sm, stat-number, quote).
3. **Roboto** — sans cho body, nhãn, metadata, nút phụ (weights 300/400/500/700).

### Nguyên tắc
- **Serif kể chuyện, sans dẫn hướng.** Serif (Playfair/Noto) không mang nhãn cấu trúc nhỏ; Roboto không mang tiêu đề hiển thị.
- **Tiêu đề hero là gradient vàng clip vào chữ** — chữ ký thị giác mạnh nhất của Landing.
- **Trích dẫn dùng Playfair nghiêng, line-height 1.8** — nhịp thở dành cho câu nói Bác Hồ.

## Layout

### Hệ khoảng cách
- **Đơn vị gốc**: 4px. Token: `xxs` 2 · `xs` 4 · `sm` 8 · `md` 12 · `lg` 16 · `xl` 20 · `2xl` 24 · `3xl` 32 · `4xl` 40.
- Landing dùng shell canh giữa `min(100%, 960px)`; quiz dùng cột `max(660px)`; location-card rộng 500px trượt bên trái bản đồ.

### Chiến lược responsive
| Tên | Bề rộng | Thay đổi chính |
|---|---|---|
| Mobile | < 700–768px | Hero co (clamp), stats xếp dọc, timeline cuộn ngang, location-card về đáy màn hình. |
| Desktop | ≥ 768px | Bố cục đầy đủ, location-card cạnh trái, timeline trải ngang. |

Bản đồ Leaflet chiếm toàn màn (`100vw × 100vh`) với nền `{colors.bg}`; các lớp UI (header, timeline, card) nổi lên trên bằng `z-index`.

## Elevation & Depth

| Mức | Xử lý | Dùng cho |
|---|---|---|
| Mức 0 — Phẳng | Không viền, không bóng. | Nền, phần lớn bề mặt. |
| Mức 1 — Hairline vàng | 1px viền vàng mờ (`{colors.border-gold-faint}` / `{colors.border-gold}`). | Stat-tile, quiz-card, nút viền. |
| Mức 2 — Glow vàng | `{elevation.glow-gold-sm}` / `glow-gold-md`. | Chấm timeline active, guide-hint pulse, focus. |
| Mức 3 — Bóng thẻ | `{elevation.shadow-md}` / `shadow-lg`. | Location-card, quiz-card, popup. |

Khác với ngôn ngữ editorial phẳng–góc-vuông: sản phẩm này **dùng glow vàng và gradient làm chữ ký nâng độ**. Bóng đen chỉ dành cho panel nổi lớn.

## Shapes

### Thang bo góc
| Token | Giá trị | Dùng |
|---|---|---|
| `{rounded.xs}` | 3px | Thanh tiến trình, scrollbar. |
| `{rounded.sm}` | 8px | Mục gập, item trận đánh, lightbox. |
| `{rounded.md}` | 12px | Ô đáp án, badge loại, nút nav bản đồ. |
| `{rounded.lg}` | 16px | Thẻ (location-card, quiz-card), stat-tile. |
| `{rounded.xl}` | 20px | Badge năm, result-card. |
| `{rounded.pill}` | 50px | Nút CTA chính (viên thuốc). |
| `{rounded.circle}` | 50% | Chấm timeline, avatar tròn, nút đóng. |

### Hình học ảnh
- Ảnh chiến dịch trong location-card: 16:9-ish, cao 200px, zoom nhẹ khi hover, mở lightbox khi bấm.
- Marker chiến dịch: sao vàng/đỏ; marker trận đánh: ⚔.

## Components

### Signature
- **`hero-title`** — tiêu đề Landing, Noto Serif, gradient vàng clip vào chữ.
- **`cta-button`** — viên thuốc gradient vàng (`{rounded.pill}`) + glow, chữ màu `{colors.on-primary}` (nền tối).
- **`stat-tile`** — panel kính mờ chứa 4 chỉ số (10 chiến dịch / 35 trận đánh / 15 năm / ∞ hy sinh), số màu vàng, viền vàng mờ.
- **`sovereignty-label`** — nhãn Hoàng Sa / Trường Sa + "VIỆT NAM", đỏ `{colors.red}` viền trắng, nổi trên bản đồ.

### Bản đồ
- **`map-header`** — dải gradient tối trên đỉnh, tiêu đề Playfair trắng, phụ đề mờ.
- **`quiz-nav-btn`** — nút kính mờ viền vàng dẫn sang Quiz.
- **`guide-hint`** — pill gợi ý thao tác, pulse glow vàng.
- **`timeline-dot`** — chấm dòng thời gian đỏ; active chuyển vàng + glow, phóng to.

### Thẻ chi tiết (`location-card`)
- Nền gradient `{colors.surface-2}`→`{colors.surface-3}`, viền vàng mờ, bóng lớn, trượt vào từ trái.
- **`collapsible-section`** — ba mục gập với màu accent riêng: **Đường lối của Đảng** (`{colors.info}` xanh), **Các trận đánh** (`{colors.red-soft}` đỏ), **Ý nghĩa lịch sử** (`{colors.gold}` vàng).
- **`type-badge`** — nhãn "Chiến dịch" (vàng) / "Trận đánh" (đỏ).

### Quiz
- **`quiz-card`** — thẻ câu hỏi gradient tối, viền vàng mờ, tiêu đề câu hỏi màu `{colors.n-100}`.
- **`quiz-option`** — ô đáp án; trạng thái `selected` (vàng), `correct` (`{colors.success}`), `wrong` (`{colors.error}`).
- **`score-ring`** — vòng điểm SVG; màu ring đổi theo xếp loại (Xuất sắc/Giỏi/Khá/Cần ôn lại).

## Do's & Don'ts

### Do
- Giữ vàng kim `{colors.gold}` là màu chủ đạo cho tiêu đề, điểm nhấn và hành động; đỏ cờ `{colors.red}` cho chủ quyền, timeline và nhấn mạnh. Bộ ba vàng–đỏ–nền tối gợi cờ Tổ quốc.
- Đặt tiêu đề hiển thị bằng serif (Noto Serif cho hero, Playfair cho mục), body bằng Roboto.
- Dùng glow vàng và gradient làm chữ ký nâng độ; giữ góc bo mềm ở mọi bề mặt tương tác.
- Mọi màu/gradient/bo góc/glow lấy từ token trong `src/index.css` (`var(--…)`), không hardcode literal mới.

### Don't
- Đừng thêm màu nhấn thứ ba ngoài vàng–đỏ (trừ ngữ nghĩa quiz xanh/đỏ/lam-info). Bản sắc là bộ ba biểu tượng.
- Đừng chuyển sang nền sáng hay đen-trắng thuần — sẽ làm mất biểu tượng cờ Tổ quốc gắn với nội dung.
- Đừng ép góc vuông–phẳng kiểu tạp chí công nghệ; sản phẩm này mềm và có chiều sâu (bo góc + glow).
- Đừng đặt Roboto cho tiêu đề hiển thị hay serif cho nhãn cấu trúc nhỏ.
