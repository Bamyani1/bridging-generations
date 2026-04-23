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

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) return;
    hamburgerRef.current?.focus();
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

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-40 h-16 bg-accent/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-[6%]">
          <Link
            href="/"
            className="text-nav-link uppercase text-white transition hover:text-accent-3"
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
                    className={`text-nav-link uppercase transition hover:text-accent-3 ${
                      active ? "text-accent-3" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href={donateCta.href}
                className="inline-flex items-center rounded-md bg-accent-2 px-4 py-2 text-[19px] font-bold leading-none text-white shadow-[var(--shadow-cta)] transition hover:bg-accent-2-hover motion-safe:hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent-3"
              >
                {donateCta.label}
              </Link>
            </li>
          </ul>
          <button
            ref={hamburgerRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex size-11 items-center justify-center text-white lg:hidden"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-ink/50"
          />
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-y-0 right-0 z-50 flex w-80 max-w-full flex-col gap-6 bg-ground p-6 shadow-[var(--shadow-card-hover)]"
          >
            <div className="flex items-center justify-between">
              <p id={titleId} className="text-eyebrow uppercase text-accent">
                Menu
              </p>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex size-11 items-center justify-center text-ink"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <ul className="flex flex-col gap-4">
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
                      className={`block text-heading-5 ${active ? "text-accent" : "text-ink"}`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              <li
                className="menu-item-in mt-2"
                style={{ animationDelay: `${primaryNav.length * 60}ms` }}
              >
                <Link
                  href={donateCta.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md bg-accent-2 px-4 py-3 text-center text-[19px] font-bold leading-none text-white shadow-[var(--shadow-cta)]"
                >
                  {donateCta.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
