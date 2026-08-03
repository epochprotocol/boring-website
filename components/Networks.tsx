import { ChainMark, type ChainName } from "./ChainMark";
import { Reveal } from "./Reveal";

const networks: ChainName[] = [
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
    <section id="networks" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col bg-surface-2">
          <div className="w-full max-w-md">
            <Reveal as="p" className="eyebrow">
              Coverage
            </Reveal>
            <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
              Cross-chain support, out of the box
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-ink-soft">
              Eight networks in production today, with venue and bridge
              coverage maintained on our side. Build once against one
              interface.
            </Reveal>
          </div>
        </div>

        <div className="split-col on-dark">
          <div className="w-full max-w-md">
            <div className="grid grid-cols-2 gap-4">
              {networks.map((n, i) => (
                <Reveal
                  key={n}
                  delay={i * 40}
                  className="card flex items-center gap-3 px-5 py-4"
                >
                  <span className="icon-tile">
                    <ChainMark name={n} />
                  </span>
                  <span className="text-sm font-semibold text-ink">{n}</span>
                </Reveal>
              ))}
            </div>

            <p className="mt-6 text-sm text-muted">
              Coverage expands continuously. New networks and protocols are
              added on our side, with no integration work on yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
