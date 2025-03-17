export async function GET(req, { params }) {
  console.log("params.id:", params.id);
  const telescopes = [
    {
      id: 1,
      name: "Hubble Telescope",
      network: "NASA",
      location: "Earth Orbit",
      latitude: 28.5,
      longitude: -80.6,
      elevation: 0,
      status: "Active",
      lastObservation: "2025-03-01",
      image: "/hubble.jpeg",
      description: "Hubble is a space telescope launched by NASA.",
    },
    {
      id: 2,
      name: "Keck Observatory",
      network: "Mauna Kea",
      location: "Hawaii",
      latitude: 19.8,
      longitude: -155.5,
      elevation: 4205,
      status: "Offline",
      lastObservation: "2025-02-15",
      image: "/keck.png",
      description:
        "The Keck Observatory consists of two large telescopes in Hawaii.",
    },
    {
      id: 3,
      name: "VLT",
      network: "ESO",
      location: "Chile",
      latitude: -24.6,
      longitude: -70.4,
      elevation: 2635,
      status: "Active",
      lastObservation: "2025-03-05",
      image: "/vlt.jpg",
      description:
        "The Very Large Telescope (VLT) is operated by ESO in Chile.",
    },
  ];

  const telescope = telescopes.find((t) => t.id === parseInt(params.id, 10));

  if (telescope) {
    return Response.json(telescope);
  } else {
    return new Response("Not Found", { status: 404 });
  }
}
