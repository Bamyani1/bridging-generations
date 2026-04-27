"use client";

import { useEffect, useRef, useState } from "react";

type DonateMobileCtaBarProps = {
  amountSuggestion: number;
  href: string;
  /** ID of the element above which the bar stays hidden (the in-hero amount input). */
  heroSentinelId: string;
  /** Optional ID of an element below which the bar stays hidden (typically the footer). */
  footerSentinelId?: string;
};

export function DonateMobileCtaBar({
  amountSuggestion,
  href,
  heroSentinelId,
  footerSentinelId,
}: DonateMobileCtaBarProps) {
  const [visible, setVisible] = useState(false);
  const heroVisible = useRef(true);
  const footerVisible = useRef(false);

  useEffect(() => {
    const update = () => {
      setVisible(!heroVisible.current && !footerVisible.current);
    };

    const heroEl = document.getElementById(heroSentinelId);
    const heroObs = heroEl
      ? new IntersectionObserver(
          ([entry]) => {
            heroVisible.current = entry.isIntersecting;
            update();
          },
          { threshold: 0 },
        )
      : null;
    if (heroEl && heroObs) heroObs.observe(heroEl);

    const footerEl = footerSentinelId ? document.getElementById(footerSentinelId) : null;
    const footerObs = footerEl
      ? new IntersectionObserver(
          ([entry]) => {
            footerVisible.current = entry.isIntersecting;
            update();
          },
          { threshold: 0 },
        )
      : null;
    if (footerEl && footerObs) footerObs.observe(footerEl);

    return () => {
      heroObs?.disconnect();
      footerObs?.disconnect();
    };
  }, [heroSentinelId, footerSentinelId]);

  return (
    <section
      aria-label="Donate"
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-hairline bg-ground/95 px-4 py-3 backdrop-blur-md transition-opacity duration-150 motion-reduce:transition-none lg:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <a
        href={href}
        className="flex min-h-[48px] w-full items-center justify-center bg-accent-2 px-5 text-[17px] font-bold text-white shadow-[var(--shadow-cta)] transition hover:bg-accent-2-hover focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
      >
        Sponsor a student — ${amountSuggestion}/mo
      </a>
    </section>
  );
}
