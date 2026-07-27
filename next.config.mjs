import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// GitHub Pages serves this project repo under /boring-website. The subpath is
// only applied in CI (GITHUB_PAGES=true) so local `npm run dev` stays at root.
const isPages = process.env.GITHUB_PAGES === "true";
const repoBase = "/boring-website";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export so the site can be hosted on GitHub Pages.
  output: "export",
  // GitHub Pages has no image optimizer; serve images as-is.
  images: { unoptimized: true },
  // Emit /path/index.html so routes resolve without a server.
  trailingSlash: true,
  // Pin the tracing root to this app so the parent monorepo lockfile is ignored.
  outputFileTracingRoot: __dirname,
  ...(isPages ? { basePath: repoBase, assetPrefix: repoBase } : {}),
};

export default nextConfig;
