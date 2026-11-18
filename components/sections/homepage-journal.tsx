import Image from "next/image"
import {
  BellRing,
  CalendarClock,
  History,
  NotebookPen,
  Wrench,
} from "lucide-react"

import styles from "./homepage-v3.module.css"

const points = [
  {
    icon: Wrench,
    title: "Care that knows what's due",
    body: "Sharpening every 90 days, cleaning every 60, lubrication every 180, or your own intervals per knife. Care badges and a Care filter flag the knives that need attention.",
  },
  {
    icon: BellRing,
    title: "An Inbox for care",
    body: "When a knife turns due soon or overdue, a message lands in the Inbox. Log the care for today, snooze it, or dismiss it.",
  },
  {
    icon: CalendarClock,
    title: "A Maintenance page",
    body: "A Coming up timeline names every knife that is due, with a push to tomorrow, next week, or next month. Care history and a searchable Care log sit beside it.",
  },
  {
    icon: History,
    title: "History as a timeline",
    body: "Collection changes appear as a timeline with photos, milestones, and a Year in review, including knives added before History started recording.",
  },
  {
    icon: NotebookPen,
    title: "Dated notes with photos",
    body: "Add a note to any knife with its own date, Markdown formatting, and photos that also show up in the item gallery.",
  },
]

export function HomepageJournal() {
  return (
    <section id="journal" className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionKicker}>
          <span className={styles.sectionNum} aria-hidden="true">
            04
          </span>
          Care + history
          <span className={styles.newBadge}>New</span>
        </p>
        <h2>Every knife keeps its story, and its schedule.</h2>
        <p className={styles.sectionIntro}>
          Log when you sharpened, cleaned, or oiled a knife and BladeVault tells
          you when it is due again. Notes, care, and changes are dated, so the
          whole collection&rsquo;s story is one timeline away.
        </p>
      </div>

      <div className={styles.journalGrid}>
        <figure className={`${styles.window} ${styles.journalMain}`}>
          <div className={styles.windowBar}>
            <span className={styles.dots} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>BladeVault / Insights</span>
            <span>Collection activity</span>
          </div>
          <Image
            src="/screenshots/live/insights-activity.jpg"
            alt="BladeVault Insights with collection totals and a calendar activity map of additions, edits, and maintenance from August to November"
            width={2880}
            height={1800}
            sizes="(min-width: 1180px) 60vw, 94vw"
            quality={90}
            className={styles.journalMainImage}
          />
        </figure>

        <div className={styles.journalSide}>
          <figure className={styles.window}>
            <div className={styles.windowBar}>
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>Knife / My notes</span>
              <span>Markdown</span>
            </div>
            <Image
              src="/screenshots/live/knife-notes.jpg"
              alt="Two dated notes on a Vosteed Porcupine, with bold text, a bulleted list, and italics rendered from Markdown"
              width={1500}
              height={600}
              sizes="(min-width: 1180px) 34vw, 94vw"
              quality={90}
              className={styles.journalNotesImage}
            />
          </figure>

          <ul className={styles.journalPoints}>
            {points.map(({ icon: Icon, title, body }) => (
              <li key={title}>
                <span className={styles.featureIcon} aria-hidden="true">
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
