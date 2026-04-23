export type ProjectStatus = "active" | "funded" | "paused";

export type Project = {
  id: string;
  title: string;
  summary: string;
  fundingGoal: number;
  fundingRaised: number;
  status: ProjectStatus;
  heroImage: { src: string; alt: string };
  featured?: boolean;
  order?: number;
};

export const projects: Project[] = [
  {
    id: "school-meal-program",
    title: "School meal program",
    summary:
      "A hot meal every school day for all 156 students — so hunger never pulls a child out of the classroom.",
    fundingGoal: 12000,
    fundingRaised: 8400,
    status: "active",
    heroImage: {
      src: "/project-meal.jpg",
      alt: "Children share a midday meal around a classroom table",
    },
    featured: true,
    order: 1,
  },
  {
    id: "girls-scholarship",
    title: "Girls' scholarship fund",
    summary:
      "Full-tuition sponsorships for girls whose families would otherwise stop schooling after grade five — keeping them in education through graduation.",
    fundingGoal: 15000,
    fundingRaised: 15000,
    status: "funded",
    heroImage: {
      src: "/project-scholarship.jpg",
      alt: "A young girl writes in her notebook with books open around her",
    },
    featured: true,
    order: 2,
  },
];

export function getFeaturedProjects(limit = 2): Project[] {
  const ranked = [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const featured = ranked.filter((p) => p.featured && p.status !== "paused");
  if (featured.length >= limit) return featured.slice(0, limit);
  const active = ranked.filter((p) => p.status === "active" && !featured.includes(p));
  return [...featured, ...active].slice(0, limit);
}
