# Kế hoạch xây dựng — Bảo tàng số tương tác: Chủ nghĩa xã hội khoa học

> Bản kế hoạch chốt sau reverse requirement interview (06/07/2026) + review kiến trúc,
> thay thế định hướng trong `building_plan_6_7.md`. Sản phẩm học phần MLN131 — FPT University.

## 0. Nguyên tắc kiến trúc (chốt sau review)

1. **Một bảo tàng, nhiều phòng — không phải nhiều website.** World và Vietnam là hai
   *renderer* của cùng một `Collection<Event>`, không phải hai app riêng. Header,
   navigation, transition, Event Panel dùng chung; chỉ theme và cách trình bày đổi.
2. **Shared components trước, page sau.** Xây engine dùng chung (EventPanel, Timeline,
   Transition, Theme, Audio) trước, rồi World/Vietnam chỉ *compose* — tránh refactor
   lớn ở tuần 3.
3. **Dữ liệu tách khỏi mã nguồn:** `xlsx → content.json → adapter.ts → HistoricalEvent`.
   JSON debug được, nhóm xem được, không cần build lại khi chỉ sửa nội dung.

## 1. Các quyết định đã chốt

| Hạng mục | Quyết định |
|---|---|
| Định vị | Digital Interactive Museum về CNXH khoa học, ~30 sự kiện, 4 giai đoạn |
| Deadline | **3–4 tuần** (mục tiêu hoàn thành ~01–03/08/2026) |
| Code cũ | Thay thế hoàn toàn app "Kháng chiến chống Mỹ"; **tái dùng MapView/Timeline/LocationCard (Leaflet)** làm nền World renderer; tooling (Vite, ESLint, Prettier, tokens, CI) giữ nguyên |
| MVP (phải có) | Opening (film strip) · World Mode · Vietnam Mode · Quiz |
| Stretch | Knowledge Panel (search/filter) · 1 điểm nhấn R3F |
| Tech | GSAP + ScrollTrigger cho **scene animation**; CSS cho micro-interaction; **R3F chỉ nâng cấp 1 điểm nhấn nếu còn thời gian** (ưu tiên ambient Vietnam) |
| Map | Giữ **Leaflet** (không chuyển MapLibre) |
| Styling | **CSS thuần + design tokens**; 3 theme: `neutral` / `world` / `vietnam` |
| Dữ liệu | `docs/content.xlsx` là **source of truth**, convert chạy lại được → `content.json` |
| Quiz | Làm khung + placeholder trước, nội dung câu hỏi bổ sung giai đoạn cuối |
| Ngôn ngữ | Toàn bộ tiếng Việt (UI + nội dung) |
| Deploy | **Vercel** (bỏ base path GitHub Pages) |
| Responsive | Desktop-first; mobile đọc được nội dung, hiệu ứng giản lược |
| Workflow | Solo dev; commit thẳng main, milestone theo tuần |

## 2. Kiến trúc

### 2.1. Data pipeline

```
docs/content.xlsx
   │  npm run convert  (script Node, chạy lại được nhiều lần)
   ▼
src/data/content.json      ← generated, commit vào repo, nhóm xem/diff được
   │  adapter.ts  (parse, validate, normalize tại runtime import)
   ▼
HistoricalEvent[]          ← type an toàn, mọi feature đều tiêu thụ từ đây
```

- Script convert đồng thời **tải ảnh Wikimedia về local** và in báo cáo ô thiếu
  (ảnh, tọa độ, nguồn) gửi nhóm.
- Adapter là chỗ duy nhất biết cấu trúc JSON; Quiz, Knowledge, Timeline, Statistics,
  Opening đều nhận `HistoricalEvent[]` từ adapter, không đọc JSON trực tiếp.
- Một sự kiện có thể có **nhiều địa điểm** (vd Paris + Manchester 1843–44) → `locations[]`.

### 2.2. Kiểu dữ liệu chính

