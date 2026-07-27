import { CtaButtons } from "./CtaButtons";
import { CodePanel } from "./CodePanel";
import { TAGLINE } from "@/lib/site";

const stats = [
  { k: "One", v: "API integration for every chain and rail" },
  { k: "One", v: "signature from the end user, start to finish" },
  { k: "Zero", v: "in-house Web3 engineering required" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 grid-backdrop opacity-70" aria-hidden="true" />

      <div className="container-x relative pt-20 pb-20 md:pt-28 md:pb-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow reveal is-visible">{TAGLINE}</p>

            <h1 className="display mt-6 text-4xl sm:text-5xl md:text-[3.6rem] text-ink">
              Define the outcome.
              <br />
              <span className="text-glow">Epoch executes it on-chain.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">
              Your company specifies the financial outcome &mdash; move funds
              across chains, swap, open a position, add compliance checks, or
              compose multi-step flows. Epoch handles every chain, protocol,
              and payment rail underneath. No blockchain expertise required.
            </p>

            <CtaButtons className="mt-9" />

            <p className="mt-6 text-sm text-muted">
              No dedicated Web3 team. No infrastructure to build from zero.
            </p>
          </div>

          <div className="on-dark relative rounded-2xl lg:pl-0">
            <CodePanel />
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-1 divide-y divide-line rounded-2xl border border-line bg-surface/60 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((item) => (
            <div key={item.v} className="p-7">
              <dt className="display text-4xl text-ink">{item.k}</dt>
              <dd className="mt-1.5 text-sm text-muted">{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
