type IconName =
  | "crossChain"
  | "swap"
  | "shield"
  | "layers"
  | "click"
  | "bank"
  | "plug"
  | "lock"
  | "boxCheck";

const paths: Record<IconName, React.ReactNode> = {
  crossChain: (
    <>
      <path d="M4 8h11" />
      <path d="M12 4l3 4-3 4" />
      <path d="M20 16H9" />
      <path d="M12 20l-3-4 3-4" />
    </>
  ),
  swap: (
    <>
      <path d="M7 4v13" />
      <path d="M4 14l3 3 3-3" />
      <path d="M17 20V7" />
      <path d="M20 10l-3-3-3 3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l8 4-8 4-8-4 8-4z" />
      <path d="M4 12l8 4 8-4" />
      <path d="M4 17l8 4 8-4" />
    </>
  ),
  click: (
    <>
      <path d="M9 3v3" />
      <path d="M15 3v3" />
      <path d="M4.5 9H7" />
      <path d="M4.5 15H7" />
      <path d="M13 12l8 3-3.2 1.3L16.5 19 13 12z" />
    </>
  ),
  bank: (
    <>
      <path d="M4 10l8-5 8 5" />
      <path d="M5 10v8" />
      <path d="M9 10v8" />
      <path d="M15 10v8" />
      <path d="M19 10v8" />
      <path d="M3 20h18" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v4" />
      <path d="M15 3v4" />
      <path d="M7 7h10v4a5 5 0 01-10 0V7z" />
      <path d="M12 16v5" />
    </>
  ),
  boxCheck: (
    <>
      <path d="M3 8l9-5 9 5-9 5-9-5z" />
      <path d="M3 8v9l9 5 9-5V8" />
      <path d="M9.5 12.5l2 2 4-3.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
      <path d="M12 15v2" />
    </>
  ),
};

export function Icon({
  name,
  className = "",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-5 w-5 ${className}`}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
