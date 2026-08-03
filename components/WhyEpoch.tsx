import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

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
        <SectionHeader
          index="05"
          eyebrow="For institutions & product teams"
          title="Why build on Epoch"
          lead="Scale across Web3 without scaling operational or engineering complexity."
        />

        <Reveal className="ledger-grid section-body sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="ledger-cell ledger-cell-interactive">
              <div className="icon-tile">
                <Icon name={b.icon} />
              </div>
              <h3 className="display t-h3 mt-5 text-ink">{b.title}</h3>
              <p className="t-body mt-2.5 text-ink-soft">{b.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
