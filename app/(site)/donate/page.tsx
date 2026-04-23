import type { Metadata } from "next";
import { FaqAccordion } from "@/components/domain/FaqAccordion";
import { GivebutterEmbed } from "@/components/domain/GivebutterEmbed";
import { TestimonialPanel } from "@/components/domain/TestimonialPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getDonatePage } from "@/lib/content/donatePage";
import { getAllProjects } from "@/lib/content/projects";
import { getSiteSettings } from "@/lib/content/siteSettings";
import { getAllTestimonials } from "@/lib/content/testimonials";
import { breadcrumbList } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { DonateAfterNote } from "./_components/DonateAfterNote";
import { DonateHero } from "./_components/DonateHero";
import { GivingOptionsStrip } from "./_components/GivingOptionsStrip";
import { ProjectBanner } from "./_components/ProjectBanner";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Sponsor a student in the Chittagong Hill Tracts. $30 a month covers tuition, books, daily meals, and materials for one child for the full school year.",
};

type SearchParamsShape = Promise<{ project?: string }>;

export default async function DonatePage({ searchParams }: { searchParams: SearchParamsShape }) {
  const [donatePage, siteSettings, testimonials, projects, { project: projectParam }] =
    await Promise.all([
      getDonatePage(),
      getSiteSettings(),
      getAllTestimonials(),
      getAllProjects(),
      searchParams,
    ]);

  const project = projectParam ? (projects.find((p) => p.id === projectParam) ?? null) : null;
  const supportTestimonial =
    testimonials.find((t) => t.speakerRole === "parent") ??
    testimonials.find((t) => t.speakerRole === "alum") ??
    testimonials[0];

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Donate", url: "/donate" },
  ]);

  return (
    <>
      <section
        aria-labelledby="donate-hero-title"
        className="bg-ground-3 px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div id="donate-hero-title">
            <DonateHero
              headline={donatePage.headline}
              intro={donatePage.intro}
              ein={siteSettings.ein}
              orgName={siteSettings.orgName}
            />
          </div>
          <div>
            {project ? <ProjectBanner project={project} /> : null}
            <GivebutterEmbed
              accountId={donatePage.givebutterAccountId}
              campaignId={donatePage.givebutterCampaignId}
            />
          </div>
        </div>
      </section>
      <GivingOptionsStrip monthlySuggestion={donatePage.monthlySuggestion ?? 30} />
      <section
        aria-labelledby="donate-faq-title"
        className="bg-ground px-4 py-20 sm:px-6 lg:px-[6%] lg:py-28"
      >
        <div className="mx-auto flex max-w-[900px] flex-col gap-8">
          <Reveal>
            <div className="flex flex-col gap-3">
              <Eyebrow>Answers</Eyebrow>
              <h2 id="donate-faq-title" className="text-balance text-heading-2 text-ink">
                Frequently asked questions.
              </h2>
            </div>
          </Reveal>
          <FaqAccordion items={donatePage.faq ?? []} />
        </div>
      </section>
      {supportTestimonial ? (
        <TestimonialPanel
          testimonial={supportTestimonial}
          titleId="donate-testimonial-title"
          ctaLabel="Meet the students"
          ctaHref="/students"
        />
      ) : null}
      <DonateAfterNote note={donatePage.afterDonateNote ?? ""} />
      <JsonLd id="ld-donate-breadcrumb" data={ldBreadcrumb} />
    </>
  );
}
