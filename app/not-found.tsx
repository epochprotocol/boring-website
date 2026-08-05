import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Wordmark } from "@/components/Wordmark";

export const metadata: Metadata = {
  title: "Page not found",
};

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
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
