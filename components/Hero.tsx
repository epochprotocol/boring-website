import { CtaButtons } from "./CtaButtons";
import { HeroVisual } from "./HeroVisual";
import { STATUS_URL, TAGLINE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

      <div className="container-x relative pt-24 pb-24 md:pt-32 md:pb-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.02fr] lg:gap-20">
          <div>
            <p className="eyebrow reveal is-visible">{TAGLINE}</p>

            {/* Solid ink, no gradient fill. A blue-to-lavender headline is the
                single strongest "consumer crypto" tell on a page like this. */}
            <h1 className="display mt-6 text-5xl sm:text-6xl md:text-[4.2rem] text-ink">
              Define the outcome.
              <br />
              Epoch does the rest.
            </h1>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Your company defines the financial outcome. Epoch handles every
              chain, protocol, and payment rail underneath &mdash; no blockchain
              expertise required.
            </p>

            <CtaButtons className="mt-8" />

            {/* Answer the two questions a bank asks first, above the fold. */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="chip">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                Non-custodial &mdash; you keep your keys
              </span>
              <span className="chip">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                Policy enforced pre-settlement
              </span>
              {STATUS_URL ? (
                <a
                  href={STATUS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chip hover:border-line-strong"
                >
                  <span
                    className="pulse-dot h-1.5 w-1.5 rounded-full bg-teal"
                    aria-hidden="true"
                  />
                  Live status
                </a>
              ) : null}
            </div>
          </div>

          <div className="lg:pl-4">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
