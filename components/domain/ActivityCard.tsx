import Image from "next/image";
import { TagPill } from "@/components/ui/TagPill";
import type { Activity } from "@/lib/content/activities";

type ActivityCardProps = {
  activity: Activity;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return dateFormatter.format(d);
}

export function ActivityCard({ activity }: ActivityCardProps) {
  const { coverImage, title, excerpt, tag, publishedAt } = activity;
  return (
    <article className="group flex h-full flex-col gap-4 bg-ground-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ground-3">
        <Image
          src={coverImage.src}
          alt={coverImage.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-3 p-6 lg:p-8">
        <div className="flex items-center justify-between gap-3">
          <TagPill>{tag}</TagPill>
          <time className="text-meta uppercase text-ink-2" dateTime={publishedAt}>
            {formatDate(publishedAt)}
          </time>
        </div>
        <h3 className="text-balance text-heading-5 text-ink">{title}</h3>
        <p className="text-body text-ink-2">{excerpt}</p>
      </div>
    </article>
  );
}
