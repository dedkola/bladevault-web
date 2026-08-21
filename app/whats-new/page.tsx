import type { Metadata } from "next"
import Link from "next/link"

import { PromoSidebar } from "@/components/site/promo-sidebar"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const pageTitle = "What’s new in BladeVault"
const pageDescription =
  "BladeVault release notes, including MCP support for talking to your knife collection with Claude, Codex, Cursor, LM Studio, and local AI models."

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/whats-new",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/whats-new",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
}

const releases = [
  {
    version: "v1.0.4",
    date: "2026-08-21",
    changes: [
      "Local and cloud restores now clear stale SQLite sidecar files while preserving them in the safety backup, making recovery more reliable.",
    ],
  },
  {
    version: "v1.0.3",
    date: "2026-08-20",
    major: true,
    changes: [
      "Talk to your existing collection from MCP clients such as Claude Desktop, Codex, Cursor, or local models in LM Studio—without a separate database or cloud account.",
      "Eight purpose-built tools can search records, retrieve full knife details, summarize the collection, and find missing fields or likely duplicates.",
      "AI can preview suggested metadata changes before applying them. Write access is off by default, timestamp-checked, and recorded in an audit log.",
      "Settings now includes an AI / MCP workspace for connection setup, access controls, and recent activity, with dedicated connection paths for Docker, source installs, and the macOS app.",
    ],
  },
  {
    version: "v1.0.0",
    date: "2026-08-13",
    major: true,
    milestone: true,
    changes: [
      "Collection Insights is now the home view, with interactive summaries for makers, blade dimensions, steels, profiles, lock types, designers, and collection completeness.",
      "Select a chart segment to see the matching knives and continue into the filtered collection.",
      "A 12-month activity heat map tracks additions and edits and stays current as the collection changes.",
      "Knife images now stream from disk for more efficient browsing in image-heavy collections.",
    ],
  },
  {
    version: "v0.2.50",
    date: "2026-08-12",
    changes: [
      "Pin or unpin multiple knives at once from collection selection mode.",
      "Press Escape to clear active collection filters without interrupting open dialogs or menus.",
      "Image-count badges now appear on collection cards and item details.",
      "Collection filters calculate more efficiently for smoother browsing.",
    ],
  },
  {
    version: "v0.2.49",
    date: "2026-08-08",
    changes: [
      "Compare search results now include thumbnails, making similar models easier to identify.",
    ],
  },
  {
    version: "v0.2.47",
    date: "2026-08-08",
    changes: [
      "Search the collection when adding several knives to Compare, with model-name matching that avoids irrelevant specification hits.",
    ],
  },
  {
    version: "v0.2.46",
    date: "2026-08-07",
    changes: [
      "Compare view row removal controls are now reachable with the keyboard.",
      "Search clear button shows a visible focus indicator for keyboard navigation.",
      "Compare rows no longer display an unwanted white shadow.",
      "Development Container setup uses a persistent home directory and builds native dependencies reliably.",
    ],
  },
  {
    version: "v0.2.45",
    date: "2026-08-05",
    changes: ["Routine dependency updates and CI hardening."],
  },
  {
    version: "v0.2.44",
    date: "2026-08-03",
    changes: [
      "Filter menus and sidebar disclosures are easier to navigate with a keyboard.",
      "Collection and compare views load custom fields more efficiently.",
      "Knife form and image-library controls are fully keyboard accessible.",
      "Specification sections on item detail pages are reorganized for clearer scanning.",
    ],
  },
  {
    version: "v0.2.43",
    date: "2026-08-02",
    changes: [
      "The default search field is hidden until needed for a cleaner collection view.",
      "Cloud backup reliability is improved with safer database checkpoint handling.",
    ],
  },
  {
    version: "v0.2.42",
    date: "2026-07-31",
    major: true,
    changes: [
      "BladeVault can now be installed on Kubernetes via an official Helm chart.",
      "Helm chart documentation and lifecycle commands are published to GitHub Pages.",
      "Fullscreen image viewer and collection filter-chip focus were polished.",
    ],
  },
  {
    version: "v0.2.41",
    date: "2026-07-27",
    changes: [
      "Docker builds are more reliable after fixing native dependency compilation.",
      "Transitive security dependencies were updated.",
    ],
  },
  {
    version: "v0.2.40",
    date: "2026-07-26",
    changes: [
      "Dashboard charts resize more reliably on smaller screens.",
      "Gallery controls hide when only one image is present.",
      "Fullscreen gallery navigation now works with the keyboard.",
    ],
  },
  {
    version: "v0.2.39",
    date: "2026-07-22",
    major: true,
    changes: [
      "Upload several images at once with the file picker, drag and drop, or clipboard paste.",
      "Collection, compare, card, gallery, and settings controls now adapt more cleanly to small screens.",
      "Item detail pages show a structured loading state while their content is prepared.",
    ],
  },
  {
    version: "v0.2.37",
    date: "2026-07-21",
    changes: [
      "Empty compare views now offer direct next steps instead of leaving you at a dead end.",
      "Backup controls and manual-add form actions are clearer and easier to reach.",
    ],
  },
  {
    version: "v0.2.36",
    date: "2026-07-20",
    changes: [
      "Choose which knife details appear on collection cards from Settings.",
      "Cloud restore progress stays visible on the tab where the restore was started.",
    ],
  },
  {
    version: "v0.2.35",
    date: "2026-07-20",
    major: true,
    changes: [
      "Select multiple knives and update their shared fields in one bulk edit.",
      "Cloud backup setup, status, and controls are easier to understand.",
      "The dashboard links directly to the newest collection entry.",
    ],
  },
  {
    version: "v0.2.34",
    date: "2026-07-20",
    changes: [
      "Newly added comparison items appear first.",
      "Important comparison columns stay visible while scrolling.",
      "An empty collection now offers direct add and import actions.",
    ],
  },
  {
    version: "v0.2.33",
    date: "2026-07-19",
    changes: [
      "Large collections open faster with progressive card loading and earlier loading of the first image.",
    ],
  },
  {
    version: "v0.2.29",
    date: "2026-07-18",
    changes: [
      "Windows updates can download and install through the app with a more reliable, verified update flow.",
    ],
  },
  {
    version: "v0.2.28",
    date: "2026-07-18",
    changes: [
      "BladeVault warns before you leave a form with unsaved changes.",
      "Pinned knives stay at the top of collection views for quicker access.",
    ],
  },
  {
    version: "v0.2.23",
    date: "2026-07-16",
    major: true,
    changes: [
      "Create reusable custom text, number, and date fields for the details unique to your collection.",
      "Custom fields work across add, edit, detail, collection, and compare views.",
      "Knife forms and detail pages use clearer, more consistent sections.",
    ],
  },
  {
    version: "v0.2.22",
    date: "2026-07-16",
    major: true,
    changes: [
      "The dashboard gained collection insights for recent additions, makers, and acquisition activity.",
      "Filters, brand navigation, and comparison actions were streamlined.",
    ],
  },
  {
    version: "v0.2.21",
    date: "2026-07-16",
    major: true,
    changes: [
      "BladeVault became available as an Unraid Community Applications template.",
    ],
  },
  {
    version: "v0.2.19",
    date: "2026-07-14",
    major: true,
    changes: [
      "Settings moved to a dedicated page with a clearer layout.",
      "Desktop update status and controls became available inside BladeVault.",
      "Product imports gained better brand detection, name cleanup, price, and last-updated details.",
    ],
  },
  {
    version: "v0.2.18",
    date: "2026-07-13",
    major: true,
    changes: [
      "Choose and move the local data folder from Settings.",
      "Product import can open an interactive browser when a retailer blocks the normal importer.",
      "Desktop context menus add quick editing and navigation actions.",
      "Search responds faster, themes persist, and printed comparisons clean up more reliably.",
    ],
  },
  {
    version: "v0.2.12",
    date: "2026-07-08",
    changes: [
      "The macOS installer gained a guided launch helper for a smoother first run.",
    ],
  },
  {
    version: "v0.2.9",
    date: "2026-07-06",
    changes: [
      "Automatic cloud backup now runs after collection changes, keeping backups current without an hourly timer.",
    ],
  },
  {
    version: "v0.2.6",
    date: "2026-07-05",
    changes: [
      "Filters gained Select All, while brand and compare links show useful item counts.",
      "Settings now shows where local data is stored, including Docker host paths when available.",
    ],
  },
  {
    version: "v0.2.3",
    date: "2026-06-30",
    major: true,
    changes: [
      "macOS desktop releases gained code signing and notarization support.",
    ],
  },
  {
    version: "v0.2.2",
    date: "2026-06-30",
    major: true,
    changes: [
      "BladeVault launched as a native desktop app for macOS and Windows.",
      "Desktop builds keep the local-first web experience while managing their own server and data location.",
    ],
  },
] as const

