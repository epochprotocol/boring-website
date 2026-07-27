import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { RailsDiagram } from "./RailsDiagram";

const capabilities = [
  {
    icon: "crossChain" as const,
    title: "Move funds across chains",
    body: "Route value between any supported networks in a single instruction, without manual bridging.",
  },
  {
    icon: "swap" as const,
    title: "Swap and acquire positions",
    body: "Get users or treasury into the exact asset or position your product requires.",
  },
  {
    icon: "shield" as const,
    title: "Add compliance checks",
    body: "Insert screening and policy checks into the flow so execution stays within your controls.",
  },
  {
    icon: "layers" as const,
    title: "Compose multi-step flows",
    body: "Chain several actions into one outcome that either completes or safely does not.",
  },
];

export function Product() {
  return (
    <section id="product" className="section border-b border-line bg-surface">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <Reveal as="p" className="eyebrow">
              The product
            </Reveal>
            <Reveal as="h2" className="display mt-4 text-3xl md:text-4xl text-ink">
              An API for financial outcomes, not blockchain plumbing
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-ink-soft">
              You describe what needs to happen. Epoch determines how,
              coordinates execution across chains and protocols, and reports
              back the result. Your team works with outcomes; the complexity
              stays on our side.
            </Reveal>
          </div>

          <Reveal delay={80} className="card-static flex justify-center p-8">
            <RailsDiagram />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 60} className="card p-7">
              <div className="icon-tile">
                <Icon name={c.icon} />
              </div>
              <h3 className="display mt-5 text-xl text-ink">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {c.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
