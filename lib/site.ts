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
      "Explore BladeVault collection management, filtering, comparison, cloud backups, dark mode, pinned items, brand browsing, and automatic synchronization.",
    path: "/overview.mp4",
    thumbnailPath: "/screenshots/dashboard.png",
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
    thumbnailPath: "/screenshots/dashboard.png",
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
  shortName: "BladeVault",
  defaultTitle: "BladeVault",
  description:
    "BladeVault is a local-first desktop knife collection manager for organizing, comparing, and reviewing your collection.",
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
  videoEntries,
  videoUrl,
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString()
}

export function absoluteVideoUrl(path: string) {
  return new URL(path, siteConfig.videoUrl).toString()
}
