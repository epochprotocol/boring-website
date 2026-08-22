import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { TAGLINE, SOCIAL_LINKS, LINKEDIN_URL } from "@/lib/site";
import { MotionLayer } from "@/components/MotionLayer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://epochprotocol.xyz"),
  title: {
    default: `Epoch Protocol — ${TAGLINE}`,
    template: "%s — Epoch Protocol",
  },
  description:
    "Epoch Protocol is the API institutions use to define a financial outcome and have it executed across every chain, protocol, and payment rail. No Web3 team required.",
  alternates: { canonical: "/" },
  applicationName: "Epoch Protocol",
  category: "Financial technology",
  openGraph: {
    title: `Epoch Protocol — ${TAGLINE}`,
    description:
      "Define the outcome. Epoch executes it across every chain, protocol, and payment rail.",
    type: "website",
    url: "https://epochprotocol.xyz/",
    siteName: "Epoch Protocol",
  },
  twitter: {
    card: "summary_large_image",
    title: `Epoch Protocol — ${TAGLINE}`,
    description:
      "Define the outcome. Epoch executes it across every chain, protocol, and payment rail.",
  },
};

/**
 * Machine-readable identity for agents and search engines. The Organization
 * block carries a contactPoint (with an email and contact type) and a
 * PostalAddress so legitimacy and contact queries can be answered without
 * JavaScript; sameAs points at every profile we control so name-based
 * searches converge on this domain.
 */
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://epochprotocol.xyz/#organization",
  name: "Epoch Protocol",
  alternateName: "Epoch",
  url: "https://epochprotocol.xyz/",
  logo: "https://epochprotocol.xyz/epoch-logo.png",
  description:
    "Epoch Protocol is the API institutions use to define a financial outcome and have it executed across every chain, protocol, and payment rail.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SG",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "sales@epochprotocol.xyz",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "technical support",
      url: "https://docs.epochprotocol.xyz/",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      contactType: "security",
      email: "security@epochprotocol.xyz",
      availableLanguage: ["en"],
    },
  ],
  sameAs: [
    ...SOCIAL_LINKS.filter((l) => l.label === "GitHub" || l.label === "X").map(
      (l) => l.href,
    ),
    LINKEDIN_URL,
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Epoch Protocol",
  url: "https://epochprotocol.xyz/",
  publisher: { "@id": "https://epochprotocol.xyz/#organization" },
};

const themeScript = `(function(){try{var t=localStorage.getItem("epoch-theme");var c=document.documentElement.classList;c.remove("dark","mix","light");if(t==="light"){c.add("light");}else if(t==="mix"){c.add("mix");}else{c.add("dark");}}catch(e){document.documentElement.classList.add("dark");}})();`;

/**
 * Adds the `motion` class before first paint, and only when JavaScript runs
 * and the user has not requested reduced motion.
 *
 * The class now gates very little — just the hero's start state — because
 * hiding the whole page in CSS until JavaScript arrived is what made the site
 * look like it was rendering badly. Everything below the fold is held back by
 * GSAP instead, at the moment its timeline is built.
 *
 * Every "hidden before animating" rule in globals.css is scoped to this class,
 * so with JS off, GSAP failing to load, or reduced motion requested, the page
 * renders complete and readable. No content ever depends on an animation
 * finishing — which is the only version of scroll animation that is safe to
 * ship.
 */
const motionScript = `(function(){try{if(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var r=document.documentElement;r.classList.add("motion");setTimeout(function(){if(!window.__epochMotionReady){r.classList.remove("motion");}},1200);}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, websiteJsonLd]),
          }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="accent-bar" aria-hidden="true">
          <span className="accent-bar-fill" data-scroll-progress />
        </div>
        {children}
        <MotionLayer />
      </body>
    </html>
  );
}
