"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

/**
 * Animated currency for outcome-record Amount rows.
 * Counts up from 0 so the figure resolves with the record print-in.
 */
export function RecordAmount({
  value,
  delayMs = 700,
}: {
  value: number;
  delayMs?: number;
}) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const id = window.setTimeout(() => setAmount(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return (
    <NumberFlow
      value={amount}
      format={{ style: "currency", currency: "USD" }}
      className="tabular-nums"
      style={{ lineHeight: 0.85 }}
    />
  );
}
