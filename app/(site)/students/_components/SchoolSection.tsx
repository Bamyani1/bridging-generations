import { StudentSpotlightScroller } from "@/components/domain/StudentSpotlightScroller";
import { isPlaceholder } from "@/lib/content/isPlaceholder";
import type { School } from "@/lib/content/schools";
import type { Student } from "@/lib/content/students";

type SchoolSectionProps = {
  school: School;
  students: Student[];
  index: number;
};

export function SchoolSection({ school, students, index }: SchoolSectionProps) {
  const titleId = `school-${school.id}-title`;
  return (
    <section
      aria-labelledby={titleId}
      className={`bg-ground py-16 lg:py-24 ${index === 0 ? "" : "border-t border-ground-3"}`}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-[6%]">
        <header className="mb-8 flex flex-col gap-2 lg:mb-10">
          <p className="text-meta uppercase text-ink-2">{school.location}</p>
          <h2 id={titleId} className="text-balance text-heading-2 text-ink">
            {school.name}
          </h2>
          {school.description && !isPlaceholder(school.description) ? (
            <p className="max-w-[60ch] text-body text-ink-2">{school.description}</p>
          ) : null}
          <p className="text-meta uppercase text-ink-2">
            {students.length} {students.length === 1 ? "student" : "students"}
          </p>
        </header>
      </div>
      <StudentSpotlightScroller
        students={students}
        ariaLabel={`${school.name} students — scroll horizontally to browse`}
        hint={index === 0}
      />
    </section>
  );
}
