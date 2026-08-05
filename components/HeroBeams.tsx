"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

/* The three.js scene cannot be statically rendered, so it mounts client-side
   only and paints nothing into the exported HTML. */
const Beams = dynamic(() => import("./Beams"), { ssr: false });

type Theme = "light" | "dark";

function readTheme(): Theme {
  const classes = document.documentElement.classList;
  return classes.contains("dark") || classes.contains("mix")
    ? "dark"
    : "light";
}

/**
 * The animated light field behind the hero's right column. It is laid out in
 * the right half of the section so the ribbons sit behind the outcome record
 * rather than across the headline, and it renders nothing on the server or
 * for reduced-motion readers.
 *
 * The field itself renders on a pure-black canvas, which would otherwise
 * turn its half of the hero black. The blend layer hides that canvas without
 * touching the scene: over the light theme the field is inverted and
 * multiplied into the canvas, so the black becomes transparent and the
 * ribbons read as soft ink streaks; over dark and mix themes the canvas
 * already matches the page, so `lighten` hides it and only the light shows.
 */
export function HeroBeams() {
  const [allowed, setAllowed] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setAllowed(!motion.matches);
    onMotion();
    motion.addEventListener("change", onMotion);

    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      motion.removeEventListener("change", onMotion);
      observer.disconnect();
    };
  }, []);

  if (!allowed) return null;

  return (
    <div
      className="pointer-events-none absolute inset-y-0 right-0 left-[48%] md:left-[52%]"
      aria-hidden="true"
    >
      <div
        className={`hero-beams h-full w-full ${
          theme === "light" ? "hero-beams-light" : "hero-beams-dark"
        }`}
      >
        <Beams
          beamWidth={0.3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={3.2}
          scale={0.2}
          rotation={199}
        />
      </div>
    </div>
  );
}
