import { useState, useRef, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { DivIcon } from "leaflet";
import type { Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import { campaigns } from "../data/locations";
import type { Campaign, Battle } from "../data/locations";
import Timeline from "./Timeline";
import LocationCard from "./LocationCard";

// === CUSTOM ICONS ===

function createCampaignIcon(isActive: boolean, isDimmed: boolean) {
  const bg = isDimmed
    ? "rgba(100,100,100,0.5)"
    : isActive
      ? "#ffd700"
      : "linear-gradient(135deg, #da251d 0%, #ff4444 100%)";
  const border = isDimmed
    ? "rgba(150,150,150,0.4)"
    : isActive
      ? "#fff"
      : "rgba(255, 215, 0, 0.7)";
  const starColor = isDimmed ? "#666" : isActive ? "#da251d" : "#ffd700";
  const shadow = isDimmed
    ? "none"
    : isActive
      ? "0 0 25px rgba(255, 215, 0, 0.8)"
      : "0 0 15px rgba(218, 37, 29, 0.5)";
  const size = isActive ? 48 : 40;

  return new DivIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${bg};
      border:3px solid ${border};
      border-radius:50%;
      display:flex;align-items:center;justify-content:center;
      box-shadow:${shadow};
      transition:all 0.3s ease;
      cursor:pointer;
    "><span style="color:${starColor};font-size:${isActive ? 24 : 20}px;line-height:1;">★</span></div>`,
    className: "campaign-marker-icon",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function createBattleIcon() {
  return new DivIcon({
    html: `<div style="
      width:22px;height:22px;
      background:radial-gradient(circle, #ff4444 0%, #da251d 100%);
      border:2px solid #fff;
      border-radius:50%;
      box-shadow:0 0 12px rgba(255, 68, 68, 0.7);
      cursor:pointer;
      transition:all 0.3s ease;
      display:flex;align-items:center;justify-content:center;
    "><span style="color:#fff;font-size:11px;font-weight:bold;">⚔</span></div>`,
    className: "battle-marker-icon",
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
  });
}

// === SUB-COMPONENTS ===

interface CampaignMarkerProps {
  campaign: Campaign;
  isActive: boolean;
  isDimmed: boolean;
  onClick: (campaign: Campaign) => void;
}

const CampaignMarker = ({
  campaign,
  isActive,
  isDimmed,
  onClick,
}: CampaignMarkerProps) => {
  const map = useMap();
  const markerRef = useRef<LeafletMarker>(null);
  const icon = useMemo(
    () => createCampaignIcon(isActive, isDimmed),
    [isActive, isDimmed]
  );

  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isActive]);

  const handleClick = () => {
    map.flyTo(
      [campaign.coordinates.lat, campaign.coordinates.lng],
      campaign.id === 2 || campaign.id === 3 ? 7 : 9,
      { duration: 1.5 }
    );
    onClick(campaign);
  };

  return (
    <Marker
      ref={markerRef}
      position={[campaign.coordinates.lat, campaign.coordinates.lng]}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    >
      <Popup>
        <div className="popup-content">
          <h3>★ {campaign.name}</h3>
          <p className="popup-year">
            {campaign.year} | {campaign.battles.length} trận đánh
          </p>
        </div>
      </Popup>
    </Marker>
  );
};

interface BattleMarkerProps {
  battle: Battle;
  isActive: boolean;
  onClick: (battle: Battle) => void;
}

const BattleMarker = ({ battle, isActive, onClick }: BattleMarkerProps) => {
  const map = useMap();
  const markerRef = useRef<LeafletMarker>(null);
  const icon = useMemo(() => createBattleIcon(), []);

  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isActive]);

  const handleClick = () => {
    map.flyTo([battle.coordinates.lat, battle.coordinates.lng], 11, {
      duration: 1,
    });
    onClick(battle);
  };

  return (
    <Marker
      ref={markerRef}
      position={[battle.coordinates.lat, battle.coordinates.lng]}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    >
      <Popup>
        <div className="popup-content">
          <h3>⚔ {battle.name}</h3>
          {battle.date && <p className="popup-year">{battle.date}</p>}
        </div>
      </Popup>
    </Marker>
  );
};

interface MapControllerProps {
  target: { lat: number; lng: number; zoom: number } | null;
}

