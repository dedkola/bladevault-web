const FALLBACK_SITE_URL = "http://localhost:3000"
const FALLBACK_VIDEO_URL = "https://video.bladevault.pro"

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return FALLBACK_SITE_URL
  }

  const candidate = value.startsWith("http") ? value : `https://${value}`

  try {
    const url = new URL(candidate)
    return url.toString().replace(/\/$/, "")
  } catch {
    return FALLBACK_SITE_URL
  }
}

// Set NEXT_PUBLIC_SITE_URL in production so canonical tags, sitemap entries,
// robots.txt, and schema all resolve to the live domain instead of localhost.
const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
const videoUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_VIDEO_URL ?? FALLBACK_VIDEO_URL
)

export const siteConfig = {
  name: "BladeVault",
  shortName: "BladeVault",
  defaultTitle: "BladeVault",
  description:
    "BladeVault is a local-first desktop knife collection manager for organizing, comparing, and reviewing your collection.",
  category: "software",
  locale: "en_US",
  url: siteUrl,
  githubUrl: "https://github.com/kolasokol/bladevault",
  releasesUrl: "https://github.com/kolasokol/bladevault/releases/latest",
  macDownloadUrl:
    "https://github.com/kolasokol/bladevault/releases/latest/download/BladeVault.dmg",
  windowsDownloadUrl:
    "https://github.com/kolasokol/bladevault/releases/latest/download/BladeVault.exe",
  keywords: [
    "knife collection manager",
    "local-first collection manager",
    "desktop knife inventory app",
    "knife comparison software",
    "collector software",
    "BladeVault",
  ],
  screenshotPaths: [
    "/screenshots/dashboard.png",
    "/screenshots/detail.png",
    "/screenshots/compare.png",
    "/screenshots/add.png",
  ],
  featureList: [
    "Local-first storage for private collections",
    "Side-by-side knife comparison views",
    "Quick add flows with URL importing",
    "Desktop dashboards for collectors",
  ],
  videoUrl,
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

export function absoluteVideoUrl(path: string) {
  return new URL(path, siteConfig.videoUrl).toString()
}
