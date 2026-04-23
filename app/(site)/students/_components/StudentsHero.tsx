import { Eyebrow } from "@/components/ui/Eyebrow";

type StudentsHeroProps = {
  studentCount: number;
  schoolCount: number;
};

export function StudentsHero({ studentCount, schoolCount }: StudentsHeroProps) {
  return (
    <section
      aria-labelledby="students-hero-title"
      className="bg-ground px-4 pt-24 pb-16 sm:px-6 lg:px-[6%] lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
        <Eyebrow>The Chittagong Hill Tracts</Eyebrow>
        <h1 id="students-hero-title" className="max-w-[20ch] text-balance text-display-1 text-ink">
          Student Directory
        </h1>
        <p className="max-w-[60ch] text-body-lg text-ink-2">
          {studentCount} sponsored students across {schoolCount} partner schools. First names only.
          Photos appear when — and only when — a written family release is on file for this site.
        </p>
      </div>
    </section>
  );
}
