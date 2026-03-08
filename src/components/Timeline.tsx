import type { Location } from "../data/locations";
import "./Timeline.css";

interface TimelineProps {
  locations: Location[];
  activeId: number | null;
  onSelect: (location: Location) => void;
}

const Timeline = ({ locations, activeId, onSelect }: TimelineProps) => {
  return (
    <div className="timeline">
      <div className="timeline-track">
        {locations.map((location) => (
          <div
            key={location.id}
            className={`timeline-item ${activeId === location.id ? "active" : ""}`}
            onClick={() => onSelect(location)}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-label">
              <span className="timeline-year">{location.year}</span>
              <span className="timeline-name">{location.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
