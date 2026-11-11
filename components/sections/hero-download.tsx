"use client"

import { useSyncExternalStore } from "react"
import { ArrowDown, ArrowDownToLine } from "lucide-react"

import { siteConfig } from "@/lib/site"

import styles from "./homepage-v3.module.css"

type Platform = "mac" | "windows" | "linux" | "mobile" | "other"

function detectPlatform(): Platform {
  const ua = navigator.userAgent
  // iPadOS Safari reports a Mac user agent, so touch support tells them apart.
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return "mobile"
  if (/Macintosh/i.test(ua)) {
    return navigator.maxTouchPoints > 1 ? "mobile" : "mac"
  }
  if (/Windows/i.test(ua)) return "windows"
  if (/Linux|X11/i.test(ua)) return "linux"
  return "other"
}

const noopSubscribe = () => () => {}

const options: Record<Platform, { href: string; label: string; note: string }> =
  {
    mac: {
      href: siteConfig.macDownloadUrl,
      label: "Download for macOS",
      note: `${siteConfig.releaseVersion} · macOS 13 or newer`,
    },
    windows: {
      href: siteConfig.windowsDownloadUrl,
      label: "Download for Windows",
      note: `${siteConfig.releaseVersion} · Windows installer`,
    },
    linux: {
      href: siteConfig.linuxAppImageUrl,
      label: "Download for Linux",
      note: `${siteConfig.releaseVersion} · AppImage (x64), .deb also available`,
    },
    mobile: {
      href: "#install",
      label: "See install options",
      note: "Install on a Mac, PC, or home server, then open it here",
    },
    other: {
      href: siteConfig.releasesUrl,
      label: "Download BladeVault",
      note: `${siteConfig.releaseVersion} · macOS, Windows, Linux, Docker`,
    },
  }

/**
 * Hero call-to-action row. The download button points at the installer for the visitor's OS.
 * The static HTML renders the generic releases link; the browser swaps in
 * the matching installer after hydration.
 */
export function HeroDownload() {
  const platform = useSyncExternalStore<Platform>(
    noopSubscribe,
    detectPlatform,
    () => "other"
  )
  const option = options[platform]

  return (
    <>
      <div className={styles.heroActions}>
        <a
          className={`${styles.button} ${styles.buttonPrimary}`}
          href={option.href}
        >
          <ArrowDownToLine aria-hidden="true" />
          {option.label}
        </a>
        <a className={styles.button} href="#import">
          See auto scrape
          <ArrowDown aria-hidden="true" />
        </a>
      </div>
      <p className={styles.heroDownloadNote}>
        {option.note}
        {platform !== "mobile" ? (
          <>
            {" · "}
            <a href="#install">Other platforms</a>
          </>
        ) : null}
      </p>
    </>
  )
}
