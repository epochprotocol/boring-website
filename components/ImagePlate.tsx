import Image from "next/image";

/**
 * Raster plates from public/ presented in the same framed-diagram language as
 * the SVG infographics: ruled chrome on top, the image set inside a hairline
 * frame below. The plate reads as part of the ledger, not a dropped-in
 * screenshot.
 */
export function ImagePlate({
  src,
  label,
  /** Source aspect ratio (width / height) so the frame never letterboxes. */
  ratio = 1,
  alt,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
  className = "",
}: {
  src: string;
  label: string;
  ratio?: number;
  /** Required, never empty: these plates carry content, not decoration. */
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={`diagram ${className}`}>
      <div className="diagram-chrome">
        <span className="label">{label}</span>
      </div>
      <div className="diagram-body">
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: `${ratio}` }}
        >
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
        </div>
      </div>
    </figure>
  );
}
