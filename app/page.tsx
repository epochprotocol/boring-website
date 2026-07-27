import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Product } from "@/components/Product";
import { Problems } from "@/components/Problems";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyEpoch } from "@/components/WhyEpoch";
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
        <Product />
        <Problems />
        <HowItWorks />
        <WhyEpoch />
        <UseCases />
        <Networks />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
