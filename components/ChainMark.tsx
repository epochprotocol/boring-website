import type { ReactNode } from "react";
import type { IconComponent } from "@web3icons/react";
import {
  NetworkArbitrumOne,
  NetworkAvalanche,
  NetworkBase,
  NetworkBinanceSmartChain,
  NetworkEthereum,
  NetworkOptimism,
  NetworkPolygon,
  NetworkSolana,
} from "@web3icons/react";

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

type NetworkChainName = Exclude<ChainName, "Fiat" | "L2">;

const networkIcons: Record<NetworkChainName, IconComponent> = {
  Ethereum: NetworkEthereum,
  Base: NetworkBase,
  Arbitrum: NetworkArbitrumOne,
  Optimism: NetworkOptimism,
  Polygon: NetworkPolygon,
  Avalanche: NetworkAvalanche,
  "BNB Chain": NetworkBinanceSmartChain,
  Solana: NetworkSolana,
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

function isNetworkChain(name: ChainName): name is NetworkChainName {
  return name !== "Fiat" && name !== "L2";
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

/** Render an official network mark in monochrome, inheriting the surface color. */
export function ChainMark({
  name,
  className = "",
}: {
  name: ChainName;
  className?: string;
}) {
  if (!isNetworkChain(name)) {
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

/** Nested official network mark for use inside a parent <svg>. */
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
  if (!isNetworkChain(name)) {
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
