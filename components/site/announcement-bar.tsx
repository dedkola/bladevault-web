"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

import styles from "./announcement-bar.module.css"

export function AnnouncementBar() {
  const pathname = usePathname()

  if (pathname !== "/") return null

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <p>
          <span className={styles.badge}>New</span>{" "}
          <strong>Five new themes.</strong>{" "}
          <span>
            Forge, Titanium, Field, Lumen, and Amber join Classic, Modern, and
            Alloy.
          </span>
        </p>
        <Link href="/#themes" className={styles.link}>
          Preview the styles
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
