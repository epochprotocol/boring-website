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
  nodes: (
    <>
      <circle cx="6" cy="7" r="2.2" />
      <circle cx="18" cy="7" r="2.2" />
      <circle cx="6" cy="17" r="2.2" />
      <circle cx="18" cy="17" r="2.2" />
      <circle cx="12" cy="12" r="2.2" />
      <path d="M8 8l2.5 2.5M16 8l-2.5 2.5M8 16l2.5-2.5M16 16l-2.5-2.5" />
    </>
  ),
  cost: (
    <>
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M4 10h16" />
      <path d="M9 14h6" />
      <path d="M9 17h3.5" />
    </>
  ),
  lockIn: (
    <>
      <rect x="3" y="7" width="12" height="12" rx="2" />
      <path d="M15 11h4a2 2 0 012 2v1a2 2 0 01-2 2h-4" />
      <path d="M8 11v4" />
      <circle cx="8" cy="13" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  intent: (
    <>
      <path d="M5 7h10" />
      <path d="M5 12h14" />
      <path d="M5 17h8" />
      <circle cx="18" cy="7" r="2" />
    </>
  ),
  route: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="5" cy="18" r="2" />
      <path d="M7 6h5c3 0 5 2 5 5v0" />
      <path d="M17 13c0 2.5-2 4-5 4H7" />
    </>
  ),
  settle: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M8.5 12.5l2.5 2.5 5-5.5" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="12" r="3.5" />
      <path d="M11.5 12H20" />
      <path d="M17 12v3" />
      <path d="M20 12v2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4.5l3 2" />
    </>
  ),
  fail: (
    <>
      <path d="M4 12h10" />
      <path d="M14 12l-2.5-2.5M14 12l-2.5 2.5" />
      <path d="M18 7v10" />
      <path d="M16 9l4 0M16 15l4 0" />
    </>
  ),
  audit: (
    <>
      <path d="M8 3h7l4 4v13a1 1 0 01-1 1H8a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M15 3v4h4" />
      <path d="M10 12h6" />
      <path d="M10 16h4" />
    </>
  ),
  policy: (
    <>
      <path d="M7 4h10v16H7z" />
      <path d="M10 8h4" />
      <path d="M10 12h4" />
      <path d="M10 16h2.5" />
    </>
  ),
  building: (
    <>
      <path d="M4 20V8l8-4 8 4v12" />
      <path d="M9 20v-5h6v5" />
      <path d="M9 10h.01M12 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </>
  ),
  status: (
    <>
      <path d="M4 14a8 8 0 0116 0" />
      <path d="M7.5 14a4.5 4.5 0 019 0" />
      <circle cx="12" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <path d="M12 16v4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </>
  ),
  pack: (
    <>
      <path d="M4 8l8-4 8 4v9l-8 4-8-4V8z" />
      <path d="M12 12v9" />
      <path d="M4 8l8 4 8-4" />
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
