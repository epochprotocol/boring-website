import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function CompliancePrivacy() {
  return (
    <section id="compliance" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col relative overflow-hidden bg-surface-2">
          <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
          <div className="absolute inset-0 atmosphere-soft" aria-hidden="true" />
          <div className="relative w-full max-w-md">
            <SectionHeader
              index="07"
              eyebrow="Compliance & privacy"
              title="Your controls run before value moves"
              lead="Screening and policy are not a report you reconcile afterwards. They are gating conditions inside the outcome you define — if a check fails, nothing executes."
              className="max-w-md"
            />
            <Reveal as="p" className="t-body mt-4 text-muted">
              Epoch does not replace your compliance obligations or your
              licences. It gives your existing policy a place to run inside the
              execution path.
            </Reveal>
          </div>
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
          <div className="relative w-full max-w-md space-y-3">
            <Reveal className="panel p-7">
              <div className="icon-tile">
                <Icon name="shield" />
              </div>
              <h3 className="display t-h3 mt-5 text-ink">
                Pre-settlement screening
              </h3>
              <p className="t-body mt-3 text-ink-soft">
                KYC, sanctions and your own policy rules are evaluated as
                blocking conditions before any leg executes. A failed check
                halts the outcome rather than flagging it after the fact, and
                every decision is returned to your systems for your audit
                trail.
              </p>
            </Reveal>

            <Reveal delay={80} className="panel p-7">
              <div className="icon-tile">
                <Icon name="lock" />
              </div>
              <h3 className="display t-h3 mt-5 text-ink">
                Privacy when you need it
              </h3>
              <p className="t-body mt-3 text-ink-soft">
                Some flows shouldn&rsquo;t be public. Through our partnership
                with Miden, Epoch can route to zero-knowledge settlement,
                keeping sensitive transaction details confidential while
                remaining verifiable.
              </p>
              <span className="chip mt-4">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                  aria-hidden="true"
                />
                In partnership with Miden
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
