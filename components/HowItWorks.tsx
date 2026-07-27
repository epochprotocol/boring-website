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
    <section
      id="how-it-works"
      className="relative overflow-hidden border-b border-line bg-surface-2"
    >
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="absolute inset-0 atmosphere-soft" aria-hidden="true" />

      <div className="container-x section relative">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            How it works
          </Reveal>
          <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
            From intent to settlement, in one integration
          </Reveal>
        </div>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3">
          <div
            className="absolute top-6 left-0 right-0 hidden h-px bg-line-strong md:block"
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className="relative">
              <span className="display relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-surface text-lg text-accent-strong">
                {s.n}
              </span>
              <p className="eyebrow mt-5">{s.label}</p>
              <h3 className="display mt-3 text-xl text-ink">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
