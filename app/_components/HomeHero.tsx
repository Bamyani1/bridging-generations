"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { siteSettings } from "@/content/fixtures/siteSettings";
import { statsSnapshot } from "@/content/fixtures/statsSnapshot";

export function HomeHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const reassuranceRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduceMotion: "(prefers-reduced-motion: reduce)",
        fullMotion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const conditions = context.conditions as
          | { reduceMotion: boolean; fullMotion: boolean }
          | undefined;
        if (!conditions || conditions.reduceMotion) return;
        const copyEls: HTMLElement[] = [
          eyebrowRef.current,
          headlineRef.current,
          subheadRef.current,
          ctasRef.current,
          reassuranceRef.current,
        ].filter((el): el is NonNullable<typeof el> => el !== null);
        gsap.set(imageRef.current, { opacity: 0, scale: 1.04 });
        gsap.set(copyEls, { opacity: 0, y: 12 });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.to(imageRef.current, { opacity: 1, scale: 1, duration: 1.2 }, 0)
          .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.1)
          .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
          .to(subheadRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
          .to(ctasRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.55)
          .to(reassuranceRef.current, { opacity: 1, duration: 0.5 }, 0.8);
      },
    );

    return () => mm.revert();
  }, []);

  const headlineLines = statsSnapshot.homeHeroHeadline.split("\n");

  return (
    <section aria-labelledby="home-hero-title" className="relative bg-ground">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-20 sm:px-6 lg:h-[min(80vh,720px)] lg:grid-cols-2 lg:gap-16 lg:px-[6%] lg:py-0">
        <div
          ref={imageRef}
          className="relative aspect-[3/2] w-full overflow-hidden bg-ground-3 lg:order-1 lg:aspect-auto lg:h-full"
        >
          <Image
            src="/home-hero.jpg"
            alt="Students in a Bangladesh classroom hold up their drawings beside their teacher"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 lg:order-2 lg:max-w-[56ch] lg:py-16">
          <p ref={eyebrowRef} className="text-eyebrow uppercase text-accent">
            {statsSnapshot.homeHeroEyebrow}
          </p>
          <h1
            id="home-hero-title"
            ref={headlineRef}
            className="text-balance text-display-1 text-ink"
          >
            {headlineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p ref={subheadRef} className="max-w-[28ch] text-body-lg text-ink-2">
            {statsSnapshot.homeHeroSubhead}
          </p>
          <div ref={ctasRef} className="flex flex-wrap gap-3">
            <Button variant="primary" href="/donate">
              Sponsor a Student
            </Button>
            <Button variant="secondary" href="/projects">
              Our Programs
            </Button>
          </div>
          <p ref={reassuranceRef} className="text-meta uppercase text-ink-2">
            501(c)(3) · EIN {siteSettings.ein} · Tax-deductible · No personal-data cookies
          </p>
        </div>
      </div>
    </section>
  );
}
