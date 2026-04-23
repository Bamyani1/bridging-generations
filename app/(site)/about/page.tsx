import type { Metadata } from "next";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { StatCard } from "@/components/domain/StatCard";
import { TestimonialPanel } from "@/components/domain/TestimonialPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { getAllBoardMembers } from "@/lib/content/boardMembers";
import { getAllSchools } from "@/lib/content/schools";
import { getSiteSettings } from "@/lib/content/siteSettings";
import { getAllTestimonials } from "@/lib/content/testimonials";
import { breadcrumbList, nonprofitOrganization } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { AboutHero } from "./_components/AboutHero";
import { AboutLeadership } from "./_components/AboutLeadership";
import { AboutMissionVision } from "./_components/AboutMissionVision";
import { AboutTransparency } from "./_components/AboutTransparency";

export const metadata: Metadata = {
  title: "About",
  description:
    "Bridging Generations is a 501(c)(3) nonprofit sponsoring students across the Chittagong Hill Tracts. Meet the board and see where your donation goes.",
};

export default async function AboutPage() {
  const [siteSettings, boardMembers, schools, testimonials] = await Promise.all([
    getSiteSettings(),
    getAllBoardMembers(),
    getAllSchools(),
    getAllTestimonials(),
  ]);

  const yearsActive = Math.max(1, new Date().getUTCFullYear() - siteSettings.foundingYear);

  const partnerQuote = testimonials.find((t) => t.speakerRole === "partner");
  const socialLinks = siteSettings.socialLinks;
  const sameAs = [
    socialLinks.instagram,
    socialLinks.facebook,
    socialLinks.linkedin,
    socialLinks.youtube,
  ].filter((s): s is string => Boolean(s));

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
  ]);
  const ldOrg = nonprofitOrganization({
    siteUrl: SITE_URL,
    url: "/about",
    orgName: siteSettings.orgName,
    foundingDate: siteSettings.foundingYear,
    taxID: siteSettings.ein,
    address: siteSettings.mailingAddress,
    email: siteSettings.contactEmail,
    sameAs,
    boardMembers: boardMembers.map((m) => ({ name: m.name, jobTitle: m.role })),
  });

  return (
    <>
      <AboutHero foundingYear={siteSettings.foundingYear} />
      <section
        aria-label="Bridging Generations at a glance"
        className="bg-ground px-4 py-16 sm:px-6 lg:px-[6%] lg:py-20"
      >
        <div className="mx-auto max-w-[1280px] border-t border-hairline pt-12">
          <Reveal
            cascade
            cascadeDelay={150}
            className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-16"
          >
            <StatCard value={yearsActive} label="Years active" />
            <StatCard value={boardMembers.length} label="Board members" />
            <StatCard value={schools.length} label="Partner schools" />
          </Reveal>
        </div>
      </section>
      <AboutMissionVision
        missionFull={siteSettings.missionFull}
        visionFull={siteSettings.visionFull}
      />
      <AboutTransparency
        orgName={siteSettings.orgName}
        foundingYear={siteSettings.foundingYear}
        ein={siteSettings.ein}
        form990Url={siteSettings.form990Url ?? null}
        candidProfileUrl={siteSettings.candidProfileUrl ?? null}
        mailingAddress={siteSettings.mailingAddress}
        contactEmail={siteSettings.contactEmail}
      />
      <AboutLeadership boardMembers={boardMembers} />
      {partnerQuote ? (
        <TestimonialPanel
          testimonial={partnerQuote}
          titleId="about-partner-quote-title"
          ctaLabel="Partner with us"
          ctaHref="/contact"
        />
      ) : null}
      <CTAFooterPanel
        headline="Stand with us."
        body="Every sponsorship keeps one more student in the classroom. Help us carry this work into the next year."
        ctaLabel="Donate"
        ctaHref="/donate"
        tone="cream"
        titleId="about-cta-title"
      />
      <JsonLd id="ld-about-breadcrumb" data={ldBreadcrumb} />
      <JsonLd id="ld-about-org" data={ldOrg} />
    </>
  );
}
