import Image from "next/image";
import { Link } from "next-view-transitions";
import { StudentPlaceholder } from "@/components/ui/StudentPlaceholder";
import type { SuccessStory } from "@/lib/content/successStories";

type SuccessStoryCardProps = {
  story: SuccessStory;
  showPortrait: boolean;
  headingLevel?: 2 | 3;
};

export function SuccessStoryCard({ story, showPortrait, headingLevel = 3 }: SuccessStoryCardProps) {
  const href = `/success-stories/${story.slug}`;
  const Heading = `h${headingLevel}` as "h2" | "h3";

  return (
    <article className="card-hover group flex h-full flex-col gap-5 bg-ground-2">
      <Link
        href={href}
        className="block focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-ground-3">
          {showPortrait ? (
            <Image
              src={story.portrait.src}
              alt={story.portrait.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
            />
          ) : (
            <StudentPlaceholder />
          )}
        </div>
      </Link>
      <div className="flex flex-col gap-3 p-6">
        <p className="text-meta uppercase text-ink-2">
          {story.subjectName}
          {story.subjectRole ? ` · ${story.subjectRole}` : ""}
        </p>
        <Heading className="card-title text-balance text-heading-5 text-ink">
          <Link href={href} className="transition hover:text-accent-2-text">
            &ldquo;{story.pullQuote}&rdquo;
          </Link>
        </Heading>
        <Link
          href={href}
          className="group/link inline-flex items-center gap-1 text-nav-link uppercase text-accent transition hover:text-accent-2-text"
        >
          Read story
          <span
            aria-hidden="true"
            className="transition-transform motion-safe:group-hover/link:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
