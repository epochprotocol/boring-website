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
    <section className="section border-b border-line bg-surface-2">
      <div className="container-x">
        <div className="max-w-2xl">
          <Reveal as="p" className="eyebrow">
            Why this is hard today
          </Reveal>
          <Reveal as="h2" className="display mt-4 text-3xl md:text-4xl text-ink">
            Building on-chain in-house is slow, costly, and rigid
          </Reveal>
        </div>

        <div className="relative mt-14 grid gap-10 md:grid-cols-3">
          <div
            className="absolute top-6 left-0 right-0 hidden h-px bg-line-strong md:block"
            aria-hidden="true"
          />
          {problems.map((p, i) => (
            <Reveal key={p.n} delay={i * 70} className="relative">
              <span className="display relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-surface text-lg text-accent">
                {p.n}
              </span>
              <h3 className="display mt-5 text-xl text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
