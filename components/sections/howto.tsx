import Image from "next/image"
import { PlayCircle } from "lucide-react"

const workflows = [
  {
    title: "Vault tour",
    description:
      "Open on the dashboard and move through the app the way a collector actually would.",
    image: "/screenshots/dashboard.png",
    length: "01:42",
  },
  {
    title: "Quick add flow",
    description:
      "Capture a new entry with URL import or manual fields when speed matters more than ceremony.",
    image: "/screenshots/add.png",
    length: "01:18",
  },
  {
    title: "Detail and compare",
    description:
      "Drill into a single piece, then zoom back out to compare multiple items without losing momentum.",
    image: "/screenshots/detail.png",
    length: "02:05",
  },
]

export function HowTo() {
  return (
    <section id="workflows" className="vault-shell p-6 sm:p-8 xl:p-10">
      <div className="mb-8 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="vault-label">Workflows</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Workflows that keep collecting simple.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Move from overview to quick add, detail review, and side-by-side
          comparison without breaking your flow.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {workflows.map((workflow) => (
          <article
            key={workflow.title}
            className="vault-panel overflow-hidden p-3"
          >
            <div className="relative aspect-video overflow-hidden rounded-[1.25rem] border border-border/70">
              <Image
                src={workflow.image}
                width={1440}
                height={900}
                alt={workflow.title}
                className="h-full w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/14 backdrop-blur">
                    <PlayCircle className="size-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {workflow.title}
                    </p>
                  </div>
                </div>
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur">
                  {workflow.length}
                </span>
              </div>
            </div>
            <div className="px-2 pb-2 pt-4">
              <p className="text-sm leading-6 text-muted-foreground">
                {workflow.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
