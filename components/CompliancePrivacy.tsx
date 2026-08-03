import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function CompliancePrivacy() {
  return (
    <section id="compliance" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col relative overflow-hidden bg-surface-2">
          <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
          <div className="absolute inset-0 atmosphere-soft" aria-hidden="true" />
          <div className="relative w-full max-w-md">
            <Reveal as="p" className="eyebrow">
              Compliance &amp; privacy
            </Reveal>
            <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
              Your controls run before value moves
            </Reveal>
            <Reveal as="p" className="mt-5 text-lg leading-relaxed text-ink-soft">
              Screening and policy are not a report you reconcile afterwards.
              They are gating conditions inside the outcome you define &mdash;
              if a check fails, nothing executes.
            </Reveal>
            <Reveal as="p" className="mt-4 text-sm leading-relaxed text-muted">
              Epoch does not replace your compliance obligations or your
              licences. It gives your existing policy a place to run inside the
              execution path.
            </Reveal>
          </div>
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div className="absolute inset-0 grid-backdrop opacity-40" aria-hidden="true" />
          <div className="relative w-full max-w-md space-y-4">
            <Reveal className="card p-7">
              <div className="icon-tile">
                <Icon name="shield" />
              </div>
              <h3 className="display mt-5 text-xl text-ink">
                Pre-settlement screening
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                KYC, sanctions and your own policy rules are evaluated as
                blocking conditions before any leg executes. A failed check
                halts the outcome rather than flagging it after the fact, and
                every decision is returned to your systems for your audit
                trail.
              </p>
            </Reveal>

            <Reveal delay={80} className="card p-7">
              <div className="icon-tile">
                <Icon name="lock" />
              </div>
              <h3 className="display mt-5 text-xl text-ink">
                Privacy when you need it
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Some flows shouldn&rsquo;t be public. Through our partnership
                with Miden, Epoch can route to zero-knowledge settlement,
                keeping sensitive transaction details confidential while
                remaining verifiable.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ink-soft">
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
