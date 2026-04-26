import { Eyebrow } from "@/components/ui/Eyebrow";

type SuccessStoriesHeroProps = {
  count: number;
};

export function SuccessStoriesHero({ count }: SuccessStoriesHeroProps) {
  return (
    <section
      aria-labelledby="success-stories-hero-title"
      className="bg-ground-3 px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
        <Eyebrow>Lives changed</Eyebrow>
        {/* per type-tier ledger: narrow two-column hero → display-2 */}
        <h1
          id="success-stories-hero-title"
          className="max-w-[24ch] text-balance text-display-2 text-ink"
        >
          Success stories
        </h1>
        <p className="max-w-[60ch] text-body-lg text-ink-2">
          {count} in-depth stories from current students, alumni, and the families who walk the path
          alongside them. Portraits appear only where a story-release is on file.
        </p>
      </div>
    </section>
  );
}
