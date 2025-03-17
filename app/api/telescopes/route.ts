let telescopes = [
  {
    id: 1,
    name: "Hubble Space Telescope",
    network: "NASA",
    location: "Earth Orbit",
    latitude: 28.5,
    longitude: -80.6,
    elevation: 0,
    status: "Active",
    lastObservation: "2025-03-01",
  },
  {
    id: 2,
    name: "Very Large Telescope",
    network: "ESO",
    location: "Chile",
    latitude: -24.6,
    longitude: -70.4,
    elevation: 2635,
    status: "Offline",
    lastObservation: "2025-03-05",
  },
  {
    id: 3,
    name: "Keck Observatory",
    network: "Mauna Kea",
    location: "Hawaii",
    latitude: 19.8,
    longitude: -155.5,
    elevation: 4205,
    status: "Active",
    lastObservation: "2025-02-15",
  },
];

export async function GET() {
  const currentHour = new Date().getUTCHours(); // Get UTC time
  const isDaytime = currentHour >= 6 && currentHour <= 18; // Simulate day/night

  // Updating the status online/offline
  const updatedTelescopes = telescopes.map((telescope) => ({
    ...telescope,
    status: isDaytime ? "Offline" : "Active",
  }));
  return Response.json(updatedTelescopes);
}

export async function POST(req: Request) {
  const newTelescope = await req.json();
  newTelescope.id = telescopes.length + 1; // Assign new ID
  newTelescope.status = "Active";
  newTelescope.lastObservation = new Date().toISOString().split("T")[0];
  telescopes.push(newTelescope);
  return Response.json(newTelescope, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  telescopes = telescopes.filter((telescope) => telescope.id !== id);
  return Response.json({ success: true });
}
