import Image from "next/image";

/** Monochrome Epoch wordmark: dark on light surfaces, light on dark ones. */
export function EpochLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-grid ${className}`}>
      <Image
        src="/epochfavicon32x32coloured.png"
        alt=""
        width={1956}
        height={386}
        aria-hidden="true"
        className="h-full w-full object-contain"
      />
    </span>
  );
}
