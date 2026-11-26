import Link from "next/link"
import {
  Archive,
  ArrowRight,
  Camera,
  Cpu,
  MessageSquare,
  PenLine,
  PlugZap,
  ShieldCheck,
  Table2,
} from "lucide-react"

import { HomepageAiDemo, type SceneId } from "./homepage-ai-demo"
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

// Where each way of asking fits. Copy follows docs/guides/chat.md and
// docs/reference/mcp.md in the app repo.
const compareRows: [label: string, chat: string, mcp: string][] = [
  ["Setup", "One AI connection in Settings", "Paste one command or config"],
  [
    "Model",
    "Any OpenAI-compatible or local model",
    "Whatever your client runs",
  ],
  ["Changes", "Read-only", "Writes after a preview, logged"],
  ["Runs in", "Desktop app, Docker, Helm", "Claude, Codex, Cursor, LM Studio"],
  ["Best for", "Quick questions, deals, gaps", "Adding knives, bulk fixes"],
]

export function HomepageAi() {
  return (
    <section id="ai" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          <span className={base.sectionNum} aria-hidden="true">
            01
          </span>
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
            Claude, Codex, Cursor and other MCP clients get 21 tools. With
            writes on, they can add a knife with its photos in one line.
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

      <div className={`${chat.block} ${chat.setupGrid}`}>
        <McpSetupGenerator />

        <div className={chat.compare}>
          <h3>Chat or MCP?</h3>
          <div className={chat.compareCols}>
            {(["Chat in the app", "An MCP client"] as const).map(
              (name, col) => (
                <div key={name} className={chat.compareCol}>
                  <h4>
                    {col === 0 ? (
                      <MessageSquare aria-hidden="true" />
                    ) : (
                      <PlugZap aria-hidden="true" />
                    )}
                    {name}
                  </h4>
                  <dl>
                    {compareRows.map(([label, a, b]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{col === 0 ? a : b}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
