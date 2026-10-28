import Link from "next/link"
import { Filter, Layers3, Wrench } from "lucide-react"

import styles from "./v2-homepage.module.css"

const workflows = [
  {
    href: "/docs/guides/smart-collections",
    icon: Filter,
    title: "Smart Collections",
    detail:
      "Save the question, not a static list. Live counts follow the vault.",
  },
  {
    href: "/docs/guides/model-families",
    icon: Layers3,
    title: "Model families",
    detail: "See the model once and keep every variation as its own record.",
  },
  {
    href: "/docs/guides/log-maintenance",
    icon: Wrench,
    title: "Care with context",
    detail: "Sharpening, cleaning, and service history stay with the knife.",
  },
]

export function WorkflowBand() {
  return (
    <section id="workflows" className={styles.workflowBand}>
      <div className={styles.workflowHead}>
        <h2 className={styles.displayTitle}>
          The workflows that got you here.
        </h2>
      </div>
      <div className={styles.workflowList}>
        {workflows.map(({ href, icon: Icon, title, detail }) => (
          <Link key={title} href={href} className={styles.workflowItem}>
            <Icon aria-hidden="true" />
            <div>
              <strong>{title}</strong>
              <p>{detail}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
