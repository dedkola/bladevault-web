"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { releaseAnchor } from "@/lib/navigation"
import { featuredRelease } from "@/lib/releases"

import styles from "./announcement-bar.module.css"

export function AnnouncementBar() {
  const pathname = usePathname()

  if (pathname !== "/" || !featuredRelease?.announcement) return null

  const { title, body } = featuredRelease.announcement

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        <p>
          <span className={styles.badge}>New</span> <strong>{title}</strong>{" "}
          <span>{body}</span>
        </p>
        <Link
          href={`/whats-new#${releaseAnchor(featuredRelease.version)}`}
          className={styles.link}
        >
          See what&rsquo;s new
          <ArrowRight aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
