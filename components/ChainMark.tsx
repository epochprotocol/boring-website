/**
 * Simplified geometric marks for each supported network, replacing the
 * first-letter tiles. A coverage grid rendered as "E / B / A / O" reads as a
 * placeholder that nobody got round to finishing; recognisable marks read as
 * real integrations.
 *
 * These are deliberately simplified, single-colour geometric abstractions
 * rather than reproductions of each network's registered logo. If you want
 * exact brand marks, pull them from each project's official brand kit and
 * check their usage terms first.
 */

export type ChainName =
  | "Ethereum"
  | "Base"
  | "Arbitrum"
  | "Optimism"
  | "Polygon"
  | "Avalanche"
  | "BNB Chain"
  | "Solana"
  | "Fiat"
  | "L2";

export const chainMarks: Record<ChainName, React.ReactNode> = {
  Ethereum: (
    <>
      <path d="M12 2.5 5.8 12.2 12 15.9l6.2-3.7L12 2.5Z" opacity="0.55" />
      <path d="M12 17.4 5.8 13.7 12 21.5l6.2-7.8-6.2 3.7Z" />
    </>
  ),
  Base: (
    <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 9.36-8.05H8.9V10.6h12.46A9.5 9.5 0 0 0 12 2.5Z" />
  ),
  Arbitrum: (
    <>
      <path
        d="M12 2.6 20.2 7v10L12 21.4 3.8 17V7L12 2.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        opacity="0.5"
      />
      <path d="M12.05 7.6 15.9 16h-2.1l-2.9-6.5L8 16H5.9l4.05-8.4h2.1Z" />
    </>
  ),
  Optimism: (
    <>
      <circle cx="8.4" cy="12" r="4.6" opacity="0.55" />
      <circle cx="15.6" cy="12" r="4.6" />
    </>
  ),
  Polygon: (
    <path d="M12 2.8 20 7.4v9.2L12 21.2 4 16.6V7.4l8-4.6Zm0 3.2L6.8 9v6l5.2 3 5.2-3V9L12 6Z" />
  ),
  Avalanche: (
    <>
      <path d="M12 3.6 21.4 20H16L12 12.9 8 20H2.6L12 3.6Z" opacity="0.55" />
      <path d="M14.9 14.6 17.9 20h-6l3-5.4Z" />
    </>
  ),
  "BNB Chain": (
    <>
      <path d="M12 2.8 15.2 6 12 9.2 8.8 6 12 2.8Z" />
      <path d="M6 8.8 9.2 12 6 15.2 2.8 12 6 8.8Z" opacity="0.55" />
      <path d="M18 8.8 21.2 12 18 15.2 14.8 12 18 8.8Z" opacity="0.55" />
      <path d="M12 14.8 15.2 18 12 21.2 8.8 18 12 14.8Z" />
    </>
  ),
  Solana: (
    <>
      <path d="M6.6 6.1h13.1l-3.3 3.2H3.3l3.3-3.2Z" />
      <path d="M6.6 10.4h13.1l-3.3 3.2H3.3l3.3-3.2Z" opacity="0.7" />
      <path d="M6.6 14.7h13.1l-3.3 3.2H3.3l3.3-3.2Z" opacity="0.45" />
    </>
  ),
  Fiat: (
    <>
      <rect
        x="3.5"
        y="6.5"
        width="17"
        height="11"
        rx="1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="2.6" />
      <path
        d="M6.2 9.2h1.8M16 14.8h1.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </>
  ),
  L2: (
    <>
      <rect x="5" y="5" width="14" height="4" rx="1" opacity="0.4" />
      <rect x="5" y="10" width="14" height="4" rx="1" opacity="0.7" />
      <rect x="5" y="15" width="14" height="4" rx="1" />
    </>
  ),
};

/** Nested SVG glyph for use inside a parent <svg>. */
export function ChainMarkGlyph({
  name,
  x,
  y,
  size = 14,
  className = "",
}: {
  name: ChainName;
  x: number;
  y: number;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      x={x}
      y={y}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {chainMarks[name]}
    </svg>
  );
}

export function ChainMark({
  name,
  className = "",
}: {
  name: ChainName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-5 w-5 ${className}`}
      aria-hidden="true"
    >
      {chainMarks[name]}
    </svg>
  );
}
