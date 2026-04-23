const samples: Array<{ token: string; px: string; role: string }> = [
  { token: "--radius-sm", px: "4px", role: "Pills, tiny badges" },
  { token: "--radius-md", px: "8px", role: "Buttons, inputs, small images" },
  { token: "--radius-lg", px: "16px", role: "Cards, major image frames, embedded modules" },
  { token: "--radius-full", px: "9999px", role: "TagPill, avatar, status dots" },
];

export function RadiusSection() {
  return (
    <section id="radius" className="scroll-mt-8">
      <h2 className="text-heading-2">Radius</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Four tokens. No 6 / 10 / 12 / 20px radii — the scale is fixed.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {samples.map((sample) => (
          <figure
            key={sample.token}
            className="flex flex-col items-center rounded-lg border border-hairline bg-ground-2 p-6"
          >
            <div
              aria-hidden="true"
              className="h-24 w-24 bg-accent"
              style={{ borderRadius: `var(${sample.token})` }}
            />
            <figcaption className="mt-4 text-center">
              <p className="font-mono text-meta text-ink">{sample.token}</p>
              <p className="text-meta text-ink-2">{sample.px}</p>
              <p className="mt-1 text-meta text-ink-2">{sample.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
