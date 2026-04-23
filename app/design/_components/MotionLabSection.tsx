import { Reveal } from "@/components/ui/Reveal";
import { SectionShell } from "./SectionShell";

const durationTable: Array<{ token: string; value: string; use: string }> = [
  { token: "--motion-xs", value: "120ms", use: "State flip (hover color)" },
  { token: "--motion-sm", value: "220ms", use: "Card hover lift, icon flip" },
  { token: "--motion-md", value: "400ms", use: "Menu open / close, page transition" },
  { token: "--motion-lg", value: "700ms", use: "Image zoom, scroll reveal" },
  { token: "--motion-xl", value: "1200ms", use: "Hero entrance, count-up" },
];

const easingTable: Array<{ token: string; curve: string; use: string }> = [
  { token: "--ease-smooth", curve: "cubic-bezier(0.16, 1, 0.3, 1)", use: "Reveals + transitions" },
  {
    token: "--ease-in-out",
    curve: "cubic-bezier(0.4, 0, 0.2, 1)",
    use: "Bidirectional state changes",
  },
  { token: "--ease-linear", curve: "linear", use: "Scroll-driven progress only" },
];

export function MotionLabSection() {
  return (
    <SectionShell
      id="motion"
      number="§12"
      label="Motion"
      meta={[
        { key: "durations", value: "5" },
        { key: "easings", value: "3" },
        { key: "reduced-motion", value: "safe" },
      ]}
    >
      <p className="max-w-2xl text-body text-ink-2">
        Tokens, primitives, and demos for §9 motion. Reveals animate on enter; card hovers lift and
        brighten; image zooms on hover. Every demo respects{" "}
        <code className="font-mono">prefers-reduced-motion: reduce</code>.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <p className="font-mono text-meta uppercase tracking-[0.1em] text-ink-2">
            Duration tokens
          </p>
          <ul className="mt-4 space-y-2 font-mono text-meta uppercase">
            {durationTable.map((row) => (
              <li key={row.token} className="flex flex-wrap gap-x-3">
                <span className="text-ink">{row.token}</span>
                <span className="text-ink-2">{row.value}</span>
                <span className="text-ink-2">— {row.use}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-meta uppercase tracking-[0.1em] text-ink-2">Easing tokens</p>
          <ul className="mt-4 space-y-2 font-mono text-meta uppercase">
            {easingTable.map((row) => (
              <li key={row.token} className="flex flex-wrap gap-x-3">
                <span className="text-ink">{row.token}</span>
                <span className="text-ink-2">{row.curve}</span>
                <span className="text-ink-2">— {row.use}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-hairline pt-8">
        <p className="font-mono text-meta uppercase tracking-[0.1em] text-ink-2">Scroll reveal</p>
        <p className="mt-2 text-body-sm text-ink-2">
          Each Reveal fades + slides up 30px once it intersects the viewport. Reduced motion drops
          the translate.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[0, 80, 160].map((delay) => (
            <Reveal key={delay} delay={delay}>
              <div className="border border-hairline bg-ground-2 p-6">
                <p className="font-mono text-meta uppercase text-ink">Reveal · delay {delay}ms</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12 border-t border-hairline pt-8">
        <p className="font-mono text-meta uppercase tracking-[0.1em] text-ink-2">Card hover</p>
        <p className="mt-2 text-body-sm text-ink-2">
          Lifts -1 × spacing; swaps shadow-card → shadow-card-hover over 220ms. Reduced motion:
          shadow swap only.
        </p>
        <div className="mt-4 max-w-sm">
          <div className="border border-hairline bg-ground-2 p-6 shadow-[var(--shadow-card)] transition-all duration-[var(--motion-sm)] ease-[var(--ease-smooth)] hover:shadow-[var(--shadow-card-hover)] motion-safe:hover:-translate-y-1">
            <p className="text-heading-5">Hoverable card</p>
            <p className="mt-1 text-body-sm text-ink-2">Move the cursor over me.</p>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-hairline pt-8">
        <p className="font-mono text-meta uppercase tracking-[0.1em] text-ink-2">
          Image zoom · hover
        </p>
        <p className="mt-2 text-body-sm text-ink-2">
          1.06× scale over 700ms smooth easing. Reduced motion: static.
        </p>
        <div className="group mt-4 max-w-sm overflow-hidden">
          <div
            aria-hidden="true"
            className="aspect-[4/3] bg-accent transition-transform duration-[var(--motion-lg)] ease-[var(--ease-smooth)] motion-safe:group-hover:scale-[1.06]"
          />
        </div>
      </div>

      <div className="mt-12 border-t border-hairline pt-8">
        <p className="font-mono text-meta uppercase tracking-[0.1em] text-ink-2">
          Reduced-motion contract
        </p>
        <p className="mt-3 text-body-sm text-ink-2">
          When <code className="font-mono">prefers-reduced-motion: reduce</code> matches: every
          translate / scale / rotate transform is removed; opacity fades only where they convey
          meaning; reveals render statically; Lenis is disabled; count-ups render their final value.
        </p>
      </div>
    </SectionShell>
  );
}
