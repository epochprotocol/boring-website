import { SectionHeader } from "./SectionHeader";
import { RailsDiagram } from "./RailsDiagram";

// Staged as in / run / out so the list reads as a pipeline spec rather than
// three unrelated bullets.
const points = [
  { k: "In", v: "Any chain, any token, or fiat." },
  { k: "Run", v: "Routing, bridging, swaps and policy — handled." },
  { k: "Out", v: "One verified outcome, back to your systems." },
];

export function Product() {
  return (
    <section id="product" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col bg-surface">
          <div className="w-full max-w-md">
            <SectionHeader
              index="01"
              eyebrow="The product"
              title="An API for financial outcomes, not blockchain plumbing"
              lead="You describe what needs to happen. Epoch determines how, coordinates execution across chains and protocols, and reports back the result. Your team works with outcomes; the complexity stays on our side."
              className="max-w-md"
            />

            {/* Ruled list rather than bulleted checks — reads as a spec. */}
            <ul className="mt-8 border-t border-line">
              {points.map((p) => (
                <li
                  key={p.k}
                  className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 border-b border-line py-3.5"
                >
                  <span className="label text-accent-strong">{p.k}</span>
                  <span className="t-body text-ink-soft">{p.v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
          <div className="panel relative w-full max-w-md p-8">
            <RailsDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
