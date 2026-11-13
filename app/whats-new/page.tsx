import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"
import { ReleaseContents } from "@/components/site/release-contents"
import { releaseAnchor } from "@/lib/navigation"
import { latestRelease, releases } from "@/lib/releases"
import { cn } from "@/lib/utils"

export const dynamic = "force-static"

const pageTitle = "What’s new in BladeVault"
const pageDescription =
  "BladeVault release notes, including the Modern appearance and theme options, Atrium gallery style, Studio visual library and showcase mode, customizable collection columns, a choice of start page, Collection pulse insights, automatic Google Drive backups, app lock, Smart Collections, maintenance, and MCP support."

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

const releaseBaseUrl = "https://github.com/dedkola/bladevault/releases/tag/"
const releaseLinks = releases.map(({ version, date }) => ({ version, date }))

const v2Highlights = [
  {
    label: "Studio",
    detail: "A visual library for the whole vault",
    src: "/screenshots/studio.jpg",
    alt: "Studio visual library with a randomised gallery of knife photographs",
  },
  {
    label: "Collection pulse",
    detail: "Growth, coverage, makers, and steels",
    src: "/screenshots/collection-pulse.jpg",
    alt: "Collection pulse dashboard with catalogue growth and collection coverage",
  },
  {
    label: "Modern workspace",
    detail: "A quieter table with a docked inspector",
    src: "/screenshots/collection-modern.jpg",
    alt: "Modern Collection table with a docked knife inspector and shared header search",
  },
  {
    label: "Theme options",
    detail: "Current, Modern, and more to come",
    src: "/screenshots/theme-options.jpg",
    alt: "Settings appearance panel with Current and Modern theme choices",
  },
]

export default function WhatsNewPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6">
      <div className="grid min-w-0 gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <ReleaseContents releases={releaseLinks} />

        <section className="vault-shell min-w-0 overflow-hidden">
          <header className="vault-grid border-b border-border/70 px-6 py-10 sm:px-8 sm:py-12 xl:px-10">
            <p className="vault-label">Release notes</p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-[var(--bladevault-title)] sm:text-4xl">
              What’s new in BladeVault
            </h1>
            <ReleaseContents releases={releaseLinks} mobile />
          </header>

          <div className="p-4 sm:p-6 xl:p-8">
            <div className="grid items-start gap-4">
              {releases.map((release) => {
                const isMajor = Boolean(release.major)
                const isMilestone = Boolean(release.milestone)
                const isLatest = release === latestRelease
                return (
                  <article
                    key={release.version}
                    id={releaseAnchor(release.version)}
                    tabIndex={-1}
                    className={cn(
                      "vault-panel p-5 focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none sm:p-6",
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
                        {(isLatest || isMajor) && (
                          <span className="vault-chip">
                            {isLatest
                              ? "Latest release"
                              : isMilestone
                                ? "Major release"
                                : "Major update"}
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

                    {isMilestone && (
                      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {v2Highlights.map((highlight) => (
                          <figure
                            key={highlight.label}
                            className="overflow-hidden rounded-lg border border-border/70 bg-card"
                          >
                            <ScreenshotLightbox
                              src={highlight.src}
                              alt={highlight.alt}
                              title={highlight.label}
                              className="block w-full"
                            >
                              <Image
                                src={highlight.src}
                                alt={highlight.alt}
                                width={1800}
                                height={1125}
                                loading="lazy"
                                sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                                className="h-auto w-full object-cover object-top"
                              />
                            </ScreenshotLightbox>
                            <figcaption className="border-t border-border/60 px-3 py-2.5">
                              <span className="block text-sm font-semibold text-foreground">
                                {highlight.label}
                              </span>
                              <span className="mt-0.5 block text-[11px] leading-4 text-muted-foreground">
                                {highlight.detail}
                              </span>
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    )}
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
