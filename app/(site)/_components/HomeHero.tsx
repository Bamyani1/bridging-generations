"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { StatsSnapshot } from "@/lib/content/statsSnapshot";

type HomeHeroProps = {
  stats: StatsSnapshot;
  ein: string;
};

const SMOOTH = [0.16, 1, 0.3, 1] as const;

export function HomeHero({ stats, ein }: HomeHeroProps) {
  const shouldReduceMotion = useReducedMotion();
  const headlineLines = stats.homeHeroHeadline.split("\n");

  const slideUp = (delay: number, duration: number) =>
    shouldReduceMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: SMOOTH },
        };

  return (
    <section aria-labelledby="home-hero-title" className="relative bg-ground">
      <div className="mx-auto grid min-h-[90vh] max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:min-h-[600px] lg:grid-cols-2 lg:gap-16 lg:px-[6%] lg:py-0">
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-ground-3 lg:order-1 lg:aspect-auto lg:h-full">
          <Image
            src="/home-hero.jpg"
            alt="Students in a Bangladesh classroom hold up their drawings beside their teacher"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            style={{ filter: "grayscale(20%) sepia(10%) saturate(1.02)" }}
          />
        </div>
        <div className="flex flex-col justify-center gap-6 lg:order-2 lg:max-w-[56ch] lg:py-16">
          <motion.p className="text-eyebrow uppercase text-accent" {...slideUp(0.1, 0.6)}>
            {stats.homeHeroEyebrow}
          </motion.p>
          <motion.h1
            id="home-hero-title"
            className="text-balance text-display-2 text-ink"
            {...slideUp(0.2, 0.7)}
          >
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>
          <motion.p className="max-w-[28ch] text-body-lg text-ink-2" {...slideUp(0.4, 0.6)}>
            {stats.homeHeroSubhead}
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" {...slideUp(0.55, 0.5)}>
            <Button variant="primary" href="/donate">
              Sponsor a Student
            </Button>
            <Button variant="secondary" href="/projects">
              Our Programs
            </Button>
          </motion.div>
          <motion.p
            className="text-meta uppercase text-ink-2"
            {...(shouldReduceMotion
              ? {}
              : {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  transition: { duration: 0.5, delay: 0.8, ease: SMOOTH },
                })}
          >
            501(c)(3) · EIN {ein} · Tax-deductible · No personal-data cookies
          </motion.p>
        </div>
      </div>
    </section>
  );
}
