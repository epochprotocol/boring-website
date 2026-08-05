import { SectionHeader } from "./SectionHeader";

/**
 * The two control surfaces, set as a ruled definition list rather than two
 * bordered cards. Decorative icon tiles have gone with them: a shield glyph
 * next to the word "screening" adds nothing a reader did not already have.
 */
const controls = [
  {
    index: "01",
    title: "Screening before execution",
    body: "KYC, sanctions and your own policy rules are evaluated as blocking conditions before any leg executes. A failed check halts the outcome rather than flagging it after the fact, and every decision is returned to your systems for your audit trail.",
  },
  {
    index: "02",
    title: "Privacy when you need it",
    body: "Some flows shouldn't be public. Through our partnership with Miden, Epoch can route to private, verifiable settlement, keeping sensitive transaction details confidential while remaining verifiable.",
    note: "In partnership with Miden",
  },
];

export function CompliancePrivacy() {
  return (
    <section
      id="compliance"
      className="split-section split-left-surface-2 split-grid-right border-b border-line"
    >
      <div className="split-cols">
        <div className="split-col relative overflow-hidden bg-surface-2">
          <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
          <div className="relative w-full max-w-md">
            <SectionHeader
              index="08"
              eyebrow="Compliance & privacy"
              title="Your controls run before value moves"
              lead="Screening and policy are not a report you reconcile afterwards. They are gating conditions inside the outcome you define. If a check fails, nothing executes."
              className="max-w-md"
            />
            <p className="t-body mt-4 text-muted">
              Epoch does not replace your compliance obligations or your
              licences. It gives your existing policy a place to run inside the
              execution path.
            </p>
          </div>
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div
            className="absolute inset-0 grid-backdrop opacity-40"
            aria-hidden="true"
          />
          <div
            className="relative w-full max-w-md border-b border-line"
            data-scene="controls"
            data-rows
          >
            {controls.map((c) => (
              <div
                key={c.title}
                data-row
                className="ruled-row border-t border-line py-7"
              >
                <span className="section-index text-accent-strong" data-row-index>
                  {c.index}
                </span>
                <h3 className="display t-h3 mt-3 text-ink" data-row-title>
                  {c.title}
                </h3>
                <p className="t-body mt-2.5 text-ink-soft" data-row-body>
                  {c.body}
                </p>
                {c.note ? <span className="chip mt-4">{c.note}</span> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
