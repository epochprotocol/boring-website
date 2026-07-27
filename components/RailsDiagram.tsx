const rails = [
  { label: "ETH", y: 40, len: 210 },
  { label: "BASE", y: 88, len: 260 },
  { label: "ARB", y: 136, len: 180 },
  { label: "SOL", y: 184, len: 240 },
  { label: "AVAX", y: 232, len: 160 },
  { label: "FIAT", y: 280, len: 220 },
];

const originX = 20;
const busX = 320;

export function RailsDiagram() {
  return (
    <svg
      viewBox="0 0 420 320"
      fill="none"
      className="h-auto w-full max-w-md"
      aria-hidden="true"
    >
      {/* settlement bus */}
      <line
        x1={busX}
        y1={24}
        x2={busX}
        y2={296}
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        opacity={0.5}
      />

      {rails.map((r) => (
        <g key={r.label}>
          <circle cx={originX} cy={r.y} r={3.5} fill="var(--color-accent)" />
          <line
            x1={originX + 8}
            y1={r.y}
            x2={originX + r.len}
            y2={r.y}
            stroke="var(--color-line-strong)"
            strokeWidth={1.5}
          />
          <path
            d={`M${originX + r.len} ${r.y} C ${busX - 40} ${r.y}, ${
              busX - 20
            } ${160}, ${busX} ${160}`}
            stroke="var(--color-line-strong)"
            strokeWidth={1.5}
          />
          <text
            x={originX}
            y={r.y - 10}
            fontFamily="var(--font-mono)"
            fontSize="9"
            letterSpacing="0.05em"
            fill="var(--color-muted)"
          >
            {r.label}
          </text>
        </g>
      ))}

      {/* outcome node */}
      <circle
        cx={busX}
        cy={160}
        r={9}
        fill="var(--color-accent)"
        opacity={0.15}
      />
      <circle cx={busX} cy={160} r={5} fill="var(--color-accent)" />
      <path
        d={`M${busX - 2} 158 l2 3 l4 -5`}
        stroke="white"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <line
        x1={busX + 12}
        y1={160}
        x2={396}
        y2={160}
        stroke="var(--color-accent)"
        strokeWidth={1.5}
      />
      <text
        x={busX + 18}
        y={156}
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="0.08em"
        fill="var(--color-accent-strong)"
        fontWeight={600}
      >
        OUTCOME
      </text>
    </svg>
  );
}
