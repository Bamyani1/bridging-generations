import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type DonorsHeroProps = {
  headline: string;
  subhead: string;
};

export function DonorsHero({ headline, subhead }: DonorsHeroProps) {
  return (
    <section
      aria-labelledby="donors-hero-title"
      className="bg-ground px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
          <Eyebrow>Gratitude</Eyebrow>
          {/* per type-tier ledger: narrow two-column hero → display-2 */}
          <h1 id="donors-hero-title" className="max-w-[22ch] text-balance text-display-2 text-ink">
            {headline}
          </h1>
          <p className="max-w-[60ch] text-body-lg text-ink-2">{subhead}</p>
        </div>
      </Reveal>
    </section>
  );
}
