"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { useEffect, useId, useRef, useState } from "react";
import { donateCta, primaryNav } from "@/content/fixtures/navigation";

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavProps = {
  tagline?: string;
  contactEmail?: string;
};

export function Nav({ tagline, contactEmail }: NavProps = {}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const hasOpenedRef = useRef(false);
  const titleId = useId();
  const isOnDonate = pathname?.startsWith("/donate") ?? false;

  useEffect(() => {
    if (open) {
      hasOpenedRef.current = true;
      closeBtnRef.current?.focus({ preventScroll: true });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }
    if (hasOpenedRef.current) hamburgerRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", trap);
    return () => panel.removeEventListener("keydown", trap);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    // <html> is the scrolling element in standards mode, so locking only body
    // leaves the page scrollable. Lock both — restore both — so the menu doesn't
    // double as a wormhole that lets the underlying page scroll on tap.
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

  return (
    <>
      <nav aria-label="Primary" className="fixed inset-x-0 top-0 z-50 h-16 bg-accent">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-[6%]">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center text-heading-6 font-bold tracking-[-0.005em] text-white transition-colors hover:text-accent-3"
          >
            Bridging Generations
          </Link>
          <ul className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={
                      active
                        ? "text-nav-link font-bold uppercase text-white underline decoration-accent-3 decoration-1 underline-offset-[6px] transition-colors"
                        : "text-nav-link uppercase text-white transition-colors hover:text-accent-3"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            {!isOnDonate && (
              <li>
                <Link
                  href={donateCta.href}
                  className="text-nav-link font-bold uppercase text-white transition-colors hover:text-accent-3"
                >
                  {donateCta.label}
                </Link>
              </li>
            )}
          </ul>
          <div className="flex items-center gap-1 lg:hidden">
            {!isOnDonate && (
              <Link
                href={donateCta.href}
                onClick={() => setOpen(false)}
                className="inline-flex min-h-[44px] items-center px-3 text-nav-link font-bold uppercase text-white transition-colors hover:text-accent-3"
              >
                {donateCta.label}
              </Link>
            )}
            <button
              ref={hamburgerRef}
              type="button"
              aria-expanded={open}
              aria-controls={open ? "mobile-menu" : undefined}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex size-11 items-center justify-center text-white transition-colors hover:text-accent-3"
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {open && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Dismiss menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 top-16 bottom-0 z-30 bg-ink/50"
          />
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] w-full overflow-y-auto bg-ground shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex flex-col px-6 py-6">
              <div className="flex items-start justify-between gap-4 pb-6">
                <div>
                  <p id={titleId} className="text-heading-6 font-bold text-ink">
                    Bridging Generations
                  </p>
                  {tagline ? <p className="mt-2 text-body-sm text-ink-2">{tagline}</p> : null}
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="-mr-2 flex size-11 shrink-0 items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
              <ul className="flex flex-col gap-3 border-t border-hairline pt-6">
                {primaryNav.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li
                      key={item.href}
                      className="menu-item-in"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={
                          active
                            ? "flex min-h-[44px] items-center text-heading-5 font-bold text-accent transition-colors"
                            : "flex min-h-[44px] items-center text-heading-5 text-ink transition-colors"
                        }
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {contactEmail ? (
                <p className="mt-6 border-t border-hairline pt-6 text-body-sm text-ink-2">
                  Questions?{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-accent underline underline-offset-[3px] transition-colors hover:no-underline"
                  >
                    {contactEmail}
                  </a>
                </p>
              ) : null}
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-hairline pt-6 text-eyebrow uppercase text-ink-2">
                <li>
                  <Link
                    href="/terms"
                    onClick={() => setOpen(false)}
                    className="transition-colors hover:text-accent"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
