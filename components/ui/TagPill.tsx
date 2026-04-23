import type { ReactNode } from "react";
import { StatusDot } from "./StatusDot";

type TagPillProps = {
  children: ReactNode;
  variant?: "default" | "live";
  statusVariant?: "active" | "pending";
  className?: string;
};

export function TagPill({
  children,
  variant = "default",
  statusVariant = "active",
  className,
}: TagPillProps) {
  const base = "inline-flex items-center gap-2 rounded-full px-3 py-1 text-eyebrow uppercase";
  const variantClass = variant === "live" ? "bg-ground-2 text-accent" : "bg-ground-3 text-accent";
  return (
    <span className={`${base} ${variantClass}${className ? ` ${className}` : ""}`}>
      {variant === "live" ? <StatusDot variant={statusVariant} /> : null}
      {children}
    </span>
  );
}
