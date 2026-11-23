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
          <strong>Four more stores in BladeVault 2.5.21.</strong>{" "}
          <span>
            Price Drops now checks SMKW, DLT Trading, KnifeJoy and Northwest
            Knives too, with a line per store and the cheapest one named.
          </span>
        </p>
        <Link
          href={`/whats-new#${releaseAnchor("v2.5.21")}`}
          className={styles.link}
        >
          See what&rsquo;s new
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
