import { Button } from "@/components/ui/Button";

const variants: Array<{ variant: "primary" | "secondary" | "tertiary"; label: string }> = [
  { variant: "primary", label: "Donate now" },
  { variant: "secondary", label: "Learn more" },
  { variant: "tertiary", label: "See all programs" },
];

export function ButtonSection() {
  return (
    <section id="buttons" className="scroll-mt-8">
      <h2 className="text-heading-2">Buttons</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Three variants. Hover on primary triggers a 1.02× scale and the darker coral{" "}
        <code className="font-mono">--color-accent-2-hover</code>; reduced-motion drops the scale.
        Focus uses the global accent ring per DESIGN-SYSTEM.md §10.
      </p>
      <div className="mt-6 space-y-8">
        {variants.map(({ variant, label }) => (
          <div key={variant}>
            <h3 className="text-heading-5 capitalize">{variant}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-4">
              <Button variant={variant}>{label}</Button>
              <Button variant={variant} disabled>
                {label}
              </Button>
              <Button variant={variant} loading>
                {label}
              </Button>
              <Button variant={variant} href="/design#buttons">
                {label} (link)
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
