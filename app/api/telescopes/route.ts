import { NextRequest } from "next/server";
import { telescopes, tasksDB } from "./db";

export async function GET() {
  const currentHour = new Date().getUTCHours();
  const isDaytime = currentHour >= 6 && currentHour <= 18;

  const updatedTelescopes = telescopes.map((telescope) => ({
    ...telescope,
    status: isDaytime ? "Offline" : "Active",
  }));

  return Response.json(updatedTelescopes);
}

export async function POST(req: NextRequest) {
  const newTelescope = await req.json();

  newTelescope.id = Number(telescopes.length + 1);
  newTelescope.status = "Active";
  newTelescope.lastObservation = new Date().toISOString().split("T")[0];
  newTelescope.image = "/default-telescope.jpeg";
  newTelescope.description =
    "This telescope was recently added. More details coming soon.";

  telescopes.push(newTelescope);

  // Create a starter task for the new telescope
  tasksDB[newTelescope.id] = [
    {
      id: Date.now(),
      name: "Initial Calibration",
      date: new Date().toISOString().split("T")[0],
    },
  ];

  return Response.json(newTelescope, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const telescopeId = parseInt(id, 10);

  const index = telescopes.findIndex((t) => t.id === telescopeId);
  if (index !== -1) {
    telescopes.splice(index, 1);
    delete tasksDB[telescopeId];
  }

  return Response.json({ success: true });
}
