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

  it("renders a 501(c)(3) trust line without the EIN when no ein is passed", () => {
    render(<Footer />);
    expect(screen.getByText(/501\(c\)\(3\) · Tax-deductible/)).toBeInTheDocument();
  });

  it("renders the EIN in the trust line when a real value is provided", () => {
    render(<Footer ein="12-3456789" />);
    expect(screen.getByText(/501\(c\)\(3\) · EIN 12-3456789 · Tax-deductible/)).toBeInTheDocument();
  });

  it("treats the placeholder ein as no ein in the trust line", () => {
    render(<Footer ein="00-0000000" />);
    expect(screen.getByText(/501\(c\)\(3\) · Tax-deductible/)).toBeInTheDocument();
    expect(screen.queryByText(/EIN/)).toBeNull();
  });
});
