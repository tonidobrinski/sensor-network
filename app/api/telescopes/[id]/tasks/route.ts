export async function GET(req, { params }) {
  const tasks = {
    1: [{ id: 101, name: "Galaxy Survey", date: "2025-04-01" }],
    2: [{ id: 102, name: "Exoplanet Study", date: "2025-04-10" }],
    3: [{ id: 103, name: "Supernova Observation", date: "2025-03-25" }],
  };

  return Response.json(tasks[params.id] || []);
}
