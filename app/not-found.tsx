import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Page not found",
};

/**
 * Agent-recovery links. Human readers get the buttons below; automated
 * agents fetching a dead URL get the same destinations as plain links plus
 * a text/markdown block they can lift verbatim. GitHub Pages serves this
 * page with a real 404 status, so agents never mistake a missing path for
 * an existing one — the body only has to tell them where to go next.
 */
const RECOVERY_LINKS = [
  { label: "Home", href: "https://epochprotocol.xyz/" },
  { label: "Sitemap", href: "https://epochprotocol.xyz/sitemap.xml" },
  { label: "Agent guide (llms.txt)", href: "https://epochprotocol.xyz/llms.txt" },
  { label: "API specification (OpenAPI)", href: "https://epochprotocol.xyz/openapi.json" },
  { label: "Documentation", href: "https://docs.epochprotocol.xyz/" },
  { label: "About", href: "https://epochprotocol.xyz/about/" },
  { label: "Contact", href: "https://epochprotocol.xyz/contact/" },
] as const;

const recoveryMarkdown = [
  "# 404 — Not Found",
  "",
  "The path you requested does not exist on epochprotocol.xyz.",
  "Where to look next:",
  "",
  ...RECOVERY_LINKS.map((l) => `- [${l.label}](${l.href})`),
  "",
  "For API and integration questions, read `https://epochprotocol.xyz/llms.txt` first.",
].join("\n");

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main">
        <section className="section">
          <div className="container-x">
            <div className="mx-auto max-w-[680px]">
              <Wordmark />

              {/* The ledger's index convention carries the 404: this is the
                  only page with no section behind it. */}
              <div className="mt-12 flex items-center gap-3">
                <span className="section-index text-accent-strong">404</span>
                <span
                  className="h-px w-6 origin-left bg-line-strong"
                  aria-hidden="true"
                />
                <span className="label">Page not found</span>
              </div>

              <h1 className="display t-h2 mt-5 text-ink">
                This page is not in the ledger.
              </h1>
              <p className="t-lead mt-4 max-w-xl text-ink-soft">
                The address may have moved, or never existed. Everything that
                does exist starts from the home page.
              </p>

              <div className="mt-8">
                <Link href="/" className="btn btn-lg btn-primary">
                  Back to home
                </Link>
              </div>

              {/* Machine-readable recovery: same destinations, in markdown,
                  for agents that parse the 404 body. */}
              <div className="mt-12 border-t border-line pt-6">
                <p className="label mb-4">Everywhere this site points:</p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2">
                  {RECOVERY_LINKS.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-sm text-muted underline decoration-line-strong underline-offset-4 hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <p className="label mb-3">Agent-readable recovery</p>
                <pre
                  data-agent-recovery
                  className="overflow-x-auto whitespace-pre-wrap border border-line bg-canvas-raised p-4 text-xs leading-relaxed text-muted"
                >
                  {recoveryMarkdown}
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
