import type { Metadata } from "next";
import { BlogPostCard } from "@/components/domain/BlogPostCard";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllBlogPosts, getFeaturedBlogPost } from "@/lib/content/blogPosts";
import { getAllBoardMembers } from "@/lib/content/boardMembers";
import { breadcrumbList } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { BlogHero } from "./_components/BlogHero";
import { BlogPagination } from "./_components/BlogPagination";

const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Field updates and transparency notes from Bridging Generations — written by the board and partner-school staff.",
};

export default async function BlogPage() {
  const [posts, featured, board] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPost(),
    getAllBoardMembers(),
  ]);

  const authorName = (id?: string | null) =>
    board.find((m) => m.id === id)?.name ?? "The Bridging Generations team";

  const featuredSlug = featured?.slug;
  const rest = posts.filter((p) => p.slug !== featuredSlug);
  const pageCount = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
  const pageOne = rest.slice(0, POSTS_PER_PAGE);

  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
  ]);
  const ldBlog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: new URL("/blog", SITE_URL).toString(),
    name: "Bridging Generations — Blog",
  };

  return (
    <>
      <BlogHero count={posts.length} />
      {featured ? (
        <section
          aria-label="Featured blog post"
          className="bg-ground px-4 pb-16 sm:px-6 lg:px-[6%] lg:pb-24"
        >
          <div className="mx-auto max-w-[1280px]">
            <BlogPostCard
              post={featured}
              variant="featured"
              headingLevel={2}
              authorName={authorName(featured.author)}
            />
          </div>
        </section>
      ) : null}
      {pageOne.length > 0 ? (
        <section
          aria-label="All blog posts"
          className="bg-ground px-4 pb-20 sm:px-6 lg:px-[6%] lg:pb-28"
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pageOne.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                headingLevel={3}
                authorName={authorName(post.author)}
              />
            ))}
          </div>
        </section>
      ) : null}
      <BlogPagination currentPage={1} pageCount={pageCount} />
      <CTAFooterPanel
        headline="Get the field updates before they land in the blog."
        body="Annual transparency reports, new projects, and student milestones — delivered to our supporters every quarter. Or keep scrolling here, it all lands on this page first."
        ctaLabel="Donate now"
        ctaHref="/donate"
        tone="cream"
        titleId="blog-cta-title"
      />
      <JsonLd id="ld-blog-breadcrumb" data={ldBreadcrumb} />
      <JsonLd id="ld-blog" data={ldBlog} />
    </>
  );
}
