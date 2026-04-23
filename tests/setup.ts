import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { afterEach, vi } from "vitest";

vi.mock("next-view-transitions", () => ({
  Link: NextLink,
  ViewTransitions: ({ children }: { children: ReactNode }) => children,
}));

afterEach(() => {
  cleanup();
});
