import { CtaButtons } from "./CtaButtons";
import { HeroVisual } from "./HeroVisual";
import { NETWORK_STAGE, POSITIONING, STATUS_URL, TAGLINE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line" data-scene="hero">

      {/* Asymmetric column split — narrative slightly wider than the object,
          which stops the two halves reading as a stalemate. */}
      <div className="container-x relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-16">
          <div>
            <p className="flex items-center gap-3">
              <span
                className="h-px w-6 origin-left bg-accent"
                aria-hidden="true"
                data-header-rule
              />
              <span className="label">{POSITIONING}</span>
              {/* Network stage, stated as a fact rather than a claim. The
                  live site leads with it and it is the strongest single
                  signal on the page: this is running, not planned. */}
              <span className="label text-teal">&middot; {NETWORK_STAGE}</span>
            </p>

            {/* Solid ink, no gradient fill. A blue-to-lavender headline is the
                single strongest "consumer crypto" tell on a page like this. */}
            <h1 className="display t-hero mt-6 text-ink" data-mask-lines>
              Define the outcome.
              <br />
              Epoch does the rest.
            </h1>

            <p className="t-lead mt-6 max-w-md text-ink-soft" data-hero-item>
              Your company defines the financial outcome. Epoch handles every
              chain, protocol, and payment rail underneath &mdash; no blockchain
              expertise required.
            </p>

            <CtaButtons className="mt-8" data-hero-item />

            {/* Answer the two questions a bank asks first, above the fold. */}
            <div className="mt-9 flex flex-wrap items-center gap-2 border-t border-line pt-6" data-hero-item>
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
              <span className="chip">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                One signature, solver-coordinated
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
