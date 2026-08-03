import { RuledList, type RuledRow } from "./RuledList";
import { SectionHeader } from "./SectionHeader";

const benefits: RuledRow[] = [
  {
    index: "01",
    title: "One-click UX",
    body: "Your users click once. Epoch handles the routing, bridging, and execution behind the scenes.",
  },
  {
    index: "02",
    title: "Abstracted execution",
    body: "Built for banks, fintechs, neobanks, institutions, and hedge funds. No internal Web3 team required.",
  },
  {
    index: "03",
    title: "API-first integration",
    body: "One integration instead of assembling and maintaining bridges, DEXs, and operational tooling yourself.",
  },
  {
    index: "04",
    // Previously "Everything included — no third-party integrations needed",
    // which sophisticated buyers read as either naive or untrue. Owning the
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
        <RuledList rows={benefits} scene="why" className="section-body" />
      </div>
    </section>
  );
}
