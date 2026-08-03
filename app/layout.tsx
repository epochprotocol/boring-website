import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { TAGLINE } from "@/lib/site";
import { MotionLayer } from "@/components/MotionLayer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://epochprotocol.xyz"),
  title: {
    default: `Epoch — ${TAGLINE}`,
    template: "%s — Epoch",
  },
  description:
    "Epoch is the API institutions use to define a financial outcome on-chain and have it executed across every chain, protocol, and payment rail. No Web3 team required.",
  openGraph: {
    title: `Epoch — ${TAGLINE}`,
    description:
      "Define the outcome. Epoch executes it on-chain — across every chain, protocol, and payment rail.",
    type: "website",
    url: "https://epochprotocol.xyz",
    siteName: "Epoch",
  },
  twitter: {
    card: "summary_large_image",
    title: `Epoch — ${TAGLINE}`,
    description:
      "Define the outcome. Epoch executes it on-chain — across every chain, protocol, and payment rail.",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("epoch-theme");var c=document.documentElement.classList;if(t==="dark"){c.add("dark");}else if(t==="mix"){c.add("mix");}}catch(e){}})();`;

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
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
