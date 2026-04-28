"use client";

import { type ReactNode, useEffect, useRef } from "react";

type SheetDrawerProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Required — labels the drawer for assistive tech. */
  ariaLabel: string;
  /** Edge to anchor against. Defaults to "right". */
  side?: "right" | "left";
};

/**
 * Edge-anchored drawer built on the native <dialog> element.
 *
 * Native showModal() gives us:
 * - focus trap (browser-managed)
 * - ESC-close fires the "cancel" event
 * - inert background
 *
 * We add:
 * - body scroll lock while open
 * - backdrop-click-to-close (click on the dialog element itself)
 * - the .drawer-sheet animation (R4.9 keyframes in globals.css)
 *
 * Consumers control content; render their own close button inside
 * children for explicit dismissal.
 */
export function SheetDrawer({
  open,
  onClose,
  children,
  ariaLabel,
  side = "right",
}: SheetDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync open/close with native dialog API.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  // Body + html scroll lock while open. <html> is the scrolling element in
  // standards mode, so locking only body leaves the page scrollable via wheel
  // input. Lock both — restore both — so the drawer doesn't double as a
  // wormhole that lets the underlying page scroll on tap.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [open]);

  // ESC (native cancel event) + backdrop click.
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    const handleClick = (e: MouseEvent) => {
      // Fire only when the click target IS the dialog (the backdrop area),
      // not its inner content.
      if (e.target === el) onClose();
    };
    el.addEventListener("cancel", handleCancel);
    el.addEventListener("click", handleClick);
    return () => {
      el.removeEventListener("cancel", handleCancel);
      el.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={ariaLabel}
      className={[
        "m-0 max-h-none max-w-none p-0",
        "fixed inset-y-0 h-dvh w-[min(85vw,360px)]",
        side === "right" ? "right-0 ml-auto" : "left-0 mr-auto",
        "bg-ground border-hairline",
        side === "right" ? "border-l" : "border-r",
        "drawer-sheet",
        "backdrop:bg-ink/40 backdrop:backdrop-blur-sm",
      ].join(" ")}
    >
      <div className="h-full overflow-y-auto">{children}</div>
    </dialog>
  );
}
