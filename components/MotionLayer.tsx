"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DUR, EASE, ENTER, SCRUB, splitLines } from "@/lib/motion";

/**
 * The entire motion system for the site, in one place.
 *
 * WHY ONE COMPONENT
 * Sections stay server components with no animation code in them; they only
 * mark their parts with data attributes. That gives one `gsap.context()` for
 * the whole page, one place to revert it, and no chance of a stray
 * ScrollTrigger outliving the component that created it. It also keeps the
 * animation vocabulary in a single file where it can be held consistent.
 *
 * WHAT THE PAGE LOOKS LIKE BEFORE THIS RUNS
 * Complete. CSS holds back only the hero — which is small, above the fold,
 * and revealed within a frame or two of the layer mounting. Every other
 * section has its start state applied here, immediately before its timeline,
 * and only if it is still off screen. That way the document paints in full on
 * the first frame and the reader never sees a skeleton waiting for
 * JavaScript.
 *
 * GUARANTEES
 * - Line splitting waits for fonts, but never longer than 400ms, so a slow
 *   font never holds the hero blank.
 * - Everything lives inside `gsap.matchMedia()`, so timelines are rebuilt at
 *   breakpoint changes and fully reverted — including the DOM splitting,
 *   which is undone by the cleanup returned from the matchMedia callback.
 * - Reduced motion is a hard gate: no timelines are created, the `.motion`
 *   class is never applied, and every element renders in its final state.
 *   Pinning and scrubbing do not exist in that mode.
 * - One timeline per scene. Scrubs stay inside 0.6–1.2.
 * - Only transforms, opacity, clip-path and stroke offsets are animated, so
 *   nothing triggers layout and the compositor can hold 60fps.
 */
