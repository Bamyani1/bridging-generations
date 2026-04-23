export type SuccessStory = {
  slug: string;
  subjectName: string;
  subjectRole: string;
  pullQuote: string;
  portrait: { src: string; alt: string };
  linkedStudentId?: string;
  published: boolean;
  publishedAt: string;
  featured?: boolean;
};

export const successStories: SuccessStory[] = [
  {
    slug: "priya-university-dhaka",
    subjectName: "Priya",
    subjectRole: "Alum, now a university student in Dhaka",
    pullQuote:
      "I thought school would end for me after grade five. Bridging Generations made another decade of learning possible — and now my younger sister is in that same classroom.",
    portrait: {
      src: "/success-story-priya.jpg",
      alt: "Portrait of a young woman looking thoughtfully off-camera",
    },
    published: true,
    publishedAt: "2026-01-12",
    featured: true,
  },
];

export function getFeaturedSuccessStory(): SuccessStory | undefined {
  const published = successStories.filter((s) => s.published);
  const featured = published.find((s) => s.featured);
  if (featured) return featured;
  return published.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))[0];
}
