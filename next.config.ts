import fs from "node:fs"
import path from "node:path"

import type { NextConfig } from "next"

/**
 * The legacy GitBook paths (`/guides/compare`, `/installation/docker`, …) are generated from the same
 * `nav.json` the routes and the sitemap read, so the redirect table can never drift from the real pages.
 * The file is written by `scripts/fetch-docs.mjs` (the `predev` / `prebuild` step).
 */
type DocsNavFile = {
  pages: Array<{ route: string }>
  redirects: Record<string, string>
}

type DocsRedirect = {
  source: string
  destination: string
  permanent: boolean
}

const NAV_FILE = path.join(process.cwd(), ".docs-cache", "current", "nav.json")

function legacyDocsRedirects(): DocsRedirect[] {
  if (!fs.existsSync(NAV_FILE)) {
    console.warn(
      "[docs] .docs-cache/current/nav.json is missing — legacy docs redirects are disabled for this run. Run `pnpm docs:fetch`."
    )
    return []
  }

  const nav = JSON.parse(fs.readFileSync(NAV_FILE, "utf8")) as DocsNavFile

  return Object.entries(nav.redirects ?? {})
    .filter(([source]) => source.startsWith("/") && !source.startsWith("/docs"))
    .map(([source, destination]) => ({ source, destination, permanent: true }))
}

const nextConfig: NextConfig = {
  async redirects() {
    return legacyDocsRedirects()
  },
}

export default nextConfig
