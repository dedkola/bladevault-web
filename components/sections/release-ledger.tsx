import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import styles from "./v2-homepage.module.css"

const releases = [
  {
    version: "v1.4.1 – 1.4.4",
    title: "Calmer care and cloud",
    detail:
      "Guided completeness cleanup, quieter background backups, and restores that keep running while you browse.",
  },
  {
    version: "v1.4.6",
    title: "Sold, not deleted",
    detail:
      "Mark knives as sold, import pasted links in order, and skip product URLs that are already saved.",
  },
  {
    version: "v1.4.7 – 1.4.8",
    title: "Better imports, less repetition",
    detail:
      "Resizable previews, popup clearing, cleaner Vosteed specifications, and bulk model-name edits.",
  },
  {
    version: "v2.0.0",
    title: "A new way to see it",
    detail:
      "Studio, Collection pulse, the Modern workspace, column controls, bulk selection, and a chosen start page.",
  },
]

export function ReleaseLedger() {
  return (
    <section id="since-1-4" className={styles.since}>
      <div className={styles.sinceGrid}>
        <div className={styles.sinceIntro}>
          <h2 className={styles.displayTitle}>
            Since 1.4, the vault learned a lot.
          </h2>
          <p>
            2.0 is the headline. The releases behind it also changed how the
            vault handles care, cloud, imports, and edits.
          </p>
          <Link href="/whats-new#release-v2.0.0" className={styles.textLink}>
            Open the release ledger
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <div
          className={styles.releaseLedger}
          aria-label="BladeVault release highlights since 1.4"
        >
          {releases.map((release) => (
            <div key={release.version} className={styles.releaseRow}>
              <span className={styles.releaseVersion}>{release.version}</span>
              <strong>{release.title}</strong>
              <p>{release.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
