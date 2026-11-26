"use client"

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type SubmitEvent,
} from "react"
import {
  ArrowUp,
  ChevronDown,
  Search,
  Square,
  TriangleAlert,
  Wrench,
} from "lucide-react"

import { cn } from "@/lib/utils"

import base from "./homepage-v3.module.css"
import styles from "./homepage-chat.module.css"

// A scripted copy of BladeVault's Chat page (v2.6). The four questions are the
// app's own suggestions; answers use the example vault shown elsewhere on the
// page. Nothing is sent anywhere: the replies are written into this file.

type Reasoning = "Off" | "Low" | "Medium" | "High"

const reasoningLevels: Reasoning[] = ["Off", "Low", "Medium", "High"]

// How long the demo "thinks" before the first lookup, per reasoning level.
const thinkMs: Record<Reasoning, number> = {
  Off: 350,
  Low: 900,
  Medium: 1400,
  High: 2000,
}

const models = [
  "qwen3:14b · Ollama, local",
  "glm-4.6 · OpenCode Go",
  "gpt-4.1-mini · OpenAI",
]

type Script = {
  question: string
  title: string
  tool: string
  ui: ReactNode
  answer: string
}

const scripts: Script[] = [
  {
    question: "Show me all price drops from the last week",
    title: "Price drops this week",
    tool: "Listed drops · last 7 days · 4 changes",
    ui: (
      <Table
        head={["Knife", "Change", "Price", "Store", "When"]}
        rows={[
          ["Vosteed Kroc 329", "−35%", "$90.35|$139", "SMKW", "today"],
          [
            "Vosteed Raccoon TiSlim",
            "−30%",
            "$94.50|$135",
            "Blade HQ",
            "3 days ago",
          ],
          [
            "Spyderco Native Chief LW",
            "−25%",
            "$161.25|$215",
            "SMKW",
            "4 days ago",
          ],
          ["Spyderco Military 2", "−25%", "$220.50|$294", "SMKW", "5 days ago"],
        ]}
      />
    ),
    answer:
      "Four Wishlist knives dropped this week. The Kroc 329 is the deepest cut at 35% off, and the Raccoon TiSlim is at its lowest price so far. SMKW has three of the four, so one order there would cover most of them.",
  },
  {
    question: "What needs attention in price monitoring?",
    title: "Price monitoring check-up",
    tool: "Checked attention · 3 watches",
    ui: (
      <Table
        head={["Knife", "State", "Best price", "Regular", "Checked"]}
        rows={[
          ["Vosteed Nymble", "Out of stock everywhere", "—", "$59", "2h ago"],
          [
            "Vosteed Raccoon TiSlim",
            "DLT page failed twice",
            "$94.50",
            "$135",
            "6h ago",
          ],
          ["Kizer Dingo", "No regular price", "$64.96", "—", "1d ago"],
        ]}
      />
    ),
    answer:
      "Three watches need you. The Nymble is out of stock at all three stores, so it stays on the restock watch. DLT Trading failed twice for the Raccoon TiSlim; the other three stores are fine. The Dingo has no regular price, so BladeVault can't tell whether $64.96 is a deal: add one on the knife.",
  },
  {
    question: "Which knives are missing a steel?",
    title: "Knives missing a steel",
    tool: "Found missing fields · steel · 4 knives",
    ui: (
      <Cards
        knives={[
          ["Kizer Dingo", "Kizer · Folder", "$64.96"],
          ["Vosteed Nymble", "Vosteed · Folder", "$59"],
          ["CIVIVI Elementum", "CIVIVI · Folder", "$54"],
          ["WE Banter", "WE Knife · Folder", "$79"],
        ]}
      />
    ),
    answer:
      "Four knives have no steel recorded. All four still have their product link, so the maker page should list it. An MCP client can propose the missing values for you to review.",
  },
  {
    question: "Give me a short summary of my collection",
    title: "Collection summary",
    tool: "Read collection stats · 220 knives",
    ui: (
      <Stats
        items={[
          ["Knives", "220"],
          ["Makers", "35"],
          ["Median blade", "80.45 mm"],
          ["Fields filled", "95%"],
        ]}
      />
    ),
    answer:
      "220 knives from 35 makers in 127 model families, mostly folders. The median blade is 80.45 mm. Records are 95% complete; 55 have a gap, mostly steel and blade length. Eleven knives are pinned as favorites.",
  },
]

