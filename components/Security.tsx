import {
  AUDITS,
  CERTIFICATIONS,
  LEGAL_ENTITY,
  SECURITY_EMAIL,
  STATUS_URL,
} from "@/lib/site";
import { Icon, type IconName } from "./Icon";
import { RuledList, type RuledRow } from "./RuledList";
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
const pillars: RuledRow[] = [
  {
    index: "01",
    title: "You hold the keys",
    body: "Epoch never holds keys or discretionary control of balances.",
    icon: "key",
  },
  {
    index: "02",
    title: "Scoped, expiring execution",
    body: "Approvals cover one outcome and expire. No standing allowances.",
    icon: "clock",
  },
  {
    index: "03",
    title: "Defined failure behaviour",
    //TODO need to shorten this sentence
    body: "If a leg fails, the flow stops in a known state. Funds are returned to the originating account or held recoverable, never left in transit, and the terminal state is reported to your systems.",
    icon: "fail",
  },
];

function Row({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: IconName;
  children: React.ReactNode;
}) {
  return (
    <div className="spec-row" data-spec-row>
      <div className="spec-label">
        {icon ? (
          <span className="spec-mark">
            <Icon name={icon} />
          </span>
        ) : null}
        {label}
      </div>
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
          index="07"
          eyebrow="Security & custody"
          title="Answers your risk team asks first"
          lead="You keep the keys. We orchestrate execution—we never hold your assets."
        />

        <RuledList rows={pillars} scene="security" className="section-body" />

        <div className="panel mt-10 p-7 md:p-9" data-scene="assurance">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="display t-h3 text-ink">Assurance</h3>
            <p className="label">Diligence reference</p>
          </div>

          <div className="mt-6">
            <Row label="Custody model" icon="key">
            {/* TODO need to shorten this sentence */}
              <strong>You keep your keys.</strong> Client keys remain
              client-side. Assets transit Epoch settlement contracts only
              within an authorised flow and are never held on your behalf
              outside one.
            </Row>

            <Row label="Execution model" icon="route">
              Outcomes settled by <strong>competing coordinated solvers</strong>, not one privileged
              executor. Epoch sources execution and verifies the result.
            </Row>

            <Row label="Policy enforcement" icon="policy">
              Screening and policy block before execution. Failed checks halt
              the outcome.
            </Row>

            {AUDITS.length > 0 ? (
              <Row label="Independent audits" icon="audit">
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
                      </a>
                      {": "}
                      {a.scope}, {a.date}
                    </li>
                  ))}
                </ul>
              </Row>
            ) : null}

            {CERTIFICATIONS.length > 0 ? (
              <Row label="Certifications" icon="boxCheck">
                <ul className="space-y-1.5">
                  {CERTIFICATIONS.map((c) => (
                    <li key={c.name}>
                      <strong>{c.name}</strong>
                      {": "}
                      {c.status}
                    </li>
                  ))}
                </ul>
              </Row>
            ) : null}

            {hasEntity ? (
              <Row label="Contracting entity" icon="building">
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

            <Row label="Regulatory position" icon="bank">
              Epoch is execution infrastructure. Licensing, onboarding, and
              reporting stay with you.
            </Row>

            {STATUS_URL ? (
              <Row label="Operational status" icon="status">
                <a
                  href={STATUS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link"
                >
                  Live uptime & incidents
                </a>
              </Row>
            ) : null}

            <Row label="Security contact" icon="mail">
              Vulnerability reports and diligence questionnaires:{" "}
              <a
                href={`mailto:${SECURITY_EMAIL}`}
                className="link"
              >
                {SECURITY_EMAIL}
              </a>
            </Row>

            <Row label="Security pack" icon="pack">
              Architecture, threat model, and audits available under NDA.{" "}
              <a
                href={`mailto:${SECURITY_EMAIL}?subject=Security%20pack%20request`}
                className="link"
              >
                Request it
              </a>
              .
            </Row>
          </div>
        </div>
      </div>
    </section>
  );
}
