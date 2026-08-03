import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

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
    <section id="use-cases" className="on-dark on-dark-band section border-b border-line">
      <div className="container-x">
        <SectionHeader
          index="08"
          eyebrow="Use cases"
          title="One integration, many financial products"
        />

        <Reveal className="ledger-grid section-body md:grid-cols-2">
          {cases.map((c) => (
            <div key={c.tag} className="ledger-cell ledger-cell-interactive">
              <article>
                <div className="flex items-center justify-between gap-4">
                  <span className="tag">{c.tag}</span>
                  <span className="section-index">{c.no}</span>
                </div>
                <div className="mt-5 flex items-start gap-4">
                  <span className="icon-tile">
                    <Icon name={c.icon} />
                  </span>
                  <div>
                    <h3 className="display t-h3 text-ink">{c.title}</h3>
                    <p className="t-body mt-2.5 text-ink-soft">{c.body}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
