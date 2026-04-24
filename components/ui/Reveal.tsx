"use client";

import { Children, type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import { HandDrawnUnderline } from "@/components/motif/HandDrawnUnderline";
import { RevealVisibleProvider } from "./RevealVisibleContext";

const CASCADE_MAX_MS = 600;
const CASCADE_DEFAULT_MS = 150;

type Stagger = "up" | "left" | "right" | "scale-in";
type RevealKind = "default" | "develop" | "draw-underline" | "count-up-wrapper";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  stagger?: Stagger;
  cascade?: boolean;
  cascadeDelay?: number;
  className?: string;
  kind?: RevealKind;
};

export function Reveal({
  children,
  delay = 0,
  stagger,
  cascade = false,
  cascadeDelay = CASCADE_DEFAULT_MS,
  className,
  kind = "default",
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
  if (kind !== "default") dataAttrs["data-reveal-kind"] = kind;

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

  const body =
    kind === "count-up-wrapper" ? (
      <RevealVisibleProvider value={visible}>{content}</RevealVisibleProvider>
    ) : (
      content
    );

  return (
    <div ref={ref} className={classes} style={style} {...dataAttrs}>
      {body}
      {kind === "draw-underline" ? <HandDrawnUnderline className="reveal-underline" /> : null}
    </div>
  );
}
