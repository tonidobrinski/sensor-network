let observatories = [
  {
    id: 1,
    name: "Hubble Space Telescope",
    location: "Earth Orbit",
    latitude: 28.5,
    longitude: -80.6,
    status: "Active",
  },
  {
    id: 2,
    name: "Very Large Telescope",
    location: "Chile",
    latitude: -24.6,
    longitude: -70.4,
    status: "Offline",
  },
  {
    id: 3,
    name: "Keck Observatory",
    location: "Hawaii",
    latitude: 19.8,
    longitude: -155.5,
    status: "Active",
  },
];

export async function GET() {
  return Response.json(observatories);
}

export async function POST(req: Request) {
  const newObservatory = await req.json();
  newObservatory.id = observatories.length + 1; // Assign new ID
  observatories.push(newObservatory); // Add new telescope
  return Response.json(newObservatory, { status: 201 });
}
