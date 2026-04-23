import type { Testimonial } from "@/lib/content/testimonials";

type StudentsPullQuoteProps = {
  testimonial: Testimonial;
};

export function StudentsPullQuote({ testimonial }: StudentsPullQuoteProps) {
  const { quote, speakerName, speakerTitle, speakerRole } = testimonial;
  const role =
    speakerTitle && speakerTitle.length > 0
      ? speakerTitle
      : `${speakerRole.charAt(0).toUpperCase()}${speakerRole.slice(1)}`;

  return (
    <aside
      aria-label="Student pull quote"
      className="mx-auto mt-6 max-w-[1280px] px-4 sm:px-6 lg:absolute lg:right-[6%] lg:bottom-10 lg:mt-0 lg:mr-0 lg:ml-auto lg:max-w-[34ch] lg:px-0"
    >
      <figure className="flex flex-col gap-3 border-accent-2-text border-l-2 pl-4 lg:pl-5">
        <blockquote className="text-balance text-body-lg text-ink">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="text-meta uppercase tracking-[0.1em] text-ink-2">
          {speakerName} · {role}
        </figcaption>
      </figure>
    </aside>
  );
}