type Turn = {
  id: number
  script: Script
  phase: "thinking" | "lookup" | "answering" | "done"
  words: number
  stopped?: boolean
  open: boolean
}

export function HomepageChatDemo() {
  const [model, setModel] = useState(models[0])
  const [reasoning, setReasoning] = useState<Reasoning>("Low")
  const [turns, setTurns] = useState<Turn[]>([])
  const [draft, setDraft] = useState("")
  const [hint, setHint] = useState("")
  const reduced = useRef(false)
  const timers = useRef<number[]>([])
  const streamRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  const busy = turns.some((t) => t.phase !== "done")
  const current = turns.at(-1)

  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    const pending = timers.current
    return () => pending.forEach((id) => window.clearTimeout(id))
  }, [])

  // Keep the newest part of the answer in view inside the window only.
  useEffect(() => {
    const node = streamRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [turns])

  const later = (ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  const update = (id: number, patch: (turn: Turn) => Partial<Turn>) =>
    setTurns((all) =>
      all.map((turn) => (turn.id === id ? { ...turn, ...patch(turn) } : turn))
    )

  const ask = (script: Script) => {
    if (busy) return
    setHint("")
    setDraft("")
    const id = nextId.current++
    const words = script.answer.split(" ").length
    setTurns((all) => [
      ...all.slice(-2),
      { id, script, phase: "thinking", words: 0, open: false },
    ])

    if (reduced.current) {
      update(id, () => ({ phase: "done", words }))
      return
    }

    later(thinkMs[reasoning], () => update(id, () => ({ phase: "lookup" })))
    later(thinkMs[reasoning] + 700, () => {
      update(id, () => ({ phase: "answering" }))
      let shown = 0
      const tick = () => {
        shown += 1
        const done = shown >= words
        update(id, () => (done ? { words, phase: "done" } : { words: shown }))
        if (!done) later(45, tick)
      }
      tick()
    })
  }

  // Stop keeps the part of the answer that is already on screen, like the app.
  const stop = () => {
    timers.current.forEach((id) => window.clearTimeout(id))
    timers.current = []
    setTurns((all) =>
      all.map((turn) =>
        turn.phase === "done" ? turn : { ...turn, phase: "done", stopped: true }
      )
    )
  }

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (busy) return stop()
    const text = draft.trim()
    if (!text) {
      setHint("Type a question or pick one of the examples.")
      return
    }
    const match = scripts.find(
      (s) => s.question.toLowerCase() === text.toLowerCase()
    )
    if (match) return ask(match)
    setHint(
      "This demo answers the four example questions. In BladeVault, Chat answers anything about your own vault."
    )
  }

  return (
    <div className={cn(base.window, styles.window)}>
      <div className={base.windowBar}>
        <span className={base.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>BladeVault / Chat</span>
        <span className={styles.usage}>Today 3 of 100 requests</span>
      </div>

      <div className={styles.body}>
        <aside className={styles.list} aria-label="Saved chats">
          <span className={styles.newChat}>+ New chat</span>
          <span className={styles.search}>
            <Search aria-hidden="true" />
            Search chats
          </span>
          <span className={styles.listTabs}>
            <b>Active</b>
            <span>Archived</span>
          </span>
          {current ? (
            <span className={styles.listItem} data-on>
              {current.script.title}
            </span>
          ) : null}
          <span className={styles.listItem}>Para 3 care</span>
          <span className={styles.listItem}>Steels by maker</span>
          <span className={styles.listItem}>Best deal under $100</span>
        </aside>

        <div className={styles.main}>
          <header className={styles.head}>
            <span className={styles.headTitle}>
              <strong>{current?.script.title ?? "New chat"}</strong>
              <small>Reads your vault; changes nothing</small>
            </span>
            <span className={styles.picker}>
              <label className={styles.model}>
                <span className="sr-only">Model</span>
                <select
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  disabled={busy}
                >
                  {models.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <ChevronDown aria-hidden="true" />
              </label>
              <span
                className={styles.reasoning}
                role="radiogroup"
                aria-label="Reasoning"
              >
                {reasoningLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    role="radio"
                    aria-checked={reasoning === level}
                    onClick={() => setReasoning(level)}
                    disabled={busy}
                  >
                    {level}
                  </button>
                ))}
              </span>
            </span>
          </header>

          <div ref={streamRef} className={styles.stream} aria-live="polite">
            {turns.length === 0 ? (
              <div className={styles.empty}>
                <strong>Ask about your vault</strong>
                <p>
                  Knives, collection stats, price watches, drops and
                  maintenance. Answers come with the knife cards and tables they
                  are based on.
                </p>
              </div>
            ) : (
              turns.map((turn) => (
                <TurnView
                  key={turn.id}
                  turn={turn}
                  reasoning={reasoning}
                  onToggle={() => update(turn.id, (t) => ({ open: !t.open }))}
                />
              ))
            )}
          </div>

          <div className={styles.suggestions}>
            {scripts.map((script) => (
              <button
                key={script.question}
                type="button"
                onClick={() => ask(script)}
                disabled={busy}
              >
                {script.question}
              </button>
            ))}
          </div>

          <form className={styles.composer} onSubmit={submit}>
            <label className="sr-only" htmlFor="chat-demo-input">
              Ask about your knives
            </label>
            <input
              id="chat-demo-input"
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value)
                setHint("")
              }}
              placeholder="Ask about your knives, prices or maintenance…"
              autoComplete="off"
              aria-describedby="chat-demo-hint"
            />
            <button
              type="submit"
              aria-label={busy ? "Stop" : "Send"}
              className={styles.send}
            >
              {busy ? (
                <Square aria-hidden="true" />
              ) : (
                <ArrowUp aria-hidden="true" />
              )}
            </button>
          </form>
          <p
            id="chat-demo-hint"
            className={styles.hint}
            data-error={hint ? true : undefined}
          >
            {hint ||
              "Knife records the chat looks up are sent to your AI provider. With a local model, nothing leaves your computer."}
          </p>
        </div>
      </div>
    </div>
  )
}

