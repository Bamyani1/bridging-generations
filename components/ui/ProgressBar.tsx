type ProgressBarProps = {
  percentage: number;
  label?: string;
  tone?: "default" | "funded";
  className?: string;
};

export function ProgressBar({ percentage, label, tone = "default", className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, percentage));
  const isFunded = tone === "funded" || clamped >= 100;
  const displayLabel = isFunded ? "Fully funded — thank you" : label;
  const accessibleLabel = displayLabel ?? `${clamped} percent funded`;

  return (
    <div className={className}>
      {displayLabel && (
        <div className="mb-2 flex items-baseline justify-between text-body-sm">
          <span className={isFunded ? "text-accent" : undefined}>{displayLabel}</span>
          {!isFunded && <span className="text-ink-2">{clamped}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isFunded ? 100 : clamped}
        aria-label={accessibleLabel}
        className="relative h-2 w-full bg-hairline"
      >
        <div
          className="absolute top-0 left-0 h-full bg-accent"
          style={{ width: `${isFunded ? 100 : clamped}%` }}
        />
        {!isFunded && clamped > 0 && (
          <span
            aria-hidden="true"
            className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-2"
            style={{ left: `${clamped}%` }}
          />
        )}
      </div>
    </div>
  );
}
