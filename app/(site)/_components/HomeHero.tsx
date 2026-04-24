"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AmberMark } from "@/components/motif/AmberMark";
import { CoralArc } from "@/components/motif/CoralArc";
import { CornerBracket } from "@/components/motif/CornerBracket";
import { TealPaperclip } from "@/components/motif/TealPaperclip";
import { Button } from "@/components/ui/Button";
import type { StatsSnapshot } from "@/lib/content/statsSnapshot";

type HomeHeroProps = {
  stats: StatsSnapshot;
  ein: string;
};

const SMOOTH = [0.16, 1, 0.3, 1] as const;
const STAMP_EASE = [0.34, 1.56, 0.64, 1] as const;

const POLAROID_DURATION = 550;
const PAPERCLIP_DELAY = 220;
const PAPERCLIP_DURATION = 550;
const BRACKETS_DELAY = 320;
const BRACKETS_DURATION = 420;
const BADGE_DELAY = 520;
const BADGE_DURATION = 520;
const DISPATCH_DELAY = 300;
const DISPATCH_DURATION = 500;
const NUMERALS_START = 520;
const NUMERAL_LINE_STAGGER = 140;
const NUMERAL_DURATION = 520;
const NOUN_OFFSET = 120;
const NOUN_DURATION = 420;
const CLOSING_LINE_DELAY = 980;
const CLOSING_LINE_DURATION = 520;
const ARC_DELAY = 1240;
const ARC_DURATION = 720;
const LEDE_DELAY = 1380;
const LEDE_DURATION = 500;
const CTA_DELAY = 1520;
const CTA_DURATION = 460;
const ITALIC_DELAY = 1680;
const ITALIC_DURATION = 500;
const TRUST_DELAY = 1780;
const TRUST_DURATION = 500;

const EIN_PLACEHOLDER = "00-0000000";
const DISPATCH_NUMBER = "01";
const POLAROID_DATELINE = "RANGAMATI — MARCH '26";

type NumeralLine = { numeral: string; noun: string };

function splitHeadline(headline: string): { numeralLines: NumeralLine[]; closing: string } {
  const lines = headline
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const firstTwo = lines.slice(0, 2);
  const closing = lines.slice(2).join(" ") || lines[lines.length - 1] || "";
  const numeralLines: NumeralLine[] = firstTwo.map((line) => {
    const match = line.match(/^(\S+)\s+(.+)$/);
    return match ? { numeral: match[1], noun: match[2] } : { numeral: line, noun: "" };
  });
  return { numeralLines, closing };
}

