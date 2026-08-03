// Central site configuration. Swap these in one place.

export const DOCS_URL = "https://docs.epochprotocol.xyz";

// Scheduling link for sales calls. Override in production via
// NEXT_PUBLIC_SALES_CALENDAR_URL (e.g. a Calendly URL). Falls back to the
// contact page so the CTA is never dead.
export const SALES_CALENDAR_URL =
  process.env.NEXT_PUBLIC_SALES_CALENDAR_URL || "/contact";

export const SALES_EMAIL = "sales@epochprotocol.xyz";
export const SECURITY_EMAIL = "security@epochprotocol.xyz";

export const NAV_LINKS = [
  { label: "Product", href: "/#product" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Security", href: "/#security" },
  { label: "Compliance", href: "/#compliance" },
  { label: "Use cases", href: "/#use-cases" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Docs", href: DOCS_URL },
  { label: "GitHub", href: "https://github.com/epochprotocol" },
  { label: "X", href: "https://x.com/epochprotocol" },
  { label: "Discord", href: "https://discord.gg/epochprotocol" },
] as const;

export const TAGLINE = "One API. Every chain. Any financial outcome.";

/* ------------------------------------------------------------------ *
 * TRUST CONFIGURATION
 *
 * Everything below drives the institutional-trust surfaces. The rule the
 * components follow: if a field is empty, the component renders NOTHING
 * rather than a placeholder. No section of this site should imply a proof
 * point that does not exist — an empty slot costs nothing, an
 * unsubstantiated claim costs the deal when diligence catches it.
 *
 * >>> ACTION REQUIRED: fill in the fields marked TODO below. <<<
 * ------------------------------------------------------------------ */

/**
 * Public status page. When set, a live-status link appears in the trust
 * strip, the security section and the footer.
 * Recommended: Better Stack, Instatus or Statuspage on status.epochprotocol.xyz
 * TODO: set NEXT_PUBLIC_STATUS_URL once the status page is live.
 */
export const STATUS_URL = process.env.NEXT_PUBLIC_STATUS_URL || "";

/**
 * Company LinkedIn. Institutional buyers check this before replying to a
 * sales email; its absence is a negative signal.
 * TODO: add the company LinkedIn URL.
 */
export const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "";

/**
 * The contracting legal entity. Banks need to know who they are signing with
 * and under which law before procurement will open a file.
 * TODO: fill in. Leave blank to hide the row entirely.
 */
export const LEGAL_ENTITY = {
  name: "", // e.g. "Epoch Labs Ltd."
  jurisdiction: "", // e.g. "England & Wales"
  registrationNumber: "", // e.g. "14829301"
};

/**
 * Security audits. Only list an audit you can link to a published report. An
 * unlinked audit name reads as decoration and invites the question you least
 * want asked.
 * TODO: add audits as they complete.
 */
export const AUDITS: {
  firm: string;
  scope: string;
  date: string;
  url: string;
}[] = [
  // { firm: "Trail of Bits", scope: "Settlement contracts", date: "Mar 2026", url: "https://..." },
];

/**
 * Certifications and their honest current state. `status` renders verbatim,
 * so "In progress — target Q4 2026" is a good value and far more credible
 * than silence or an implied badge.
 * TODO: update as compliance work progresses.
 */
export const CERTIFICATIONS: { name: string; status: string }[] = [
  // { name: "SOC 2 Type II", status: "In progress — target Q4 2026" },
];

/**
 * Design partners and customers. Anonymised entries are fine and worth a
 * great deal — "a top-10 European neobank" is a real signal.
 * TODO: add your existing design partners here.
 */
export const DESIGN_PARTNERS: {
  descriptor: string;
  detail: string;
}[] = [
  // { descriptor: "European neobank", detail: "Cross-chain settlement into USDC" },
];

/**
 * Investors. Institutions underwrite the cap table as much as the product.
 * TODO: add your backers.
 */
export const INVESTORS: { name: string; url?: string }[] = [
  // { name: "Example Ventures", url: "https://..." },
];

/**
 * Leadership. Name, role, and one line of relevant prior experience — the
 * prior experience is the part that does the work.
 * TODO: add founders/leadership.
 */
export const TEAM: {
  name: string;
  role: string;
  background: string;
  linkedin?: string;
}[] = [
  // { name: "Jane Doe", role: "CEO", background: "Previously payments infrastructure at Stripe", linkedin: "https://..." },
];

/**
 * Ecosystem and infrastructure partners that are already public.
 */
export const PARTNERS: { name: string; detail: string }[] = [
  { name: "Miden", detail: "Zero-knowledge settlement" },
];
