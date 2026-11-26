"use client"

import { useState, useSyncExternalStore, type ElementType } from "react"
import Link from "next/link"
import { Pause, Play } from "lucide-react"

import base from "@/components/sections/homepage-v3.module.css"
import { featureReleaseHref, getFeature } from "@/lib/features"
import { cn } from "@/lib/utils"

import { featureToneClass } from "./feature-card"
import { FeatureMock } from "./feature-mocks"
import styles from "./feature-tour.module.css"

const stepDuration = 5200

type FeatureTourProps = {
  /** Looked up here: feature data holds icon components, which can't cross into a client component. */
  slug: string
  /** Heading element for the title: an h1 on its page, Dialog.Title in the popup. */
  titleAs?: ElementType
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)"

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery)
  query.addEventListener("change", onChange)
  return () => query.removeEventListener("change", onChange)
}

// No autoplay in the static HTML; it starts after hydration.
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true
  )
}

export function FeatureTour({ slug, titleAs: Title = "h2" }: FeatureTourProps) {
  const feature = getFeature(slug)
  if (!feature) throw new Error(`Unknown feature: ${slug}`)
  const { icon: Icon, steps } = feature
  const [active, setActive] = useState(0)
  // Autoplay walks through the steps until the reader takes over. It is off
  // by default for reduced motion; the Play button still turns it on.
  const reducedMotion = useReducedMotion()
  const [playChoice, setPlayChoice] = useState<boolean | null>(null)
  const playing = playChoice ?? !reducedMotion
  const [hovering, setHovering] = useState(false)

  const running = playing && !hovering

  function selectStep(index: number) {
    setActive(index)
    setPlayChoice(false)
  }

  return (
    <div
      className={cn(base.homepage, featureToneClass[feature.tone], styles.tour)}
    >
      <header className={styles.head}>
        <span className={styles.headIcon} aria-hidden="true">
          <Icon />
        </span>
        <div className={styles.headCopy}>
          <p className={styles.kicker}>
            {feature.isNew && <span className={base.newBadge}>New</span>}
            {feature.slug === "chat"
              ? "Ask when you need it"
              : "Runs in the background"}
            <span aria-hidden="true">&middot;</span>
            <Link href={featureReleaseHref(feature)}>
              Since {feature.since.replace(/^v/, "")}
            </Link>
          </p>
          <Title className={styles.title}>{feature.title}</Title>
          <p className={styles.promise}>{feature.promise}</p>
          <p className={styles.intro}>{feature.intro}</p>
        </div>
      </header>

      <div
        className={styles.stage}
        onPointerEnter={() => setHovering(true)}
        onPointerLeave={() => setHovering(false)}
      >
        <figure
          className={cn(base.window, styles.mockWindow)}
          data-active={active + 1}
        >
          <div className={base.windowBar}>
            <span className={base.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>BladeVault / {feature.windowPath}</span>
            <span className={styles.example}>Example vault</span>
          </div>
          <div className={styles.mockBody}>
            <FeatureMock slug={feature.slug} />
          </div>
          <figcaption className="sr-only">
            Illustration of the {feature.title} screen, step {active + 1}:{" "}
            {steps[active].title}
          </figcaption>
        </figure>

        <div className={styles.stepsCol}>
          <div className={styles.stepsHead}>
            <span>How it works</span>
            <button
              type="button"
              className={styles.playButton}
              onClick={() => setPlayChoice(!playing)}
              aria-pressed={playing}
            >
              {playing ? (
                <Pause aria-hidden="true" />
              ) : (
                <Play aria-hidden="true" />
              )}
              {playing ? "Pause tour" : "Play tour"}
            </button>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => {
              const isActive = index === active
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    className={cn(styles.step, isActive && styles.stepActive)}
                    aria-current={isActive ? "step" : undefined}
                    onClick={() => selectStep(index)}
                  >
                    <span className={styles.stepNum}>{index + 1}</span>
                    <span className={styles.stepText}>
                      <strong>{step.title}</strong>
                      <span>{step.body}</span>
                    </span>
                    {isActive && playing && (
                      // The bar's animation is the autoplay clock: hovering
                      // the stage pauses it, and its end moves to the next step.
                      <span
                        key={active}
                        className={styles.stepProgress}
                        data-running={running || undefined}
                        style={{ animationDuration: `${stepDuration}ms` }}
                        onAnimationEnd={() =>
                          setActive((step) => (step + 1) % steps.length)
                        }
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>
      </div>

      <ul className={styles.details}>
        {feature.details.map(({ value, label }) => (
          <li key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
