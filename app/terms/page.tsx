import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms governing use of the Epoch website.",
  alternates: { canonical: "/terms" },
  openGraph: { url: "/terms", title: "Terms & Conditions — Epoch" },
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. What these terms cover",
    body: [
      "These terms govern your use of the Epoch website and the product information published by Sync Tech LLC (\"Sync Tech\", \"Epoch\", \"we\", \"us\", or \"our\"). They do not govern any commercial agreement you sign with Epoch for production access. That is covered by a separate services agreement.",
    ],
  },
  {
    heading: "2. What Epoch is and is not",
    body: [
      "Epoch provides execution infrastructure for financial outcomes across chains, protocols, and payment rails.",
      "Epoch is not a bank, broker, money transmitter, custodian, or investment adviser. Nothing on this site is financial, legal, tax, or investment advice, and nothing here is an offer or solicitation to buy or sell any asset.",
    ],
  },
  {
    heading: "3. No custody",
    body: [
      "Epoch does not hold your signing keys and does not take discretionary control of your balances. Authorisation for every outcome originates from your own systems. You remain responsible for the security of your keys and accounts.",
    ],
  },
  {
    heading: "4. Your responsibilities",
    body: [
      "You are responsible for the licensing, customer onboarding, and reporting obligations that apply to your business. You are responsible for the accuracy of any data, policy, or instruction you submit through Epoch.",
      "You agree not to use Epoch or this site in a way that is unlawful, or that disrupts, damages, or attempts to gain unauthorised access to the service.",
    ],
  },
  {
    heading: "5. Content and intellectual property",
    body: [
      "The Epoch name, wordmark, and the content on this site are owned by Epoch or its licensors. You may reference the Epoch wordmark to describe an integration, but you may not suggest an endorsement or partnership that does not exist.",
    ],
  },
  {
    heading: "6. Third-party services",
    body: [
      "Epoch can route through third-party networks, venues, and protocols. Your use of those services is also subject to their own terms. Epoch is not responsible for the acts or omissions of third-party services.",
    ],
  },
  {
    heading: "7. Disclaimers",
    body: [
      "This site and its content are provided as is and as available, without warranties of any kind. Epoch does not warrant that the site will be uninterrupted, error free, or that any information on it is complete or current.",
      "To the fullest extent permitted by law, Epoch is not liable for any indirect, incidental, or consequential loss arising from your use of this site.",
    ],
  },
  {
    heading: "8. Changes",
    body: [
      "Epoch may update these terms from time to time. The date at the top of this page reflects the most recent revision. Continued use of the site after a change constitutes acceptance of the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="section">
        <div className="container-x max-w-2xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display t-h2 mt-4 text-ink">Terms &amp; Conditions</h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted">
            Effective 7 August 2026
          </p>

          <div className="mt-10 space-y-9">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="display t-h3 text-ink">{s.heading}</h2>
                {s.body.map((p) => (
                  <p
                    key={p.slice(0, 24)}
                    className="mt-3 leading-relaxed text-ink-soft"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-12 border-t border-line pt-6 text-sm leading-relaxed text-muted">
            Questions about these terms? Write to{" "}
            <a href="mailto:sales@epochprotocol.xyz" className="link">
              sales@epochprotocol.xyz
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
