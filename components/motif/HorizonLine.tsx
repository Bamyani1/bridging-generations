type HorizonLineProps = {
  className?: string;
  tone?: "on-cream" | "on-teal";
};

// `preserveAspectRatio="none"` lets the hills silhouette stretch to the caller's width.
// Consumers must provide an explicit width (e.g. `w-full`) or it collapses to 0.
export function HorizonLine({ className, tone = "on-cream" }: HorizonLineProps) {
  const base = tone === "on-cream" ? "var(--color-accent)" : "#ffffff";
  const fillOpacity = tone === "on-cream" ? 0.08 : 0.06;
  const strokeOpacity = tone === "on-cream" ? 0.6 : 0.4;
  return (
    <svg
      viewBox="0 0 1440 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
      style={{ color: base }}
    >
      <path
        d="M0 90 Q 180 40 360 70 T 720 60 T 1080 80 T 1440 70 L 1440 120 L 0 120 Z"
        fill="currentColor"
        opacity={fillOpacity}
      />
      <path
        d="M0 88 Q 180 38 360 68 T 720 58 T 1080 78 T 1440 68"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity={strokeOpacity}
      />
    </svg>
  );
}
