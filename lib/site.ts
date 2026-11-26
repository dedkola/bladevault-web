import { latestRelease } from "@/lib/releases"

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
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL,
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
  releaseVersion: latestRelease.version,
  shortName: "BladeVault",
  defaultTitle: "BladeVault",
  description:
    "BladeVault is a local-first knife collection manager with an AI Chat that answers questions about your own collection, a Wishlist grouped by deal and price vs regular, automatic product-page scraping, Studio, Collection pulse, dated Markdown notes, care reminders, a collection activity map, AI access through MCP for Claude, Codex, and other clients, optional audited writes, app lock, native desktop apps for macOS, Windows, and Linux, and self-hosted browser access on iPad and iPhone.",
  category: "software",
  locale: "en_US",
  url: siteUrl,
  githubUrl: "https://github.com/dedkola/bladevault",
  releasesUrl: "https://github.com/dedkola/bladevault/releases/latest",
  macDownloadUrl:
    "https://github.com/dedkola/bladevault/releases/latest/download/BladeVault.dmg",
  windowsDownloadUrl:
    "https://github.com/dedkola/bladevault/releases/latest/download/BladeVault-Setup.exe",
  linuxAppImageUrl:
    "https://github.com/dedkola/bladevault/releases/latest/download/BladeVault.AppImage",
  linuxDebUrl:
    "https://github.com/dedkola/bladevault/releases/latest/download/BladeVault.deb",
  linuxInstallGuidePath: "/docs/installation/desktop#linux",
  keywords: [
    "knife collection manager",
    "local-first collection manager",
    "desktop knife inventory app",
    "knife collection visual library",
    "knife collection analytics",
    "customizable collection table",
    "knife comparison software",
    "knife wishlist app",
    "knife price tracker",
    "market price tracking",
    "AI knife collection",
    "AI chat knife collection",
    "ask AI about my collection",
    "MCP collection manager",
    "product page scraper",
    "responsive knife collection",
    "collector software",
    "BladeVault",
  ],
  screenshotPaths: [
    "/screenshots/live/studio-desktop.jpg",
    "/screenshots/live/collection-desktop.jpg",
    "/screenshots/live/studio-ipad.jpg",
    "/screenshots/live/studio-iphone.jpg",
    "/screenshots/live/add-result-3x.jpg",
    "/screenshots/live/add-result-crop-3x.jpg",
    "/screenshots/live/insights-activity.jpg",
    "/screenshots/live/knife-notes.jpg",
  ],
  featureList: [
    "AI Chat that answers questions about your collection, prices, and care with knife cards and price tables, using any OpenAI-compatible or local model",
    "Model and reasoning level (Off, Low, Medium, High) chosen per chat",
    "Wishlist grouped by deal, with price vs regular, a 90-day range, and a 30-day trend",
    "Automatic product-page scraping with editable specs and image review",
    "Saved-page import and a BladeVault browser for bot-protected product pages",
    "Dated personal notes with Markdown formatting and photos on every knife",
    "Calendar activity map for additions, edits, and maintenance",
    "Metric, imperial, or dual measurement display",
    "Studio visual library with Knife of the day, focus mode, quick look, and a split-flap showcase mode",
    "Collection pulse analytics with drill-down links and print",
    "Twelve theme styles: Shelf, Ledger, Atrium, Forge, Titanium, Field, Lumen, Espresso, Phosphor, Classic, Modern, and Alloy",
    "Tabbed knife inspector with Overview, Specifications, and a linked History timeline",
    "Customizable collection columns with remembered order and widths",
    "Bulk selection directly in the modern collection table",
    "Persistent start page for Insights, Studio, or Collection",
    "Saved Smart Collections with live result counts",
    "Grouped model families with distinct variant records",
    "Care reminders for sharpening, cleaning, and lubrication with an Inbox and a Maintenance page",
    "Price Drops monitoring for the Wishlist, selected knives, or the whole collection, with restocks, price history, alert rules, super-sale alerts for the rest of the collection, and an optional AI supervisor",
    "Market prices in the collection, with filtering and price history",
    "100 achievement badges in four tiers, with collector ranks and a trophy case on Insights",
    "History timeline with photos, milestones, and a Year in review",
    "Multiple named comparison lists and PDF exports",
    "Source-page screenshots saved with URL imports",
    "Optional local app password lock",
    "Local-first storage, local ZIP and automatic Google Drive backups, and MCP access",
    "21 MCP tools, read-only by default, with opt-in audited writes, adding knives with photos, and copy-ready Claude Code and Claude Desktop setup",
    "Native desktop apps for macOS, Windows, and Linux (AppImage and Debian)",
    "Self-hosted browser access on iPad and iPhone with Docker or Helm",
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
