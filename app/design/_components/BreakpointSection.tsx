const breakpoints: Array<{ prefix: string; minWidth: string; intent: string }> = [
  { prefix: "(base)", minWidth: "0", intent: "Mobile" },
  { prefix: "sm:", minWidth: "640px", intent: "Large phone / small tablet portrait" },
  { prefix: "md:", minWidth: "768px", intent: "Tablet" },
  { prefix: "lg:", minWidth: "1024px", intent: "Laptop" },
  { prefix: "xl:", minWidth: "1280px", intent: "Desktop" },
  { prefix: "2xl:", minWidth: "1536px", intent: "Wide" },
];

export function BreakpointSection() {
  return (
    <section id="breakpoint" className="scroll-mt-8">
      <h2 className="text-heading-2">Breakpoint</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Tailwind defaults, mobile-first. The live indicator sits bottom-right on every{" "}
        <code className="font-mono">/design</code> view — resize the window to watch it update.
        Design targets: 375 · 768 · 1280 · 1440 · 1920. Must stay usable at 320px.
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-body-sm">
          <thead>
            <tr className="border-hairline border-b text-left text-meta uppercase text-ink-2">
              <th className="py-2 pr-4">Prefix</th>
              <th className="py-2 pr-4">Min width</th>
              <th className="py-2">Intent</th>
            </tr>
          </thead>
          <tbody>
            {breakpoints.map((bp) => (
              <tr key={bp.prefix} className="border-hairline border-b last:border-b-0">
                <td className="py-2 pr-4 font-mono">{bp.prefix}</td>
                <td className="py-2 pr-4 text-ink-2">{bp.minWidth}</td>
                <td className="py-2 text-ink-2">{bp.intent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
