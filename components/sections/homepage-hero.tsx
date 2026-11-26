import Link from "next/link"
import { ArrowRight, BellRing, CloudCheck } from "lucide-react"

import { FeatureRail } from "@/components/features/feature-rail"
import { releaseAnchor } from "@/lib/navigation"
import { featuredRelease, shortVersion } from "@/lib/releases"
import { siteConfig } from "@/lib/site"

import { HeroDownload } from "./hero-download"
import { HeroWindow } from "./hero-window"
import hero from "./homepage-hero.module.css"
import styles from "./homepage-v3.module.css"

const featuredHref = featuredRelease
  ? `/whats-new#${releaseAnchor(featuredRelease.version)}`
  : "/whats-new"

// Hero chips come from the featured release in data/releases.json.
const newsLinks = (featuredRelease?.highlights ?? []).slice(0, 3)

export function HomepageHero() {
  return (
    <>
      <section id="overview" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Local-first knife collection &middot; {siteConfig.releaseVersion}
          </p>
          <ul
            className={hero.ticker}
            aria-label={`New in BladeVault ${featuredRelease ? shortVersion(featuredRelease.version) : ""}`}
          >
            {newsLinks.map((label) => (
              <li key={label}>
                <Link href={featuredHref} className={hero.tickerLink}>
                  <span className={styles.newBadge}>New</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <h1 className={styles.heroTitle}>
            Your knife collection, <em>watched over.</em>
            <span className={hero.titleAsk}>Now just ask it.</span>
          </h1>
          <p className={styles.heroSub}>
            Paste a link and BladeVault fills in the record. Then it keeps
            watching prices, care, and backups, and in Chat you can ask anything
            about your knives and get answers built from your own records.
          </p>
          <HeroDownload />
          <div className={styles.heroTrust} aria-label="Product principles">
            <span>Free</span>
            <span>MIT licensed</span>
            <span>No account</span>
            <span>Local SQLite</span>
            <span>Your AI, your keys</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <HeroWindow />

          <div className={hero.chips} aria-label="What BladeVault is watching">
            <a
              href="#feature-price-drops"
              className={`${hero.chip} ${hero.chipSale} ${hero.toneInbox}`}
            >
              <span className={hero.chipIcon} aria-hidden="true">
                <BellRing />
              </span>
              <span className={hero.chipText}>
                <small>
                  <span className={hero.live} aria-hidden="true" />
                  Inbox &middot; Super sale
                </small>
                <strong>
                  Benchmade Bugout
                  <span className={hero.pct}>55% below regular</span>
                </strong>
                <span>Found while checking the rest of the collection</span>
              </span>
            </a>

            <Link
              href="/#backup"
              className={`${hero.chip} ${hero.chipDrive} ${hero.toneDrive}`}
            >
              <span className={hero.chipIcon} aria-hidden="true">
                <CloudCheck />
              </span>
              <span className={hero.chipText}>
                <small>Backed up</small>
                <strong>Google Drive</strong>
                <span>Chats and records included</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className={hero.rail} aria-labelledby="hero-rail-title">
        <div className={hero.railHead}>
          <div>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              What it keeps an eye on
            </p>
            <h2 id="hero-rail-title">
              Six things running quietly in the background
            </h2>
          </div>
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
