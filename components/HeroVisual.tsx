import { Icon } from "./Icon";

const rows = [
  { k: "From", v: "Any chain, token, or fiat" },
  { k: "Amount", v: "$250,000" },
  { k: "Compliance", v: "KYC · Sanctions" },
];

const chains = ["ETH", "BASE", "ARB", "SOL"];

export function HeroVisual() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface-2 px-6 py-12 sm:px-10 sm:py-16">
        <div
          className="absolute inset-0 grid-backdrop opacity-40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 atmosphere-soft opacity-80"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-sm">
          {/* card peeking behind for depth */}
          <div
            className="absolute -top-4 left-4 right-4 h-24 rounded-2xl border border-line bg-surface/70"
            aria-hidden="true"
          />

          {/* main outcome card */}
          <div className="card-static relative bg-surface p-6 shadow-xl">
            <div className="flex items-center gap-3">
              <span className="icon-tile">
                <Icon name="boxCheck" />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">
                  Acquire position
                </p>
                <p className="text-xs text-muted">USDC on Base</p>
              </div>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent-strong">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Settled
              </span>
            </div>

            <dl className="mt-6 space-y-3.5">
              {rows.map((r) => (
                <div
                  key={r.k}
                  className="flex items-center justify-between text-sm"
                >
                  <dt className="text-muted">{r.k}</dt>
                  <dd className="font-medium text-ink">{r.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
              <div className="flex -space-x-2">
                {chains.map((ch) => (
                  <span
                    key={ch}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface font-mono text-[9px] text-ink-soft"
                  >
                    {ch}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs text-muted">1 signature</span>
            </div>
          </div>

          {/* floating status pill */}
          <div className="card-static absolute -bottom-5 -right-4 flex items-center gap-2 bg-surface px-3.5 py-2 shadow-lg">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
              <Icon name="crossChain" className="h-4 w-4" />
            </span>
            <div className="pr-1">
              <p className="text-[11px] font-semibold text-ink">Routed</p>
              <p className="text-[10px] text-muted">4 chains → 1 outcome</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
