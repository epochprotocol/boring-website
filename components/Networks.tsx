import { ChainMark, type ChainName } from "./ChainMark";
import { SectionHeader } from "./SectionHeader";

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

/**
 * Coverage as a register, not a grid of tiles. Each row is a line in a
 * ledger: mark, name, state. The motion layer writes the rows in sequence,
 * which is the one place a stagger genuinely means something — a list being
 * enumerated.
 */
export function Networks() {
  return (
    <section id="networks" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col bg-surface-2">
          <SectionHeader
            index="10"
            eyebrow="Coverage"
            title="Support across chains, out of the box"
            lead="Eight networks live on mainnet today, with venue and bridge coverage maintained on our side. Testnets track the same interface, so nothing changes between environments."
            className="w-full max-w-md"
          />
        </div>

        <div className="split-col on-dark">
          <div className="w-full max-w-md">
            <div
              className="border-b border-line"
              data-scene="coverage"
              data-rows
            >
              {networks.map((n) => (
                <div
                  key={n}
                  data-row
                  className="ruled-row flex items-center gap-4 border-t border-line py-3.5"
                >
                  <ChainMark name={n} className="h-4 w-4 text-ink-soft" />
                  <span className="t-body font-medium text-ink">{n}</span>
                  <span className="label ml-auto">Live</span>
                </div>
              ))}
            </div>

            <p className="t-body mt-5 text-muted">
              Coverage expands continuously. New networks and protocols are
              added on our side, with no integration work on yours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
