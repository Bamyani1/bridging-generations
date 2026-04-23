import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockMatchMediaAdd, mockRevert, mockSet, mockTimelineTo, mockTimeline } = vi.hoisted(() => {
  const to = vi.fn();
  to.mockReturnThis();
  const timeline = vi.fn(() => ({ to }));
  return {
    mockMatchMediaAdd: vi.fn(),
    mockRevert: vi.fn(),
    mockSet: vi.fn(),
    mockTimelineTo: to,
    mockTimeline: timeline,
  };
});

vi.mock("gsap", () => ({
  gsap: {
    matchMedia: () => ({ add: mockMatchMediaAdd, revert: mockRevert }),
    set: mockSet,
    timeline: mockTimeline,
  },
}));

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image is stubbed to a plain img for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { HomeHero } from "@/app/(site)/_components/HomeHero";
import { siteSettings } from "@/content/fixtures/siteSettings";
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

describe("HomeHero", () => {
  beforeEach(() => {
    mockMatchMediaAdd.mockClear();
    mockRevert.mockClear();
    mockSet.mockClear();
    mockTimelineTo.mockClear();
    mockTimeline.mockClear();
  });

  it("renders each headline line", () => {
    render(<HomeHero stats={stats} />);
    for (const line of stats.homeHeroHeadline.split("\n")) {
      expect(screen.getByText(line)).toBeInTheDocument();
    }
  });

  it("renders the headline as the page h1", () => {
    render(<HomeHero stats={stats} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "home-hero-title");
  });

  it("wires the hero section landmark to the h1 via aria-labelledby", () => {
    const { container } = render(<HomeHero stats={stats} />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-hero-title");
    expect(container.querySelector("#home-hero-title")).not.toBeNull();
  });

  it("renders the subhead copy", () => {
    render(<HomeHero stats={stats} />);
    expect(screen.getByText(stats.homeHeroSubhead)).toBeInTheDocument();
  });

  it("renders dual CTAs linking to /donate and /projects", () => {
    render(<HomeHero stats={stats} />);
    expect(screen.getByRole("link", { name: "Sponsor a Student" })).toHaveAttribute(
      "href",
      "/donate",
    );
    expect(screen.getByRole("link", { name: "Our Programs" })).toHaveAttribute("href", "/projects");
  });

  it("renders the 501(c)(3) reassurance line with the fixture EIN", () => {
    const { container } = render(<HomeHero stats={stats} />);
    expect(container.textContent).toContain("501(c)(3)");
    expect(container.textContent).toContain(`EIN ${siteSettings.ein}`);
    expect(container.textContent).toContain("Tax-deductible");
    expect(container.textContent).toContain("No personal-data cookies");
  });

  it("gives the hero image a descriptive alt", () => {
    render(<HomeHero stats={stats} />);
    const img = screen.getByAltText(
      "Students in a Bangladesh classroom hold up their drawings beside their teacher",
    );
    expect(img).toBeInTheDocument();
  });

  it("registers a gsap.matchMedia branch for reduced and full motion", () => {
    render(<HomeHero stats={stats} />);
    expect(mockMatchMediaAdd).toHaveBeenCalledTimes(1);
    const [mediaQueries] = mockMatchMediaAdd.mock.calls[0];
    expect(mediaQueries).toEqual({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    });
  });

  it("runs the entrance timeline when reduceMotion is false", () => {
    render(<HomeHero stats={stats} />);
    const callback = mockMatchMediaAdd.mock.calls[0][1] as (ctx: {
      conditions: { reduceMotion: boolean; fullMotion: boolean };
    }) => void;
    callback({ conditions: { reduceMotion: false, fullMotion: true } });
    expect(mockSet).toHaveBeenCalled();
    expect(mockTimeline).toHaveBeenCalledTimes(1);
  });

  it("skips the entrance timeline when reduceMotion is true", () => {
    render(<HomeHero stats={stats} />);
    const callback = mockMatchMediaAdd.mock.calls[0][1] as (ctx: {
      conditions: { reduceMotion: boolean; fullMotion: boolean };
    }) => void;
    callback({ conditions: { reduceMotion: true, fullMotion: false } });
    expect(mockSet).not.toHaveBeenCalled();
    expect(mockTimeline).not.toHaveBeenCalled();
  });
});
