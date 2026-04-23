import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeStatsTrio } from "@/app/(site)/_components/HomeStatsTrio";
import type { StatsSnapshot } from "@/lib/content/statsSnapshot";

const stats: StatsSnapshot = {
  studentCount: 156,
  schoolCount: 5,
  donorCount: 110,
  homeHeroEyebrow: "The Chittagong Hill Tracts",
  homeHeroHeadline: "156 students.\n5 schools.\nOne promise kept.",
  homeHeroSubhead: "Test subhead.",
};

describe("HomeStatsTrio", () => {
  it("renders three stat cards with prop values", () => {
    const { container } = render(<HomeStatsTrio stats={stats} />);
    const srValues = Array.from(container.querySelectorAll(".sr-only")).map((el) => el.textContent);
    expect(srValues).toContain(String(stats.studentCount));
    expect(srValues).toContain(String(stats.schoolCount));
    expect(srValues).toContain(String(stats.donorCount));
  });

  it("renders each stat label", () => {
    render(<HomeStatsTrio stats={stats} />);
    expect(screen.getByText("Students sponsored")).toBeInTheDocument();
    expect(screen.getByText("Partner schools")).toBeInTheDocument();
    expect(screen.getByText("Donors & counting")).toBeInTheDocument();
  });

  it("names the section via aria-label", () => {
    const { container } = render(<HomeStatsTrio stats={stats} />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-label", "Program reach at a glance");
  });
});
