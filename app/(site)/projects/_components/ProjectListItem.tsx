import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Project } from "@/lib/content/projects";

type ProjectListItemProps = {
  project: Project;
};

const dollars = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function ProjectListItem({ project }: ProjectListItemProps) {
  const { heroImage, title, summary, body, fundingGoal, fundingRaised, status } = project;
  const percentage = fundingGoal > 0 ? Math.round((fundingRaised / fundingGoal) * 100) : 0;
  const isPaused = status === "paused";
  const progressLabel =
    isPaused || status === "funded"
      ? undefined
      : `Raised ${dollars.format(fundingRaised)} of ${dollars.format(fundingGoal)}`;
  const progressTone = isPaused ? "paused" : status === "funded" ? "funded" : "default";
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className={`grid grid-cols-1 items-start gap-6 bg-ground-2 p-6 sm:p-8 lg:grid-cols-[5fr_7fr] lg:gap-10 lg:p-10${isPaused ? " opacity-80" : ""}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-ground-3">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className={`object-cover${isPaused ? " grayscale" : ""}`}
        />
      </div>
      <div className="flex flex-col gap-5 lg:py-2">
        <h2 id={titleId} className="text-balance text-heading-3 text-ink">
          {title}
        </h2>
        <p className="text-body-lg text-ink-2">{summary}</p>
        <p className="max-w-[60ch] text-body text-ink-2">{body}</p>
        <ProgressBar percentage={percentage} label={progressLabel} tone={progressTone} />
        {!isPaused && (
          <div className="pt-1">
            <Button variant="secondary" href={`/donate?project=${project.id}`}>
              {status === "funded" ? "Back the next one" : "Support this project"}
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
