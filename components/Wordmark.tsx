import { EpochLogo } from "./EpochLogo";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center ${className}`}>
      <EpochLogo className="h-7 w-36" />
    </span>
  );
}
