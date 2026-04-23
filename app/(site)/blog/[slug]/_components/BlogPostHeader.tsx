import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { BlogPost } from "@/lib/content/blogPosts";

type BlogPostHeaderProps = {
  post: BlogPost;
  authorName: string;
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function BlogPostHeader({ post, authorName }: BlogPostHeaderProps) {
  const date = post.publishedAt ? dateFmt.format(new Date(post.publishedAt)) : "";
  const primaryTag = post.tags?.[0];
  return (
    <header className="bg-ground px-4 pt-16 pb-10 sm:px-6 lg:px-[6%] lg:pt-24 lg:pb-16">
      <div className="mx-auto flex max-w-[820px] flex-col gap-6">
        {primaryTag ? <Eyebrow>{primaryTag}</Eyebrow> : null}
        <h1 className="text-balance text-display-2 text-ink">{post.title}</h1>
        <p className="text-meta uppercase text-ink-2">
          {authorName}
          {date ? ` · ${date}` : ""}
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-[1100px] lg:mt-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ground-3">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
