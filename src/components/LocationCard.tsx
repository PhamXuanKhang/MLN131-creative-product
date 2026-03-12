import { useState } from "react";
import type { Campaign, Battle } from "../data/locations";
import "./LocationCard.css";

interface LocationCardProps {
  campaign: Campaign | null;
  battle: Battle | null;
  onClose: () => void;
  onBack: () => void;
  onSelectBattle: (battle: Battle) => void;
}

const LocationCard = ({
  campaign,
  battle,
  onClose,
  onBack,
  onSelectBattle,
}: LocationCardProps) => {
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  // Show battle detail
  if (battle) {
    return (
      <div className="location-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="card-header-bar">
          <button className="back-btn" onClick={() => onClose()}>
            🔙 Quay lại Chiến dịch
          </button>
        </div>

        {battle.image && (
          <div className="card-image" onClick={() => setLightboxImage({ src: battle.image, alt: battle.name })}>
            <img src={battle.image} alt={battle.name} />
            <div className="image-zoom-hint">🔍</div>
          </div>
        )}

        {lightboxImage && (
          <ImageLightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
        )}

        <div className="card-content">
          <div className="card-type-badge battle-badge">⚔ Trận đánh</div>
          <h2>{battle.name}</h2>
          {battle.date && (
            <h3 className="card-date">📅 {battle.date}</h3>
          )}
          <p className="description">{battle.description}</p>
        </div>
      </div>
    );
  }

  // Show campaign overview
  if (campaign) {
    return (
      <div className="location-card">
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="card-header-bar">
          <button className="back-btn" onClick={onBack}>
            🔙 Quay lại Tổng quan
          </button>
        </div>

        {campaign.image && (
          <div className="card-image" onClick={() => setLightboxImage({ src: campaign.image, alt: campaign.name })}>
            <img src={campaign.image} alt={campaign.name} />
            <div className="card-year-badge">{campaign.year}</div>
            <div className="image-zoom-hint">🔍</div>
          </div>
        )}

        {lightboxImage && (
          <ImageLightbox src={lightboxImage.src} alt={lightboxImage.alt} onClose={() => setLightboxImage(null)} />
        )}

        <div className="card-content">
          <div className="card-type-badge campaign-badge">
            ★ Chiến dịch
          </div>
          <h2>{campaign.name}</h2>
          <p className="description">{campaign.description}</p>

          {/* Đường lối của Đảng - collapsible */}
          <div className={`collapsible-section guideline-section ${expandedSections["guideline"] ? "expanded" : ""}`}>
            <button className="collapsible-header" onClick={() => toggleSection("guideline")}>
              <h4>☆ Đường lối của Đảng</h4>
              <span className="collapsible-arrow">{expandedSections["guideline"] ? "▲" : "▼"}</span>
            </button>
            <div className="collapsible-body">
              <p>{campaign.partyGuideline}</p>
            </div>
          </div>

          {/* Các trận đánh - collapsible */}
          <div className={`collapsible-section battles-section ${expandedSections["battles"] ? "expanded" : ""}`}>
            <button className="collapsible-header" onClick={() => toggleSection("battles")}>
              <h4>⚔ Các trận đánh ({campaign.battles.length})</h4>
              <span className="collapsible-arrow">{expandedSections["battles"] ? "▲" : "▼"}</span>
            </button>
            <div className="collapsible-body">
              <p className="battles-hint">
                Chọn các điểm trên bản đồ để xem chi tiết các trận đánh
              </p>
              <ul className="battles-list-items">
                {campaign.battles.map((b) => (
                  <li key={b.id} onClick={() => onSelectBattle(b)}>
                    <span className="battle-icon">⚔</span>
                    <div>
                      <strong>{b.name}</strong>
                      {b.date && (
                        <span className="battle-date">{b.date}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Ý nghĩa lịch sử - collapsible */}
          <div className={`collapsible-section significance-section ${expandedSections["significance"] ? "expanded" : ""}`}>
            <button className="collapsible-header" onClick={() => toggleSection("significance")}>
              <h4>🏆 Ý nghĩa lịch sử</h4>
              <span className="collapsible-arrow">{expandedSections["significance"] ? "▲" : "▼"}</span>
            </button>
            <div className="collapsible-body">
              <p>{campaign.significance}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LocationCard;

// Lightbox sub-component
function ImageLightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <img src={src} alt={alt} className="lightbox-img" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
