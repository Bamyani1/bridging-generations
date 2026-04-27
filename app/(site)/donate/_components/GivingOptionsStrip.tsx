import { Feature, Row } from "@/components/ui/editorial";

type SecondaryOption = {
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
};

type GivingOptionsStripProps = {
  monthlySuggestion: number;
};

export function GivingOptionsStrip({ monthlySuggestion }: GivingOptionsStripProps) {
  const secondaries: SecondaryOption[] = [
    {
      eyebrow: "Give once",
      heading: "One-time gift",
      body: "Any amount, any time. Use the form above and choose 'Give once' at checkout.",
      href: "#donate-hero-title",
    },
    {
      eyebrow: "Give to a project",
      heading: "Designate a program",
      body: "Back the meal program, the girls' scholarship fund, or a school-supply delivery.",
      href: "/projects",
    },
    {
      eyebrow: "Give in honor of",
      heading: "Honor or memorial gift",
      body: "Mark a birthday, a teacher, or a family member. Write us and we will send a card to whomever you name.",
      href: "/contact",
    },
  ];
  return (
    <section
      aria-labelledby="giving-options-title"
      className="bg-ground-3 px-4 py-16 sm:px-6 lg:px-[6%] lg:py-20"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 lg:gap-16">
        <h2 id="giving-options-title" className="max-w-[20ch] text-balance text-heading-1 text-ink">
          Other ways to give
        </h2>
        <Feature breakout={false}>
          <Feature.Body>
            <Feature.Eyebrow>Sponsor monthly</Feature.Eyebrow>
            <Feature.Headline as="h3" href="#donate-hero-title">
              ${monthlySuggestion}/mo keeps one student in the classroom
            </Feature.Headline>
            <Feature.Lede>
              Tuition, books, daily meals, and materials for the full school year. The single most
              leveraged way to give — recurring sponsors are how the program plans staffing.
            </Feature.Lede>
          </Feature.Body>
        </Feature>
        <ul className="flex flex-col">
          {secondaries.map((option) => (
            <Row as="li" key={option.eyebrow} noImage>
              <Row.Eyebrow>{option.eyebrow}</Row.Eyebrow>
              <Row.Headline href={option.href}>{option.heading}</Row.Headline>
              <Row.Lede>{option.body}</Row.Lede>
            </Row>
          ))}
        </ul>
      </div>
    </section>
  );
}
