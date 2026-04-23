import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout/Footer";

describe("Footer", () => {
  it("renders the brand block with tagline and address", () => {
    render(<Footer />);
    expect(screen.getByText("Bridging Generations")).toBeInTheDocument();
    expect(
      screen.getByText(/Sponsoring 156 students across the Chittagong Hill Tracts/i),
    ).toBeInTheDocument();
  });

  it("renders all four section headings", () => {
    render(<Footer />);
    for (const heading of ["Explore", "Resources", "Contact"]) {
      expect(screen.getByText(heading)).toBeInTheDocument();
    }
  });

  it("renders representative column links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Email us" })).toHaveAttribute(
      "href",
      "mailto:info@bridginggenerations.org",
    );
  });

  it("renders the legal Terms link in the bottom bar", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Terms" })).toHaveAttribute("href", "/terms");
  });

  it("renders the current year in the copyright line", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument();
  });
});
