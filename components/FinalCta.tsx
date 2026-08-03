import { CtaButtons } from "./CtaButtons";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section className="section bg-surface">
      <div className="container-x">
        <div className="panel relative overflow-hidden bg-surface-2 px-6 py-20 text-center md:px-12 md:py-24">
          <div
            className="absolute inset-0 grid-backdrop opacity-60"
            aria-hidden="true"
          />
          <div className="absolute inset-0 hero-gradient" aria-hidden="true" />
          <Reveal className="relative">
            <p className="label">Talk to us</p>
            <h2 className="display t-h2 mx-auto mt-5 max-w-2xl text-ink">
              Define your first outcome with Epoch
            </h2>
            <p className="t-lead mx-auto mt-4 max-w-xl text-ink-soft">
              Book a call with our team, or dive straight into the documentation
              to see how the API works.
            </p>
            <CtaButtons className="mt-9" align="center" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
