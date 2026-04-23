import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type GalleryHeroProps = {
  count: number;
};

export function GalleryHero({ count }: GalleryHeroProps) {
  return (
    <section
      aria-labelledby="gallery-hero-title"
      className="bg-ground px-4 pt-24 pb-12 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-16"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5">
          <Eyebrow>Visual archive</Eyebrow>
          <h1 id="gallery-hero-title" className="max-w-[18ch] text-balance text-display-1 text-ink">
            Gallery.
          </h1>
          <p className="text-body-sm text-ink-2">
            {count} photographs from partner schools, program visits, and the students we sponsor.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
