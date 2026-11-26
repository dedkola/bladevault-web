"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import { Check, Pause, Play, Repeat, RotateCcw, Terminal } from "lucide-react"

import { cn } from "@/lib/utils"

import { KnifeGlyph } from "./knife-glyph"

import styles from "./homepage-ai.module.css"
import base from "./homepage-v3.module.css"

// Four looping MCP conversations for the AI section. Each scene types its
// prompt, then reveals the parts marked with `at` one step at a time.
//
// Data notes: price drops are a real answer from the author's vault on
// 2026-11-23 (list_price_changes + get_price_attention). Blades over 4 in and
// missing blade lengths come from the same vault on 2026-11-25 (get_knife,
// find_missing_fields). The Para 3 record is an example; add_knife previews
// first (photos included, v2.6) and saves only on `apply` with the preview hash.

export type SceneId = "add" | "price" | "long" | "missing"

type Scene = {
  id: SceneId
  label: string
  prompt: string
  write?: boolean
  /** ms after typing ends at which step 1, 2, … appear */
  steps: number[]
  /** ms the finished answer stays up */
  hold: number
}

const scenes: Scene[] = [
  {
    id: "add",
    label: "Add a knife",
    prompt: "Add a Spyderco Para 3 with photos from its product page",
    write: true,
    steps: [350, 950, 1600, 4300, 4900, 5500],
    hold: 4000,
  },
  {
    id: "price",
    label: "Price drops",
    prompt: "Which wishlist knives dropped in price this week?",
    steps: [350, 900, 1500, 2600],
    hold: 4000,
  },
  {
    id: "long",
    label: "Blades over 4″",
    prompt: "Show me my knives with blades longer than 4 inches",
    steps: [350, 950, 1600, 2800],
    hold: 4000,
  },
  {
    id: "missing",
    label: "Missing data",
    prompt: "Which knives are missing a blade length?",
    steps: [350, 1000, 2400],
    hold: 4000,
  },
]

const TYPE_START = 400
const CHAR_MS = 40
const LOOP_KEY = "bv-ai-demo-loop"

const timeline = (() => {
  let start = 0
  return scenes.map((scene) => {
    const typeEnd = TYPE_START + scene.prompt.length * CHAR_MS
    const length = typeEnd + scene.steps[scene.steps.length - 1] + scene.hold
    const entry = { start, typeEnd, length }
    start += length
    return entry
  })
})()

const TOTAL = timeline.reduce((sum, t) => sum + t.length, 0)

/** Elapsed time at which a scene's answer is fully shown. */
const finishedAt = (index: number) =>
  timeline[index].start +
  timeline[index].typeEnd +
  scenes[index].steps[scenes[index].steps.length - 1] +
  400

type Frame = { index: number; step: number; chars: number }

function frameAt(elapsed: number): Frame {
  let index = timeline.findIndex((t) => elapsed < t.start + t.length)
  if (index === -1) index = scenes.length - 1
  const scene = scenes[index]
  const t = elapsed - timeline[index].start
  const { typeEnd } = timeline[index]

  let step = 0
  scene.steps.forEach((ms, i) => {
    if (t >= typeEnd + ms) step = i + 1
  })
  const chars =
    step > 0
      ? scene.prompt.length
      : Math.max(
          0,
          Math.min(scene.prompt.length, Math.floor((t - TYPE_START) / CHAR_MS))
        )
  return { index, step, chars }
}

const sameFrame = (a: Frame, b: Frame) =>
  a.index === b.index && a.step === b.step && a.chars === b.chars

const START = finishedAt(0)

