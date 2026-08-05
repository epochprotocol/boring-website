import { RuledList, type RuledRow } from "./RuledList";
import { SectionHeader } from "./SectionHeader";

const benefits: RuledRow[] = [
  {
    index: "01",
    label: "UX",
    title: "Your users click once",
    body: "Epoch handles the routing, bridging, and execution behind the scenes, so the whole flow feels like a single action.",
    icon: "click",
  },
  {
    index: "02",
    label: "Institutional",
    title: "Built for institutions",
    body: "Banks, fintechs, neobanks, and hedge funds ship with Epoch. No internal Web3 team required.",
    icon: "bank",
  },
  {
    index: "03",
    label: "Integration",
    title: "Built around the API",
    body: "One integration instead of assembling and maintaining bridges, DEXs, and operational tooling yourself.",
    icon: "plug",
  },
  {
    index: "04",
    label: "Operations",
    // Previously "Everything included", which sophisticated buyers read as
    // either naive or untrue. Owning the dependency and the failure path is
    // the more credible position.
    title: "We own the dependencies",
    body: "Bridges, venues and oracles sit behind our SLA, not yours. We monitor them, route around degradation, and reconcile failed legs.",
    icon: "boxCheck",
  },
];

export function WhyEpoch() {
  return (
    <section className="section border-b border-line bg-surface">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="For institutions & product teams"
          title="Why build on Epoch"
          lead="Scale across Web3 without scaling operational or engineering complexity."
        />
        <RuledList rows={benefits} scene="why" className="section-body" />
      </div>
    </section>
  );
}
