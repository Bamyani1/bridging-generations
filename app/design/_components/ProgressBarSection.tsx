import { ProgressBar } from "@/components/ui/ProgressBar";

export function ProgressBarSection() {
  return (
    <section id="progressbar" className="scroll-mt-8">
      <h2 className="text-heading-2">Progress Bar</h2>
      <p className="mt-2 max-w-2xl text-body-sm text-ink-2">
        Teal fill on hairline track with a coral tip indicator. Funded state swaps the label and
        drops the tip. Announces progress via <code className="font-mono">role="progressbar"</code>.
      </p>
      <div className="mt-6 max-w-xl space-y-8">
        <ProgressBar percentage={0} label="Raised $0 of $10,000" />
        <ProgressBar percentage={35} label="Raised $3,500 of $10,000" />
        <ProgressBar percentage={72} label="Raised $7,200 of $10,000" />
        <ProgressBar percentage={100} tone="funded" />
      </div>
    </section>
  );
}
