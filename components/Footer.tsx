import Link from "next/link";
import {
  DOCS_URL,
  LEGAL_ENTITY,
  LINKEDIN_URL,
  NAV_LINKS,
  SALES_CALENDAR_URL,
  SALES_EMAIL,
  SECURITY_EMAIL,
  SOCIAL_LINKS,
  STATUS_URL,
  TAGLINE,
} from "@/lib/site";
import { Wordmark } from "./Wordmark";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Footer() {
  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  // Trust and contact routes, assembled from config so nothing renders as a
  // dead link. LinkedIn and the status page appear only once they exist.
  const trustLinks: { label: string; href: string; external?: boolean }[] = [
    { label: "Security & custody", href: "/#security" },
    { label: "Compliance", href: "/#compliance" },
    ...(STATUS_URL
      ? [{ label: "System status", href: STATUS_URL, external: true }]
      : []),
    { label: "Report a vulnerability", href: `mailto:${SECURITY_EMAIL}`, external: true },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const connectLinks = [
    ...SOCIAL_LINKS,
    ...(LINKEDIN_URL ? [{ label: "LinkedIn", href: LINKEDIN_URL }] : []),
  ];

  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="container-x py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm text-muted">{TAGLINE}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={SALES_CALENDAR_URL}
                {...bookProps}
                className="btn btn-sm btn-primary"
              >
                Book a sales call
              </Link>
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-secondary"
              >
                Read the docs
              </a>
            </div>

            <div className="mt-6 space-y-1 text-sm text-muted">
              <p>
                Sales:{" "}
                <a
                  href={`mailto:${SALES_EMAIL}`}
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  {SALES_EMAIL}
                </a>
              </p>
              <p>
                Security:{" "}
                <a
                  href={`mailto:${SECURITY_EMAIL}`}
                  className="text-ink-soft hover:text-ink transition-colors"
                >
                  {SECURITY_EMAIL}
                </a>
              </p>
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
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Trust
            </h3>
            <ul className="mt-4 space-y-3">
              {trustLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("mailto:")
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-sm text-ink-soft hover:text-ink transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft hover:text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">Connect</h3>
            <ul className="mt-4 space-y-3">
              {connectLinks.map((link) => (
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

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <p className="text-xs text-muted">
              {LEGAL_ENTITY.name || "Epoch"} &copy; {new Date().getFullYear()}.
              All rights reserved.
              {LEGAL_ENTITY.jurisdiction
                ? ` Incorporated in ${LEGAL_ENTITY.jurisdiction}${
                    LEGAL_ENTITY.registrationNumber
                      ? `, no. ${LEGAL_ENTITY.registrationNumber}`
                      : ""
                  }.`
                : null}
            </p>
            {/* Institutions read this kind of scope statement as candour, not
                as a weakness. Its absence is what raises questions. */}
            <p className="max-w-2xl text-xs leading-relaxed text-muted">
              Epoch provides execution infrastructure and is not a bank, broker,
              money transmitter, or investment adviser. Nothing on this site is
              financial, legal, or investment advice.
            </p>
          </div>
          <Link
            href="/privacy"
            className="shrink-0 text-xs text-muted hover:text-ink"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
