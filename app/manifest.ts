export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Epoch",
    short_name: "Epoch",
    description: "Rails for modern finance.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/epochfavicon32x32coloured.png", sizes: "500x500", type: "image/png", purpose: "any maskable" },
    ],
  };
}
