import {
  AUDITS,
  CERTIFICATIONS,
  LEGAL_ENTITY,
  SECURITY_EMAIL,
  STATUS_URL,
} from "@/lib/site";
import { Icon, type IconName } from "./Icon";
import { CustodyInfographic } from "./Infographics";
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
    body: "Epoch never holds your signing keys and never takes discretionary control of your balances. Authorisation originates from your infrastructure for every outcome.",
    icon: "key",
  },
  {
    index: "02",
    title: "Scoped execution that expires",
    body: "Value transits Epoch's settlement contracts only for the legs of a flow that require it. Approvals are scoped to a single outcome and expire. There are no standing allowances.",
    icon: "clock",
  },
  {
    index: "03",
    title: "Defined failure behaviour",
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
        <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-12">
          <SectionHeader
            index="07"
            eyebrow="Security & custody"
            title="The answers your risk team asks for first"
            lead="You keep your keys. We orchestrate execution; we do not hold your assets, and we do not stand between you and your funds."
          />
          <CustodyInfographic className="mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end" />
        </div>

        <RuledList rows={pillars} scene="security" className="section-body" />

        <div className="panel mt-10 p-7 md:p-9" data-scene="assurance">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="display t-h3 text-ink">Assurance</h3>
            <p className="label">Diligence reference</p>
          </div>

          <div className="mt-6">
            <Row label="Custody model" icon="key">
              <strong>You keep your keys.</strong> Client keys remain
              client-side. Assets transit Epoch settlement contracts only
              within an authorised flow and are never held on your behalf
              outside one.
            </Row>

            <Row label="Execution model" icon="route">
              Outcomes are settled by <strong>coordinated solvers</strong>
              competing to fill your intent, not by a single privileged
              executor. Epoch decomposes the intent, sources execution, and
              verifies the result against what you asked for.
            </Row>

            <Row label="Policy enforcement" icon="policy">
              Screening and policy rules are evaluated as blocking conditions
              before execution. A failed check halts the outcome.
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
              Epoch provides execution infrastructure. Licensing, customer
              onboarding and reporting obligations remain with you; we
              integrate with the controls you already operate under.
            </Row>

            {STATUS_URL ? (
              <Row label="Operational status" icon="status">
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
        </div>
      </div>
    </section>
  );
}
