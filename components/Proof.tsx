import { DESIGN_PARTNERS, INVESTORS, PARTNERS, TEAM } from "@/lib/site";

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
    <section id="proof" className="section border-b border-line bg-surface" data-scene="proof">
      <div className="container-x">
        {/* Deliberately unnumbered: this is a proof strip between chapters,
            not a chapter of its own, and it renders conditionally. */}
        <div className="max-w-2xl">
          <p className="eyebrow">
            Who we work with
          </p>
          <h2 className="display t-h2 mt-6 text-ink">
            Built with institutions, not for a thesis
          </h2>
        </div>

        {hasPartners ? (
          <div className="section-body">
            <h3 className="label">
              Design partners
            </h3>
            <div className="mt-5 border-b border-line" data-rows>
              {DESIGN_PARTNERS.map((p) => (
                <div key={p.descriptor} data-row className="ruled-row border-t border-line py-6">
                  <p className="display t-h3 text-ink">{p.descriptor}</p>
                  <p className="t-body mt-2 text-ink-soft">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {hasTeam ? (
          <div className="section-body">
            <h3 className="label">
              Leadership
            </h3>
            <div className="mt-5 border-b border-line" data-rows>
              {TEAM.map((m) => (
                <div key={m.name} data-row className="ruled-row border-t border-line py-6">
                  <p className="display t-h3 text-ink">{m.name}</p>
                  <p className="tag mt-1">
                    {m.role}
                  </p>
                  <p className="t-body mt-3 text-ink-soft">
                    {m.background}
                  </p>
                  {m.linkedin ? (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link mt-4 inline-block text-sm"
                    >
                      LinkedIn
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {hasInvestors || hasEcosystem ? (
          <div className="mt-16 grid gap-10 border-t border-line pt-10 md:grid-cols-2">
            {hasInvestors ? (
              <div>
                <h3 className="label">
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
                <h3 className="label">
                  Infrastructure partners
                </h3>
                <ul className="mt-5 space-y-2">
                  {PARTNERS.map((p) => (
                    <li key={p.name} className="text-sm text-ink-soft">
                      <span className="font-semibold text-ink">{p.name}</span>
                      {": "}
                      {p.detail}
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
