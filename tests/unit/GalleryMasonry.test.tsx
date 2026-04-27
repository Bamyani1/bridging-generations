import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom
    <img alt={alt} src={typeof src === "string" ? src : ""} />
  ),
}));

import { GalleryMasonry } from "@/components/domain/GalleryMasonry";
import type { GalleryImage } from "@/lib/content/galleryImages";

const items: GalleryImage[] = [
  {
    id: "one",
    caption: "One",
    image: { src: "/one.jpg", alt: "One" },
    width: 800,
    height: 600,
    takenAt: "2026-01-01",
    location: "A",
    photographerCredit: "",
  },
  {
    id: "two",
    caption: "Two",
    image: { src: "/two.jpg", alt: "Two" },
    width: 600,
    height: 800,
    takenAt: "2026-01-02",
    location: "B",
    photographerCredit: "",
  },
];

describe("GalleryMasonry", () => {
  it("renders every item", () => {
    render(<GalleryMasonry items={items} />);
    expect(screen.getByRole("img", { name: "One" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Two" })).toBeInTheDocument();
  });

  it("renders an empty-state message when no items are supplied", () => {
    render(<GalleryMasonry items={[]} />);
    expect(screen.getByText("No photographs yet.")).toBeInTheDocument();
  });
});
