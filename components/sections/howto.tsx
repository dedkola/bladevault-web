import { ArrowUpRight, PlayCircle } from "lucide-react"

import { absoluteVideoUrl } from "@/lib/site"

const workflows = [
  {
    title: "How to Add Your First Knife to BladeVault",
    description:
      "Start with your first entry and see how BladeVault handles the add flow for a growing collection.",
    videoSrc: absoluteVideoUrl("/add%20new%20item.mp4"),
    youtubeUrl: "https://www.youtube.com/watch?v=5co8rHxLZgE",
    poster: "/screenshots/add.png",
  },
  {
    title: "How to Install BladeVault on macOS",
    description:
      "Follow the macOS install process from download to first launch with the native desktop app.",
    videoSrc: absoluteVideoUrl("/macos%20install.mp4"),
    youtubeUrl: "https://www.youtube.com/watch?v=MftvtfNx570",
    poster: "/screenshots/dashboard.png",
  },
  {
    title: "How to Install BladeVault on Windows 11",
    description:
      "See the Windows 11 setup flow and get BladeVault running quickly on a desktop PC.",
    videoSrc: absoluteVideoUrl("/windows%20install.mp4"),
    youtubeUrl: "https://www.youtube.com/watch?v=AHexGVYq_yc",
    poster: "/screenshots/detail.png",
  },
]

export function HowTo() {
  return (
    <section id="workflows" className="vault-shell p-6 sm:p-8 xl:p-10">
      <div className="mb-8">
        <div>
          <p className="vault-label">Workflows</p>
          <h2 className="vault-section-title">
            Workflows that keep collecting simple.
          </h2>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {workflows.map((workflow) => (
          <article
            key={workflow.title}
            className="overflow-hidden rounded-lg border border-border/70 bg-card"
          >
            <div className="overflow-hidden border-b border-border/70 bg-card">
              <div className="vault-window-bar">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
                  <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
                  <span className="size-2 rounded-full border border-border bg-card" />
                </div>
                <span className="vault-label">Tutorial Video</span>
              </div>

              <div className="relative aspect-video">
                <video
                  controls
                  preload="metadata"
                  playsInline
                  poster={workflow.poster}
                  className="bladevault-video absolute inset-0 h-full w-full bg-black"
                >
                  <source src={workflow.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start gap-3">
                <div className="vault-icon-box mt-0.5">
                  <PlayCircle className="size-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {workflow.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {workflow.description}
                  </p>
                  <a
                    href={workflow.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-[var(--bladevault-title)] transition-opacity hover:opacity-80"
                  >
                    Watch on YouTube
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
