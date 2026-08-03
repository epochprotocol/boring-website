import { UPDATES } from "@/lib/site";
import { SectionHeader } from "./SectionHeader";

/**
 * Published writing, pulled from the live site. Technical buyers read what a
 * company has written before they read what it claims — an engineering post
 * about solver settlement mechanisms does more for credibility than another
 * paragraph of positioning.
 *
 * Empty array, no section. Same rule as everywhere else.
 */
export function Updates() {
  if (UPDATES.length === 0) return null;

  return (
    <section className="section border-b border-line bg-surface-2">
      <div className="container-x">
        <SectionHeader
          index="11"
          eyebrow="Writing"
          title="What we have published"
        />

        <div className="section-body border-b border-line" data-rows>
          {UPDATES.map((u, i) => (
            <a
              key={u.href}
              href={u.href}
              target="_blank"
              rel="noopener noreferrer"
              data-row
              className="ruled-row group grid gap-x-8 gap-y-2 border-t border-line py-6 md:grid-cols-[3.5rem_minmax(0,26rem)_minmax(0,1fr)]"
            >
              <span className="section-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="display t-h3 text-ink transition-colors group-hover:text-accent-strong">
                {u.title}
              </span>
              <span className="t-body flex items-start justify-between gap-4 text-ink-soft">
                {u.blurb}
                <span className="btn-arrow label shrink-0" aria-hidden="true">
                  &rarr;
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
