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

  /**
   * Scrolled state from an IntersectionObserver on a one-pixel sentinel at
   * the very top of the page. The previous version listened to `scroll`
   * events, which forces a style pass on every frame of every scroll — the
   * observer costs nothing once registered.
   */
  useEffect(() => {
    const sentinel = document.querySelector("[data-nav-sentinel]");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
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
        rootMargin: "-96px 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu on Escape and hold the page still while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <>
      {/* Sentinel for the scrolled state. One pixel at the top of the
          document; the observer flips the pill to its glass style the moment
          it leaves the viewport. */}
      <div data-nav-sentinel aria-hidden="true" className="h-px w-px" />

      {/* The wrapper is sticky but click-transparent, so only the pill itself
          intercepts the pointer. */}
      <header className="pointer-events-none sticky top-0 z-50">
        <div
          className={`mx-auto mt-6 w-max max-w-[calc(100vw-3rem)] rounded-full border backdrop-blur-xl transition-colors duration-500 ease-fluid ${
            scrolled || open
              ? "border-line bg-canvas/80"
              : "border-line bg-canvas/60"
          }`}
        >
          <div className="pointer-events-auto flex h-12 items-center gap-6 px-4 sm:px-6">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="Epoch home"
            >
              <Wordmark />
            </Link>

            <nav
              className="hidden items-center gap-6 lg:flex"
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

            <div className="hidden shrink-0 items-center gap-4 lg:flex">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-surface lg:hidden"
            >
              <span className="sr-only">Menu</span>
              {/* Two bars morph into an X. Both bars stay visible through the
                  entire transition — the shape rotates, nothing disappears. */}
              <span className="relative block h-2.5 w-4" aria-hidden="true">
                <span
                  className={`absolute left-0 block h-0.5 w-4 rounded-full bg-ink transition-all duration-300 ease-fluid ${
                    open ? "top-1 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-4 rounded-full bg-ink transition-all duration-300 ease-fluid ${
                    open ? "top-1 -rotate-45" : "top-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-nav"
          className="nav-overlay fixed inset-0 z-40 backdrop-blur-3xl lg:hidden"
        >
          <div className="container-x flex h-full flex-col items-center justify-center">
            {NAV_LINKS.map((link, i) => {
              const id = link.href.replace("/#", "");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${100 + i * 50}ms` }}
                  className={`nav-overlay-item display py-2 text-4xl ${
                    active === id ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div
              className="nav-overlay-item mt-8 flex items-center gap-4"
              style={{ animationDelay: `${100 + NAV_LINKS.length * 50}ms` }}
            >
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg text-ink-soft transition-colors hover:text-ink"
              >
                Docs
              </a>
              <ThemeToggle />
            </div>
            <Link
              href={SALES_CALENDAR_URL}
              {...bookProps}
              onClick={() => setOpen(false)}
              style={{
                animationDelay: `${100 + (NAV_LINKS.length + 1) * 50}ms`,
              }}
              className="nav-overlay-item btn btn-lg btn-primary mt-4"
            >
              Book a sales call
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
