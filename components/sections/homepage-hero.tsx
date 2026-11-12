import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  CloudUpload,
  Link2,
  Monitor,
  Terminal,
} from "lucide-react"

import { siteConfig } from "@/lib/site"

import { CloudMark } from "./cloud-mark"
import { HeroDownload } from "./hero-download"
import styles from "./homepage-v3.module.css"

const principles = [
  {
    icon: Link2,
    title: "Auto scrape",
    detail: "URL in, record out",
  },
  {
    icon: CloudUpload,
    title: "Local-first, cloud-safe",
    detail: "SQLite locally, backup in your Google Drive",
  },
  {
    icon: Terminal,
    title: "AI-ready",
    detail: "MCP, read-only by default",
  },
  {
    icon: Monitor,
    title: "Any screen",
    detail: "Mac, Windows, Linux, iPad, iPhone",
  },
]

export function HomepageHero() {
  return (
    <>
      <section id="overview" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            <span className={styles.eyebrowDot} aria-hidden="true" />
            Local-first knife collection &middot; {siteConfig.releaseVersion}
          </p>
          <Link href="/#backup" className={styles.heroNews}>
            <span className={styles.newBadge}>New</span>
            Back up your vault to Google Drive
            <ArrowRight aria-hidden="true" />
          </Link>
          <h1 className={styles.heroTitle}>
            Your knife collection, <em>filled in.</em>
          </h1>
          <p className={styles.heroSub}>
            Paste a product link and BladeVault fills in the specs, price, and
            photos. Keep dated notes and a full history for every knife, back
            the vault up to your own Google Drive, run it on Mac, Windows, or
            Linux, connect the AI you already use, or self-host it for iPad and
            iPhone.
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
          <span className={styles.heroBadge}>
            <b>Example vault</b> Studio
          </span>
          <figure className={`${styles.window} ${styles.heroWindow}`}>
            <div className={styles.windowBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>BladeVault / Studio</span>
              <span>Visual library</span>
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
            <figcaption className={styles.heroWindowCaption}>
              <span>
                <b>Collection</b> Example vault
              </span>
              <span>Smart Collections in the filter</span>
            </figcaption>
          </figure>

          <Link href="/#backup" className={styles.heroCloud}>
            <CloudMark className={styles.heroCloudArt} />
            <span className={styles.heroCloudText}>
              <small>
                <CheckCircle2 aria-hidden="true" />
                Backed up
              </small>
              <strong>Google Drive</strong>
              <span>Restore on any device</span>
            </span>
          </Link>
        </div>
      </section>

      <section className={styles.principles} aria-label="BladeVault principles">
        {principles.map(({ icon: Icon, title, detail }) => (
          <div key={title} className={styles.principle}>
            <span className={styles.principleIcon} aria-hidden="true">
              <Icon />
            </span>
            <div>
              <strong>{title}</strong>
              <span>{detail}</span>
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
