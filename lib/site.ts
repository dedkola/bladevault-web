const LOCAL_SITE_URL = "http://localhost:3000"
const DEFAULT_PRODUCTION_SITE_URL = "https://bladevault.pro"
const DEFAULT_VIDEO_URL = "https://video.bladevault.pro"

function normalizeSiteUrl(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback
  }

  const candidate = value.startsWith("http") ? value : `https://${value}`

  try {
    const url = new URL(candidate)
    return url.toString().replace(/\/$/, "")
  } catch {
    return fallback
  }
}

function resolveSiteUrl() {
  const fallback =
    process.env.NODE_ENV === "production"
      ? DEFAULT_PRODUCTION_SITE_URL
      : LOCAL_SITE_URL

  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ??
      process.env.SITE_URL ??
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
    fallback
  )
}

function resolveVideoUrl() {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_VIDEO_URL ?? process.env.VIDEO_URL,
    DEFAULT_VIDEO_URL
  )
}

const siteUrl = resolveSiteUrl()
const videoUrl = resolveVideoUrl()

const videoEntries = [
  {
    title: "BladeVault Overview and Main Features",
    description:
      "Explore BladeVault Studio, Collection pulse, the Modern workspace, collection management, comparison, maintenance, and local-first storage.",
    path: "/overview.mp4",
    thumbnailPath: "/screenshots/studio.jpg",
  },
  {
    title: "How to Add Your First Knife to BladeVault",
    description:
      "Start with your first entry and see how BladeVault handles the add flow for a growing collection.",
    path: "/add%20new%20item.mp4",
    thumbnailPath: "/screenshots/add.png",
  },
  {
    title: "How to Install BladeVault on macOS",
    description:
      "Follow the macOS install process from download to first launch with the native desktop app.",
    path: "/macos%20install.mp4",
    thumbnailPath: "/screenshots/collection.png",
  },
  {
    title: "How to Install BladeVault on Windows 11",
    description:
      "See the Windows 11 setup flow and get BladeVault running quickly on a desktop PC.",
    path: "/windows%20install.mp4",
    thumbnailPath: "/screenshots/detail.png",
  },
] as const

export const siteConfig = {
  name: "BladeVault",
  releaseVersion: "v2.0.0",
  shortName: "BladeVault",
  defaultTitle: "BladeVault",
  description:
    "BladeVault is a local-first knife collection manager with Studio, Collection pulse, a customizable workspace, Smart Collections, maintenance, comparison, and MCP access.",
  category: "software",
  locale: "en_US",
  url: siteUrl,
  githubUrl: "https://github.com/dedkola/bladevault",
  releasesUrl: "https://github.com/dedkola/bladevault/releases/latest",
  macDownloadUrl:
    "https://github.com/dedkola/bladevault/releases/latest/download/BladeVault.dmg",
  windowsDownloadUrl:
    "https://github.com/dedkola/bladevault/releases/latest/download/BladeVault-Setup.exe",
  keywords: [
    "knife collection manager",
    "local-first collection manager",
    "desktop knife inventory app",
    "knife collection visual library",
    "knife collection analytics",
    "customizable collection table",
    "knife comparison software",
    "AI knife collection",
    "MCP collection manager",
    "collector software",
    "BladeVault",
  ],
  screenshotPaths: [
    "/screenshots/studio.jpg",
    "/screenshots/collection-pulse.jpg",
    "/screenshots/collection-modern.jpg",
    "/screenshots/collection-columns.jpg",
    "/screenshots/compare-modern.jpg",
  ],
  featureList: [
    "Studio visual library with focus mode and quick look",
    "Collection pulse analytics with drill-down links and print",
    "Optional Modern appearance for Collection, Compare, and Logs",
    "Customizable collection columns with remembered order and widths",
    "Bulk selection directly in the modern collection table",
    "Persistent start page for Insights, Studio, or Collection",
    "Saved Smart Collections with live result counts",
    "Grouped model families with distinct variant records",
    "Knife maintenance history and detailed service logs",
    "Multiple named comparison lists and PDF exports",
    "Source-page screenshots saved with URL imports",
    "Optional local app password lock",
    "Local-first storage, complete backups, and MCP access",
  ],
  videoEntries,
  videoUrl,
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

export function absoluteVideoUrl(path: string) {
  return new URL(path, siteConfig.videoUrl).toString()
}
