import { Icon, type IconName } from "./Icon";
import { ImagePlate } from "./ImagePlate";
import { SectionHeader } from "./SectionHeader";

const steps: {
  n: string;
  label: string;
  title: string;
  body: string;
  icon: IconName;
}[] = [
  {
    n: "01",
    label: "Step 1",
    title: "Define the outcome",
    body: "Through one API call, your product states what should be true: the asset, destination, position, or the full sequence of results you need.",
    icon: "intent",
  },
  {
    n: "02",
    label: "Step 2",
    title: "Epoch coordinates execution",
    body: "Epoch finds the optimal path and orchestrates the routing, bridging, swaps, and protocol calls across chains on your behalf.",
    icon: "route",
  },
  {
    n: "03",
    label: "Step 3",
    title: "Settlement and confirmation",
    body: "The outcome settles onchain and Epoch reports status back to your systems, so you can act on a verified result.",
    icon: "settle",
  },
];

const stepPlates = [
  {
    src: "/step-1.png",
    label: "Step 01 · Define",
    alt: "Code intent feeding into Epoch's integration hub to define the outcome",
    ratio: 1018 / 855,
  },
  {
    src: "/step-2.png",
    label: "Step 02 · Coordinate",
    alt: "Handshake over Epoch's execution layer as paths are coordinated across rails",
    ratio: 737 / 928,
  },
  {
    src: "/step-3.png",
    label: "Step 03 · Settle",
    alt: "Synced systems confirming settlement after Epoch reports the verified result",
    ratio: 927 / 956,
  },
];

/**
 * The one pinned scene on the page, and the only one that needs to be.
 *
 * The narrative column holds while the three steps pass it, and a progress
 * rule fills alongside them — the reader is watching one integration move
 * from intent to settlement, which is the whole claim of the section.
 *
 * The pin is desktop-only and uses `pinSpacing: false`, so it never adds
 * scroll distance and never takes the scroll away from the reader. On touch
 * widths, and in reduced motion, the column scrolls with everything else.
 */
export function HowItWorks() {
  return (
    <section id="how-it-works" className="split-section border-b border-line">
      <div className="split-cols">
        <div className="split-col split-col-sticky relative overflow-hidden bg-surface-2">
          <div className="absolute inset-0 grid-backdrop" aria-hidden="true" />
          <div data-steps-pin className="relative w-full max-w-md">
            <SectionHeader
              index="05"
              eyebrow="How it works"
              title="From intent to settlement, in one integration"
              className="w-full max-w-md"
            />
            {/* Plate advances with the steps via the same stage scrub as the
                old outcome record — one visible layer at a time. */}
            <div className="step-stage mt-6" data-step-stage>
              {stepPlates.map((plate, i) => (
                <div
                  key={plate.src}
                  className="step-stage-layer"
                  data-stage-index={i}
                >
                  <ImagePlate
                    src={plate.src}
                    label={plate.label}
                    alt={plate.alt}
                    ratio={plate.ratio}
                    sizes="(min-width: 1024px) 28vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="split-col on-dark relative overflow-hidden">
          <div
            className="absolute inset-0 grid-backdrop opacity-40"
            aria-hidden="true"
          />
          <div className="relative w-full max-w-md" data-steps>
            <div
              className="absolute bottom-0 left-0 top-0 w-px bg-line"
              aria-hidden="true"
            />
            <div
              className="absolute bottom-0 left-0 top-0 w-px origin-top bg-accent"
              aria-hidden="true"
              data-steps-progress
            />

            {steps.map((s) => (
              <div key={s.n} data-step className="pb-10 pl-6 last:pb-0">
                <div className="flex items-center gap-3">
                  <span className="icon-tile">
                    <Icon name={s.icon} />
                  </span>
                  <p className="label">
                    {s.label} &middot; {s.n}
                  </p>
                </div>
                <h3 className="display t-h3 mt-3 text-ink">{s.title}</h3>
                <p className="t-body mt-2.5 text-ink-soft">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
