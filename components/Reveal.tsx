/**
 * DEPRECATED — kept only so no stale import breaks a build.
 *
 * This was a blanket "fade up on scroll" wrapper applied to almost every
 * element on the page. Uniform fade-up is decoration without narrative
 * purpose: it says nothing about the content, it delays reading, and it is
 * the single clearest tell of a template.
 *
 * Motion now lives in `components/MotionLayer.tsx`, where each scene has one
 * timeline and a reason to exist. Delete this file once you have confirmed
 * nothing imports it.
 */
export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return <div className={className}>{children}</div>;
}
