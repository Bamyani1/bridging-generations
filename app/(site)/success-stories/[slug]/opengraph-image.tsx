import { notFound } from "next/navigation";
import { getAllSuccessStories, getSuccessStoryBySlug } from "@/lib/content/successStories";
import { OG_CONTENT_TYPE, OG_SIZE, renderOGImage, truncate } from "@/lib/og/card";

type Params = { slug: string };

export const runtime = "nodejs";
export const alt = "Success story — Bridging Generations";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getAllSuccessStories();
  return all.filter((s) => s.published).map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const story = await getSuccessStoryBySlug(slug);
  if (!story) notFound();
  return renderOGImage({
    eyebrow: "Success story",
    title: story.subjectName,
    subtitle: truncate(story.pullQuote, 140),
  });
}
