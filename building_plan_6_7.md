Sau khi trao đổi và xem dữ liệu của bạn, mình nghĩ nên **định vị lại dự án** trước khi lên plan.

> **Đây không phải là một website timeline.**
>
> Mà là **một Digital Interactive Museum (Bảo tàng số tương tác)** về quá trình hình thành và phát triển của Chủ nghĩa xã hội khoa học.

Điều này sẽ giúp toàn bộ thiết kế, animation và code có cùng một ngôn ngữ.

---

# 1. Mục tiêu sản phẩm

## Product Vision

Xây dựng một website tương tác sử dụng **ThreeJS + React** giúp người dùng khám phá gần **30 sự kiện lịch sử** thông qua:

* Storytelling
* Timeline
* Không gian 3D
* Hiệu ứng điện ảnh
* Tương tác bản đồ

Thay vì đọc tài liệu.

Người dùng sẽ có cảm giác

> "đang tham quan một triển lãm lịch sử."

---

# 2. User Flow

```text
Landing

↓

Opening

↓

Start

↓

Select Mode

├── World Explorer
└── Vietnam Story

↓

Explore Events

↓

Knowledge Panel

↓

Finish
```

---

# 3. Website Structure

```text
Website

├── Opening
│
├── Mode Selection
│
├── World Mode
│
├── Vietnam Mode
│
├── Knowledge Panel
│
└── About
```

---

# 4. Opening

## Mục tiêu

Giới thiệu toàn bộ chủ đề.

Không kể chuyện.

Không animation quá nhiều.

Tạo mood.

---

## Layout

```text
──────────────────────────────────────────────

 FILM STRIP

──────────────────────────────────────────────

Title

Description

Statistics

Start Button

──────────────────────────────────────────────

 FILM STRIP

──────────────────────────────────────────────

                     ||

                     ||

                     ||

 Vertical Film Strip

                     ||

                     ||

```

---

## Bố cục

### Left (60%)

* Website title
* Description
* Statistics

Ví dụ

```text
1831

↓

2026

30+

Historical Events

6

Countries

4

Historical Eras
```

---

### Right (40%)

Vertical Film Strip

Giống hình bạn gửi.

Nhưng

Trong mỗi frame

```text
┌─────────────┐

 Lyon

└─────────────┘

┌─────────────┐

 Manifesto

└─────────────┘

┌─────────────┐

 Paris Commune

└─────────────┘

```

Ảnh chạy liên tục.

---

## Animation

Film Strip

↓

Scroll liên tục

↓

Đèn pin

↓

Chiếu sáng đúng 1 frame

↓

Frame hơi zoom

↓

Blur frame còn lại

---

## Button

```text
BEGIN JOURNEY
```

Click

↓

Film đóng lại

↓

Transition

↓

World Mode

---

# 5. Mode Selection

Sau Opening

Có thể chọn

```text
WORLD

or

VIETNAM
```

Có thể đổi bất kỳ lúc nào.

---

# 6. World Mode

Đây là mode học tập.

---

## Layout

```text
Map

Timeline

Event Panel
```

Giống hiện tại.

Nhưng đẹp hơn.

---

## Components

### Timeline

Bottom

```text
1831────1848────1867────1917────2026
```

---

### Map

Leaflet hoặc MapLibre.

Marker

↓

Glow

↓

Click

↓

Popup

---

### Popup

Ảnh lớn

↓

Title

↓

Description

↓

Source

↓

Gallery

---

## Event Animation

Marker

↓

Glow

↓

Popup

↓

Ảnh hiện

↓

Text typing

---

# 7. Vietnam Mode

Đây là điểm nhấn.

---

## Concept

Tre.

Không dùng map.

---

## Layout

```text
         🌿

        |

        |

        |

      Event

        |

      Bamboo

```

---

## Scroll

Người dùng

↓

Scroll

↓

Tre mọc

↓

Node mọc

↓

Card bung

↓

Tre tiếp tục mọc

↓

Event tiếp

---

## Background

Parallax

Ví dụ

```text
Sky

↓

Mountain

↓

Fog

↓

Bamboo
```

---

## Card

Card

không nổi.

Mà

