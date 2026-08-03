import {
  AUDITS,
  CERTIFICATIONS,
  LEGAL_ENTITY,
  SECURITY_EMAIL,
  STATUS_URL,
} from "@/lib/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * The section a bank's risk function looks for and, until now, could not
 * find. Three principles govern what goes here:
 *
 *  1. Answer the custody question before it is asked.
 *  2. Describe the failure path, not just the happy path. Nobody senior
 *     believes a distributed system that never fails; describing recovery
 *     is what signals operational maturity.
 *  3. Render nothing where a fact is missing. Every row below is driven by
 *     lib/site.ts and disappears when unset, so the page never implies an
 *     assurance that does not exist.
 */

const pillars = [
  {
    icon: "lock" as const,
    title: "You hold the keys",
    body: "Epoch never holds your signing keys and never takes discretionary control of your balances. Authorisation originates from your infrastructure for every outcome.",
  },
  {
    icon: "shield" as const,
    title: "Scoped, time-bound execution",
    body: "Value transits Epoch's settlement contracts only for the legs of a flow that require it. Approvals are scoped to a single outcome and expire — no standing allowances.",
  },
  {
    icon: "layers" as const,
    title: "Defined failure behaviour",
    body: "If a leg fails, the flow stops in a known state. Funds are returned to the originating account or held recoverable, never left mid-route, and the terminal state is reported to your systems.",
  },
];

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="spec-row">
      <div className="spec-label">{label}</div>
      <div className="spec-value">{children}</div>
    </div>
  );
}

export function Security() {
  const hasEntity = Boolean(LEGAL_ENTITY.name);

  return (
    <section
      id="security"
      className="section border-b border-line bg-surface-2"
    >
      <div className="container-x">
        <SectionHeader
          index="06"
          eyebrow="Security & custody"
          title="The answers your risk team asks for first"
          lead="Epoch is non-custodial infrastructure. We orchestrate execution; we do not hold your assets, and we do not stand between you and your funds."
        />

        <Reveal className="ledger-grid section-body md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="ledger-cell ledger-cell-interactive">
              <div className="icon-tile">
                <Icon name={p.icon} />
              </div>
              <h3 className="display t-h3 mt-5 text-ink">{p.title}</h3>
              <p className="t-body mt-2.5 text-ink-soft">{p.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal className="panel mt-4 p-7 md:p-9">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="display t-h3 text-ink">Assurance</h3>
            <p className="label">Diligence reference</p>
          </div>

          <div className="mt-6">
            <Row label="Custody model">
              <strong>Non-custodial.</strong> Client keys remain client-side.
              Assets transit Epoch settlement contracts only within an
              authorised flow and are never held on your behalf outside one.
            </Row>

            <Row label="Policy enforcement">
              Screening and policy rules are evaluated as blocking conditions
              before execution. A failed check halts the outcome.
            </Row>

            {AUDITS.length > 0 ? (
              <Row label="Independent audits">
                <ul className="space-y-1.5">
                  {AUDITS.map((a) => (
                    <li key={`${a.firm}-${a.date}`}>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link"
                      >
                        <strong>{a.firm}</strong>
                      </a>{" "}
                      &mdash; {a.scope}, {a.date}
                    </li>
                  ))}
                </ul>
              </Row>
            ) : null}

            {CERTIFICATIONS.length > 0 ? (
              <Row label="Certifications">
                <ul className="space-y-1.5">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c.name}>
                      <strong>{c.name}</strong> &mdash; {c.status}
                    </li>
                  ))}
                </ul>
              </Row>
            ) : null}

            {hasEntity ? (
              <Row label="Contracting entity">
                <strong>{LEGAL_ENTITY.name}</strong>
                {LEGAL_ENTITY.jurisdiction
                  ? `, incorporated in ${LEGAL_ENTITY.jurisdiction}`
                  : null}
                {LEGAL_ENTITY.registrationNumber
                  ? ` (no. ${LEGAL_ENTITY.registrationNumber})`
                  : null}
                .
              </Row>
            ) : null}

            <Row label="Regulatory position">
              Epoch provides execution infrastructure. Licensing, customer
              onboarding and reporting obligations remain with you; we
              integrate with the controls you already operate under.
            </Row>

            {STATUS_URL ? (
              <Row label="Operational status">
                <a
                  href={STATUS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Live uptime and incident history
                </a>
              </Row>
            ) : null}

            <Row label="Security contact">
              Vulnerability reports and diligence questionnaires:{" "}
              <a
                href={`mailto:${SECURITY_EMAIL}`}
                className="link"
              >
                {SECURITY_EMAIL}
              </a>
            </Row>

            <Row label="Security pack">
              Architecture notes, threat model and audit history are available
              under NDA for teams in evaluation.{" "}
              <a
                href={`mailto:${SECURITY_EMAIL}?subject=Security%20pack%20request`}
                className="link"
              >
                Request it
              </a>
              .
            </Row>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
