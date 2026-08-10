import type { ReactNode } from "react";
import type { IconComponent } from "@web3icons/react";
import {
  NetworkArbitrumOne,
  NetworkBase,
  NetworkBinanceSmartChain,
  NetworkEthereum,
  NetworkOptimism,
  NetworkPolygon,
} from "@web3icons/react";

export type ChainName =
  | "Ethereum"
  | "Base"
  | "Arbitrum"
  | "Optimism"
  | "Polygon"
  | "Miden"
  | "BNB Chain"
  | "Fiat"
  | "L2";

type IconChainName = Exclude<ChainName, "Fiat" | "L2" | "Miden">;

const networkIcons: Record<IconChainName, IconComponent> = {
  Ethereum: NetworkEthereum,
  Base: NetworkBase,
  Arbitrum: NetworkArbitrumOne,
  Optimism: NetworkOptimism,
  Polygon: NetworkPolygon,
  "BNB Chain": NetworkBinanceSmartChain,
};

const utilityMarks: Record<"Fiat" | "L2", ReactNode> = {
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
        fill="none"
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

function isIconChain(name: ChainName): name is IconChainName {
  return name !== "Fiat" && name !== "L2" && name !== "Miden";
}

function MidenMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/miden.svg"
      alt=""
      className={`h-5 w-5 object-contain ${className}`}
      aria-hidden="true"
    />
  );
}

function UtilityMark({
  name,
  className = "",
}: {
  name: "Fiat" | "L2";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`h-5 w-5 ${className}`}
      aria-hidden="true"
    >
      {utilityMarks[name]}
    </svg>
  );
}

/** Render a network mark, using the provided Miden asset where needed. */
export function ChainMark({
  name,
  className = "",
}: {
  name: ChainName;
  className?: string;
}) {
  if (name === "Miden") {
    return <MidenMark className={className} />;
  }
  if (!isIconChain(name)) {
    return <UtilityMark name={name} className={className} />;
  }

  const Icon = networkIcons[name];
  return (
    <Icon
      variant="mono"
      className={`h-5 w-5 ${className}`}
      aria-hidden="true"
    />
  );
}

/** Nested network mark for use inside a parent <svg>. */
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
  if (name === "Miden") {
    return (
      <image
        href="/miden.svg"
        x={x}
        y={y}
        width={size}
        height={size}
        preserveAspectRatio="xMidYMid meet"
        className={className}
        aria-hidden="true"
      />
    );
  }
  if (!isIconChain(name)) {
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
        {utilityMarks[name]}
      </svg>
    );
  }

  const Icon = networkIcons[name];
  return (
    <Icon
      x={x}
      y={y}
      width={size}
      height={size}
      variant="mono"
      className={className}
      aria-hidden="true"
    />
  );
}
