import Image from "next/image"
import { CalendarDays, History, NotebookPen, Wrench } from "lucide-react"

import styles from "./homepage-v3.module.css"

const points = [
  {
    icon: NotebookPen,
    title: "Dated personal notes",
    body: "Add a note to any knife with its own date. Bold, italics, lists, and links render as Markdown, right under the photos.",
  },
  {
    icon: History,
    title: "History that links back",
    body: "Every edit, note, and maintenance event lands in History, newest first. Click a row to jump to the entry it changed.",
  },
  {
    icon: Wrench,
    title: "Maintenance in its own tab",
    body: "Sharpening, cleaning, and service records sit in a side tab next to the details, so care history is one click away.",
  },
  {
    icon: CalendarDays,
    title: "Calendar activity map",
    body: "Insights shows additions, edits, and maintenance as a 52-week calendar. Pick any day to see what changed.",
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
          Notes + history
        </p>
        <h2>Every knife keeps its story.</h2>
        <p className={styles.sectionIntro}>
          Write down how a knife carries, when you sharpened it, and what you
          changed. BladeVault dates every note and event and shows the whole
          collection&rsquo;s activity at a glance.
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
