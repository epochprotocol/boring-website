import { DOCS_URL, LIVE_APP_URL, SURFACES } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";

/**
 * The three integration surfaces, taken from the live site.
 *
 * The boring-website had flattened all of this into "one API", which
 * undersold the product badly: a drop-in widget, an SDK you compose against,
 * and a raw intents API are three different commitments of engineering time.
 * Naming them is what lets a technical buyer place the work before they book
 * a call — which is exactly what this page is for.
 */
export function Surfaces() {
  if (SURFACES.length === 0) return null;

  return (
    <section id="build" className="section border-b border-line bg-surface">
      <div className="container-x">
        <SectionHeader
          index="06"
          eyebrow="Build"
          title="Three ways in, one execution layer"
          lead="Integrate at the level that suits your team. All three resolve to the same coordination layer underneath."
        />

        <div className="section-body border-b border-line" data-rows>
          {SURFACES.map((s, i) => (
            <div
              key={s.name}
              data-row
              className="ruled-row grid gap-x-8 gap-y-2 border-t border-line py-7 md:grid-cols-[3.5rem_minmax(0,19rem)_minmax(0,1fr)] md:py-8"
            >
              <span className="section-index text-accent-strong">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display t-h3 text-ink">{s.name}</h3>
              <p className="t-body text-ink-soft">{s.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="arrow-link"
          >
            Mainnet docs
            <span className="btn-arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
          {LIVE_APP_URL ? (
            <a
              href={LIVE_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="arrow-link"
            >
              See it running in a live app
              <span className="btn-arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
