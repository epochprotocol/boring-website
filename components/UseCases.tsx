"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";

const cases = [
  {
    index: "01",
    label: "Hedge funds & institutions",
    title: "Onchain strategy, no crypto desk",
    body: "Enter, exit, move collateral, and rebalance across chains via one API—with policy in the flow.",
  },
  {
    index: "02",
    label: "Banks & payments",
    title: "Accept any token, deliver yours",
    body: "Take any chain or asset; settle to one target (e.g. USDC on Base). Sweep idle balances into yield.",
  },   
  {
    index: "03",
    label: "Fintechs & neobanks",
    title: "Add Onchain features in same stack",
    body: "Offer swap, pay, earn, and transfers across chains through one integration.",
  },
  {
    index: "04",
    label: "Product & platform teams",
    title: "One-click product onboarding",
    body: "From any chain, token, or fiat into the position you need—no bridge tutorial.",
  },
];

const DWELL_MS = 6200;

/**
 * Stripe's enterprise-stories accordion: one item open at a time, advancing
 * on its own with a progress rule, so a reader who does nothing still sees
 * every segment. Rebuilt on ruled rows rather than cards, so it stays in the
 * Ledger language.
 *
 * Behaviour that keeps an auto-advancing component from being hostile:
 *  - It only advances while the section is on screen. Nothing cycles behind
 *    the reader's back, and nothing burns a timer off-screen.
 *  - Hover or keyboard focus pauses it.
 *  - Any click or key press stops it permanently — once a reader has taken
 *    control, taking it back would be rude.
 *  - Under reduced motion it never advances at all and the panels simply
 *    open and close on click.
 *
 * Accessibility: real <button> headers with `aria-expanded` and
 * `aria-controls`, arrow-key roving between rows, and panels that stay in the
 * DOM. Collapsed content is `hidden`, so assistive tech and find-in-page
 * behave the way a reader expects.
 */
export function UseCases() {
  const [open, setOpen] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const reduced =
    typeof document !== "undefined" &&
    !document.documentElement.classList.contains("motion");

  const takeControl = useCallback((next: number) => {
    setStopped(true);
    setOpen(next);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || stopped || paused || !inView) return;
    const id = window.setTimeout(
      () => setOpen((i) => (i + 1) % cases.length),
      DWELL_MS
    );
    return () => window.clearTimeout(id);
  }, [open, reduced, stopped, paused, inView]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next =
      e.key === "ArrowDown"
        ? (i + 1) % cases.length
        : (i - 1 + cases.length) % cases.length;
    takeControl(next);
    buttonRefs.current[next]?.focus();
  };

  const running = !reduced && !stopped && !paused && inView;

  return (
    <section
      ref={sectionRef}
      id="use-cases"
      className="on-dark on-dark-band section border-b border-line"
    >
      <div className="container-x">
        <SectionHeader
          index="09"
          eyebrow="Use cases"
          title="One integration, many financial products"
        />

        <div
          className="section-body border-b border-line"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {cases.map((c, i) => {
            const isOpen = i === open;
            return (
              <div key={c.title} className="border-t border-line">
                <h3>
                  <button
                    ref={(el) => {
                      buttonRefs.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`usecase-panel-${i}`}
                    id={`usecase-tab-${i}`}
                    onClick={() => takeControl(isOpen ? open : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="group grid w-full grid-cols-[3.5rem_1fr] items-baseline gap-x-6 py-6 text-left"
                  >
                    <span
                      className={`section-index transition-colors ${
                        isOpen ? "text-accent-strong" : ""
                      }`}
                    >
                      {c.index}
                    </span>
                    <span>
                      <span className="tag block">{c.label}</span>
                      <span
                        className={`display t-h3 mt-2 block transition-colors ${
                          isOpen ? "text-ink" : "text-muted group-hover:text-ink"
                        }`}
                      >
                        {c.title}
                      </span>
                    </span>
                  </button>
                </h3>

                {/* The dwell indicator. It restarts whenever the open row
                    changes, because the element is keyed by index and dwell
                    state — a paused run renders a static rule instead. */}
                <div className="ml-[3.5rem] h-px bg-line" aria-hidden="true">
                  {isOpen ? (
                    <div
                      key={`${i}-${running}`}
                      className={`h-px origin-left bg-accent ${
                        running ? "dwell" : ""
                      }`}
                      style={
                        running
                          ? { animationDuration: `${DWELL_MS}ms` }
                          : { transform: "scaleX(1)" }
                      }
                    />
                  ) : null}
                </div>

                <div
                  id={`usecase-panel-${i}`}
                  role="region"
                  aria-labelledby={`usecase-tab-${i}`}
                  hidden={!isOpen}
                  className="grid grid-cols-[3.5rem_1fr] gap-x-6 pb-7 pt-5"
                >
                  <span aria-hidden="true" />
                  <p className="t-body max-w-2xl text-ink-soft">{c.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
