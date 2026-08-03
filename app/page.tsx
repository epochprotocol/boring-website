import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Product } from "@/components/Product";
import { Capabilities } from "@/components/Capabilities";
import { Problems } from "@/components/Problems";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyEpoch } from "@/components/WhyEpoch";
import { CompliancePrivacy } from "@/components/CompliancePrivacy";
import { Surfaces } from "@/components/Surfaces";
import { Security } from "@/components/Security";
import { Proof } from "@/components/Proof";
import { UseCases } from "@/components/UseCases";
import { Networks } from "@/components/Networks";
import { ChainTicker } from "@/components/ChainTicker";
import { Updates } from "@/components/Updates";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <Product />
        <Capabilities />
        <Problems />
        <HowItWorks />
        <WhyEpoch />
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
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
