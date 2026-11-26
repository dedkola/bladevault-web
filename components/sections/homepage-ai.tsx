import Link from "next/link"
import {
  ArrowRight,
  Camera,
  LockKeyhole,
  PenLine,
  ShieldCheck,
} from "lucide-react"

import { AppLockMock } from "./app-mocks"
import { HomepageAiDemo, type SceneId } from "./homepage-ai-demo"
import styles from "./homepage-ai.module.css"
import base from "./homepage-v3.module.css"

const clients = [
  "Claude Desktop · one click",
  "Codex",
  "Cursor",
  "ChatGPT",
  "OpenCode",
  "LM Studio",
]

// `scenes` lights the tool up while that demo plays (see homepage-ai-demo.tsx).
type Tool = { label: string; write?: boolean; scenes?: SceneId[] }

const toolGroups: { title: string; tools: Tool[] }[] = [
  {
    title: "Collection",
    tools: [
      { label: "Search", scenes: ["add", "long"] },
      { label: "Full records", scenes: ["long"] },
      { label: "Stats" },
      { label: "Missing fields", scenes: ["missing"] },
      { label: "Likely duplicates" },
      { label: "Preview changes" },
      { label: "Add a knife", write: true, scenes: ["add"] },
      { label: "Add photos by link", write: true },
      { label: "Refill photos from the product page", write: true },
      { label: "Update a knife", write: true },
      { label: "Bulk update after preview", write: true },
    ],
  },
  {
    title: "Price Drops",
    tools: [
      { label: "Watched knives" },
      { label: "One watch" },
      { label: "Price history" },
      { label: "Drops and restocks", scenes: ["price"] },
      { label: "What needs attention", scenes: ["price"] },
      { label: "Edit store links", write: true },
      { label: "Queue a check", write: true },
    ],
  },
  {
    title: "Care & trophies",
    tools: [
      { label: "Maintenance history" },
      { label: "Achievements and rank" },
      { label: "Log a care event", write: true },
    ],
  },
]

const toolCount = toolGroups.reduce((sum, group) => sum + group.tools.length, 0)

const guardRails = [
  "Writes are off by default. Nothing is saved without a preview first.",
  "Likely duplicates block an add: same name and brand, or the same model number.",
  "Updates need the record's latest timestamp, so AI never overwrites newer edits.",
  "Changes show up in the open app at once, and every write is logged.",
]

const lockPoints = [
  "Off by default. Works offline.",
  "No account and no cloud dependency.",
  "Included in full-vault backups.",
]

export function HomepageAi() {
  return (
    <section id="ai" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          <span className={base.sectionNum} aria-hidden="true">
            03
          </span>
          AI + privacy
        </p>
        <h2>Ask your vault anything. You keep the keys.</h2>
        <p className={base.sectionIntro}>
          Connect Claude, Codex, Cursor, ChatGPT or a local model to your own
          database over MCP. Find your longest blades, spot records with gaps,
          check Wishlist deals, or add a knife in one line. Everything is
          read-only until you switch on write access, and every write is
          previewed and logged.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.chatCol}>
          <HomepageAiDemo />

          <div className={styles.below}>
            <div className={styles.clients} aria-label="Supported AI clients">
              {clients.map((client) => (
                <span key={client}>{client}</span>
              ))}
            </div>
            <Link href="/docs/reference/mcp" className={styles.docsLink}>
              Connect a client and turn on writes
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <aside className={styles.tools} aria-labelledby="ai-tools-title">
          <h3 id="ai-tools-title">
            {toolCount} tools.
            <span> Read-only until you allow writes.</span>
          </h3>

          {toolGroups.map((group) => (
            <section key={group.title} className={styles.toolGroup}>
              <header>
                <h4>{group.title}</h4>
                <span>{group.tools.length}</span>
              </header>
              <ul>
                {group.tools.map((tool) => (
                  <li
                    key={tool.label}
                    data-write={tool.write || undefined}
                    data-scenes={tool.scenes?.join(" ")}
                  >
                    {tool.write ? (
                      <PenLine aria-label="Write" role="img" />
                    ) : null}
                    {tool.label}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <ul className={styles.rails}>
            {guardRails.map((point) => (
              <li key={point}>
                <ShieldCheck aria-hidden="true" />
                {point}
              </li>
            ))}
            <li className={styles.railNote}>
              <Camera aria-hidden="true" />
              Photos are checked before they are saved: https links only, real
              images only, up to 25 MB each.
            </li>
          </ul>
        </aside>
      </div>

      <div className={styles.lock}>
        <div className={styles.lockCopy}>
          <span className={styles.lockIcon} aria-hidden="true">
            <LockKeyhole />
          </span>
          <h3>Lock it when you step away.</h3>
          <p>
            Set a password in Settings &rarr; App lock, lock the vault from
            there, and change or turn it off later.
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
    </section>
  )
}
