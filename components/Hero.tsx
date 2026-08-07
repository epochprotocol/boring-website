import { CtaButtons } from "./CtaButtons";
import { HeroBeams } from "./HeroBeams";
import { HeroVisual } from "./HeroVisual";
import { NETWORK_STAGE, POSITIONING, STATUS_URL } from "@/lib/site";

export function Hero() {
  return (
    <section
      className="isolate relative overflow-hidden border-b border-line bg-canvas"
      data-scene="hero"
    >
      {/* The animated light field sits behind every piece of hero content,
          spanning the section edge to edge. Compositing hides the scene's
          black canvas against whichever theme is active, so the section
          keeps its own background and only the ribbons show. */}
      <HeroBeams />

      {/* Asymmetric column split — narrative slightly wider than the object,
          which stops the two halves reading as a stalemate. */}
      <div className="container-x relative z-10 pt-16 pb-20 md:pt-24 md:pb-28">
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

            {/* The one gradient on the site. It fills the headline only, and
                it is a tone fade (ink to its own grey), never a colour
                sweep. */}
            <h1
              className="display heading-gradient t-hero mt-6 max-w-[680px]"
              data-mask-lines
            >
              Define the outcome.
              <br />
              Epoch does the rest.
            </h1>

            <p
              className="t-lead mt-6 max-w-[680px] text-ink-soft"
              data-hero-item
            >
              You define the financial outcome. Epoch handles the chains and
              rails underneath. No blockchain expertise required.
            </p>

            <CtaButtons primaryOnly className="mt-8" data-hero-item />

            {/* Answer the two questions a bank asks first, above the fold. */}
            <div className="mt-9 flex flex-wrap items-center gap-2 border-t border-line pt-6" data-hero-item>
              <span className="chip">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                You keep your keys
              </span>
              <span className="chip">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                Policy before settlement
              </span>
              <span className="chip">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                One signature, solver-filled
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

          <div className="relative lg:pl-4">
            <HeroBeams />
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
