import { Reveal } from "./Reveal";
import { RailsDiagram } from "./RailsDiagram";

export function Product() {
  return (
    <section id="product" className="section border-b border-line bg-surface">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
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
          </div>

          <Reveal delay={80} className="card-static flex justify-center p-8 md:p-10">
            <RailsDiagram />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
