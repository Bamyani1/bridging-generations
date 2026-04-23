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

import { HomeHero } from "@/app/_components/HomeHero";
import { siteSettings } from "@/content/fixtures/siteSettings";
import { statsSnapshot } from "@/content/fixtures/statsSnapshot";

describe("HomeHero", () => {
  beforeEach(() => {
    mockMatchMediaAdd.mockClear();
    mockRevert.mockClear();
    mockSet.mockClear();
    mockTimelineTo.mockClear();
    mockTimeline.mockClear();
  });

  it("renders each headline line", () => {
    render(<HomeHero />);
    for (const line of statsSnapshot.homeHeroHeadline.split("\n")) {
      expect(screen.getByText(line)).toBeInTheDocument();
    }
  });

  it("renders the headline as the page h1", () => {
    render(<HomeHero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveAttribute("id", "home-hero-title");
  });

  it("wires the hero section landmark to the h1 via aria-labelledby", () => {
    const { container } = render(<HomeHero />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-hero-title");
    expect(container.querySelector("#home-hero-title")).not.toBeNull();
  });

  it("renders the subhead copy", () => {
    render(<HomeHero />);
    expect(screen.getByText(statsSnapshot.homeHeroSubhead)).toBeInTheDocument();
  });

  it("renders dual CTAs linking to /donate and /projects", () => {
    render(<HomeHero />);
    expect(screen.getByRole("link", { name: "Sponsor a Student" })).toHaveAttribute(
      "href",
      "/donate",
    );
    expect(screen.getByRole("link", { name: "Our Programs" })).toHaveAttribute("href", "/projects");
  });

  it("renders the 501(c)(3) reassurance line with the fixture EIN", () => {
    const { container } = render(<HomeHero />);
    expect(container.textContent).toContain("501(c)(3)");
    expect(container.textContent).toContain(`EIN ${siteSettings.ein}`);
    expect(container.textContent).toContain("Tax-deductible");
    expect(container.textContent).toContain("No personal-data cookies");
  });

  it("gives the hero image a descriptive alt", () => {
    render(<HomeHero />);
    const img = screen.getByAltText(
      "Students in a Bangladesh classroom hold up their drawings beside their teacher",
    );
    expect(img).toBeInTheDocument();
  });

  it("registers a gsap.matchMedia branch for reduced and full motion", () => {
    render(<HomeHero />);
    expect(mockMatchMediaAdd).toHaveBeenCalledTimes(1);
    const [mediaQueries] = mockMatchMediaAdd.mock.calls[0];
    expect(mediaQueries).toEqual({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    });
  });

  it("runs the entrance timeline when reduceMotion is false", () => {
    render(<HomeHero />);
    const callback = mockMatchMediaAdd.mock.calls[0][1] as (ctx: {
      conditions: { reduceMotion: boolean; fullMotion: boolean };
    }) => void;
    callback({ conditions: { reduceMotion: false, fullMotion: true } });
    expect(mockSet).toHaveBeenCalled();
    expect(mockTimeline).toHaveBeenCalledTimes(1);
  });

  it("skips the entrance timeline when reduceMotion is true", () => {
    render(<HomeHero />);
    const callback = mockMatchMediaAdd.mock.calls[0][1] as (ctx: {
      conditions: { reduceMotion: boolean; fullMotion: boolean };
    }) => void;
    callback({ conditions: { reduceMotion: true, fullMotion: false } });
    expect(mockSet).not.toHaveBeenCalled();
    expect(mockTimeline).not.toHaveBeenCalled();
  });
});
