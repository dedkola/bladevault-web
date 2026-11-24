import {
  Heart,
  Inbox,
  Sparkles,
  TrendingDown,
  Trophy,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { releaseAnchor } from "@/lib/navigation"

// The six background features on the homepage rail. Each one opens a tour
// popup on the homepage and has its own page at /features/<slug>. Copy stays
// within what the release notes and docs say the app does.

export type FeatureTone =
  "wishlist" | "drop" | "inbox" | "ai" | "care" | "achievements"

export type FeatureStep = {
  title: string
  body: string
}

export type FeatureDetail = {
  value: string
  label: string
}

export type Feature = {
  slug: string
  tone: FeatureTone
  icon: LucideIcon
  tag: string
  isNew?: boolean
  title: string
  /** Short copy on the homepage card. */
  detail: string
  cta: string
  stats?: [label: string, value: string][]
  visual?: "spark" | "bars"
  /** One-line promise at the top of the tour. */
  promise: string
  /** Longer intro paragraph for the tour and the page description. */
  intro: string
  /** Release that introduced or last reshaped the feature. */
  since: string
  /** Path shown in the mock window bar. */
  windowPath: string
  steps: FeatureStep[]
  details: FeatureDetail[]
  docsHref?: string
}

export const features: readonly Feature[] = [
  {
    slug: "wishlist",
    tone: "wishlist",
    icon: Heart,
    tag: "New",
    isNew: true,
    title: "Wishlist",
    detail:
      "Grouped by deal, with price vs regular, a 90-day range and a 30-day trend. Open any knife straight in Market or Price Drops.",
    cta: "See the deals",
    stats: [
      ["Watching", "38"],
      ["On sale", "12"],
      ["Off today", "$639"],
    ],
    promise: "Know which knife on your list is actually a deal today.",
    intro:
      "The Wishlist is the list of knives you plan to buy, sorted by how good the price is right now. Every row shows today's best price against the regular price, where it sits in its 90-day range, and which way it moved over 30 days. Price Drops watches the list by default.",
    since: "v2.5.20",
    windowPath: "Wishlist",
    steps: [
      {
        title: "Add what you want",
        body: "One Add to wishlist button in the header, or select knives in the Collection and send them over in one step.",
      },
      {
        title: "Grouped by deal",
        body: "Knives land in Best deals, On sale or Watching, so the ones below regular price float to the top.",
      },
      {
        title: "Price in context",
        body: "Each row shows price vs regular, the 90-day low-to-high range and a 30-day trend, so a sale reads at a glance.",
      },
      {
        title: "Jump to the market",
        body: "Click a knife to open its Market tab, or the price button to open its details on Price Drops.",
      },
    ],
    details: [
      { value: "90 days", label: "Price range per knife" },
      { value: "30 days", label: "Trend line per knife" },
      { value: "1 click", label: "To Market or Price Drops" },
      { value: "Start page", label: "Open BladeVault on the Wishlist" },
    ],
  },
  {
    slug: "price-drops",
    tone: "drop",
    icon: TrendingDown,
    tag: "New",
    isNew: true,
    title: "Price Drops",
    detail:
      "Brand sites plus Blade HQ, SMKW, DLT Trading, KnifeJoy and Northwest Knives, one chart line per store, cheapest store named.",
    cta: "Watch a knife",
    visual: "spark",
    promise: "Every store that sells your knife, on one chart.",
    intro:
      "Price Drops checks the stores that sell the knives you monitor and records every price and stock change. It checks gently, one product at a time per store, and other stores are searched for listings you did not add yourself.",
    since: "v2.5.21",
    windowPath: "Price Drops",
    steps: [
      {
        title: "Monitor a knife",
        body: "Knives with a product link are checked in the background on a schedule you choose. Each store gets its own pace.",
      },
      {
        title: "Other stores join in",
        body: "Blade HQ, SMKW, DLT Trading, KnifeJoy and Northwest Knives are searched for the same knife, again every day until found.",
      },
      {
        title: "One line per store",
        body: "The price chart draws a line for each store and names the cheapest one in stock right now.",
      },
      {
        title: "Only real moves count",
        body: "A change counts once it passes your Minimum change (5% by default), so currency wobble stays off the page.",
      },
    ],
    details: [
      { value: "5+", label: "Retail stores searched" },
      { value: "5%", label: "Default minimum change" },
      { value: "1 at a time", label: "Products checked per store" },
      { value: "30 days", label: "A drop stays recent" },
    ],
    docsHref: "/docs/guides/price-drops",
  },
  {
    slug: "ai-supervisor",
    tone: "ai",
    icon: Sparkles,
    tag: "New",
    isNew: true,
    title: "AI supervisor",
    detail:
      "A price-aware shopping assistant: schedules the checks, retries pages and writes the daily summary.",
    cta: "Observe or act",
    visual: "bars",
    promise: "An assistant that looks over price monitoring for you.",
    intro:
      "With AI connected, the supervisor looks over all of price monitoring when something changes and decides what needs attention. In Observe it only records its plan. In Act it moves checks forward, retries failing pages, cross-checks stores and leaves advice in the Inbox, always within fixed limits.",
    since: "v2.5.10",
    windowPath: "Price Drops / Supervisor",
    steps: [
      {
        title: "Something changes",
        body: "A drop, a restock, a page failing a few checks in a row or a bot check starts a run. Bursts are batched into one.",
      },
      {
        title: "It reads the market",
        body: "Regular and target prices, the best price now, 90-day lows and every store's pace. It never sees links, notes or keys.",
      },
      {
        title: "It acts within limits",
        body: "Check a knife first, retry a page with AI, watch a knife closely for up to 72 hours, or cross-check other stores.",
      },
      {
        title: "It tells you why",
        body: "Deal and restock advice or a quick yes/no question lands in the Inbox, plus an optional daily summary.",
      },
    ],
    details: [
      { value: "Observe · Act", label: "Two modes, off by default" },
      { value: "≤ 6", label: "Advice notes a day" },
      { value: "72 h", label: "Longest close watch" },
      { value: "30", label: "Short notes it remembers" },
    ],
    docsHref: "/docs/guides/price-drops#let-ai-supervise-monitoring",
  },
  {
    slug: "inbox",
    tone: "inbox",
    icon: Inbox,
    tag: "New",
    isNew: true,
    title: "Inbox & alerts",
    detail:
      "Price, care and system messages in one list, with a minimum change so small moves stay quiet.",
    cta: "Open the Inbox",
    stats: [
      ["Price", "2"],
      ["Maintenance", "1"],
      ["System", "1"],
    ],
    promise: "One place for everything that needs you.",
    intro:
      "Price drops and restocks, care that is due, failed backups and the supervisor's notes all arrive in one Inbox behind the bell in the header. Tabs split it by kind, and alert thresholds keep small price moves from making noise.",
    since: "v2.5.1",
    windowPath: "Inbox",
    steps: [
      {
        title: "Messages arrive",
        body: "Each price message shows the knife, the store, old and new price and the change in money and percent.",
      },
      {
        title: "Sort by kind",
        body: "All, Prices, Maintenance and System tabs, with Mark all read and Dismiss all for price messages.",
      },
      {
        title: "Small moves stay quiet",
        body: "A change notifies only past your Minimum change and Minimum amount, or when it hits your target price.",
      },
      {
        title: "Act from the message",
        body: "Open the knife in Market, log the care that is due, or pass a store's bot check with Solve in browser.",
      },
    ],
    details: [
      { value: "4 tabs", label: "All · Prices · Maintenance · System" },
      { value: "5%", label: "Default minimum change" },
      { value: "Target", label: "Notify at your price" },
      { value: "Desktop", label: "Optional system notifications" },
    ],
    docsHref: "/docs/guides/price-drops#get-notified-in-the-inbox",
  },
  {
    slug: "maintenance",
    tone: "care",
    icon: Wrench,
    tag: "2.5",
    title: "Maintenance",
    detail:
      "Care reminders per knife, a Coming up timeline you can reschedule, and a care history.",
    cta: "Plan care",
    stats: [
      ["Overdue", "1"],
      ["Due soon", "2"],
      ["Up to date", "21"],
    ],
    promise: "Sharpen, clean and lube on time, without a spreadsheet.",
    intro:
      "Maintenance has its own page in the sidebar. It shows which knives are due for sharpening, cleaning or lubrication, a Coming up timeline you can reschedule, and a Care history of every session per knife.",
    since: "v2.5.0",
    windowPath: "Maintenance",
    steps: [
      {
        title: "Set a care rhythm",
        body: "Reminders per knife for sharpening, cleaning and lubrication. Knives that need care are flagged in the collection.",
      },
      {
        title: "See what is coming",
        body: "The Coming up timeline names every knife that is due or overdue, with a color legend.",
      },
      {
        title: "Reschedule in a click",
        body: "Push care to tomorrow, next week or next month, pick an exact date, or skip it.",
      },
      {
        title: "Keep the history",
        body: "Log a quick entry or full sharpening details. Care history shows every session per knife.",
      },
    ],
    details: [
      { value: "3 kinds", label: "Sharpen · Clean · Lube" },
      { value: "Inbox", label: "Tells you when care is due" },
      { value: "Care log", label: "Searchable, per session" },
      { value: "Insights", label: "Care status dashboard" },
    ],
    docsHref: "/docs/guides/log-maintenance",
  },
  {
    slug: "achievements",
    tone: "achievements",
    icon: Trophy,
    tag: "New",
    isNew: true,
    title: "Achievements",
    detail:
      "100 badges in four tiers, a trophy case on Insights, and a rank from Rookie to Jedi Collector.",
    cta: "Open the trophy case",
    stats: [
      ["Gold", "12"],
      ["Platinum", "3"],
      ["Rank", "Collector"],
    ],
    promise: "Your collection, scored. Quietly, if you like.",
    intro:
      "BladeVault awards badges as the collection grows: your 100th knife, new makers, steels and countries, care habits, complete records and lucky finds on Price Drops. Points from each tier add up to a collector rank.",
    since: "v2.5.10",
    windowPath: "Insights / Trophy case",
    steps: [
      {
        title: "Collect as usual",
        body: "Milestones, makers, steels, countries, care habits and complete records all count. Badges already met are added quietly.",
      },
      {
        title: "Unlock a badge",
        body: "A message slides in with the tier and points. Gold and Platinum add a short burst of confetti.",
      },
      {
        title: "Climb the ranks",
        body: "Bronze 10, Silver 25, Gold 50, Platinum 100 points. Your score sets a rank from Rookie to Jedi Collector.",
      },
      {
        title: "Share the card",
        body: "The Trophy case on Insights shows the closest badges. Share card saves your rank with no knives or prices.",
      },
    ],
    details: [
      { value: "100", label: "Badges in four tiers" },
      { value: "7", label: "Secret badges" },
      { value: "Permanent", label: "Selling a knife keeps them" },
      { value: "MCP", label: "get_achievements for AI" },
    ],
    docsHref: "/docs/guides/achievements",
  },
]

export const featureSlugs = features.map((feature) => feature.slug)

export function getFeature(slug: string) {
  return features.find((feature) => feature.slug === slug) ?? null
}

export function featureHref(slug: string) {
  return `/features/${slug}`
}

export function featureReleaseHref(feature: Feature) {
  return `/whats-new#${releaseAnchor(feature.since)}`
}

export const featureHashPrefix = "feature-"
