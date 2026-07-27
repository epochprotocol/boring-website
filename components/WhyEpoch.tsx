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
    <section className="section border-b border-line bg-surface">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal as="p" className="eyebrow">
            For institutions &amp; product teams
          </Reveal>
          <Reveal as="h2" className="display mt-4 text-3xl md:text-4xl text-ink">
            Why build on Epoch
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 60} className="card p-7">
              <div className="flex items-start gap-4">
                <div className="icon-tile">
                  <Icon name={b.icon} />
                </div>
                <div>
                  <h3 className="display text-xl text-ink">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {b.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
