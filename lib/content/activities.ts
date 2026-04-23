import "server-only";
import type { Entry } from "@keystatic/core/reader";
import type { activityCollection } from "@/keystatic/collections/activity";
import { reader } from "./reader";

export type Activity = Entry<typeof activityCollection> & { id: string };

export async function getAllActivities(): Promise<Activity[]> {
  const entries = await reader.collections.activity.all();
  return entries.map(({ slug, entry }) => ({ ...entry, id: slug }));
}

export async function getRecentActivities(limit = 2): Promise<Activity[]> {
  const all = await getAllActivities();
  return all
    .filter((a) => a.published)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
