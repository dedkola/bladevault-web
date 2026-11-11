import type { NextConfig } from "next"

/**
 * The site is fully static and deploys to Cloudflare Workers static assets (see `wrangler.jsonc`).
 * Static export has no server, so:
 *   - the legacy docs redirects and cache headers are written to `out/_redirects` / `out/_headers`
 *     by `scripts/cloudflare-routing.mjs` (the `postbuild` step), not by `redirects()` / `headers()`;
 *   - `next/image` resizes through Cloudflare Image Transformations via a custom loader.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/cloudflare-image-loader.ts",
  },
}

export default nextConfig
