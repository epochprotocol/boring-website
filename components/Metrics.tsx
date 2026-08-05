"use client";

import CursorGrid from "@/components/CursorGrid";
import { NETWORK_STAGE, STATUS_URL } from "@/lib/site";

/**
 * The figure band. CursorGrid replaces the static lattice: cells light under
 * the pointer so the band feels live without competing with the claims.
 *
 * The figures animate as counters on entry — the one place on the page where
 * motion carries information, because watching a number resolve is what makes
 * "one" and "zero" land as claims rather than words.
 */
const metrics = [
  { k: "One", v: "API for every chain and rail", count: 1 },
  { k: "One", v: "signature, start to finish", count: 1 },
  { k: "Zero", v: "internal Web3 engineering", count: 0 },
];

export function Metrics() {
  return (
    <section
      className="on-dark on-dark-band relative overflow-hidden border-b border-line"
      data-scene="metrics"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <CursorGrid
          cellSize={50}
          color="#d7c2ff"
          radius={90}
          falloff="smooth"
          holdTime={400}
          fadeDuration={500}
          lineWidth={1.1}
          maxOpacity={0.55}
          fillOpacity={0}
          gridOpacity={0.04}
          cellRadius={0}
          clickPulse
          pulseSpeed={600}
        />
      </div>

      <div className="container-x relative z-10 pointer-events-none py-20 text-center md:py-24">
        {/* "Enterprise-grade · operational 24/7" was an unverifiable claim.
            Once STATUS_URL is set this becomes a link to real uptime data,
            which is the only version of this statement worth making. */}
        {STATUS_URL ? (
          <a
            href={STATUS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="chip pointer-events-auto transition-colors hover:text-ink"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-teal" />
            Live uptime &amp; incident history
          </a>
        ) : (
          <span className="chip">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-teal" />
            {NETWORK_STAGE} &middot; live
          </span>
        )}

        <h2
          className="display t-h2 mx-auto mt-7 max-w-2xl text-ink"
          data-mask-lines
        >
          Institutional scale, without the operational overhead
        </h2>

        <dl className="section-body mx-auto grid max-w-3xl grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((m) => (
            <div key={m.v} className="px-6 py-8">
              <dt
                className="display text-5xl text-ink md:text-6xl"
                data-figure
                data-mask-lines
              >
                {m.k}
              </dt>
              <dd className="mx-auto mt-3 max-w-[12rem] text-sm leading-relaxed text-muted">
                {m.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
