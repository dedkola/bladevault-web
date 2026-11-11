# Vercel → Cloudflare migration

The site is now a static export (`output: "export"` → `out/`) served by an **assets-only Cloudflare Worker** (`wrangler.jsonc`). No Worker code runs, so there is no server cost or cold start.

## What changed in the repo

| Was (Vercel)                                             | Now (Cloudflare)                                                                                                   |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `redirects()` in `next.config.ts` (36 legacy docs paths) | `out/_redirects`, generated from `.docs-cache/current/nav.json` by `scripts/cloudflare-routing.mjs` (`postbuild`)  |
| `vercel.json` cache headers                              | `out/_headers`, same script; also adds `immutable` for `/_next/static/*` and `Content-Type` for `/opengraph-image` |
| Vercel image optimizer (`/_next/image`)                  | `lib/cloudflare-image-loader.ts` → `/cdn-cgi/image/width=…,quality=…,format=auto/…`                                |
| `VERCEL_PROJECT_PRODUCTION_URL` fallback                 | removed; `NEXT_PUBLIC_SITE_URL` / `SITE_URL`, else `https://bladevault.pro`                                        |
| `pnpm start`                                             | `pnpm preview` (local Workers runtime, transforms off) and `pnpm deploy`                                           |

Metadata routes (`manifest`, `robots`, `sitemap`, `opengraph-image`) are marked `force-static`, which export requires.

## Cutover checklist

### 1. Cloudflare account setup

- [ ] Add `bladevault.pro` as a zone in Cloudflare (if DNS isn't there already). Lower the TTL on the current Vercel records a day ahead.
- [ ] **Images → Transformations → enable for `bladevault.pro`.** Without this, every `next/image` request to `/cdn-cgi/image/…` fails. (Free plan: 5,000 unique transformations/month.)
- [ ] Under Transformations, keep "Resize from any origin" **off**, because the loader only transforms same-origin paths.

### 2. First deploy (on `*.workers.dev`)

```bash
pnpm exec wrangler login
pnpm deploy
```

- [ ] Open `https://bladevault-web.<account>.workers.dev` and check `/`, `/docs`, `/whats-new`, `/compare`, `/tutorials`, a legacy path such as `/installation/docker` (should 301), and an unknown path (404 page).
- [ ] On `workers.dev`, image transformations aren't available, so images break there until the custom domain is attached. If you want to check pages there first, build with `NEXT_PUBLIC_CF_IMAGE_TRANSFORMS=off pnpm deploy`.

### 3. CI / Git deploys (replaces Vercel Git integration)

Choose one:

- **Workers Builds** (dashboard → Worker → Settings → Builds → connect `dedkola/bladevault-web`):
  - Build command: `pnpm build`, deploy command: `pnpm exec wrangler deploy`
  - Env vars: `GITHUB_TOKEN` (read-only PAT, so `fetch-docs.mjs` isn't rate-limited), optionally `DOCS_REF`, `NEXT_PUBLIC_SITE_URL`
  - Node 24 (it's set in `.nvmrc`; set `NODE_VERSION=24` if the image doesn't pick it up)
  - Turn on non-production branch builds for PR previews (`wrangler versions upload`).
- **GitHub Actions** with `cloudflare/wrangler-action` and `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` secrets.

Preview URLs on `workers.dev` won't transform images (see above).

### 4. Domain cutover

- [x] `routes` in `wrangler.jsonc` attach the apex and `www` as custom domains on deploy. Cloudflare creates the DNS records and certificates.
- [ ] Remove the conflicting Vercel A/CNAME records for `bladevault.pro` / `www`.
- [ ] Decide the `www` ↔ apex canonical, and add a Redirect Rule (Rules → Redirect Rules) for the other host.
- [ ] Check `video.bladevault.pro` separately. It isn't served by this project, so make sure its DNS record survives the zone move.

### 5. Verify in production

- [ ] `curl -I https://bladevault.pro/installation/docker` → `301 /docs/installation/docker`
- [ ] `curl -I https://bladevault.pro/screenshots/collection.png` → `cache-control: public, max-age=31536000, immutable`
- [ ] Images on `/` load as `/cdn-cgi/image/…` with `content-type: image/avif` or `image/webp`
- [ ] `/opengraph-image` → `image/png`; re-scrape in the X / LinkedIn / Facebook debuggers
- [ ] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/docs/search-index.json`, `/docs/llms.txt`
- [ ] Desktop and mobile visual pass against `public/screenshots/`

### 6. Decommission Vercel

- [ ] After a few days with no traffic on Vercel, disconnect the Git integration and delete the Vercel project. Move any Vercel Analytics / Speed Insights setup to Cloudflare Web Analytics.

## Notes

- **Releases sync:** `.github/workflows/sync-releases.yml` only opens PRs. A merge to `main` triggers the Cloudflare build, the same way Vercel did.
- **Rollback:** `pnpm exec wrangler rollback`. Until step 6, you can also point DNS back at Vercel. Note that Vercel would build the export without `redirects()`, so legacy paths would 404 there.
- **Limits:** static assets allow 2,000 static redirects (`cloudflare-routing.mjs` fails the build above that) and 25 MiB per file.
