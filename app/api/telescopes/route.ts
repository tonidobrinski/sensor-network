export async function GET() {
  const currentHour = new Date().getUTCHours(); // Get UTC time
  const isDaytime = currentHour >= 6 && currentHour <= 18; // Simulate day/night

  const telescopes = [
    {
      id: 1,
      name: "Hubble Telescope",
      network: "NASA",
      location: "Earth Orbit",
      latitude: 28.5,
      longitude: -80.6,
      elevation: 0,
      lastObservation: "2025-03-01",
    },
    {
      id: 2,
      name: "Keck Observatory",
      network: "Mauna Kea",
      location: "Hawaii",
      latitude: 19.8,
      longitude: -155.5,
      elevation: 4205,
      lastObservation: "2025-02-15",
    },
    {
      id: 3,
      name: "VLT",
      network: "ESO",
      location: "Chile",
      latitude: -24.6,
      longitude: -70.4,
      elevation: 2635,
      lastObservation: "2025-03-05",
    },
  ];

  // Updating the status online/offline
  const updatedTelescopes = telescopes.map((telescope) => ({
    ...telescope,
    status: isDaytime ? "Offline" : "Active",
  }));

  return Response.json(updatedTelescopes);
}
