import type { SuccessStory } from "@/lib/content/successStories";

type PullQuotePanelProps = {
  story: SuccessStory;
};

export function PullQuotePanel({ story }: PullQuotePanelProps) {
  return (
    <section className="bg-ground-3 px-4 py-20 sm:px-6 lg:px-[6%] lg:py-28">
      <div className="mx-auto max-w-[900px]">
        <blockquote className="text-balance text-heading-2 text-ink">
          &ldquo;{story.pullQuote}&rdquo;
        </blockquote>
        <p className="mt-6 text-meta uppercase text-ink-2">
          <cite className="not-italic">
            {story.subjectName}
            {story.subjectRole ? ` · ${story.subjectRole}` : ""}
          </cite>
        </p>
      </div>
    </section>
  );
}
