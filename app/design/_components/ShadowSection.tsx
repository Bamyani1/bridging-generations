const samples: Array<{ token: string; role: string }> = [
  { token: "--shadow-card", role: "Resting card" },
  { token: "--shadow-card-hover", role: "Hovered card, elevated modal" },
  { token: "--shadow-cta", role: "Primary-button coral glow" },
];

export function ShadowSection() {
  return (
    <section id="shadow" className="scroll-mt-8">
      <h2 className="text-heading-2">Elevation</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Three flat shadows. No inner shadows, no multi-layer stacks.
      </p>
      <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {samples.map((sample) => (
          <figure
            key={sample.token}
            className="rounded-lg bg-ground-2 p-6"
            style={{ boxShadow: `var(${sample.token})` }}
          >
            <figcaption>
              <p className="font-mono text-meta text-ink">{sample.token}</p>
              <p className="mt-1 text-body-sm text-ink-2">{sample.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
