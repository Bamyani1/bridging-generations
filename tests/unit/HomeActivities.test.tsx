import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { HomeActivities } from "@/app/(site)/_components/HomeActivities";
import { getRecentActivities } from "@/content/fixtures/activities";

describe("HomeActivities", () => {
  it("renders section landmark wired via aria-labelledby", () => {
    const { container } = render(<HomeActivities />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-activities-title");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Recent activities");
  });

  it("renders two most-recent activity cards", () => {
    render(<HomeActivities />);
    const recent = getRecentActivities(2);
    expect(recent).toHaveLength(2);
    for (const a of recent) {
      expect(screen.getByText(a.title)).toBeInTheDocument();
    }
  });

  it("renders the 'See all activities' tertiary link", () => {
    render(<HomeActivities />);
    const link = screen.getByRole("link", { name: /see all activities/i });
    expect(link).toHaveAttribute("href", "/activities");
  });
});
