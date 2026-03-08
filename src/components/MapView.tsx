import { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from "react-leaflet";
import { Icon, Marker as LeafletMarker } from "leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { locations } from "../data/locations";
import type { Location } from "../data/locations";

// interface Location removed as it is imported


// Tạo custom icon màu đỏ cho marker
const redIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Icon vàng cho marker đang được chọn
const goldIcon = new Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


// Tạo đường nối giữa các điểm
const journeyPath: LatLngExpression[] = locations.map((loc) => [
  loc.coordinates.lat,
  loc.coordinates.lng,
]);

// Component con để xử lý flyTo
interface FlyToMarkerProps {
  location: Location;
  isActive: boolean;
  onSelect: (location: Location) => void;
}

const FlyToMarker = ({ location, isActive, onSelect }: FlyToMarkerProps) => {
  const map = useMap();
  const markerRef = useRef<LeafletMarker>(null);

  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isActive]);

  const handleClick = () => {
    map.flyTo([location.coordinates.lat, location.coordinates.lng], 6, {
      duration: 1.5,
    });
    onSelect(location);
  };

  return (
    <Marker
      ref={markerRef}
      position={[location.coordinates.lat, location.coordinates.lng]}
      icon={isActive ? goldIcon : redIcon}
      eventHandlers={{
        click: handleClick,
      }}
    >
      <Popup>
        <div className="popup-content">
          <h3>{location.name}</h3>
          <p className="popup-country">
            📍 {location.country} | {location.year}
            {location.endYear ? ` - ${location.endYear}` : ""}
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

// Component Timeline
interface TimelineProps {
  locations: Location[];
  activeId: number | null;
  onSelect: (location: Location) => void;
}

const Timeline = ({ locations, activeId, onSelect }: TimelineProps) => {
  return (
    <div className="timeline">
      <div className="timeline-line"></div>
      <div className="timeline-track">
        {locations.map((location, index) => (
          <div
            key={location.id}
            className={`timeline-item ${activeId === location.id ? "active" : ""}`}
            onClick={() => onSelect(location)}
          >
            <div className="timeline-dot">
              <span className="timeline-number">{index + 1}</span>
            </div>
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

// Component Card thông tin chi tiết
interface LocationCardProps {
  location: Location;
  onClose: () => void;
}

const LocationCard = ({ location, onClose }: LocationCardProps) => {
  return (
    <div className="location-card">
      <button className="card-close" onClick={onClose}>✕</button>
      
      <div className="card-image">
        <img src={location.image} alt={location.name} />
        <div className="card-badge">
          {location.year}{location.endYear ? ` - ${location.endYear}` : ""}
        </div>
      </div>
      
      <div className="card-body">
        <h2>{location.name}</h2>
        <p className="card-country">📍 {location.country}</p>
        <p className="card-desc">{location.description}</p>
        
        <div className="card-events">
          <h4>📜 Sự kiện chính</h4>
          <ul>
            {location.events.map((event, idx) => (
              <li key={idx}>{event}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// Component điều khiển bay đến vị trí từ Timeline
interface MapControllerProps {
  targetLocation: Location | null;
}

const MapController = ({ targetLocation }: MapControllerProps) => {
  const map = useMap();

  if (targetLocation) {
    map.flyTo(
      [targetLocation.coordinates.lat, targetLocation.coordinates.lng],
      6,
      { duration: 1.5 }
    );
  }

  return null;
};

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [flyTarget, setFlyTarget] = useState<Location | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [currentAutoPlayIndex, setCurrentAutoPlayIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying) {
      // Bay đến địa điểm hiện tại
      const currentLocation = locations[currentAutoPlayIndex];
      setSelectedLocation(currentLocation);
      setFlyTarget(currentLocation);
      setTimeout(() => setFlyTarget(null), 2000);

      // Đặt timer để chuyển sang địa điểm tiếp theo sau 5 giây
      autoPlayRef.current = setTimeout(() => {
        if (currentAutoPlayIndex < locations.length - 1) {
          setCurrentAutoPlayIndex((prev) => prev + 1);
        } else {
          // Kết thúc hành trình
          setIsAutoPlaying(false);
          setCurrentAutoPlayIndex(0);
        }
      }, 15000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentAutoPlayIndex]);

  const handleStartAutoPlay = () => {
    if (isAutoPlaying) {
      // Dừng auto-play
      setIsAutoPlaying(false);
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    } else {
      // Bắt đầu auto-play từ đầu
      setCurrentAutoPlayIndex(0);
      setIsAutoPlaying(true);
    }
  };

  const handleSelectFromTimeline = (location: Location) => {
    // Dừng auto-play khi người dùng click thủ công
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    }
    setSelectedLocation(location);
    setFlyTarget(location);
    setTimeout(() => setFlyTarget(null), 2000);
  };

  const handleSelectFromMarker = (location: Location) => {
    // Dừng auto-play khi người dùng click thủ công
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    }
    setSelectedLocation(location);
  };

  const handleCloseCard = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="map-container">
      {/* Bản đồ với Dark Theme */}
      <MapContainer
        center={[25, 20]}
        zoom={2}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 0 }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* Bản đồ Dark Theme - CartoDB Dark Matter */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Đường nối hành trình */}
        <Polyline
          positions={journeyPath}
          pathOptions={{
            color: "#ffd700",
            weight: 2,
            opacity: 0.7,
            dashArray: "10, 10",
          }}
        />

        {/* Controller để bay đến vị trí */}
        <MapController targetLocation={flyTarget} />

        {/* Render các marker */}
        {locations.map((location) => (
          <FlyToMarker
            key={location.id}
            location={location}
            isActive={selectedLocation?.id === location.id}
            onSelect={handleSelectFromMarker}
          />
        ))}
      </MapContainer>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>
            <span className="flag">🇻🇳</span>
            Hành trình tìm đường cứu nước
          </h1>
          <h2>Chủ tịch Hồ Chí Minh</h2>
          <p className="header-subtitle">1911 - 1941 • 30 năm bôn ba qua 4 châu lục</p>
        </div>
      </header>

      {/* Auto-play controls */}
      <div className="autoplay-container">
        <button 
          className={`autoplay-btn ${isAutoPlaying ? 'playing' : ''}`}
          onClick={handleStartAutoPlay}
        >
          <span className="icon">{isAutoPlaying ? '⏸' : '▶'}</span>
          {isAutoPlaying ? 'Tạm dừng' : 'Bắt đầu hành trình'}
        </button>
        
        {isAutoPlaying && (
          <div className="autoplay-progress">
            <span>{currentAutoPlayIndex + 1}/{locations.length}</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${((currentAutoPlayIndex + 1) / locations.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Card thông tin chi tiết */}
      {selectedLocation && (
        <LocationCard location={selectedLocation} onClose={handleCloseCard} />
      )}

      {/* Timeline ở dưới */}
      <Timeline
        locations={locations}
        activeId={selectedLocation?.id ?? null}
        onSelect={handleSelectFromTimeline}
      />

      {/* Hướng dẫn khi chưa chọn địa điểm */}
      {!selectedLocation && (
        <div className="guide-hint">
          <p>👆 Nhấp vào các điểm đánh dấu hoặc timeline để khám phá hành trình</p>
        </div>
      )}
    </div>
  );
};

export default MapView;
