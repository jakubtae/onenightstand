import connectDB from "@/lib/mongodb";
import materials from "@/models/materials";

export const dynamic = "force-static";

await connectDB();
export async function GET() {
  const MaterialsContent = await materials.find({});
  return Response.json({ MaterialsContent });
}
