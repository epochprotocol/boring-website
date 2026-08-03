import { SectionHeader } from "./SectionHeader";
import { StepStage } from "./StepStage";

const steps = [
  {
    n: "01",
    label: "Step 1",
    title: "Define the outcome",
    body: "Through one API call, your product states what should be true: the asset, destination, position, or multi-step result you need.",
  },
  {
    n: "02",
    label: "Step 2",
    title: "Epoch coordinates execution",
    body: "Epoch finds the optimal path and orchestrates the routing, bridging, swaps, and protocol calls across chains on your behalf.",
  },
  {
    n: "03",
    label: "Step 3",
    title: "Settlement and confirmation",
    body: "The outcome settles on-chain and Epoch reports status back to your systems, so you can act on a verified result.",
  },
];

/**
 * The one pinned scene on the page, and the only one that needs to be.
 *
 * The narrative column holds while the three steps pass it, and a progress
 * rule fills alongside them — the reader is watching one integration move
 * from intent to settlement, which is the whole claim of the section.
 *
 * The pin is desktop-only and uses `pinSpacing: false`, so it never adds
 * scroll distance and never takes the scroll away from the reader. On touch
 * widths, and in reduced motion, the column scrolls with everything else.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col split-col-sticky relative overflow-hidden bg-surface-2">
          <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
          <div data-steps-pin className="relative w-full max-w-md">
            <SectionHeader
              index="04"
              eyebrow="How it works"
              title="From intent to settlement, in one integration"
              className="w-full max-w-md"
            />
            {/* The record advances state as the steps pass. Same object as
                the hero, so the reader recognises what is changing. */}
            <div className="mt-8">
              <StepStage />
            </div>
          </div>
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div
            className="absolute inset-0 grid-backdrop opacity-40"
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md" data-steps>
            {/* Track, and the rule that fills along it as you scroll. */}
            <div
              className="absolute bottom-0 left-0 top-0 w-px bg-line"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
              aria-hidden="true"
              data-steps-progress
            />

            {steps.map((s) => (
              <div key={s.n} data-step className="pb-10 pl-6 last:pb-0">
                <p className="label">
                  {s.label} &mdash; {s.n}
                </p>
                <h3 className="display t-h3 mt-3 text-ink">{s.title}</h3>
                <p className="t-body mt-2.5 text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
