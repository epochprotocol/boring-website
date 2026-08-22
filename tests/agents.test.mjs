/**
 * Agentic-readiness regression tests. These guard the machine-readable
 * surface of the site — the artifacts agents and audits consume:
 *
 * - public/openapi.json  (published API specification)
 * - public/llms.txt      (agent orientation file)
 * - app/layout.tsx       (Organization JSON-LD, brand titles)
 * - app/not-found.tsx    (agent-recovery 404 body)
 * - app/about/page.tsx   (trust anchor page)
 * - app/sitemap.ts       (about page discoverability)
 *
 * Run with: npm test
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
test("openapi.json is valid OpenAPI 3 with complete operations", async () => {
  const spec = JSON.parse(await read("public/openapi.json"));
  assert.equal(spec.openapi, "3.0.3");
  assert.match(spec.info.title, /Epoch Protocol/);
  assert.ok(spec.info.description.length > 100);
  assert.equal(spec.info.contact.email, "sales@epochprotocol.xyz");

  const servers = spec.servers.map((s) => s.url);
  assert.ok(servers.includes("https://api.epochprotocol.xyz"));
  assert.ok(servers.includes("https://testnet-dev.epochprotocol.xyz"));
  const policy = spec.info["x-versioning-policy"];
  assert.ok(policy?.deprecation, "versioning/deprecation policy missing");
  assert.match(policy.current, /^v\d/);


  const operationIds = new Set();
  for (const [path, item] of Object.entries(spec.paths)) {
    for (const [method, op] of Object.entries(item)) {
      assert.ok(
        ["get", "post", "put", "delete", "patch"].includes(method),
        `${method} ${path}`,
      );
      assert.ok(op.operationId, `operationId missing on ${method} ${path}`);
      assert.ok(!operationIds.has(op.operationId), `duplicate operationId ${op.operationId}`);
      operationIds.add(op.operationId);
      assert.ok(op.description?.length > 40, `description missing on ${op.operationId}`);
      assert.ok(Object.keys(op.responses).length > 0, `responses missing on ${op.operationId}`);
    }
  }
  // The surface the @epoch-protocol/epoch-intents-sdk actually drives.
  for (const expected of [
    "getHealth",
    "quoteIntent",
    "createAllocation",
    "getSuggestedNonce",
    "getIntentStatus",
    "reportFill",
    "getMidenCollateralConfig",
    "getGaslessStatus",
    "relayDeposit",
    "relayEnableDelegation",
    "relayExecute",
  ]) {
    assert.ok(operationIds.has(expected), `missing operation ${expected}`);
  }
});

test("openapi.json resolves every internal $ref", async () => {
  const spec = JSON.parse(await read("public/openapi.json"));
  const refs = [];
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (node && typeof node === "object") {
      for (const [key, value] of Object.entries(node)) {
        if (key === "$ref") refs.push(value);
        else walk(value);
      }
    }
  };
  walk(spec);
  for (const ref of refs) {
    assert.match(ref, /^#\//);
    const [, , section, name] = ref.split("/");
    assert.ok(
      spec.components?.[section]?.[name],
      `unresolved $ref ${ref}`,
    );
  }
});

test("llms.txt follows the spec shape and names agent guidance", async () => {
  const text = await read("public/llms.txt");
  assert.match(text, /^# Epoch Protocol\n/);
  assert.match(text, /^> /m, "must open with a one-line summary blockquote");
  assert.match(text, /## When to use Epoch Protocol/);
  assert.match(text, /## How to integrate/);
  assert.match(text, /https:\/\/epochprotocol\.xyz\/openapi\.json/);
  assert.match(text, /https:\/\/docs\.epochprotocol\.xyz\//);
  // Non-custodial constraint stated so agents never misrepresent the product.
  assert.match(text, /non-custodial/i);
});

test("root layout carries Organization JSON-LD with contact and address", async () => {
  const source = await read("app/layout.tsx");
  assert.match(source, /contactPoint/);
  assert.match(source, /email:\s*"sales@epochprotocol\.xyz"/);
  assert.match(source, /contactType:\s*"sales"/);
  assert.match(source, /application\/ld\+json/);
  // Brand name in titles so name-based queries surface the domain.
  assert.match(source, /Epoch Protocol — \$\{TAGLINE\}/);
  assert.match(source, /"%s — Epoch Protocol"/);
});

test("404 page ships an agent-recovery markdown body and links", async () => {
  const source = await read("app/not-found.tsx");
  assert.match(source, /<pre[\s\S]*data-agent-recovery/);
  assert.match(source, /# 404 — Not Found/);
  assert.match(source, /sitemap\.xml/);
  assert.match(source, /llms\.txt/);
  assert.match(source, /openapi\.json/);
});

test("about trust page exists with substantive content", async () => {
  const source = await read("app/about/page.tsx");
  assert.match(source, /title: "About"/);
  // Strip JSX tags and template noise for a rough prose-length check.
  const prose = source
    .replace(/import[\s\S]*?from "@\/lib\/site";/, "")
    .replace(/<[^>]+>/g, " ");
  assert.ok(prose.length > 1500, `about page prose too short: ${prose.length}`);
  assert.match(source, /Async Tech LLC/);
  assert.match(source, /Non-custodial/i);
});

test("sitemap includes the about page", async () => {
  const source = await read("app/sitemap.ts");
  assert.match(source, /"\/about"/);
});

test("footer links the machine-readable resources", async () => {
  const source = await read("components/Footer.tsx");
  assert.match(source, /"About", href: "\/about"/);
  assert.match(source, /"API specification", href: "\/openapi\.json"/);
  assert.match(source, /"Agent guide \(llms\.txt\)", href: "\/llms\.txt"/);
});

test("homepage exposes developer and agent resources as visible content", async () => {
  const source = await read("components/Surfaces.tsx");
  assert.match(source, /Epoch Protocol developer resources/);
  assert.match(source, /@epoch-protocol\/epoch-intents-sdk/);
  assert.match(source, /epoch-intents-cli/);
  assert.match(source, /\/openapi\.json/);
  assert.match(source, /When an agent should call Epoch/);
});

test("Cloudflare Pages _headers declares Vary: Accept, Accept-Encoding", async () => {
  const source = await read("public/_headers");
  // The rule must apply site-wide and name both request headers the
  // response varies on; a missing Accept lets the cache serve one page
  // variant to the wrong client.
  assert.match(source, /^\/\*\n {2}Vary: Accept, Accept-Encoding$/m);
});

test("markdown mirrors exist for negotiated pages", async () => {
  for (const path of ["public/index.md", "public/about.md"]) {
    const md = await read(path);
    assert.match(md, /^# /m, `${path} lacks an H1`);
    assert.match(md, /non-custodial/i, `${path} must state the custody model`);
    assert.match(md, /docs\.epochprotocol\.xyz/, `${path} must point at the docs`);
  }
});

test("Pages Functions negotiate markdown with Vary on the response", async () => {
  for (const fn of ["functions/index.js", "functions/about.js"]) {
    const source = await read(fn);
    assert.match(source, /Vary:\s*"Accept, Accept-Encoding"/, `${fn} must set Vary`);
    assert.match(source, /ASSETS\.fetch\(request\)/, `${fn} must fall through to static assets`);
  }
});
