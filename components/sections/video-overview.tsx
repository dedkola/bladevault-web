import { ArrowUpRight, PlayCircle } from "lucide-react"

import { absoluteVideoUrl } from "@/lib/site"

const overviewHighlights = [
  "Collection management",
  "Advanced filtering",
  "Knife comparison",
  "Cloud backups",
  "Dark mode",
  "Pinned items",
  "Brand browsing",
  "Automatic synchronization",
]

export function VideoOverview() {
  return (
    <section id="video-overview" className="vault-shell overflow-hidden">
      <div className="vault-grid relative overflow-hidden px-6 py-6 sm:px-8 sm:py-8 xl:px-10 xl:py-10">
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-[rgb(200_156_61_/_0.1)] via-transparent to-transparent" />
        <div className="absolute -top-10 right-10 h-28 w-28 rounded-full bg-[rgb(200_156_61_/_0.1)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-[rgb(46_52_23_/_0.06)] blur-3xl" />

        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-center">
          <div>
            <p className="vault-label">Overview Video</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              BladeVault Overview and Main Features
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
              Explore the main features of BladeVault, including collection
              management, advanced filtering, knife comparison, cloud backups,
              dark mode, pinned items, brand browsing, and automatic
              synchronization.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {overviewHighlights.map((highlight) => (
                <span key={highlight} className="vault-chip">
                  {highlight}
                </span>
              ))}
            </div>

            <a
              href="https://www.youtube.com/watch?v=yurbpv0JY80"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-border/70 bg-card/92 px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <PlayCircle className="size-4 text-[var(--bladevault-title)]" />
              Watch on YouTube
              <ArrowUpRight className="size-4 text-[var(--bladevault-title)]" />
            </a>
          </div>

          <div className="vault-panel overflow-hidden p-3 sm:p-4">
            <div className="overflow-hidden rounded-[1.6rem] border border-border/70 bg-[#f5efdf]">
              <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[var(--bladevault-olive)]" />
                  <span className="size-2.5 rounded-full bg-[var(--bladevault-gold)]" />
                  <span className="size-2.5 rounded-full bg-[var(--bladevault-line)]" />
                </div>
                <span className="vault-label">Guided Walkthrough</span>
              </div>

              <div className="relative aspect-video">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  poster="/screenshots/dashboard.png"
                  className="absolute inset-0 h-full w-full bg-black object-cover"
                >
                  <source
                    src={absoluteVideoUrl("/overview.mp4")}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
