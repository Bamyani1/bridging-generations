import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { ProgramCard } from "@/components/domain/ProgramCard";
import type { Project } from "@/lib/content/projects";

const sample: Project = {
  id: "demo-project",
  title: "Demo project",
  summary: "A short summary for the demo project.",
  body: "Body text.",
  fundingGoal: 10000,
  fundingRaised: 4200,
  status: "active",
  heroImage: { src: "/demo.jpg", alt: "Demo image" },
  order: 1,
};

describe("ProgramCard", () => {
  it("renders the project title and summary", () => {
    render(<ProgramCard project={sample} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Demo project");
    expect(screen.getByText(sample.summary)).toBeInTheDocument();
  });

  it("renders the image with descriptive alt", () => {
    render(<ProgramCard project={sample} />);
    expect(screen.getByAltText("Demo image")).toBeInTheDocument();
  });

  it("computes a WCAG-valid progressbar for an active project", () => {
    render(<ProgramCard project={sample} />);
    const bar = screen.getByRole("progressbar");
    expect(bar).toHaveAttribute("aria-valuenow", "42");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "100");
  });

  it("shows 'Fully funded' label when status is funded", () => {
    render(
      <ProgramCard
        project={{ ...sample, status: "funded", fundingRaised: 10000, fundingGoal: 10000 }}
      />,
    );
    expect(screen.getByText(/fully funded/i)).toBeInTheDocument();
  });

  it("renders a support link pointing at /projects", () => {
    render(<ProgramCard project={sample} />);
    const links = screen.getAllByRole("link");
    for (const link of links) {
      expect(link).toHaveAttribute("href", "/projects");
    }
  });
});
