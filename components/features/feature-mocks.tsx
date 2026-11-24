import type { CSSProperties, ReactNode } from "react"
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  BellOff,
  CalendarClock,
  Check,
  Droplet,
  Eye,
  HelpCircle,
  Lock,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Sparkles,
  Store,
  TrendingDown,
  Wrench,
} from "lucide-react"

import styles from "./feature-mocks.module.css"

// Coded mock screens for the feature tours. Regions carry data-region with
// the step numbers they illustrate; the tour highlights the active one.
// Figures describe an example vault, not live data.

type Region = { "data-region": string }
const region = (...steps: number[]): Region => ({
  "data-region": steps.join(" "),
})

const pct = (value: number) => ({ "--p": `${value}%` }) as CSSProperties

/* ---------- Wishlist ---------- */

const wishGroups = [
  {
    name: "Best deals",
    tone: "good",
    rows: [
      ["Vosteed Raccoon TiSlim", "$94.50", "$135", -30, 8, "down"],
      ["Spyderco Military 2", "$220.50", "$294", -25, 4, "down"],
    ],
  },
  {
    name: "On sale",
    tone: "sale",
    rows: [["CIVIVI Elementum II", "$41.60", "$52", -20, 22, "flat"]],
  },
  {
    name: "Watching",
    tone: "watch",
    rows: [["Benchmade Bugout", "$180", "$180", 0, 70, "up"]],
  },
] as const

const trendPaths = {
  down: "M0 6 L10 7 L20 5 L30 9 L40 10 L50 16 L60 18",
  flat: "M0 12 L10 11 L20 13 L30 12 L40 11 L50 12 L60 12",
  up: "M0 16 L10 15 L20 14 L30 12 L40 12 L50 9 L60 8",
}

function WishlistMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.toolbar}>
        <strong>Wishlist</strong>
        <span className={styles.muted}>
          <Bell aria-hidden="true" /> 38 of 38 watched
        </span>
        <span className={styles.primaryButton} {...region(1)}>
          <Plus aria-hidden="true" /> Add to wishlist
        </span>
      </div>
      {wishGroups.map((group) => (
        <div key={group.name} className={styles.group}>
          <div
            className={styles.groupHead}
            data-tone={group.tone}
            {...region(2)}
          >
            <i aria-hidden="true" />
            {group.name}
            <b>{group.rows.length}</b>
          </div>
          {group.rows.map(([name, price, regular, off, pos, trend]) => (
            <div key={name} className={styles.wishRow}>
              <span className={styles.knifeName}>
                <i className={styles.thumb} aria-hidden="true" />
                {name}
              </span>
              <span className={styles.priceCell} {...region(3)}>
                <b>{price}</b>
                {off < 0 && <s>{regular}</s>}
                {off < 0 && <em>{off}%</em>}
              </span>
              <span className={styles.range} style={pct(pos)} {...region(3)}>
                <i />
              </span>
              <svg
                viewBox="0 0 60 20"
                className={styles.trend}
                data-trend={trend}
                {...region(3)}
              >
                <path d={trendPaths[trend]} />
              </svg>
              <span className={styles.rowActions} {...region(4)}>
                <span>Market</span>
                <TrendingDown aria-hidden="true" />
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ---------- Price Drops ---------- */

const storeLines = [
  {
    store: "Brand site",
    d: "M0 30 L60 30 L120 30 L180 30 L240 32 L300 32",
    key: "a",
  },
  {
    store: "Blade HQ",
    d: "M0 36 L60 36 L120 40 L180 40 L240 44 L300 44",
    key: "b",
  },
  {
    store: "SMKW",
    d: "M0 34 L60 38 L120 38 L180 52 L240 76 L300 78",
    key: "c",
  },
  {
    store: "DLT Trading",
    d: "M0 26 L60 26 L120 28 L180 34 L240 34 L300 36",
    key: "d",
  },
]

const storeRows = [
  ["SMKW", "$220.50", "Cheapest · in stock", "best"],
  ["Blade HQ", "$264.60", "In stock", ""],
  ["DLT Trading", "$279.30", "In stock", ""],
  ["KnifeJoy", "—", "Searching…", "search"],
  ["Northwest Knives", "$289.00", "Found today", "found"],
] as const

function PriceDropsMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.toolbar} {...region(1)}>
        <span className={styles.knifeName}>
          <i className={styles.thumb} aria-hidden="true" />
          Spyderco Military 2
        </span>
        <span className={styles.pill}>
          <RefreshCw aria-hidden="true" /> Monitored · next check 2 h
        </span>
      </div>
      <div className={styles.split}>
        <div className={styles.chartCard} {...region(3)}>
          <div className={styles.chartHead}>
            <span>Price by store · 90 days</span>
            <b>
              Cheapest: SMKW <em>−25%</em>
            </b>
          </div>
          <svg
            viewBox="0 0 300 90"
            preserveAspectRatio="none"
            className={styles.chart}
          >
            {[20, 45, 70].map((y) => (
              <line
                key={y}
                x1="0"
                x2="300"
                y1={y}
                y2={y}
                className={styles.grid}
              />
            ))}
            {storeLines.map((line) => (
              <path key={line.key} d={line.d} data-line={line.key} />
            ))}
            <circle cx="300" cy="78" r="3.5" data-line="c" />
          </svg>
          <div className={styles.legend}>
            {storeLines.map((line) => (
              <span key={line.key} data-line={line.key}>
                <i aria-hidden="true" />
                {line.store}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.storeList} {...region(2)}>
          {storeRows.map(([store, price, state, kind]) => (
            <div
              key={store}
              className={styles.storeRow}
              data-kind={kind || undefined}
            >
              <Store aria-hidden="true" />
              <span>{store}</span>
              <b>{price}</b>
              <small>{state}</small>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.changeRow} {...region(4)}>
        <span className={styles.changeCounted}>
          <ArrowDownRight aria-hidden="true" /> SMKW −25% · counts as a drop
        </span>
        <span className={styles.changeQuiet}>
          <BellOff aria-hidden="true" /> Blade HQ −1.8% · under 5% minimum
        </span>
      </div>
    </div>
  )
}

/* ---------- AI supervisor ---------- */

const runs = ["done", "done", "done", "done", "now", "next", "next", "next"]

const actions = [
  [ArrowUpRight, "Check first", "3 products moved to the front"],
  [RefreshCw, "Retry with AI", "1 failing page"],
  [Eye, "Watch closely", "Military 2 · hourly for 48 h"],
  [Search, "Cross-check", "4 other stores read now"],
] as const

function SupervisorMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.toolbar}>
        <strong>AI supervisor</strong>
        <span className={styles.segmented} aria-hidden="true">
          <span>Off</span>
          <span>Observe</span>
          <span data-on>Act</span>
        </span>
      </div>
      <div className={styles.runline} {...region(1)}>
        <small>Runs</small>
        <span className={styles.runs}>
          {runs.map((state, index) => (
            <i key={index} data-state={state} />
          ))}
        </span>
        <span className={styles.trigger}>
          <TrendingDown aria-hidden="true" /> Started by: price drop at SMKW
        </span>
      </div>
      <div className={styles.contextChips} {...region(2)}>
        <span>
          Regular <b>$294</b>
        </span>
        <span>
          Target <b>$230</b>
        </span>
        <span>
          Best now <b>$220.50</b>
        </span>
        <span>
          90-day low <b>$220.50</b>
        </span>
        <span className={styles.lockChip}>
          <Lock aria-hidden="true" /> No links, notes or keys
        </span>
      </div>
      <div className={styles.actionList} {...region(3)}>
        {actions.map(([Icon, title, note]) => (
          <div key={title} className={styles.action}>
            <span className={styles.actionIcon}>
              <Icon aria-hidden="true" />
            </span>
            <b>{title}</b>
            <small>{note}</small>
            <Check aria-hidden="true" className={styles.actionCheck} />
          </div>
        ))}
      </div>
      <div className={styles.noteCard} {...region(4)}>
        <Sparkles aria-hidden="true" />
        <span>
          <b>Deal · Spyderco Military 2</b>
          SMKW has it at $220.50, a new 90-day low and under your $230 target.
        </span>
        <span className={styles.noteButton}>Open market</span>
      </div>
    </div>
  )
}

/* ---------- Inbox ---------- */

const inboxTabs = [
  ["All", "4"],
  ["Prices", "2"],
  ["Maintenance", "1"],
  ["System", "1"],
] as const

function InboxMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.tabs} {...region(2)}>
        {inboxTabs.map(([label, count], index) => (
          <span key={label} data-on={index === 0 || undefined}>
            {label}
            <b>{count}</b>
          </span>
        ))}
        <span className={styles.tabsTail}>Mark all read</span>
      </div>
      <div className={styles.messages}>
        <div className={styles.message} data-kind="price" {...region(1)}>
          <i aria-hidden="true" />
          <span className={styles.messageText}>
            <b>Spyderco Military 2 · SMKW</b>
            <span>
              <s>$294</s> $220.50 · −$73.50 (−25%)
            </span>
          </span>
          <span className={styles.messageAction} {...region(4)}>
            Open market
          </span>
          <time>2m</time>
        </div>
        <div className={styles.message} data-kind="price" {...region(1)}>
          <i aria-hidden="true" />
          <span className={styles.messageText}>
            <b>Back in stock · Para Military 2</b>
            <span>Blade HQ · $249.95</span>
          </span>
          <span className={styles.messageAction} {...region(4)}>
            Open market
          </span>
          <time>1h</time>
        </div>
        <div className={styles.message} data-kind="care" {...region(1)}>
          <i aria-hidden="true" />
          <span className={styles.messageText}>
            <b>Sharpening due · Benchmade Bugout</b>
            <span>Last sharpened 92 days ago</span>
          </span>
          <span className={styles.messageAction} {...region(4)}>
            Log care
          </span>
          <time>3h</time>
        </div>
        <div className={styles.message} data-kind="system" {...region(1)}>
          <i aria-hidden="true" />
          <span className={styles.messageText}>
            <b>Bot check at a store</b>
            <span>2 store pages need you</span>
          </span>
          <span className={styles.messageAction} {...region(4)}>
            Solve in browser
          </span>
          <time>8h</time>
        </div>
        <div className={styles.messageMuted} {...region(3)}>
          <BellOff aria-hidden="true" />
          <span>Blade HQ · Military 2 · −1.8%</span>
          <small>Under 5% minimum · not sent</small>
        </div>
      </div>
      <div className={styles.thresholds} {...region(3)}>
        <span>
          Minimum change <b>5%</b>
        </span>
        <span className={styles.slider} style={pct(25)}>
          <i />
        </span>
        <span>
          Minimum amount <b>$3</b>
        </span>
      </div>
    </div>
  )
}

/* ---------- Maintenance ---------- */

const careKpis = [
  ["Overdue", "1", "over"],
  ["Due soon", "2", "soon"],
  ["Up to date", "21", "ok"],
] as const

const comingUp = [
  { knife: "Bugout", kind: "Sharpen", at: 6, state: "over" },
  { knife: "Para 3", kind: "Lube", at: 30, state: "soon" },
  { knife: "Elementum", kind: "Clean", at: 48, state: "soon" },
  { knife: "Military 2", kind: "Sharpen", at: 80, state: "ok" },
] as const

const careHistory = [
  [Wrench, "Sharpened · Benchmade Bugout", "17° per side · 800 grit · strop"],
  [Droplet, "Lubed · Spyderco Para 3", "Pivot and lock"],
  [Droplet, "Cleaned · CIVIVI Elementum", "Quick entry"],
] as const

function MaintenanceMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.kpis} {...region(1)}>
        {careKpis.map(([label, value, state]) => (
          <span key={label} data-state={state}>
            <b>{value}</b>
            {label}
          </span>
        ))}
      </div>
      <div className={styles.timeline} {...region(2)}>
        <div className={styles.timelineHead}>
          <CalendarClock aria-hidden="true" /> Coming up
          <span>Today</span>
          <span>+1 month</span>
        </div>
        <div className={styles.track}>
          {comingUp.map((item) => (
            <span
              key={item.knife}
              className={styles.pin}
              data-state={item.state}
              style={{ left: `${item.at}%` }}
            >
              <i />
              <b>{item.knife}</b>
              <small>{item.kind}</small>
            </span>
          ))}
        </div>
        <div className={styles.menu} {...region(3)}>
          <small>Reschedule Bugout</small>
          <span data-on>Tomorrow</span>
          <span>Next week</span>
          <span>Next month</span>
          <span>Pick a date…</span>
          <span>Skip</span>
        </div>
      </div>
      <div className={styles.history} {...region(4)}>
        {careHistory.map(([Icon, title, note]) => (
          <div key={title}>
            <Icon aria-hidden="true" />
            <b>{title}</b>
            <small>{note}</small>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------- Achievements ---------- */

const badges = [
  ["100th knife", "platinum"],
  ["10 makers", "gold"],
  ["5 steels", "gold"],
  ["3 countries", "silver"],
  ["Complete records", "silver"],
  ["Care streak", "bronze"],
  ["Lucky find", "gold"],
  ["???", "secret"],
] as const

function AchievementsMock() {
  return (
    <div className={styles.mock}>
      <div className={styles.toast} {...region(2)}>
        <span className={styles.medal} data-tier="gold" />
        <span>
          <small>Unlocked · Gold · +50</small>
          <b>Lucky find</b>
        </span>
        <span className={styles.confetti} aria-hidden="true">
          {Array.from({ length: 10 }, (_, index) => (
            <i key={index} style={{ "--i": index } as CSSProperties} />
          ))}
        </span>
      </div>
      <div className={styles.trophy}>
        <div className={styles.rank} {...region(3)}>
          <small>Collector rank</small>
          <strong>Collector</strong>
          <span className={styles.rankBar} style={pct(58)}>
            <i />
          </span>
          <span className={styles.rankEnds}>
            <span>Rookie</span>
            <span>Jedi Collector</span>
          </span>
          <span className={styles.tierPoints}>
            <span data-tier="bronze">10</span>
            <span data-tier="silver">25</span>
            <span data-tier="gold">50</span>
            <span data-tier="platinum">100</span>
          </span>
        </div>
        <div className={styles.badges} {...region(1)}>
          {badges.map(([name, tier]) => (
            <span key={name} className={styles.badge}>
              <span className={styles.medal} data-tier={tier}>
                {tier === "secret" && <HelpCircle aria-hidden="true" />}
              </span>
              <small>{name}</small>
            </span>
          ))}
        </div>
      </div>
      <div className={styles.shareRow} {...region(4)}>
        <span>Trophy case on Insights · 3 closest to unlocking</span>
        <span className={styles.primaryButton}>
          <Share2 aria-hidden="true" /> Share card
        </span>
      </div>
    </div>
  )
}

const mocks: Record<string, () => ReactNode> = {
  wishlist: WishlistMock,
  "price-drops": PriceDropsMock,
  "ai-supervisor": SupervisorMock,
  inbox: InboxMock,
  maintenance: MaintenanceMock,
  achievements: AchievementsMock,
}

export function FeatureMock({ slug }: { slug: string }) {
  const Mock = mocks[slug]
  return Mock ? <Mock /> : null
}
