import { Link } from "next-view-transitions";
import { ProgramCard } from "@/components/domain/ProgramCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import type { Project } from "@/lib/content/projects";

type HomeProgramsGridProps = {
  projects: Project[];
};

export function HomeProgramsGrid({ projects }: HomeProgramsGridProps) {
  return (
    <section aria-labelledby="home-programs-title" className="bg-ground py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-[6%]">
        <header className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>How we help</Eyebrow>
            <h2 id="home-programs-title" className="text-balance text-heading-2 text-ink">
              Our programs
            </h2>
          </div>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-1 text-nav-link uppercase text-accent transition hover:text-accent-2-text"
          >
            See all programs
            <span
              aria-hidden="true"
              className="transition-transform motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 150}>
              <ProgramCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
