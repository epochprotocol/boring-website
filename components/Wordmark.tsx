import { EpochLogo } from "./EpochLogo";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`display text-xl tracking-tight text-ink flex items-center gap-2.5 ${className}`}
    >
      <EpochLogo className="h-7 w-7" />
      Epoch
    </span>
  );
}
