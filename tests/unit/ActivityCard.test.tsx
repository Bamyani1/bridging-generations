import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { ActivityCard } from "@/components/domain/ActivityCard";
import type { Activity } from "@/lib/content/activities";

const sample: Activity = {
  id: "demo-activity",
  title: "A demo activity",
  excerpt: "A short description of what happened.",
  tag: "distribution",
  published: true,
  publishedAt: "2026-03-15",
  coverImage: { src: "/demo.jpg", alt: "Demo cover" },
  relatedProjectId: null,
};

describe("ActivityCard", () => {
  it("renders the activity title, excerpt, and tag", () => {
    render(<ActivityCard activity={sample} />);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("A demo activity");
    expect(screen.getByText(sample.excerpt)).toBeInTheDocument();
    expect(screen.getByText("distribution")).toBeInTheDocument();
  });

  it("renders a semantic <time> element for the date", () => {
    const { container } = render(<ActivityCard activity={sample} />);
    const time = container.querySelector("time");
    expect(time).not.toBeNull();
    expect(time).toHaveAttribute("datetime", "2026-03-15");
    expect(time).toHaveTextContent("March 15, 2026");
  });

  it("renders as a plain article without wrapping in a Link", () => {
    render(<ActivityCard activity={sample} />);
    expect(screen.queryByRole("link")).toBeNull();
  });
});
