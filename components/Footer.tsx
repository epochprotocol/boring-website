import Link from "next/link";
import {
  DOCS_URL,
  NAV_LINKS,
  SALES_CALENDAR_URL,
  SOCIAL_LINKS,
  TAGLINE,
} from "@/lib/site";
import { Wordmark } from "./Wordmark";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Footer() {
  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm text-muted">{TAGLINE}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={SALES_CALENDAR_URL}
                {...bookProps}
                className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong hover:text-canvas"
              >
                Book a sales call
              </Link>
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink hover:border-accent hover:text-accent-strong transition-colors"
              >
                Read the docs
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Explore</h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Connect</h3>
            <ul className="mt-4 space-y-3">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-soft hover:text-ink transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            Epoch &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
          <Link href="/privacy" className="text-xs text-muted hover:text-ink">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
