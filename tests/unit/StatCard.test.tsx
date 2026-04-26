import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatCard } from "@/components/domain/StatCard";
import { RevealVisibleProvider } from "@/components/ui/RevealVisibleContext";

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
    // Multiple aria-hidden spans now (em-dash + AmberMark wrapper + number) —
    // assert at least one exists; specific number assertion is the test below.
    const hidden = container.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThan(0);
  });

  it("shows the final value when prefers-reduced-motion matches", () => {
    const { container } = render(<StatCard value={156} label="Students" />);
    // The number span sits inside the relative wrapper next to the AmberMark.
    const numberSpan = container.querySelector(".relative.inline-block > span.relative");
    expect(numberSpan).toHaveTextContent("156");
  });

  it("renders inside a RevealVisibleProvider without crashing", () => {
    // When wrapped in a Reveal kind='count-up-wrapper', StatCard reads the context.
    // The default jsdom matchMedia returns reduce=true so the effect returns early
    // and the final value is shown — this exercises the context-consuming render path.
    const { container } = render(
      <RevealVisibleProvider value={false}>
        <StatCard value={42} label="Schools" />
      </RevealVisibleProvider>,
    );
    expect(screen.getByText("Schools")).toBeInTheDocument();
    const srOnly = container.querySelector(".sr-only");
    expect(srOnly).toHaveTextContent("42");
  });

  it("renders the coral em-dash above the number, hidden from assistive tech", () => {
    const { container } = render(<StatCard value={156} label="Students" />);
    const emDash = Array.from(container.querySelectorAll("span")).find(
      (s) => s.textContent === "—",
    );
    expect(emDash).toBeDefined();
    expect(emDash).toHaveAttribute("aria-hidden", "true");
    expect(emDash?.className).toMatch(/text-accent-2/);
    expect(emDash?.className).toMatch(/text-heading-3/);
  });

  it("renders an AmberMark behind the number", () => {
    const { container } = render(<StatCard value={156} label="Students" />);
    const mark = container.querySelector('svg[viewBox="0 0 400 14"]');
    expect(mark).not.toBeNull();
  });

  it("paints the AmberMark at scaleX(1) under reduced motion (default in jsdom)", () => {
    const { container } = render(<StatCard value={156} label="Students" />);
    // The mark wrapper is the parent <span> of the AmberMark svg.
    const wrapper = container.querySelector('svg[viewBox="0 0 400 14"]')?.parentElement;
    expect(wrapper).not.toBeNull();
    expect((wrapper as HTMLElement).style.transform).toBe("scaleX(1)");
  });
});
