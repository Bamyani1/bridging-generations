import Link from "next/link";

export function DonorsExplainer() {
  return (
    <section
      aria-labelledby="donors-explainer-title"
      className="bg-ground-2 px-4 py-16 sm:px-6 lg:px-[6%] lg:py-20"
    >
      <div className="mx-auto flex max-w-[900px] flex-col gap-4 text-body text-ink-2">
        <h2
          id="donors-explainer-title"
          className="text-eyebrow uppercase tracking-[0.1em] text-accent"
        >
          A note on anonymity
        </h2>
        <p className="text-balance">
          Donors on this site choose to remain anonymous. If you'd like a formal acknowledgement for
          your records, or want to be thanked by name in a future annual report,{" "}
          <Link
            href="/contact"
            className="text-accent underline underline-offset-[3px] transition hover:text-accent-2-text"
          >
            please contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
