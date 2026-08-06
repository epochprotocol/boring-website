import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export for the epochprotocol.xyz custom domain.
  output: "export",
  // Lets CI build without colliding with a locally running dev server.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
