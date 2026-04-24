import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OGCard } from "@/lib/og/card";

export const runtime = "nodejs";
export const alt = "Bridging Generations — sponsoring 156 students in the Chittagong Hill Tracts";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return new ImageResponse(
    <OGCard
      title="Bridging Generations"
      subtitle="Sponsoring 156 students across 5 schools in the Chittagong Hill Tracts, Bangladesh."
    />,
    { ...OG_SIZE },
  );
}
