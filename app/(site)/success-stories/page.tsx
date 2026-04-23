import type { Metadata } from "next";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { SuccessStoryCard } from "@/components/domain/SuccessStoryCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { canShowSuccessStory } from "@/lib/content/canShowPortrait";
import { getAllStudents } from "@/lib/content/students";
import { getAllSuccessStoriesPublished } from "@/lib/content/successStories";
import { breadcrumbList, collectionPage } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { SuccessStoriesHero } from "./_components/SuccessStoriesHero";

export const metadata: Metadata = {
  title: "Success Stories",
  description:
    "In-depth stories from current students, alumni, and families sponsored by Bridging Generations across the Chittagong Hill Tracts.",
};

export default async function SuccessStoriesPage() {
  const [stories, students] = await Promise.all([
    getAllSuccessStoriesPublished(),
    getAllStudents(),
  ]);
  const studentById = new Map(students.map((s) => [s.id, s]));

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Success Stories", url: "/success-stories" },
  ]);
  const ldCollection = collectionPage({
    siteUrl: SITE_URL,
    url: "/success-stories",
    name: "Success Stories",
  });

  return (
    <>
      <SuccessStoriesHero count={stories.length} />
      <section
        aria-label="All success stories"
        className="bg-ground px-4 py-20 sm:px-6 lg:px-[6%] lg:py-28"
      >
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => {
            const linkedStudent = story.linkedStudentId
              ? (studentById.get(story.linkedStudentId) ?? null)
              : null;
            const showPortrait = canShowSuccessStory({
              linkedStudentId: story.linkedStudentId,
              linkedStudent,
            });
            return (
              <SuccessStoryCard
                key={story.slug}
                story={story}
                showPortrait={showPortrait}
                headingLevel={3}
              />
            );
          })}
        </div>
      </section>
      <CTAFooterPanel
        headline="Back the next story."
        body="Sponsorship is how these stories start. $30 a month covers tuition, books, daily meals, and materials for one student — long enough to see a whole arc through."
        ctaLabel="Sponsor a Student"
        ctaHref="/donate"
        tone="teal"
        titleId="success-stories-cta-title"
      />
      <JsonLd id="ld-success-breadcrumb" data={ldBreadcrumb} />
      <JsonLd id="ld-success-collection" data={ldCollection} />
    </>
  );
}
