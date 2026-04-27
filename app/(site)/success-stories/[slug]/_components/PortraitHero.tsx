import Image from "next/image";
import { StudentPlaceholder } from "@/components/ui/StudentPlaceholder";
import type { SuccessStory } from "@/lib/content/successStories";

type PortraitHeroProps = {
  story: SuccessStory;
  showPortrait: boolean;
};

export function PortraitHero({ story, showPortrait }: PortraitHeroProps) {
  // R4.6 aspect ladder — face placed in upper-third golden zone instead of
  // letterboxed at 16:9 (where it shrank to ~12% of frame). Portrait formats
  // bring the subject to ~30–40% of the composition at every viewport.
  const imageWrapperClass = story.heroDuotone
    ? "relative mx-auto aspect-[5/6] w-full max-w-[90ch] overflow-hidden hero-duotone sm:aspect-[4/5] lg:aspect-[3/4]"
    : "relative mx-auto aspect-[5/6] w-full max-w-[90ch] overflow-hidden sm:aspect-[4/5] lg:aspect-[3/4]";

  return (
    <section aria-labelledby="success-story-title" className="relative bg-ground-3">
      <div className={imageWrapperClass}>
        {showPortrait ? (
          <Image
            src={story.portrait.src}
            alt={story.portrait.alt}
            fill
            priority
            sizes="(min-width: 1024px) 90ch, 100vw"
            className="kenburns object-cover"
            style={{ objectPosition: "center 30%" }}
          />
        ) : (
          // TODO(R4.7): replace SVG StudentPlaceholder with photographic
          // stand-in defined in the conversion + boundary pages prompt.
          <div className="absolute inset-0 flex items-center justify-center bg-ground-3">
            <div className="size-48 sm:size-64">
              <StudentPlaceholder />
            </div>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent"
        />
        {/* Caption — editorial framing. A small accent-3 (amber) rule precedes
            a "PROFILE" eyebrow, then the subject name as display copy, then
            role as meta. Reads as a magazine masthead caption, not a social
            post overlay. */}
        <div className="absolute right-0 bottom-0 left-0 px-6 pb-8 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
          <div className="mx-auto flex max-w-[90ch] flex-col items-start gap-3 text-white">
            <span aria-hidden="true" className="block h-[2px] w-12 bg-accent-3" />
            <p className="text-eyebrow tracking-[0.22em] text-accent-3 uppercase">Profile</p>
            <p className="text-balance text-heading-2 leading-tight">{story.subjectName}</p>
            {story.subjectRole ? (
              <p className="text-meta uppercase opacity-80">{story.subjectRole}</p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
