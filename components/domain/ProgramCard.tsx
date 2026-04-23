import Image from "next/image";
import { Link } from "next-view-transitions";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Project } from "@/lib/content/projects";

type ProgramCardProps = {
  project: Project;
};

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProgramCard({ project }: ProgramCardProps) {
  const { heroImage, title, summary, fundingGoal, fundingRaised, status } = project;
  const percentage = fundingGoal > 0 ? Math.round((fundingRaised / fundingGoal) * 100) : 0;
  const isFunded = status === "funded" || percentage >= 100;
  const progressLabel = isFunded
    ? undefined
    : `Raised ${dollars.format(fundingRaised)} of ${dollars.format(fundingGoal)}`;

  return (
    <article className="group flex flex-col gap-5 bg-ground-2">
      <Link
        href="/projects"
        className="block focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-ground-3">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:group-hover:scale-[1.04]"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-4 p-6 lg:p-8">
        <h3 className="text-heading-4 text-ink">{title}</h3>
        <p className="text-body text-ink-2">{summary}</p>
        <ProgressBar
          percentage={percentage}
          label={progressLabel}
          tone={isFunded ? "funded" : "default"}
        />
        <Link
          href="/projects"
          className="group/link inline-flex items-center gap-1 text-nav-link uppercase text-accent transition hover:text-accent-2-text"
        >
          Support this project
          <span
            aria-hidden="true"
            className="transition-transform motion-safe:group-hover/link:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
