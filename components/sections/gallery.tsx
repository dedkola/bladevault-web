import Image from "next/image"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"

const screenshots = [
  {
    src: "/screenshots/collection.png",
    title: "Collection",
    caption:
      "Search, filter, pin, and browse image-rich records in one focused view.",
    span: "xl:col-span-2",
  },
  {
    src: "/screenshots/detail.png",
    title: "Detail View",
    caption: "Review specs, photos, and notes without losing context.",
    span: "",
  },
  {
    src: "/screenshots/compare.png",
    title: "Compare Board",
    caption:
      "Keep multiple knives in view and scan the differences without losing the details.",
    span: "",
  },
  {
    src: "/screenshots/add.png",
    title: "Quick Add",
    caption:
      "Add a new knife from a product link or enter the details manually.",
    span: "xl:col-span-2",
  },
]

export function Gallery() {
  return (
    <section id="gallery" className="vault-shell p-6 sm:p-8 xl:p-10">
      <div className="mb-8">
        <div>
          <p className="vault-label">Gallery</p>
          <h2 className="vault-section-title">
            A closer look at BladeVault in use.
          </h2>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {screenshots.map((s) => (
          <article key={s.src} className={s.span}>
            <div className="vault-window h-full">
              <div className="vault-window-bar">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
                  <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
                </div>
                <span className="vault-label">{s.title}</span>
              </div>
              <ScreenshotLightbox src={s.src} alt={`${s.title} screenshot`}>
                <Image
                  src={s.src}
                  width={1440}
                  height={900}
                  alt={s.title}
                  loading="lazy"
                  className="w-full border-b border-border/70"
                />
              </ScreenshotLightbox>
              <div className="p-4">
                <h3 className="text-base font-semibold text-foreground">
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
