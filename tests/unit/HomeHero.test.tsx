import { render, screen } from "@testing-library/react";
import type { ComponentProps, ReactNode } from "react";
import { createElement } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockUseReducedMotion } = vi.hoisted(() => ({
  mockUseReducedMotion: vi.fn(() => false),
}));

vi.mock("motion/react", () => {
  type AnyProps = { children?: ReactNode } & Record<string, unknown>;
  const stripMotion = ({
    initial: _initial,
    animate: _animate,
    exit: _exit,
    transition: _transition,
    layout: _layout,
    ...rest
  }: AnyProps) => rest;
  const factory = (tag: string) => (props: AnyProps) => createElement(tag, stripMotion(props));
  return {
    motion: new Proxy({} as Record<string, ReturnType<typeof factory>>, {
      get: (_target, prop: string) => factory(prop),
    }),
    useReducedMotion: () => mockUseReducedMotion(),
  };
});

vi.mock("next/image", () => ({
  default: ({ alt, src }: ComponentProps<"img">) => (
    // biome-ignore lint/performance/noImgElement: next/image is stubbed to a plain img for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { HomeHero } from "@/app/(site)/_components/HomeHero";
import type { StatsSnapshot } from "@/lib/content/statsSnapshot";

const stats: StatsSnapshot = {
  studentCount: 156,
  schoolCount: 5,
  donorCount: 110,
  homeHeroEyebrow: "The Chittagong Hill Tracts",
  homeHeroHeadline: "156 students.\n5 schools.\nOne promise kept.",
  homeHeroSubhead:
    "Tuition, books, daily meals, and the materials they need — so the classroom stays the place every one of them belongs.",
};

const ein = "00-0000000";

describe("HomeHero", () => {
  beforeEach(() => {
    mockUseReducedMotion.mockReset();
    mockUseReducedMotion.mockReturnValue(false);
  });

  it("wires the hero landmark to the h1 via aria-labelledby", () => {
    const { container } = render(<HomeHero stats={stats} ein={ein} />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-hero-title");
    expect(container.querySelector("#home-hero-title")).not.toBeNull();
  });

  it("renders the dispatch number badge and the eyebrow", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByText(/Dispatch 01/i)).toBeInTheDocument();
    expect(screen.getByText(stats.homeHeroEyebrow)).toBeInTheDocument();
  });

  it("renders numerals and their paired nouns for the first two headline lines", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByText("156")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("students.")).toBeInTheDocument();
    expect(screen.getByText("schools.")).toBeInTheDocument();
  });

  it("renders the closing headline line with a CoralArc underneath", () => {
    const { container } = render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByText("One promise kept.")).toBeInTheDocument();
    const arc = container.querySelector('svg[viewBox="0 0 280 40"]');
    expect(arc).not.toBeNull();
    expect(arc).toHaveAttribute("aria-hidden", "true");
  });

  it("renders the subhead copy", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByText(stats.homeHeroSubhead)).toBeInTheDocument();
  });

  it("renders the primary CTA linking to /donate and the Our programs text link", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByRole("link", { name: /Sponsor a Student/i })).toHaveAttribute(
      "href",
      "/donate",
    );
    expect(screen.getByRole("link", { name: "Our programs" })).toHaveAttribute("href", "/projects");
  });

  it("omits the EIN number when the placeholder value is in use", () => {
    const { container } = render(<HomeHero stats={stats} ein="00-0000000" />);
    expect(container.textContent).toContain("501(c)(3)");
    expect(container.textContent).toContain("Tax-deductible");
    expect(container.textContent).not.toContain("EIN");
    expect(container.textContent).not.toContain("00-0000000");
  });

  it("prints the real EIN when a non-placeholder value is provided", () => {
    const { container } = render(<HomeHero stats={stats} ein="12-3456789" />);
    expect(container.textContent).toContain("EIN 12-3456789");
  });

  it("renders the italic voice inflection with the text-note class", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    const line = screen.getByText(/Written from Rangamati/);
    expect(line).toHaveClass("text-note");
  });

  it("renders the TealPaperclip, CornerBracket, and AmberMark motifs", () => {
    const { container } = render(<HomeHero stats={stats} ein={ein} />);
    expect(container.querySelector('svg[viewBox="0 0 24 40"]')).not.toBeNull();
    expect(container.querySelectorAll('svg[viewBox="0 0 28 28"]').length).toBe(4);
    expect(container.querySelector('svg[viewBox="0 0 400 14"]')).not.toBeNull();
  });

  it("renders the N°1 postmark badge and the polaroid dateline", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByText(/N°01/)).toBeInTheDocument();
    expect(screen.getByText(/RANGAMATI — MARCH '26/i)).toBeInTheDocument();
  });

  it("gives the hero image a descriptive alt", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    const img = screen.getByAltText(
      "Students in a Bangladesh classroom hold up their drawings beside their teacher",
    );
    expect(img).toBeInTheDocument();
  });

  it("renders correctly when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(stats.homeHeroSubhead)).toBeInTheDocument();
    expect(screen.getByText(/Written from Rangamati/)).toBeInTheDocument();
  });
});
