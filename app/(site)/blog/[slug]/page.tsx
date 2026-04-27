import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRenderer } from "@/components/content/MDXRenderer";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { Row } from "@/components/ui/editorial";
import { Reveal } from "@/components/ui/Reveal";
import { getAllBlogPostsRaw, getBlogPostBySlug, getRecentBlogPosts } from "@/lib/content/blogPosts";
import { getAllBoardMembers, getBoardMemberById } from "@/lib/content/boardMembers";
import { articleLd, breadcrumbList } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { AuthorByline } from "./_components/AuthorByline";
import { BackToBlog } from "./_components/BackToBlog";
import { BlogPostHeader } from "./_components/BlogPostHeader";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const all = await getAllBlogPostsRaw();
  return all.filter((p) => p.published).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      images: post.ogImageOverride?.src ? [post.ogImageOverride.src] : [post.coverImage.src],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const [author, related] = await Promise.all([
    getBoardMemberById(post.author),
    getRecentBlogPosts({ exclude: slug, limit: 3 }),
  ]);
  const authorName = author?.name ?? "The Bridging Generations team";
  const board = await getAllBoardMembers();
  const boardName = (id?: string | null) =>
    board.find((m) => m.id === id)?.name ?? "The Bridging Generations team";

  const body = await post.body();

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);
  const ldArticle = articleLd({
    siteUrl: SITE_URL,
    url: `/blog/${post.slug}`,
    headline: post.title,
    datePublished: post.publishedAt ?? undefined,
    authorName,
    imageUrl: post.coverImage.src,
    publisherName: "Bridging Generations",
  });

  return (
    <>
      <BackToBlog />
      <BlogPostHeader post={post} authorName={authorName} />
      <article className="bg-ground px-4 py-12 sm:px-6 lg:px-[6%] lg:py-20">
        <div className="mx-auto max-w-[65ch] text-ink-2">
          <MDXRenderer source={body} />
        </div>
      </article>
      <AuthorByline author={author} />
      {related.length > 0 ? (
        <section
          aria-labelledby="blog-related-title"
          className="bg-ground px-4 py-20 sm:px-6 lg:px-[6%] lg:py-28"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
            <h2 id="blog-related-title" className="text-balance text-heading-3 text-ink">
              Keep reading
            </h2>
            <ul className="flex flex-col">
              {related.map((p) => (
                <Row as="li" key={p.slug}>
                  <Reveal kind="develop">
                    <Row.Image src={p.coverImage.src} alt={p.coverImage.alt} aspect="3/2" />
                  </Reveal>
                  <Row.Body>
                    <Row.Eyebrow>
                      {p.publishedAt
                        ? new Intl.DateTimeFormat("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          }).format(new Date(p.publishedAt))
                        : ""}
                      {p.publishedAt ? <span aria-hidden="true"> · </span> : null}
                      <span>{boardName(p.author)}</span>
                    </Row.Eyebrow>
                    <Row.Headline href={`/blog/${p.slug}`}>{p.title}</Row.Headline>
                    <Row.Lede>{p.excerpt}</Row.Lede>
                  </Row.Body>
                </Row>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <CTAFooterPanel
        headline="Support the students you just read about."
        body="Sponsorship is the simplest way in. $30 a month covers tuition, books, daily meals, and materials for one student."
        ctaLabel="Sponsor a Student"
        ctaHref="/donate"
        tone="teal"
        titleId="blog-post-cta-title"
      />
      <JsonLd id={`ld-blog-${slug}-breadcrumb`} data={ldBreadcrumb} />
      <JsonLd id={`ld-blog-${slug}-article`} data={ldArticle} />
    </>
  );
}
