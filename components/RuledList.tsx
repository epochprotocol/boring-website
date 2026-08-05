import { Icon, type IconName } from "./Icon";

/**
 * The page's primary content geometry, reused by every list-like section:
 * problems, capabilities of the platform, security pillars, use cases.
 *
 * One horizontal axis per row: index, icon, optional tag + title, body.
 * Tags stack above the title so every labeled row shares the same hierarchy.
 */

export type RuledRow = {
  /** Monospace index, e.g. "01". Omit for unindexed registers. */
  index?: string;
  /** Optional categorical label beside the title. */
  label?: string;
  title: string;
  body: string;
  /** Supporting mark beside the title, not a card. */
  icon?: IconName;
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
          className="ruled-row grid grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-x-5 gap-y-3 border-t border-line py-7 md:grid-cols-[3.5rem_minmax(0,22rem)_minmax(0,1fr)] md:gap-x-8 md:py-8"
        >
          {row.index ? (
            <span className="section-index text-accent-strong" data-row-index>
              {row.index}
            </span>
          ) : (
            <span aria-hidden="true" />
          )}

          <div className="flex min-w-0 items-center gap-3">
            {row.icon ? (
              <span className="icon-tile">
                <Icon name={row.icon} />
              </span>
            ) : null}
            <div className="flex min-w-0 flex-col items-start gap-1">
              {row.label ? <span className="tag">{row.label}</span> : null}
              <h3 className="display t-h3 text-ink" data-row-title>
                {row.title}
              </h3>
            </div>
          </div>

          <p
            className="col-span-2 t-body text-ink-soft md:col-span-1"
            data-row-body
          >
            {row.body}
          </p>
        </div>
      ))}
    </div>
  );
}
