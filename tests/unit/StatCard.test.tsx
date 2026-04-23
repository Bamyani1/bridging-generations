import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "@/components/domain/StatCard";

describe("StatCard", () => {
  it("renders the label text", () => {
    render(<StatCard value={156} label="Students sponsored" />);
    expect(screen.getByText("Students sponsored")).toBeInTheDocument();
  });

  it("keeps the final value accessible to screen readers", () => {
    const { container } = render(<StatCard value={156} label="Students" />);
    const srOnly = container.querySelector(".sr-only");
    expect(srOnly).not.toBeNull();
    expect(srOnly).toHaveTextContent("156");
  });

  it("hides the animated visual from assistive tech", () => {
    const { container } = render(<StatCard value={156} label="Students" />);
    const visual = container.querySelector('[aria-hidden="true"]');
    expect(visual).not.toBeNull();
  });

  it("shows the final value when prefers-reduced-motion matches", () => {
    const { container } = render(<StatCard value={156} label="Students" />);
    const visual = container.querySelector('[aria-hidden="true"]');
    expect(visual).toHaveTextContent("156");
  });
});
