import { Eyebrow } from "@/components/ui/Eyebrow";

type ProjectsHeroProps = {
  activeCount: number;
  fundedCount: number;
};

export function ProjectsHero({ activeCount, fundedCount }: ProjectsHeroProps) {
  return (
    <section
      aria-labelledby="projects-hero-title"
      className="bg-ground px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
        <Eyebrow>Core initiatives</Eyebrow>
        <h1 id="projects-hero-title" className="max-w-[22ch] text-balance text-display-1 text-ink">
          Our projects
        </h1>
        <p className="max-w-[60ch] text-body-lg text-ink-2">
          Sponsorships keep children in the classroom; projects fund the things the classroom itself
          needs. {activeCount} active,
          {fundedCount > 0 ? ` ${fundedCount} fully funded,` : ""} each with a specific goal and a
          board member signed onto the outcome.
        </p>
      </div>
    </section>
  );
}
