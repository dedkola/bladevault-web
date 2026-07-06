import Image from "next/image"

const screenshots = [
  {
    src: "/screenshots/dashboard.png",
    title: "Dashboard",
    caption: "See totals, recent additions, and key collection activity at a glance.",
    span: "xl:col-span-2",
  },
  {
    src: "/screenshots/detail.png",
    title: "Detail View",
    caption: "Review specs, photos, and notes without losing context.",
    span: "",
  },
  {
    src: "/screenshots/collection.png",
    title: "Library",
    caption: "Browse the full vault with filters, pinned items, and clean card layouts.",
    span: "",
  },
  {
    src: "/screenshots/add.png",
    title: "Quick Add",
    caption: "Add a new knife from a product link or enter the details manually.",
    span: "xl:col-span-2",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="vault-shell p-6 sm:p-8 xl:p-10">
      <div className="mb-8 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="vault-label">Gallery</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            A closer look at BladeVault in use.
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Explore the dashboard, library, detail view, and quick add workflow.
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {screenshots.map((s) => (
          <article key={s.src} className={s.span}>
            <div className="vault-panel h-full overflow-hidden p-3">
              <Image
                src={s.src}
                width={1440}
                height={900}
                alt={s.title}
                loading="lazy"
                className="w-full rounded-[1.3rem] border border-border/70"
              />
              <div className="px-2 pb-2 pt-4">
                <h3 className="mt-2 text-lg font-medium text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {s.caption}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
