"use client";

import type { Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  ArrowsLeftRight,
  Bank,
  Buildings,
  Certificate,
  CheckCircle,
  CreditCard,
  Cube,
  CursorClick,
  Envelope,
  FileText,
  Gauge,
  Graph,
  Key,
  ListChecks,
  Lock,
  LockKey,
  Package,
  Path,
  PlugsConnected,
  ShieldCheck,
  ShieldWarning,
  Stack,
  Swap,
  Timer,
} from "@phosphor-icons/react";

export type IconName =
  | "crossChain"
  | "swap"
  | "shield"
  | "layers"
  | "click"
  | "bank"
  | "plug"
  | "lock"
  | "boxCheck"
  | "nodes"
  | "cost"
  | "lockIn"
  | "intent"
  | "route"
  | "settle"
  | "key"
  | "clock"
  | "fail"
  | "audit"
  | "policy"
  | "building"
  | "status"
  | "mail"
  | "pack";

/**
 * Every mark on the site is a Phosphor glyph at regular weight. The union of
 * names is stable so consumers keep saying `<Icon name="shield" />`; only the
 * drawing changed — hand-drawn paths were retired in favour of a consistent
 * icon family.
 */
const glyphs: Record<IconName, PhosphorIcon> = {
  crossChain: ArrowsLeftRight,
  swap: Swap,
  shield: ShieldCheck,
  lock: LockKey,
  layers: Stack,
  boxCheck: Cube,
  nodes: Graph,
  cost: CreditCard,
  lockIn: Lock,
  intent: FileText,
  route: Path,
  settle: CheckCircle,
  key: Key,
  clock: Timer,
  fail: ShieldWarning,
  audit: Certificate,
  policy: ListChecks,
  building: Buildings,
  status: Gauge,
  mail: Envelope,
  pack: Package,
  click: CursorClick,
  bank: Bank,
  plug: PlugsConnected,
};

export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  const Glyph = glyphs[name];
  return (
    <Glyph
      weight="regular"
      size={20}
      aria-hidden="true"
      className={`h-5 w-5 ${className}`}
    />
  );
}
