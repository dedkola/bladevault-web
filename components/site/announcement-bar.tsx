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
          <strong>Wishlist in BladeVault 2.5.17.</strong>{" "}
          <span>
            Your buy list, grouped by deal: see each knife&rsquo;s price against
            its regular price, its 90-day range and 30-day trend.
          </span>
        </p>
        <Link
          href={`/whats-new#${releaseAnchor("v2.5.17")}`}
          className={styles.link}
        >
          See what&rsquo;s new
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
