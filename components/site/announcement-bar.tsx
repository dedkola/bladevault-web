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
          <strong>Care reminders in BladeVault 2.5.</strong>{" "}
          <span>
            See which knives are due for sharpening, cleaning, or lubrication,
            and plan care from the new Maintenance page.
          </span>
        </p>
        <Link href="/#journal" className={styles.link}>
          See what&rsquo;s new
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
