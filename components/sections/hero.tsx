import Image from "next/image"
import {
  ArrowRight,
  ArrowDownToLine,
  Bookmark,
  Layers3,
  LockKeyhole,
  Wrench,
} from "lucide-react"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"

const principles = [
  {
    icon: Bookmark,
    title: "Views that stay current",
    detail: "Saved filters update as the vault changes.",
  },
  {
    icon: Layers3,
    title: "Variants without clutter",
    detail: "Related models group without losing detail.",
  },
  {
    icon: Wrench,
    title: "Care with context",
    detail: "Service history belongs to the knife.",
  },
  {
    icon: LockKeyhole,
    title: "Your data, locally",
    detail: "SQLite and images stay under your control.",
  },
]

type PreviewProps = {
  src: string
  alt: string
  title: string
  meta: string
  className?: string
  imageClassName?: string
  priority?: boolean
  children?: React.ReactNode
}

function ScreenPreview({
  src,
  alt,
  title,
  meta,
  className = "",
  imageClassName = "",
  priority = false,
  children,
}: PreviewProps) {
  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-lg border border-[var(--bladevault-line)]/65 bg-white shadow-[0_10px_28px_rgb(46_52_23/9%)] ${className}`}
    >
      <ScreenshotLightbox
        src={src}
        alt={alt}
        title={title}
        className="absolute inset-0 h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 36vw, 94vw"
          className={`object-cover object-top transition-transform duration-500 group-hover/screenshot:scale-[1.018] ${imageClassName}`}
        />
      </ScreenshotLightbox>
      {children}
      <div className="pointer-events-none absolute right-2 bottom-2 left-2 z-10 flex items-center justify-between gap-2 rounded-md border border-[var(--bladevault-line)]/65 bg-[#fffefa]/90 px-3 py-2 text-[var(--bladevault-olive)] shadow-lg backdrop-blur-md">
        <span className="text-xs font-semibold">{title}</span>
        <span className="hidden font-mono text-[8px] tracking-[0.08em] text-[var(--bladevault-title)] uppercase sm:block">
          {meta}
        </span>
      </div>
    </article>
  )
}

export function Hero() {
  return (
    <>
      <section
        id="overview"
        className="relative grid items-center gap-10 overflow-hidden py-16 lg:min-h-[47rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(36rem,1.18fr)] lg:gap-[clamp(2.5rem,6vw,6rem)] lg:py-24"
      >
        <div className="pointer-events-none absolute top-[18%] -right-[12rem] -z-10 size-[37rem] rounded-full border border-[var(--bladevault-gold)]/20" />
        <div>
          <p className="vault-label">Local-first collection system · v1.1</p>
          <h1 className="mt-5 max-w-[10ch] text-[clamp(3.4rem,6.2vw,6.7rem)] leading-[0.91] font-semibold tracking-[-0.065em] text-balance text-foreground">
            Your collection, kept{" "}
            <span className="text-[var(--bladevault-title)]">useful.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Group matching model variants, save live collection views, track
            every service, compare the details, and keep the database on
            hardware you control.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#install" className="vault-action vault-action-primary">
              <ArrowDownToLine className="size-4" />
              Install BladeVault
            </a>
            <a href="#workflow" className="vault-action">
              Explore the workflow
              <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-1 border-y border-border/65 sm:grid-cols-3">
            {[
              ["No account", "Private by default"],
              ["Free & open", "MIT licensed"],
              ["Mac + Windows", "Or self-host"],
            ].map(([title, detail], index) => (
              <div
                key={title}
                className={`py-3.5 sm:px-4 sm:py-4 ${index ? "border-t border-border/55 sm:border-t-0 sm:border-l" : ""}`}
              >
                <strong className="block text-sm text-foreground">
                  {title}
                </strong>
                <span className="mt-1 block font-mono text-[9px] tracking-[0.09em] text-muted-foreground uppercase">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-w-0 pt-4">
          <div className="absolute -top-1 right-5 z-20 rounded-md border border-[var(--bladevault-line)] bg-[#f6f1e5] px-3 py-2 font-mono text-[9px] font-semibold tracking-[0.08em] text-[var(--bladevault-olive)] uppercase shadow-lg">
            Collection · Compare · Care · Insights
          </div>
          <div className="vault-window overflow-hidden rounded-2xl shadow-[0_24px_65px_rgb(46_52_23/14%)]">
            <div className="vault-window-bar">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
                <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
                <span className="size-2 rounded-full border border-border bg-card" />
              </div>
              <span className="vault-label">
                BladeVault / Working collection
              </span>
              <span className="hidden font-mono text-[9px] text-muted-foreground uppercase sm:inline">
                5 connected views
              </span>
            </div>
            <div className="vault-grid grid min-h-[31rem] grid-cols-1 gap-2 bg-[#f4f0e5]/55 p-2 sm:grid-cols-[minmax(0,1.28fr)_minmax(13rem,0.72fr)]">
              <ScreenPreview
                src="/screenshots/collection.png"
                alt="BladeVault collection showing search, filters, sidebar navigation, and image-rich knife records"
                title="Collection"
                meta="Search · Smart views · Model families"
                className="min-h-[18rem] sm:min-h-[29.7rem]"
                priority
              />
              <div className="grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-1 sm:grid-rows-[0.86fr_1.14fr]">
                <ScreenPreview
                  src="/screenshots/compare.png"
                  alt="BladeVault comparison table with knife specifications aligned side by side"
                  title="Compare"
                  meta="Any number · PDF export"
                  className="min-h-[13rem]"
                />
                <ScreenPreview
                  src="/screenshots/detail.png"
                  alt="BladeVault knife detail page with image gallery and structured specifications"
                  title="Item record"
                  meta="Images · Specs · Care"
                  imageClassName="object-[38%_top]"
                  className="min-h-[13rem]"
                >
                  <div className="pointer-events-none absolute right-2 bottom-14 left-2 z-10 rounded-md border border-[var(--bladevault-line)] bg-[#fffefa]/95 p-2 shadow-lg backdrop-blur-md">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-bold text-[var(--bladevault-olive)]">
                      <span>Maintenance</span>
                      <span className="font-mono text-[8px] text-[var(--bladevault-title)] uppercase">
                        Care history
                      </span>
                    </div>
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      <span className="rounded bg-[#f6f1e5] px-2 py-1 text-[8px] text-muted-foreground">
                        Sharpened
                        <b className="block font-mono text-[9px] text-[var(--bladevault-olive)]">
                          23 days
                        </b>
                      </span>
                      <span className="rounded bg-[#f6f1e5] px-2 py-1 text-[8px] text-muted-foreground">
                        Cleaned
                        <b className="block font-mono text-[9px] text-[var(--bladevault-olive)]">
                          Today
                        </b>
                      </span>
                    </div>
                  </div>
                </ScreenPreview>
              </div>
              <div className="pointer-events-none absolute top-16 right-4 z-10 grid grid-cols-[auto_1fr] items-center gap-2 rounded-lg border border-[var(--bladevault-line)]/65 bg-[#fffefa]/92 px-3 py-2 shadow-xl backdrop-blur-md sm:top-auto sm:right-[12rem] sm:bottom-5">
                <span className="grid size-10 place-items-center rounded-full bg-[conic-gradient(var(--bladevault-olive)_0_342deg,#e2dac3_342deg)]">
                  <span className="grid size-7 place-items-center rounded-full bg-[#fffefa] font-mono text-[10px] font-bold text-[var(--bladevault-olive)]">
                    95
                  </span>
                </span>
                <span>
                  <strong className="block text-[10px] text-[var(--bladevault-olive)]">
                    Collection insights
                  </strong>
                  <small className="block text-[8px] text-muted-foreground">
                    95% complete · 18 makers
                  </small>
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -right-1 -bottom-7 z-20 max-w-56 -rotate-1 rounded-lg border border-[var(--bladevault-line)] bg-[#f6f1e5] px-4 py-3 text-xs leading-5 font-semibold text-[var(--bladevault-olive)] shadow-xl">
            One local vault. Every working view.
          </div>
        </div>
      </section>

      <section
        aria-label="Product principles"
        className="grid border-y border-border/70 sm:grid-cols-2 lg:grid-cols-4"
      >
        {principles.map(({ icon: Icon, title, detail }, index) => (
          <div
            key={title}
            className={`px-5 py-6 ${index ? "border-t border-border/60 sm:border-t-0 sm:border-l" : ""} ${index === 2 ? "sm:border-t lg:border-t-0" : ""}`}
          >
            <Icon className="size-4 text-[var(--bladevault-title)]" />
            <strong className="mt-3 block text-sm text-foreground">
              {title}
            </strong>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              {detail}
            </span>
          </div>
        ))}
      </section>
    </>
  )
}
