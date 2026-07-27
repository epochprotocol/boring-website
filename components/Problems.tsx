import { Reveal } from "./Reveal";

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
    <section className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col on-dark">
          <div className="w-full max-w-md">
            <Reveal as="p" className="eyebrow">
              Why this is hard today
            </Reveal>
            <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
              Building on-chain in-house is slow, costly, and rigid
            </Reveal>
          </div>
        </div>

        <div className="split-col bg-surface">
          <div className="w-full max-w-md space-y-4">
            {problems.map((p, i) => (
              <Reveal key={p.n} delay={i * 70} className="card p-6">
                <span className="display inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-lg text-accent-strong">
                  {p.n}
                </span>
                <h3 className="display mt-6 text-xl text-ink">{p.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
