import { Row } from "@/components/ui/editorial";

type NextStep = {
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
};

const STEPS: NextStep[] = [
  {
    eyebrow: "Meet the students",
    heading: "See who you just supported.",
    body: "All 156 sponsored students, grouped by school. Photos only appear where a release is on file.",
    href: "/students",
  },
  {
    eyebrow: "Read a story",
    heading: "The kind of arc this funds.",
    body: "In-depth stories from alumni and current students about what sponsorship meant in practice.",
    href: "/success-stories",
  },
];

export function NextStepsGrid() {
  return (
    <section
      aria-labelledby="thank-you-next-title"
      className="bg-ground px-4 py-20 sm:px-6 lg:px-[6%] lg:py-28"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8">
        <h2 id="thank-you-next-title" className="sr-only">
          What to do next
        </h2>
        <ul className="flex flex-col">
          {STEPS.map((step) => (
            <Row as="li" key={step.href} noImage>
              <Row.Eyebrow>{step.eyebrow}</Row.Eyebrow>
              <Row.Headline href={step.href}>{step.heading}</Row.Headline>
              <Row.Lede>{step.body}</Row.Lede>
            </Row>
          ))}
        </ul>
      </div>
    </section>
  );
}
