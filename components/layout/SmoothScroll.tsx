"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = requestAnimationFrame(function tick(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    });

    const onPrefChange = () => {
      if (mq.matches) {
        cancelAnimationFrame(raf);
        lenis.destroy();
      }
    };
    mq.addEventListener("change", onPrefChange);

    return () => {
      mq.removeEventListener("change", onPrefChange);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
