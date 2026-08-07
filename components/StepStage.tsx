import { ChainMark, type ChainName } from "./ChainMark";
import { RecordAmount } from "./RecordAmount";

const route: ChainName[] = ["Ethereum", "Base", "Arbitrum", "Solana"];

/**
 * The visual that advances as the reader scrolls the three steps — Stripe's
 * core storytelling device, where a single object changes state beside the
 * narrative instead of three separate illustrations appearing.
 *
 * It is deliberately the same object as the hero record: the same panel, the
 * same keyed fields, the same chain marks in the same order. The reader has
 * already met this record at the top of the page; here they watch it move
 * from a stated intent to a settled outcome. Reusing the geometry is what
 * makes the two sections describe one system rather than two.
 *
 * All three states are rendered. The motion layer cross-fades between them on
 * scrub; with no JavaScript, or under reduced motion, the CSS leaves the
 * final settled state visible and the earlier ones stacked behind it, so the
 * component always shows something complete and correct.
 */

const RECORD_AMOUNT = 248_315;

type Row = {
  k: string;
  v: string;
  mono?: boolean;
  amount?: boolean;
};

const states: {
  id: "intent" | "routing" | "settled";
  status: string;
  tone: "muted" | "accent" | "teal";
  rows: Row[];
}[] = [
  {
    id: "intent",
    status: "Queued",
    tone: "muted",
    rows: [
      { k: "Outcome", v: "acquire", mono: true },
      { k: "Source", v: "Any chain, token, or fiat" },
      { k: "Amount", v: "", mono: true, amount: true },
      { k: "Route", v: "Pending", mono: true },
    ],
  },
  {
    id: "routing",
    status: "Routing",
    tone: "accent",
    rows: [
      { k: "Outcome", v: "acquire", mono: true },
      { k: "Source", v: "Any chain, token, or fiat" },
      { k: "Amount", v: "", mono: true, amount: true },
      { k: "Route", v: "4 chains · 1 signature", mono: true },
    ],
  },
  {
    id: "settled",
    status: "Settled",
    tone: "teal",
    rows: [
      { k: "Outcome", v: "acquire", mono: true },
      { k: "Destination", v: "USDC on Base" },
      { k: "Amount", v: "", mono: true, amount: true },
      { k: "Confirmed", v: "Reported to your systems" },
    ],
  },
];

export function StepStage() {
  return (
    <div className="step-stage" data-step-stage>
      {states.map((state, i) => (
        <div
          key={state.id}
          className="step-stage-layer panel bg-surface"
          data-stage-state={state.id}
          data-stage-index={i}
        >
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
            <span className="label">Outcome record</span>
            <span className="chip">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  state.tone === "teal"
                    ? "bg-teal"
                    : state.tone === "accent"
                      ? "bg-accent"
                      : "bg-muted"
                }`}
                aria-hidden="true"
              />
              {state.status}
            </span>
          </div>

          <div className="px-5 py-5">
            <dl className="border-t border-line">
              {state.rows.map((r) => (
                <div
                  key={r.k}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-2.5"
                >
                  <dt className="label">{r.k}</dt>
                  <dd
                    className={`text-right text-sm text-ink ${
                      r.mono || r.amount ? "font-mono" : "font-medium"
                    }`}
                  >
                    {r.amount ? <RecordAmount value={RECORD_AMOUNT} /> : r.v}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-5 flex items-center gap-2 text-ink-soft">
              {route.map((ch) => (
                <ChainMark key={ch} name={ch} className="h-4 w-4" />
              ))}
              <span className="label ml-1">
                {state.id === "settled"
                  ? "1 outcome"
                  : state.id === "routing"
                    ? "resolving"
                    : "awaiting intent"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
