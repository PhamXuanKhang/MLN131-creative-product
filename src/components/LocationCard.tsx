import type { Location } from "../data/locations";
import "./LocationCard.css";

interface LocationCardProps {
  location: Location;
  onClose: () => void;
}

const LocationCard = ({ location, onClose }: LocationCardProps) => {
  return (
    <div className="location-card">
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>

      <div className="card-image">
        <img src={location.image} alt={location.name} />
        <div className="card-year-badge">
          {location.year}
          {location.endYear && ` - ${location.endYear}`}
        </div>
      </div>

      <div className="card-content">
        <h2>{location.name}</h2>
        <h3>📍 {location.country}</h3>

        <p className="description">{location.description}</p>

        <div className="events">
          <h4>📜 Các sự kiện chính:</h4>
          <ul>
            {location.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
