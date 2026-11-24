// Client-only: rendered by FeatureRail.
import { useState, type RefObject } from "react"
import { Dialog } from "@base-ui/react/dialog"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  ExternalLink,
  X,
} from "lucide-react"

import { features, featureHref, getFeature } from "@/lib/features"
import { siteConfig } from "@/lib/site"

import { featureToneClass } from "./feature-card"
import { FeatureTour } from "./feature-tour"
import styles from "./feature-dialog.module.css"

type FeatureDialogProps = {
  slug: string | null
  onSlugChange: (slug: string | null) => void
  returnFocus: RefObject<HTMLElement | null>
}

export function FeatureDialog({
  slug,
  onSlugChange,
  returnFocus,
}: FeatureDialogProps) {
  // Keep showing the last feature while the popup animates closed.
  const [shownSlug, setShownSlug] = useState(slug)
  if (slug && slug !== shownSlug) setShownSlug(slug)
  const feature = shownSlug ? getFeature(shownSlug) : null
  const index = feature ? features.indexOf(feature) : -1
  const prev = features[(index - 1 + features.length) % features.length]
  const next = features[(index + 1) % features.length]

  return (
    <Dialog.Root
      open={slug !== null && feature !== null}
      onOpenChange={(open) => {
        if (!open) onSlugChange(null)
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Viewport className={styles.viewport}>
          <Dialog.Popup
            className={`${styles.popup} ${feature ? featureToneClass[feature.tone] : ""}`}
            finalFocus={returnFocus}
          >
            {feature && (
              <>
                <div className={styles.bar}>
                  <nav className={styles.switcher} aria-label="Features">
                    {features.map((item) => {
                      const Icon = item.icon
                      return (
                        <button
                          key={item.slug}
                          type="button"
                          className={`${styles.switch} ${featureToneClass[item.tone]}`}
                          aria-current={item.slug === feature.slug || undefined}
                          onClick={() => onSlugChange(item.slug)}
                        >
                          <Icon aria-hidden="true" />
                          <span>{item.title}</span>
                        </button>
                      )
                    })}
                  </nav>
                  <Dialog.Close
                    className={styles.iconButton}
                    aria-label="Close"
                  >
                    <X aria-hidden="true" />
                  </Dialog.Close>
                </div>

                <div key={feature.slug} className={styles.scroll}>
                  <FeatureTour
                    key={feature.slug}
                    slug={feature.slug}
                    titleAs={Dialog.Title}
                  />
                </div>

                <div className={styles.footer}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => onSlugChange(prev.slug)}
                  >
                    <ArrowLeft aria-hidden="true" />
                    <span>{prev.title}</span>
                  </button>
                  <div className={styles.links}>
                    {feature.docsHref && (
                      <Link href={feature.docsHref} className={styles.link}>
                        <BookOpen aria-hidden="true" />
                        Docs
                      </Link>
                    )}
                    <a href={siteConfig.releasesUrl} className={styles.link}>
                      <Download aria-hidden="true" />
                      Download
                    </a>
                    <Link
                      href={featureHref(feature.slug)}
                      className={styles.primary}
                    >
                      Open full page
                      <ExternalLink aria-hidden="true" />
                    </Link>
                  </div>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => onSlugChange(next.slug)}
                  >
                    <span>{next.title}</span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </>
            )}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
