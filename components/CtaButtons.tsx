import Link from "next/link";
import { DOCS_URL, SALES_CALENDAR_URL } from "@/lib/site";

type CtaButtonsProps = {
  className?: string;
  align?: "start" | "center";
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function CtaButtons({ className = "", align = "start" }: CtaButtonsProps) {
  const bookProps = isExternal(SALES_CALENDAR_URL)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div
      className={`flex flex-col sm:flex-row gap-3 ${
        align === "center" ? "sm:justify-center" : ""
      } ${className}`}
    >
      <Link href={SALES_CALENDAR_URL} {...bookProps} className="btn btn-lg btn-primary">
        Book a sales call
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
