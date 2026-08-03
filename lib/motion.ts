/**
 * Motion primitives shared by every scene.
 *
 * Keeping easings, durations and scrub values in one place is what stops a
 * motion system drifting into a collection of one-off tweens with slightly
 * different personalities — which is how sites end up feeling busy rather
 * than composed.
 */

/** House easing. Decelerating, no overshoot, no bounce, no spring. */
export const EASE = "power3.out";
export const EASE_INOUT = "power2.inOut";

/** Scrub values stay inside the restrained 0.6–1.2 band. */
export const SCRUB = {
  tight: 0.6,
  base: 0.8,
  loose: 1.2,
} as const;

/**
 * Durations are deliberately short.
 *
 * They used to be roughly twice this, which made a section's entry timeline
 * run about 1.5 seconds. At any normal scroll speed the reader arrived
 * part-way through it and saw rows sliced open and headings half-risen — the
 * page looked like it was still painting rather than animating. A reveal that
 * cannot finish before the reader reaches it is not a reveal, it is a defect.
 */
export const DUR = {
  quick: 0.28,
  base: 0.45,
  slow: 0.7,
} as const;

/**
 * Standard entry trigger.
 *
 * `start` is early — the section only needs its top edge near the fold — so
 * the timeline has run before the content is in the reading zone.
 *
 * `fastScrollEnd` is the important one: if the reader scrolls quickly past a
 * trigger, ScrollTrigger completes its animation immediately instead of
 * playing it out behind them. It is the single setting that stops fast
 * scrolling from leaving half-drawn content in its wake.
 */
export const ENTER = {
  start: "top 88%",
  once: true,
  fastScrollEnd: true,
} as const;

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Splits a heading into one wrapped line per visual line so each can be
 * masked independently.
 *
 * Deliberately hand-rolled rather than using SplitText: it must run *after*
 * fonts settle, must survive resize, and must leave the DOM restorable. It
 * splits on word boundaries, measures each word's offsetTop, and groups words
 * that share a top into a line.
 *
 * The element's text is preserved as real HTML throughout — this only ever
 * wraps existing words in spans, so selection, search and screen readers are
 * unaffected.
 */
export function splitLines(el: HTMLElement): () => void {
  const original = el.innerHTML;
  const restore = () => {
    el.innerHTML = original;
    el.style.removeProperty("text-wrap");
  };

  // Walk child nodes rather than reading textContent, so an explicit <br />
  // survives into the measuring pass. Headings that author their own break —
  // the hero does — would otherwise be re-flowed into whatever the measured
  // width happened to produce.
  const parts: Array<{ type: "word"; value: string } | { type: "break" }> = [];

  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      (node.textContent ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .forEach((value) => parts.push({ type: "word", value }));
    } else if ((node as Element).tagName === "BR") {
      parts.push({ type: "break" });
    } else {
      (node.textContent ?? "")
        .split(/\s+/)
        .filter(Boolean)
        .forEach((value) => parts.push({ type: "word", value }));
    }
  });

  if (!parts.some((p) => p.type === "word")) return () => {};

  // `text-wrap: balance` is disabled for the measuring pass and stays off
  // afterwards, so the lines that are measured are exactly the lines that get
  // rendered. Measuring balanced and rendering unbalanced is how split-text
  // implementations end up one word off.
  el.style.setProperty("text-wrap", "wrap");
  el.innerHTML = "";

  const probes: Array<HTMLSpanElement | null> = [];
  parts.forEach((part, i) => {
    if (part.type === "break") {
      el.appendChild(document.createElement("br"));
      probes.push(null);
      return;
    }
    const span = document.createElement("span");
    span.textContent = part.value;
    span.style.display = "inline-block";
    el.appendChild(span);
    if (i < parts.length - 1) el.appendChild(document.createTextNode(" "));
    probes.push(span);
  });

  // Group words into lines by measured vertical offset.
  const lines: string[][] = [];
  let currentTop: number | null = null;

  probes.forEach((span) => {
    if (!span) return;
    const top = span.offsetTop;
    if (currentTop === null || Math.abs(top - currentTop) > 2) {
      currentTop = top;
      lines.push([]);
    }
    lines[lines.length - 1].push(span.textContent ?? "");
  });

  if (lines.length === 0) {
    restore();
    return () => {};
  }

  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Joined with a space, not an empty string. The masks are display:block so
  // the whitespace never renders, but without it `textContent` — and
  // therefore copy-paste and any assistive technology reading the run — would
  // weld the last word of each line to the first word of the next.
  el.innerHTML = lines
    .map(
      (line) =>
        `<span class="line-mask"><span class="line-inner">${escape(
          line.join(" ")
        )}</span></span>`
    )
    .join(" ");

  return restore;
}
