const sectionRhythm: Array<{ token: string; px: number; role: string }> = [
  { token: "--space-section-sm", px: 64, role: "Mobile section rhythm" },
  { token: "--space-section-md", px: 96, role: "Desktop default" },
  { token: "--space-section-lg", px: 128, role: "Hero / CTA panels" },
  { token: "--space-section-xl", px: 160, role: "Signature moments (home CTA footer)" },
];

const stackSet = [16, 24, 32, 40, 56];
const inlineSet = [8, 12, 16, 24];

export function SpacingSection() {
  return (
    <section id="spacing" className="scroll-mt-8">
      <h2 className="text-heading-2">Spacing</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Section rhythm tokens plus curated stack / inline sets. Consume arbitrary via{" "}
        <code className="font-mono">var(--space-section-md)</code> or via the Tailwind 4px grid for
        stack and inline.
      </p>

      <div className="mt-8">
        <h3 className="text-heading-5">Section rhythm</h3>
        <div className="mt-4 flex flex-wrap items-end gap-6">
          {sectionRhythm.map((step) => (
            <div key={step.token} className="flex flex-col items-center">
              <div
                aria-hidden="true"
                className="w-20 border border-accent bg-accent/10"
                style={{ height: `${step.px}px` }}
              />
              <p className="mt-2 font-mono text-meta text-ink">{step.token}</p>
              <p className="text-meta text-ink-2">{step.px}px</p>
              <p className="max-w-[10rem] text-center text-meta text-ink-2">{step.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-heading-5">Container gutter</h3>
        <p className="mt-2 text-body-sm text-ink-2">
          <code className="font-mono">--space-container-x</code> ={" "}
          <code className="font-mono">clamp(16px, 6vw, 96px)</code>. Tailwind alias:{" "}
          <code className="font-mono">px-4 sm:px-6 lg:px-[6%]</code>. Max content width{" "}
          <code className="font-mono">1280px</code> (<code className="font-mono">max-w-7xl</code>).
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-heading-5">Stack (vertical)</h3>
          <p className="mt-1 text-meta text-ink-2">Pick from this set for component stacks.</p>
          <div className="mt-3 space-y-1">
            {stackSet.map((px) => (
              <div key={px} className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="bg-accent"
                  style={{ height: `${px}px`, width: "4px" }}
                />
                <p className="font-mono text-meta text-ink">{px}px</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-heading-5">Inline (horizontal)</h3>
          <p className="mt-1 text-meta text-ink-2">Pick from this set for inline gaps.</p>
          <div className="mt-3 space-y-2">
            {inlineSet.map((px) => (
              <div key={px} className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="bg-accent"
                  style={{ width: `${px}px`, height: "4px" }}
                />
                <p className="font-mono text-meta text-ink">{px}px</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