export function HomepageAiDemo() {
  const [frame, setFrame] = useState<Frame>(() => frameAt(START))
  const [playing, setPlaying] = useState(true)
  const [loop, setLoop] = useState(true)

  const rootRef = useRef<HTMLDivElement>(null)
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const timeRef = useRef<HTMLSpanElement>(null)
  const elapsed = useRef(START)
  const visible = useRef(false)
  const reduced = useRef(false)
  const loopRef = useRef(loop)

  const paint = useCallback(() => {
    const now = elapsed.current
    timeline.forEach((t, i) => {
      const fill = fillRefs.current[i]
      if (!fill) return
      const p = Math.max(0, Math.min(1, (now - t.start) / t.length))
      fill.style.transform = `scaleX(${p})`
    })
    if (timeRef.current) {
      const sec = Math.floor(now / 1000)
      timeRef.current.textContent = `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`
    }
    const next = frameAt(now)
    setFrame((prev) => (sameFrame(prev, next) ? prev : next))
  }, [])

  const seek = useCallback(
    (ms: number, play: boolean) => {
      elapsed.current = ms
      setPlaying(play)
      paint()
    },
    [paint]
  )

  // Reduced motion and the saved loop choice are only known in the browser.
  useEffect(() => {
    reduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    let savedLoop = true
    try {
      savedLoop = window.localStorage.getItem(LOOP_KEY) !== "off"
    } catch {
      // Storage can be blocked; keep the default.
    }
    loopRef.current = savedLoop
    const id = requestAnimationFrame(() => {
      setLoop(savedLoop)
      if (reduced.current) setPlaying(false)
      paint()
    })
    return () => cancelAnimationFrame(id)
  }, [paint])

  // Only advance while the section is on screen.
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
      },
      { threshold: 0.25 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    let last = performance.now()
    let id = 0
    const tick = (now: number) => {
      if (visible.current) {
        elapsed.current += now - last
        if (elapsed.current >= TOTAL) {
          if (loopRef.current) {
            elapsed.current = 0
          } else {
            elapsed.current = TOTAL - 1
            setPlaying(false)
          }
        }
        paint()
      }
      last = now
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [playing, paint])

  const toggleLoop = () => {
    const next = !loop
    setLoop(next)
    loopRef.current = next
    try {
      window.localStorage.setItem(LOOP_KEY, next ? "on" : "off")
    } catch {
      // Storage can be blocked; the choice lasts for this visit.
    }
  }

  const togglePlay = () => {
    // Play at the very end starts over.
    if (!playing && elapsed.current >= TOTAL - 1) elapsed.current = 0
    setPlaying(!playing)
  }

  const goTo = (index: number) => {
    if (reduced.current) seek(finishedAt(index), false)
    else seek(timeline[index].start, true)
  }

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const dir =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    if (!dir) return
    event.preventDefault()
    const next = (index + dir + scenes.length) % scenes.length
    document.getElementById(`ai-demo-tab-${scenes[next].id}`)?.focus()
    goTo(next)
  }

  const active = scenes[frame.index]

  return (
    <div ref={rootRef} className={base.window} data-scene={active.id}>
      <div className={cn(base.windowBar, styles.demoBar)}>
        <span className={base.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span
          className={styles.tabs}
          role="tablist"
          aria-label="Example conversations"
        >
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              id={`ai-demo-tab-${scene.id}`}
              type="button"
              role="tab"
              aria-selected={i === frame.index}
              aria-controls={`ai-demo-panel-${scene.id}`}
              tabIndex={i === frame.index ? 0 : -1}
              onClick={() => goTo(i)}
              onKeyDown={(event) => onTabKey(event, i)}
            >
              {scene.label}
            </button>
          ))}
        </span>
        <span
          className={styles.readOnly}
          data-write={active.write || undefined}
        >
          {active.write ? "write on" : "read-only"}
        </span>
      </div>

      <div className={styles.panels}>
        {scenes.map((scene, i) => {
          const isActive = i === frame.index
          // Inactive panels render finished so every panel keeps its full height.
          const step = isActive ? frame.step : Infinity
          const chars = isActive ? frame.chars : scene.prompt.length
          return (
            <div
              key={scene.id}
              id={`ai-demo-panel-${scene.id}`}
              role="tabpanel"
              aria-labelledby={`ai-demo-tab-${scene.id}`}
              aria-hidden={!isActive}
              inert={!isActive}
              className={styles.panel}
            >
              <div className={styles.chat}>
                <p className={styles.you}>
                  <b>You</b>
                  {scene.prompt.slice(0, chars)}
                  {isActive && step === 0 ? (
                    <span className={styles.caret} aria-hidden="true" />
                  ) : null}
                </p>
                <SceneBody id={scene.id} step={step} />
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.player} aria-label="Demo playback">
        <button
          type="button"
          className={styles.playerButton}
          onClick={togglePlay}
          aria-label={playing ? "Pause demo" : "Play demo"}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
        <button
          type="button"
          className={styles.playerButton}
          onClick={() => seek(0, true)}
          aria-label="Replay from the start"
        >
          <RotateCcw aria-hidden="true" />
        </button>
        <div className={styles.track}>
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              type="button"
              className={styles.segment}
              aria-current={i === frame.index}
              aria-label={`Play: ${scene.label}`}
              onClick={() => goTo(i)}
            >
              <span className={styles.rail}>
                <span
                  ref={(node) => {
                    fillRefs.current[i] = node
                  }}
                  className={styles.fill}
                />
              </span>
              <span className={styles.segmentLabel}>{scene.label}</span>
            </button>
          ))}
        </div>
        <span ref={timeRef} className={styles.time} aria-hidden="true">
          0:00
        </span>
        <button
          type="button"
          className={styles.playerButton}
          onClick={toggleLoop}
          aria-pressed={loop}
          aria-label="Loop the demos"
          title={loop ? "Loop on" : "Loop off: play once and stop"}
        >
          <Repeat aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

