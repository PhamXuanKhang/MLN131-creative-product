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
          <div className="card-image">
            <img src={battle.image} alt={battle.name} />
          </div>
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
          <div className="card-image">
            <img src={campaign.image} alt={campaign.name} />
            <div className="card-year-badge">{campaign.year}</div>
          </div>
        )}

        <div className="card-content">
          <div className="card-type-badge campaign-badge">
            ★ Chiến dịch
          </div>
          <h2>{campaign.name}</h2>
          <p className="description">{campaign.description}</p>

          <div className="significance-box">
            <h4>🏆 Ý nghĩa lịch sử</h4>
            <p>{campaign.significance}</p>
          </div>

          <div className="battles-list">
            <h4>
              ⚔ Các trận đánh ({campaign.battles.length})
            </h4>
            <p className="battles-hint">
              Chọn các điểm trên bản đồ để xem chi tiết các trận đánh
            </p>
            <ul>
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
      </div>
    );
  }

  return null;
};

export default LocationCard;