```ts
type EraId = 'birth' | 'lenin' | 'post-lenin' | 'vietnam'

interface HistoricalEvent {
  id: string
  slug: string             // 'tuyen-ngon-dang-cong-san' → ?event=... đẹp, ổn định
  era: EraId
  order: number            // STT trong giai đoạn
  title: string
  dateLabel: string        // chuỗi hiển thị (hỗ trợ khoảng, nhiều đợt)
  year: number             // năm đại diện để sort/timeline
  locations: { lat: number; lng: number; label: string }[]
  summary: string          // thông tin ngắn
  description: string      // thông tin đi kèm (dài)
  image: { thumb: string; full: string }   // theo asset pipeline
  imageSource: string
  sources: string[]
  incomplete?: string[]    // các field còn thiếu từ xlsx
}
```

Quiz: `QuizQuestion` giữ cấu trúc cũ, đổi `campaignId` → `eventSlug: string`.

### 2.3. Shell bảo tàng + Renderer

```
<MuseumShell>                      ← header, mode switcher, transition, theme — LUÔN giống nhau
  ├── <OpeningOverlay />           ← intro overlay (không phải route), skip được, hiện 1 lần/session
  └── <EventRenderer>
        ├── <WorldRenderer />      ← Leaflet map + horizontal timeline + marker glow
        └── <VietnamRenderer />    ← bamboo scroll story (chỉ events era='vietnam')
```

- Route: `/the-gioi` · `/viet-nam` · `/trac-nghiem` (+ `?event=<slug>` deep-link).
  `/` redirect về `/the-gioi`; Opening là overlay phủ lên shell, reload thì skip được.
- Cả hai renderer cùng mở **một `<EventPanel>` dùng chung** (hero image, paper reveal,
  typing text, gallery, nguồn). Thêm mode mới sau này = thêm renderer, không đụng shell.
- **Zustand** store: mode, sự kiện đang chọn, filter, trạng thái audio.

### 2.4. Shared components (xây trước, tuần 1)

```
shared/
├── EventPanel        ← dùng chung World + Vietnam + Knowledge + Quiz jump
├── EventImage        ← chọn thumb/full theo ngữ cảnh, placeholder giấy dó khi thiếu
├── Transition        ← film transition giữa mode/overlay
├── Timeline          ← logic chung (useTimeline: events → vị trí/active)
│   ├── HorizontalTimeline   (World)
│   ├── FilmStripTimeline    (Opening)
│   └── WheelTimeline        (Vietnam — stretch)
├── AudioManager      ← skeleton từ đầu: ambient / click / transition / paper / film
└── Theme             ← neutral / world / vietnam qua data-theme
```

### 2.5. Theme

`tokens.css` theo `data-theme`, 3 bộ:

- **Neutral** — Opening, Quiz, Knowledge: nền tối trung tính, giấy sáng
- **World** (`old film`): `#111111 / #1A1A1A / #D8C8A5 / #8B6B3E`
- **Vietnam** (`tre – giấy dó`): `#17361E / #406343 / #F5ECD8 / #C69C5D`

### 2.6. Phân công animation

- **GSAP + ScrollTrigger**: scene lớn — film strip, bamboo growth, parallax, transition
  giữa mode, paper reveal, typing.
- **CSS thuần**: hover, focus, button, card lift, opacity nhỏ — không dùng GSAP cho
  micro-interaction.

### 2.7. Asset pipeline

```
assets/raw/          ← ảnh gốc tải từ nguồn (bước convert)
public/images/
├── optimized/       ← ~1600px, dùng cho EventPanel
└── thumb/           ← ~400px, dùng cho film strip / marker / list
```

Script convert sinh cả hai cỡ (sharp); fullscreen/lightbox dùng optimized (raw không ship).

## 3. Roadmap 4 tuần

> Đổi thứ tự so với bản trước: **Opening lên tuần 1** vì nó quyết định design language
> (film, đèn pin, typography, mood) cho toàn bộ sản phẩm; shared components xây trước
> để World/Vietnam chỉ compose.

### Tuần 1 (07–13/07) — Foundation + Data + Shared + Opening

