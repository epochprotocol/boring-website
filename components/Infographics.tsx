/**
 * Line-drawn infographics for the Ledger system.
 * Hairlines + accent marks only — no gradients, glow, or soft illustration.
 */

import type { ReactNode } from "react";

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
  const nodes = [
    { x: 40, label: "Intent", sub: "API call" },
    { x: 160, label: "Epoch", sub: "Coordinate" },
    { x: 280, label: "Settle", sub: "Confirm" },
  ];
  const step = Math.max(0, Math.min(2, active));

  return (
    <Frame label={`Outcome path · 0${step + 1}`} className={className}>
      <svg
        viewBox="0 0 320 120"
        fill="none"
        className="h-auto w-full"
        aria-hidden="true"
      >
        <path
          d="M56 52 H136"
          stroke={
            step >= 1 ? "var(--color-accent)" : "var(--color-line-strong)"
          }
          strokeWidth={1.5}
        />
        <path
          d="M184 52 H264"
          stroke={
            step >= 2 ? "var(--color-accent)" : "var(--color-line-strong)"
          }
          strokeWidth={1.5}
        />
        <path
          d="M130 48l6 4-6 4"
          stroke={
            step >= 1 ? "var(--color-accent)" : "var(--color-line-strong)"
          }
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M258 48l6 4-6 4"
          stroke={
            step >= 2 ? "var(--color-accent)" : "var(--color-line-strong)"
          }
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {nodes.map((n, i) => {
          const on = i === step;
          return (
            <g key={n.label}>
              <rect
                x={n.x - 28}
                y={28}
                width={56}
                height={48}
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

/** Scattered rails vs one API. Used in Why this is hard today. */
export function FragmentInfographic({ className = "" }: DiagramProps) {
  const left = [
    { x: 36, y: 28, t: "ETH" },
    { x: 78, y: 58, t: "SOL" },
    { x: 40, y: 88, t: "FIAT" },
    { x: 86, y: 100, t: "L2" },
  ];

  return (
    <Frame label="Integration surface" className={className}>
      <svg
        viewBox="0 0 320 132"
        fill="none"
        className="h-auto w-full"
        aria-hidden="true"
      >
        <text
          x={62}
          y={16}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
          fill="var(--color-muted)"
        >
          TODAY
        </text>
        <text
          x={230}
          y={16}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
          fill="var(--color-muted)"
        >
          WITH EPOCH
        </text>

        {/* Fragmented side */}
        {left.map((n) => (
          <g key={n.t}>
            <circle
              cx={n.x}
              cy={n.y}
              r={11}
              fill="var(--color-surface)"
              stroke="var(--color-line-strong)"
              strokeWidth={1.25}
            />
            <text
              x={n.x}
              y={n.y + 3}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="7.5"
              fill="var(--color-ink-soft)"
            >
              {n.t}
            </text>
          </g>
        ))}
        <path
          d="M47 38 L70 52 M47 80 L72 62 M51 92 L78 98"
          stroke="var(--color-line)"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
        <rect
          x={48}
          y={48}
          width={28}
          height={20}
          rx={3}
          fill="var(--color-surface-2)"
          stroke="var(--color-line-strong)"
          strokeWidth={1}
        />
        <text
          x={62}
          y={61}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7"
          fill="var(--color-muted)"
        >
          APP
        </text>

        {/* Divider */}
        <path
          d="M128 24 V118"
          stroke="var(--color-line)"
          strokeWidth={1}
        />

        {/* Unified side */}
        {[
          { x: 176, y: 40, t: "ETH" },
          { x: 210, y: 40, t: "SOL" },
          { x: 244, y: 40, t: "L2" },
          { x: 278, y: 40, t: "FIAT" },
        ].map((n) => (
          <g key={n.t}>
            <circle
              cx={n.x}
              cy={n.y}
              r={10}
              fill="var(--color-surface)"
              stroke="var(--color-line-strong)"
              strokeWidth={1.25}
            />
            <text
              x={n.x}
              y={n.y + 3}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="7"
              fill="var(--color-ink-soft)"
            >
              {n.t}
            </text>
            <path
              d={`M${n.x} 50 V68`}
              stroke="var(--color-accent)"
              strokeWidth={1.25}
            />
          </g>
        ))}
        <rect
          x={188}
          y={68}
          width={84}
          height={28}
          rx={6}
          fill="var(--color-surface)"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
        />
        <text
          x={230}
          y={86}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="11"
          fontWeight={640}
          fill="var(--color-ink)"
        >
          Epoch API
        </text>
        <path
          d="M230 96 V108"
          stroke="var(--color-accent)"
          strokeWidth={1.25}
        />
        <rect
          x={204}
          y={108}
          width={52}
          height={16}
          rx={3}
          fill="var(--color-accent-soft)"
          stroke="var(--color-accent)"
          strokeWidth={1}
        />
        <text
          x={230}
          y={119}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7.5"
          fill="var(--color-accent-strong)"
        >
          YOUR APP
        </text>
      </svg>
    </Frame>
  );
}

/** Non-custodial model: keys stay with client. Used in Security. */
export function CustodyInfographic({ className = "" }: DiagramProps) {
  return (
    <Frame label="Custody model" className={className}>
      <svg
        viewBox="0 0 320 128"
        fill="none"
        className="h-auto w-full"
        aria-hidden="true"
      >
        {/* Client */}
        <rect
          x={16}
          y={28}
          width={88}
          height={72}
          rx={6}
          fill="var(--color-surface)"
          stroke="var(--color-line-strong)"
          strokeWidth={1.5}
        />
        <text
          x={60}
          y={50}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="0.08em"
          fill="var(--color-muted)"
        >
          CLIENT
        </text>
        <circle
          cx={60}
          cy={70}
          r={10}
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          fill="var(--color-accent-soft)"
        />
        <path
          d="M56 70h5M63 70v3"
          stroke="var(--color-accent-strong)"
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        <text
          x={60}
          y={92}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          fill="var(--color-ink-soft)"
        >
          KEYS
        </text>

        {/* Auth arrow */}
        <path
          d="M108 64 H140"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
        />
        <path
          d="M134 60l6 4-6 4"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text
          x={124}
          y={56}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7"
          letterSpacing="0.06em"
          fill="var(--color-muted)"
        >
          AUTH
        </text>

        {/* Epoch */}
        <rect
          x={144}
          y={36}
          width={72}
          height={56}
          rx={6}
          fill="var(--color-surface)"
          stroke="var(--color-accent)"
          strokeWidth={1.5}
        />
        <text
          x={180}
          y={60}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="12"
          fontWeight={640}
          fill="var(--color-ink)"
        >
          Epoch
        </text>
        <text
          x={180}
          y={76}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="7.5"
          letterSpacing="0.06em"
          fill="var(--color-muted)"
        >
          ORCHESTRATE
        </text>

        {/* Execute arrow */}
        <path
          d="M220 64 H250"
          stroke="var(--color-line-strong)"
          strokeWidth={1.5}
        />
        <path
          d="M244 60l6 4-6 4"
          stroke="var(--color-line-strong)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Chains */}
        {[
          { y: 36, t: "L1" },
          { y: 64, t: "L2" },
          { y: 92, t: "FIAT" },
        ].map((n) => (
          <g key={n.t}>
            <rect
              x={254}
              y={n.y}
              width={50}
              height={22}
              rx={4}
              fill="var(--color-surface)"
              stroke="var(--color-line-strong)"
              strokeWidth={1.25}
            />
            <text
              x={279}
              y={n.y + 15}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="8"
              fill="var(--color-ink-soft)"
            >
              {n.t}
            </text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}
