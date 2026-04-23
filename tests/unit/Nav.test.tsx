import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/projects",
}));

import { Nav } from "@/components/layout/Nav";

describe("Nav", () => {
  it("renders a brand link to home", () => {
    render(<Nav />);
    expect(screen.getByRole("link", { name: /bridging generations/i })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("sets aria-current='page' on the active primary link", () => {
    render(<Nav />);
    const projects = screen.getByRole("link", { name: "Projects" });
    expect(projects).toHaveAttribute("aria-current", "page");
    const about = screen.getByRole("link", { name: "About" });
    expect(about).not.toHaveAttribute("aria-current");
  });

  it("renders a donate CTA linking to /donate", () => {
    render(<Nav />);
    const donate = screen.getByRole("link", { name: "Donate" });
    expect(donate).toHaveAttribute("href", "/donate");
  });

  it("renders a collapsed hamburger with aria-controls omitted until menu opens", () => {
    render(<Nav />);
    const hamburger = screen.getByRole("button", { name: /open menu/i });
    expect(hamburger).toHaveAttribute("aria-expanded", "false");
    expect(hamburger).not.toHaveAttribute("aria-controls");
  });
});
