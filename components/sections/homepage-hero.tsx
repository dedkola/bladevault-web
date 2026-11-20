import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bell,
  CloudCheck,
  Inbox,
  Sparkles,
  TrendingDown,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { releaseAnchor } from "@/lib/navigation"
import { siteConfig } from "@/lib/site"

import { HeroDownload } from "./hero-download"
import hero from "./homepage-hero.module.css"
import styles from "./homepage-v3.module.css"

const releaseNotes = (version: string) => `/whats-new#${releaseAnchor(version)}`

const priceDropsHref = releaseNotes("v2.5.1")
const supervisorHref = releaseNotes("v2.5.3")
const inboxHref = releaseNotes("v2.5.1")

const newsLinks = [
  { href: priceDropsHref, label: "Price Drops & alerts" },
  { href: supervisorHref, label: "AI supervisor" },
  { href: inboxHref, label: "Inbox" },
]

// Example messages for the floating Inbox banner. They describe the example
// vault, not live data.
const inboxMessages = [
  { tone: "drop", text: "Back in stock · Vosteed Raccoon", time: "2m" },
  { tone: "care", text: "Sharpening due · Benchmade Bugout", time: "1h" },
  { tone: "ai", text: "Daily price summary is ready", time: "8h" },
] as const

// Past runs, the current run, then upcoming ones on the supervisor banner.
const supervisorRuns = ["done", "done", "done", "done", "now", "next", "next"]

type Tone = "drop" | "inbox" | "ai" | "care" | "drive"

type FeatureCard = {
  tone: Tone
  icon: LucideIcon
  tag: string
  isNew?: boolean
  title: string
  detail: string
  href: string
  cta: string
  stats?: [label: string, value: string][]
  visual?: "spark" | "bars"
}

const featureCards: FeatureCard[] = [
  {
    tone: "drop",
    icon: TrendingDown,
    tag: "New",
    isNew: true,
    title: "Price Drops",
    detail:
      "Gentle, paced checks across your stores for drops, increases and restocks, with full price history.",
    href: priceDropsHref,
    cta: "Watch a knife",
    visual: "spark",
  },
  {
    tone: "ai",
    icon: Sparkles,
    tag: "New",
    isNew: true,
    title: "AI supervisor",
    detail:
      "Schedules the checks for you: what to check first, which pages to retry, and a daily summary.",
    href: supervisorHref,
    cta: "Observe or act",
    visual: "bars",
  },
  {
    tone: "inbox",
    icon: Inbox,
    tag: "New",
    isNew: true,
    title: "Inbox & alerts",
    detail:
      "Price, care and system messages in one list, with a minimum change so small moves stay quiet.",
    href: inboxHref,
    cta: "Open the Inbox",
    stats: [
      ["Price", "2"],
      ["Maintenance", "1"],
      ["System", "1"],
    ],
  },
  {
    tone: "care",
    icon: Wrench,
    tag: "2.5",
    title: "Maintenance",
    detail:
      "Care reminders per knife, a Coming up timeline you can reschedule, and a care history.",
    href: "/#care",
    cta: "Plan care",
    stats: [
      ["Overdue", "1"],
      ["Due soon", "2"],
      ["Up to date", "21"],
    ],
  },
  {
    tone: "drive",
    icon: CloudCheck,
    tag: "Backup",
    title: "Google Drive",
    detail:
      "The vault backs up to your own Drive. A failed backup stays in the Inbox until the next one works.",
    href: "/#backup",
    cta: "Set up backup",
    stats: [
      ["Last backup", "2 min ago"],
      ["Status", "OK"],
    ],
  },
]

const toneClass: Record<Tone, string> = {
  drop: hero.toneDrop,
  inbox: hero.toneInbox,
  ai: hero.toneAi,
  care: hero.toneCare,
  drive: hero.toneDrive,
}

const barHeights = [30, 55, 40, 90, 35, 60, 25]

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
            photos. Then it keeps watching: store prices and restocks, care
            that&apos;s coming due, and backups to your own Google Drive, with
            an AI supervisor that schedules the checks and one Inbox for
            everything that needs you.
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
            <Link
              href={priceDropsHref}
              className={`${hero.chip} ${hero.chipPrice} ${hero.toneDrop}`}
            >
              <span className={hero.chipIcon} aria-hidden="true">
                <TrendingDown />
              </span>
              <span className={hero.chipText}>
                <small>
                  <span className={hero.live} aria-hidden="true" />
                  Price drop &middot; Blade HQ
                </small>
                <strong>
                  CIVIVI Elementum <s>$69</s> $54
                  <span className={hero.pct}>&minus;22%</span>
                </strong>
                <span>Below what you paid &middot; confirmed twice</span>
              </span>
            </Link>

            <Link
              href={inboxHref}
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
                  className={`${hero.message} ${toneClass[tone]}`}
                >
                  <i aria-hidden="true" />
                  <span>{text}</span>
                  <time>{time}</time>
                </span>
              ))}
            </Link>

            <Link
              href={supervisorHref}
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
            </Link>

            <Link
              href="/#care"
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
            </Link>

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
              Five things running quietly in the background
            </h2>
          </div>
          <Link href="/whats-new" className={hero.railMore}>
            What&apos;s new in 2.5
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>

        <ul className={hero.cards}>
          {featureCards.map(
            ({
              tone,
              icon: Icon,
              tag,
              isNew,
              title,
              detail,
              href,
              cta,
              stats,
              visual,
            }) => (
              <li key={title}>
                <Link href={href} className={`${hero.card} ${toneClass[tone]}`}>
                  <span className={hero.cardTop}>
                    <span className={hero.cardIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <span
                      className={
                        isNew ? `${hero.tag} ${hero.tagNew}` : hero.tag
                      }
                    >
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
              </li>
            )
          )}
        </ul>
      </section>
    </>
  )
}
