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
          <span>
            Auto scrape, AI access, and a vault that fits every screen.
          </span>
        </p>
        <Link href="/#import" className={styles.link}>
          See how it works
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
