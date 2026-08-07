import Image from "next/image";
import { RuledList, type RuledRow } from "./RuledList";
import { SectionHeader } from "./SectionHeader";

const problems: RuledRow[] = [
  {
    index: "01",
    title: "Fragmented liquidity and rails",
    body: "Assets and protocols sit on networks that don't connect.",
    icon: "nodes",
  },
  {
    index: "02",
    title: "Costly integrations",
    body: "Each new network means months of engineering overhead.",
    icon: "cost",
  },
  {
    index: "03",
    title: "Vendor lock-in",
    body: "One provider limits how you scale, switch, or adapt.",
    icon: "lockIn",
  },
];

export function Problems() {
  return (
    <section className="on-dark on-dark-band section border-b border-line">
      <div className="container-x">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <SectionHeader
            index="01"
            eyebrow="Why this is hard"
            title="Onchain builds are slow, costly, and rigid"
            className="max-w-xl lg:justify-self-center"
          />
          <Image
            src="/integration.png"
            alt="Isometric diagram of an Integration hub connected to protocols and assets across winding rails"
            width={901}
            height={662}
            sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
            className="mx-auto h-auto w-full max-w-lg justify-self-center"
          />
        </div>
        <RuledList rows={problems} scene="problems" className="section-body" />
      </div>
    </section>
  );
}
