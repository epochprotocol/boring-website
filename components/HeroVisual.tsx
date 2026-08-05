"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  useCallback,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChainMark, type ChainName } from "./ChainMark";
import { RecordAmount } from "./RecordAmount";

/**
 * The hero object. Previously a stack of pillowy shadowed cards with a
 * peeking card behind for "depth" — a consumer-app trope.
 *
 * It now reads as a settlement record: a ruled header, a keyed field table in
 * monospace, and a route footer. On hover the record behaves like a live
 * instrument — spotlight, row cascade, route marks resolving, amount re-tick
 * — without lifting or casting a shadow.
 */

const RECORD_AMOUNT = 248_315;

const rows: { k: string; v: string; mono?: boolean; amount?: boolean }[] = [
  { k: "Outcome", v: "acquire", mono: true },
  { k: "Source", v: "Any chain, token, or fiat" },
  { k: "Amount", v: "", mono: true, amount: true },
  { k: "Policy", v: "KYC · Sanctions", mono: true },
  { k: "Destination", v: "USDC on Base" },
];

const route: ChainName[] = ["Ethereum", "Base", "Arbitrum", "Solana"];

const EASE = [0.32, 0.72, 0, 1] as const;

function RecordRow({
  row,
  index,
  cardHovered,
  reduceMotion,
  amountTick,
}: {
  row: (typeof rows)[number];
  index: number;
  cardHovered: boolean;
  reduceMotion: boolean | null;
  amountTick: number;
}) {
  const [rowHovered, setRowHovered] = useState(false);

  return (
    <motion.div
      data-record-row
      onPointerEnter={() => setRowHovered(true)}
      onPointerLeave={() => setRowHovered(false)}
      animate={
        reduceMotion
          ? undefined
          : {
              x: rowHovered ? 6 : cardHovered ? 3 : 0,
              y: rowHovered ? -1 : 0,
            }
      }
      transition={{
        duration: 0.34,
        delay: cardHovered && !rowHovered ? index * 0.055 : 0,
        ease: EASE,
      }}
      className="relative flex cursor-default items-baseline justify-between gap-4 border-b border-line py-2.5"
    >
      <motion.dt
        className="label"
        animate={
          reduceMotion
            ? undefined
            : {
                color: rowHovered
                  ? "var(--color-accent-strong)"
                  : "var(--color-muted)",
                letterSpacing: rowHovered ? "0.12em" : "0.08em",
              }
        }
        transition={{ duration: 0.25, ease: EASE }}
      >
        {row.k}
      </motion.dt>
      <motion.dd
        className={`text-right text-sm ${
          row.mono || row.amount ? "font-mono" : "font-medium"
        }`}
        animate={
          reduceMotion
            ? undefined
            : {
                color: rowHovered
                  ? "var(--color-accent-strong)"
                  : "var(--color-ink)",
                x: rowHovered ? -2 : 0,
              }
        }
        transition={{ duration: 0.25, ease: EASE }}
      >
        {row.amount ? (
          <RecordAmount value={RECORD_AMOUNT} replayKey={amountTick} />
        ) : (
          row.v
        )}
      </motion.dd>
      {/* Accent rule draws along the existing hairline — never through type. */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-0.5px] h-px origin-left bg-accent"
        initial={false}
        animate={{
          scaleX: rowHovered && !reduceMotion ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: EASE }}
      />
    </motion.div>
  );
}

export function HeroVisual() {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [amountTick, setAmountTick] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightOpacity = useSpring(0, { stiffness: 260, damping: 32 });

  const rotateX = useSpring(0, { stiffness: 220, damping: 28 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 28 });

  const spotlight = useMotionTemplate`radial-gradient(340px circle at ${mouseX}px ${mouseY}px, var(--color-accent-soft), transparent 55%)`;

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (reduceMotion) return;
      const el = cardRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX.set(x);
      mouseY.set(y);

      const px = (x / rect.width) * 2 - 1;
      const py = (y / rect.height) * 2 - 1;
      // Keep tilt under the design system's 8px motion budget.
      rotateY.set(px * 3.5);
      rotateX.set(-py * 3);
    },
    [mouseX, mouseY, reduceMotion, rotateX, rotateY]
  );

  const handlePointerEnter = useCallback(() => {
    setHovered(true);
    if (!reduceMotion) {
      spotlightOpacity.set(1);
      setAmountTick((n) => n + 1);
    }
  }, [reduceMotion, spotlightOpacity]);

  const handlePointerLeave = useCallback(() => {
    setHovered(false);
    spotlightOpacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY, spotlightOpacity]);

  return (
    <div className="relative" style={{ perspective: 1200 }}>
      <motion.div
        ref={cardRef}
        data-record
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="panel panel-interactive relative overflow-hidden bg-surface will-change-transform"
      >
        <div
          className="absolute inset-0 grid-backdrop opacity-50 transition-opacity duration-300 ease-fluid"
          style={{ opacity: hovered ? 0.7 : 0.5 }}
          aria-hidden="true"
        />

        {!reduceMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: spotlight, opacity: spotlightOpacity }}
            aria-hidden="true"
          />
        ) : null}

        {/* Record header */}
        <div className="relative z-[2] flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
          <span className="label">Outcome record</span>
          <span
            className={`chip transition-colors duration-300 ease-fluid ${
              hovered ? "border-line-strong" : ""
            }`}
          >
            <span
              className="pulse-dot h-1.5 w-1.5 shrink-0 rounded-full bg-teal"
              aria-hidden="true"
            />
            Settled
          </span>
        </div>

        <div className="relative z-[2] px-5 py-5">
          <div>
            <p className="display t-h3 text-ink transition-colors duration-300 ease-fluid">
              Acquire position
            </p>
            <p
              className={`label mt-1.5 transition-colors duration-300 ease-fluid ${
                hovered ? "text-accent-strong" : ""
              }`}
            >
              Ref EPX-4471-0C
            </p>
          </div>

          {/* Keyed field table — each row reacts on its own hover, and
              cascades when the card is entered. */}
          <dl className="mt-5 border-t border-line">
            {rows.map((r, i) => (
              <RecordRow
                key={r.k}
                row={r}
                index={i}
                cardHovered={hovered}
                reduceMotion={reduceMotion}
                amountTick={amountTick}
              />
            ))}
          </dl>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-ink-soft">
              {route.map((ch, i) => (
                <motion.span
                  key={ch}
                  title={ch}
                  data-route-mark
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: hovered ? 1 : 0.85,
                          y: hovered ? -2 : 0,
                          scale: hovered ? 1.08 : 1,
                        }
                  }
                  transition={{
                    duration: 0.28,
                    delay: hovered ? 0.12 + i * 0.05 : 0,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="inline-flex"
                >
                  <ChainMark name={ch} className="h-4 w-4" />
                </motion.span>
              ))}
              <span
                className={`label ml-1 transition-colors duration-300 ${
                  hovered ? "text-ink" : ""
                }`}
              >
                4 chains &rarr; 1 outcome
              </span>
            </div>
            <span
              className={`label transition-colors duration-300 ${
                hovered ? "text-accent-strong" : ""
              }`}
            >
              1 signature
            </span>
          </div>
        </div>

        {/* Accent rule that draws across the bottom on hover. */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 left-0 z-[2] h-px origin-left bg-accent"
          initial={false}
          animate={{ scaleX: hovered && !reduceMotion ? 1 : 0 }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
        />
      </motion.div>
    </div>
  );
}
