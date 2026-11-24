"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import hero from "@/components/sections/homepage-hero.module.css"
import { featureHashPrefix, features, getFeature } from "@/lib/features"

import { FeatureCard } from "./feature-card"
import { FeatureDialog } from "./feature-dialog"

function slugFromHash(hash: string) {
  const slug = hash.replace(/^#/, "")
  if (!slug.startsWith(featureHashPrefix)) return null
  return getFeature(slug.slice(featureHashPrefix.length))?.slug ?? null
}

/**
 * The homepage feature cards. A plain click opens the feature tour in a popup
 * and puts #feature-<slug> in the URL, so any link to that hash (the hero
 * banners, a shared URL) opens the same popup.
 */
export function FeatureRail() {
  const [slug, setSlug] = useState<string | null>(null)
  const returnFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const sync = () => setSlug(slugFromHash(window.location.hash))
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  const changeSlug = useCallback((next: string | null) => {
    setSlug(next)
    const { pathname, search } = window.location
    const hash = next ? `#${featureHashPrefix}${next}` : ""
    window.history.replaceState(
      window.history.state,
      "",
      pathname + search + hash
    )
  }, [])

  const open = useCallback(
    (next: string, card: HTMLAnchorElement) => {
      returnFocus.current = card
      changeSlug(next)
    },
    [changeSlug]
  )

  return (
    <>
      <ul className={hero.cards}>
        {features.map((feature) => (
          <li key={feature.slug}>
            <FeatureCard feature={feature} onOpen={open} />
          </li>
        ))}
      </ul>
      <FeatureDialog
        slug={slug}
        onSlugChange={changeSlug}
        returnFocus={returnFocus}
      />
    </>
  )
}
