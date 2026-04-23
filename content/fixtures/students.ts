import type { StudentConsent } from "@/lib/content/canShowPortrait";

export type StudentCommunity =
  | "chakma"
  | "marma"
  | "tripura"
  | "tanchangya"
  | "mro"
  | "bawm"
  | "khumi"
  | "khiyang"
  | "lushai"
  | "pankho"
  | "bengali"
  | "other";

export type StudentSponsorship = "sponsored" | "waiting";

export type Student = {
  id: string;
  displayName: string;
  schoolId: string;
  grade: number;
  community?: StudentCommunity;
  quote?: string;
  portrait?: { src: string; alt: string };
  consent: StudentConsent;
  sponsorshipStatus: StudentSponsorship;
  enrolledAt?: string;
};

const grantedWebsite: StudentConsent = {
  portraitReleaseStatus: "granted",
  storyReleaseStatus: "granted",
  consentScope: ["website", "print-materials"],
  revokable: true,
  signedDate: "2025-09-01",
  releaseFormId: "BG-REL-2025-001",
};

const pending: StudentConsent = {
  portraitReleaseStatus: "pending",
  storyReleaseStatus: "pending",
  consentScope: [],
  revokable: true,
};

const revoked: StudentConsent = {
  portraitReleaseStatus: "granted",
  storyReleaseStatus: "granted",
  consentScope: ["website"],
  revokable: true,
  signedDate: "2024-09-01",
  releaseFormId: "BG-REL-2024-007",
  revokedAt: "2026-02-02",
};

export const students: Student[] = [
  {
    id: "bg-0101",
    displayName: "Anika",
    schoolId: "thanchi-high-school",
    grade: 8,
    community: "marma",
    quote: "I want to become a teacher and open a library in my village.",
    portrait: {
      src: "/student-1.jpg",
      alt: "A student reading at a classroom desk",
    },
    consent: grantedWebsite,
    sponsorshipStatus: "sponsored",
    enrolledAt: "2022-01-10",
  },
  {
    id: "bg-0107",
    displayName: "Mithun",
    schoolId: "bandarban-school",
    grade: 6,
    community: "mro",
    quote: "I like maths — and one day I will build bridges.",
    portrait: {
      src: "/student-3.jpg",
      alt: "A student sits with an open book outdoors",
    },
    consent: grantedWebsite,
    sponsorshipStatus: "sponsored",
    enrolledAt: "2023-01-12",
  },
  {
    id: "bg-0112",
    displayName: "Rima",
    schoolId: "khagrachari-school",
    grade: 9,
    community: "chakma",
    quote: "Reading with my sisters after school is my favourite time.",
    portrait: {
      src: "/student-2.jpg",
      alt: "A young student in uniform reading a book",
    },
    consent: grantedWebsite,
    sponsorshipStatus: "sponsored",
    enrolledAt: "2021-02-05",
  },
  {
    id: "bg-0118",
    displayName: "Bishal",
    schoolId: "rangamati-school",
    grade: 5,
    community: "tripura",
    quote: "My teacher says I ask too many questions. I don't plan to stop.",
    portrait: {
      src: "/student-4.jpg",
      alt: "A student reads a book outdoors",
    },
    consent: grantedWebsite,
    sponsorshipStatus: "sponsored",
    enrolledAt: "2024-01-11",
  },
  {
    id: "bg-0123",
    displayName: "Tanuja",
    schoolId: "thanchi-high-school",
    grade: 7,
    community: "tanchangya",
    quote: "I want to learn enough English to write letters to my pen pal.",
    consent: pending,
    sponsorshipStatus: "sponsored",
    enrolledAt: "2024-09-01",
  },
  {
    id: "bg-0131",
    displayName: "Jyoti",
    schoolId: "bandarban-school",
    grade: 10,
    community: "bawm",
    quote: "The best part of school is the morning hour, before it gets loud.",
    consent: revoked,
    sponsorshipStatus: "sponsored",
    enrolledAt: "2020-01-14",
  },
];

export function getSpotlightStudents(limit = 6): Student[] {
  return students.slice(0, limit);
}
