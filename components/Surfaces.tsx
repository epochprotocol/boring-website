import { DOCS_URL, LIVE_APP_URL, SURFACES } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";

const DEVELOPER_RESOURCES = [
  {
    name: "Intents SDK",
    href: "https://www.npmjs.com/package/@epoch-protocol/epoch-intents-sdk",
    detail:
      "The primary integration for signed outcomes. Use it to describe an intent, fetch a quote, coordinate the user’s wallet signature, submit execution, and poll status from TypeScript or a headless agent.",
    command: "npm install @epoch-protocol/epoch-intents-sdk",
  },
  {
    name: "OpenAPI specification",
    href: "/openapi.json",
    detail:
      "The machine-readable allocator API: mainnet and testnet servers, unique operation IDs, typed requests and responses, error shapes, gasless relay operations, and the published versioning policy.",
    command: "GET https://epochprotocol.xyz/openapi.json",
  },
  {
    name: "Epoch Intents CLI",
    href: "https://www.npmjs.com/package/epoch-intents-cli",
    detail:
      "A read-only terminal client for agents, operators, and developers. Inspect allocator health, supported chains, sponsor nonces, intent status, Miden collateral configuration, and gasless relay availability.",
    command: "npx epoch-intents-cli health",
  },
  {
    name: "Agent context & skills",
    href: "https://docs.epochprotocol.xyz/integration-guides/skills-md",
    detail:
      "Canonical integration instructions for coding agents: when to use Epoch, non-custodial constraints, the full SDK workflow, and the gasless-batching decision between relayed and injected-wallet execution.",
    command: "integrate-epoch · epoch-gasless-batching",
  },
] as const;

/**
 * The three integration surfaces, taken from the live site.
 *
 * The boring-website had flattened all of this into "one API", which
 * undersold the product badly: a drop-in widget, an SDK you compose against,
 * and a raw intents API are three different commitments of engineering time.
 * Naming them is what lets a technical buyer place the work before they book
 * a call — which is exactly what this page is for.
 */
export function Surfaces() {
  if (SURFACES.length === 0) return null;

  return (
    <section id="build" className="section border-b border-line bg-canvas">
      <div className="container-x">
        <SectionHeader
          index="06"
          eyebrow="Build"
          title="Three ways in, one execution layer"
          lead="Integrate at the level that suits your team. All three resolve to the same coordination layer underneath."
        />

        <div className="section-body border-b border-line" data-rows>
          {SURFACES.map((s, i) => (
            <div
              key={s.name}
              data-row
              className="ruled-row grid gap-x-8 gap-y-2 border-t border-line py-7 md:grid-cols-[3.5rem_minmax(0,19rem)_minmax(0,1fr)] md:py-8"
            >
              <span className="section-index text-accent-strong">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display t-h3 text-ink">{s.name}</h3>
              <p className="t-body text-ink-soft">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link"
          >
            Mainnet docs
            <span className="btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
          {LIVE_APP_URL ? (
            <a
              href={LIVE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link"
            >
              See it running in a live app
              <span className="btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          ) : null}
        </div>

        <div className="mt-16 border-t border-line pt-10">
          <p className="eyebrow">Epoch Protocol developer resources</p>
          <h3 className="display t-h2 mt-4 max-w-3xl text-ink">
            Build, inspect, and automate with published tools.
          </h3>
          <p className="t-lead mt-4 max-w-3xl text-ink-soft">
            Start with the Intents SDK for signed financial outcomes. Use the
            OpenAPI document when an agent or tool needs the HTTP contract, the
            CLI for read-only terminal workflows, and the published agent
            skills for an integration checklist. Every execution remains
            non-custodial: the user holds funds and signs from their own wallet.
          </p>

          <div className="mt-10 grid border-l border-t border-line md:grid-cols-2">
            {DEVELOPER_RESOURCES.map((resource) => (
              <article
                key={resource.name}
                className="border-b border-r border-line p-6 md:p-8"
              >
                <h4 className="display t-h3 text-ink">{resource.name}</h4>
                <p className="t-body mt-3 text-ink-soft">{resource.detail}</p>
                <code className="mt-5 block overflow-x-auto border border-line bg-canvas-raised px-3 py-2 text-xs text-accent">
                  {resource.command}
                </code>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="arrow-link mt-5"
                >
                  Open {resource.name}
                  <span className="btn-arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
              </article>
            ))}
          </div>

          <div className="mt-8 max-w-3xl border-l-2 border-accent pl-5">
            <h4 className="label text-ink">When an agent should call Epoch</h4>
            <p className="t-body mt-3 text-ink-soft">
              Reach for Epoch when a wallet, application, or AI agent needs a
              signed swap, bridge, payment, deposit, yield position, or protocol
              interaction across chains without owning solver and settlement
              infrastructure. Do not use Epoch for read-only analytics,
              custodial fund management, or unattended execution that bypasses
              the user’s signature. For one chain and one protocol already
              integrated directly, the direct path may remain simpler.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
