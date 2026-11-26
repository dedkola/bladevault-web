import type { CSSProperties, MouseEvent } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import hero from "@/components/sections/homepage-hero.module.css"
import { featureHref, type Feature, type FeatureTone } from "@/lib/features"
import { cn } from "@/lib/utils"

export const featureToneClass: Record<FeatureTone, string> = {
  chat: hero.toneChat,
  wishlist: hero.toneWishlist,
  drop: hero.toneDrop,
  inbox: hero.toneInbox,
  ai: hero.toneAi,
  care: hero.toneCare,
  achievements: hero.toneAchievements,
}

const barHeights = [30, 55, 40, 90, 35, 60, 25]

type FeatureCardProps = {
  feature: Feature
  /** Plain clicks call this instead of navigating; modified clicks still navigate. */
  onOpen?: (slug: string, card: HTMLAnchorElement) => void
  className?: string
}

export function FeatureCard({ feature, onOpen, className }: FeatureCardProps) {
  const {
    slug,
    tone,
    icon: Icon,
    tag,
    isNew,
    title,
    detail,
    cta,
    stats,
    visual,
  } = feature

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!onOpen) return
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    onOpen(slug, event.currentTarget)
  }

  return (
    <Link
      href={featureHref(slug)}
      onClick={onOpen ? handleClick : undefined}
      aria-haspopup={onOpen ? "dialog" : undefined}
      className={cn(hero.card, featureToneClass[tone], className)}
    >
      <span className={hero.cardTop}>
        <span className={hero.cardIcon} aria-hidden="true">
          <Icon />
        </span>
        <span className={isNew ? `${hero.tag} ${hero.tagNew}` : hero.tag}>
          {tag}
        </span>
      </span>
      <strong className={hero.cardTitle}>{title}</strong>
      <span className={hero.cardDetail}>{detail}</span>
      <span className={hero.cardVisual} aria-hidden="true">
        {visual === "spark" && (
          <svg
            viewBox="0 0 120 38"
            preserveAspectRatio="none"
            className={hero.spark}
          >
            <path d="M0 10 L18 12 L30 9 L44 14 L58 13 L70 18 L84 17 L96 30 L120 31" />
            <circle cx="96" cy="30" r="3" />
          </svg>
        )}
        {visual === "bars" && (
          <span className={hero.bars}>
            {barHeights.map((height, index) => (
              <i
                key={index}
                data-hot={index === 3 || undefined}
                style={{ "--h": `${height}%` } as CSSProperties}
              />
            ))}
          </span>
        )}
        {stats && (
          <span className={hero.stats}>
            {stats.map(([label, value]) => (
              <span key={label}>
                {label}
                <b>{value}</b>
              </span>
            ))}
          </span>
        )}
      </span>
      <span className={hero.cardCta}>
        {cta}
        <ArrowRight aria-hidden="true" />
      </span>
    </Link>
  )
}
