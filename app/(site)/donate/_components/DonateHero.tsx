import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

type DonateHeroProps = {
  headline: string;
  intro: string;
  ein: string;
  orgName: string;
};

export function DonateHero({ headline, intro, ein, orgName }: DonateHeroProps) {
  return (
    <Reveal>
      <div className="flex flex-col gap-5">
        <Eyebrow>Give</Eyebrow>
        <h1 className="text-balance text-display-2 text-ink">{headline}</h1>
        <p className="max-w-[56ch] text-body-lg text-ink-2">{intro}</p>
        <dl className="mt-2 flex flex-col gap-1 text-meta uppercase tracking-[0.1em] text-ink-2">
          <div className="flex gap-2">
            <dt className="sr-only">Organization</dt>
            <dd>{orgName}</dd>
          </div>
          <div className="flex gap-2">
            <dt>501(c)(3)</dt>
            <dd className="tabular-nums">EIN {ein}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="sr-only">Processor</dt>
            <dd>Processed securely by Givebutter</dd>
          </div>
        </dl>
      </div>
    </Reveal>
  );
}