/* ---------- scene bodies ---------- */

function Reveal({
  at,
  step,
  className,
  children,
  as: Tag = "div",
}: {
  at: number
  step: number
  className?: string
  children: ReactNode
  as?: "div" | "p" | "span" | "code"
}) {
  return (
    <Tag className={className} data-hidden={step < at || undefined}>
      {children}
    </Tag>
  )
}

function Calls({ children }: { children: ReactNode }) {
  return (
    <>
      <Terminal aria-hidden="true" />
      {children}
    </>
  )
}

function SceneBody({ id, step }: { id: SceneId; step: number }) {
  switch (id) {
    case "add":
      return <AddScene step={step} />
    case "price":
      return <PriceScene step={step} />
    case "long":
      return <LongScene step={step} />
    case "missing":
      return <MissingScene step={step} />
  }
}

const preview = [
  ["Brand", "Spyderco"],
  ["Name", "Para 3"],
  ["Model no.", "C223GP"],
  ["Steel", "CPM S45VN"],
  ["Blade", "2.95 in"],
  ["Lock", "Compression Lock"],
]

function AddScene({ step }: { step: number }) {
  return (
    <>
      <Reveal as="p" at={1} step={step} className={styles.calls}>
        <Calls>
          <code>search_knives</code>
          <Reveal as="span" at={2} step={step} className={styles.arrow}>
            →
          </Reveal>
          <Reveal as="code" at={2} step={step} className={styles.writeCall}>
            add_knife · preview + 4 photos
          </Reveal>
        </Calls>
      </Reveal>

      <Reveal at={3} step={step} className={styles.bot}>
        <p>
          <b>BladeVault</b>
          Here’s the record. Nothing is saved yet.
        </p>
        <div className={styles.preview}>
          <header>
            <span>Preview · not saved</span>
            <span className={styles.noDup}>
              <Check aria-hidden="true" />
              No duplicates found
            </span>
          </header>
          <dl>
            {preview.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className={styles.photoCheck}>
            <Check aria-hidden="true" />4 photos checked &middot; JPEG &middot;
            from spyderco.com
          </p>
          <footer>
            Say yes to save it. Preview <code>#a91f3c</code>
          </footer>
        </div>
      </Reveal>

      <Reveal as="p" at={4} step={step} className={styles.you}>
        <b>You</b>
        Yes, add it.
      </Reveal>

      <Reveal as="p" at={5} step={step} className={styles.calls}>
        <Calls>
          <code className={styles.writeCall}>add_knife · apply</code>
        </Calls>
      </Reveal>

      <Reveal at={6} step={step} className={styles.added}>
        <span className={styles.thumb}>
          <KnifeGlyph className={styles.thumbGlyph} />
          <span className={styles.thumbCount}>4 photos</span>
        </span>
        <span className={styles.addedMeta}>
          <span className={styles.addedTag}>Added to vault</span>
          <strong>Spyderco Para 3</strong>
          <span>Folder · CPM S45VN · G-10 · 4 photos · just now</span>
        </span>
      </Reveal>

      <p className={styles.status}>
        write on &middot; preview before save &middot; duplicates blocked
        &middot; write logged
      </p>
    </>
  )
}

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

function PriceScene({ step }: { step: number }) {
  return (
    <>
      <Reveal as="p" at={1} step={step} className={styles.calls}>
        <Calls>
          <code>list_price_changes</code>
          <Reveal as="code" at={2} step={step}>
            get_price_attention
          </Reveal>
        </Calls>
      </Reveal>

      <Reveal at={3} step={step} className={styles.bot}>
        <p>
          <b>BladeVault</b>
          Four dropped. Best deal is the Kroc 329, 35% under its last price.
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
      </Reveal>

      <Reveal as="p" at={4} step={step} className={styles.attention}>
        1 page to check: Vosteed Xeno at SMKW. AI doubts the price it read.
      </Reveal>

      <p className={styles.status}>read-only &middot; nothing changed</p>
    </>
  )
}

const longBlades = [
  { knife: "QSP T-Cook", steel: "Nitro-V", inches: 5.0 },
  { knife: "QSP Bison", steel: "D2", inches: 4.5 },
  { knife: "Kizer Ursa Major", steel: "Nitro-V", inches: 4.43 },
  { knife: "Kizer Pioneer Fix", steel: "M390", inches: 4.21 },
]

function LongScene({ step }: { step: number }) {
  return (
    <>
      <Reveal as="p" at={1} step={step} className={styles.calls}>
        <Calls>
          <code>search_knives</code>
          <Reveal as="span" at={2} step={step} className={styles.arrow}>
            →
          </Reveal>
          <Reveal as="code" at={2} step={step}>
            get_knife ×12
          </Reveal>
        </Calls>
      </Reveal>

      <Reveal at={3} step={step} className={styles.bot}>
        <p>
          <b>BladeVault</b>
          Here are four, all fixed blades. The T-Cook is the longest of them at
          5 inches.
        </p>
        <table className={cn(styles.drops, styles.plainTable)}>
          <thead>
            <tr>
              <th scope="col">Knife</th>
              <th scope="col">Steel</th>
              <th scope="col">Blade</th>
              <th scope="col">
                <span className="sr-only">Length bar</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {longBlades.map((row) => (
              <tr key={row.knife}>
                <th scope="row">{row.knife}</th>
                <td className={styles.store}>{row.steel}</td>
                <td className={styles.now}>{row.inches.toFixed(2)}″</td>
                <td className={styles.lengthCell}>
                  <span
                    className={styles.lengthBar}
                    style={{ width: `${(row.inches / 5) * 100}%` }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal as="p" at={4} step={step} className={styles.attention}>
        Your median blade is 3.18″, so these sit well above the rest of the
        vault.
      </Reveal>

      <p className={styles.status}>read-only &middot; nothing changed</p>
    </>
  )
}

const missing = [
  { knife: "Benchmade Bugout", also: "Steel, model no." },
  { knife: "DailyCarryCo Vanguard", also: "Steel, model no." },
  { knife: "CJRB Pyrite", also: "Steel looks wrong" },
  { knife: "Shooziz HAN306", also: "—" },
]

function MissingScene({ step }: { step: number }) {
  return (
    <>
      <Reveal as="p" at={1} step={step} className={styles.calls}>
        <Calls>
          <code>find_missing_fields</code>
        </Calls>
      </Reveal>

      <Reveal at={2} step={step} className={styles.bot}>
        <p>
          <b>BladeVault</b>
          Four knives have no blade length. Three of them have other gaps too.
        </p>
        <table className={cn(styles.drops, styles.plainTable)}>
          <thead>
            <tr>
              <th scope="col">Knife</th>
              <th scope="col">Blade length</th>
              <th scope="col">Also empty</th>
            </tr>
          </thead>
          <tbody>
            {missing.map((row) => (
              <tr key={row.knife}>
                <th scope="row">{row.knife}</th>
                <td>
                  <span className={styles.empty}>empty</span>
                </td>
                <td className={styles.store}>{row.also}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <Reveal as="p" at={3} step={step} className={styles.attention}>
        Want me to look these up and fill them in? You’ll see a preview before
        anything is saved.
      </Reveal>

      <p className={styles.status}>read-only &middot; nothing changed</p>
    </>
  )
}
