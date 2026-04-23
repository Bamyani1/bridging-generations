import Image from "next/image";
import { StudentPlaceholder } from "@/components/ui/StudentPlaceholder";
import type { SuccessStory } from "@/lib/content/successStories";

type PortraitHeroProps = {
  story: SuccessStory;
  showPortrait: boolean;
};

export function PortraitHero({ story, showPortrait }: PortraitHeroProps) {
  return (
    <section aria-labelledby="success-story-title" className="relative bg-ground-3">
      <div className="relative mx-auto aspect-[5/6] w-full max-w-[1100px] overflow-hidden sm:aspect-[16/10] lg:aspect-[16/9]">
        {showPortrait ? (
          <Image
            src={story.portrait.src}
            alt={story.portrait.alt}
            fill
            priority
            sizes="(min-width: 1024px) 1100px, 100vw"
            className="kenburns object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-ground-3">
            <div className="size-48 sm:size-64">
              <StudentPlaceholder />
            </div>
          </div>
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent"
        />
        <div className="absolute right-0 bottom-0 left-0 px-6 pb-8 sm:px-10 sm:pb-10 lg:px-16 lg:pb-14">
          <div className="mx-auto flex max-w-[1100px] flex-col gap-2 text-white">
            <p className="text-meta uppercase">{story.subjectName}</p>
            {story.subjectRole ? <p className="text-heading-5">{story.subjectRole}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
