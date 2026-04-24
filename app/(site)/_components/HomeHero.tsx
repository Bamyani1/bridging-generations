"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CoralArc } from "@/components/motif/CoralArc";
import { Button } from "@/components/ui/Button";
import type { StatsSnapshot } from "@/lib/content/statsSnapshot";

type HomeHeroProps = {
  stats: StatsSnapshot;
  ein: string;
};

const SMOOTH = [0.16, 1, 0.3, 1] as const;
const WORD_EASE = [0.22, 1, 0.36, 1] as const;

const HEADLINE_START_MS = 200;
const WORD_STAGGER_MS = 70;
const WORD_DURATION_MS = 450;
const ARC_OFFSET_AFTER_WORDS_MS = 200;
const ARC_DURATION_MS = 900;
const SUBTITLE_OFFSET_AFTER_WORDS_MS = 200;
const SUBTITLE_DURATION_MS = 600;
const CTA_OFFSET_AFTER_SUBTITLE_MS = 400;
const CTA_DURATION_MS = 500;
const EIN_OFFSET_AFTER_CTA_MS = 200;
const EIN_DURATION_MS = 500;
const ITALIC_OFFSET_AFTER_EIN_MS = 600;
const ITALIC_DURATION_MS = 500;

const EIN_PLACEHOLDER = "00-0000000";

type WordPosition = { word: string; globalIndex: number; isLineEnd: boolean };

function splitHeadline(lines: string[]): WordPosition[][] {
  let globalIndex = 0;
  return lines.map((line) => {
    const words = line.split(/\s+/).filter(Boolean);
    return words.map((word, i) => ({
      word,
      globalIndex: globalIndex++,
      isLineEnd: i === words.length - 1,
    }));
  });
}

export function HomeHero({ stats, ein }: HomeHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasHydrated, setHasHydrated] = useState(false);
  const canAnimate = hasHydrated && !shouldReduceMotion;

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const wordLines = splitHeadline(stats.homeHeroHeadline.split("\n"));
  const wordCount = wordLines.reduce((acc, line) => acc + line.length, 0);
  const lastWordEndMs =
    HEADLINE_START_MS + Math.max(0, wordCount - 1) * WORD_STAGGER_MS + WORD_DURATION_MS;
  const arcStartMs = lastWordEndMs + ARC_OFFSET_AFTER_WORDS_MS;
  const subtitleStartMs = lastWordEndMs + SUBTITLE_OFFSET_AFTER_WORDS_MS;
  const ctaStartMs = subtitleStartMs + CTA_OFFSET_AFTER_SUBTITLE_MS;
  const einStartMs = ctaStartMs + EIN_OFFSET_AFTER_CTA_MS;
  const italicStartMs = einStartMs + ITALIC_OFFSET_AFTER_EIN_MS;

  const slideUp = (delayMs: number, durationMs: number) =>
    canAnimate
      ? {
          initial: false,
          animate: { opacity: [0, 1], y: [12, 0] },
          transition: { duration: durationMs / 1000, delay: delayMs / 1000, ease: SMOOTH },
        }
      : undefined;

  const fadeIn = (delayMs: number, durationMs: number) =>
    canAnimate
      ? {
          initial: false,
          animate: { opacity: [0, 1] },
          transition: { duration: durationMs / 1000, delay: delayMs / 1000, ease: SMOOTH },
        }
      : undefined;

  const scaleUp = (delayMs: number, durationMs: number) =>
    canAnimate
      ? {
          initial: false,
          animate: { opacity: [0, 1], scale: [0.96, 1] },
          transition: { duration: durationMs / 1000, delay: delayMs / 1000, ease: SMOOTH },
        }
      : undefined;

  const einHasRealValue = Boolean(ein) && ein !== EIN_PLACEHOLDER;
  const einTrustLine = einHasRealValue
    ? `501(c)(3) · EIN ${ein} · Tax-deductible · No personal-data cookies`
    : `501(c)(3) · Tax-deductible · No personal-data cookies`;

  return (
    <section
      id="hero"
      aria-labelledby="home-hero-title"
      className="relative scroll-mt-20 bg-ground"
    >
      <div className="mx-auto grid min-h-[90vh] max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:min-h-[600px] lg:grid-cols-2 lg:gap-16 lg:px-[6%] lg:py-0">
        <div className="kenburns relative aspect-[3/2] w-full overflow-hidden bg-ground-3 lg:order-1 lg:aspect-auto lg:h-full">
          <Image
            src="/home-hero.jpg"
            alt="Students in a Bangladesh classroom hold up their drawings beside their teacher"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ filter: "grayscale(20%) sepia(10%) saturate(1.02)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top_right,var(--color-ground-3)_0%,transparent_45%)]"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 lg:order-2 lg:max-w-[56ch] lg:py-16">
          <motion.p className="text-eyebrow uppercase text-accent" {...slideUp(100, 600)}>
            {stats.homeHeroEyebrow}
          </motion.p>
          <motion.h1 id="home-hero-title" className="text-balance text-display-1 text-ink">
            {wordLines.map((lineWords) => (
              <span key={lineWords.map((w) => w.word).join(" ")} className="block">
                {lineWords.map(({ word, globalIndex, isLineEnd }) => (
                  <span key={globalIndex}>
                    <motion.span
                      className="inline-block"
                      initial={canAnimate ? { opacity: 0, y: 24, filter: "blur(4px)" } : false}
                      animate={canAnimate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                      transition={{
                        duration: WORD_DURATION_MS / 1000,
                        delay: (HEADLINE_START_MS + globalIndex * WORD_STAGGER_MS) / 1000,
                        ease: WORD_EASE,
                      }}
                    >
                      {word}
                    </motion.span>
                    {isLineEnd ? null : " "}
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>
          <motion.div
            aria-hidden="true"
            className="-mt-3 w-full"
            style={{ transformOrigin: "left" }}
            initial={canAnimate ? { scaleX: 0 } : false}
            animate={canAnimate ? { scaleX: 1 } : undefined}
            transition={{
              duration: ARC_DURATION_MS / 1000,
              delay: arcStartMs / 1000,
              ease: SMOOTH,
            }}
          >
            <CoralArc className="block w-full" />
          </motion.div>
          <motion.p
            className="max-w-[28ch] text-body-lg text-ink-2"
            {...slideUp(subtitleStartMs, SUBTITLE_DURATION_MS)}
          >
            {stats.homeHeroSubhead}
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" {...scaleUp(ctaStartMs, CTA_DURATION_MS)}>
            <Button variant="primary" href="/donate">
              Sponsor a Student
            </Button>
            <Button variant="secondary" href="/projects">
              Our Programs
            </Button>
          </motion.div>
          <motion.p
            className="text-meta uppercase text-ink-2"
            {...fadeIn(einStartMs, EIN_DURATION_MS)}
          >
            {einTrustLine}
          </motion.p>
          <motion.p
            className="mt-4 text-note text-ink-2"
            {...fadeIn(italicStartMs, ITALIC_DURATION_MS)}
          >
            — Written from Rangamati. 156 students, 5 schools, and every name on the next page.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
