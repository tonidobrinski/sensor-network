"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ObservatoryMap = () => {
  const [observatories, setObservatories] = useState([]);

  useEffect(() => {
    axios.get("/api/observatories").then((response) => {
      setObservatories(response.data);
    });
  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      {/* Base map layer */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Markers for the observatories */}
      {observatories.map((obs) => (
        <Marker key={obs.id} position={[obs.latitude, obs.longitude]}>
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
};

export default ObservatoryMap;
