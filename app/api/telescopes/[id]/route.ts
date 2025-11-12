import { NextRequest } from "next/server";
import { telescopes } from "../db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const telescopeId = Number(id);

  console.log("Fetching telescope with ID:", telescopeId);
  console.log("Available telescopes:", telescopes.map((t) => t.id));

  const telescope = telescopes.find((t) => t.id === telescopeId);

  if (!telescope) {
    return new Response("Telescope not found", { status: 404 });
  }

  return Response.json(telescope);
}
