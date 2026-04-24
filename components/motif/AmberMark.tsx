type AmberMarkProps = {
  className?: string;
};

// `preserveAspectRatio="none"` stretches this motif to the caller's className width.
// Consumers must provide an explicit width (e.g. `w-full`) or it collapses to 0.
export function AmberMark({ className }: AmberMarkProps) {
  return (
    <svg
      viewBox="0 0 400 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
      className={className}
      style={{ color: "var(--color-accent-3)" }}
    >
      <rect
        x="2"
        y="1"
        width="396"
        height="10"
        rx="5"
        fill="currentColor"
        opacity="0.42"
        transform="skewX(-3)"
      />
    </svg>
  );
}
