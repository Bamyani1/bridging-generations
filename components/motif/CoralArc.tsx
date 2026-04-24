type CoralArcProps = {
  className?: string;
  tone?: "accent-2" | "accent";
};

export function CoralArc({ className, tone = "accent-2" }: CoralArcProps) {
  return (
    <svg
      viewBox="0 0 280 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
      style={{ color: tone === "accent-2" ? "var(--color-accent-2)" : "var(--color-accent)" }}
    >
      <path
        d="M4 32 C 60 8, 220 8, 276 30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}
