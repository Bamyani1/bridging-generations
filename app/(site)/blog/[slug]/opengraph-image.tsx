import { notFound } from "next/navigation";
import { getAllBlogPostsRaw, getBlogPostBySlug } from "@/lib/content/blogPosts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOGImage, truncate } from "@/lib/og/card";

type Params = { slug: string };

export const runtime = "nodejs";
export const alt = "Blog post — Bridging Generations";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getAllBlogPostsRaw();
  return all.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();
  return renderOGImage({
    eyebrow: "Blog",
    title: post.title,
    subtitle: truncate(post.excerpt, 140),
  });
}
