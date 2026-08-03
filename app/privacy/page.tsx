import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main id="main" className="section">
        <div className="container-x max-w-2xl">
          <p className="eyebrow">Legal</p>
          <h1 className="display t-h2 mt-4 text-ink">Privacy Policy</h1>
          <p className="mt-6 text-ink-soft leading-relaxed">
            This page is a placeholder. Add your finalized privacy policy content
            here before launch.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
