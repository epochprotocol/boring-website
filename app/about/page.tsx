import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { DOCS_URL, LEGAL_ENTITY, LIVE_APP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Epoch Protocol builds execution infrastructure for modern finance: one API that defines a financial outcome and executes it across every chain, protocol, and payment rail. Operated by Async Tech LLC.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", title: "About — Epoch Protocol" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="border-b border-line">
          <div className="container-x py-20 md:py-24">
            <div className="mx-auto max-w-[680px]">
              <p className="eyebrow">About</p>
              <h1 className="display t-h2 mt-4 text-ink">
                Epoch Protocol is rails for modern finance.
              </h1>

              <div className="mt-8 space-y-5 text-ink-soft">
                <p>
                  Epoch Protocol is a non-custodial intent execution and solver
                  coordination layer. An application defines a financial
                  outcome &mdash; a cross-chain swap, a deposit, a payment, a
                  protocol interaction &mdash; the user signs once with their
                  own wallet, and Epoch quotes, routes, and executes that
                  outcome across every chain, protocol, and payment rail.
                  Multi-step actions that used to require a crypto desk collapse
                  into one API call and one signature.
                </p>
                <p>
                  Execution is not trusted to a single privileged operator.
                  Outcomes are settled by coordinated solvers competing to fill
                  each intent; Epoch decomposes the intent, sources execution,
                  and verifies the result against what was asked for. Compliance
                  controls &mdash; KYC, sanctions screening, policy rules
                  &mdash; run as blocking conditions inside the execution path,
                  before any leg moves, so institutions can operate inside
                  their existing obligations rather than around them.
                </p>
                <p>
                  Epoch is live on mainnet with phased per-intent limits, and
                  it is already running in production:{" "}
                  <a href={LIVE_APP_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                    Kismet
                  </a>{" "}
                  uses Epoch for cross-chain purchases on Base. Integrators
                  choose between an embedded widget, the Flows SDK for their own
                  UI, and the Intents SDK &amp; API for direct programmatic
                  access &mdash; all three resolve to the same execution layer.
                  The{" "}
                  <a href={DOCS_URL} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                    documentation
                  </a>{" "}
                  covers the full integration path, and the machine-readable
                  surface is published at{" "}
                  <Link href="/openapi.json" className="text-accent underline">
                    /openapi.json
                  </Link>
                  .
                </p>
              </div>

              <dl className="mt-12 border-t border-line pt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="label text-muted">Operating entity</dt>
                  <dd className="mt-2 text-ink">
                    {LEGAL_ENTITY.name}
                    {LEGAL_ENTITY.jurisdiction
                      ? ` — ${LEGAL_ENTITY.jurisdiction}`
                      : null}
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted">Custody model</dt>
                  <dd className="mt-2 text-ink">
                    Non-custodial. Users sign with their own wallets; Epoch
                    never holds keys or discretionary balances.
                  </dd>
                </div>
                <div>
                  <dt className="label text-muted">Network status</dt>
                  <dd className="mt-2 text-ink">Mainnet, phased limits.</dd>
                </div>
                <div>
                  <dt className="label text-muted">Contact</dt>
                  <dd className="mt-2 text-ink">
                    <Link href="/contact" className="text-accent underline">
                      Talk to the team
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
