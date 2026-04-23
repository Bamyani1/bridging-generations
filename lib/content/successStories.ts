import "server-only";
import type { Entry } from "@keystatic/core/reader";
import type { successStoryCollection } from "@/keystatic/collections/successStory";
import { reader } from "./reader";

export type SuccessStory = Entry<typeof successStoryCollection> & { slug: string };

export async function getAllSuccessStories(): Promise<SuccessStory[]> {
  const entries = await reader.collections.successStory.all();
  return entries.map(({ slug, entry }) => ({ ...entry, slug }));
}

export async function getFeaturedSuccessStory(): Promise<SuccessStory | undefined> {
  const all = await getAllSuccessStories();
  const published = all.filter((s) => s.published);
  return published.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))[0];
}
