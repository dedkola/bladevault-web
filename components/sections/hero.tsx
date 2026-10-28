import Image from "next/image"
import {
  ArrowDownToLine,
  ArrowRight,
  Database,
  Layers3,
  LockKeyhole,
  Monitor,
} from "lucide-react"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"
import { siteConfig } from "@/lib/site"

import styles from "./v2-homepage.module.css"

const principles = [
  {
    icon: LockKeyhole,
    title: "No account",
    detail: "Private by default",
  },
  {
    icon: Layers3,
    title: "Free and open",
    detail: "MIT licensed",
  },
  {
    icon: Monitor,
    title: "Desktop",
    detail: "macOS and Windows",
  },
  {
    icon: Database,
    title: "Local SQLite",
    detail: "Images stay yours",
  },
]

function WindowDots() {
  return (
    <span className={styles.windowDots} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

export function Hero() {
  return (
    <>
      <section id="overview" className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>
            <span className={styles.statusDot} aria-hidden="true" />
            Local-first knife collection · {siteConfig.releaseVersion}
          </p>
          <h1 className={styles.heroTitle}>
            Your collection, kept <em>useful.</em>
          </h1>
          <p className={styles.heroSub}>
            See the whole vault in Studio, read its patterns in Collection
            pulse, and shape a workspace that fits.
          </p>
          <div className={styles.heroActions}>
            <a href="#install" className="vault-action vault-action-primary">
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              Install BladeVault
            </a>
            <a href="#whats-new" className="vault-action">
              Explore v2.0
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.heroStage} aria-label="BladeVault v2.0 screens">
          <span className={styles.editionStamp}>
            <b>v2.0</b> Studio + pulse
          </span>

          <div className={`${styles.window} ${styles.heroWindowMain}`}>
            <div className={styles.windowBar}>
              <WindowDots />
              <span className={styles.windowLabel}>BladeVault / Studio</span>
            </div>
            <ScreenshotLightbox
              src="/screenshots/studio.jpg"
              alt="BladeVault Studio in the Current theme, showing a randomised gallery of knife photographs"
              title="Studio"
              className={styles.windowImage}
            >
              <Image
                src="/screenshots/studio.jpg"
                alt="BladeVault Studio in the Current theme, showing a randomised gallery of knife photographs"
                fill
                loading="eager"
                sizes="(min-width: 1100px) 48vw, 94vw"
                fetchPriority="high"
                className="object-cover object-top"
              />
            </ScreenshotLightbox>
          </div>

          <div className={`${styles.window} ${styles.heroWindowFloat}`}>
            <div className={styles.windowBar}>
              <WindowDots />
              <span className={styles.windowLabel}>Collection pulse</span>
            </div>
            <ScreenshotLightbox
              src="/screenshots/collection-pulse.jpg"
              alt="Collection pulse dashboard with catalogue growth, field coverage, maker mix, and carry profile"
              title="Collection pulse"
              className={styles.windowImage}
            >
              <Image
                src="/screenshots/collection-pulse.jpg"
                alt="Collection pulse dashboard with catalogue growth, field coverage, maker mix, and carry profile"
                fill
                loading="lazy"
                sizes="(min-width: 1100px) 22vw, 60vw"
                className="object-cover object-top"
              />
            </ScreenshotLightbox>
          </div>
        </div>
      </section>

      <div className={styles.principles} aria-label="BladeVault principles">
        {principles.map(({ icon: Icon, title, detail }) => (
          <div key={title} className={styles.principle}>
            <span className={styles.principleIcon}>
              <Icon aria-hidden="true" />
            </span>
            <span>
              <strong>{title}</strong>
              <span>{detail}</span>
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
