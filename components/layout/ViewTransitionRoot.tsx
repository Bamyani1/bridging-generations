import { ViewTransitions } from "next-view-transitions";
import type { ReactNode } from "react";

export function ViewTransitionRoot({ children }: { children: ReactNode }) {
  return <ViewTransitions>{children}</ViewTransitions>;
}
