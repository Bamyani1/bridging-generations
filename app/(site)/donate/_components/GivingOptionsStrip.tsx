import { Row } from "@/components/ui/editorial";

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
      href: "/donate",
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
      className="bg-ground-3 px-4 py-16 sm:px-6 lg:px-[6%] lg:py-20"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-10">
        <h2 id="giving-options-title" className="max-w-[20ch] text-balance text-heading-1 text-ink">
          Other ways to give
        </h2>
        <ul className="flex flex-col">
          {tiles.map((tile) => (
            <Row as="li" key={tile.eyebrow} noImage>
              <Row.Eyebrow>{tile.eyebrow}</Row.Eyebrow>
              <Row.Headline href={tile.href}>{tile.heading}</Row.Headline>
              <Row.Lede>{tile.body}</Row.Lede>
            </Row>
          ))}
        </ul>
      </div>
    </section>
  );
}
