type Swatch = {
  token: string;
  hex: string;
  role: string;
  textSafe: boolean;
  notes?: string;
};

const surfaces: Swatch[] = [
  {
    token: "--color-ground",
    hex: "#F5F1EA",
    role: "Default page background. Warm cream.",
    textSafe: true,
  },
  {
    token: "--color-ground-2",
    hex: "#FFFFFF",
    role: "Elevated surfaces — cards, modals, embedded media frames.",
    textSafe: true,
  },
  {
    token: "--color-ground-3",
    hex: "#EFE7D8",
    role: "Muted surface — alternating section bands, pull-quote panels.",
    textSafe: true,
  },
];

const inks: Swatch[] = [
  {
    token: "--color-ink",
    hex: "#1E1E1E",
    role: "Primary text on light surfaces.",
    textSafe: true,
    notes: "14.7:1 on ground — AAA",
  },
  {
    token: "--color-ink-2",
    hex: "#5C5C5C",
    role: "Secondary text, meta, captions.",
    textSafe: true,
    notes: "6.1:1 on ground — AA body",
  },
];

const lines: Swatch[] = [
  {
    token: "--color-hairline",
    hex: "#DDD6C7",
    role: "1px rules, subtle dividers. Never used as text.",
    textSafe: false,
  },
];

const accents: Swatch[] = [
  {
    token: "--color-accent",
    hex: "#0F4C5C",
    role: "Deep teal. Links, eyebrows, identity color.",
    textSafe: true,
    notes: "9.1:1 on ground — AAA",
  },
  {
    token: "--color-accent-2",
    hex: "#E76F51",
    role: "Coral. Primary-button fill, live dots, emphasis accents.",
    textSafe: false,
    notes: "2.1:1 on ground — fails AA for text; non-text only",
  },
  {
    token: "--color-accent-2-text",
    hex: "#B5462B",
    role: "Darkened coral for typography (errors, inline accents).",
    textSafe: true,
    notes: "4.8:1 on ground — AA body",
  },
  {
    token: "--color-accent-3",
    hex: "#FFB84D",
    role: "Amber. Active-nav on teal, highlights.",
    textSafe: false,
    notes: "1.7:1 on ground — fails AA for text; non-text only",
  },
];

function SwatchTile({ swatch }: { swatch: Swatch }) {
  return (
    <figure className="overflow-hidden rounded-md border border-hairline bg-ground-2">
      <div
        aria-hidden="true"
        className="h-24 w-full"
        style={{ backgroundColor: `var(${swatch.token})` }}
      />
      <figcaption className="space-y-1 p-4">
        <p className="font-mono text-meta uppercase text-ink-2">{swatch.token}</p>
        <p className="font-mono text-body-sm">{swatch.hex}</p>
        <p className="text-body-sm text-ink-2">{swatch.role}</p>
        <p className={`pt-1 text-meta ${swatch.textSafe ? "text-accent" : "text-accent-2-text"}`}>
          {swatch.textSafe ? "Text-safe" : "Non-text"}
          {swatch.notes ? ` · ${swatch.notes}` : ""}
        </p>
      </figcaption>
    </figure>
  );
}

function SwatchGroup({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div>
      <h3 className="mb-4 text-heading-4">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {swatches.map((swatch) => (
          <SwatchTile key={swatch.token} swatch={swatch} />
        ))}
      </div>
    </div>
  );
}

export function ColorSection() {
  return (
    <section id="color" className="scroll-mt-8">
      <h2 className="text-heading-2">Color</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Ten tokens total — three surface, two ink, one line, four accent. Contrast notes reference
        DESIGN-SYSTEM.md §1 verified pairings.
      </p>
      <div className="mt-8 space-y-10">
        <SwatchGroup title="Surface" swatches={surfaces} />
        <SwatchGroup title="Ink" swatches={inks} />
        <SwatchGroup title="Line" swatches={lines} />
        <SwatchGroup title="Accent" swatches={accents} />
      </div>
    </section>
  );
}
