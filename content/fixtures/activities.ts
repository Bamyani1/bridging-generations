export type ActivityTag =
  | "distribution"
  | "milestone"
  | "visit"
  | "announcement"
  | "event"
  | "fundraiser";

export type Activity = {
  id: string;
  title: string;
  excerpt: string;
  tag: ActivityTag;
  published: boolean;
  publishedAt: string;
  coverImage: { src: string; alt: string };
  relatedProjectId?: string;
  href?: string;
};

export const activities: Activity[] = [
  {
    id: "spring-supplies-2026",
    title: "Spring term supplies delivered to every classroom",
    excerpt:
      "Notebooks, pencils, and textbook sets reached all five partner schools ahead of the new term — covering every one of the 156 students.",
    tag: "distribution",
    published: true,
    publishedAt: "2026-03-28",
    coverImage: {
      src: "/activity-distribution.jpg",
      alt: "School children smiling and holding colourful notebooks and pens",
    },
    relatedProjectId: "school-meal-program",
  },
  {
    id: "board-visit-rangpur-2026",
    title: "Board visit: a morning in the Rangpur classroom",
    excerpt:
      "Two of our board members joined teachers and students for a working visit — sitting in on reading hour, meeting families, and walking the grounds.",
    tag: "visit",
    published: true,
    publishedAt: "2026-02-14",
    coverImage: {
      src: "/activity-visit.jpg",
      alt: "A teacher sitting with her students in an outdoor classroom",
    },
  },
];

export function getRecentActivities(limit = 2): Activity[] {
  return activities
    .filter((a) => a.published)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
