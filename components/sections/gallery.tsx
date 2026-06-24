import Image from "next/image"

const screenshots = [
  {
    src: "/screenshots/dashboard.png",
    caption: "Dashboard — recently added knives at a glance",
  },
  {
    src: "/screenshots/detail.png",
    caption: "Knife Detail — specs, description, and image gallery",
  },
  {
    src: "/screenshots/collection.png",
    caption: "Collection Library — browse and filter your entire inventory",
  },
]

export function Gallery() {
  return (
    <section className="border-t border-border/40">
      <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-3 gap-6">
          {screenshots.map((s) => (
            <div key={s.src} className="flex flex-col gap-3">
              <Image
                src={s.src}
                width={1440}
                height={900}
                alt={s.caption}
                loading="lazy"
                className="rounded-lg border border-border/60 shadow-sm"
              />
              <p className="text-sm text-muted-foreground">{s.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}