import { CalendarDays, History, NotebookPen, Wrench } from "lucide-react"

import { InsightsActivityMock, KnifeNotesMock } from "./app-mocks"
import styles from "./homepage-v3.module.css"

const points = [
  {
    icon: NotebookPen,
    title: "Dated notes with photos",
    body: "Add a note to any knife with its own date. Bold, italics, lists, and links render as Markdown, and photos in a note also show up in the item gallery.",
  },
  {
    icon: History,
    title: "History that links back",
    body: "Every addition, edit, and deletion lands in History. Expand an entry to see exactly what changed.",
  },
  {
    icon: Wrench,
    title: "Care on the knife page",
    body: "The knife's Maintenance tab flags care that is due, with quick buttons to log sharpening, cleaning, or lubrication for today.",
  },
  {
    icon: CalendarDays,
    title: "Calendar activity map",
    body: "Insights shows additions, edits, and maintenance as a 52-week calendar. Pick any day to see what changed.",
  },
]

// Notes + activity: the first tab of the homepage "collection" section.
export function JournalPanel() {
  return (
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
        <InsightsActivityMock />
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
          <KnifeNotesMock />
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
  )
}