```text
Tre

↓

Node

↓

Paper Card

```

Giống giấy dó.

---

# 8. Event Component

Dùng chung cho cả 2 mode.

```text
Event

├── Hero Image

├── Timeline

├── Description

├── Gallery

├── Sources

└── Metadata
```

---

## Data

```ts
interface Event {

id

title

period

date

country

city

coordinates

description

image

gallery

source

type

}
```

---

# 9. Knowledge Panel

Giữ đơn giản.

Không graph.

---

## Bao gồm

Search

Filter

```text
Country

Era

Person

Category
```

---

## Khi click

Camera

↓

Focus Event

---

# 10. Shared Animation

Chỉ dùng

3 animation.

---

## Film Transition

```text
Frame

↓

Frame

↓

Frame
```

---

## Paper Reveal

```text
██████

↓

Image
```

---

## Marker Glow

```text
•

↓

◎

↓

⬤
```

---

# 11. UI Theme

## World

```text
Old Film

Steel

Stone

Paper
```

Palette

```text
#111111

#1A1A1A

#D8C8A5

#8B6B3E
```

---

## Vietnam

```text
Tre

Lá

Mực

Giấy dó
```

Palette

```text
#17361E

#406343

#F5ECD8

#C69C5D
```

---

# 12. Folder Structure

```text
src

components

Opening

FilmStrip

Timeline

Map

Story

Knowledge

shared

pages

Landing

World

Vietnam

hooks

data

events.ts

assets

images

audio

videos

shaders

utils

```

---

# 13. Development Roadmap

## Phase 1

Foundation (1 tuần)

* React + Vite
* R3F
* Routing
* Theme
* Data
* Layout

---

## Phase 2

Opening (1 tuần)

* Film Strip
* Hero
* Statistics
* Intro Animation
* Loading

---

## Phase 3

World Mode (2 tuần)

* Timeline
* Map
* Marker
* Popup
* Event
* Filter

---

## Phase 4

Vietnam Mode (2 tuần)

* Scroll Story
* Bamboo Animation
* Event Growth
* Wheel Timeline
* Transition

---

## Phase 5

Knowledge (1 tuần)

* Search
* Filter
* Highlight
* Quick Jump

---

## Phase 6

Polish (1–2 tuần)

* Particle
* Audio
* Responsive
* FPS Optimization
* Accessibility
* SEO

---

# 14. Công nghệ

| Hạng mục     | Công nghệ                                                |
| ------------ | -------------------------------------------------------- |
| Framework    | React + Vite                                             |
| 3D           | React Three Fiber + Three.js                             |
| Animation    | GSAP                                                     |
| UI           | TailwindCSS + shadcn/ui                                  |
| Map          | MapLibre GL (hoặc Leaflet nếu không cần vector nâng cao) |
| Scroll Story | GSAP ScrollTrigger                                       |
| State        | Zustand                                                  |
| Data         | TypeScript (`events.ts` hoặc JSON)                       |
| Build        | Vite                                                     |
| Deploy       | Vercel / Netlify                                         |

---

# 15. Điểm khác biệt của sản phẩm

Thay vì chỉ thêm hiệu ứng, dự án sẽ có **hai trải nghiệm rõ ràng**:

* **World Mode**: thiên về khám phá và học tập. Người dùng sử dụng bản đồ, timeline và bộ lọc để tìm hiểu từng sự kiện theo không gian và thời gian.
* **Vietnam Mode**: thiên về cảm xúc và kể chuyện. Người dùng cuộn trang như xem một bộ phim tài liệu, trong đó cây tre trở thành trục dẫn dắt câu chuyện và từng sự kiện "mọc lên" theo dòng lịch sử.

Điểm quan trọng nhất là **mọi animation đều phục vụ nội dung**, không tạo cơ chế mới chỉ để có hiệu ứng. Điều này giúp website giữ được tính học thuật, dễ sử dụng và vẫn tạo được ấn tượng như một triển lãm lịch sử số hiện đại. Mình nghĩ đây là hướng có tính khả thi cao, phù hợp với quy mô khoảng 30 sự kiện và đủ khác biệt để trở thành một sản phẩm nổi bật.