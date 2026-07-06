# Hồ Chí Minh – Hành Trình Cứu Nước

Ứng dụng web giáo dục lịch sử, tái hiện **10 chiến dịch lớn của cuộc kháng chiến chống Mỹ (1960–1975)** trên một **bản đồ tương tác**, kèm dòng thời gian và bài trắc nghiệm kiểm tra kiến thức. Toàn bộ nội dung bằng tiếng Việt, tông trang nghiêm – tưởng niệm.

> Sản phẩm học phần (FPT University). Xem [DESIGN.md](./DESIGN.md) cho hệ thống thiết kế (design system).

## Tính năng

- **Landing** — màn giới thiệu: tiêu đề, trích dẫn Bác Hồ, các chỉ số (10 chiến dịch / 35 trận đánh / 15 năm), nút vào bản đồ.
- **Bản đồ (Leaflet)** — điểm chiến dịch (sao vàng/đỏ); chọn một chiến dịch sẽ hiện các trận đánh (⚔) và thẻ chi tiết trượt ra (đường lối của Đảng, danh sách trận đánh, ý nghĩa lịch sử, ảnh + lightbox). Có **dòng thời gian** 1–10 và **lớp phủ chủ quyền Hoàng Sa & Trường Sa**.
- **Quiz** — 10 câu trắc nghiệm (rút từ 15), thanh tiến trình, giải thích từng câu, vòng điểm xếp loại, và nút "Xem sự kiện trên bản đồ" nhảy về đúng chiến dịch.

## Công nghệ

React 19 · TypeScript · Vite · React-Leaflet / Leaflet · CSS thuần (per-component + design token).

## Bắt đầu

Yêu cầu **Node ≥ 20** (xem `.nvmrc`).

```bash
npm install      # cài phụ thuộc (chỉ lần đầu)
npm run dev      # chạy dev server
```

Mở: **http://localhost:5173/Map_Khang_chien_chong_my/**
(URL có base path `/Map_Khang_chien_chong_my/` — cấu hình trong `vite.config.ts` để deploy GitHub Pages.)

### Các lệnh khác

| Lệnh | Tác dụng |
|---|---|
| `npm run build` | Type-check + build production (`dist/`). |
| `npm run preview` | Xem thử bản build. |
| `npm run lint` | Chạy ESLint. |
| `npm run format` | Định dạng code bằng Prettier. |

## Cấu trúc thư mục

```
src/
  pages/            # Màn cấp trang (App điều hướng qua state)
    WarLanding/     #   màn giới thiệu
    MapView/        #   bản đồ (màn chính)
    QuizPage/       #   trắc nghiệm
  components/       # Thành phần tái sử dụng
    Timeline/       #   dòng thời gian
    LocationCard/   #   thẻ chi tiết chiến dịch/trận đánh
  data/             # Dữ liệu nội dung
    locations.ts    #   10 chiến dịch + 35 trận đánh
    quizData.ts     #   15 câu hỏi
  types/            # Kiểu dữ liệu domain dùng chung (Campaign, Battle, QuizQuestion)
  styles/           # tokens.css (design token) + global.css (reset/base)
  App.tsx           # Điều hướng 3 màn
  main.tsx          # Điểm vào
```

Import nội bộ dùng alias **`@/`** trỏ tới `src/` (vd `@/components/Timeline/Timeline`, `@/types`).

## Triển khai

Tự động deploy lên **GitHub Pages** khi push vào `main`, qua workflow `.github/workflows/deploy.yml` (build → upload `dist/` → deploy).

## Nguồn dữ liệu & ghi công

Nội dung lịch sử biên soạn từ tư liệu chính thống (xem thư mục `docs/`). Hình ảnh dẫn nguồn trực tiếp trong `src/data/locations.ts`.
