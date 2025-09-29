// app/api/materials/[id]/route.js
import connectDB from "@/lib/mongodb";
import materials from "@/models/materials";
import { NextRequest } from "next/server";

export const dynamic = "force-static";

await connectDB();

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const material = await materials.findById(id);

    if (!material) {
      return Response.json({ error: "Material not found" }, { status: 404 });
    }

    return Response.json({ material });
  } catch (error) {
    return Response.json({ error: "Error fetching material" }, { status: 500 });
  }
}
