/**
 * Nền phòng Việt Nam — nền đen (--c-bg) + 2 khóm tre ảnh thật treo rủ hai mép
 * cửa sổ, opacity thấp. Fixed sau content, pointer-events: none để card luôn
 * click được. Ảnh public/images/decor/bamboo-cluster.webp (nguồn + cách xuất:
 * scripts/decor/prepare-bamboo.mjs); bên phải mirror bằng CSS. Sway nhẹ chỉ
 * khi prefers-reduced-motion cho phép; tween trôi dọc gắn ở VietnamRenderer.
 */
import './ParallaxBackground.css'

const CLUSTER_SRC = '/images/decor/bamboo-cluster.webp'

export default function ParallaxBackground() {
  return (
    <div className="vn-parallax" aria-hidden="true">
      <div className="vn-parallax__bamboo vn-parallax__bamboo--left">
        <img src={CLUSTER_SRC} alt="" decoding="async" />
      </div>
      <div className="vn-parallax__bamboo vn-parallax__bamboo--right">
        <img src={CLUSTER_SRC} alt="" decoding="async" />
      </div>
    </div>
  )
}
