/**
 * Line-drawn infographics for the Ledger system.
 * Hairlines + accent marks only — no gradients, glow, or soft illustration.
 */

import type { ReactNode } from "react";
import { ChainMarkGlyph, type ChainName } from "./ChainMark";

type DiagramProps = { className?: string };

function Frame({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <figure className={`diagram ${className}`}>
      <div className="diagram-chrome">
        <span className="label">{label}</span>
      </div>
      <div className="diagram-body">{children}</div>
    </figure>
  );
}

/** Intent → coordinate → settle. `active` (0–2) highlights the live node. */
export function FlowInfographic({
  className = "",
  active = 0,
}: DiagramProps & { active?: number }) {
  const boxW = 56;
  const boxH = 48;
  const boxY = 28;
  const halfW = boxW / 2;
  const midY = boxY + boxH / 2;
  const head = 6;

  const nodes = [
    { x: 40, label: "Intent", sub: "API call" },
    { x: 160, label: "Epoch", sub: "Coordinate" },
    { x: 280, label: "Settle", sub: "Confirm" },
  ];
  const step = Math.max(0, Math.min(2, active));

  const connectors = [
    { from: 0, to: 1, on: step >= 1 },
    { from: 1, to: 2, on: step >= 2 },
  ];

  return (
    <Frame label={`Outcome path · 0${step + 1}`} className={className}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        className="h-auto w-full"
        aria-hidden="true"
      >
        {nodes.map((n, i) => {
          const on = i === step;
          return (
            <g key={n.label}>
              <rect
                x={n.x - halfW}
                y={boxY}
                width={boxW}
                height={boxH}
                rx={6}
                fill={
                  on ? "var(--color-accent-soft)" : "var(--color-surface)"
                }
                stroke={
                  on ? "var(--color-accent)" : "var(--color-line-strong)"
                }
                strokeWidth={1.5}
              />
              <text
                x={n.x}
                y={48}
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize="11"
                fontWeight={640}
                fill="var(--color-ink)"
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y={64}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="8"
                letterSpacing="0.06em"
                fill={on ? "var(--color-accent-strong)" : "var(--color-muted)"}
              >
                {n.sub.toUpperCase()}
              </text>
            </g>
          );
        })}

        {connectors.map(({ from, to, on }) => {
          const startX = nodes[from].x + halfW;
          const tipX = nodes[to].x - halfW;
          const endX = tipX - head;
          const stroke = on
            ? "var(--color-accent)"
            : "var(--color-line-strong)";

          return (
            <g key={`${from}-${to}`}>
              <path
                d={`M${startX} ${midY} H${endX}`}
                stroke={stroke}
                strokeWidth={1.5}
                strokeLinecap="butt"
              />
              <path
                d={`M${tipX - head} ${midY - 4} L${tipX} ${midY} L${tipX - head} ${midY + 4}`}
                stroke={stroke}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/** Step-specific detail plate under the path diagram. */
export function HowItWorksStepAsset({
  step,
  className = "",
}: {
  step: number;
  className?: string;
}) {
  const index = Math.max(0, Math.min(2, step));
  const labels = ["Define", "Coordinate", "Confirm"] as const;

  return (
    <Frame label={labels[index]} className={className}>
      <div className="step-asset" data-step-asset={index}>
        {index === 0 ? <IntentAsset /> : null}
        {index === 1 ? <CoordinateAsset /> : null}
        {index === 2 ? <SettleAsset /> : null}
      </div>
    </Frame>
  );
}

function IntentAsset() {
  return (
    <svg
      viewBox="0 0 320 132"
      fill="none"
      className="h-auto w-full"
      aria-hidden="true"
    >
      <rect
        x={24}
        y={16}
        width={272}
        height={100}
        rx={6}
        fill="var(--color-surface)"
        stroke="var(--color-line-strong)"
        strokeWidth={1.25}
      />
      <text
        x={40}
        y={40}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-accent-strong)"
      >
        await
      </text>
      <text
        x={78}
        y={40}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-ink)"
      >
        epoch.solve({"{"}
      </text>
      <text
        x={56}
        y={62}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-ink-soft)"
      >
        outcome:
      </text>
      <text
        x={118}
        y={62}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-teal)"
      >
        &quot;acquire&quot;
      </text>
      <text
        x={56}
        y={82}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-ink-soft)"
      >
        from:
      </text>
      <text
        x={96}
        y={82}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-teal)"
      >
        &quot;any&quot;
      </text>
      <text
        x={40}
        y={102}
        fontFamily="var(--font-mono)"
        fontSize="10"
        fill="var(--color-ink)"
      >
        {"});"}
      </text>
      <rect
        x={248}
        y={28}
        width={32}
        height={12}
        rx={2}
        fill="var(--color-accent)"
      />
    </svg>
  );
}

function CoordinateAsset() {
  const sources = [
    { y: 28, t: "ETH" },
    { y: 56, t: "BASE" },
    { y: 84, t: "SOL" },
    { y: 112, t: "FIAT" },
  ];
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      className="h-auto w-full"
      aria-hidden="true"
    >
      {sources.map((s) => (
        <g key={s.t}>
          <circle
            cx={36}
            cy={s.y}
            r={8}
            fill="var(--color-surface)"
            stroke="var(--color-line-strong)"
            strokeWidth={1.25}
          />
          <text
            x={36}
            y={s.y + 3}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="6.5"
            fill="var(--color-ink-soft)"
          >
            {s.t}
          </text>
          <path
            d={`M46 ${s.y} C 100 ${s.y}, 120 70, 148 70`}
            stroke="var(--color-accent)"
            strokeWidth={1.25}
          />
        </g>
      ))}
      <rect
        x={148}
        y={50}
        width={64}
        height={40}
        rx={6}
        fill="var(--color-accent-soft)"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
      />
      <text
        x={180}
        y={74}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="12"
        fontWeight={640}
        fill="var(--color-ink)"
      >
        Epoch
      </text>
      <path
        d="M212 70 H268"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
      />
      <path
        d="M262 66l6 4-6 4"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={286}
        cy={70}
        r={12}
        fill="var(--color-accent)"
      />
      <path
        d="M280 70l4 4 8-8"
        stroke="var(--color-on-accent)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SettleAsset() {
  return (
    <svg
      viewBox="0 0 320 132"
      fill="none"
      className="h-auto w-full"
      aria-hidden="true"
    >
      <rect
        x={48}
        y={18}
        width={224}
        height={96}
        rx={6}
        fill="var(--color-surface)"
        stroke="var(--color-line-strong)"
        strokeWidth={1.25}
      />
      <text
        x={64}
        y={42}
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="0.08em"
        fill="var(--color-muted)"
      >
        OUTCOME RECORD
      </text>
      <circle cx={236} cy={38} r={5} fill="var(--color-teal)" />
      <text
        x={64}
        y={68}
        fontFamily="var(--font-display)"
        fontSize="14"
        fontWeight={640}
        fill="var(--color-ink)"
      >
        Settled
      </text>
      <path
        d="M64 80 H240"
        stroke="var(--color-line)"
        strokeWidth={1}
      />
      <text
        x={64}
        y={100}
        fontFamily="var(--font-mono)"
        fontSize="9"
        fill="var(--color-ink-soft)"
      >
        USDC · BASE · VERIFIED
      </text>
      <circle
        cx={248}
        cy={96}
        r={14}
        fill="var(--color-accent-soft)"
        stroke="var(--color-accent)"
        strokeWidth={1.5}
      />
      <path
        d="M242 96l4 4 8-8"
        stroke="var(--color-accent-strong)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Scattered rails vs one API. Used in Why this is hard today.
 *
 * Equal halves about a centered divider. Left: four rails wired ad-hoc into
 * one app (crossing dashes). Right: the same four rails in a clean row,
 * converging into Epoch API, then a single line to your app.
 */
export function FragmentInfographic({ className = "" }: DiagramProps) {
  const W = 360;
  const H = 170;
  const mid = W / 2;
  const lcx = mid / 2;
  const rcx = mid + mid / 2;
  const railR = 12;
  const markSize = 12;
  const labelY = 18;

  const leftApp = { cx: lcx, cy: 86, w: 48, h: 26 };
  const scattered: { x: number; y: number; t: string; chain: ChainName }[] = [
    { x: lcx - 40, y: 48, t: "ETH", chain: "Ethereum" },
    { x: lcx + 40, y: 48, t: "SOL", chain: "Solana" },
    { x: lcx - 40, y: 128, t: "FIAT", chain: "Fiat" },
    { x: lcx + 40, y: 128, t: "L2", chain: "L2" },
  ];

  // Right column: rails share X with attach points so the funnel is symmetric
  // about rcx, and sit clear of the API box (no labels under the wires).
  const railY = 42;
  const api = { cx: rcx, cy: 98, w: 108, h: 28 };
  const yourApp = { cx: rcx, cy: 142, w: 68, h: 22 };
  const railXs = [rcx - 36, rcx - 12, rcx + 12, rcx + 36];
  const rails: { x: number; t: string; chain: ChainName }[] = [
    { x: railXs[0], t: "ETH", chain: "Ethereum" },
    { x: railXs[1], t: "SOL", chain: "Solana" },
    { x: railXs[2], t: "L2", chain: "L2" },
    { x: railXs[3], t: "FIAT", chain: "Fiat" },
  ];

  const lineToBox = (
    x1: number,
    y1: number,
    box: { cx: number; cy: number; w: number; h: number }
  ) => {
    const dx = box.cx - x1;
    const dy = box.cy - y1;
    const hw = box.w / 2;
    const hh = box.h / 2;
    const sx = dx !== 0 ? hw / Math.abs(dx) : Infinity;
    const sy = dy !== 0 ? hh / Math.abs(dy) : Infinity;
    const t = Math.min(sx, sy);
    return { x2: box.cx - dx * t, y2: box.cy - dy * t };
  };

  const node = (
    key: string,
    x: number,
    y: number,
    chain: ChainName,
    label?: string
  ) => (
    <g key={key}>
      <circle
        cx={x}
        cy={y}
        r={railR}
        fill="var(--color-surface)"
        stroke="var(--color-line-strong)"
        strokeWidth={1.25}
      />
      <ChainMarkGlyph
        name={chain}
        x={x - markSize / 2}
        y={y - markSize / 2}
        size={markSize}
        className="text-ink-soft"
      />
      {label ? (
        <text
          x={x}
          y={y + railR + 10}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7"
          fill="var(--color-muted)"
        >
          {label}
        </text>
      ) : null}
    </g>
  );

  // Logo + wordmark centered as one group inside the API box.
  const logoSize = 16;
  const apiLabel = "Epoch API";
  const apiLabelW = 56;
  const apiGap = 6;
  const apiGroupW = logoSize + apiGap + apiLabelW;
  const apiGroupX = api.cx - apiGroupW / 2;

  return (
    <Frame label="Integration surface" className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        className="h-auto w-full"
        aria-hidden="true"
      >
        <text
          x={lcx}
          y={labelY}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.1em"
          fill="var(--color-muted)"
        >
          TODAY
        </text>
        <text
          x={rcx}
          y={labelY}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="9"
          letterSpacing="0.1em"
          fill="var(--color-muted)"
        >
          WITH EPOCH
        </text>

        <path
          d={`M${mid} 28 V${H - 8}`}
          stroke="var(--color-line)"
          strokeWidth={1}
        />

        {scattered.map((n) => {
          const end = lineToBox(n.x, n.y, leftApp);
          const ang = Math.atan2(end.y2 - n.y, end.x2 - n.x);
          const x1 = n.x + Math.cos(ang) * (railR + 1);
          const y1 = n.y + Math.sin(ang) * (railR + 1);
          return (
            <path
              key={`wire-${n.t}`}
              d={`M${x1} ${y1} L${end.x2} ${end.y2}`}
              stroke="var(--color-line-strong)"
              strokeWidth={1.15}
              strokeDasharray="2.5 3"
              strokeLinecap="round"
            />
          );
        })}
        {scattered.map((n) => node(`L-${n.t}`, n.x, n.y, n.chain, n.t))}
        <rect
          x={leftApp.cx - leftApp.w / 2}
          y={leftApp.cy - leftApp.h / 2}
          width={leftApp.w}
          height={leftApp.h}
          rx={4}
          fill="var(--color-surface-2)"
          stroke="var(--color-line-strong)"
          strokeWidth={1.25}
        />
        <text
          x={leftApp.cx}
          y={leftApp.cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill="var(--color-muted)"
        >
          APP
        </text>

        {rails.map((n) => (
          <path
            key={`converge-${n.t}`}
            d={`M${n.x} ${railY + railR} L${n.x} ${api.cy - api.h / 2}`}
            stroke="var(--color-accent)"
            strokeWidth={1.35}
            strokeLinecap="round"
          />
        ))}
        {rails.map((n) => node(`R-${n.t}`, n.x, railY, n.chain))}

        <rect
          x={api.cx - api.w / 2}
          y={api.cy - api.h / 2}
          width={api.w}
          height={api.h}
          rx={5}
          fill="var(--color-surface)"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
        />
        <svg
          x={apiGroupX}
          y={api.cy - logoSize / 2}
          width={logoSize}
          height={logoSize}
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
        >
          <polygon
            style={{ fill: "var(--logo-1)" }}
            points="20.74,9.7 27.17,9.7 29.57,13.92 27.65,17.47 20.64,18.14 18.34,13.92"
          />
          <polygon
            style={{ fill: "var(--logo-2)" }}
            points="15.26,19.2 21.31,19.49 29.57,33.98 26.88,38.69 21.12,38.78 17.57,32.74"
          />
          <polygon
            style={{ fill: "var(--logo-1)" }}
            points="26.76,19.2 32.81,19.49 41.07,33.98 38.38,38.69 32.62,38.78 29.07,32.74"
          />
          <polygon
            style={{ fill: "var(--logo-3)" }}
            points="9.6,28.99 15.26,28.99 18.14,33.89 15.84,37.92 9.6,38.78 6.82,33.89"
          />
        </svg>
        <text
          x={apiGroupX + logoSize + apiGap + apiLabelW / 2}
          y={api.cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-display)"
          fontSize="11"
          fontWeight={640}
          fill="var(--color-ink)"
        >
          {apiLabel}
        </text>
        <path
          d={`M${rcx} ${api.cy + api.h / 2} V${yourApp.cy - yourApp.h / 2}`}
          stroke="var(--color-accent)"
          strokeWidth={1.35}
          strokeLinecap="round"
        />
        <rect
          x={yourApp.cx - yourApp.w / 2}
          y={yourApp.cy - yourApp.h / 2}
          width={yourApp.w}
          height={yourApp.h}
          rx={4}
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth={1.25}
        />
        <text
          x={yourApp.cx}
          y={yourApp.cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill="var(--color-accent-strong)"
        >
          YOUR APP
        </text>
      </svg>
    </Frame>
  );
}

