import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Metrics } from "@/components/Metrics";
import { Product } from "@/components/Product";
import { Capabilities } from "@/components/Capabilities";
import { Problems } from "@/components/Problems";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyEpoch } from "@/components/WhyEpoch";
import { CompliancePrivacy } from "@/components/CompliancePrivacy";
import { UseCases } from "@/components/UseCases";
import { Networks } from "@/components/Networks";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Product />
        <Capabilities />
        <Problems />
        <HowItWorks />
        <WhyEpoch />
        <CompliancePrivacy />
        <UseCases />
        <Networks />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
