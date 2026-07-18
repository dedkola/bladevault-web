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
      <div className="grid gap-7 px-6 py-7 sm:px-8 sm:py-9 xl:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] xl:items-center xl:px-10">
        <div>
          <p className="vault-label">Overview Video</p>
          <h2 className="vault-section-title">
            BladeVault Overview and Main Features
          </h2>
          <p className="vault-section-copy">
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
            className="vault-action mt-6"
          >
            <PlayCircle className="size-4 text-[var(--bladevault-title)]" />
            Watch on YouTube
            <ArrowUpRight className="size-4 text-[var(--bladevault-title)]" />
          </a>
        </div>

        <div className="vault-window">
          <div className="vault-window-bar">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
              <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
              <span className="size-2 rounded-full border border-border bg-card" />
            </div>
            <span className="vault-label">Guided Walkthrough</span>
          </div>

          <div className="relative aspect-video">
            <video
              controls
              preload="metadata"
              playsInline
              poster="/screenshots/dashboard.png"
              className="bladevault-video absolute inset-0 h-full w-full bg-black"
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
    </section>
  )
}
