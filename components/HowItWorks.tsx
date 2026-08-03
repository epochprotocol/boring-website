import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col relative overflow-hidden bg-surface-2">
          <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
          <div className="absolute inset-0 atmosphere-soft" aria-hidden="true" />
          <SectionHeader
            index="04"
            eyebrow="How it works"
            title="From intent to settlement, in one integration"
            className="relative w-full max-w-md"
          />
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
          {/* Steps as a ruled sequence. The vertical rule carries the eye
              through the flow, so the numbered circles are unnecessary. */}
          <div className="relative w-full max-w-md">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                delay={i * 80}
                className="relative border-l border-line pb-9 pl-6 last:pb-0"
              >
                <span
                  className="absolute -left-px top-1.5 h-6 w-px bg-accent"
                  aria-hidden="true"
                />
                <p className="label">
                  {s.label} &mdash; {s.n}
                </p>
                <h3 className="display t-h3 mt-3 text-ink">{s.title}</h3>
                <p className="t-body mt-2.5 text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
