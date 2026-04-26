import { HorizonLine } from "@/components/motif/HorizonLine";
import { Button } from "@/components/ui/Button";

type CTAFooterPanelProps = {
  headline: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  tone?: "cream" | "teal";
  titleId?: string;
  id?: string;
  withHorizonLine?: boolean;
};

export function CTAFooterPanel({
  headline,
  body,
  ctaLabel,
  ctaHref,
  tone = "cream",
  titleId = "cta-footer-title",
  id,
  withHorizonLine = false,
}: CTAFooterPanelProps) {
  const isTeal = tone === "teal";
  const surfaceClass = isTeal ? "teal-panel text-white" : "bg-ground text-ink";
  const bodyClass = isTeal ? "text-white/80" : "text-ink-2";
  const positionClass = withHorizonLine ? " relative overflow-hidden" : "";

  return (
    <section
      aria-labelledby={titleId}
      {...(id ? { id } : {})}
      className={`${surfaceClass} py-24 lg:py-[140px]${id ? " scroll-mt-20" : ""}${positionClass}`}
    >
      {withHorizonLine ? (
        <HorizonLine
          tone={isTeal ? "on-teal" : "on-cream"}
          className="pointer-events-none absolute inset-x-0 top-0 z-0 block h-24 w-full"
        />
      ) : null}
      <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-start gap-8 px-4 sm:px-6 lg:px-[6%]">
        <h2 id={titleId} className="text-balance text-display-2">
          {headline}
        </h2>
        <p className={`max-w-[56ch] text-body-lg ${bodyClass}`}>{body}</p>
        <Button variant="primary" href={ctaHref}>
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