export function HomeHero({ stats, ein }: HomeHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasHydrated, setHasHydrated] = useState(false);
  const canAnimate = hasHydrated && !shouldReduceMotion;

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const { numeralLines, closing } = splitHeadline(stats.homeHeroHeadline);
  const einHasRealValue = Boolean(ein) && ein !== EIN_PLACEHOLDER;
  const einTrustLine = einHasRealValue
    ? `501(c)(3) · EIN ${ein} · Tax-deductible`
    : `501(c)(3) · Tax-deductible`;

  return (
    <section
      id="hero"
      aria-labelledby="home-hero-title"
      className="relative scroll-mt-20 overflow-hidden bg-ground"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-[6%] py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:py-24">
        {/* LEFT — the polaroid */}
        <div className="relative lg:order-1">
          <motion.div
            className="relative mx-auto w-full max-w-[420px] bg-white p-3 pb-11 shadow-[0_18px_48px_rgba(30,30,30,0.14),0_2px_6px_rgba(30,30,30,0.08)] lg:ml-auto lg:mr-0 lg:max-w-[520px] lg:p-3.5 lg:pb-12"
            style={{ transformOrigin: "center" }}
            initial={canAnimate ? { opacity: 0, y: 16, rotate: 0, scale: 0.98 } : false}
            animate={canAnimate ? { opacity: 1, y: 0, rotate: -0.8, scale: 1 } : { rotate: -0.8 }}
            transition={{ duration: POLAROID_DURATION / 1000, ease: SMOOTH }}
          >
            <motion.div
              className="pointer-events-none absolute left-10 top-[-22px] z-10"
              initial={canAnimate ? { opacity: 0, scale: 0.7, rotate: -14 } : false}
              animate={canAnimate ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
              transition={{
                duration: PAPERCLIP_DURATION / 1000,
                delay: PAPERCLIP_DELAY / 1000,
                ease: STAMP_EASE,
              }}
            >
              <TealPaperclip className="h-11 w-7" />
            </motion.div>

            <motion.div
              initial={canAnimate ? { opacity: 0 } : false}
              animate={canAnimate ? { opacity: 1 } : undefined}
              transition={{
                duration: BRACKETS_DURATION / 1000,
                delay: BRACKETS_DELAY / 1000,
                ease: SMOOTH,
              }}
            >
              <CornerBracket>
                <div className="relative overflow-hidden bg-ground-3">
                  <Image
                    src="/home-hero.jpg"
                    alt="Students in a Bangladesh classroom hold up their drawings beside their teacher"
                    width={1040}
                    height={1300}
                    priority
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="block aspect-[4/5] h-auto w-full object-cover"
                    style={{ filter: "grayscale(10%) sepia(5%) saturate(1.05)" }}
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom_left,rgba(30,30,30,0.22)_0%,transparent_42%)]"
                  />
                </div>
              </CornerBracket>
            </motion.div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between lg:bottom-3.5 lg:left-5 lg:right-5">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-2">
                {POLAROID_DATELINE}
              </span>
              <motion.span
                aria-hidden="true"
                className="flex size-7 items-center justify-center rounded-full bg-accent-3 text-[9px] font-bold leading-none text-ink"
                initial={canAnimate ? { opacity: 0, rotate: -12 } : false}
                animate={canAnimate ? { opacity: 1, rotate: 0 } : undefined}
                transition={{
                  duration: BADGE_DURATION / 1000,
                  delay: BADGE_DELAY / 1000,
                  ease: STAMP_EASE,
                }}
              >
                N°{DISPATCH_NUMBER}
              </motion.span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — dispatch text */}
        <div className="flex flex-col gap-5 lg:order-2 lg:gap-6">
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={canAnimate ? { opacity: 0, x: -12 } : false}
            animate={canAnimate ? { opacity: 1, x: 0 } : undefined}
            transition={{
              duration: DISPATCH_DURATION / 1000,
              delay: DISPATCH_DELAY / 1000,
              ease: SMOOTH,
            }}
          >
            <span className="inline-flex items-center border-[1.5px] border-ink px-2.5 py-0.5 text-[11px] font-bold uppercase leading-none tracking-[0.22em] text-ink">
              Dispatch {DISPATCH_NUMBER}
            </span>
            <span className="text-eyebrow uppercase text-ink-2">{stats.homeHeroEyebrow}</span>
          </motion.div>

          <h1 id="home-hero-title" className="text-ink">
            {numeralLines.map((line, idx) => (
              <span key={line.numeral + line.noun} className="flex items-baseline gap-4">
                <motion.span
                  className="text-display-0 inline-block font-bold tabular-nums tracking-[-0.03em]"
                  style={{ lineHeight: 0.92 }}
                  initial={canAnimate ? { opacity: 0, scale: 0.92, y: 8 } : false}
                  animate={canAnimate ? { opacity: 1, scale: 1, y: 0 } : undefined}
                  transition={{
                    duration: NUMERAL_DURATION / 1000,
                    delay: (NUMERALS_START + idx * NUMERAL_LINE_STAGGER) / 1000,
                    ease: STAMP_EASE,
                  }}
                >
                  {line.numeral}
                </motion.span>
                <motion.span
                  className="inline-block text-heading-3 font-medium text-ink-2"
                  initial={canAnimate ? { opacity: 0, x: -6 } : false}
                  animate={canAnimate ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    duration: NOUN_DURATION / 1000,
                    delay: (NUMERALS_START + idx * NUMERAL_LINE_STAGGER + NOUN_OFFSET) / 1000,
                    ease: SMOOTH,
                  }}
                >
                  {line.noun}
                </motion.span>
              </span>
            ))}
            <span className="mt-1 inline-block max-w-fit">
              <motion.span
                className="block text-[40px] font-bold leading-[1.04] tracking-[-0.018em] lg:text-[52px]"
                initial={canAnimate ? { opacity: 0, y: 10 } : false}
                animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: CLOSING_LINE_DURATION / 1000,
                  delay: CLOSING_LINE_DELAY / 1000,
                  ease: SMOOTH,
                }}
              >
                {closing}
              </motion.span>
              <motion.span
                aria-hidden="true"
                className="-mt-1.5 block"
                style={{ transformOrigin: "left" }}
                initial={canAnimate ? { scaleX: 0 } : false}
                animate={canAnimate ? { scaleX: 1 } : undefined}
                transition={{
                  duration: ARC_DURATION / 1000,
                  delay: ARC_DELAY / 1000,
                  ease: SMOOTH,
                }}
              >
                <CoralArc className="block w-full" />
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="max-w-[42ch] text-body-lg text-ink-2"
            initial={canAnimate ? { opacity: 0, y: 8 } : false}
            animate={canAnimate ? { opacity: 1, y: 0 } : undefined}
            transition={{
              duration: LEDE_DURATION / 1000,
              delay: LEDE_DELAY / 1000,
              ease: SMOOTH,
            }}
          >
            {stats.homeHeroSubhead}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-x-6 gap-y-4"
            initial={canAnimate ? { opacity: 0, scale: 0.96 } : false}
            animate={canAnimate ? { opacity: 1, scale: 1 } : undefined}
            transition={{
              duration: CTA_DURATION / 1000,
              delay: CTA_DELAY / 1000,
              ease: SMOOTH,
            }}
          >
            <Button
              variant="primary"
              href="/donate"
              className="shadow-[0_10px_30px_rgba(231,111,81,0.38),0_2px_6px_rgba(231,111,81,0.2)] hover:shadow-[0_14px_36px_rgba(231,111,81,0.45),0_3px_8px_rgba(231,111,81,0.22)]"
            >
              Sponsor a Student
              <span
                aria-hidden="true"
                className="transition-transform motion-safe:group-hover:translate-x-1"
              >
                →
              </span>
            </Button>
            <Link
              href="/projects"
              className="border-b-2 border-accent-2 pb-0.5 text-[13px] font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
            >
              Our programs
            </Link>
          </motion.div>

          <motion.p
            className="mt-2 max-w-[40ch] text-note text-ink-2"
            initial={canAnimate ? { opacity: 0 } : false}
            animate={canAnimate ? { opacity: 1 } : undefined}
            transition={{
              duration: ITALIC_DURATION / 1000,
              delay: ITALIC_DELAY / 1000,
              ease: SMOOTH,
            }}
          >
            — Written from Rangamati. Every name on the next page.
          </motion.p>

          <motion.div
            className="mt-1 flex items-center gap-3"
            initial={canAnimate ? { opacity: 0 } : false}
            animate={canAnimate ? { opacity: 1 } : undefined}
            transition={{
              duration: TRUST_DURATION / 1000,
              delay: TRUST_DELAY / 1000,
              ease: SMOOTH,
            }}
          >
            <AmberMark className="block h-2.5 w-16 shrink-0" />
            <p className="text-meta uppercase text-ink-2">{einTrustLine}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
