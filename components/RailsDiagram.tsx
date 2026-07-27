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

export function RailsDiagram() {
  return (
    <svg
      viewBox="0 0 430 252"
      fill="none"
      className="h-auto w-full max-w-md"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rail-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.12" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="hub-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="var(--color-accent)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {sources.map((s) => {
        const d = `M${dotX + 6} ${s.y} C ${hubL - 60} ${s.y}, ${
          hubL - 46
        } ${hubY}, ${hubL} ${hubY}`;
        return (
          <g key={s.label}>
            <path d={d} stroke="var(--color-line-strong)" strokeWidth={1.5} />
            <path
              d={d}
              stroke="url(#rail-grad)"
              strokeWidth={1.75}
              className="flow-line"
            />
            <circle cx={dotX} cy={s.y} r={3.5} fill="var(--color-accent)" />
            <text
              x={dotX - 8}
              y={s.y + 3.5}
              textAnchor="end"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="0.04em"
              fill="var(--color-ink-soft)"
            >
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Epoch hub */}
      <circle cx={hubL + 34} cy={hubY} r={52} fill="url(#hub-glow)" />
      <rect
        x={hubL}
        y={hubY - 20}
        width={68}
        height={40}
        rx={12}
        fill="var(--color-surface)"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
      />
      <text
        x={hubL + 34}
        y={hubY + 4}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="13"
        fontWeight={640}
        letterSpacing="-0.02em"
        fill="var(--color-ink)"
      >
        Epoch
      </text>

      {/* Outcome rail */}
      <path
        d={`M${hubL + 68} ${hubY} H ${outX - 6}`}
        stroke="var(--color-accent)"
        strokeWidth={1.75}
      />
      <path
        d={`M${outX - 12} ${hubY - 4} l6 4 l-6 4`}
        stroke="var(--color-accent)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={outX + 12} cy={hubY} r={16} fill="var(--color-accent-soft)" />
      <circle cx={outX + 12} cy={hubY} r={9} fill="var(--color-accent)" />
      <path
        d={`M${outX + 8} ${hubY} l3 3 l5 -6`}
        stroke="var(--color-on-accent)"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x={outX + 12}
        y={hubY + 34}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9.5"
        letterSpacing="0.1em"
        fontWeight={600}
        fill="var(--color-accent-strong)"
      >
        OUTCOME
      </text>
    </svg>
  );
}
