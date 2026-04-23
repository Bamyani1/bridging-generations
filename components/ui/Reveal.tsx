"use client";

import { Children, type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";

const CASCADE_MAX_MS = 600;
const CASCADE_DEFAULT_MS = 150;

type Stagger = "up" | "left" | "right" | "scale-in";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  stagger?: Stagger;
  cascade?: boolean;
  cascadeDelay?: number;
  className?: string;
};

export function Reveal({
  children,
  delay = 0,
  stagger,
  cascade = false,
  cascadeDelay = CASCADE_DEFAULT_MS,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = `reveal-on-scroll${visible ? " is-visible" : ""}${
    className ? ` ${className}` : ""
  }`;
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;
  const dataAttrs: Record<string, string> = {};
  if (stagger) dataAttrs["data-reveal-stagger"] = stagger;
  if (cascade) dataAttrs["data-reveal-cascade"] = "";

  const content = cascade
    ? Children.map(children, (child, index) => {
        const itemDelay = Math.min(index * cascadeDelay, CASCADE_MAX_MS);
        return (
          <div data-reveal-item="" style={{ "--reveal-delay": `${itemDelay}ms` } as CSSProperties}>
            {child}
          </div>
        );
      })
    : children;

  return (
    <div ref={ref} className={classes} style={style} {...dataAttrs}>
      {content}
    </div>
  );
}
