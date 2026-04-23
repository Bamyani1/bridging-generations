type Tier = {
  name: string;
  desktopPx: number;
  mobilePx: number;
  weight: 400 | 500 | 600 | 700;
  lineHeight: number;
  tracking: string;
  usage: string;
  sample: string;
};

const tiers: Tier[] = [
  {
    name: "display-1",
    desktopPx: 88,
    mobilePx: 64,
    weight: 700,
    lineHeight: 1.05,
    tracking: "-0.02em",
    usage: "Hero H1, landing titles",
    sample: "Bridging generations",
  },
  {
    name: "display-2",
    desktopPx: 64,
    mobilePx: 48,
    weight: 700,
    lineHeight: 1.05,
    tracking: "-0.02em",
    usage: "Secondary hero, CTA panel",
    sample: "Sponsor a student",
  },
  {
    name: "heading-1",
    desktopPx: 48,
    mobilePx: 40,
    weight: 700,
    lineHeight: 1.1,
    tracking: "-0.01em",
    usage: "Teal-panel testimonial",
    sample: "Our students shape their futures",
  },
  {
    name: "heading-2",
    desktopPx: 40,
    mobilePx: 32,
    weight: 700,
    lineHeight: 1.1,
    tracking: "normal",
    usage: "Section titles",
    sample: "Our programs",
  },
  {
    name: "heading-3",
    desktopPx: 32,
    mobilePx: 28,
    weight: 700,
    lineHeight: 1.2,
    tracking: "normal",
    usage: "Sub-section titles, school names",
    sample: "Partner school names",
  },
  {
    name: "heading-4",
    desktopPx: 28,
    mobilePx: 24,
    weight: 600,
    lineHeight: 1.2,
    tracking: "normal",
    usage: "Program card titles",
    sample: "School meal program",
  },
  {
    name: "heading-5",
    desktopPx: 22,
    mobilePx: 20,
    weight: 600,
    lineHeight: 1.2,
    tracking: "normal",
    usage: "Card titles",
    sample: "Teacher training",
  },
  {
    name: "heading-6",
    desktopPx: 20,
    mobilePx: 18,
    weight: 600,
    lineHeight: 1.3,
    tracking: "normal",
    usage: "Small card titles, side panels",
    sample: "Side panel title",
  },
  {
    name: "body-lg",
    desktopPx: 20,
    mobilePx: 18,
    weight: 400,
    lineHeight: 1.6,
    tracking: "normal",
    usage: "Hero subhead, About intro",
    sample: "We sponsor 156 students across five partner schools in the Chittagong Hill Tracts.",
  },
  {
    name: "body",
    desktopPx: 17,
    mobilePx: 16,
    weight: 400,
    lineHeight: 1.7,
    tracking: "normal",
    usage: "Default body copy",
    sample:
      "Default body copy. Measures cap at about sixty-five characters, tuned for reading comfort on the warm-cream ground.",
  },
  {
    name: "body-sm",
    desktopPx: 15,
    mobilePx: 14,
    weight: 400,
    lineHeight: 1.6,
    tracking: "normal",
    usage: "Card excerpts",
    sample: "Short excerpt text used inside cards and narrow columns.",
  },
  {
    name: "meta",
    desktopPx: 13,
    mobilePx: 13,
    weight: 500,
    lineHeight: 1.4,
    tracking: "0.02em",
    usage: "Dates, captions, metadata",
    sample: "Posted 2026-04-22 · 3 min read",
  },
  {
    name: "eyebrow",
    desktopPx: 12,
    mobilePx: 12,
    weight: 500,
    lineHeight: 1,
    tracking: "0.1em",
    usage: "Uppercase eyebrow above headings",
    sample: "PROGRAMS",
  },
  {
    name: "nav-link",
    desktopPx: 13,
    mobilePx: 13,
    weight: 600,
    lineHeight: 1,
    tracking: "0.08em",
    usage: "Uppercase nav link",
    sample: "STUDENTS",
  },
];

function TypeSample({ tier, size }: { tier: Tier; size: "desktop" | "mobile" }) {
  const px = size === "desktop" ? tier.desktopPx : tier.mobilePx;
  return (
    <div>
      <p className="mb-2 text-meta uppercase text-ink-2">
        {size} · {px}px
      </p>
      <p
        style={{
          fontSize: `${px}px`,
          lineHeight: tier.lineHeight,
          letterSpacing: tier.tracking === "normal" ? undefined : tier.tracking,
          fontWeight: tier.weight,
          textWrap: "balance",
        }}
      >
        {tier.sample}
      </p>
    </div>
  );
}

function TypographyRow({ tier }: { tier: Tier }) {
  return (
    <div className="border-hairline border-t py-8 first:border-t-0 first:pt-0">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-meta text-ink">text-{tier.name}</span>
        <span className="text-meta uppercase text-ink-2">
          {tier.desktopPx}/{tier.mobilePx}px · w{tier.weight} · lh {tier.lineHeight} · tracking{" "}
          {tier.tracking}
        </span>
        <span className="text-meta text-ink-2">{tier.usage}</span>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <TypeSample tier={tier} size="desktop" />
        <TypeSample tier={tier} size="mobile" />
      </div>
    </div>
  );
}

export function TypographySection() {
  return (
    <section id="typography" className="scroll-mt-8">
      <h2 className="text-heading-2">Typography</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Plus Jakarta Sans, one family, four weights. Fourteen tiers. Samples force the pixel size
        inline so both desktop and mobile values render regardless of viewport.
      </p>
      <div className="mt-8 space-y-0">
        {tiers.map((tier) => (
          <TypographyRow key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  );
}
