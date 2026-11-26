import { History, NotebookPen, Wrench } from "lucide-react"

import { CarePanel } from "./homepage-care"
import { JournalPanel } from "./homepage-journal"
import base from "./homepage-v3.module.css"
import { SectionTabs } from "./section-tabs"

// Notes, Maintenance and History in one section. Tab ids keep the old
// #journal and #care anchors working.

export function HomepageCollection() {
  return (
    <section id="collection" className={base.section}>
      <div className={base.sectionHead}>
        <p className={base.sectionKicker}>
          Notes, care + history
        </p>
        <h2>Every knife keeps its story.</h2>
        <p className={base.sectionIntro}>
          Write down how a knife carries and when you sharpened it. Maintenance
          tells you which knives need care and when, and History shows how the
          collection grew.
        </p>
      </div>

      <SectionTabs
        label="Notes, care and history"
        tabs={[
          {
            id: "journal",
            label: "Notes",
            icon: <NotebookPen aria-hidden="true" />,
            content: <JournalPanel />,
          },
          {
            id: "care",
            label: "Maintenance",
            icon: <Wrench aria-hidden="true" />,
            content: <CarePanel page="maintenance" />,
          },
          {
            id: "history",
            label: "History",
            icon: <History aria-hidden="true" />,
            content: <CarePanel page="history" />,
          },
        ]}
      />
    </section>
  )
}