function TurnView({
  turn,
  reasoning,
  onToggle,
}: {
  turn: Turn
  reasoning: Reasoning
  onToggle: () => void
}) {
  const { script, phase } = turn
  const looked = phase !== "thinking"
  const words = script.answer.split(" ")
  const answer =
    phase === "done" && !turn.stopped
      ? script.answer
      : words.slice(0, turn.words).join(" ")

  return (
    <div className={styles.turn}>
      <p className={styles.you}>{script.question}</p>

      {phase === "thinking" ? (
        <p className={styles.thinking}>
          {reasoning === "Off"
            ? "Looking it up…"
            : `Thinking · ${reasoning.toLowerCase()}…`}
        </p>
      ) : null}

      {looked ? (
        <div className={styles.step}>
          <button type="button" onClick={onToggle} aria-expanded={turn.open}>
            <Wrench aria-hidden="true" />
            {script.tool}
            <ChevronDown
              aria-hidden="true"
              data-open={turn.open || undefined}
            />
          </button>
          {turn.open ? (
            <p className={styles.stepDetail}>
              One read-only lookup in your vault. The model saw these rows,
              trimmed to what it needs.
            </p>
          ) : null}
        </div>
      ) : null}

      {looked ? <div className={styles.ui}>{script.ui}</div> : null}

      {answer ? (
        <p className={styles.answer}>
          {answer}
          {phase === "answering" ? (
            <span className={styles.caret} aria-hidden="true" />
          ) : null}
        </p>
      ) : null}

      {turn.stopped ? (
        <p className={styles.stopped}>
          <TriangleAlert aria-hidden="true" />
          Stopped. The partial answer is kept.
        </p>
      ) : null}
    </div>
  )
}

/* ---------- answer parts, shaped like the app's tool results ---------- */

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => {
                const [now, was] = cell.split("|")
                return (
                  <td key={i} data-down={cell.startsWith("−") || undefined}>
                    {now}
                    {was ? <s>{was}</s> : null}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Cards({ knives }: { knives: [string, string, string][] }) {
  return (
    <ul className={styles.cards}>
      {knives.map(([name, meta, price]) => (
        <li key={name}>
          <span className={styles.cardThumb} aria-hidden="true" />
          <span>
            <strong>{name}</strong>
            <small>{meta}</small>
          </span>
          <b>{price}</b>
        </li>
      ))}
    </ul>
  )
}

function Stats({ items }: { items: [string, string][] }) {
  return (
    <dl className={styles.stats}>
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}
