"use client";

import { useEffect, useState } from "react";
import ParticleText from "./ParticleText";

/**
 * Closing brand mark for the footer — same surface as the links above,
 * fading out into the page edge so it reads as part of the footer rather
 * than a second band.
 */
export function FooterMark() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="relative h-[180px] w-full overflow-hidden md:h-[240px] lg:h-[280px]"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
      }}
    >
      <ParticleText
        text="epoch"
        particleSize={2}
        density={3}
        color={dark ? "#c0c5cd" : "#3c434e"}
        highlightColor={dark ? "#d7c2ff" : "#7e22ce"}
        scatter={160}
        gatherDuration={1800}
        stagger={420}
        pointerRepel={36}
        repelRadius={120}
        idleDrift={0.55}
        trigger="hover"
        fontSize="clamp(4rem, 16vw, 10rem)"
        fontWeight={800}
        fontFamily="inherit"
        glow={dark}
        className="display !min-h-0"
        style={{ minHeight: 0 }}
      />
    </div>
  );
}
