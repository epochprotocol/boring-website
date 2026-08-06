export const dynamic = "force-static";

import type { MetadataRoute } from "next";

const siteUrl = "https://epochprotocol.xyz";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "yearly",
    priority: path === "" ? 1 : 0.5,
  }));
}
