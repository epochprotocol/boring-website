"use client";

import { useEffect, useState } from "react";
import ShinyText from "./ShinyText";

const LINES = [
  "One API call.",
  "One outcome.",
  "Chains underneath execute it.",
];

/**
 * The mandatory tagline moment: large type stating the core benefit, separate
 * from the hero, placed further down the page. Each line uses a shine sweep
 * across muted ink; under reduced motion the shine is disabled.
 *
 * Shine colours are theme-aware: white-on-ink-soft reads in light mode, but
 * in dark/mix the base text is already light, so a white sweep disappears.
 * There the base drops to muted and the highlight uses bright ink.
 */
export function TaglineReveal() {
  const [shineEnabled, setShineEnabled] = useState(false);
  const [darkSurface, setDarkSurface] = useState(false);

  useEffect(() => {
    setShineEnabled(document.documentElement.classList.contains("motion"));

    const root = document.documentElement;
    const syncTheme = () => {
      setDarkSurface(
        root.classList.contains("dark") || root.classList.contains("mix")
      );
    };
    syncTheme();
    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section border-b border-line bg-surface"
      aria-label="Epoch in one line"
    >
      <div className="container-x">
        <h2 className="display mx-auto max-w-[680px] text-center text-4xl leading-[2.5rem] tracking-[-0.026em] md:text-5xl md:leading-[1]">
          {LINES.map((line) => (
            <span key={line} className="block text-center">
              <ShinyText
                text={line}
                speed={2.4}
                delay={1.2}
                color={
                  darkSurface
                    ? "var(--color-muted)"
                    : "var(--color-ink-soft)"
                }
                shineColor={
                  darkSurface ? "var(--color-ink)" : "#ffffff"
                }
                spread={120}
                direction="left"
                yoyo={false}
                pauseOnHover={false}
                disabled={!shineEnabled}
                className="display"
              />
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
