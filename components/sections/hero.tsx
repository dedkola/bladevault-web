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
import { siteConfig } from "@/lib/site"

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
  eager?: boolean
}

function ScreenPreview({
  src,
  alt,
  title,
  meta,
  className = "",
  imageClassName = "",
  eager = false,
}: PreviewProps) {
  return (
    <article
      className={`relative flex min-w-0 flex-col overflow-hidden rounded-lg border border-[var(--bladevault-line)]/65 bg-white shadow-[0_10px_28px_rgb(46_52_23/9%)] ${className}`}
    >
      <ScreenshotLightbox
        src={src}
        alt={alt}
        title={title}
        className="relative min-h-0 w-full flex-1"
      >
        <Image
          src={src}
          alt={alt}
          fill
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 36vw, 94vw"
          className={`object-cover object-top transition-transform duration-500 group-hover/screenshot:scale-[1.018] ${imageClassName}`}
        />
      </ScreenshotLightbox>
      <div className="vault-illustration flex flex-wrap items-center justify-between gap-2 border-t border-[var(--bladevault-line)]/65 px-3 py-2 text-[var(--bladevault-olive)]">
        <span className="text-xs font-semibold">{title}</span>
        <span className="hidden text-[11px] text-muted-foreground sm:block">
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
        className="relative grid items-center gap-7 overflow-hidden py-10 sm:gap-10 sm:py-16 lg:min-h-[47rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(36rem,1.18fr)] lg:gap-[clamp(2.5rem,6vw,6rem)] lg:py-24"
      >
        <div className="pointer-events-none absolute top-[18%] -right-[12rem] -z-10 size-[37rem] rounded-full border border-[var(--bladevault-gold)]/20" />
        <div>
          <p className="vault-label">
            Local-first knife collection · {siteConfig.releaseVersion}
          </p>
          <h1 className="mt-5 max-w-[10ch] text-[clamp(3.4rem,6.2vw,6.7rem)] leading-[0.91] font-semibold tracking-[-0.065em] text-balance text-foreground">
            Your collection, kept{" "}
            <span className="text-[var(--bladevault-title)]">useful.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-lg sm:leading-8">
            A local-first home for your knife collection. Save live views, track
            care, compare models, and keep your records on hardware you control.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <a href="#install" className="vault-action vault-action-primary">
              <ArrowDownToLine className="size-4" />
              Install BladeVault
            </a>
            <a href="#workflow" className="vault-action">
              Explore the workflow
              <ArrowRight className="size-4" />
            </a>
          </div>
          <div className="mt-6 grid max-w-xl grid-cols-3 border-y border-border/65 sm:mt-10">
            {[
              ["No account", "Private by default"],
              ["Free & open", "MIT licensed"],
              ["Desktop", "Mac + Windows"],
            ].map(([title, detail], index) => (
              <div
                key={title}
                className={`py-3 pr-2 sm:px-4 sm:py-4 ${index ? "border-l border-border/55 pl-3" : ""}`}
              >
                <strong className="block text-xs text-foreground sm:text-sm">
                  {title}
                </strong>
                <span className="mt-1 block text-[11px] leading-4 text-muted-foreground">
                  {detail}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-w-0">
          <div className="vault-window overflow-hidden rounded-2xl shadow-[0_24px_65px_rgb(46_52_23/14%)]">
            <div className="vault-window-bar">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
                <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
                <span className="size-2 rounded-full border border-border bg-card" />
              </div>
              <span className="vault-label">BladeVault / Collection</span>
            </div>
            <div className="vault-grid grid grid-cols-1 gap-2 bg-muted/55 p-2 sm:min-h-[31rem] sm:grid-cols-[minmax(0,1.28fr)_minmax(13rem,0.72fr)]">
              <ScreenPreview
                src="/screenshots/collection.png"
                alt="BladeVault collection showing search, filters, sidebar navigation, and image-rich knife records"
                title="Collection"
                meta="Search · Smart views · Model families"
                className="min-h-[18rem] sm:min-h-[29.7rem]"
                eager
              />
              <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-1 sm:grid-rows-[0.86fr_1.14fr]">
                <ScreenPreview
                  src="/screenshots/compare.png"
                  alt="BladeVault comparison table with knife specifications aligned side by side"
                  title="Compare"
                  meta="Saved lists · PDF export"
                  className="min-h-[13rem]"
                />
                <ScreenPreview
                  src="/screenshots/detail.png"
                  alt="BladeVault knife detail page with image gallery and structured specifications"
                  title="Item record"
                  meta="Images · Specs · Care"
                  imageClassName="object-[38%_top]"
                  className="min-h-[13rem]"
                />
              </div>
            </div>
          </div>
          <p className="mt-3 text-right text-xs leading-5 text-muted-foreground">
            One local vault. Every working view.
          </p>
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
