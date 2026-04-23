import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image is stubbed to a plain img for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { HomeMissionBand } from "@/app/(site)/_components/HomeMissionBand";

const missionFull =
  "Bridging Generations empowers underprivileged children in the Chittagong Hill Tracts through education sponsorship — tuition, books, meals, and the structural support that keeps students in the classroom instead of the workforce.";

describe("HomeMissionBand", () => {
  it("renders the full mission copy as the section h2", () => {
    render(<HomeMissionBand missionFull={missionFull} />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveAttribute("id", "home-mission-title");
    expect(heading).toHaveTextContent(missionFull);
  });

  it("wires the section landmark to the h2 via aria-labelledby", () => {
    const { container } = render(<HomeMissionBand missionFull={missionFull} />);
    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "home-mission-title");
    expect(container.querySelector("#home-mission-title")).not.toBeNull();
  });

  it("renders an 'Our mission' eyebrow label", () => {
    render(<HomeMissionBand missionFull={missionFull} />);
    expect(screen.getByText("Our mission")).toBeInTheDocument();
  });

  it("renders the image with a descriptive alt", () => {
    render(<HomeMissionBand missionFull={missionFull} />);
    expect(
      screen.getByAltText("A schoolboy in uniform sits in a library corner reading a book"),
    ).toBeInTheDocument();
  });

  it("wraps copy and image in two Reveal containers with a 150ms stagger", () => {
    const { container } = render(<HomeMissionBand missionFull={missionFull} />);
    const reveals = container.querySelectorAll(".reveal-on-scroll");
    expect(reveals).toHaveLength(2);
    const second = reveals[1] as HTMLElement;
    expect(second.style.transitionDelay).toBe("150ms");
  });
});
