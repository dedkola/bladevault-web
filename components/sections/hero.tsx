"use client"

import Image from "next/image"
import {
  ArrowDownToLine,
  ChartPie,
  Cloud,
  Code2,
  Monitor,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react"
import { startTransition, useState } from "react"

import { cn } from "@/lib/utils"
import { ScreenshotLightbox } from "@/components/screenshot-lightbox"

type HeroCard = {
  eyebrow: string
  title: string
  detail: string
  imageTitle: string
  stat: string
  statLabel: string
  src: string
  alt: string
  icon: LucideIcon
}

const heroCards: HeroCard[] = [
  {
    eyebrow: "Dashboard",
    title: "Collection at a glance",
    detail: "Browse recent additions, brands, totals, and pinned pieces.",
    imageTitle: "Collection dashboard",
    stat: "Local-first",
    statLabel: "Private by default",
    src: "/screenshots/dashboard.png",
    alt: "BladeVault dashboard screenshot",
    icon: ShieldCheck,
  },
  {
    eyebrow: "Detail view",
    title: "Every detail preserved",
    detail: "Keep specifications, source links, and image sets together.",
    imageTitle: "Knife detail record",
    stat: "Deep detail",
    statLabel: "One complete record",
    src: "/screenshots/detail.png",
    alt: "BladeVault knife detail screenshot",
    icon: Cloud,
  },
  {
    eyebrow: "Compare",
    title: "Differences made clear",
    detail: "Compare as many knives as you need, then print or export to PDF.",
    imageTitle: "Side-by-side comparison",
    stat: "Unlimited",
    statLabel: "Comparison columns",
    src: "/screenshots/compare.png",
    alt: "BladeVault knife comparison screenshot",
    icon: Monitor,
  },
  {
    eyebrow: "Insights",
    title: "Know your collection",
    detail: "See patterns across makers, materials, dimensions, and more.",
    imageTitle: "Collection insights",
    stat: "Live insights",
    statLabel: "Built from your collection",
    src: "/screenshots/insights.png",
    alt: "BladeVault collection insights screenshot",
    icon: ChartPie,
  },
]

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [loadedIndices, setLoadedIndices] = useState(() => new Set([0]))
  const activeCard = heroCards[activeIndex]

  function activateCard(index: number) {
    startTransition(() => {
      setActiveIndex(index)
      setLoadedIndices((prev) => {
        const next = new Set(prev)
        next.add(index)
        return next
      })
    })
  }

  return (
    <section id="overview" className="vault-shell overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="flex flex-col justify-center border-b border-border/70 p-6 sm:p-9 lg:border-r lg:border-b-0 xl:p-12">
          <p className="vault-label">Private collection manager</p>
          <h1 className="mt-4 max-w-[12ch] text-4xl leading-[1.02] font-semibold tracking-[-0.045em] text-foreground sm:text-5xl xl:text-[3.6rem]">
            Home for your{" "}
            <span className="text-[var(--bladevault-title)]">
              blade collection.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            A focused, local-first desktop vault for cataloging, comparing, and
            reviewing every knife you own.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href="#install" className="vault-action vault-action-primary">
              <ArrowDownToLine className="size-4" />
              Install BladeVault
            </a>
            <a
              href="https://github.com/dedkola/bladevault"
              className="vault-action"
            >
              <Code2 className="size-4" />
              View on GitHub
            </a>
          </div>

          <div className="mt-9 grid grid-cols-3 border-y border-border/60 py-4">
            <div>
              <p className="text-sm font-semibold text-foreground">Local</p>
              <p className="vault-label mt-1">Storage</p>
            </div>
            <div className="border-l border-border/60 pl-4">
              <p className="text-sm font-semibold text-foreground">Free</p>
              <p className="vault-label mt-1">Open source</p>
            </div>
            <div className="border-l border-border/60 pl-4">
              <p className="text-sm font-semibold text-foreground">Desktop</p>
              <p className="vault-label mt-1">Mac + Windows</p>
            </div>
          </div>
        </div>

        <div className="vault-grid min-w-0 bg-muted/25 p-4 sm:p-6 lg:p-8">
          <div className="vault-window">
            <div className="vault-window-bar">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[var(--bladevault-olive)]" />
                <span className="size-2 rounded-full bg-[var(--bladevault-gold)]" />
                <span className="size-2 rounded-full border border-border bg-card" />
              </div>
              <p className="vault-label truncate">{activeCard.imageTitle}</p>
              <span className="hidden text-[10px] font-medium text-muted-foreground sm:inline">
                BladeVault / {activeCard.eyebrow}
              </span>
            </div>

            <div className="relative aspect-video overflow-hidden bg-white">
              {heroCards.map((card, index) => {
                const isActive = index === activeIndex
                const isLoaded = loadedIndices.has(index)
                if (!isActive && !isLoaded) return null

                return (
                  <div
                    key={card.src}
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isActive
                        ? "scale-100 opacity-100"
                        : "pointer-events-none scale-[1.008] opacity-0"
                    )}
                  >
                    <ScreenshotLightbox
                      src={card.src}
                      alt={card.alt}
                      className="absolute inset-0"
                    >
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(min-width: 1280px) 760px, (min-width: 1024px) 56vw, 100vw"
                        className="object-cover object-top"
                      />
                    </ScreenshotLightbox>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {heroCards.map((card, index) => {
              const Icon = card.icon
              const isActive = index === activeIndex

              return (
                <button
                  key={card.title}
                  type="button"
                  onMouseEnter={() => activateCard(index)}
                  onFocus={() => activateCard(index)}
                  onClick={() => activateCard(index)}
                  aria-pressed={isActive}
                  className={cn(
                    "group rounded-lg border p-3 text-left transition-colors focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none",
                    isActive
                      ? "border-[var(--bladevault-gold)] bg-card"
                      : "border-border/60 bg-card/70 hover:bg-card"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={cn(
                        "size-3.5",
                        isActive
                          ? "text-[var(--bladevault-title)]"
                          : "text-muted-foreground"
                      )}
                    />
                    <span className="vault-label">{card.eyebrow}</span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">
                    {card.title}
                  </p>
                  <p className="mt-1 hidden text-xs leading-5 text-muted-foreground xl:block">
                    {card.detail}
                  </p>
                </button>
              )
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted-foreground">
            <span>{activeCard.stat}</span>
            <span>{activeCard.statLabel}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
