"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { easeOutSmooth } from "@/lib/motion/easing";

type DonorCountBadgeProps = {
  count: number;
  label: string;
};

const DURATION_MS = 1200;

export function DonorCountBadge({ count, label }: DonorCountBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(count);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setDisplayed(0);

    const el = ref.current;
    if (!el) return;

    let rafId = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / DURATION_MS);
            const eased = easeOutSmooth(progress);
            setDisplayed(Math.round(eased * count));
            if (progress < 1) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
          return;
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [count]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${count} ${label}`}
      className="flex flex-col items-center gap-4 bg-ground-3 px-6 py-16 text-center lg:px-12 lg:py-24"
    >
      <span className="text-balance text-display-1 leading-none text-accent-2-text tabular-nums">
        <span aria-hidden="true">{displayed}</span>
        <span className="sr-only">{count}</span>
      </span>
      <span className="text-eyebrow uppercase tracking-[0.1em] text-ink-2">{label}</span>
    </div>
  );
}
