import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { StudentCard } from "@/components/domain/StudentCard";
import type { Student } from "@/content/fixtures/students";
import type { StudentConsent } from "@/lib/content/canShowPortrait";

const granted: StudentConsent = {
  portraitReleaseStatus: "granted",
  storyReleaseStatus: "granted",
  consentScope: ["website"],
  revokable: true,
};

const pending: StudentConsent = {
  portraitReleaseStatus: "pending",
  storyReleaseStatus: "pending",
  consentScope: [],
  revokable: true,
};

const withPortrait: Student = {
  id: "demo-1",
  displayName: "Anika",
  schoolId: "demo-school",
  grade: 8,
  community: "marma",
  quote: "Short aspiration.",
  portrait: { src: "/demo.jpg", alt: "Portrait of a smiling student" },
  consent: granted,
  sponsorshipStatus: "sponsored",
};

const withoutConsent: Student = {
  ...withPortrait,
  id: "demo-2",
  displayName: "Tanuja",
  consent: pending,
};

describe("StudentCard", () => {
  it("renders the displayName as the heading (first name only)", () => {
    render(<StudentCard student={withPortrait} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Anika");
  });

  it("renders the portrait when consent allows", () => {
    render(<StudentCard student={withPortrait} />);
    expect(screen.getByAltText("Portrait of a smiling student")).toBeInTheDocument();
  });

  it("renders the StudentPlaceholder when consent is not granted for website", () => {
    render(<StudentCard student={withoutConsent} />);
    expect(screen.getByRole("img", { name: /portrait not shown/i })).toBeInTheDocument();
    expect(screen.queryByAltText("Portrait of a smiling student")).toBeNull();
  });

  it("renders grade and community meta", () => {
    render(<StudentCard student={withPortrait} />);
    expect(screen.getByText(/Grade 8 · marma/)).toBeInTheDocument();
  });
});
