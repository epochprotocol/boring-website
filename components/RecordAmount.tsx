"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

/**
 * Animated currency for outcome-record Amount rows.
 * Counts up from 0 so the figure resolves with the record print-in.
 * Optional `replayKey` re-ticks the figure (e.g. on record hover).
 */
export function RecordAmount({
  value,
  delayMs = 700,
  replayKey = 0,
}: {
  value: number;
  delayMs?: number;
  replayKey?: number;
}) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (replayKey === 0) {
      const id = window.setTimeout(() => setAmount(value), delayMs);
      return () => window.clearTimeout(id);
    }

    setAmount(Math.max(0, value - 1247));
    const id = window.setTimeout(() => setAmount(value), 60);
    return () => window.clearTimeout(id);
  }, [value, delayMs, replayKey]);

  return (
    <NumberFlow
      value={amount}
      format={{ style: "currency", currency: "USD" }}
      className="tabular-nums"
      style={{ lineHeight: 0.85 }}
    />
  );
}
