import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CornerBracket } from "@/components/motif/CornerBracket";

describe("CornerBracket", () => {
  it("renders exactly four aria-hidden bracket SVGs", () => {
    const { container } = render(<CornerBracket>content</CornerBracket>);
    const svgs = container.querySelectorAll("svg");
    expect(svgs).toHaveLength(4);
    for (const svg of svgs) {
      expect(svg).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("renders its children inside the frame", () => {
    render(<CornerBracket>inside the frame</CornerBracket>);
    expect(screen.getByText("inside the frame")).toBeInTheDocument();
  });

  it("applies className to the wrapper div alongside the relative class", () => {
    const { container } = render(<CornerBracket className="sentinel-class">x</CornerBracket>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("sentinel-class");
    expect(wrapper).toHaveClass("relative");
  });
});
