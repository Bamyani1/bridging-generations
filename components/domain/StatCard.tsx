"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AmberMark } from "@/components/motif/AmberMark";
import { useRevealVisible } from "@/components/ui/RevealVisibleContext";
import { easeOutSmooth } from "@/lib/motion/easing";

type StatCardProps = {
  value: number;
  label: string;
  delay?: number;
};

const DURATION_MS = 1200;
const MARK_TRANSITION = "transform 500ms var(--ease-smooth)";

export function StatCard({ value, label, delay = 0 }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState(value);
  // markVisible defaults to true: SSR + reduced-motion both skip the count-up
  // effect, so the AmberMark must already be at full extent on first paint.
  // The full-motion path drops it to false alongside setDisplayed(0), then flips
  // back to true at the final raf tick — CSS transition does the 500ms scale-in.
  const [markVisible, setMarkVisible] = useState(true);
  // null when rendered outside a Reveal kind="count-up-wrapper". A boolean means the
  // wrapper is coordinating our trigger — wait for it to flip true instead of self-observing.
  const externalVisible = useRevealVisible();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    setDisplayed(0);
    setMarkVisible(false);

    let rafId = 0;
    let timeoutId = 0;

    const startCountUp = () => {
      timeoutId = window.setTimeout(() => {
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / DURATION_MS);
          const eased = easeOutSmooth(progress);
          setDisplayed(Math.round(eased * value));
          if (progress < 1) {
            rafId = requestAnimationFrame(tick);
          } else {
            setMarkVisible(true);
          }
        };
        rafId = requestAnimationFrame(tick);
      }, delay);
    };

    if (externalVisible !== null) {
      // Coordinated path — wait for the count-up-wrapper to fire.
      if (externalVisible) startCountUp();
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }

    // Standalone path — self-observe as before.
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          startCountUp();
          return;
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [value, delay, externalVisible]);

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <span aria-hidden="true" className="text-center font-normal text-accent-2 text-heading-3">
          —
        </span>
        <span className="text-balance text-display-2 leading-none text-accent-2-text tabular-nums">
          <span className="relative inline-block">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[0.1em] block h-[0.5em] origin-left"
              style={{
                transform: markVisible ? "scaleX(1)" : "scaleX(0)",
                transition: MARK_TRANSITION,
              }}
            >
              <AmberMark className="block h-full w-full" />
            </span>
            <span aria-hidden="true" className="relative">
              {displayed}
            </span>
          </span>
          <span className="sr-only">{value}</span>
        </span>
      </div>
      <span className="text-eyebrow uppercase text-ink-2">{label}</span>
    </div>
  );
}
