import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    width,
    height,
  }: {
    alt: string;
    src: string;
    width: number;
    height: number;
  }) => (
    // biome-ignore lint/performance/noImgElement: next/image stubbed for jsdom
    <img alt={alt} src={typeof src === "string" ? src : ""} width={width} height={height} />
  ),
}));

import { GalleryItem } from "@/components/domain/GalleryItem";
import type { GalleryImage } from "@/lib/content/galleryImages";

const sample: GalleryImage = {
  id: "classroom-morning",
  caption: "Morning class in Rangamati",
  image: { src: "/images/gallery/classroom-morning.jpg", alt: "Students in a classroom" },
  width: 1600,
  height: 1067,
  takenAt: "2026-02-14",
  location: "Rangamati",
};

describe("GalleryItem", () => {
  it("renders the image with intrinsic width and height", () => {
    render(<GalleryItem item={sample} />);
    const img = screen.getByRole("img", { name: "Students in a classroom" });
    expect(img).toHaveAttribute("width", "1600");
    expect(img).toHaveAttribute("height", "1067");
  });

  it("opens in a new tab with noopener", () => {
    render(<GalleryItem item={sample} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveAttribute("href", "/images/gallery/classroom-morning.jpg");
  });

  it("includes the caption and location in a decorative overlay", () => {
    render(<GalleryItem item={sample} />);
    expect(screen.getByText("Morning class in Rangamati")).toBeInTheDocument();
    expect(screen.getByText("Rangamati")).toBeInTheDocument();
  });

  it("falls back to caption text when alt is missing", () => {
    const withoutAlt: GalleryImage = {
      ...sample,
      image: { src: sample.image.src, alt: "" },
    };
    render(<GalleryItem item={withoutAlt} />);
    expect(screen.getByRole("img", { name: "Morning class in Rangamati" })).toBeInTheDocument();
  });
});
