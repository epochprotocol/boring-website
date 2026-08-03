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
    // Previously "Everything included — no third-party integrations needed",
    // which sophisticated buyers read as either naive or untrue: everyone
    // knows this depends on bridges, venues and oracles. Owning the
    // dependency and the failure path is the more credible position.
    title: "We own the dependencies",
    body: "Bridges, venues and oracles sit behind our SLA, not yours. We monitor them, route around degradation, and reconcile failed legs.",
  },
];

export function WhyEpoch() {
  return (
    <section className="section border-b border-line bg-surface">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            For institutions &amp; product teams
          </Reveal>
          <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
            Why build on Epoch
          </Reveal>
          <Reveal as="p" className="mt-5 text-lg md:text-xl leading-relaxed text-ink-soft">
            Scale across Web3 without scaling operational or engineering
            complexity.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 60} className="card p-7">
              <div className="icon-tile">
                <Icon name={b.icon} />
              </div>
              <h3 className="display mt-5 text-lg text-ink">{b.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                {b.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
