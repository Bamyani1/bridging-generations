import type { Metadata } from "next";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { ProgramCard } from "@/components/domain/ProgramCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProjectsByStatus } from "@/lib/content/projects";
import { breadcrumbList, collectionPage } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { FundedRecap } from "./_components/FundedRecap";
import { ProjectsHero } from "./_components/ProjectsHero";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The projects that fund everything a classroom needs at our partner schools — meals, books, scholarships, labs, and libraries.",
};

export default async function ProjectsPage() {
  const { active, paused, funded } = await getProjectsByStatus();
  const list = [...active, ...paused];
  const totalRaised = [...active, ...funded].reduce((sum, p) => sum + p.fundingRaised, 0);

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Projects", url: "/projects" },
  ]);
  const ldCollection = collectionPage({
    siteUrl: SITE_URL,
    url: "/projects",
    name: "Projects",
    description: "Core initiatives funded by Bridging Generations.",
  });

  return (
    <>
      <ProjectsHero activeCount={active.length} totalRaised={totalRaised} />
      <section
        aria-label="Active and paused projects"
        className="bg-ground px-4 pb-20 sm:px-6 lg:px-[6%] lg:pb-28"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-16 lg:gap-20">
          {list[0] ? <ProgramCard project={list[0]} scale="feature" /> : null}
          {list.length > 1 ? (
            <ul className="flex flex-col">
              {list.slice(1).map((project) => (
                <ProgramCard key={project.id} project={project} scale="row" as="li" />
              ))}
            </ul>
          ) : null}
        </div>
      </section>
      <FundedRecap projects={funded} />
      <CTAFooterPanel
        headline="Back a project that moves the needle."
        body="Every gift goes straight to a named line item — not overhead. Start or increase a sponsorship, or direct a gift to a specific project above."
        ctaLabel="Donate now"
        ctaHref="/donate"
        tone="cream"
        titleId="projects-cta-title"
      />
      <JsonLd id="ld-projects-breadcrumb" data={ldBreadcrumb} />
      <JsonLd id="ld-projects-collection" data={ldCollection} />
    </>
  );
}
