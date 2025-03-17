"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";

const ObservatoryMap = () => {
  const [observatories, setObservatories] = useState([]);

  const fetchTelescopes = async () => {
    const response = await axios.get("/api/telescopes");
    setObservatories(response.data);
  };

  useEffect(() => {
    fetchTelescopes();
    const interval = setInterval(fetchTelescopes, 5000); // Refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
