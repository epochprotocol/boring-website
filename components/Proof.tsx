import { DESIGN_PARTNERS, INVESTORS, PARTNERS, TEAM } from "@/lib/site";
import { Reveal } from "./Reveal";

/**
 * The evidence layer. Institutions underwrite people and references before
 * they underwrite architecture, and the site previously offered neither.
 *
 * Every block here is conditional: with nothing configured in lib/site.ts the
 * whole section returns null and the page simply doesn't have it. That is
 * deliberate. A "trusted by" row with invented names is the fastest way to
 * lose a deal in diligence.
 */

export function Proof() {
  const hasPartners = DESIGN_PARTNERS.length > 0;
  const hasInvestors = INVESTORS.length > 0;
  const hasTeam = TEAM.length > 0;
  const hasEcosystem = PARTNERS.length > 0;

  // PARTNERS alone doesn't justify the section — Miden is already credited in
  // the compliance block, and a whole band built around one line reads thin.
  if (!hasPartners && !hasInvestors && !hasTeam) return null;

  return (
    <section id="proof" className="section border-b border-line bg-surface">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            Who we work with
          </Reveal>
          <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
            Built with institutions, not for a thesis
          </Reveal>
        </div>

        {hasPartners ? (
          <div className="mt-14">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Design partners
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {DESIGN_PARTNERS.map((p, i) => (
                <Reveal key={p.descriptor} delay={i * 60} className="card p-7">
                  <p className="display text-lg text-ink">{p.descriptor}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {p.detail}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {hasTeam ? (
          <div className="mt-16">
            <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
              Leadership
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m, i) => (
                <Reveal key={m.name} delay={i * 60} className="card p-7">
                  <p className="display text-lg text-ink">{m.name}</p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-widest text-accent-strong">
                    {m.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {m.background}
                  </p>
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-sm text-accent-strong underline underline-offset-4"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        ) : null}

        {hasInvestors || hasEcosystem ? (
          <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
            {hasInvestors ? (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                  Backed by
                </h3>
                <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
                  {INVESTORS.map((inv) => (
                    <li key={inv.name} className="text-base font-semibold text-ink">
                      {inv.url ? (
                        <a
                          href={inv.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent-strong transition-colors"
                        >
                          {inv.name}
                        </a>
                      ) : (
                        inv.name
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {hasEcosystem ? (
              <div>
                <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                  Infrastructure partners
                </h3>
                <ul className="mt-5 space-y-2">
                  {PARTNERS.map((p) => (
                    <li key={p.name} className="text-sm text-ink-soft">
                      <span className="font-semibold text-ink">{p.name}</span>{" "}
                      &mdash; {p.detail}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
