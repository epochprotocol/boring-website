// Central site configuration. Swap these in one place.

export const DOCS_URL = "https://docs.epochprotocol.xyz";

// Scheduling link for sales calls. Override in production via
// NEXT_PUBLIC_SALES_CALENDAR_URL (e.g. a Calendly URL). Falls back to the
// contact page so the CTA is never dead.
export const SALES_CALENDAR_URL =
  process.env.NEXT_PUBLIC_SALES_CALENDAR_URL || "/contact";

export const SALES_EMAIL = "sales@epochprotocol.xyz";

export const NAV_LINKS = [
  { label: "Product", href: "/#product" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "How it works", href: "/#how-it-works" },
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
