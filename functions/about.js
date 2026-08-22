/**
 * Cloudflare Pages Function — markdown content negotiation for `/about`.
 *
 * Same contract as functions/index.js: `Accept: text/markdown` gets the
 * markdown mirror with `Content-Type: text/markdown` and `Vary: Accept,
 * Accept-Encoding`; everything else falls through to the static HTML.
 *
 * Route scope: `/about` and `/about/`.
 */

const MARKDOWN_MIRRORS = new Set(["/about", "/about/"]);

export async function onRequestGet(context) {
  const { request, env } = context;
  const { pathname } = new URL(request.url);
  const accept = request.headers.get("accept") || "";

  if (MARKDOWN_MIRRORS.has(pathname) && accept.includes("text/markdown") && env?.ASSETS) {
    const mirror = await env.ASSETS.fetch(new URL("/about.md", request.url));
    if (mirror.ok) {
      return new Response(mirror.body, {
        status: 200,
        headers: {
          "Content-Type": "text/markdown; charset=utf-8",
          Vary: "Accept, Accept-Encoding",
          "Cache-Control": "public, max-age=0, must-revalidate",
        },
      });
    }
  }

  return env.ASSETS.fetch(request);
}
