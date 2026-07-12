/**
 * Chips lọc theo giai đoạn — wire thẳng eraFilter trong store (nền cho
 * Knowledge tuần 4). Chấm màu era trên mỗi chip kiêm luôn legend cho map.
 * Pattern selector-chips (tham khảo 21st.dev), style bằng token --c-*.
 */
import { ERAS } from '@/data/adapter'
import type { EraMeta } from '@/types/events'
import { useMuseumStore } from '@/store/useMuseumStore'
import { ERA_COLOR, ERA_SHORT_LABEL } from './eraColors'

interface EraFilterProps {
  /** Danh sách era hiện chip — mặc định đủ 4; World truyền 3 (Việt Nam có phòng riêng). */
  eras?: EraMeta[]
}

export default function EraFilter({ eras = ERAS }: EraFilterProps) {
  const eraFilter = useMuseumStore((s) => s.eraFilter)
  const setEraFilter = useMuseumStore((s) => s.setEraFilter)

  return (
    <div className="era-filter" role="group" aria-label="Lọc theo giai đoạn">
      <button
        type="button"
        className={`era-filter__chip${eraFilter === null ? ' era-filter__chip--active' : ''}`}
        aria-pressed={eraFilter === null}
        onClick={() => setEraFilter(null)}
      >
        Tất cả
      </button>
      {eras.map((era) => (
        <button
          key={era.id}
          type="button"
          className={`era-filter__chip${eraFilter === era.id ? ' era-filter__chip--active' : ''}`}
          aria-pressed={eraFilter === era.id}
          style={{ '--marker-color': ERA_COLOR[era.id] } as React.CSSProperties}
          title={`${era.label} (${era.range})`}
          onClick={() => setEraFilter(eraFilter === era.id ? null : era.id)}
        >
          <span className="era-filter__swatch" aria-hidden="true" />
          {ERA_SHORT_LABEL[era.id]}
        </button>
      ))}
    </div>
  )
}
