"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { SectionHeader } from "./SectionHeader";
import { DOCS_URL, LIVE_APP_URL } from "@/lib/site";

const QUESTIONS: { q: string; a: string }[] = [
  {
    q: "Who holds my keys and my assets?",
    a: "You do. Epoch never holds your signing keys and never takes discretionary control of your balances. Authorisation originates from your infrastructure for every outcome, and assets transit Epoch settlement contracts only inside an authorised flow.",
  },
  {
    q: "What happens when a leg of a flow fails?",
    a: "The flow stops in a known state. Funds are returned to the originating account or held recoverable, never left in transit, and the terminal state is reported to your systems so you can act on it.",
  },
  {
    q: "How much integration work does Epoch require?",
    a: "One integration. Choose an embedded widget, the Flows SDK for your own UI, or the Intents SDK and API. None of the three require an internal Web3 team, and all resolve to the same execution layer underneath.",
  },
  {
    q: "Which networks are supported?",
    a: "Seven networks are live on mainnet today: Ethereum, Base, Arbitrum, Optimism, Polygon, Miden, and BNB Chain. New networks are added on our side, with no integration work on yours.",
  },
  {
    q: "How is compliance enforced?",
    a: "KYC, sanctions and your own policy rules are evaluated as blocking conditions before any leg executes. A failed check halts the outcome rather than flagging it after the fact, and every decision is returned to your systems for your audit trail.",
  },
  {
    q: "Who is Epoch built for?",
    a: "Banks, payments providers, fintechs, neobanks, hedge funds, and product teams that want onchain outcomes without building a crypto desk. If your organisation already operates compliance controls, Epoch gives them a place to run inside the execution path.",
  },
  {
    q: "How does execution actually work?",
    a: "Outcomes are settled by coordinated solvers competing to fill your intent, not by a single privileged executor. Epoch decomposes the intent, sources execution, and verifies the result against what you asked for.",
  },
  {
    q: "Can flows stay private?",
    a: "Yes. Through our partnership with Miden, Epoch can route to private, verifiable settlement, keeping sensitive transaction details confidential while remaining verifiable.",
  },
  {
    q: "Where can I read the documentation?",
    a: `The full API reference lives at ${DOCS_URL}. If you would rather see the product working, a live application built on Epoch runs at ${LIVE_APP_URL}.`,
  },
  {
    q: "Is Epoch a bank or a custodian?",
    a: "No. Epoch provides execution infrastructure and is not a bank, broker, money transmitter, or investment adviser. Licensing, customer onboarding and reporting obligations remain with you.",
  },
  {
    q: "How does an engineering team integrate with Epoch Protocol?",
    a: `Install the Intents SDK from npm as @epoch-protocol/epoch-intents-sdk, point it at the testnet API base, and follow the quickstart at ${DOCS_URL}: describe the outcome, fetch a quote, collect one wallet signature, submit, and poll status. The machine-readable API surface is published as OpenAPI at https://epochprotocol.xyz/openapi.json.`,
  },
  {
    q: "Can AI agents use Epoch directly?",
    a: `Yes — within the same non-custodial rules as any other client. An agent drives the Intents SDK headlessly with the user's wallet, reads https://epochprotocol.xyz/llms.txt for orientation, and checks the docs' agent guide for integration constraints. Every outcome still requires a signature from the user's own wallet; nothing is executed without one.`,
  },
  {
    q: "What does mainnet phased limits mean for planning?",
    a: "Mainnet is live but volumes are capped per intent while capacity ramps. Design for retries and idempotency, use testnet for heavy experimentation, and contact us for production volume onboarding before you commit launch dates.",
  },
  {
    q: "What happens to my funds while an intent is in flight?",
    a: "They are locked in your own name, not pooled. Epoch uses resource locks on settlement contracts, so collateral sits in a position controlled by the mandate you signed — claimable back if execution does not complete — rather than in an operator's hot wallet.",
  },
  {
    q: "How do I report a security issue?",
    a: "Email security@epochprotocol.xyz with details and, where possible, reproduction steps. We ask that researchers give us a reasonable window to fix issues before public disclosure, and we acknowledge every credible report.",
  },
  {
    q: "Do you support fiat on-ramps and off-ramps?",
    a: "Yes, through partner rails. Because Epoch routes outcomes across payment rails as well as chains, a flow can start from a card or bank transfer and end in a stablecoin position onchain — or the reverse. Availability depends on jurisdiction and the partner involved; talk to us about your specific corridors.",
  },
];

/**
 * Objection handling as a section, per the landing-page discipline: the ten
 * questions a diligence team actually asks, answered from the same facts the
 * security and compliance sections state.
 *
 * The accordion itself behaves like the use-case register — real buttons,
 * `aria-expanded`, roving arrow keys — minus the auto-advance. An FAQ that
 * opens panels on its own timer would answer questions nobody asked.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, QUESTIONS.length);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next =
      e.key === "ArrowDown"
        ? (i + 1) % QUESTIONS.length
        : (i - 1 + QUESTIONS.length) % QUESTIONS.length;
    buttonRefs.current[next]?.focus();
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: QUESTIONS.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className="section border-b border-line bg-canvas">
      <div className="container-x">
        <SectionHeader
          index="12"
          eyebrow="FAQ"
          title="Questions every team asks first"
          lead="Same facts as security and compliance. Nothing here is marketing."
        />

        <div className="section-body border-b border-line">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-t border-line">
                <h3>
                  <button
                    ref={(el) => {
                      buttonRefs.current[i] = el;
                    }}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-question-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className="group grid w-full grid-cols-[3.5rem_1fr_auto] items-center gap-x-6 py-6 text-left transition-colors"
                  >
                    <span
                      className={`section-index transition-colors ${
                        isOpen ? "text-accent-strong" : ""
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`display t-h3 transition-colors ${
                        isOpen
                          ? "text-ink"
                          : "text-ink-soft group-hover:text-ink"
                      }`}
                    >
                      {item.q}
                    </span>
                    <CaretDown
                      weight="bold"
                      size={16}
                      aria-hidden="true"
                      className={`text-muted transition-transform duration-300 ease-fluid ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                {/* The grid-rows trick animates height without measuring:
                    the row collapses to 0fr and expands to 1fr, and the
                    inner wrapper clips the overflow on the way down. */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-fluid"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="t-body max-w-2xl pb-7 pl-[calc(3.5rem+1.5rem)] text-ink-soft">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </section>
  );
}
