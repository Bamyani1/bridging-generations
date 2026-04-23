import { Avatar } from "@/components/ui/Avatar";
import { TagPill } from "@/components/ui/TagPill";
import type { Testimonial } from "@/lib/content/testimonials";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

const ROLE_LABELS: Record<string, string> = {
  parent: "Parent",
  teacher: "Teacher",
  student: "Student",
  alum: "Alum",
  board: "Board",
  partner: "Partner",
  volunteer: "Volunteer",
  donor: "Donor",
};

function quoteSize(length: number): string {
  if (length <= 80) return "text-heading-4";
  if (length <= 200) return "text-heading-5";
  return "text-body-lg";
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const { quote, speakerName, speakerTitle, speakerPhoto, speakerRole } = testimonial;
  const roleLabel = ROLE_LABELS[speakerRole] ?? speakerRole;

  return (
    <blockquote className="mb-4 flex break-inside-avoid flex-col gap-6 bg-ground-2 p-6 shadow-card transition duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-card-hover lg:p-8">
      <p className={`text-balance text-ink ${quoteSize(quote.length)}`}>&ldquo;{quote}&rdquo;</p>
      <footer className="flex items-center gap-3">
        <Avatar
          src={speakerPhoto?.src ?? undefined}
          name={speakerName}
          alt={speakerName}
          size="md"
        />
        <div className="flex flex-col gap-1">
          <cite className="text-heading-5 not-italic text-ink">{speakerName}</cite>
          {speakerTitle ? <span className="text-meta text-ink-2">{speakerTitle}</span> : null}
        </div>
        <span className="ml-auto">
          <TagPill>{roleLabel}</TagPill>
        </span>
      </footer>
    </blockquote>
  );
}
