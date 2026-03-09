import type { Campaign } from "../data/locations";
import "./Timeline.css";

interface TimelineProps {
  campaigns: Campaign[];
  activeCampaignId: number | null;
  onSelectCampaign: (campaign: Campaign) => void;
}

const Timeline = ({
  campaigns,
  activeCampaignId,
  onSelectCampaign,
}: TimelineProps) => {
  return (
    <div className="timeline">
      <div className="timeline-line"></div>
      <div className="timeline-track">
        {campaigns.map((campaign, index) => (
          <div
            key={campaign.id}
            className={`timeline-item ${activeCampaignId === campaign.id ? "active" : ""}`}
            onClick={() => onSelectCampaign(campaign)}
          >
            <div className="timeline-dot">
              <span className="timeline-number">{index + 1}</span>
            </div>
            <div className="timeline-label">
              <span className="timeline-year">{campaign.year}</span>
              <span className="timeline-name">{campaign.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
