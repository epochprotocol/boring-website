import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { TaglineReveal } from "@/components/TaglineReveal";
import { Problems } from "@/components/Problems";
import { WhyEpoch } from "@/components/WhyEpoch";
import { Product } from "@/components/Product";
import { Capabilities } from "@/components/Capabilities";
import { HowItWorks } from "@/components/HowItWorks";
import { Surfaces } from "@/components/Surfaces";
import { Security } from "@/components/Security";
import { CompliancePrivacy } from "@/components/CompliancePrivacy";
import { Proof } from "@/components/Proof";
import { UseCases } from "@/components/UseCases";
import { Networks } from "@/components/Networks";
import { ChainTicker } from "@/components/ChainTicker";
import { Updates } from "@/components/Updates";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        {/* The tagline moment sits right after the status band: the reader has
            seen the scale claim, now the core benefit lands in large type
            before the argument starts. */}
        <TaglineReveal />
        <Problems />
        <WhyEpoch />
        <Product />
        <Capabilities />
        <HowItWorks />
        {/* The three integration surfaces sit before the trust material: a
            technical reader wants to know what they would be building
            against before they evaluate whether to trust it. */}
        <Surfaces />
        {/* Security sits immediately after the value proposition and before
            the compliance detail: custody is the first objection, so it gets
            answered before anything else is asked for. */}
        <Security />
        <CompliancePrivacy />
        <Proof />
        <UseCases />
        <Networks />
        <ChainTicker />
        <Updates />
        {/* Objection handling closes the argument, immediately before the
            final CTA repeats the offer. */}
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
