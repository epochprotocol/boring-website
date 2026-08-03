const sources = [
  { label: "ETH", y: 26 },
  { label: "BASE", y: 66 },
  { label: "ARB", y: 106 },
  { label: "SOL", y: 146 },
  { label: "AVAX", y: 186 },
  { label: "FIAT", y: 226 },
];

const dotX = 30;
const hubL = 196;
const hubY = 126;
const outX = 372;

/**
 * The one diagram on the page, and the argument of the whole product in a
 * single figure: six rails in, one outcome out.
 *
 * Rewritten flat. It previously used a linear gradient on each rail and a
 * radial "glow" behind the hub — a glowing orb by any other name. Both are
 * gone; the rails are one flat stroke and the hub is a bordered rectangle.
 *
 * Every rail carries `pathLength="1"` so the motion layer can draw it with a
 * dash offset from 1 to 0 regardless of its real geometry. That is what makes
 * the scrub honest: as you scroll, value literally travels the rails and
 * arrives at the outcome.
 */
export function RailsDiagram() {
  return (
    <svg
      viewBox="0 0 430 252"
      fill="none"
      className="h-auto w-full max-w-md"
      role="img"
      aria-label="Six inbound rails — Ethereum, Base, Arbitrum, Solana, Avalanche and fiat — converging through Epoch into a single settled outcome."
      data-rails
    >
      {sources.map((s) => {
        const d = `M${dotX + 6} ${s.y} C ${hubL - 60} ${s.y}, ${
          hubL - 46
        } ${hubY}, ${hubL} ${hubY}`;
        return (
          <g key={s.label}>
            {/* Static track */}
            <path d={d} stroke="var(--color-line)" strokeWidth={1} />
            {/* Drawn on scrub */}
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
            <text
              x={dotX - 9}
              y={s.y + 3.5}
              textAnchor="end"
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

      {/* Epoch hub — a bordered rectangle, no glow */}
      <rect
        x={hubL}
        y={hubY - 19}
        width={68}
        height={38}
        rx={3}
        fill="var(--color-surface)"
        stroke="var(--color-line-strong)"
        strokeWidth={1}
        data-hub
      />
      <text
        x={hubL + 34}
        y={hubY + 4}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="13"
        fontWeight={600}
        letterSpacing="-0.02em"
        fill="var(--color-ink)"
        data-hub
      >
        Epoch
      </text>

      {/* Outcome rail */}
      <path
        d={`M${hubL + 68} ${hubY} H ${outX - 8}`}
        pathLength={1}
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeDasharray="1 1"
        data-outcome-rail
      />
      {/* Travels the outcome rail as the reader scrolls. It is the only
          moving object in the figure, and it is the figure's whole point:
          value arriving. */}
      <circle
        cx={hubL + 68}
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
