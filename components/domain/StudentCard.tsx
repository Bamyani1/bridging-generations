import Image from "next/image";
import { TealPaperclip } from "@/components/motif/TealPaperclip";
import { StudentPlaceholder } from "@/components/ui/StudentPlaceholder";
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
  const isSponsored = sponsorshipStatus === "sponsored";
  const sponsorshipLabel = isSponsored ? "sponsored" : "awaiting sponsor";

  return (
    <article
      className="card-hover relative flex h-full flex-col gap-4 bg-ground-2"
      aria-label={`${displayName}, ${sponsorshipLabel}, grade ${grade}`}
    >
      {isSponsored ? (
        <TealPaperclip className="pointer-events-none absolute -top-2 left-4 z-10 h-10 w-6" />
      ) : null}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ground-3">
        {allowPortrait && portraitSrc ? (
          <Image
            src={portraitSrc}
            alt={portrait?.alt ?? ""}
            fill
            sizes={
              isSpotlight
                ? "(min-width: 1024px) 360px, (min-width: 640px) 320px, 280px"
                : "(min-width: 1024px) 25vw, 50vw"
            }
            className="object-cover"
          />
        ) : (
          <StudentPlaceholder />
        )}
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h3 className="card-title text-heading-5 text-ink">{displayName}</h3>
        <p className="text-meta uppercase text-ink-2">
          Grade {grade}
          {community ? ` · ${community}` : ""}
        </p>
        {quote ? <p className="text-body-sm text-ink-2">&ldquo;{quote}&rdquo;</p> : null}
      </div>
    </article>
  );
}