- [ ] Dọn app cũ: gỡ WarLanding/quizData chống Mỹ, giữ khung component tái dùng
- [ ] Cài GSAP, react-router, zustand; cấu hình Vercel, bỏ base path
- [ ] Pipeline: script convert xlsx → `content.json` + tải ảnh + sinh thumb/optimized + báo cáo thiếu; viết `adapter.ts` + types
- [ ] Theme 3 bộ (neutral/world/vietnam) trong tokens.css; MuseumShell + header + mode switcher + route skeleton
- [ ] Shared: EventPanel, EventImage, Transition, AudioManager skeleton, useTimeline
- [ ] OpeningOverlay: layout 60/40, thống kê, vertical film strip (CSS/GSAP) với hiệu ứng đèn pin, nút "BẮT ĐẦU HÀNH TRÌNH" → film đóng → World

**Milestone:** mở web thấy Opening hoàn chỉnh, bấm vào rơi xuống shell với dữ liệu thật đã load.

### Tuần 2 (14–20/07) — World Renderer

- [ ] WorldRenderer trên nền MapView cũ: Leaflet + marker glow theo giai đoạn
- [ ] HorizontalTimeline (1831→nay) đồng bộ hai chiều với map
- [ ] Kết nối EventPanel: click marker → glow → panel (paper reveal, typing, gallery, nguồn)
- [ ] Deep-link `?event=<slug>`; filter theo giai đoạn (nền cho Knowledge sau)

**Milestone:** khám phá được ~30 sự kiện trên map, trải nghiệm World hoàn chỉnh.

### Tuần 3 (21–27/07) — Vietnam Renderer

- [ ] VietnamRenderer: tre (SVG) mọc theo ScrollTrigger, node nhô tại mỗi sự kiện
- [ ] Card "giấy dó" bung từ node — bên trong vẫn là EventPanel dùng chung
- [ ] Background parallax 3–4 lớp: trời → núi → sương → tre
- [ ] Transition World ↔ Vietnam qua film transition + đổi theme; WheelTimeline nếu kịp

**Milestone:** Vietnam Mode kể chuyện trọn vẹn từ 1930 đến nay, chuyển mode liền mạch.

### Tuần 4 (28/07–03/08) — Quiz + Polish + Deploy

- [ ] Khung Quiz (tái dùng UI cũ, theme neutral): tiến trình, giải thích, "xem sự kiện trên bản đồ" jump theo slug; nội dung câu hỏi do nhóm review
- [ ] Knowledge Panel (stretch): search + filter, click → focus map
- [ ] Gắn âm thanh thật vào AudioManager (ambient 2 mode, click, paper, film) + nút tắt
- [ ] Responsive pass: mobile đọc được, giản lược parallax/filmstrip
- [ ] Hiệu năng (lazy-load ảnh, code-split theo route), accessibility cơ bản, SEO meta
- [ ] **Nếu dư ≥3 ngày:** nâng 1 điểm nhấn lên R3F (particle/sương Vietnam)
- [ ] Chạy lại convert với xlsx chốt + deploy Vercel

**Milestone:** sản phẩm hoàn chỉnh trên Vercel, sẵn sàng thuyết trình.

## 4. Rủi ro & cách xử lý

| Rủi ro | Xử lý |
|---|---|
| Nhóm cập nhật xlsx trễ / dữ liệu thiếu | Convert idempotent + báo cáo thiếu tự động; JSON diff được nên phát hiện thay đổi dễ; EventImage có placeholder giấy dó |
| Vietnam Mode ngốn thời gian | EventPanel + Transition đã có sẵn từ tuần 1, tuần 3 chỉ làm renderer; bamboo tĩnh + ScrollTrigger là mức tối thiểu, parallax/particle cắt được |
| R3F không kịp | Đã là stretch — sản phẩm hoàn chỉnh mà không cần 3D |
| Ảnh Wikimedia hotlink chậm/vỡ | Ảnh tải về local trong bước convert, sinh thumb/optimized, ghi nguồn trong data |
| Quiz content trễ | Khung chạy với placeholder; nội dung là data thuần, thêm sau không đụng code |
| Opening overlay chặn người xem lại | Skip được bằng nút + tự skip nếu đã xem trong session |
