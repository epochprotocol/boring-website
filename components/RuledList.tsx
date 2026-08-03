/**
 * The page's primary content geometry, reused by every list-like section:
 * problems, capabilities of the platform, security pillars, use cases.
 *
 * It replaces the card grids. A card grid says "here are some features we
 * thought of"; a ruled register says "here is the record". The second is the
 * register a settlement product should be speaking in, and it also gives the
 * motion layer something honest to animate — rules that draw and rows that
 * are written, rather than boxes that fade up.
 *
 * Geometry is shared with `.spec-row` in the assurance sheet, so the two read
 * as the same document.
 */

export type RuledRow = {
  /** Monospace index, e.g. "01". Omit for unindexed registers. */
  index?: string;
  /** Optional categorical label above the title. */
  label?: string;
  title: string;
  body: string;
};

export function RuledList({
  rows,
  scene,
  className = "",
}: {
  rows: RuledRow[];
  /** Names the scroll scene this register belongs to. */
  scene: string;
  className?: string;
}) {
  return (
    <div
      className={`border-b border-line ${className}`}
      data-scene={scene}
      data-rows
    >
      {rows.map((row) => (
        <div
          key={row.title}
          data-row
          className="ruled-row grid gap-x-8 gap-y-3 border-t border-line py-7 md:grid-cols-[3.5rem_minmax(0,19rem)_minmax(0,1fr)] md:py-8"
        >
          <div className="flex items-baseline gap-3 md:block">
            {row.index ? (
              <span className="section-index text-accent-strong" data-row-index>
                {row.index}
              </span>
            ) : null}
          </div>

          <div>
            {row.label ? <p className="tag mb-2">{row.label}</p> : null}
            <h3 className="display t-h3 text-ink" data-row-title>
              {row.title}
            </h3>
          </div>

          <p className="t-body text-ink-soft" data-row-body>
            {row.body}
          </p>
        </div>
      ))}
    </div>
  );
}
