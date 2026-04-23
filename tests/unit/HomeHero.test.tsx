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

  it("renders each headline line", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    for (const line of stats.homeHeroHeadline.split("\n")) {
      expect(screen.getByText(line)).toBeInTheDocument();
    }
  });

  it("renders the headline as the page h1", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "home-hero-title");
    expect(heading).toHaveClass("text-display-1");
  });

  it("wires the hero section landmark to the h1 via aria-labelledby", () => {
    const { container } = render(<HomeHero stats={stats} ein={ein} />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-hero-title");
    expect(container.querySelector("#home-hero-title")).not.toBeNull();
  });

  it("renders the subhead copy", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByText(stats.homeHeroSubhead)).toBeInTheDocument();
  });

  it("renders dual CTAs linking to /donate and /projects", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByRole("link", { name: "Sponsor a Student" })).toHaveAttribute(
      "href",
      "/donate",
    );
    expect(screen.getByRole("link", { name: "Our Programs" })).toHaveAttribute("href", "/projects");
  });

  it("renders the 501(c)(3) reassurance line with the prop EIN", () => {
    const { container } = render(<HomeHero stats={stats} ein={ein} />);
    expect(container.textContent).toContain("501(c)(3)");
    expect(container.textContent).toContain(`EIN ${ein}`);
    expect(container.textContent).toContain("Tax-deductible");
    expect(container.textContent).toContain("No personal-data cookies");
  });

  it("gives the hero image a descriptive alt", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    const img = screen.getByAltText(
      "Students in a Bangladesh classroom hold up their drawings beside their teacher",
    );
    expect(img).toBeInTheDocument();
  });

  it("applies the signature image motion and depth overlay", () => {
    render(<HomeHero stats={stats} ein={ein} />);
    const img = screen.getByAltText(
      "Students in a Bangladesh classroom hold up their drawings beside their teacher",
    );
    const imagePanel = img.parentElement;
    expect(imagePanel).toHaveClass("kenburns");
    const overlay = imagePanel?.querySelector('[aria-hidden="true"]');
    expect(overlay).not.toBeNull();
    expect(overlay?.getAttribute("class")).toContain("linear-gradient");
  });

  it("renders correctly when reduced motion is preferred", () => {
    mockUseReducedMotion.mockReturnValue(true);
    render(<HomeHero stats={stats} ein={ein} />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(stats.homeHeroSubhead)).toBeInTheDocument();
  });
});
