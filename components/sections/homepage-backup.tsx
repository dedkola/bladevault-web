import Link from "next/link"
import {
  ArrowRight,
  FolderArchive,
  KeyRound,
  Laptop,
  RefreshCcw,
  Tablet,
} from "lucide-react"

import { releases } from "@/lib/releases"

import { CloudMark } from "./cloud-mark"
import styles from "./homepage-v3.module.css"

const steps = [
  {
    icon: KeyRound,
    title: "Connect Google Drive",
    body: "Sign in with Google once. BladeVault asks only for drive.file access, so it can see the files it creates and nothing else in your Drive.",
  },
  {
    icon: FolderArchive,
    title: "Back up automatically",
    body: "Turn on Automatic backup to Google Drive and BladeVault keeps one archive of records, notes, history, and images current in a BladeVault folder in your Drive. It never touches BladeVault servers.",
  },
  {
    icon: RefreshCcw,
    title: "Restore anywhere",
    body: "On a new computer, open Settings → Backup & Restore, sign in to the same Google account, and restore. Local ZIP backup sits on the same tab.",
  },
]

const recentlyShipped = [
  "Atrium style",
  "Split-flap Studio showcase",
  "One Backup & Restore tab",
  "Automatic Drive backup",
  "Amazon listing import",
  "Kershaw gallery scraping",
  "Calendar map in Classic",
  "Notes button in every theme",
]

const recentVersions = releases.slice(0, 3).map((release) => release.version)

export function HomepageBackup() {
  return (
    <section id="backup" className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionKicker}>
          <span className={styles.newBadge}>New</span>
          Google Drive backup &middot; {releases[0].version}
        </p>
        <h2>Your vault, safe in your own cloud.</h2>
        <p className={styles.sectionIntro}>
          BladeVault still lives on your computer. It can also back itself up to
          the Google Drive you already have, automatically, and bring the whole
          collection back on any device signed in to the same account.
        </p>
      </div>

      <div className={styles.backupStage}>
        <div className={styles.backupNode}>
          <span className={styles.backupNodeIcon} aria-hidden="true">
            <Laptop />
          </span>
          <strong>This computer</strong>
          <span>SQLite + images, local</span>
        </div>

        <div className={styles.backupLink} aria-hidden="true">
          <span>Back up</span>
        </div>

        <div className={styles.backupCloud}>
          <CloudMark className={styles.backupCloudArt} />
          <div className={styles.backupCloudLabel}>
            <strong>Your Google Drive</strong>
            <span>BladeVault / bladevault-data.tar.gz</span>
          </div>
        </div>

        <div
          className={`${styles.backupLink} ${styles.backupLinkOut}`}
          aria-hidden="true"
        >
          <span>Restore</span>
        </div>

        <div className={styles.backupNode}>
          <span className={styles.backupNodeIcon} aria-hidden="true">
            <Tablet />
          </span>
          <strong>Any other device</strong>
          <span>Same Google account</span>
        </div>
      </div>

      <ol className={styles.backupSteps}>
        {steps.map(({ icon: Icon, title, body }, index) => (
          <li key={title} className={styles.backupStep}>
            <span className={styles.featureIcon} aria-hidden="true">
              <Icon />
            </span>
            <div>
              <small>0{index + 1}</small>
              <strong>{title}</strong>
              <p>{body}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.alsoIncluded} aria-label="Recently shipped">
        <b>
          Also new in {recentVersions.at(-1)}&ndash;{recentVersions[0]}
        </b>
        {recentlyShipped.map((item) => (
          <span key={item}>{item}</span>
        ))}
        <Link href="/whats-new" className={styles.alsoIncludedLink}>
          All release notes
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
