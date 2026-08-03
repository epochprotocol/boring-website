"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DOCS_URL, NAV_LINKS, SALES_CALENDAR_URL } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";

const isExternal = (href: string) => /^https?:\/\//.test(href);

const sectionIds = NAV_LINKS.map((l) => l.href.replace("/#", ""));

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /**
   * Scroll spy. Tracks which section is currently under the header so the nav
   * always reflects where the reader is. It costs a few lines and it is one of
   * the clearest signals that a site was finished rather than shipped.
   *
   * The top margin offsets the sticky header; the bottom margin means a
   * section only counts as active once it occupies the upper portion of the
   * viewport, which stops the highlight flickering between neighbours.
   */
  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        // Whichever tracked section occupies the most of the band wins.
        let best: string | null = null;
        let bestRatio = 0;
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        });
        setActive(best);
      },
      {
        rootMargin: "-72px 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <header
      // Solid canvas on scroll, not a translucent blur. Frosted glass is a
      // consumer-app signature and it makes type sitting behind it soft.
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        scrolled || open
          ? "border-b border-line bg-canvas"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Epoch home"
        >
          <Wordmark />
        </Link>

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Sections"
        >
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("/#", "");
            const isActive = active === id;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative py-1 text-sm transition-colors ${
                  isActive
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                }`}
              >
                {link.label}
                {/* Underline marks position rather than decorating the link. */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            Docs
          </a>
          <ThemeToggle />
          <Link
            href={SALES_CALENDAR_URL}
            {...bookProps}
            className="btn btn-sm btn-primary"
          >
            Book a call
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-control)] border border-line-strong text-ink transition-colors hover:bg-surface md:hidden"
        >
          <span className="sr-only">Menu</span>
          {/* The bars rotate into a cross rather than swapping icons. */}
          <span className="relative block h-3 w-4" aria-hidden="true">
            <span
              className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-4 bg-ink transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-canvas md:hidden">
          <div className="container-x flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between py-4">
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-ink-soft"
              >
                Docs
              </a>
              <ThemeToggle />
            </div>
            <Link
              href={SALES_CALENDAR_URL}
              {...bookProps}
              onClick={() => setOpen(false)}
              className="btn btn-lg btn-primary mb-4 w-full"
            >
              Book a sales call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
