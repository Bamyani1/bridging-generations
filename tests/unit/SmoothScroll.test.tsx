import { render } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const destroy = vi.fn();
const raf = vi.fn();

vi.mock("lenis", () => ({
  default: class {
    destroy = destroy;
    raf = raf;
  },
}));

import { SmoothScroll } from "@/components/layout/SmoothScroll";

function mockMatchMedia(reduce: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: (query: string) => ({
      matches: query.includes("prefers-reduced-motion") ? reduce : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }),
  });
}

describe("SmoothScroll", () => {
  beforeEach(() => {
    destroy.mockReset();
    raf.mockReset();
  });

  it("skips Lenis setup when prefers-reduced-motion is set", () => {
    mockMatchMedia(true);
    const { unmount } = render(<SmoothScroll />);
    unmount();
    expect(destroy).not.toHaveBeenCalled();
  });

  it("initializes Lenis and tears it down on unmount", () => {
    mockMatchMedia(false);
    const { unmount } = render(<SmoothScroll />);
    unmount();
    expect(destroy).toHaveBeenCalledTimes(1);
  });
});
