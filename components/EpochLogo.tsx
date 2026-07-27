// Epoch mark, traced pixel-accurate from the brand logo. Monochrome shades
// are driven by CSS variables (--logo-1/2/3) so the mark stays legible in
// both light and dark themes without swapping assets.
export function EpochLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon
        style={{ fill: "var(--logo-1)" }}
        points="20.74,9.7 27.17,9.7 29.57,13.92 27.65,17.47 20.64,18.14 18.34,13.92"
      />
      <polygon
        style={{ fill: "var(--logo-2)" }}
        points="15.26,19.2 21.31,19.49 29.57,33.98 26.88,38.69 21.12,38.78 17.57,32.74"
      />
      <polygon
        style={{ fill: "var(--logo-1)" }}
        points="26.76,19.2 32.81,19.49 41.07,33.98 38.38,38.69 32.62,38.78 29.07,32.74"
      />
      <polygon
        style={{ fill: "var(--logo-3)" }}
        points="9.6,28.99 15.26,28.99 18.14,33.89 15.84,37.92 9.6,38.78 6.82,33.89"
      />
    </svg>
  );
}
