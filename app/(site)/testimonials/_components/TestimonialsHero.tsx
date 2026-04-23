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
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5">
          <Eyebrow>Voices</Eyebrow>
          <h1
            id="testimonials-hero-title"
            className="max-w-[18ch] text-balance text-display-2 text-ink sm:text-display-1"
          >
            Testimonials.
          </h1>
          <p className="max-w-[60ch] text-body-lg text-ink-2">
            {count} voices — parents, teachers, students, alumni, partners, and donors — on what
            this work has meant to them.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
