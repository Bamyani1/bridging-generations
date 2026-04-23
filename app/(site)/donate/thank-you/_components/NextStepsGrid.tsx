import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {STEPS.map((step) => (
            <Link
              key={step.href}
              href={step.href}
              className="group flex flex-col gap-3 bg-ground-2 p-8 transition hover:bg-ground-3 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
            >
              <Eyebrow>{step.eyebrow}</Eyebrow>
              <span className="text-balance text-heading-4 text-ink transition group-hover:text-accent">
                {step.heading}
              </span>
              <p className="text-body text-ink-2">{step.body}</p>
              <span
                aria-hidden="true"
                className="mt-2 text-nav-link uppercase text-accent transition motion-safe:group-hover:translate-x-1"
              >
                Go →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
