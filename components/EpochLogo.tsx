import Image from "next/image";

/**
 * Brand mark. Light theme uses the color asset; dark and mix use the
 * monochrome mark. Both images share one box so the swap never shifts layout.
 */
export function EpochLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-grid ${className}`}>
      <Image
        src="/epoch-logo-color-name.png"
        alt=""
        width={1956}
        height={386}
        aria-hidden="true"
        className="col-start-1 row-start-1 h-full w-full object-contain [.dark_&]:invisible [.mix_&]:invisible"
      />
      <Image
        src="/epoch-logo-name.png"
        alt=""
        width={1956}
        height={386}
        aria-hidden="true"
        className="col-start-1 row-start-1 h-full w-full object-contain invisible [.dark_&]:visible [.mix_&]:visible"
      />

    </span>
  );
}
