import Image from "next/image"
import { LockKeyhole, PenLine, ShieldCheck, Terminal } from "lucide-react"

import styles from "./homepage-ai.module.css"
import base from "./homepage-v3.module.css"

// Real answer from the author's vault on 2026-11-23 (list_price_changes +
// get_price_attention), matching the Wishlist section's numbers.
const drops = [
  {
    knife: "Vosteed Kroc 329",
    store: "Blade HQ",
    now: "$90.35",
    was: "$139",
    delta: "−35%",
  },
  {
    knife: "Vosteed Raccoon TiSlim",
    store: "Blade HQ",
    now: "$94.50",
    was: "$135",
    delta: "−30%",
  },
  {
    knife: "Spyderco Native Chief Lightweight",
    store: "SMKW",
    now: "$161.25",
    was: "$215",
    delta: "−25%",
  },
  {
    knife: "Spyderco Military 2",
    store: "SMKW",
    now: "$220.50",
    was: "$294",
    delta: "−25%",
  },
]

const clients = [
  "Claude Desktop · one click",
  "Codex",
  "Cursor",
  "ChatGPT",
  "OpenCode",
  "LM Studio",
]

type Tool = { label: string; write?: boolean }

const toolGroups: { title: string; tools: Tool[] }[] = [
  {
    title: "Collection",
    tools: [
      { label: "Search" },
      { label: "Full records" },
      { label: "Stats" },
      { label: "Missing fields" },
      { label: "Likely duplicates" },
      { label: "Preview changes" },
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
      { label: "Drops and restocks" },
      { label: "What needs attention" },
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
  "Permanent token and copy-ready config, or one click for Claude Desktop.",
  "Updates need the record's latest timestamp, so AI never overwrites newer edits.",
  "Changes show up in the open app at once, and every operation is logged.",
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
          database over MCP. Ask about your collection, your Wishlist deals or
          what needs oiling. Everything is read-only until you switch on write
          access, and every write is checked and logged.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.chatCol}>
          <div className={base.window}>
            <div className={base.windowBar}>
              <span className={base.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Claude &middot; bladevault MCP</span>
              <span className={styles.readOnly}>read-only</span>
            </div>

            <div className={styles.chat} aria-label="Example MCP conversation">
              <p className={styles.you}>
                <b>You</b>
                Which wishlist knives dropped in price this week?
              </p>

              <p className={styles.calls} aria-label="Tools called">
                <Terminal aria-hidden="true" />
                <code>list_price_changes</code>
                <code>get_price_attention</code>
              </p>

              <div className={styles.bot}>
                <p>
                  <b>BladeVault</b>
                  Four dropped. Best deal is the Kroc 329, 35% under its last
                  price.
                </p>

                <table className={styles.drops}>
                  <thead>
                    <tr>
                      <th scope="col">Knife</th>
                      <th scope="col">Store</th>
                      <th scope="col">Now</th>
                      <th scope="col">Was</th>
                      <th scope="col">
                        <span className="sr-only">Change</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {drops.map((drop) => (
                      <tr key={drop.knife}>
                        <th scope="row">{drop.knife}</th>
                        <td className={styles.store}>{drop.store}</td>
                        <td className={styles.now}>{drop.now}</td>
                        <td className={styles.was}>
                          <s>{drop.was}</s>
                        </td>
                        <td>
                          <span className={styles.delta}>{drop.delta}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className={styles.attention}>
                  1 page to check: Vosteed Xeno at SMKW. AI doubts the price it
                  read.
                </p>
              </div>

              <p className={styles.status}>
                read-only by default &middot; write access optional &middot;
                writes audited
              </p>
            </div>
          </div>

          <div className={styles.clients} aria-label="Supported AI clients">
            {clients.map((client) => (
              <span key={client}>{client}</span>
            ))}
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
                  <li key={tool.label} data-write={tool.write || undefined}>
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
          <Image
            src="/screenshots/live/app-lock-2x.jpg"
            alt="BladeVault App lock settings with password and confirm-password fields and an Enable App lock button"
            width={1520}
            height={730}
            sizes="(min-width: 1180px) 46vw, 92vw"
            quality={90}
          />
        </figure>
      </div>
    </section>
  )
}
