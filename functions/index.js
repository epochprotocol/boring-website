/**
 * Cloudflare Pages Function — markdown content negotiation.
 *
 * When a client sends `Accept: text/markdown`, serve the markdown mirror of
 * this page with `Content-Type: text/markdown` and `Vary: Accept,
 * Accept-Encoding` (the Vary header keeps Cloudflare's cache from serving
 * one variant to the wrong client; `_headers` sets it globally, and it is
 * repeated here so the negotiated response always carries it).
 *
 * Any other request falls through to the static asset — the site's HTML,
 * behavior, and visual design are untouched. If the mirror is missing or
 * the Functions environment has no ASSETS binding, we degrade to the
 * standard static response rather than erroring.
 *
 * Route scope: `/` (see functions/about.js for `/about`).
 */

const MARKDOWN_MIRROR = "/index.md";

export async function onRequestGet(context) {
  const { request, env } = context;
  const accept = request.headers.get("accept") || "";

  if (accept.includes("text/markdown") && env?.ASSETS) {
    const url = new URL(request.url);
    const mirror = await env.ASSETS.fetch(new URL(MARKDOWN_MIRROR, url));
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
