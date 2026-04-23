import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { HomeSpotlightScroller } from "@/app/(site)/_components/HomeSpotlightScroller";

describe("HomeSpotlightScroller", () => {
  it("renders section landmark wired via aria-labelledby", () => {
    const { container } = render(<HomeSpotlightScroller />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-spotlight-title");
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("The 156, up close");
  });

  it("surfaces the consent disclaimer near the scroller", () => {
    render(<HomeSpotlightScroller />);
    expect(screen.getByText(/signed, in-scope release/i)).toBeInTheDocument();
  });
});
