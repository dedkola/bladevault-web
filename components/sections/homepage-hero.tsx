import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FeatureRail } from "@/components/features/feature-rail"
import { releaseAnchor } from "@/lib/navigation"
import { featuredRelease, shortVersion } from "@/lib/releases"

import { HeroDownload } from "./hero-download"
import { HeroWindow } from "./hero-window"
import hero from "./homepage-hero.module.css"
import styles from "./homepage-v3.module.css"

const featuredHref = featuredRelease
  ? `/whats-new#${releaseAnchor(featuredRelease.version)}`
  : "/whats-new"

// The hero shows one release line, taken from the featured release in
// data/releases.json. Everything else about that release lives in the cards
// below and on the What's new page.
const releaseLine = featuredRelease?.highlights?.[0]

export function HomepageHero() {
  return (
    <>
      <section id="overview" className={styles.hero}>
        <div className={styles.heroCopy}>
          {featuredRelease && releaseLine ? (
            <Link href={featuredHref} className={hero.release}>
              <span className={hero.releaseVersion}>
                {shortVersion(featuredRelease.version)}
              </span>
              {releaseLine}
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : null}
          <h1 className={styles.heroTitle}>
            Your knife collection, organized and watched.
          </h1>
          <p className={styles.heroSub}>
            Paste a product link and BladeVault fills in the record. Then it
            watches prices, care and backups for you, and you can ask it
            anything about your knives.
          </p>
          <HeroDownload />
          <ul className={styles.heroTrust} aria-label="Product principles">
            <li>Free and MIT licensed</li>
            <li>No account</li>
            <li>Your data stays on your machine</li>
          </ul>
        </div>

        <div className={styles.heroVisual}>
          <HeroWindow />
        </div>
      </section>

      <section className={hero.rail} aria-labelledby="hero-rail-title">
        <div className={hero.railHead}>
          <h2 id="hero-rail-title">What it does for you</h2>
          <Link href={featuredHref} className={hero.railMore}>
            What&apos;s new
            {featuredRelease && ` in ${shortVersion(featuredRelease.version)}`}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <FeatureRail />
      </section>
    </>
  )
}