export function MotionLayer() {
  useEffect(() => {
    // If the pre-paint script decided motion is off (reduced motion), do
    // nothing. Content is already in its final state.
    if (!document.documentElement.classList.contains("motion")) return;

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: EASE, duration: DUR.base });

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    /**
     * Tells the failsafe in <head> that motion took ownership. If this never
     * fires — a failed chunk, a GSAP error, fonts that never resolve — the
     * head script strips the `motion` class after 1.2s and everything falls
     * back to its final visible state. Content is never stranded behind an
     * animation that did not run.
     */
    const claim = () => {
      (window as Window & { __epochMotionReady?: boolean }).__epochMotionReady =
        true;
    };

    const build = () => {
      if (cancelled) return;
      claim();

      ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add(
          { motionOk: "(prefers-reduced-motion: no-preference)" },
          (context) => {
            const { motionOk } = context.conditions as { motionOk: boolean };

            // Second line of defence: if the preference flips at runtime,
            // matchMedia re-runs and this branch builds nothing.
            if (!motionOk) return;

            // DOM splitting is not a GSAP tween, so it needs its own undo.
            // Returned at the end of this callback, it runs on revert and on
            // every breakpoint change, which is what allows headings to be
            // re-measured and re-split at the new width.
            const restorers: Array<() => void> = [];
            const maskLines = (el: Element) => {
              restorers.push(splitLines(el as HTMLElement));
              return el.querySelectorAll(".line-inner");
            };

            /* =========================================================
               READING POSITION
               The top accent bar is the only always-on motion on the page,
               and it is information rather than decoration: it reports how
               far through the document the reader is. Pure scaleX, so it
               costs one compositor property per frame.
               ========================================================= */
            const progressBar = document.querySelector<HTMLElement>(
              "[data-scroll-progress]"
            );
            if (progressBar) {
              gsap.to(progressBar, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: document.documentElement,
                  start: "top top",
                  end: "bottom bottom",
                  scrub: SCRUB.tight,
                },
              });
            }

            /* =========================================================
               SCENE 1 — HERO TITLE SEQUENCE
               Plays on load, not on scroll. The rule draws, the headline
               is typeset line by line, supporting copy and controls
               arrive, and the outcome record prints itself row by row.
               One timeline, front to back.
               ========================================================= */
            const hero = document.querySelector<HTMLElement>(
              '[data-scene="hero"]'
            );

            if (hero) {
              const tl = gsap.timeline({
                defaults: { ease: EASE, duration: DUR.base },
              });

              const rule = hero.querySelector("[data-header-rule]");
              const heading = hero.querySelector("[data-mask-lines]");
              const items = hero.querySelectorAll("[data-hero-item]");
              const record = hero.querySelector("[data-record]");
              const rows = hero.querySelectorAll("[data-record-row]");

              if (rule) tl.to(rule, { scaleX: 1, duration: DUR.quick }, 0);
              if (heading) {
                // Split first, then uncover the container. The lines are
                // already held down by CSS, so revealing the heading exposes
                // empty masks rather than finished text.
                const lines = maskLines(heading);
                gsap.set(heading, { opacity: 1 });
                tl.to(lines, { y: 0, duration: DUR.slow, stagger: 0.075 }, 0.05);
              }
              if (items.length) {
                tl.to(items, { opacity: 1, stagger: 0.07 }, "-=0.5");
              }
              if (record) {
                // Uncovered downward, as though being printed.
                tl.fromTo(
                  record,
                  { clipPath: "inset(0 0 100% 0)" },
                  { clipPath: "inset(0 0 0% 0)", duration: DUR.slow },
                  0.3
                );
              }
              if (rows.length) {
                gsap.set(rows, { opacity: 0 });
                tl.to(rows, { opacity: 1, stagger: 0.04 }, "-=0.5");
              }

              // The route marks resolve last, left to right, so the record
              // finishes on the same gesture the rails diagram will later
              // make at full scale: many chains settling into one outcome.
              const routeMarks = hero.querySelectorAll("[data-route-mark]");
              if (routeMarks.length) {
                gsap.set(routeMarks, { opacity: 0.25 });
                tl.to(
                  routeMarks,
                  { opacity: 1, duration: DUR.quick, stagger: 0.07 },
                  "-=0.25"
                );
              }
            }

            /* =========================================================
               SCENE 2..n — ONE TIMELINE PER SECTION
               Handled uniformly rather than per component: every section
               gets the same treatment for whichever parts it happens to
               have. The header rule draws, the heading is typeset, then
               registers are written — each row's clip opens downward and
               its contents follow.

               Rows are clipped rather than faded because the page's core
               gesture is a ledger being filled in. A uniform fade-up
               would say nothing about the content.
               ========================================================= */
            document
              .querySelectorAll<HTMLElement>("main section")
              .forEach((section) => {
                if (section.dataset.scene === "hero") return;

                const rule = section.querySelector("[data-header-rule]");
                const heading = section.querySelector("[data-mask-lines]");
                const lead = section.querySelector("[data-header-lead]");
                const rows = section.querySelectorAll("[data-row]");
                const specRows = section.querySelectorAll("[data-spec-row]");

                if (
                  !rule &&
                  !heading &&
                  !lead &&
                  !rows.length &&
                  !specRows.length
                ) {
                  return;
                }

                // Anything already on screen at first paint is left exactly
                // as it rendered. Hiding it now, only to animate it back a
                // frame later, is what made the page look like it was
                // rendering badly — the reader had already seen it.
                if (
                  section.getBoundingClientRect().top <
                  window.innerHeight * 0.9
                ) {
                  return;
                }

                // Start states are applied here rather than in CSS, so the
                // document paints complete and only off-screen content is
                // ever held back.
                if (rule) gsap.set(rule, { scaleX: 0 });
                if (lead) gsap.set(lead, { opacity: 0 });
                if (rows.length) {
                  gsap.set(rows, { clipPath: "inset(0 0 100% 0)" });
                }
                if (specRows.length) gsap.set(specRows, { opacity: 0 });

                const tl = gsap.timeline({
                  scrollTrigger: {
                    trigger: section,
                    start: ENTER.start,
                    once: ENTER.once,
                    fastScrollEnd: ENTER.fastScrollEnd,
                  },
                  defaults: { ease: EASE, duration: DUR.base },
                });

                if (rule) tl.to(rule, { scaleX: 1, duration: DUR.quick }, 0);
                if (heading) {
                  tl.to(
                    maskLines(heading),
                    { y: 0, duration: DUR.slow, stagger: 0.055 },
                    0.04
                  );
                }
                if (lead) tl.to(lead, { opacity: 1 }, 0.22);

                // Figures rise out of masks like headings do, rather than
                // fading. They are the largest type in the section and should
                // move in the same language as the rest of the type.
                const figures = section.querySelectorAll("[data-figure]");
                figures.forEach((figure, i) => {
                  tl.to(
                    maskLines(figure),
                    { y: 0, duration: DUR.base },
                    0.3 + i * 0.08
                  );
                });

                // One mechanism per element. Clipping the row and fading its
                // children was double-hiding: it doubled the time the row
                // spent invisible and made the reveal read as a stutter.
                tl.to(
                  rows,
                  {
                    clipPath: "inset(0 0 0% 0)",
                    duration: DUR.base,
                    stagger: 0.045,
                  },
                  0.16
                );

                if (specRows.length) {
                  tl.to(
                    specRows,
                    { opacity: 1, duration: DUR.quick, stagger: 0.03 },
                    0.2
                  );
                }
              });

            /* =========================================================
               SCENE — RAILS
               The only scrubbed diagram, and the only one that earns a
               scrub: its argument is "many rails converge into one
               outcome", so the reader's scroll is what moves value along
               them. Stroke offsets only — no layout, no repaint of text.
               ========================================================= */
            const rails = document.querySelector<SVGElement>("[data-rails]");

            if (rails) {
              const railPaths = rails.querySelectorAll("[data-rail]");
              const nodes = rails.querySelectorAll("[data-rail-node]");
              const outcomeRail = rails.querySelector("[data-outcome-rail]");
              const outcome = rails.querySelector("[data-outcome]");

              gsap.set(railPaths, { strokeDashoffset: 1 });
              gsap.set(outcomeRail, { strokeDashoffset: 1 });
              gsap.set(nodes, { scale: 0, transformOrigin: "center" });
              gsap.set(outcome, { opacity: 0 });

              gsap
                .timeline({
                  scrollTrigger: {
                    trigger: rails,
                    start: "top 85%",
                    end: "bottom 60%",
                    scrub: SCRUB.base,
                  },
                })
                .to(nodes, { scale: 1, stagger: 0.05, duration: 0.3 }, 0)
                .to(
                  railPaths,
                  { strokeDashoffset: 0, stagger: 0.08, duration: 1 },
                  0.1
                )
                .to(outcomeRail, { strokeDashoffset: 0, duration: 0.5 }, 1.35)
                .to(outcome, { opacity: 1, duration: 0.3 }, 1.7);

              // The marker rides the outcome rail in step with the rail being
              // drawn, then lands as the outcome resolves.
              const marker = rails.querySelector("[data-outcome-marker]");
              // `getBBox` throws on elements that are not rendered in some
              // engines, so the measurement is guarded. Its result is in SVG
              // user units, which is exactly what a transform on a child of
              // the same SVG expects.
              let travel = 0;
              try {
                travel = (outcomeRail as SVGPathElement | null)?.getBBox()
                  .width ?? 0;
              } catch {
                travel = 0;
              }

              if (marker && travel > 0) {
                gsap
                  .timeline({
                    scrollTrigger: {
                      trigger: rails,
                      start: "top 85%",
                      end: "bottom 60%",
                      scrub: SCRUB.base,
                    },
                  })
                  .set(marker, { opacity: 0 })
                  .to(marker, { opacity: 1, duration: 0.1 }, 1.35)
                  .to(marker, { x: travel, ease: "none", duration: 0.5 }, 1.35)
                  .to(marker, { opacity: 0, duration: 0.15 }, 1.78);
              }
            }

            /* =========================================================
               SCENE — HOW IT WORKS
               A progress rule fills as the three steps pass, and each
               step resolves to full contrast as its segment completes.
               The narrative column holds beside them using CSS sticky
               rather than a GSAP pin: sticky adds no scroll distance,
               creates no pin-spacer, and cannot desynchronise from the
               scrollbar — so there is nothing here that could feel like
               the page has taken the scroll away from the reader.
               ========================================================= */
            const steps = document.querySelector<HTMLElement>("[data-steps]");

            if (steps) {
              const progress = steps.querySelector("[data-steps-progress]");
              const items = steps.querySelectorAll("[data-step]");

              // 0.32 was too far down: a paragraph at a third opacity does
              // not read as "not yet reached", it reads as text that failed
              // to render. 0.55 is clearly de-emphasised while staying
              // legible, which is the actual intent.
              gsap.set(items, { opacity: 0.55 });

              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: steps,
                  start: "top 72%",
                  end: "bottom 80%",
                  scrub: SCRUB.tight,
                },
              });

              if (progress) {
                tl.fromTo(
                  progress,
                  { scaleY: 0 },
                  { scaleY: 1, ease: "none", duration: items.length },
                  0
                );
              }
              items.forEach((item, i) => {
                tl.to(item, { opacity: 1, duration: 0.35 }, i * 0.9);
              });

              /**
               * The record beside the steps advances with them.
               *
               * This was a cross-fade, and a cross-fade between two stacked
               * panels of text is a double exposure: at any mid-scroll
               * position the reader saw two records ghosting through each
               * other, which is exactly what "half rendered" looks like.
               *
               * It now switches discretely. `onUpdate` maps scroll progress
               * to a state index and only ever shows one layer, so there is
               * no position at which two records are visible at once. The
               * transition is a fast CSS opacity change on the layer that
               * becomes current, which reads as the record updating rather
               * than as two images blended.
               */
              const layers = Array.from(
                document.querySelectorAll<HTMLElement>(
                  "[data-step-stage] .step-stage-layer"
                )
              );

              if (layers.length) {
                let current = -1;
                const show = (next: number) => {
                  if (next === current) return;
                  current = next;
                  layers.forEach((layer, i) => {
                    layer.style.opacity = i === next ? "1" : "0";
                  });
                };
                show(0);

                ScrollTrigger.create({
                  trigger: steps,
                  start: "top 72%",
                  end: "bottom 80%",
                  onUpdate: (self) => {
                    const index = Math.min(
                      layers.length - 1,
                      Math.floor(self.progress * layers.length)
                    );
                    show(index);
                  },
                  onLeaveBack: () => show(0),
                });
              }
            }

            // Everything is placed; make sure each trigger measured against
            // the final layout.
            ScrollTrigger.refresh();

            return () => {
              restorers.forEach((restore) => restore());
            };
          }
        );
      });
    };

    const safeBuild = () => {
      try {
        build();
      } catch {
        // Never leave the page mid-reveal because one tween threw.
        document.documentElement.classList.remove("motion");
      }
    };

    /**
     * Fonts first, but never for long.
     *
     * Splitting a heading before the webfont lands measures the fallback face
     * and produces lines that jump when the real one arrives — so waiting is
     * correct. Waiting *indefinitely* is not: `fonts.ready` can take a second
     * or more on a cold cache, and until it resolved the hero sat blank.
     *
     * Racing it against a short cap means the reveal starts promptly in the
     * worst case, and the only cost is that a heading may be split against
     * fallback metrics on a very slow connection.
     */
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    let started = false;
    const startOnce = () => {
      if (started) return;
      started = true;
      safeBuild();
    };

    if (fonts?.ready) {
      fonts.ready.then(startOnce).catch(startOnce);
      window.setTimeout(startOnce, 400);
    } else {
      startOnce();
    }

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return null;
}
