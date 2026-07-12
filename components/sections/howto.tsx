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
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Workflows that keep collecting simple.
          </h2>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {workflows.map((workflow) => (
          <article
            key={workflow.title}
            className="vault-panel overflow-hidden p-3"
          >
            <div className="overflow-hidden rounded-[1.25rem] border border-border/70 bg-[#f5efdf]">
              <div className="flex items-center justify-between gap-3 border-b border-border/60 px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-[var(--bladevault-olive)]" />
                  <span className="size-2.5 rounded-full bg-[var(--bladevault-gold)]" />
                  <span className="size-2.5 rounded-full bg-[var(--bladevault-line)]" />
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
            <div className="px-2 pt-4 pb-2">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-background/90 text-[var(--bladevault-title)]">
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
