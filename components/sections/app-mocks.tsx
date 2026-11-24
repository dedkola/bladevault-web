import type { CSSProperties } from "react"
import {
  ChevronLeft,
  ChevronRight,
  LockKeyhole,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react"

import styles from "./app-mocks.module.css"

// Coded stand-ins for app screenshots, drawn with the site's theme tokens so
// they sit in light and dark mode like the other homepage windows. Content
// mirrors the screenshots in public/screenshots/live/.

/* ---------- Insights: collection activity ---------- */

const kpis = [
  ["Catalogued knives", "220", "11 pinned in your collection"],
  ["Makers", "35", "127 model families"],
  ["Median blade", "80.45 mm", "214 readable measurements"],
  ["Field coverage", "95%", "55 records have missing fields"],
] as const

const activityTabs = [
  ["All activity", "554"],
  ["Added", "220"],
  ["Edited", "288"],
  ["Maintained", "46"],
] as const

// Heat 0–3 per day, read off the activity screenshot. Monday-first offsets.
const months = [
  {
    name: "September 2026",
    offset: 1,
    days: 30,
    heat: "333233" + "0012123" + "0002013" + "0020313" + "000",
  },
  {
    name: "October 2026",
    offset: 3,
    days: 31,
    heat: "1000" + "0020300" + "0003300" + "2031233" + "30010" + "13",
  },
  {
    name: "November 2026",
    offset: 6,
    days: 30,
    heat: "1" + "3321021" + "11",
    today: 11,
  },
]

const weekBars = [2, 3, 2, 1, 2, 1, 3, 4, 3, 2, 4, 5, 3, 1, 9, 2, 2, 3, 4, 4, 3]

const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

export function InsightsActivityMock() {
  return (
    <div className={styles.insights}>
      <div className={styles.kpis}>
        {kpis.map(([label, value, note]) => (
          <div key={label}>
            <small>{label}</small>
            <strong>{value}</strong>
            <span>{note}</span>
          </div>
        ))}
      </div>

      <div className={styles.activity}>
        <div className={styles.activityHead}>
          <div>
            <small>Activity</small>
            <strong>Collection activity</strong>
            <span>
              Additions, edits and maintenance over the last 52 weeks.
            </span>
          </div>
          <span className={styles.link}>Details ↗</span>
        </div>

        <div className={styles.tabs}>
          {activityTabs.map(([label, value], index) => (
            <span key={label} data-on={index === 0 || undefined}>
              <small>
                <i data-kind={index} aria-hidden="true" />
                {label}
              </small>
              <b>{value}</b>
            </span>
          ))}
        </div>

        <div className={styles.months}>
          {months.map((month) => (
            <div key={month.name} className={styles.month}>
              <div className={styles.monthName}>
                {month.name}
                {month.today && (
                  <span className={styles.monthNav} aria-hidden="true">
                    <ChevronLeft />
                    <ChevronRight />
                  </span>
                )}
              </div>
              <div className={styles.days}>
                {weekdays.map((day) => (
                  <span key={day} className={styles.weekday}>
                    {day}
                  </span>
                ))}
                {Array.from({ length: month.offset }, (_, index) => (
                  <span key={`pad-${index}`} />
                ))}
                {Array.from({ length: month.days }, (_, index) => {
                  const day = index + 1
                  const future = month.today !== undefined && day > month.today
                  return (
                    <span
                      key={day}
                      className={styles.day}
                      data-heat={
                        future ? undefined : (month.heat[index] ?? "0")
                      }
                      data-today={day === month.today || undefined}
                      data-future={future || undefined}
                    >
                      {day}
                    </span>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.weeks} aria-hidden="true">
          {weekBars.map((height, index) => (
            <i
              key={index}
              style={{ "--h": `${height * 10}%` } as CSSProperties}
              data-range={index >= 8 || undefined}
            />
          ))}
        </div>

        <div className={styles.selected}>
          <div>
            <small>Selected day</small>
            <strong>Wednesday, Nov 11</strong>
          </div>
          <span>
            <i data-kind="1" /> 0 added <i data-kind="2" /> 1 edited{" "}
            <i data-kind="3" /> 0 maintained
          </span>
        </div>
      </div>
    </div>
  )
}

/* ---------- Knife: my notes ---------- */

export function KnifeNotesMock() {
  return (
    <div className={styles.notes}>
      <div className={styles.notesHead}>
        <small>My notes</small>
        <span>
          <Plus aria-hidden="true" /> Add note
        </span>
      </div>
      <article className={styles.note}>
        <time>Nov 8, 2026</time>
        <p>
          <b>Daily carry check.</b> Detent is still crisp after two months of
          pocket time.
        </p>
        <ul>
          <li>Blade centered, no play</li>
          <li>Re-tightened pivot a quarter turn</li>
        </ul>
        <span className={styles.noteActions} aria-hidden="true">
          <Pencil />
          <Trash2 />
        </span>
      </article>
      <article className={styles.note}>
        <time>Oct 21, 2026</time>
        <p>
          Touched up on the <b>Sharpmaker</b> at 20°. Takes a{" "}
          <em>hair-popping</em> edge in a few passes.
        </p>
        <span className={styles.noteActions} aria-hidden="true">
          <Pencil />
          <Trash2 />
        </span>
      </article>
    </div>
  )
}

/* ---------- Settings: app lock ---------- */

export function AppLockMock() {
  return (
    <div className={styles.lock}>
      <div className={styles.lockHead}>
        <span className={styles.lockIcon} aria-hidden="true">
          <LockKeyhole />
        </span>
        <div>
          <strong>App lock</strong>
          <span>Require a password before the vault opens on this device.</span>
        </div>
      </div>
      <div className={styles.lockRow}>
        <span>Password required</span>
        <span className={styles.toggle} aria-hidden="true">
          <i />
        </span>
        <small>Disabled</small>
      </div>
      <div className={styles.field}>
        <span>Password</span>
        <span className={styles.input} aria-hidden="true">
          ••••••••••
        </span>
      </div>
      <div className={styles.field}>
        <span>Confirm password</span>
        <span className={styles.input} aria-hidden="true">
          ••••••••••
          <i className={styles.caret} />
        </span>
      </div>
      <div className={styles.lockFoot}>
        <span className={styles.button}>Enable App lock</span>
      </div>
    </div>
  )
}
