"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react"
import {
  ArrowUp,
  ChevronDown,
  Heart,
  MessageSquare,
  Pause,
  Play,
  TrendingDown,
  BellRing,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import base from "./homepage-v3.module.css"
import { KnifePhoto, type KnifePhotoId } from "./knife-photo"
import styles from "./hero-window.module.css"

// The hero's app window: three coded scenes from the example vault that play
// in turn. Prices match the Wishlist section (the author's vault on Nov 23,
// 2026); the chat answer is an example of what Chat returns for that data.

type SceneId = "chat" | "wishlist" | "drops"

const scenes: { id: SceneId; label: string; icon: LucideIcon; path: string }[] =
  [
    { id: "chat", label: "Chat", icon: MessageSquare, path: "Chat" },
    { id: "wishlist", label: "Wishlist", icon: Heart, path: "Wishlist" },
    { id: "drops", label: "Price Drops", icon: TrendingDown, path: "Prices" },
  ]

const SCENE_MS = 8000

/** Reveal delay for a part of a scene, read by `.reveal` in the CSS. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties

export function HeroWindow() {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  // Bumped on every scene change so the reveal animation runs again.
  const [round, setRound] = useState(0)

  const rootRef = useRef<HTMLElement>(null)
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([])
  const elapsed = useRef(0)
  const visible = useRef(true)
  const hovered = useRef(false)

  const show = useCallback((index: number) => {
    elapsed.current = 0
    fillRefs.current.forEach((fill) => {
      if (fill) fill.style.transform = "scaleX(0)"
    })
    setActive(index)
    setRound((r) => r + 1)
  }, [])

  // No autoplay for visitors who ask for reduced motion.
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = requestAnimationFrame(() => setPlaying(false))
    return () => cancelAnimationFrame(id)
  }, [])

  // Only advance while the window is on screen.
  useEffect(() => {
    const node = rootRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!playing) return
    let last = performance.now()
    let id = 0
    const tick = (now: number) => {
      if (visible.current && !hovered.current) {
        elapsed.current += now - last
        const fill = fillRefs.current[active]
        if (fill)
          fill.style.transform = `scaleX(${Math.min(1, elapsed.current / SCENE_MS)})`
        if (elapsed.current >= SCENE_MS) {
          show((active + 1) % scenes.length)
          return
        }
      }
      last = now
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [playing, active, show])

  const onTabKey = (event: React.KeyboardEvent, index: number) => {
    const dir =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    if (!dir) return
    event.preventDefault()
    const next = (index + dir + scenes.length) % scenes.length
    document.getElementById(`hero-tab-${scenes[next].id}`)?.focus()
    show(next)
  }

  return (
    <figure
      ref={rootRef}
      className={cn(base.window, styles.window)}
      onPointerEnter={() => (hovered.current = true)}
      onPointerLeave={() => (hovered.current = false)}
      onFocus={() => (hovered.current = true)}
      onBlur={() => (hovered.current = false)}
    >
      <div className={cn(base.windowBar, styles.bar)}>
        <span className={base.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.path} aria-hidden="true">
          BladeVault / {scenes[active].path}
        </span>
        <span
          className={styles.tabs}
          role="tablist"
          aria-label="BladeVault screens"
        >
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              id={`hero-tab-${scene.id}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`hero-panel-${scene.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => show(i)}
              onKeyDown={(event) => onTabKey(event, i)}
              className={styles.tab}
            >
              <scene.icon aria-hidden="true" />
              {scene.label}
              <span className={styles.track} aria-hidden="true">
                <span
                  ref={(node) => {
                    fillRefs.current[i] = node
                  }}
                  className={styles.fill}
                />
              </span>
            </button>
          ))}
        </span>
        <button
          type="button"
          className={styles.play}
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause the screens" : "Play the screens"}
        >
          {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
        </button>
      </div>

      <div className={styles.panels}>
        {scenes.map((scene, i) => {
          const isActive = i === active
          return (
            <div
              key={isActive ? `${scene.id}-${round}` : scene.id}
              id={`hero-panel-${scene.id}`}
              role="tabpanel"
              aria-labelledby={`hero-tab-${scene.id}`}
              aria-hidden={!isActive}
              inert={!isActive}
              data-active={isActive || undefined}
              className={styles.panel}
            >
              {scene.id === "chat" ? <ChatScene /> : null}
              {scene.id === "wishlist" ? <WishlistScene /> : null}
              {scene.id === "drops" ? <DropsScene /> : null}
            </div>
          )
        })}
      </div>
    </figure>
  )
}

/* ---------- Chat ---------- */

const weekDrops = [
  ["kroc", "Vosteed Kroc 329", "−35%", "$90.35", "$139", "SMKW", "today"],
  [
    "raccoon",
    "Vosteed Raccoon TiSlim",
    "−30%",
    "$94.50",
    "$135",
    "Blade HQ",
    "3d",
  ],
  [
    "nativeChief",
    "Spyderco Native Chief LW",
    "−25%",
    "$161.25",
    "$215",
    "SMKW",
    "4d",
  ],
  ["military", "Spyderco Military 2", "−25%", "$220.50", "$294", "SMKW", "5d"],
] as const

function ChatScene() {
  return (
    <div className={styles.chat}>
      <aside className={styles.chatList} aria-hidden="true">
        <span className={styles.newChat}>+ New chat</span>
        <b>Today</b>
        <span data-on>Price drops this week</span>
        <span>Knives missing a steel</span>
        <b>Earlier</b>
        <span>Collection summary</span>
        <span>Para Military 2 care</span>
      </aside>

      <div className={styles.chatMain}>
        <div className={styles.chatHead}>
          <span>
            <strong>Price drops this week</strong>
            <small>Reads your vault; changes nothing</small>
          </span>
          <span className={styles.picker}>
            qwen3 · local
            <i>Reasoning: Low</i>
            <ChevronDown aria-hidden="true" />
          </span>
        </div>

        <p className={cn(styles.you, styles.reveal)} style={delay(0)}>
          Show me all price drops from the last week
        </p>

        <p className={cn(styles.tool, styles.reveal)} style={delay(700)}>
          <TrendingDown aria-hidden="true" />
          Listed drops &middot; last 7 days &middot; 4 changes
        </p>

        <table className={cn(styles.table, styles.reveal)} style={delay(1200)}>
          <thead>
            <tr>
              <th>Knife</th>
              <th>Change</th>
              <th>Price</th>
              <th>Store</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {weekDrops.map(([photo, name, change, price, was, store, when]) => (
              <tr key={name}>
                <td>
                  <span className={styles.knifeCell}>
                    <KnifePhoto
                      id={photo}
                      className={styles.thumbSm}
                      sizes="48px"
                    />
                    <span>{name}</span>
                  </span>
                </td>
                <td className={styles.down}>{change}</td>
                <td>
                  {price} <s>{was}</s>
                </td>
                <td>{store}</td>
                <td>{when}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className={cn(styles.answer, styles.reveal)} style={delay(2000)}>
          Four knives dropped this week. The <b>Kroc 329</b> is the deepest cut
          at 35% off, and the <b>Raccoon TiSlim</b> is at its lowest price yet.
          SMKW has three of the four.
        </p>

        <div className={styles.composer} aria-hidden="true">
          Ask about your knives, prices or maintenance&hellip;
          <span>
            <ArrowUp />
          </span>
        </div>
      </div>
    </div>
  )
}

/* ---------- Wishlist ---------- */

const topDeals = [
  ["Best deal", "raccoon", "Raccoon TiSlim", "$94.50", "−30%"],
  ["2", "kroc", "Kroc 329", "$90.35", "−35%"],
  ["3", "nativeChief", "Native Chief LW", "$161.25", "−25%"],
] as const

// 30-day best price as a share of the regular price, oldest first.
const wishRows: {
  photo: KnifePhotoId
  name: string
  brand: string
  state: string
  price: string
  trend: number[]
}[] = [
  {
    photo: "military",
    name: "Military 2",
    brand: "Spyderco · 2 stores",
    state: "On sale −25%",
    price: "$220.50",
    trend: [100, 100, 100, 92, 92, 75, 75],
  },
  {
    photo: "porcupine",
    name: "Porcupine",
    brand: "Vosteed · 3 stores",
    state: "Restocked",
    price: "$69",
    trend: [100, 100, 100, 100, 100, 100, 100],
  },
  {
    photo: "dingo",
    name: "Dingo",
    brand: "Kizer · 3 stores",
    state: "Regular price",
    price: "$64.96",
    trend: [100, 104, 104, 100, 100, 100, 100],
  },
]

function Trend({ points }: { points: number[] }) {
  const step = 60 / (points.length - 1)
  const path = points
    .map(
      (p, i) => `${(i * step).toFixed(1)},${(22 - (p - 70) * 0.55).toFixed(1)}`
    )
    .join(" ")
  return (
    <svg viewBox="0 0 60 24" className={styles.trend} aria-hidden="true">
      <polyline points={path} />
    </svg>
  )
}

function WishlistScene() {
  return (
    <div className={styles.wish}>
      <div className={cn(styles.stats, styles.reveal)} style={delay(0)}>
        <span>
          <small>Watching</small>
          <b>50</b>
        </span>
        <span>
          <small>On sale now</small>
          <b>12</b>
        </span>
        <span>
          <small>Off today</small>
          <b>$639</b>
        </span>
        <span>
          <small>Price Drops watches</small>
          <b>50 / 50</b>
        </span>
      </div>

      <div className={styles.deals}>
        {topDeals.map(([rank, photo, name, price, pct], i) => (
          <div
            key={name}
            className={cn(styles.deal, styles.reveal)}
            style={delay(400 + i * 250)}
          >
            <KnifePhoto
              id={photo}
              className={styles.dealPhoto}
              sizes="(min-width: 1100px) 180px, 30vw"
            />
            <small>{rank === "Best deal" ? rank : `#${rank}`}</small>
            <strong>{name}</strong>
            <span>
              {price} <em>{pct}</em>
            </span>
          </div>
        ))}
      </div>

      <ul className={styles.rows}>
        {wishRows.map((row, i) => (
          <li
            key={row.name}
            className={styles.reveal}
            style={delay(1400 + i * 200)}
          >
            <KnifePhoto id={row.photo} className={styles.thumb} sizes="64px" />
            <span>
              <strong>{row.name}</strong>
              <small>{row.brand}</small>
            </span>
            <span className={styles.state}>{row.state}</span>
            <Trend points={row.trend} />
            <b>{row.price}</b>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- Price Drops ---------- */

// Step lines per store over 30 days, y = price.
const storeLines = [
  {
    store: "Blade HQ",
    note: "found by AI",
    price: "$94.50",
    tone: "gold",
    points: [135, 135, 135, 135, 121, 121, 94.5, 94.5],
  },
  {
    store: "SMKW",
    note: "lowest seen",
    price: "$94.50",
    tone: "olive",
    points: [135, 135, 129, 129, 129, 110, 94.5, 94.5],
  },
  {
    store: "vosteed.com",
    note: "brand site",
    price: "$135",
    tone: "muted",
    points: [135, 135, 135, 135, 135, 135, 135, 135],
  },
] as const

function stepPath(points: readonly number[]) {
  const x = (i: number) => (i * 300) / (points.length - 1)
  const y = (p: number) => 12 + (140 - p) * 1.6
  let d = `M0,${y(points[0]).toFixed(1)}`
  points.slice(1).forEach((p, i) => {
    d += ` H${x(i + 1).toFixed(1)} V${y(p).toFixed(1)}`
  })
  return d
}

function DropsScene() {
  return (
    <div className={styles.drops}>
      <div className={cn(styles.dropsHead, styles.reveal)} style={delay(0)}>
        <span>
          <strong>Price Drops</strong>
          <small>109 store pages &middot; Wishlist first</small>
        </span>
        <span className={styles.pass}>
          <i aria-hidden="true" />
          Collection: 40 of 232
        </span>
      </div>

      <div className={cn(styles.dropRow, styles.reveal)} style={delay(300)}>
        <KnifePhoto
          id="raccoon"
          className={styles.dropPhoto}
          sizes="(min-width: 700px) 200px, 30vw"
        />
        <span>
          <strong>Vosteed Raccoon TiSlim</strong>
          <small>Cheapest at Blade HQ &middot; 4 stores</small>
        </span>
        <span className={styles.dropPrice}>
          $94.50 <s>$135</s>
          <em>On sale −30%</em>
        </span>
      </div>

      <svg
        viewBox="0 0 300 80"
        preserveAspectRatio="none"
        className={cn(styles.chart, styles.reveal)}
        style={delay(600)}
        role="img"
        aria-label="30-day price per store: Blade HQ and SMKW fell to $94.50, the brand site stays at $135"
      >
        {storeLines.map((line) => (
          <path
            key={line.store}
            d={stepPath(line.points)}
            data-tone={line.tone}
          />
        ))}
      </svg>

      <ul className={styles.stores}>
        {storeLines.map((line, i) => (
          <li
            key={line.store}
            data-tone={line.tone}
            className={styles.reveal}
            style={delay(1100 + i * 200)}
          >
            <i aria-hidden="true" />
            <span>{line.store}</span>
            <small>{line.note}</small>
            <b>{line.price}</b>
          </li>
        ))}
        <li data-tone="out" className={styles.reveal} style={delay(1700)}>
          <i aria-hidden="true" />
          <span>DLT Trading</span>
          <small>out of stock</small>
          <b>&mdash;</b>
        </li>
      </ul>

      <p className={cn(styles.superSale, styles.reveal)} style={delay(2200)}>
        <BellRing aria-hidden="true" />
        Rest of the collection checked in free time &middot; alerts only at 50%
        below regular
      </p>
    </div>
  )
}
