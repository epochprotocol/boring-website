import { CtaButtons } from "./CtaButtons";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="on-dark relative overflow-hidden border-t border-line">
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
      <div className="absolute inset-0 grid-backdrop opacity-70" aria-hidden="true" />
      <div className="container-x relative py-24 text-center">
        <Reveal>
          <p className="eyebrow mx-auto justify-center">Talk to us</p>
          <h2 className="display mx-auto mt-4 max-w-2xl text-3xl md:text-4xl text-ink">
            Define your first outcome with <span className="text-glow">Epoch</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            Book a call with our team, or dive straight into the documentation
            to see how the API works.
          </p>
          <CtaButtons className="mt-9" align="center" />
        </Reveal>
      </div>
    </section>
  );
}
