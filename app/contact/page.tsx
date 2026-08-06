import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { DOCS_URL, SALES_CALENDAR_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a sales call",
  description:
    "Talk to the Epoch team about defining and executing financial outcomes onchain through a single API.",
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Book a sales call — Epoch" },
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

export default function ContactPage() {
  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  const bookingIsExternal = isExternal(SALES_CALENDAR_URL);

  return (
    <>
      <Nav />
      <main id="main">
        <section className="relative overflow-hidden border-b border-line">
          <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
          <div className="container-x relative py-20 md:py-24">
            <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
              <div>
                <p className="eyebrow">Talk to us</p>
                <h1 className="display t-h2 mt-4 text-ink">
                  Book a sales call
                </h1>
                <p className="t-lead mt-5 max-w-md text-ink-soft">
                  Tell us the outcome you need onchain. We will show you how
                  Epoch delivers it through one API. No dedicated Web3 team
                  and no infrastructure to build from zero.
                </p>

                {bookingIsExternal && (
                  <div className="mt-8">
                    <Link
                      href={SALES_CALENDAR_URL}
                      {...bookProps}
                      className="btn btn-lg btn-primary"
                    >
                      Pick a time on our calendar
                    </Link>
                    <p className="mt-3 text-sm text-muted">
                      Prefer email? Use the form instead.
                    </p>
                  </div>
                )}

                <div className="mt-10 border-t border-line pt-6">
                  <p className="text-sm text-muted">
                    Just exploring? Read the{" "}
                    <a
                      href={DOCS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline"
                    >
                      documentation
                    </a>{" "}
                    to see the API first.
                  </p>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
