import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeStatsTrio } from "@/app/(site)/_components/HomeStatsTrio";
import { statsSnapshot } from "@/content/fixtures/statsSnapshot";

describe("HomeStatsTrio", () => {
  it("renders three stat cards with fixture values", () => {
    const { container } = render(<HomeStatsTrio />);
    const srValues = Array.from(container.querySelectorAll(".sr-only")).map((el) => el.textContent);
    expect(srValues).toContain(String(statsSnapshot.studentCount));
    expect(srValues).toContain(String(statsSnapshot.schoolCount));
    expect(srValues).toContain(String(statsSnapshot.donorCount));
  });

  it("renders each stat label", () => {
    render(<HomeStatsTrio />);
    expect(screen.getByText("Students sponsored")).toBeInTheDocument();
    expect(screen.getByText("Partner schools")).toBeInTheDocument();
    expect(screen.getByText("Donors & counting")).toBeInTheDocument();
  });

  it("names the section via aria-label", () => {
    const { container } = render(<HomeStatsTrio />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-label", "Program reach at a glance");
  });
});
