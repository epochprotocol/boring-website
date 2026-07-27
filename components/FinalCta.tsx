import { CtaButtons } from "./CtaButtons";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-surface-2 px-6 py-24 text-center md:px-12 md:py-32">
          <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
          <div
            className="absolute inset-0 grid-backdrop opacity-40"
            aria-hidden="true"
          />
          <Reveal className="relative">
            <p className="eyebrow mx-auto justify-center">Talk to us</p>
            <h2 className="display mx-auto mt-6 max-w-3xl text-4xl md:text-5xl lg:text-6xl text-ink">
              Define your first outcome with{" "}
              <span className="text-glow">Epoch</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-ink-soft">
              Book a call with our team, or dive straight into the documentation
              to see how the API works.
            </p>
            <CtaButtons className="mt-10" align="center" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
