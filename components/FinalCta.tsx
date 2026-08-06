import Image from "next/image";
import { CtaButtons } from "./CtaButtons";

/**
 * Full-bleed closing band. It used to be a rounded panel floating inside the
 * section with a radial wash behind it — a rounded floating container, which
 * is precisely the shape this language rejects. The band now runs edge to
 * edge and is bounded by rules alone.
 */
export function FinalCta() {
  return (
    <section
      className="on-dark on-dark-band section relative overflow-hidden"
      data-scene="cta"
    >
      <div
        className="absolute inset-0 grid-backdrop opacity-60"
        aria-hidden="true"
      />
      <div className="container-x relative">
        <div className="flex items-center gap-3">
          <Image
            src="/epochfavicon32x32coloured.png"
            alt=""
            width={416}
            height={416}
            className="h-9 w-9"
          />
          <p className="label">Talk to us</p>
        </div>
        <h2
          className="display t-h2 mt-5 max-w-2xl text-ink"
          data-mask-lines
        >
          Define your first outcome with Epoch
        </h2>
        <p className="t-lead mt-4 max-w-xl text-ink-soft">
          Book a call with our team, or dive straight into the documentation to
          see how the API works.
        </p>
        <CtaButtons className="mt-9" />
      </div>
    </section>
  );
}
