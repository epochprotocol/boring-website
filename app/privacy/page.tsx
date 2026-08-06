import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Sync Tech LLC collects and uses information submitted through the Epoch website.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy", title: "Privacy Policy — Epoch" },
};

const sections = [
  { heading: "1. Who we are", body: [
    "This Privacy Policy explains how Sync Tech LLC (\"Sync Tech\", \"Epoch\", \"we\", \"us\", or \"our\") handles personal information collected through epochprotocol.xyz (the \"Site\").",
    "This policy applies to the Site only. It does not replace the privacy terms in any separate agreement governing a product or service relationship with us."
  ]},
  { heading: "2. Information we collect", body: [
    "We may collect information you choose to provide, such as your name, work email address, company, role, use case, and the contents of an inquiry. We may also collect limited technical information generated when you use the Site, such as browser type, device information, pages visited, and approximate location derived from an IP address.",
    "Please do not send sensitive personal information, private keys, wallet seed phrases, or confidential account credentials through the Site."
  ]},
  { heading: "3. How we use information", body: [
    "We use information to respond to inquiries, arrange discussions, operate and secure the Site, understand how the Site is used, and comply with applicable legal obligations. We may also use business contact information to send relevant product or company communications where permitted by law; you can opt out at any time."
  ]},
  { heading: "4. How we share information", body: [
    "We may share information with service providers that help us operate the Site or communicate with you, professional advisers, affiliates, and authorities where required by law or necessary to protect rights, safety, or security. We do not sell personal information."
  ]},
  { heading: "5. Retention and security", body: [
    "We retain information only for as long as reasonably necessary for the purposes described in this policy, including legal, accounting, and security requirements. We use reasonable administrative, technical, and organisational safeguards, but no internet transmission or storage system is completely secure."
  ]},
  { heading: "6. Your choices and rights", body: [
    "Depending on where you live, you may have rights to request access to, correction of, deletion of, or restriction of certain personal information, or to object to particular processing. To make a request or opt out of marketing communications, contact us using the address below. We may need to verify your request before responding."
  ]},
  { heading: "7. International transfers", body: [
    "Information may be processed in countries other than the one in which you live. Where required, we take appropriate steps intended to protect information transferred internationally."
  ]},
  { heading: "8. Changes and contact", body: [
    "We may update this policy from time to time. The revised version will be posted here with an updated effective date. For privacy questions or requests, email sales@epochprotocol.xyz."
  ]},
];

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="section">
        <article className="container-x max-w-2xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display t-h2 mt-4 text-ink">Privacy Policy</h1>
          <p className="mt-3 text-xs uppercase tracking-widest text-muted">Effective 7 August 2026</p>
          <div className="mt-10 space-y-9">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display t-h3 text-ink">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 28)} className="mt-3 leading-relaxed text-ink-soft">{paragraph}</p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
