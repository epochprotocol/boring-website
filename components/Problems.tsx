import { FragmentInfographic } from "./Infographics";
import { RuledList, type RuledRow } from "./RuledList";
import { SectionHeader } from "./SectionHeader";

const problems: RuledRow[] = [
  {
    index: "01",
    title: "Fragmented liquidity and rails",
    body: "Assets, protocols, and payment rails are scattered across networks that were never designed to work together.",
    icon: "nodes",
  },
  {
    index: "02",
    title: "Integration is a standing cost",
    body: "Every new protocol or network means months of engineering work and more overhead for your team.",
    icon: "cost",
  },
  {
    index: "03",
    title: "Vendor dependence limits you",
    body: "Locking into one provider limits your ability to scale, switch, or adapt as the market moves.",
    icon: "lockIn",
  },
];

export function Problems() {
  return (
    <section className="on-dark on-dark-band section border-b border-line">
      <div className="container-x">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          <SectionHeader
            index="01"
            eyebrow="Why this is hard today"
            title="Building onchain yourself is slow, costly, and rigid"
          />
          <FragmentInfographic className="mx-auto w-full max-w-lg lg:mx-0 lg:justify-self-end" />
        </div>
        <RuledList rows={problems} scene="problems" className="section-body" />
      </div>
    </section>
  );
}
