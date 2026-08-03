/**
 * Every section opens the same way: an index, a rule, an eyebrow, a heading,
 * an optional lead. The running index (§ 01 … § 09) is what makes the page
 * read as a document rather than a scroll of marketing panels.
 *
 * This is a server component with no motion code in it. It only marks the
 * parts the motion layer needs — the rule and the heading — with data
 * attributes; `MotionLayer` finds them and owns the timeline. Keeping
 * animation out of content components is what allows one GSAP context to be
 * created and cleaned up for the whole page.
 */

type SectionHeaderProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
  align?: "start" | "center";
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  lead,
  // Callers own the measure so the header can sit in a narrow split column
  // or a full-width band without fighting a baked-in max-width.
  className = "max-w-2xl",
  align = "start",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <div
      className={`${centered ? "mx-auto text-center" : ""} ${className}`}
      data-section-header
    >
      <div
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="section-index text-accent-strong">
          &sect;&nbsp;{index}
        </span>
        <span
          className="h-px w-6 origin-left bg-line-strong"
          aria-hidden="true"
          data-header-rule
        />
        <span className="label">{eyebrow}</span>
      </div>

      <h2 className="display t-h2 mt-5 text-ink" data-mask-lines>
        {title}
      </h2>

      {lead ? (
        <p className="t-lead mt-4 max-w-xl text-ink-soft" data-header-lead>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
