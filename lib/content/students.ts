import "server-only";
import type { Entry } from "@keystatic/core/reader";
import type { studentCollection } from "@/keystatic/collections/student";
import { reader } from "./reader";

type RawStudent = Entry<typeof studentCollection>;
export type Student = Omit<RawStudent, "community"> & {
  id: string;
  community?: Exclude<RawStudent["community"], "unknown">;
};

function normalize(slug: string, entry: RawStudent): Student {
  const { community, ...rest } = entry;
  return {
    ...rest,
    id: slug,
    community: community === "unknown" ? undefined : community,
  };
}

export async function getAllStudents(): Promise<Student[]> {
  const entries = await reader.collections.student.all();
  return entries.map(({ slug, entry }) => normalize(slug, entry));
}

export async function getSpotlightStudents(limit = 6): Promise<Student[]> {
  const all = await getAllStudents();
  return all.slice(0, limit);
}

export type StudentsBySchool = {
  schoolId: string;
  students: Student[];
};

export async function getStudentsGroupedBySchool(): Promise<StudentsBySchool[]> {
  const all = await getAllStudents();
  const bySchool = new Map<string, Student[]>();
  for (const student of all) {
    const key = student.schoolId ?? "";
    if (!key) continue;
    const bucket = bySchool.get(key) ?? [];
    bucket.push(student);
    bySchool.set(key, bucket);
  }
  return Array.from(bySchool.entries())
    .map(([schoolId, students]) => ({
      schoolId,
      students: [...students].sort((a, b) => {
        if (a.grade !== b.grade) return a.grade - b.grade;
        return a.displayName.localeCompare(b.displayName);
      }),
    }))
    .sort((a, b) => a.schoolId.localeCompare(b.schoolId));
}
