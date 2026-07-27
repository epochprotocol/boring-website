import { Reveal } from "./Reveal";

const networks = [
  "Ethereum",
  "Base",
  "Arbitrum",
  "Optimism",
  "Polygon",
  "Avalanche",
  "BNB Chain",
  "Solana",
];

export function Networks() {
  return (
    <section id="networks" className="section border-b border-line bg-surface-2">
      <div className="container-x">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            Coverage
          </Reveal>
          <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
            Cross-chain support, out of the box
          </Reveal>
          <Reveal as="p" className="mt-5 text-lg md:text-xl leading-relaxed text-ink-soft">
            We support every major chain and protocol so your team doesn&rsquo;t
            have to. Build once, reach everywhere.
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {networks.map((n, i) => (
            <Reveal
              key={n}
              delay={i * 40}
              className="card flex items-center gap-3 px-5 py-4"
            >
              <span className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-sm text-accent-strong">
                {n.charAt(0)}
              </span>
              <span className="text-sm font-semibold text-ink">{n}</span>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-sm text-muted">
          Coverage expands continuously. New networks and protocols are added on
          our side, with no integration work on yours.
        </p>
      </div>
    </section>
  );
}
