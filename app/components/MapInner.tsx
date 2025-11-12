"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/components/ObservatoryMap.scss";
import { TTelescopeDetails } from "../types/components/telescopeDetails";

export default function MapInner() {
  const [observatories, setObservatories] = useState<TTelescopeDetails[]>([]);

  useEffect(() => {
    const fetchTelescopes = async () => {
      const response = await axios.get("/api/telescopes");
      setObservatories(response.data);
    };

    fetchTelescopes();
    const interval = setInterval(fetchTelescopes, 5000);
    return () => clearInterval(interval);
  }, []);

  const customIcon = new L.Icon({
    iconUrl: "/pin.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer center={[20, 0]} zoom={2} className="map_container">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {observatories.map((obs) => (
        <Marker
          key={obs.id}
          position={[obs.latitude, obs.longitude]}
          icon={customIcon}
        >
          <Popup>
            <strong>{obs.name}</strong>
            <br />
            Location: {obs.location}
            <br />
            Status: {obs.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
