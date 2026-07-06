# Bảo tàng số: Chủ nghĩa xã hội khoa học

Bảo tàng số tương tác về **Chủ nghĩa xã hội khoa học** — hành trình ~33 sự kiện qua 4 giai đoạn, từ phong trào công nhân Lyon 1831 đến Việt Nam hôm nay. Hai khu trưng bày (World / Việt Nam) là hai *renderer* của cùng một bộ dữ liệu, kèm khu trắc nghiệm. Toàn bộ nội dung bằng tiếng Việt.

> Sản phẩm học phần MLN131 (FPT University). Kế hoạch xây dựng: [PLAN.md](./PLAN.md) · Design system: [DESIGN.md](./DESIGN.md).

## Tính năng (theo roadmap 4 tuần)

- **Opening** — intro overlay: cuộn phim dọc với hiệu ứng đèn pin, thống kê, nút "Bắt đầu hành trình" (hiện 1 lần/session, skip được). ✅ tuần 1
- **World Mode** (`/the-gioi`) — tuần 1 là danh sách theo giai đoạn; tuần 2 nâng lên bản đồ Leaflet + timeline ngang.
- **Vietnam Mode** (`/viet-nam`) — tuần 1 là danh sách; tuần 3 nâng lên bamboo scroll story.
- **Event Panel dùng chung** — mở qua `?event=<slug>` (deep-link được), hero ảnh, mô tả, nguồn. ✅ tuần 1
- **Trắc nghiệm** (`/trac-nghiem`) — khung tuần 4, nội dung câu hỏi do nhóm biên soạn.

## Công nghệ

React 19 · TypeScript · Vite · react-router 7 · zustand · GSAP (`@gsap/react`) · React-Leaflet (tuần 2) · CSS thuần + design token 3 theme (`neutral` / `world` / `vietnam` qua `data-theme`).

## Bắt đầu

Yêu cầu **Node ≥ 20** (xem `.nvmrc`).

```bash
npm install      # cài phụ thuộc (chỉ lần đầu)
npm run dev      # chạy dev server → http://localhost:5173/
```

### Pipeline dữ liệu

`docs/content.xlsx` (nhóm cập nhật) là **source of truth**:

```bash
npm run convert                  # xlsx → src/data/content.json + tải ảnh + báo cáo
npm run convert -- --force-images  # tải lại toàn bộ ảnh
```

- Chạy lại được nhiều lần (idempotent); ảnh gốc cache ở `assets/raw/` (gitignore), bản dùng thật sinh vào `public/images/{optimized,thumb}/` (commit).
- Ô thiếu dữ liệu/ảnh không tải được → xem **`docs/content-report.md`** (gửi nhóm bổ sung).
- Hàng có link ảnh không tự tải được (trang Category/bài báo): điền link ảnh trực tiếp vào `scripts/convert/overrides.json` theo id sự kiện.
- Code chỉ tiêu thụ dữ liệu qua `src/data/adapter.ts` — không đọc `content.json` trực tiếp.

### Các lệnh khác

| Lệnh | Tác dụng |
|---|---|
| `npm run build` | Type-check + build production (`dist/`). |
| `npm run preview` | Xem thử bản build. |
| `npm run lint` | Chạy ESLint. |
| `npm run format` | Định dạng code bằng Prettier. |

## Cấu trúc thư mục

```
scripts/convert/    # Pipeline xlsx → content.json + ảnh + báo cáo
src/
  museum/           # Shell bảo tàng: header, mode switcher, router, Opening
  shared/           # Component dùng chung: EventPanel, EventImage, Transition,
                    #   AudioManager (skeleton), useTimeline
  pages/            # Composition theo route (WorldPage, VietnamPage, Quiz…)
    MapView/        #   [legacy — nền cho WorldRenderer tuần 2]
    QuizPage/       #   [legacy — khung tái dùng tuần 4]
  store/            # zustand (opening, filter, audio); mode + event nằm trong URL
  data/             # content.json (generated) + adapter.ts + quizPlaceholder.ts
  types/            # HistoricalEvent, EraId, QuizQuestion (events.ts)
  styles/           # tokens.css (2 layer: theme --c-* + legacy) + global.css
```

Import nội bộ dùng alias **`@/`** trỏ tới `src/`.

## Triển khai

**Vercel** (SPA rewrite trong `vercel.json`): connect repo → framework Vite → build `npm run build` → output `dist/`. CI (`.github/workflows/ci.yml`) chạy lint + build mỗi lần push.

## Nguồn dữ liệu & ghi công

Nội dung do nhóm biên soạn trong `docs/content.xlsx` từ tư liệu chính thống; nguồn thông tin + nguồn ảnh ghi theo từng sự kiện và hiển thị trong Event Panel.
