import Link from "next/link"
import { Archive, ArrowRight, Cpu, ShieldCheck, Table2 } from "lucide-react"

import { HomepageAiDemo } from "./homepage-ai-demo"
import styles from "./homepage-ai.module.css"
import chat from "./homepage-chat.module.css"
import { HomepageChatDemo } from "./homepage-chat-demo"
import base from "./homepage-v3.module.css"
import { McpSetupGenerator } from "./mcp-setup-generator"

const clients = [
  "Claude Desktop · one click",
  "Codex",
  "Cursor",
  "ChatGPT",
  "OpenCode",
  "LM Studio",
]

const guardRails = [
  "Writes are off by default. Nothing is saved without a preview first.",
  "Likely duplicates block an add: same name and brand, or the same model number.",
  "Updates need the record's latest timestamp, so AI never overwrites newer edits.",
  "Changes show up in the open app at once, and every write is logged.",
]

const chatPoints = [
  {
    icon: Cpu,
    title: "Any model, even a local one",
    body: "OpenCode Go, OpenAI or a gateway, or Ollama and LM Studio on your own computer. Pick the model and how much it reasons for each chat.",
  },
  {
    icon: Table2,
    title: "Answers show their records",
    body: "Every answer comes with the knife cards and price tables it was built from, so you can check it.",
  },
  {
    icon: Archive,
    title: "Chats stay in your vault",
    body: "Search, rename and archive them. Saved chats go into your backups with everything else.",
  },
]

export function HomepageAi() {
  return (
    <section id="ai" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          AI chat + MCP
          <span className={base.newBadge}>New in 2.6</span>
        </p>
        <h2>Ask your vault anything. You keep the keys.</h2>
        <p className={base.sectionIntro}>
          Chat is built into BladeVault and uses the AI you already connected,
          from a model on your own computer to any OpenAI-compatible endpoint.
          Prefer Claude, Codex or Cursor? Connect them over MCP. Everything is
          read-only until you switch on write access.
        </p>
      </div>

      <div className={chat.block}>
        <div className={chat.chatGrid}>
          <HomepageChatDemo />
          <div>
            <ul className={chat.points}>
              {chatPoints.map(({ icon: Icon, title, body }) => (
                <li key={title}>
                  <Icon aria-hidden="true" />
                  <div>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className={chat.runs}>
              Chat runs in the desktop app, Docker and Helm, not in the static
              web app. <Link href="/docs/guides/chat">Read the Chat guide</Link>
            </p>
          </div>
        </div>

        <div className={chat.subhead}>
          <h3>Or bring your own client.</h3>
          <p>
            Claude, Codex, Cursor and other MCP clients can search your vault
            and, with writes on, add a knife with its photos in one line.{" "}
            <Link href="/docs/reference/mcp">See all MCP tools</Link>
          </p>
        </div>
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
          <h3 id="ai-tools-title">Read-only until you allow writes.</h3>
          <ul className={styles.rails}>
            {guardRails.map((point) => (
              <li key={point}>
                <ShieldCheck aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
          <McpSetupGenerator />
        </aside>
      </div>
    </section>
  )
}
