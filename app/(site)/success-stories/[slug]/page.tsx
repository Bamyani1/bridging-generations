import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/content/MDXRenderer";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Row } from "@/components/ui/editorial";
import { Reveal } from "@/components/ui/Reveal";
import { StudentPlaceholder } from "@/components/ui/StudentPlaceholder";
import { canShowSuccessStory } from "@/lib/content/canShowPortrait";
import { getAllStudents } from "@/lib/content/students";
import {
  getAllSuccessStories,
  getRelatedSuccessStories,
  getSuccessStoryBySlug,
} from "@/lib/content/successStories";
import { articleLd, breadcrumbList } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { BackToStories } from "./_components/BackToStories";
import { PortraitHero } from "./_components/PortraitHero";
import { PullQuotePanel } from "./_components/PullQuotePanel";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getAllSuccessStories();
  return all.filter((s) => s.published).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const story = await getSuccessStoryBySlug(slug);
  if (!story) return { title: "Not found" };
  const title = story.metaTitle || `${story.subjectName} — Success story`;
  const description = story.metaDescription || story.pullQuote;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: story.ogImageOverride?.src ? [story.ogImageOverride.src] : [story.portrait.src],
    },
  };
}

export default async function SuccessStorySlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const story = await getSuccessStoryBySlug(slug);
  if (!story) notFound();

  const [students, related] = await Promise.all([
    getAllStudents(),
    getRelatedSuccessStories({ exclude: slug, limit: 2 }),
  ]);
  const studentById = new Map(students.map((s) => [s.id, s]));
  const linkedStudent = story.linkedStudentId
    ? (studentById.get(story.linkedStudentId) ?? null)
    : null;
  const showPortrait = canShowSuccessStory({
    linkedStudentId: story.linkedStudentId,
    linkedStudent,
  });

  const body = await story.body();

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Success Stories", url: "/success-stories" },
    { name: story.subjectName, url: `/success-stories/${story.slug}` },
  ]);
  const ldArticle = articleLd({
    siteUrl: SITE_URL,
    url: `/success-stories/${story.slug}`,
    headline: `${story.subjectName} — Success story`,
    datePublished: story.publishedAt ?? undefined,
    imageUrl: story.portrait.src,
    publisherName: "Bridging Generations",
  });

  return (
    <div className="atmospheric-page">
      <BackToStories />
      <h1 id="success-story-title" className="sr-only">
        {story.subjectName} — Success story
      </h1>
      <PortraitHero story={story} showPortrait={showPortrait} />
      <PullQuotePanel story={story} />
      <article className="bg-ground px-4 py-12 sm:px-6 lg:px-[6%] lg:py-20">
        <div className="mx-auto max-w-[65ch] text-ink-2">
          <MDXRenderer source={body} />
        </div>
      </article>
      {related.length > 0 ? (
        <section
          aria-labelledby="success-story-related-title"
          className="bg-ground px-4 py-20 sm:px-6 lg:px-[6%] lg:py-28"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
            <h2 id="success-story-related-title" className="text-balance text-heading-3 text-ink">
              Other stories
            </h2>
            <ul className="flex flex-col">
              {related.map((s) => {
                const ls = s.linkedStudentId ? (studentById.get(s.linkedStudentId) ?? null) : null;
                const showPortrait = canShowSuccessStory({
                  linkedStudentId: s.linkedStudentId,
                  linkedStudent: ls,
                });
                return (
                  <Row as="li" key={s.slug}>
                    {showPortrait ? (
                      <Reveal kind="develop">
                        <Row.Image src={s.portrait.src} alt={s.portrait.alt} aspect="1/1" />
                      </Reveal>
                    ) : (
                      <div className="relative aspect-[1/1] w-full overflow-hidden bg-ground-3">
                        <StudentPlaceholder />
                      </div>
                    )}
                    <Row.Body>
                      {s.subjectRole ? <Row.Eyebrow>{s.subjectRole}</Row.Eyebrow> : null}
                      <Row.Headline href={`/success-stories/${s.slug}`}>{s.pullQuote}</Row.Headline>
                      <Row.Stamp>{s.subjectName}</Row.Stamp>
                    </Row.Body>
                  </Row>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}
      <CTAFooterPanel
        headline={`Help us write more stories like ${story.subjectName}'s.`}
        body="Sponsorship keeps a child in the classroom long enough for a whole arc to unfold. $30 a month covers tuition, books, daily meals, and materials."
        ctaLabel="Donate now"
        ctaHref="/donate"
        tone="cream"
        titleId="success-story-cta-title"
      />
      <JsonLd id={`ld-story-${slug}-breadcrumb`} data={ldBreadcrumb} />
      <JsonLd id={`ld-story-${slug}-article`} data={ldArticle} />
    </div>
  );
}
