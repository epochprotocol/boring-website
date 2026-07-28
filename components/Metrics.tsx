import { Reveal } from "./Reveal";

const metrics = [
  { k: "One", v: "API for every chain and rail" },
  { k: "One", v: "signature, start to finish" },
  { k: "Zero", v: "in-house Web3 engineering" },
];

// 1inch-style pixel motif
const CELLS = [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1];

function Pixels() {
  return (
    <span className="inline-grid grid-cols-4 gap-[3px]" aria-hidden="true">
      {CELLS.map((on, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-[2px] ${
            on ? "bg-accent" : "bg-line-strong"
          }`}
        />
      ))}
    </span>
  );
}

export function Metrics() {
  return (
    <section className="on-dark on-dark-band relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 grid-backdrop opacity-50" aria-hidden="true" />
      <div className="absolute inset-0 atmosphere-soft opacity-70" aria-hidden="true" />

      <div className="container-x relative py-20 text-center md:py-28">
        <Reveal>
          <div className="flex items-center justify-center gap-4">
            <Pixels />
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 font-mono text-xs text-ink-soft">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
              Enterprise-grade &middot; operational 24/7
            </span>
            <Pixels />
          </div>

          <h2 className="display mx-auto mt-8 max-w-3xl text-3xl md:text-4xl text-ink">
            Institutional scale, without the operational overhead
          </h2>

          <dl className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-12 sm:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.v}>
                <dt className="display text-6xl text-ink md:text-7xl">{m.k}</dt>
                <dd className="mx-auto mt-3 max-w-[12rem] text-sm leading-relaxed text-muted">
                  {m.v}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
