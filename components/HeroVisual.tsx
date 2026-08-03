import { ChainMark, type ChainName } from "./ChainMark";
import { Icon } from "./Icon";

/**
 * The hero object. Previously a stack of pillowy shadowed cards with a
 * peeking card behind for "depth" — a consumer-app trope.
 *
 * It now reads as a settlement record: a ruled header, a keyed field table in
 * monospace, and a route footer. The thing being sold is a verifiable
 * outcome, so the visual should look like the receipt for one.
 */

const rows: { k: string; v: string; mono?: boolean }[] = [
  { k: "Outcome", v: "acquire", mono: true },
  { k: "Source", v: "Any chain, token, or fiat" },
  { k: "Amount", v: "$250,000.00", mono: true },
  { k: "Policy", v: "KYC · Sanctions", mono: true },
  { k: "Destination", v: "USDC on Base" },
];

const route: ChainName[] = ["Ethereum", "Base", "Arbitrum", "Solana"];

export function HeroVisual() {
  return (
    <div className="relative">
      <div className="panel relative overflow-hidden bg-surface">
        <div
          className="absolute inset-0 grid-backdrop opacity-50"
          aria-hidden="true"
        />

        {/* Record header */}
        <div className="relative flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <span className="label">Outcome record</span>
          <span className="chip">
            <span
              className="pulse-dot h-1.5 w-1.5 rounded-full bg-teal"
              aria-hidden="true"
            />
            Settled
          </span>
        </div>

        <div className="relative px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="icon-tile">
              <Icon name="boxCheck" />
            </span>
            <div>
              <p className="display t-h3 text-ink">Acquire position</p>
              <p className="label mt-1">Ref EPX-4471-0C</p>
            </div>
          </div>

          {/* Keyed field table — hairline rules, monospace values. */}
          <dl className="mt-5 border-t border-line">
            {rows.map((r) => (
              <div
                key={r.k}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
              >
                <dt className="label">{r.k}</dt>
                <dd
                  className={`text-right text-sm text-ink ${
                    r.mono ? "font-mono" : "font-medium"
                  }`}
                >
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-ink-soft">
              {route.map((ch) => (
                <span key={ch} title={ch}>
                  <ChainMark name={ch} className="h-4 w-4" />
                </span>
              ))}
              <span className="label ml-1">4 chains &rarr; 1 outcome</span>
            </div>
            <span className="label">1 signature</span>
          </div>
        </div>
      </div>
    </div>
  );
}
