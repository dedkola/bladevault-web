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
          <strong>v2.0 is here.</strong>{" "}
          <span>Studio, Collection pulse, and a workspace that fits.</span>
        </p>
        <Link href="/#whats-new" className={styles.link}>
          See what changed
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
