"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { DOCS_URL, NAV_LINKS, SALES_CALENDAR_URL } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { ThemeToggle } from "./ThemeToggle";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled
          ? "bg-canvas/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Epoch home">
          <Wordmark />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ink-soft hover:text-ink transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-ink-soft hover:text-ink transition-colors"
          >
            Docs
          </a>
          <ThemeToggle />
          <Link
            href={SALES_CALENDAR_URL}
            {...bookProps}
            className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong hover:text-canvas"
          >
            Book a call
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-line-strong text-ink"
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1.5">
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </div>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-canvas">
          <div className="container-x py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-soft"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center justify-between">
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
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent"
            >
              Book a sales call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
