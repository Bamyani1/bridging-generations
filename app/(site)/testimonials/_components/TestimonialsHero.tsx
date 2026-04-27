import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type TestimonialsHeroProps = {
  count: number;
};

export function TestimonialsHero({ count }: TestimonialsHeroProps) {
  return (
    <section
      aria-labelledby="testimonials-hero-title"
      className="bg-ground px-4 pt-24 pb-12 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-16"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
          <Eyebrow>Voices</Eyebrow>
          <h1
            id="testimonials-hero-title"
            className="max-w-[18ch] text-balance text-display-2 text-ink"
          >
            Testimonials.
          </h1>
          <p className="max-w-[44ch] text-body-lg text-ink-2">
            On what this work has meant to them, in their own words.
          </p>
          <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline pt-4 text-meta uppercase tracking-[0.1em] text-ink-2">
            <li>
              {count} {count === 1 ? "voice" : "voices"}
            </li>
            <li>parents</li>
            <li>teachers</li>
            <li>students</li>
            <li>alumni</li>
            <li>partners</li>
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
