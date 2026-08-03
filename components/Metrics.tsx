import { STATUS_URL } from "@/lib/site";
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
          {/* "Enterprise-grade · operational 24/7" was an unverifiable claim.
              Once STATUS_URL is set this becomes a link to real uptime data,
              which is the only version of this statement worth making. */}
          <div className="flex items-center justify-center gap-4">
            <Pixels />
            {STATUS_URL ? (
              <a
                href={STATUS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chip transition-colors hover:text-ink"
              >
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-teal" />
                Live uptime &amp; incident history
              </a>
            ) : (
              <span className="chip">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Built for production workloads
              </span>
            )}
            <Pixels />
          </div>

          <h2 className="display t-h2 mx-auto mt-7 max-w-2xl text-ink">
            Institutional scale, without the operational overhead
          </h2>

          {/* Ruled columns rather than three floating numbers. The vertical
              hairlines are what make it read as a figure table. */}
          <dl className="section-body mx-auto grid max-w-3xl grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {metrics.map((m) => (
              <div key={m.v} className="px-6 py-8">
                <dt className="display text-5xl text-ink md:text-6xl">{m.k}</dt>
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
