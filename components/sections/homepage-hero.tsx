import Image from "next/image"
import { Database, Link2, Monitor, Terminal } from "lucide-react"

import { siteConfig } from "@/lib/site"

import { HeroDownload } from "./hero-download"
import styles from "./homepage-v3.module.css"

const principles = [
  {
    icon: Link2,
    title: "Auto scrape",
    detail: "URL in, record out",
  },
  {
    icon: Database,
    title: "Local-first",
    detail: "SQLite and images",
  },
  {
    icon: Terminal,
    title: "AI-ready",
    detail: "MCP, read-only by default",
  },
  {
    icon: Monitor,
    title: "Any screen",
    detail: "Mac, Windows, iPad, iPhone",
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
          <h1 className={styles.heroTitle}>
            Your knife collection, <em>filled in.</em>
          </h1>
          <p className={styles.heroSub}>
            Paste a product link and BladeVault fills in the specs, price, and
            photos. Keep the vault on your Mac or Windows PC, connect the AI you
            already use, or self-host it and browse from your iPad and iPhone.
          </p>
          <HeroDownload />
          <div className={styles.heroTrust} aria-label="Product principles">
            <span>Free</span>
            <span>MIT licensed</span>
            <span>No account</span>
            <span>Local SQLite</span>
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
              alt="BladeVault Studio with an example knife collection, including Vosteed, Kizer, and CIVIVI models"
              width={1440}
              height={900}
              priority
              sizes="(min-width: 1180px) 48vw, 94vw"
              quality={90}
              className={styles.heroWindowImage}
            />
            <figcaption className={styles.heroWindowCaption}>
              <span>
                <b>Collection</b> Example vault
              </span>
              <span>Randomised family layouts</span>
            </figcaption>
          </figure>
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
