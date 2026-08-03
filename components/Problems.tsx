import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const problems = [
  {
    n: "01",
    title: "Fragmented liquidity and rails",
    body: "Assets, protocols, and payment rails are scattered across networks that were never designed to work together.",
  },
  {
    n: "02",
    title: "Integration is a standing cost",
    body: "Every new protocol or network means months of engineering work and more overhead for your team.",
  },
  {
    n: "03",
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

        {/* Ledger grid: hairline-separated cells rather than floating cards.
            The reveal wraps the whole grid, not each cell — cells fading in
            individually would expose the grid's line-coloured background. */}
        <Reveal className="ledger-grid section-body md:grid-cols-3">
          {problems.map((p) => (
            <div key={p.n} className="ledger-cell ledger-cell-interactive">
              <span className="index-mark">{p.n}</span>
              <h3 className="display t-h3 mt-6 text-ink">{p.title}</h3>
              <p className="t-body mt-3 text-ink-soft">{p.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
