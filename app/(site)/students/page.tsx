import type { Metadata } from "next";
import { CTAFooterPanel } from "@/components/domain/CTAFooterPanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllSchools } from "@/lib/content/schools";
import { getStudentsGroupedBySchool } from "@/lib/content/students";
import { breadcrumbList, collectionPage } from "@/lib/seo/jsonLd";
import { SITE_URL } from "@/lib/seo/siteUrl";
import { ConsentStatement } from "./_components/ConsentStatement";
import { SchoolSection } from "./_components/SchoolSection";
import { StudentsHero } from "./_components/StudentsHero";

export const metadata: Metadata = {
  title: "Students",
  description:
    "Browse the sponsored students at Bridging Generations partner schools across the Chittagong Hill Tracts. First names only; portraits appear only with a written family release on file.",
};

export default async function StudentsPage() {
  const [schools, grouped] = await Promise.all([getAllSchools(), getStudentsGroupedBySchool()]);

  const schoolById = new Map(schools.map((school) => [school.id, school]));
  type Section = {
    school: NonNullable<ReturnType<typeof schoolById.get>>;
    students: (typeof grouped)[number]["students"];
  };
  const sections: Section[] = grouped
    .map((group) => {
      const school = schoolById.get(group.schoolId);
      return school ? { school, students: group.students } : null;
    })
    .filter((entry): entry is Section => entry !== null);

  const studentCount = sections.reduce((sum, section) => sum + section.students.length, 0);
  const ldBreadcrumb = breadcrumbList(SITE_URL, [
    { name: "Home", url: "/" },
    { name: "Students", url: "/students" },
  ]);
  const ldCollection = collectionPage({
    siteUrl: SITE_URL,
    url: "/students",
    name: "Sponsored students",
    description: `Sponsored students at Bridging Generations across ${schools.length} partner schools.`,
  });

  return (
    <>
      <StudentsHero studentCount={studentCount} schoolCount={schools.length} />
      <ConsentStatement />
      {sections.map((section, index) => (
        <SchoolSection
          key={section.school.id}
          school={section.school}
          students={section.students}
          index={index}
        />
      ))}
      <CTAFooterPanel
        headline="Your sponsorship puts a name on this page."
        body="Every $30 / month sponsorship covers tuition, books, daily meals, and materials for one student. The next sponsorship pays for the next name on this list."
        ctaLabel="Sponsor a Student"
        ctaHref="/donate"
        tone="teal"
        titleId="students-cta-title"
      />
      <JsonLd id="ld-students-breadcrumb" data={ldBreadcrumb} />
      <JsonLd id="ld-students-collection" data={ldCollection} />
    </>
  );
}
