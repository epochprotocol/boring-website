import { RuledList, type RuledRow } from "./RuledList";
import { SectionHeader } from "./SectionHeader";

const problems: RuledRow[] = [
  {
    index: "01",
    title: "Fragmented liquidity and rails",
    body: "Assets, protocols, and payment rails are scattered across networks that were never designed to work together.",
  },
  {
    index: "02",
    title: "Integration is a standing cost",
    body: "Every new protocol or network means months of engineering work and more overhead for your team.",
  },
  {
    index: "03",
    title: "Vendor lock-in limits you",
    body: "Locking into one provider limits your ability to scale, switch, or adapt as the market moves.",
  },
];

export function Problems() {
  return (
    <section className="on-dark on-dark-band section border-b border-line">
      <div className="container-x">
        <SectionHeader
          index="03"
          eyebrow="Why this is hard today"
          title="Building on-chain in-house is slow, costly, and rigid"
        />
        <RuledList rows={problems} scene="problems" className="section-body" />
      </div>
    </section>
  );
}
