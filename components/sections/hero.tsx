"use client"

import Image from "next/image"
import { Cloud, Monitor, ShieldCheck, type LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import { startTransition, useState } from "react"

import { cn } from "@/lib/utils"

type HeroCard = {
  eyebrow: string
  title: string
  detail: string
  imageTitle: string
  imageCaption: string
  stat: string
  statLabel: string
  src: string
  alt: string
  icon: LucideIcon
}

const heroCards: HeroCard[] = [
  {
    eyebrow: "Dashboard",
    title: "Your local storage",
    detail: "For your entire knife collection.",
    imageTitle: "A dashboard that feels collected, not crowded",
    imageCaption:
      "Totals, recent additions, and the shape of your collection stay readable at a glance.",
    stat: "Local-first",
    statLabel: "Storage model",
    src: "/screenshots/dashboard.png",
    alt: "BladeVault dashboard screenshot",
    icon: ShieldCheck,
  },
  {
    eyebrow: "Detail View",
    title: "Add knife to vault",
    detail: "Scrape from any vendor web site.",
    imageTitle: "Detail pages with enough room to think",
    imageCaption:
      "Specs, photos, and notes sit together in a layout that stays calm while the data gets deeper.",
    stat: "Deep detail",
    statLabel: "Review surface",
    src: "/screenshots/detail.png",
    alt: "BladeVault knife detail screenshot",
    icon: Cloud,
  },
  {
    eyebrow: "Compare",
    title: "Compare unlimited knives",
    detail:
      "Compare unlimited knives at the same time. Send to print or save results to PDF.",
    imageTitle: "Compare without losing the small differences",
    imageCaption:
      "Blade geometry, materials, and dimensions remain easy to scan when two knives are on screen.",
    stat: "Side by side",
    statLabel: "Decision mode",
    src: "/screenshots/compare.png",
    alt: "BladeVault knife comparison screenshot",
    icon: Monitor,
  },
]

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeCard = heroCards[activeIndex]

  function activateCard(index: number) {
    startTransition(() => {
      setActiveIndex(index)
    })
  }

  return (
    <section id="overview" className="vault-shell overflow-hidden">
      <div className="vault-grid relative overflow-hidden px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
        <div className="absolute inset-x-0 top-0 h-44 bg-linear-to-b from-[rgb(200_156_61_/_0.12)] via-[rgb(255_253_248_/_0.1)] to-transparent" />
        <div className="absolute top-24 -left-12 h-56 w-56 rounded-full bg-[rgb(200_156_61_/_0.08)] blur-3xl" />
        <div className="absolute top-10 right-8 h-28 w-28 rounded-full bg-[rgb(46_52_23_/_0.08)] blur-3xl" />

        <div className="relative">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-4xl">
              <p className="vault-label">Your local knife collection app</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-[4rem] xl:leading-[0.95]">
                Three core BladeVault views
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-muted-foreground">
                A local-first collection workspace for saving, comparing, and
                reviewing knives without the noise of a generic catalog app.
              </p>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="vault-panel relative overflow-hidden rounded-[2.25rem] border-border/60 bg-[linear-gradient(180deg,rgba(255,253,248,0.96),rgba(248,244,235,0.9))] p-3 sm:p-4 lg:p-5"
            >
              <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-white/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background/65 to-transparent" />

              <div className="relative flex flex-col gap-3 border-b border-border/50 px-2 pb-4 sm:flex-row sm:items-end sm:justify-between sm:px-3">
                <div>
                  <p className="vault-label">{activeCard.eyebrow}</p>
                  <p className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-[2rem]">
                    {activeCard.imageTitle}
                  </p>
                </div>
              </div>

              <div className="relative mt-4 overflow-hidden rounded-[1.9rem] border border-border/70 bg-[#f5efdf]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full bg-[var(--bladevault-olive)]" />
                    <span className="size-2.5 rounded-full bg-[var(--bladevault-gold)]" />
                    <span className="size-2.5 rounded-full bg-[var(--bladevault-line)]" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[11px] tracking-[0.22em] text-[var(--bladevault-title)] uppercase sm:justify-end">
                    <span>{activeCard.stat}</span>
                    <span>{activeCard.statLabel}</span>
                  </div>
                </div>

                <div className="relative aspect-[16/9] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.48),transparent_36%)]">
                  {heroCards.map((card, index) => (
                    <div
                      key={card.src}
                      className={cn(
                        "absolute inset-0 transition-all duration-300",
                        index === activeIndex
                          ? "scale-100 opacity-100"
                          : "pointer-events-none scale-[1.015] opacity-0"
                      )}
                    >
                      <div className="relative size-full">
                        <Image
                          src={card.src}
                          alt={card.alt}
                          fill
                          preload={index === 0}
                          sizes="(min-width: 1280px) 980px, (min-width: 768px) 72vw, 100vw"
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="relative z-10 mt-4 grid gap-4 lg:-mt-14 lg:grid-cols-3 lg:px-6">
              {heroCards.map((card, index) => {
                const Icon = card.icon
                const isActive = index === activeIndex

                return (
                  <motion.button
                    key={card.title}
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.1 + index * 0.08 }}
                    onMouseEnter={() => activateCard(index)}
                    onFocus={() => activateCard(index)}
                    onClick={() => activateCard(index)}
                    aria-pressed={isActive}
                    className={cn(
                      "vault-panel group relative overflow-hidden rounded-[2rem] p-5 text-left transition-all duration-200 sm:p-6",
                      isActive
                        ? "border-[var(--bladevault-gold)] bg-card shadow-[0_24px_60px_rgba(98,73,24,0.18)] lg:-translate-y-2"
                        : "bg-card/94 hover:-translate-y-1 hover:border-[var(--bladevault-line)]"
                    )}
                  >
                    <div className="absolute inset-x-0 top-0 h-16 bg-linear-to-b from-[rgb(255_255_255_/_0.5)] to-transparent" />

                    <div className="relative flex items-start justify-between gap-4">
                      <span
                        className={cn(
                          "inline-flex size-11 items-center justify-center rounded-2xl border transition-colors",
                          isActive
                            ? "border-[var(--bladevault-gold)] bg-[var(--bladevault-gold)]/12 text-[var(--bladevault-title)]"
                            : "border-border/70 bg-background/92 text-[var(--bladevault-title)]"
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <span className="vault-label pt-1">{card.eyebrow}</span>
                    </div>

                    <h2 className="relative mt-8 text-center text-[2rem] leading-[1.02] font-medium tracking-tight text-foreground">
                      {card.title}
                    </h2>
                    <p className="relative mx-auto mt-4 max-w-[22ch] text-center text-base leading-8 text-muted-foreground">
                      {card.detail}
                    </p>

                    <div className="relative mt-7 flex justify-center border-t border-border/50 pt-4">
                      <div className="text-center">
                        <p className="text-lg font-semibold tracking-tight text-foreground">
                          {card.stat}
                        </p>
                        <p className="vault-label mt-1">{card.statLabel}</p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
