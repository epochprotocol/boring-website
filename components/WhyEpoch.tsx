import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const benefits = [
  {
    icon: "click" as const,
    title: "One-click UX",
    body: "Your users click once. Epoch handles the routing, bridging, and execution behind the scenes.",
  },
  {
    icon: "bank" as const,
    title: "Abstracted execution",
    body: "Built for banks, fintechs, neobanks, institutions, and hedge funds. No internal Web3 team required.",
  },
  {
    icon: "plug" as const,
    title: "API-first integration",
    body: "One integration instead of assembling and maintaining bridges, DEXs, and operational tooling yourself.",
  },
  {
    icon: "boxCheck" as const,
    title: "Everything included",
    body: "No additional tools, services, or third-party integrations needed. Epoch works out of the box.",
  },
];

export function WhyEpoch() {
  return (
    <section className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col bg-surface">
          <div className="w-full max-w-md">
            <Reveal as="p" className="eyebrow">
              For institutions &amp; product teams
            </Reveal>
            <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
              Why build on Epoch
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-ink-soft">
              Scale across Web3 without scaling operational or engineering
              complexity.
            </Reveal>
          </div>
        </div>

        <div className="split-col on-dark">
          <div className="grid w-full max-w-lg gap-4 sm:grid-cols-2">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 60} className="card p-6">
                <div className="icon-tile">
                  <Icon name={b.icon} />
                </div>
                <h3 className="display mt-4 text-lg text-ink">{b.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {b.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
