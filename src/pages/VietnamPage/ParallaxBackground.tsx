/**
 * Nền parallax 4 lớp (trời → núi → sương → tre tiền cảnh) — fixed, sau content,
 * pointer-events: none để card luôn click được. Lớp đứng yên khi reduced-motion;
 * tween yPercent gắn ở VietnamRenderer (chung timeline scrub với thân tre).
 */
import './ParallaxBackground.css'

export default function ParallaxBackground() {
  return (
    <div className="vn-parallax" aria-hidden="true">
      <div className="vn-parallax__layer vn-parallax__sky" />

      <svg
        className="vn-parallax__layer vn-parallax__mountains"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMax slice"
      >
        <path
          className="vn-parallax__mountain-far"
          d="M0 560 L0 330 Q180 220 360 300 Q470 340 560 280 Q700 190 840 290 Q960 360 1100 300 Q1270 230 1440 320 L1440 560 Z"
        />
        <path
          className="vn-parallax__mountain-near"
          d="M0 560 L0 430 Q140 360 300 420 Q430 468 570 400 Q720 330 880 410 Q1020 476 1180 420 Q1320 372 1440 430 L1440 560 Z"
        />
      </svg>

      <svg
        className="vn-parallax__layer vn-parallax__mist"
        viewBox="0 0 1440 560"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <filter id="vn-mist-blur" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
        </defs>
        <g filter="url(#vn-mist-blur)">
          <ellipse cx="300" cy="430" rx="320" ry="52" />
          <ellipse cx="880" cy="470" rx="380" ry="60" />
          <ellipse cx="1280" cy="410" rx="300" ry="48" />
        </g>
      </svg>

      <svg
        className="vn-parallax__layer vn-parallax__foreground"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
      >
        {/* Tre tiền cảnh mép trái/phải — silhouette tối */}
        <g className="vn-parallax__bamboo">
          <path d="M40 900 C34 640 44 380 36 120 L52 118 C60 380 50 640 58 900 Z" />
          <path d="M96 900 C92 700 100 500 94 300 L108 298 C114 500 106 700 112 900 Z" />
          <path d="M1360 900 C1354 620 1364 340 1356 60 L1374 58 C1382 340 1372 620 1380 900 Z" />
          <path d="M1408 900 C1404 720 1412 540 1406 360 L1420 358 C1426 540 1418 720 1424 900 Z" />
          {/* Lá */}
          <path d="M52 200 Q110 170 150 190 Q104 214 52 200 Z" />
          <path d="M58 320 Q120 300 158 322 Q110 342 58 320 Z" />
          <path d="M1356 140 Q1290 112 1246 134 Q1296 158 1356 140 Z" />
          <path d="M1364 260 Q1300 240 1260 262 Q1310 282 1364 260 Z" />
        </g>
      </svg>
    </div>
  )
}
