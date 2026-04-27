import type { Metadata } from "next";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { DonorCountBadge } from "@/components/domain/DonorCountBadge";
import { ThankYouWall } from "@/components/domain/ThankYouWall";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDonorsPage } from "@/lib/content/donorsPage";
import { getStatsSnapshot } from "@/lib/content/statsSnapshot";
import { breadcrumbList, collectionPage } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { DonorsExplainer } from "./_components/DonorsExplainer";
import { DonorsHero } from "./_components/DonorsHero";

export const metadata: Metadata = {
  title: "Our Donors",
  description:
    "A public thank-you to the anonymous donors whose gifts sponsor students in the Chittagong Hill Tracts.",
};

export default async function DonorsPage() {
  const [donorsPage, stats] = await Promise.all([getDonorsPage(), getStatsSnapshot()]);

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Donors", url: "/donors" },
  ]);
  const ldCollection = collectionPage({
    siteUrl: SITE_URL,
    url: "/donors",
    name: "Our Donors",
    description:
      "Anonymous thank-you wall for donors to Bridging Generations. No names, no amounts.",
  });

  return (
    <>
      <DonorsHero donorCount={stats.donorCount} subhead={donorsPage.subhead} />
      <section
        aria-labelledby="donors-count-title"
        className="bg-ground px-4 py-12 sm:px-6 lg:px-[6%] lg:py-16"
      >
        <h2 id="donors-count-title" className="sr-only">
          Total donors
        </h2>
        <div className="mx-auto max-w-[1280px]">
          <DonorCountBadge count={stats.donorCount} label={donorsPage.totalDonorsLabel} />
        </div>
      </section>
      <section
        aria-labelledby="donors-wall-title"
        className="bg-ground px-4 pb-20 sm:px-6 lg:px-[6%] lg:pb-28"
      >
        <h2 id="donors-wall-title" className="sr-only">
          Thank-you wall
        </h2>
        <div className="mx-auto max-w-[1280px]">
          <ThankYouWall messages={donorsPage.thankYouMessages} />
        </div>
      </section>
      <DonorsExplainer />
      <CTAFooterPanel
        headline="Join them."
        body="Every gift — of any size — keeps one more student in the classroom. Start a recurring sponsorship, or make a one-time contribution."
        ctaLabel="Donate"
        ctaHref="/donate"
        tone="cream"
        titleId="donors-cta-title"
      />
      <JsonLd id="ld-donors-breadcrumb" data={ldBreadcrumb} />
      <JsonLd id="ld-donors-collection" data={ldCollection} />
    </>
  );
}
