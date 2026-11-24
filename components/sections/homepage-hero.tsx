import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  CloudCheck,
  Heart,
  Inbox,
  Sparkles,
  TrendingDown,
  Wrench,
} from "lucide-react"

import { FeatureRail } from "@/components/features/feature-rail"
import { releaseAnchor } from "@/lib/navigation"
import { siteConfig } from "@/lib/site"

import { HeroDownload } from "./hero-download"
import hero from "./homepage-hero.module.css"
import styles from "./homepage-v3.module.css"

const releaseNotes = (version: string) => `/whats-new#${releaseAnchor(version)}`

const priceDropsHref = releaseNotes("v2.5.19")
const wishlistHref = releaseNotes("v2.5.20")
const storesHref = releaseNotes("v2.5.21")

const newsLinks = [
  { href: storesHref, label: "SMKW, DLT, KnifeJoy & Northwest Knives" },
  { href: priceDropsHref, label: "Per-store price chart" },
  { href: wishlistHref, label: "Wishlist deal board" },
]

// Example messages for the floating Inbox banner. They describe the example
// vault, not live data.
const inboxMessages = [
  { tone: "drop", text: "Back in stock · Para Military 2", time: "2m" },
  { tone: "care", text: "Sharpening due · Benchmade Bugout", time: "1h" },
  { tone: "ai", text: "Daily price summary is ready", time: "8h" },
] as const

// Past runs, the current run, then upcoming ones on the supervisor banner.
const supervisorRuns = ["done", "done", "done", "done", "now", "next", "next"]

const messageTone = {
  drop: hero.toneDrop,
  care: hero.toneCare,
  ai: hero.toneAi,
}

export function HomepageHero() {
  return (
    <>
      <section id="overview" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Local-first knife collection &middot; {siteConfig.releaseVersion}
          </p>
          <ul className={hero.ticker} aria-label="New in BladeVault 2.5">
            {newsLinks.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className={hero.tickerLink}>
                  <span className={styles.newBadge}>New</span>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <h1 className={styles.heroTitle}>
            Your knife collection, <em>watched over.</em>
          </h1>
          <p className={styles.heroSub}>
            Paste a product link and BladeVault fills in the specs, price, and
            photos. Then it keeps watching: a Wishlist that groups what you plan
            to buy by deal, with each knife&apos;s price against its regular
            price, store drops and restocks, care that&apos;s coming due, and
            backups to your own Google Drive, with an AI supervisor that
            schedules the checks and one Inbox for everything that needs you.
          </p>
          <HeroDownload />
          <div className={styles.heroTrust} aria-label="Product principles">
            <span>Free</span>
            <span>MIT licensed</span>
            <span>No account</span>
            <span>Local SQLite</span>
            <span>Google Drive backup</span>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <figure className={`${styles.window} ${styles.heroWindow}`}>
            <div className={styles.windowBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>BladeVault / Studio</span>
              <span className={hero.bell}>
                <Bell aria-hidden="true" />
                Inbox <b>4</b>
              </span>
            </div>
            <Image
              src="/screenshots/live/studio-desktop.jpg"
              alt="BladeVault Studio in the Lumen style with an example knife collection, including CIVIVI and Vosteed models, and Smart Collections in the filter bar"
              width={2880}
              height={1800}
              priority
              sizes="(min-width: 1180px) 48vw, 94vw"
              quality={90}
              className={styles.heroWindowImage}
            />
          </figure>

          <div className={hero.chips} aria-label="What BladeVault is watching">
            <a
              href="#feature-wishlist"
              className={`${hero.chip} ${hero.chipWishlist} ${hero.toneWishlist}`}
            >
              <span className={hero.chipIcon} aria-hidden="true">
                <Heart />
              </span>
              <span className={hero.chipText}>
                <small>Wishlist &middot; Best deal right now</small>
                <strong>
                  Vosteed Raccoon TiSlim <s>$135</s> $94.50
                  <span className={hero.pct}>&minus;30%</span>
                </strong>
                <span>$40.50 below regular &middot; 3 stores</span>
              </span>
            </a>

            <a
              href="#feature-price-drops"
              className={`${hero.chip} ${hero.chipPrice} ${hero.toneDrop}`}
            >
              <span className={hero.chipIcon} aria-hidden="true">
                <TrendingDown />
              </span>
              <span className={hero.chipText}>
                <small>
                  <span className={hero.live} aria-hidden="true" />
                  Price drop &middot; SMKW
                </small>
                <strong>
                  Spyderco Military 2 <s>$294</s> $220.50
                  <span className={hero.pct}>&minus;25%</span>
                </strong>
                <span>25% below regular &middot; 2 stores</span>
              </span>
            </a>

            <a
              href="#feature-inbox"
              className={`${hero.chip} ${hero.chipInbox} ${hero.toneInbox}`}
            >
              <span className={hero.inboxHead}>
                <small>
                  <Inbox aria-hidden="true" />
                  Inbox
                </small>
                <b>4 new</b>
              </span>
              {inboxMessages.map(({ tone, text, time }) => (
                <span
                  key={text}
                  className={`${hero.message} ${messageTone[tone]}`}
                >
                  <i aria-hidden="true" />
                  <span>{text}</span>
                  <time>{time}</time>
                </span>
              ))}
            </a>

            <a
              href="#feature-ai-supervisor"
              className={`${hero.chip} ${hero.chipAi} ${hero.toneAi}`}
            >
              <span className={hero.chipIcon} aria-hidden="true">
                <Sparkles />
              </span>
              <span className={hero.chipText}>
                <small>AI supervisor &middot; Act</small>
                <strong>Next run in 6 min</strong>
                <span>3 checks queued &middot; 1 page retried</span>
                <span className={hero.schedule} aria-hidden="true">
                  {supervisorRuns.map((state, index) => (
                    <i key={index} data-state={state} />
                  ))}
                </span>
              </span>
            </a>

            <a
              href="#feature-maintenance"
              className={`${hero.chip} ${hero.chipCare} ${hero.toneCare}`}
            >
              <span className={hero.chipIcon} aria-hidden="true">
                <Wrench />
              </span>
              <span className={hero.chipText}>
                <small>Maintenance</small>
                <strong>2 knives due this week</strong>
                <span>Sharpen &middot; Clean &middot; Lube</span>
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
                <span>Restore on any device</span>
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
          <Link href="/whats-new" className={hero.railMore}>
            What&apos;s new in 2.5.21
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <FeatureRail />
      </section>
    </>
  )
}
