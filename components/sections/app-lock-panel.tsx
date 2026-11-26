import { LockKeyhole } from "lucide-react"

import { AppLockMock } from "./app-mocks"
import styles from "./homepage-ai.module.css"

const lockPoints = [
  "Off by default. Works offline.",
  "No account and no cloud dependency.",
  "Included in full-vault backups.",
]

// App lock: a tab of the homepage "everywhere" section.
export function AppLockPanel() {
  return (
    <div className={styles.lock}>
      <div className={styles.lockCopy}>
        <span className={styles.lockIcon} aria-hidden="true">
          <LockKeyhole />
        </span>
        <h3>Lock it when you step away.</h3>
        <p>
          Set a password in Settings &rarr; App lock, lock the vault from there,
          and change or turn it off later.
        </p>
        <ul>
          {lockPoints.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className={styles.lockNote}>
          A simple local access lock. The vault is not encrypted.
        </p>
      </div>

      <figure className={styles.lockShot}>
        <AppLockMock />
      </figure>
    </div>
  )
}
