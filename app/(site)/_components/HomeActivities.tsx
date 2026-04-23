import { Link } from "next-view-transitions";
import { ActivityCard } from "@/components/domain/ActivityCard";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { getRecentActivities } from "@/content/fixtures/activities";

export function HomeActivities() {
  const recent = getRecentActivities(2);

  return (
    <section aria-labelledby="home-activities-title" className="bg-ground py-20 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-[6%]">
        <header className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow>From the field</Eyebrow>
            <h2 id="home-activities-title" className="text-balance text-heading-2 text-ink">
              Recent activities
            </h2>
          </div>
          <Link
            href="/activities"
            className="group inline-flex items-center gap-1 text-nav-link uppercase text-accent transition hover:text-accent-2-text"
          >
            See all activities
            <span
              aria-hidden="true"
              className="transition-transform motion-safe:group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </header>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {recent.map((activity, i) => (
            <Reveal key={activity.id} delay={i * 150}>
              <ActivityCard activity={activity} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
