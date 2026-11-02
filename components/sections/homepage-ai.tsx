import Image from "next/image"
import { LockKeyhole, Terminal } from "lucide-react"

import styles from "./homepage-v3.module.css"

const clients = ["Claude", "Codex", "Cursor", "LM Studio"]

const aiPoints = [
  "Permanent token and ready-to-copy client config.",
  "Write access is opt-in and audited.",
  "Metadata updates require the expected record timestamp.",
]

const lockPoints = [
  "Off by default. Works offline.",
  "No account and no cloud dependency.",
  "Included in full-vault backups.",
]

export function HomepageAi() {
  return (
    <section id="ai" className={styles.aiSection}>
      <div className={styles.aiHead}>
        <p className={styles.sectionKicker}>
          <span className={styles.sectionNum} aria-hidden="true">
            03
          </span>
          AI + privacy
        </p>
        <h2>Let AI read the vault. You keep the keys.</h2>
        <p className={styles.sectionIntro}>
          Connect Claude, Codex, Cursor, or a local model to your own database.
          Read-only by default; allow writes when you want AI to update records
          or log maintenance. Then set a local password and lock the vault when
          you step away.
        </p>
      </div>

      <div className={styles.aiGrid}>
        <article className={styles.aiCard}>
          <span className={styles.aiBadge}>
            <Terminal aria-hidden="true" />
            MCP &middot; 10 tools
          </span>
          <h3>Ask your own database.</h3>
          <p>
            Search records, find missing fields or duplicates, preview metadata
            changes, and log maintenance from the AI client you already use.
          </p>

          <div className={styles.chat} aria-label="Example MCP conversation">
            <p className={styles.you}>
              <b>YOU</b> Which folders under 3 oz are missing a designer?
            </p>
            <p className={styles.bot}>
              <b>BLADEVAULT</b> I found 4 matching records.
            </p>
            <pre>
              {`├─ Vosteed Mini Labrador
├─ Kizer Feist
├─ QSP Canary Folder
└─ CIVIVI Lumi`}
            </pre>
            <p className={styles.status}>
              read-only by default &middot; write mode optional
            </p>
          </div>

          <div className={styles.clientPills} aria-label="Supported AI clients">
            {clients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>

          <ul className={styles.aiPoints}>
            {aiPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <figure className={styles.aiShot}>
            <Image
              src="/screenshots/live/mcp-settings.jpg"
              alt="BladeVault AI and MCP settings showing MCP enabled, write access, and recent activity"
              width={900}
              height={270}
              sizes="(min-width: 1180px) 42vw, 92vw"
              quality={90}
            />
          </figure>
        </article>

        <article className={styles.lockCard}>
          <span className={styles.lockIcon} aria-hidden="true">
            <LockKeyhole />
          </span>
          <h3>Protect the vault.</h3>
          <p>
            Set a password in Settings &rarr; App lock. Lock now when you step
            away. Change or disable it later from the same panel.
          </p>

          <figure className={styles.lockShot}>
            <Image
              src="/screenshots/live/app-lock.jpg"
              alt="BladeVault App lock settings with password and confirm-password fields and an Enable App lock button"
              width={900}
              height={360}
              sizes="(min-width: 1180px) 30vw, 92vw"
              quality={90}
            />
          </figure>

          <ul className={styles.lockPoints}>
            {lockPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <p className={styles.lockNote}>
            A simple local access lock. The vault is not encrypted.
          </p>
        </article>
      </div>
    </section>
  )
}
