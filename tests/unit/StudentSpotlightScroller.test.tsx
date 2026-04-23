import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { StudentSpotlightScroller } from "@/components/domain/StudentSpotlightScroller";
import { getSpotlightStudents } from "@/content/fixtures/students";

describe("StudentSpotlightScroller", () => {
  it("renders a scroll region with an accessible name", () => {
    const { container } = render(<StudentSpotlightScroller students={getSpotlightStudents(6)} />);
    const region = container.querySelector("section[aria-label][tabindex='0']");
    expect(region).not.toBeNull();
    expect(region?.getAttribute("aria-label")).toMatch(/student spotlight/i);
  });

  it("renders one list item per student", () => {
    render(<StudentSpotlightScroller students={getSpotlightStudents(6)} />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(6);
  });
});
