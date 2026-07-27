import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function CompliancePrivacy() {
  return (
    <section
      id="compliance"
      className="relative overflow-hidden border-b border-line bg-surface-2"
    >
      <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
      <div className="absolute inset-0 atmosphere-soft" aria-hidden="true" />

      <div className="container-x section relative">
        <div className="max-w-3xl">
          <Reveal as="p" className="eyebrow">
            Compliance &amp; privacy
          </Reveal>
          <Reveal as="h2" className="display mt-5 text-4xl md:text-5xl text-ink">
            Controls and privacy, built into the flow
          </Reveal>
          <Reveal as="p" className="mt-5 text-lg md:text-xl leading-relaxed text-ink-soft">
            Compliance and confidentiality aren&rsquo;t bolted on afterwards.
            They&rsquo;re steps in the same outcome you define &mdash; enforced
            before anything settles.
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal className="card p-8">
            <div className="icon-tile">
              <Icon name="shield" />
            </div>
            <h3 className="display mt-6 text-2xl text-ink">
              Compliance checks at the end
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Attach KYC, sanctions screening, and your own policy rules as the
              final step of any flow. Checks run before an outcome settles, so
              nothing executes outside your controls &mdash; no separate
              integration to build or maintain.
            </p>
          </Reveal>

          <Reveal delay={80} className="card p-8">
            <div className="icon-tile">
              <Icon name="lock" />
            </div>
            <h3 className="display mt-6 text-2xl text-ink">
              Privacy when you need it
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Some flows shouldn&rsquo;t be public. Through our partnership with
              Miden, Epoch can route to zero-knowledge settlement, keeping
              sensitive transaction details confidential while remaining
              verifiable &mdash; privacy applied only where your use case calls
              for it.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-ink-soft">
              <span
                className="h-1.5 w-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              In partnership with Miden
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
