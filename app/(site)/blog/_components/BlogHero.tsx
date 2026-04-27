import { Eyebrow } from "@/components/ui/Eyebrow";

type BlogHeroProps = {
  count: number;
};

export function BlogHero({ count }: BlogHeroProps) {
  return (
    <section
      aria-labelledby="blog-hero-title"
      className="bg-ground px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
        <Eyebrow>Notes from the field</Eyebrow>
        <h1 id="blog-hero-title" className="max-w-[22ch] text-balance text-display-2 text-ink">
          Our blog
        </h1>
        <p className="max-w-[44ch] text-body-lg text-ink-2">
          Field updates, transparency notes, and the occasional long-form piece — written by board
          and partner-school staff.
        </p>
        <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-hairline pt-4 text-meta uppercase tracking-[0.1em] text-ink-2">
          <li>
            {count} {count === 1 ? "post" : "posts"}
          </li>
          <li>field updates</li>
          <li>transparency notes</li>
        </ul>
      </div>
    </section>
  );
}
