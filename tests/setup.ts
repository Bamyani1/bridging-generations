import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { afterEach, vi } from "vitest";

vi.mock("next-view-transitions", () => ({
  Link: NextLink,
  ViewTransitions: ({ children }: { children: ReactNode }) => children,
}));

class StubIntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  readonly scrollMargin = "";
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
globalThis.IntersectionObserver =
  globalThis.IntersectionObserver ??
  (StubIntersectionObserver as unknown as typeof IntersectionObserver);

// Default matchMedia stub — reports prefers-reduced-motion: reduce so effects that
// animate don't schedule work during tests. Tests that need a different preference
// should reassign window.matchMedia in beforeEach.
if (typeof window !== "undefined" && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: query.includes("reduce"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

afterEach(() => {
  cleanup();
});
