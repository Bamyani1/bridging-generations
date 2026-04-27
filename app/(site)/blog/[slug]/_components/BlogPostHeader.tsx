import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { BlogPost } from "@/lib/content/blogPosts";

type BlogPostHeaderProps = {
  post: BlogPost;
};

export function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const primaryTag = post.tags?.[0];
  return (
    <header className="bg-ground px-4 pt-16 pb-8 sm:px-6 lg:px-[6%] lg:pt-24 lg:pb-12">
      <div className="mx-auto flex max-w-[65ch] flex-col gap-6">
        {primaryTag ? <Eyebrow>{primaryTag}</Eyebrow> : null}
        <h1 className="text-balance text-display-2 text-ink">{post.title}</h1>
      </div>
      {/* Cover bleeds wider than the 65ch text column to --cover-bleed (90ch) —
          a single deliberate edge-bleed instead of three competing measures. */}
      <div className="mx-auto mt-10 max-w-[90ch] lg:mt-14">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-ground-3">
          <Image
            src={post.coverImage.src}
            alt={post.coverImage.alt}
            fill
            priority
            sizes="(min-width: 1024px) 90ch, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
}