const releaseBaseUrl = "https://github.com/dedkola/bladevault/releases/tag/"

export default function WhatsNewPage() {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-4">
      <div className="grid min-w-0 gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <PromoSidebar />

        <section className="vault-shell min-w-0 overflow-hidden">
          <header className="vault-grid border-b border-border/70 px-6 py-10 sm:px-8 sm:py-12 xl:px-10">
            <p className="vault-label">Release notes</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-[var(--bladevault-title)] sm:text-4xl">
              What’s new in BladeVault
            </h1>
          </header>

          <div className="p-4 sm:p-6 xl:p-8">
            <div className="grid items-start gap-4">
              {releases.map((release) => {
                const isMajor = "major" in release && release.major
                const isMilestone = "milestone" in release && release.milestone
                return (
                  <article
                    key={release.version}
                    className={cn(
                      "vault-panel p-5 sm:p-6",
                      isMajor && "bg-[var(--bladevault-gold)]/[0.03]",
                      isMilestone &&
                        "relative overflow-hidden border-[var(--bladevault-gold)]/60 bg-[linear-gradient(135deg,var(--card)_0%,color-mix(in_srgb,var(--bladevault-gold)_8%,var(--card))_100%)] p-6 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-[var(--bladevault-gold)] sm:p-8"
                    )}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2
                        className={cn(
                          "flex flex-wrap items-center gap-2.5 font-semibold tracking-tight text-foreground",
                          isMilestone ? "text-2xl sm:text-3xl" : "text-lg"
                        )}
                      >
                        <Link
                          href={`${releaseBaseUrl}${release.version}`}
                          className="transition-colors hover:text-[var(--bladevault-title)] focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none"
                        >
                          {release.version}
                        </Link>
                        {isMajor && (
                          <span className="vault-chip">
                            {isMilestone ? "Major release" : "Major update"}
                          </span>
                        )}
                      </h2>
                      <time
                        dateTime={release.date}
                        className="shrink-0 font-mono text-xs text-muted-foreground"
                      >
                        {release.date}
                      </time>
                    </div>
                    <ul
                      className={cn(
                        "mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted-foreground marker:text-[var(--bladevault-gold)]",
                        isMilestone && "mt-5 sm:text-[15px] sm:leading-7"
                      )}
                    >
                      {release.changes.map((change) => (
                        <li key={change} className="pl-1">
                          {change}
                        </li>
                      ))}
                    </ul>
                  </article>
                )
              })}
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Looking for every technical change and fix?
              </p>
              <Link
                href="https://github.com/dedkola/bladevault/releases"
                className="vault-action"
              >
                View all GitHub releases
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
