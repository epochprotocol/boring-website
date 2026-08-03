import Link from "next/link";
import { DOCS_URL, SALES_CALENDAR_URL } from "@/lib/site";

type CtaButtonsProps = {
  className?: string;
  align?: "start" | "center";
  /** Lets a parent scene mark this group as one of its animated items. */
  "data-hero-item"?: boolean;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function CtaButtons({
  className = "",
  align = "start",
  ...rest
}: CtaButtonsProps) {
  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 ${
        align === "center" ? "sm:justify-center" : ""
      } ${className}`}
      {...rest}
    >
      <Link
        href={SALES_CALENDAR_URL}
        {...bookProps}
        className="btn btn-lg btn-primary"
      >
        Book a sales call
        <span className="btn-arrow" aria-hidden="true">
          &rarr;
        </span>
      </Link>
      <a
        href={DOCS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-lg btn-secondary"
      >
        Read the docs
      </a>
    </div>
  );
}