const MapController = ({ target }: MapControllerProps) => {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], target.zoom, { duration: 1.5 });
    }
  }, [target, map]);
  return null;
};

// === MAIN COMPONENT ===

const MapView = () => {
  const [activeCampaignId, setActiveCampaignId] = useState<number | null>(
    null
  );
  const [selectedBattleId, setSelectedBattleId] = useState<string | null>(null);
  const [flyTarget, setFlyTarget] = useState<{
    lat: number;
    lng: number;
    zoom: number;
  } | null>(null);

  const activeCampaign = useMemo(
    () => campaigns.find((c) => c.id === activeCampaignId) ?? null,
    [activeCampaignId]
  );

  const selectedBattle = useMemo(() => {
    if (!activeCampaign || !selectedBattleId) return null;
    return (
      activeCampaign.battles.find((b) => b.id === selectedBattleId) ?? null
    );
  }, [activeCampaign, selectedBattleId]);

  const handleSelectCampaign = (campaign: Campaign) => {
    setActiveCampaignId(campaign.id);
    setSelectedBattleId(null);
    setFlyTarget({
      lat: campaign.coordinates.lat,
      lng: campaign.coordinates.lng,
      zoom: campaign.id === 2 || campaign.id === 3 ? 7 : 9,
    });
    setTimeout(() => setFlyTarget(null), 2000);
  };

  const handleSelectBattle = (battle: Battle) => {
    setSelectedBattleId(battle.id);
    setFlyTarget({
      lat: battle.coordinates.lat,
      lng: battle.coordinates.lng,
      zoom: 11,
    });
    setTimeout(() => setFlyTarget(null), 2000);
  };

  const handleBackToOverview = () => {
    setActiveCampaignId(null);
    setSelectedBattleId(null);
    setFlyTarget({ lat: 14.5, lng: 107.0, zoom: 6 });
    setTimeout(() => setFlyTarget(null), 2000);
  };

  const handleCloseCard = () => {
    if (selectedBattleId) {
      setSelectedBattleId(null);
    } else {
      setActiveCampaignId(null);
    }
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[14.5, 107.0]}
        zoom={6}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <MapController target={flyTarget} />

        {/* Campaign Markers (Ghim Mẹ) */}
        {campaigns.map((campaign) => {
          if (activeCampaignId === null) {
            return (
              <CampaignMarker
                key={campaign.id}
                campaign={campaign}
                isActive={false}
                isDimmed={false}
                onClick={handleSelectCampaign}
              />
            );
          }
          if (campaign.id === activeCampaignId) {
            return (
              <CampaignMarker
                key={campaign.id}
                campaign={campaign}
                isActive={true}
                isDimmed={false}
                onClick={handleSelectCampaign}
              />
            );
          }
          return null;
        })}

        {/* Battle Markers (Ghim Con) */}
        {activeCampaign &&
          activeCampaign.battles.map((battle) => (
            <BattleMarker
              key={battle.id}
              battle={battle}
              isActive={selectedBattleId === battle.id}
              onClick={handleSelectBattle}
            />
          ))}
      </MapContainer>

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>
            <span className="flag">🇻🇳</span>
            Các chiến dịch lớn trong Kháng chiến chống Mỹ
          </h1>
          <p className="header-subtitle">
            1960 - 1975 • Bản đồ tương tác các chiến dịch quân sự
          </p>
        </div>
      </header>

      {/* Info Panel */}
      {(activeCampaign || selectedBattle) && (
        <LocationCard
          campaign={activeCampaign}
          battle={selectedBattle}
          onClose={handleCloseCard}
          onBack={handleBackToOverview}
          onSelectBattle={handleSelectBattle}
        />
      )}

      {/* Timeline */}
      <Timeline
        campaigns={campaigns}
        activeCampaignId={activeCampaignId}
        onSelectCampaign={handleSelectCampaign}
      />

      {/* Guide Hint */}
      {!activeCampaign && (
        <div className="guide-hint">
          <p>
            👆 Nhấp vào các <strong>ngôi sao ★</strong> trên bản đồ hoặc{" "}
            <strong>timeline</strong> để khám phá các chiến dịch
          </p>
        </div>
      )}
    </div>
  );
};

export default MapView;
