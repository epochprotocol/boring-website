import { RuledList, type RuledRow } from "./RuledList";
import { SectionHeader } from "./SectionHeader";

const benefits: RuledRow[] = [
  {
    index: "01",
    label: "UX",
    title: "One-click UX",
    body: "Routing, bridging, and execution happen behind one action.",
    icon: "click",
  },
  {
    index: "02",
    label: "Institutional",
    title: "Built for institutions",
    body: "Banks, fintechs, and funds ship without a Web3 team.",
    icon: "bank",
  },
  {
    index: "03",
    label: "Integration",
    title: "One API",
    body: "Skip assembling bridges, DEXs, and ops tooling yourself.",
    icon: "plug",
  },
  {
    index: "04",
    label: "Operations",
    // Previously "Everything included", which sophisticated buyers read as
    // either naive or untrue. Owning the dependency and the failure path is
    // the more credible position.
    title: "We own the dependencies",
    body: "Bridges, venues, and oracles sit behind our SLA, not yours. We take care of everything for you.",
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
          lead="Scale across Web3 without scaling ops or engineering."
        />
        <RuledList rows={benefits} scene="why" className="section-body" />
      </div>
    </section>
  );
}
