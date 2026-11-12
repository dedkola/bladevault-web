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
          <strong>Backup to your own Google Drive.</strong>{" "}
          <span>
            Keep one vault archive in Drive and restore it on any device signed
            in to the same Google account.
          </span>
        </p>
        <Link href="/#features" className={styles.link}>
          See what&rsquo;s new
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
