import Image from "next/image"
import { ChevronDown } from "lucide-react"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"

import styles from "./v2-homepage.module.css"

const workspaceFeatures = [
  {
    number: "01",
    title: "Start with the fields you read",
    detail:
      "Show or hide any built-in or custom column, from maker and steel to photos, source URL, or date added.",
  },
  {
    number: "02",
    title: "Drag the order into shape",
    detail:
      "Move a column by dragging its heading or with the arrow keys. The table updates as you work.",
  },
  {
    number: "03",
    title: "Resize it once, keep it",
    detail:
      "Drag a column edge, double-click to reset, or use the keyboard. Widths and order persist across reloads.",
  },
]

const bulkPoints = ["Bulk edit", "Add to Compare", "Pin or unpin", "Delete"]

function WindowDots() {
  return (
    <span className={styles.windowDots} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  )
}

export function WorkspaceFit() {
  return (
    <section id="workspace" className={styles.workspace}>
      <div className={styles.workspaceHead}>
        <h2 className={styles.displayTitle}>A table that answers to you.</h2>
        <p>
          The Modern Collection is not a fixed layout. Choose the fields, order,
          and widths that match how you read your vault.
        </p>
      </div>

      <div className={styles.workspaceGrid}>
        <figure className={styles.workspaceFigure}>
          <span className={`${styles.figureChip} ${styles.chipA}`}>
            Show / hide
          </span>
          <span className={`${styles.figureChip} ${styles.chipB}`}>Resize</span>
          <span className={`${styles.figureChip} ${styles.chipC}`}>
            Drag to reorder
          </span>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <WindowDots />
              <span className={styles.windowLabel}>Collection / Columns</span>
            </div>
            <ScreenshotLightbox
              src="/screenshots/collection-columns.jpg"
              alt="Modern Collection with the Columns menu open, showing column checkboxes above a table of knives"
              title="Collection columns"
              className={styles.windowImage}
            >
              <Image
                src="/screenshots/collection-columns.jpg"
                alt="Modern Collection with the Columns menu open, showing column checkboxes above a table of knives"
                fill
                loading="lazy"
                sizes="(min-width: 1100px) 56vw, 94vw"
                className="object-cover object-top"
              />
            </ScreenshotLightbox>
          </div>
        </figure>

        <div className={styles.workspaceFeatures}>
          {workspaceFeatures.map((feature) => (
            <div key={feature.number} className={styles.workspaceFeature}>
              <span className={styles.featureNumber}>{feature.number}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.detail}</p>
              </div>
            </div>
          ))}

          <div className={styles.startPageCard}>
            <small>Settings / Appearance</small>
            <strong>Open on Studio.</strong>
            <p>
              Insights, Studio, or Collection. Pick the room BladeVault opens
              into.
            </p>
            <div className={styles.miniSettings} aria-hidden="true">
              <div className={styles.miniSetting}>
                <span>Theme</span>
                <span className={styles.miniSelect}>
                  Modern <ChevronDown aria-hidden="true" />
                </span>
              </div>
              <div className={styles.miniSetting}>
                <span>Start page</span>
                <span className={styles.miniSelect}>
                  Studio <ChevronDown aria-hidden="true" />
                </span>
              </div>
              <div className={styles.miniSetting}>
                <span>Time format</span>
                <span>24-hour</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.workspaceBulk}>
        <div>
          <h3>Selection belongs in the table.</h3>
          <p>
            Tick rows where you are already reading. Bulk edit shared fields,
            add the selection to Compare, pin it, or delete it without changing
            views.
          </p>
          <div className={styles.bulkPoints}>
            {bulkPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
        <figure className={styles.bulkFigure}>
          <div className={styles.window}>
            <div className={styles.windowBar}>
              <WindowDots />
              <span className={styles.windowLabel}>
                Collection / 3 selected
              </span>
            </div>
            <ScreenshotLightbox
              src="/screenshots/collection-selected.jpg"
              alt="Three selected knife rows with a floating bulk action bar offering bulk edit, compare, pin, and delete"
              title="Bulk selection"
              className={styles.windowImage}
            >
              <Image
                src="/screenshots/collection-selected.jpg"
                alt="Three selected knife rows with a floating bulk action bar offering bulk edit, compare, pin, and delete"
                fill
                loading="lazy"
                sizes="(min-width: 1100px) 56vw, 94vw"
                className="object-cover object-top"
              />
            </ScreenshotLightbox>
          </div>
        </figure>
      </div>
    </section>
  )
}
