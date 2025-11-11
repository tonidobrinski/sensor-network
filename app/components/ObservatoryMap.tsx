"use client";

import dynamic from "next/dynamic";

// Dynamically import Leaflet component (no SSR)
const MapInner = dynamic(() => import("./MapInner"), { ssr: false });

export default function ObservatoryMap() {
  return <MapInner />;
}
