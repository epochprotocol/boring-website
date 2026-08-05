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
  POSITIONING,
} from "@/lib/site";
import { FooterMark } from "./FooterMark";
import { Wordmark } from "./Wordmark";

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Footer() {
  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const productLinks = [
    ...NAV_LINKS.slice(0, 4),
    { label: "Docs", href: DOCS_URL, external: true as const },
  ];

  const companyLinks: { label: string; href: string; external?: boolean }[] = [
    { label: "Contact", href: "/contact" },
    { label: "Security & custody", href: "/#security" },
    { label: "Compliance", href: "/#compliance" },
    ...(STATUS_URL
      ? [{ label: "System status", href: STATUS_URL, external: true }]
      : []),
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of use", href: "/terms" },
  ];

  const connectLinks = [
    ...SOCIAL_LINKS.filter((l) => l.label !== "Docs"),
    ...(LINKEDIN_URL ? [{ label: "LinkedIn", href: LINKEDIN_URL }] : []),
    { label: "Sales", href: `mailto:${SALES_EMAIL}` },
    { label: "Security", href: `mailto:${SECURITY_EMAIL}` },
  ];

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x pt-16 md:pt-20">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {POSITIONING}. {TAGLINE}
            </p>
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
          </div>

          <div>
            <h3 className="label">Product</h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map((link) =>
                "external" in link && link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="label">Company</h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("mailto:")
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="label">Connect</h3>
            <ul className="mt-4 space-y-3">
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("mailto:")
                      ? {}
                      : { target: "_blank", rel: "noopener noreferrer" })}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
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
            <p className="max-w-2xl text-xs leading-relaxed text-muted">
              Epoch provides execution infrastructure and is not a bank, broker,
              money transmitter, or investment adviser. Nothing on this site is
              financial, legal, or investment advice.
            </p>
          </div>
          <p className="shrink-0 text-xs text-muted">
            Rails for modern finance.
          </p>
        </div>
      </div>

      {/* Continues the same surface — no border, no dark band. */}
      <div className="mt-8 pb-2 md:mt-10">
        <FooterMark />
      </div>
    </footer>
  );
}
