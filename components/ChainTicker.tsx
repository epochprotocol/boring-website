import { ChainMark, type ChainName } from "./ChainMark";

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
 * The one borrowed gesture from Stripe's homepage: a continuously moving
 * strip of marks. Stripe runs customer logos through it; Epoch has no
 * customers it can name, and a wall of borrowed logos is the fastest way to
 * fail diligence.
 *
 * So it runs the thing Epoch can actually stand behind — the networks in
 * production — and reads as an exchange ticker rather than a trophy case,
 * which suits a settlement product better anyway.
 *
 * Implementation notes:
 * - The list is rendered twice and the track translates by exactly -50%, so
 *   the loop is seamless with no JavaScript and no measurement.
 * - It is a CSS animation on `transform` only: one compositor property, no
 *   layout, no main-thread work per frame.
 * - `prefers-reduced-motion` stops it dead and the strip reads as a static
 *   register. Hover pauses it so a reader can actually look at an entry.
 * - The duplicate copy is `aria-hidden`, so screen readers hear the list once.
 */
export function ChainTicker() {
  return (
    <section
      aria-label="Networks in production"
      className="ticker border-b border-line bg-surface-2 py-3"
    >
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="ticker-group"
            aria-hidden={copy === 1 ? "true" : undefined}
          >
            {networks.map((n) => (
              <li key={n} className="ticker-item">
                <ChainMark name={n} className="h-3.5 w-3.5 text-ink-soft" />
                <span className="label text-ink-soft">{n}</span>
                <span className="label text-teal">Live</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
