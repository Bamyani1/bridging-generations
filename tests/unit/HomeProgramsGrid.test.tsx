import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { HomeProgramsGrid } from "@/app/(site)/_components/HomeProgramsGrid";
import { getFeaturedProjects } from "@/content/fixtures/projects";

describe("HomeProgramsGrid", () => {
  it("renders the section heading as an h2 wired via aria-labelledby", () => {
    const { container } = render(<HomeProgramsGrid />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-programs-title");
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "home-programs-title");
    expect(heading).toHaveTextContent("Our programs");
  });

  it("renders the eyebrow and 'See all programs' tertiary link", () => {
    render(<HomeProgramsGrid />);
    expect(screen.getByText("How we help")).toBeInTheDocument();
    const seeAll = screen.getByRole("link", { name: /see all programs/i });
    expect(seeAll).toHaveAttribute("href", "/projects");
  });

  it("renders two featured ProgramCards from the fixture", () => {
    render(<HomeProgramsGrid />);
    const featured = getFeaturedProjects(2);
    expect(featured).toHaveLength(2);
    for (const project of featured) {
      expect(screen.getByText(project.title)).toBeInTheDocument();
    }
  });
});
