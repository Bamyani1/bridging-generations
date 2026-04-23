import type { Metadata } from "next";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { StatCard } from "@/components/domain/StatCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getProjectsByStatus } from "@/lib/content/projects";
import { breadcrumbList, collectionPage } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { FundedRecap } from "./_components/FundedRecap";
import { ProjectListItem } from "./_components/ProjectListItem";
import { ProjectsHero } from "./_components/ProjectsHero";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "The projects that fund everything a classroom needs at our five partner schools — meals, books, scholarships, labs, and libraries.",
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
      <ProjectsHero activeCount={active.length} fundedCount={funded.length} />
      <section
        aria-label="Projects funding at a glance"
        className="bg-ground-3 px-4 py-16 sm:px-6 lg:px-[6%] lg:py-20"
      >
        <div className="mx-auto max-w-[1280px]">
          <Reveal
            cascade
            cascadeDelay={150}
            className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-16"
          >
            <StatCard value={totalRaised} label="Dollars raised" />
            <StatCard value={active.length} label="Active projects" />
            <StatCard value={funded.length} label="Fully funded" />
          </Reveal>
        </div>
      </section>
      <section
        aria-label="Active and paused projects"
        className="bg-ground px-4 pb-20 sm:px-6 lg:px-[6%] lg:pb-28"
      >
        <div className="mx-auto flex max-w-[1280px] flex-col gap-10 lg:gap-14">
          {list.map((project, index) => (
            <ProjectListItem
              key={project.id}
              project={project}
              variant={index === 0 ? "breakout" : "default"}
            />
          ))}
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
