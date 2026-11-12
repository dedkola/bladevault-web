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
    body: "Specifications, price, provenance, dated notes, custom fields, and a multi-image gallery. Choose the cover and keep the source page.",
    points: [
      "Metric, imperial, or both side by side",
      "Multi-image upload and fullscreen gallery",
      "Choose card and pinned-item fields",
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
    body: "Collection pulse shows the shape of the vault, with a calendar of recent activity. Data completeness and measurement review show the records that need another pass.",
    points: [
      "Missing fields and coverage gaps",
      "Guided measurement review",
      "Label consistency and source review",
    ],
  },
  {
    icon: Wrench,
    title: "Care history",
    body: "Sharpening, cleaning, lubrication, stropping, and service details stay with the knife in their own tab. History keeps every change.",
    points: [
      "Dated maintenance events",
      "Grit, angle, system, and passes",
      "Searchable, linked History",
    ],
  },
  {
    icon: Database,
    title: "Local-first, backed up",
    body: "SQLite and images in one folder. Create a portable ZIP backup, keep a copy in your own Google Drive, and opt into cloud backup only when you want it.",
    points: [
      "No account, works offline",
      "Complete local ZIP restore",
      "Google Drive or opt-in cloud backup",
    ],
  },
] as const

const alsoIncluded = [
  "Smart Collections",
  "Model families",
  "Sold status",
  "Custom fields",
  "9 theme styles",
  "Light / dark",
  "Compact cards",
  "Columns",
  "Start page",
  "What's new after updates",
  "Linux AppImage + .deb",
  "Google Drive backup",
]

export function HomepageFeatures() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.sectionHead}>
        <p className={styles.sectionKicker}>
          <span className={styles.sectionNum} aria-hidden="true">
            06
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
