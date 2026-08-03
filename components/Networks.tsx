import { ChainMark, type ChainName } from "./ChainMark";
import { Reveal } from "./Reveal";
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

export function Networks() {
  return (
    <section id="networks" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col bg-surface-2">
          <SectionHeader
            index="09"
            eyebrow="Coverage"
            title="Cross-chain support, out of the box"
            lead="Eight networks in production today, with venue and bridge coverage maintained on our side. Build once against one interface."
            className="w-full max-w-md"
          />
        </div>

        <div className="split-col on-dark">
          <div className="w-full max-w-md">
            {/* Coverage reads as a register: name, mark, live state. */}
            <Reveal className="ledger-grid grid-cols-2">
              {networks.map((n) => (
                <div
                  key={n}
                  className="ledger-cell ledger-cell-tight ledger-cell-interactive flex items-center gap-3"
                >
                  <span className="icon-tile">
                    <ChainMark name={n} />
                  </span>
                  <span className="t-body font-medium text-ink">{n}</span>
                </div>
              ))}
            </Reveal>

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
