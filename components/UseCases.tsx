import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

const cases = [
  {
    no: "01",
    icon: "swap" as const,
    tag: "Hedge funds & institutions",
    title: "Execute strategy on-chain without a crypto desk",
    body: "Enter and exit positions, move collateral, and rebalance across chains through a single API with policy controls in the flow.",
  },
  {
    no: "02",
    icon: "bank" as const,
    tag: "Banks & payments",
    title: "Accept any token, deliver the one you want",
    body: "Take inbound from any chain or asset and settle into a single target (for example, USDC on Base). Sweep idle balances into yield.",
  },
  {
    no: "03",
    icon: "plug" as const,
    tag: "Fintechs & neobanks",
    title: "Add on-chain features without rebuilding your stack",
    body: "Offer swap, pay, earn, and cross-chain transfers to your users through one integration instead of many.",
  },
  {
    no: "04",
    icon: "click" as const,
    tag: "Product & platform teams",
    title: "Onboard users into your product in one click",
    body: "Get users from any chain, any token, or fiat straight into the position or state your product needs, with no bridge tutorial.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col on-dark">
          <div className="w-full max-w-md">
            <Reveal as="p" className="eyebrow">
              Use cases
            </Reveal>
            <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
              One integration, many financial products
            </Reveal>
          </div>
        </div>

        <div className="split-col bg-surface">
          <div className="flex w-full max-w-md flex-col gap-4">
            {cases.map((c, i) => (
              <article
                key={c.tag}
                className="card-static p-6"
                style={{ backgroundColor: `var(--card-${i})` }}
              >
                <div className="flex items-center gap-3">
                  <span className="icon-tile">
                    <Icon name={c.icon} />
                  </span>
                  <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent-strong">
                    {c.tag}
                  </span>
                </div>
                <h3 className="display mt-5 text-lg text-ink">{c.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {c.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
