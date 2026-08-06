import { ChainMarkGlyph, type ChainName } from "./ChainMark";

const sources: { label: string; chain: ChainName; y: number }[] = [
  { label: "ETH", chain: "Ethereum", y: 26 },
  { label: "BASE", chain: "Base", y: 66 },
  { label: "ARB", chain: "Arbitrum", y: 106 },
  { label: "SOL", chain: "Solana", y: 146 },
  { label: "AVAX", chain: "Avalanche", y: 186 },
  { label: "FIAT", chain: "Fiat", y: 226 },
];

const markSize = 13;
const labelX = 28;
const dotX = 58;
const hubL = 210;
const hubY = 126;
const hubW = 78;
const outX = 392;

/**
 * The one diagram on the page, and the argument of the whole product in a
 * single figure: six rails in, one outcome out.
 *
 * Every rail carries `pathLength="1"` so the motion layer can draw it with a
 * dash offset from 1 to 0 regardless of its real geometry. That is what makes
 * the scrub honest: as you scroll, value literally travels the rails and
 * arrives at the outcome.
 */
export function RailsDiagram() {
  return (
    <svg
      viewBox="0 0 450 252"
      fill="none"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Six inbound rails (Ethereum, Base, Arbitrum, Solana, Avalanche and fiat) converging through Epoch into a single settled outcome."
      data-rails
    >
      {sources.map((s) => {
        const d = `M${dotX + 6} ${s.y} C ${hubL - 60} ${s.y}, ${
          hubL - 46
        } ${hubY}, ${hubL} ${hubY}`;
        return (
          <g key={s.label}>
            <path d={d} stroke="var(--color-line)" strokeWidth={1} />
            <path
              d={d}
              pathLength={1}
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              strokeDasharray="1 1"
              strokeDashoffset={0}
              data-rail
            />
            <circle
              cx={dotX}
              cy={s.y}
              r={3}
              fill="var(--color-accent)"
              data-rail-node
            />
            <ChainMarkGlyph
              name={s.chain}
              x={4}
              y={s.y - markSize / 2}
              size={markSize}
              className="text-ink-soft"
            />
            <text
              x={labelX}
              y={s.y + 3.5}
              textAnchor="start"
              fontFamily="var(--font-mono)"
              fontSize="9.5"
              letterSpacing="0.06em"
              fill="var(--color-muted)"
            >
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Epoch hub — shared wordmark asset (logo + name) */}
      <rect
        x={hubL}
        y={hubY - 19}
        width={hubW}
        height={38}
        rx={3}
        fill="var(--color-surface)"
        stroke="var(--color-line-strong)"
        strokeWidth={1}
        data-hub
      />
      <foreignObject
        x={hubL + 7}
        y={hubY - 7}
        width={hubW - 14}
        height={14}
        data-hub
      >
        <div className="flex h-full w-full items-center justify-center">
          <img
            src="/epoch-logo-whiteblack-.png"
            alt=""
            className="h-3.5 w-3.5 object-contain"
          />
        </div>
      </foreignObject>

      <path
        d={`M${hubL + hubW} ${hubY} H ${outX - 8}`}
        pathLength={1}
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeDasharray="1 1"
        data-outcome-rail
      />
      <circle
        cx={hubL + hubW}
        cy={hubY}
        r={3}
        fill="var(--color-accent)"
        data-outcome-marker
        opacity={0}
      />

      <g data-outcome>
        <rect
          x={outX - 2}
          y={hubY - 14}
          width={28}
          height={28}
          rx={3}
          fill="var(--color-accent)"
        />
        <path
          d={`M${outX + 5} ${hubY} l4 4 l7 -8`}
          stroke="var(--color-on-accent)"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={outX + 12}
          y={hubY + 32}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.12em"
          fill="var(--color-muted)"
        >
          OUTCOME
        </text>
      </g>
    </svg>
  );
}
