"use client"

import { useState } from "react"
import {
  BellRing,
  CalendarClock,
  CalendarRange,
  Droplet,
  Flag,
  History,
  ListChecks,
  Plus,
  ScrollText,
  Sparkles,
  Store,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

import { KnifeGlyph } from "./knife-glyph"
import base from "./homepage-v3.module.css"
import styles from "./homepage-care.module.css"

type PageId = "maintenance" | "history"

type Point = { icon: LucideIcon; title: string; body: string }

const pages: Record<
  PageId,
  { label: string; path: string; summary: string; points: Point[] }
> = {
  maintenance: {
    label: "Maintenance",
    path: "Maintenance",
    summary:
      "Every knife you care for, on one page: what is overdue, what is coming up, and everything you have logged.",
    points: [
      {
        icon: CalendarClock,
        title: "Coming up timeline",
        body: "Overdue jobs on the left, the next 30 days on the right, with every knife named. Push a job to tomorrow, next week, or next month, or skip it.",
      },
      {
        icon: Wrench,
        title: "Intervals per kind of care",
        body: "Sharpening every 90 days, cleaning every 60, lubrication every 180. Change them in Settings or give one knife its own.",
      },
      {
        icon: ScrollText,
        title: "Care history and Care log",
        body: "A timeline of every care session per knife, with the full entry on hover, and a searchable log of everything you recorded.",
      },
      {
        icon: BellRing,
        title: "Inbox and badges",
        body: "Due-soon and overdue knives get a badge in the collection and a message in the Inbox: log it today, snooze, or dismiss.",
      },
    ],
  },
  history: {
    label: "History",
    path: "History",
    summary:
      "The story of the collection as a timeline: what arrived when, with photos, milestones, and a yearly recap.",
    points: [
      {
        icon: History,
        title: "A timeline with photos",
        body: "Additions, edits, and deletions appear newest first, grouped by month, with the knife's photo beside each entry.",
      },
      {
        icon: Flag,
        title: "Milestones and new brands",
        body: "The 10th, 25th, and 50th knife, then every 25th, and the first knife from a new maker stand out on the timeline.",
      },
      {
        icon: CalendarRange,
        title: "Year in review",
        body: "Pick a year to see how many knives arrived, the top brand, the busiest month, and the most-maintained blade.",
      },
      {
        icon: ListChecks,
        title: "Nothing left out",
        body: "Knives added before History started recording still appear, dated from when they joined the collection.",
      },
    ],
  },
}

const kpis = [
  { label: "Overdue", value: "2", tone: "overdue" },
  { label: "Due soon", value: "3", tone: "soon" },
  { label: "Up to date", value: "31", tone: "ok" },
  { label: "Logged this month", value: "7" },
] as const

/** Pins on the Coming up track: position in %, 50% is today. */
const pins = [
  {
    at: 5,
    low: true,
    knife: "Mini Grip",
    kind: "Lubrication",
    due: "2d overdue",
    tone: "overdue",
  },
  {
    at: 22,
    low: false,
    knife: "Para 3",
    kind: "Cleaning",
    due: "6d overdue",
    tone: "overdue",
  },
  {
    at: 60,
    low: false,
    knife: "Bugout 535",
    kind: "Sharpening",
    due: "in 4d",
    tone: "soon",
  },
  {
    at: 75,
    low: true,
    compact: true,
    knife: "Porcupine",
    kind: "Cleaning",
    due: "in 9d",
    tone: "soon",
  },
  {
    at: 94,
    low: false,
    knife: "Sebenza 31",
    kind: "Lubrication",
    due: "in 21d",
    tone: "later",
  },
] as const

const careKinds = [
  {
    icon: Sparkles,
    name: "Sharpening",
    every: "Every 90 days",
    next: "Bugout 535 · in 4d",
  },
  {
    icon: Wrench,
    name: "Cleaning",
    every: "Every 60 days",
    next: "Para 3 · 6d overdue",
  },
  {
    icon: Droplet,
    name: "Lubrication",
    every: "Every 180 days",
    next: "Mini Grip · 2d overdue",
  },
]

const review = [
  { label: "Knives added", value: "14" },
  { label: "Top brand", value: "Spyderco" },
  { label: "Busiest month", value: "September" },
  { label: "Most common care", value: "Cleaning" },
]

type TimelineEntry =
  | { kind: "milestone"; title: string; date: string }
  | {
      kind: "added" | "brand" | "updated"
      maker: string
      model: string
      note: string
      date: string
    }

const timeline: { month: string; entries: TimelineEntry[] }[] = [
  {
    month: "November 2026",
    entries: [
      { kind: "milestone", title: "50th knife", date: "Nov 12" },
      {
        kind: "added",
        maker: "Chris Reeve",
        model: "Sebenza 31",
        note: "Added to the collection",
        date: "Nov 12",
      },
      {
        kind: "brand",
        maker: "Vosteed",
        model: "Porcupine",
        note: "New brand · first Vosteed",
        date: "Nov 3",
      },
    ],
  },
  {
    month: "October 2026",
    entries: [
      {
        kind: "updated",
        maker: "Spyderco",
        model: "Para 3",
        note: "Blade length 2.95″ · steel CPM S45VN",
        date: "Oct 21",
      },
      {
        kind: "added",
        maker: "Benchmade",
        model: "Bugout 535",
        note: "Added to the collection",
        date: "Oct 4",
      },
    ],
  },
]

const entryLabel = {
  added: "Knife added",
  brand: "New brand",
  updated: "Updated",
} as const

function MaintenancePreview() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <small>Maintenance</small>
          <strong>Care status</strong>
        </div>
        <span className={styles.ghostButton}>
          <ScrollText aria-hidden="true" />
          Care log
        </span>
      </div>

      <dl className={styles.kpis}>
        {kpis.map((kpi) => (
          <div key={kpi.label}>
            <dt>
              {"tone" in kpi ? (
                <i className={styles.dot} data-tone={kpi.tone} />
              ) : null}
              {kpi.label}
            </dt>
            <dd>{kpi.value}</dd>
          </div>
        ))}
      </dl>

      <div className={styles.panel}>
        <div className={styles.panelHead}>
          <strong>Coming up</strong>
          <span className={styles.legend}>
            <span>
              <i className={styles.dot} data-tone="overdue" />
              Overdue
            </span>
            <span>
              <i className={styles.dot} data-tone="soon" />
              Due soon
            </span>
            <span>
              <i className={styles.dot} data-tone="later" />
              Later
            </span>
          </span>
        </div>

        <div className={styles.track}>
          <span className={styles.trackOverdue} />
          <span className={styles.today}>Today</span>
          {pins.map((pin) => (
            <span
              key={pin.knife}
              className={cn(
                styles.pin,
                pin.low && styles.pinLow,
                pin.at > 80 && styles.pinEnd,
                "compact" in pin && styles.pinCompact
              )}
              data-tone={pin.tone}
              style={{ left: `${pin.at}%` }}
            >
              <b>{pin.knife}</b>
              <small>
                {pin.kind} · {pin.due}
              </small>
            </span>
          ))}

          <span className={styles.popover}>
            <small>Para 3 · Cleaning</small>
            <span>Tomorrow</span>
            <span>Next week</span>
            <span>Next month</span>
            <span>Skip this time</span>
          </span>
        </div>
        <span className={styles.trackScale}>
          <span>Overdue</span>
          <span>Next 30 days</span>
        </span>
      </div>

      <div className={styles.kinds}>
        {careKinds.map(({ icon: Icon, name, every, next }) => (
          <div key={name} className={styles.kind}>
            <span className={styles.kindIcon}>
              <Icon aria-hidden="true" />
            </span>
            <strong>{name}</strong>
            <small>{every}</small>
            <span>{next}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HistoryPreview() {
  return (
    <div className={styles.page}>
      <div className={styles.pageHead}>
        <div>
          <small>History</small>
          <strong>Collection timeline</strong>
        </div>
        <span className={styles.ghostButton}>
          <CalendarRange aria-hidden="true" />
          2026
        </span>
      </div>

      <div className={styles.review}>
        <span className={styles.reviewTitle}>
          <Sparkles aria-hidden="true" />
          Year in review
        </span>
        <dl>
          {review.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ol className={styles.timeline}>
        {timeline.map((group) => (
          <li key={group.month}>
            <span className={styles.month}>{group.month}</span>
            <ul>
              {group.entries.map((entry) =>
                entry.kind === "milestone" ? (
                  <li
                    key={entry.title}
                    className={cn(styles.entry, styles.milestone)}
                  >
                    <span className={styles.entryMark}>
                      <Flag aria-hidden="true" />
                    </span>
                    <span className={styles.entryBody}>
                      <small>Milestone</small>
                      <strong>{entry.title}</strong>
                    </span>
                    <time>{entry.date}</time>
                  </li>
                ) : (
                  <li key={entry.model} className={styles.entry}>
                    <span className={styles.entryThumb}>
                      <KnifeGlyph />
                    </span>
                    <span className={styles.entryBody}>
                      <small>
                        {entry.kind === "brand" ? (
                          <Store aria-hidden="true" />
                        ) : entry.kind === "added" ? (
                          <Plus aria-hidden="true" />
                        ) : null}
                        {entryLabel[entry.kind]}
                      </small>
                      <strong>
                        {entry.maker} {entry.model}
                      </strong>
                      <span>{entry.note}</span>
                    </span>
                    <time>{entry.date}</time>
                  </li>
                )
              )}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function HomepageCare() {
  const [activeId, setActiveId] = useState<PageId>("maintenance")
  const active = pages[activeId]

  return (
    <section id="care" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          <span className={base.sectionNum} aria-hidden="true">
            05
          </span>
          Maintenance + History
          <span className={base.newBadge}>New</span>
        </p>
        <h2>Two pages for the life of a collection.</h2>
        <p className={base.sectionIntro}>
          Maintenance tells you which knives need care and when. History shows
          how the collection grew. Both sit in the sidebar, next to Collection
          and Studio.
        </p>
      </div>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Preview a BladeVault page"
      >
        {(Object.keys(pages) as PageId[]).map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`care-tab-${id}`}
            aria-selected={id === activeId}
            aria-controls="care-panel"
            className={cn(styles.tab, id === activeId && styles.tabActive)}
            onClick={() => setActiveId(id)}
          >
            {id === "maintenance" ? (
              <Wrench aria-hidden="true" />
            ) : (
              <History aria-hidden="true" />
            )}
            {pages[id].label}
          </button>
        ))}
      </div>

      <div
        id="care-panel"
        role="tabpanel"
        aria-labelledby={`care-tab-${activeId}`}
        className={base.journalGrid}
      >
        <figure className={cn(base.window, styles.preview)}>
          <div className={base.windowBar}>
            <span className={base.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>BladeVault / {active.path}</span>
            <span>Example vault</span>
          </div>
          <div
            role="img"
            aria-label={
              activeId === "maintenance"
                ? "BladeVault Maintenance page with overdue and due-soon counts, a Coming up timeline with a reschedule menu, and cards for sharpening, cleaning, and lubrication intervals"
                : "BladeVault History page with a Year in review summary and a monthly timeline of added knives, a 50th-knife milestone, a new brand, and an edit"
            }
          >
            {activeId === "maintenance" ? (
              <MaintenancePreview />
            ) : (
              <HistoryPreview />
            )}
          </div>
        </figure>

        <div className={base.journalSide}>
          <p className={styles.summary}>{active.summary}</p>
          <ul className={base.journalPoints}>
            {active.points.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <span className={base.featureIcon} aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
