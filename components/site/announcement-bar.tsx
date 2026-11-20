"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { releaseAnchor } from "@/lib/navigation"

import styles from "./announcement-bar.module.css"

export function AnnouncementBar() {
  const pathname = usePathname()

  if (pathname !== "/") return null

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <p>
          <span className={styles.badge}>New</span>{" "}
          <strong>Price Drops in BladeVault 2.5.</strong>{" "}
          <span>
            Watch store prices and restocks for your knives, with an optional AI
            supervisor that schedules the checks and an Inbox for every alert.
          </span>
        </p>
        <Link
          href={`/whats-new#${releaseAnchor("v2.5.1")}`}
          className={styles.link}
        >
          See what&rsquo;s new
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
