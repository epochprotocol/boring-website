import { Reveal } from "./Reveal";
import { RailsDiagram } from "./RailsDiagram";

const points = [
  "Any chain, any token, or fiat — in.",
  "Routing, bridging, swaps and policy — handled.",
  "One verified outcome — back to your systems.",
];

export function Product() {
  return (
    <section id="product" className="split-section border-b border-line">
      <div className="split-top bg-surface">
        <div className="container-x max-w-xl">
          <Reveal as="p" className="eyebrow">
            The product
          </Reveal>
          <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
            An API for financial outcomes, not blockchain plumbing
          </Reveal>
          <Reveal as="p" className="mt-5 text-lg md:text-xl leading-relaxed text-ink-soft">
            You describe what needs to happen. Epoch determines how,
            coordinates execution across chains and protocols, and reports
            back the result. Your team works with outcomes; the complexity
            stays on our side.
          </Reveal>

          <Reveal as="ul" className="mt-8 space-y-3.5">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path d="M3 8.5l3 3 7-8" />
                  </svg>
                </span>
                <span className="text-base text-ink-soft">{p}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="split-bottom on-dark relative overflow-hidden">
        <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
        <div className="container-x relative flex justify-center">
          <Reveal className="card-static p-8 md:p-10">
            <RailsDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
