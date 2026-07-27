import { Reveal } from "./Reveal";

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
          <div className="relative w-full max-w-md">
            <Reveal as="p" className="eyebrow">
              How it works
            </Reveal>
            <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
              From intent to settlement, in one integration
            </Reveal>
          </div>
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
          <div className="relative w-full max-w-md space-y-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="relative flex gap-4">
                <span className="display inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-lg text-accent-strong">
                  {s.n}
                </span>
                <div>
                  <p className="eyebrow">{s.label}</p>
                  <h3 className="display mt-3 text-xl text-ink">{s.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
