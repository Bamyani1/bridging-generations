import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type AboutHeroProps = {
  foundingYear: number;
};

export function AboutHero({ foundingYear }: AboutHeroProps) {
  return (
    <section
      aria-labelledby="about-hero-title"
      className="bg-ground-3 px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
          <Eyebrow>About us</Eyebrow>
          <h1
            id="about-hero-title"
            className="max-w-[22ch] text-balance text-display-2 text-ink sm:text-display-1"
          >
            Empowering the Hill Tracts.
          </h1>
          <p className="max-w-[60ch] text-body-lg text-ink-2">
            Since {foundingYear}, Bridging Generations has sponsored students across the Chittagong
            Hill Tracts — covering tuition, books, daily meals, and the materials that keep a child
            in school instead of pulled into early labor.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
