import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom tests
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { ProjectListItem } from "@/app/(site)/projects/_components/ProjectListItem";
import type { Project } from "@/lib/content/projects";

const project: Project = {
  id: "demo",
  title: "Demo",
  summary: "Summary",
  body: "Body",
  fundingGoal: 1000,
  fundingRaised: 400,
  status: "active",
  heroImage: { src: "/p.jpg", alt: "p" },
  order: 1,
};

describe("ProjectListItem breakout variant", () => {
  it("default variant does not apply the breakout class to the image wrapper", () => {
    const { container } = render(<ProjectListItem project={project} />);
    const wrapper = container.querySelector(".aspect-\\[4\\/3\\]");
    expect(wrapper?.className).not.toContain("-ml-[6%]");
  });

  it("breakout variant applies lg:-ml-[6%] on the image wrapper", () => {
    const { container } = render(<ProjectListItem project={project} variant="breakout" />);
    const wrapper = container.querySelector(".aspect-\\[4\\/3\\]");
    expect(wrapper?.className).toContain("-ml-[6%]");
  });
});
