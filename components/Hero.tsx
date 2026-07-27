import { CtaButtons } from "./CtaButtons";
import { HeroVisual } from "./HeroVisual";
import { TAGLINE } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

      <div className="container-x relative pt-24 pb-24 md:pt-32 md:pb-36">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.02fr] lg:gap-20">
          <div>
            <p className="eyebrow reveal is-visible">{TAGLINE}</p>

            <h1 className="display mt-7 text-5xl sm:text-6xl md:text-[4.6rem] text-ink">
              Define the outcome.
              <br />
              <span className="text-glow">Epoch does the rest.</span>
            </h1>

            <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
              Your company defines the financial outcome. Epoch handles every
              chain, protocol, and payment rail underneath &mdash; no blockchain
              expertise required.
            </p>

            <CtaButtons className="mt-9" />
          </div>

          <div className="lg:pl-4">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
