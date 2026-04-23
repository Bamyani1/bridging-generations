import Image from "next/image";
import { StudentPlaceholder } from "@/components/ui/StudentPlaceholder";
import { TagPill } from "@/components/ui/TagPill";
import { canShowPortrait } from "@/lib/content/canShowPortrait";
import type { Student } from "@/lib/content/students";

type StudentCardProps = {
  student: Student;
  variant?: "default" | "spotlight";
};

export function StudentCard({ student, variant = "default" }: StudentCardProps) {
  const { displayName, community, grade, quote, portrait, consent, sponsorshipStatus } = student;
  const portraitSrc = portrait?.src ?? null;
  const allowPortrait = canShowPortrait(consent) && !!portraitSrc;
  const isSpotlight = variant === "spotlight";

  return (
    <article className="flex h-full flex-col gap-4 bg-ground-2">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ground-3">
        {allowPortrait && portraitSrc ? (
          <Image
            src={portraitSrc}
            alt={portrait?.alt ?? ""}
            fill
            sizes={isSpotlight ? "320px" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-cover"
          />
        ) : (
          <StudentPlaceholder />
        )}
      </div>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-heading-5 text-ink">{displayName}</h3>
          <TagPill
            variant={sponsorshipStatus === "sponsored" ? "live" : "default"}
            statusVariant={sponsorshipStatus === "sponsored" ? "active" : "pending"}
          >
            {sponsorshipStatus}
          </TagPill>
        </div>
        <p className="text-meta uppercase text-ink-2">
          Grade {grade}
          {community ? ` · ${community}` : ""}
        </p>
        {quote ? <p className="text-body-sm text-ink-2">&ldquo;{quote}&rdquo;</p> : null}
      </div>
    </article>
  );
}
