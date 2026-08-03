import { Reveal } from "./Reveal";

/**
 * Every section on the page opens the same way: an index, a rule, an eyebrow,
 * a heading, and an optional lead. Previously each section improvised its own
 * header, so heading sizes and spacing drifted section to section.
 *
 * The index ("§ 03") is what makes the page read as a document rather than a
 * scroll of marketing panels — it implies the whole thing was authored in one
 * pass by someone keeping count.
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
    <div className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      <Reveal
        className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span className="section-index text-accent-strong">&sect;&nbsp;{index}</span>
        <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
        <span className="label">{eyebrow}</span>
      </Reveal>

      <Reveal as="h2" className="display t-h2 mt-5 text-ink">
        {title}
      </Reveal>

      {lead ? (
        <Reveal as="p" className="t-lead mt-4 max-w-xl text-ink-soft">
          {lead}
        </Reveal>
      ) : null}
    </div>
  );
}
