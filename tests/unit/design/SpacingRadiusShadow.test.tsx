import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RadiusSection } from "@/app/design/_components/RadiusSection";
import { ShadowSection } from "@/app/design/_components/ShadowSection";
import { SpacingSection } from "@/app/design/_components/SpacingSection";

describe("SpacingSection", () => {
  it("renders all section-rhythm tokens", () => {
    render(<SpacingSection />);
    for (const token of [
      "--space-section-sm",
      "--space-section-md",
      "--space-section-lg",
      "--space-section-xl",
    ]) {
      expect(screen.getByText(token)).toBeInTheDocument();
    }
    expect(screen.getByText("--space-container-x")).toBeInTheDocument();
  });
});

describe("RadiusSection", () => {
  it("renders all four radius tokens", () => {
    render(<RadiusSection />);
    for (const token of ["--radius-sm", "--radius-md", "--radius-lg", "--radius-full"]) {
      expect(screen.getByText(token)).toBeInTheDocument();
    }
  });
});

describe("ShadowSection", () => {
  it("renders all three shadow tokens", () => {
    render(<ShadowSection />);
    for (const token of ["--shadow-card", "--shadow-card-hover", "--shadow-cta"]) {
      expect(screen.getByText(token)).toBeInTheDocument();
    }
  });
});
