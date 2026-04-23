import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

type GivingTile = {
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
};

type GivingOptionsStripProps = {
  monthlySuggestion: number;
};

export function GivingOptionsStrip({ monthlySuggestion }: GivingOptionsStripProps) {
  const tiles: GivingTile[] = [
    {
      eyebrow: "Sponsor one child",
      heading: `$${monthlySuggestion}/month`,
      body: "Tuition, books, meals, and materials — everything one student needs for a full school year.",
      href: `/donate?amount=${monthlySuggestion}&frequency=monthly`,
    },
    {
      eyebrow: "Fund a program",
      heading: "One-time gift",
      body: "Back the meal program, the girls' scholarship fund, or a school-supply delivery.",
      href: "/projects",
    },
    {
      eyebrow: "Leave a legacy",
      heading: "Planned giving",
      body: "Make Bridging Generations part of your will or charitable trust. Write us and we'll share the language to use.",
      href: "/contact",
    },
  ];
  return (
    <section
      aria-labelledby="giving-options-title"
      className="bg-ground-2 px-4 py-16 sm:px-6 lg:px-[6%] lg:py-20"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <h2 id="giving-options-title" className="max-w-[20ch] text-balance text-heading-1 text-ink">
          Other ways to give
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiles.map((tile) => (
            <Link
              key={tile.eyebrow}
              href={tile.href}
              className="group flex flex-col gap-3 bg-ground p-6 transition hover:bg-ground-3 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
            >
              <Eyebrow>{tile.eyebrow}</Eyebrow>
              <span className="text-balance text-heading-4 text-ink transition group-hover:text-accent">
                {tile.heading}
              </span>
              <p className="text-body text-ink-2">{tile.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
