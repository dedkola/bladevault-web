#!/usr/bin/env node
/**
 * Postbuild step for the Cloudflare static deploy. `output: "export"` drops `redirects()` and
 * `headers()` from next.config, so this writes their Workers static-assets equivalents into `out/`:
 *
 *   - `out/_redirects` — the legacy GitBook paths (`/guides/compare`, …) from the same
 *     `.docs-cache/current/nav.json` the docs routes and sitemap read, so it can't drift from them;
 *   - `out/_headers`   — the cache rules that used to live in `vercel.json`, plus long caching for
 *     the hashed `/_next/static` bundles (Vercel added that one implicitly).
 *
 * Docs: https://developers.cloudflare.com/workers/static-assets/redirects/
 *       https://developers.cloudflare.com/workers/static-assets/headers/
 */
import fs from "node:fs"
import path from "node:path"

const OUT_DIR = path.join(process.cwd(), "out")
const NAV_FILE = path.join(process.cwd(), ".docs-cache", "current", "nav.json")

// Workers static assets limits: 2,000 static + 100 dynamic redirects.
const MAX_STATIC_REDIRECTS = 2000

const HEADERS = [
  {
    // Exported without an extension, so the asset server can't infer its type.
    source: "/opengraph-image",
    headers: { "Content-Type": "image/png" },
  },
  {
    source: "/_next/static/*",
    headers: { "Cache-Control": "public, max-age=31536000, immutable" },
  },
  {
    source: "/screenshots/*",
    headers: { "Cache-Control": "public, max-age=31536000, immutable" },
  },
  {
    source: "/docs/images/*",
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  },
]

function legacyDocsRedirects() {
  if (!fs.existsSync(NAV_FILE)) {
    throw new Error(
      `[cloudflare] ${NAV_FILE} is missing — run \`pnpm docs:fetch\` before building.`
    )
  }

  const nav = JSON.parse(fs.readFileSync(NAV_FILE, "utf8"))

  return Object.entries(nav.redirects ?? {}).filter(
    ([source, destination]) =>
      source.startsWith("/") &&
      source !== "/" &&
      source !== "/docs" &&
      source !== destination
  )
}

if (!fs.existsSync(OUT_DIR)) {
  throw new Error(
    "[cloudflare] out/ is missing — `next build` must run with output: 'export' first."
  )
}

const redirects = legacyDocsRedirects()
if (redirects.length > MAX_STATIC_REDIRECTS) {
  throw new Error(
    `[cloudflare] ${redirects.length} redirects exceed the ${MAX_STATIC_REDIRECTS} static redirect limit.`
  )
}

fs.writeFileSync(
  path.join(OUT_DIR, "_redirects"),
  redirects
    .map(([source, destination]) => `${source} ${destination} 301`)
    .join("\n") + "\n"
)

fs.writeFileSync(
  path.join(OUT_DIR, "_headers"),
  HEADERS.map(
    ({ source, headers }) =>
      `${source}\n${Object.entries(headers)
        .map(([key, value]) => `  ${key}: ${value}`)
        .join("\n")}`
  ).join("\n\n") + "\n"
)

console.log(
  `[cloudflare] wrote out/_redirects (${redirects.length}) and out/_headers (${HEADERS.length} rules)`
)
