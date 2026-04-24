import { Button } from "@/components/ui/Button";
import type { Testimonial } from "@/lib/content/testimonials";

type TestimonialPanelProps = {
  testimonial: Testimonial;
  ctaLabel?: string;
  ctaHref?: string;
  titleId?: string;
  id?: string;
};

export function TestimonialPanel({
  testimonial,
  ctaLabel = "Join our mission",
  ctaHref = "/donate",
  titleId = "testimonial-title",
  id,
}: TestimonialPanelProps) {
  const { quote, speakerName, speakerTitle, speakerRole } = testimonial;
  const role =
    speakerTitle && speakerTitle.length > 0
      ? speakerTitle
      : `${speakerRole.charAt(0).toUpperCase()}${speakerRole.slice(1)}`;

  return (
    <section
      aria-labelledby={titleId}
      {...(id ? { id } : {})}
      className={`teal-panel py-20 lg:py-32${id ? " scroll-mt-20" : ""}`}
    >
      <span aria-hidden="true" className="teal-panel-glyph" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-[6%]">
        <blockquote className="flex flex-col gap-10">
          <p id={titleId} className="text-balance text-heading-1 text-white">
            &ldquo;{quote}&rdquo;
          </p>
          <footer className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <cite className="not-italic text-heading-5 text-white">{speakerName}</cite>
              <span className="text-meta uppercase text-white/75">{role}</span>
            </div>
            <Button variant="primary" href={ctaHref}>
              {ctaLabel}
            </Button>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
