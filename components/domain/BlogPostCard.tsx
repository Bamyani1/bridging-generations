import Image from "next/image";
import { Link } from "next-view-transitions";
import { Reveal } from "@/components/ui/Reveal";
import type { BlogPost } from "@/lib/content/blogPosts";

type BlogPostCardProps = {
  post: BlogPost;
  variant?: "default" | "featured";
  headingLevel?: 2 | 3;
  authorName?: string | null;
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return dateFmt.format(d);
}

export function BlogPostCard({
  post,
  variant = "default",
  headingLevel = 3,
  authorName,
}: BlogPostCardProps) {
  const href = `/blog/${post.slug}`;
  const isFeatured = variant === "featured";
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const byline = authorName ?? "The Bridging Generations team";
  const date = formatDate(post.publishedAt);

  if (isFeatured) {
    return (
      <article className="card-hover group grid grid-cols-1 gap-8 bg-ground-3 lg:grid-cols-[6fr_4fr] lg:gap-12">
        <Link
          href={href}
          className="block focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent lg:h-full"
        >
          <Reveal
            kind="develop"
            className="relative aspect-[3/2] w-full overflow-hidden bg-ground-3 lg:aspect-auto lg:h-full"
          >
            <Image
              src={post.coverImage.src}
              alt={post.coverImage.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.03]"
            />
          </Reveal>
        </Link>
        <div className="flex flex-col justify-center gap-4 p-8 lg:p-10">
          <p className="text-meta uppercase text-ink-2">Featured post</p>
          <Heading className="card-title text-balance text-heading-2 text-ink">
            <Link href={href} className="transition hover:text-accent-2-text">
              {post.title}
            </Link>
          </Heading>
          <p className="max-w-[48ch] text-body-lg text-ink-2">{post.excerpt}</p>
          <p className="text-meta uppercase text-ink-2">
            {byline}
            {date ? ` · ${date}` : ""}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="card-hover group flex h-full flex-col gap-4 bg-ground-2">
      <Link
        href={href}
        className="block focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
      >
        <Reveal
          kind="develop"
          className="relative aspect-[16/9] w-full overflow-hidden bg-ground-3"
        >
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
          />
        </Reveal>
      </Link>
      <div className="flex flex-col gap-3 p-6">
        <Heading className="card-title text-balance text-heading-4 text-ink">
          <Link href={href} className="transition hover:text-accent-2-text">
            {post.title}
          </Link>
        </Heading>
        <p className="text-body text-ink-2">{post.excerpt}</p>
        <p className="text-meta uppercase text-ink-2">
          {byline}
          {date ? ` · ${date}` : ""}
        </p>
      </div>
    </article>
  );
}
