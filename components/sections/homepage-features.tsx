import {
  Database,
  Gauge,
  Image as ImageIcon,
  Scale,
  Search,
  Wrench,
} from "lucide-react"

import styles from "./homepage-v3.module.css"

const features = [
  {
    icon: Search,
    title: "Find anything",
    body: (
      <>
        Global search, <code>/model</code> lookup, field filters, and
        measurement ranges. Save the question as a Smart Collection with a live
        count.
      </>
    ),
    points: [
      "Model names and model numbers",
      "Brand, steel, lock, shape, carry",
      "Pinned sidebar and pinned-first ordering",
    ],
  },
  {
    icon: ImageIcon,
    title: "Records that hold everything",
    body: "Specifications, price, provenance, notes, custom fields, and a multi-image gallery. Choose the cover and keep the source page.",
    points: [
      "Text, number, and date fields",
      "Multi-image upload and fullscreen gallery",
      "Card fields and pinned sidebar parity",
    ],
  },
  {
    icon: Scale,
    title: "Compare with context",
    body: "Named shortlists keep their own membership. Hide what matches, then print or export the matrix as a landscape PDF.",
    points: [
      "Differences-only view",
      "Add a knife to several lists",
      "Print or export as PDF",
    ],
  },
  {
    icon: Gauge,
    title: "Know your data",
    body: "Collection pulse shows the shape of the vault. Data completeness and measurement review show the records that need another pass.",
    points: [
      "Missing fields and coverage gaps",
      "Guided measurement review",
      "Label consistency and source review",
    ],
  },
  {
    icon: Wrench,
    title: "Care history",
    body: "Sharpening, cleaning, lubrication, stropping, and service details stay with the knife. Logs keep the change history.",
    points: [
      "Dated maintenance events",
      "Grit, angle, system, and passes",
      "Searchable activity logs",
    ],
  },
  {
    icon: Database,
    title: "Local-first, backed up",
    body: "SQLite and images in one folder. Create a portable ZIP backup, and opt into cloud backup only when you want it.",
    points: [
      "No account, works offline",
      "Complete local ZIP restore",
      "Opt-in cloud upload and restore",
    ],
  },
] as const

const alsoIncluded = [
  "Smart Collections",
  "Model families",
  "Sold status",
  "Custom fields",
  "8 theme styles",
  "Light / dark",
  "Columns",
  "Start page",
]

export function HomepageFeatures() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionKicker}>
          <span className={styles.sectionNum} aria-hidden="true">
            05
          </span>
          The rest of the vault
        </p>
        <h2>Everything else you need.</h2>
        <p className={styles.sectionIntro}>
          The daily workflows around the record: finding, comparing, cleaning
          up, and keeping it local.
        </p>
      </div>

      <div className={styles.featuresGrid}>
        {features.map(({ icon: Icon, title, body, points }) => (
          <article key={title} className={styles.featureCard}>
            <span className={styles.featureIcon} aria-hidden="true">
              <Icon />
            </span>
            <h3>{title}</h3>
            <p>{body}</p>
            <ul className={styles.featureList}>
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className={styles.alsoIncluded} aria-label="Also included">
        <b>Also included</b>
        {alsoIncluded.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  )
}
