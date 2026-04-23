import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TypographySection } from "@/app/design/_components/TypographySection";

describe("TypographySection", () => {
  it("renders all 14 type tier labels", () => {
    render(<TypographySection />);
    const expected = [
      "text-display-1",
      "text-display-2",
      "text-heading-1",
      "text-heading-2",
      "text-heading-3",
      "text-heading-4",
      "text-heading-5",
      "text-heading-6",
      "text-body-lg",
      "text-body",
      "text-body-sm",
      "text-meta",
      "text-eyebrow",
      "text-nav-link",
    ];
    for (const name of expected) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("shows signature desktop and mobile sample sizes", () => {
    render(<TypographySection />);
    expect(screen.getAllByText(/desktop/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/88px/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/mobile/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/64px/)[0]).toBeInTheDocument();
  });
});
