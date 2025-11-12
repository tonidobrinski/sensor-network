import { NextRequest } from "next/server";
import { tasksDB } from "../../db";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ must await
  const telescopeId = parseInt(id, 10);
  const tasks = tasksDB[telescopeId] || [];

  return Response.json(tasks);
}
