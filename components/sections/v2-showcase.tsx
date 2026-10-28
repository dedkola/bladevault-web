"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, type KeyboardEvent } from "react"
import { ArrowUpRight, BookOpen, Check, Columns3, Grid2X2 } from "lucide-react"

import { ScreenshotLightbox } from "@/components/screenshot-lightbox"

import styles from "./v2-homepage.module.css"

const tabs = [
  {
    id: "studio",
    label: "Studio",
    note: "Visual library",
    title: "The collection, at a glance.",
    description:
      "Studio arranges the vault as a visual index. Randomised layouts keep a large collection from turning into a grid of sameness, while the family strip keeps related knives close.",
    points: [
      "Browse by family from the main gallery.",
      "Search, filter, sort, or switch tile size.",
      "Open focus mode or step through a quick look.",
    ],
    image: "/screenshots/studio.jpg",
    alt: "Studio gallery with filter controls, knife photography, and a focus mode action",
  },
  {
    id: "pulse",
    label: "Collection pulse",
    note: "Insights rebuilt",
    title: "Read the whole vault.",
    description:
      "Collection pulse replaces the old overview with one screen for growth, coverage, makers, steels, carry profile, and recent additions. Every panel leads back to the records.",
    points: [
      "Catalogue growth across 6 months, 12 months, or all time.",
      "Field coverage and the exact gaps to fill next.",
      "Maker and steel mix, plus blade length against weight.",
    ],
    image: "/screenshots/collection-pulse.jpg",
    alt: "Collection pulse dashboard showing catalogue growth, field coverage, maker mix, and carry profile",
  },
  {
    id: "workspace",
    label: "Modern workspace",
    note: "New optional appearance",
    title: "A quieter place to work.",
    description:
      "Modern is an optional appearance for Collection, Compare, and Logs. Current stays the default for anyone who likes the warm room, so this is a choice rather than a redesign in place.",
    points: [
      "Compact table with a docked inspector beside the rows.",
      "Shared header search across the workspace.",
      "Inline Logs details without losing your place.",
    ],
    image: "/screenshots/collection-modern.jpg",
    alt: "Modern Collection table with a docked knife inspector, shared header search, and filter controls",
  },
  {
    id: "themes",
    label: "Theme options",
    note: "Two looks, more coming",
    title: "Pick the room you work in.",
    description:
      "Current keeps the warm BladeVault look. Modern adds the cool graphite workspace. Both are available today, with more themes on the way.",
    points: [
      "Current: the default warm palette.",
      "Modern: cool graphite with the shared workspace.",
      "More themes are coming soon.",
    ],
    image: "/screenshots/theme-options.jpg",
    alt: "Settings appearance panel with Current and Modern theme choices, color mode, start page, and time format",
  },
] as const

const extras = [
  {
    icon: Columns3,
    title: "Columns that stay put",
    detail:
      "Show, hide, reorder, and resize; every choice is remembered across reloads.",
  },
  {
    icon: Check,
    title: "Selection in the table",
    detail:
      "Bulk edit, compare, pin, or delete without switching back to a card grid.",
  },
  {
    icon: Grid2X2,
    title: "A start page you choose",
    detail: "Open on Insights, Studio, or Collection when the app launches.",
  },
  {
    icon: BookOpen,
    title: "Logs that keep your place",
    detail:
      "Open event details inline, with the surrounding history still in view.",
  },
]

export function V2Showcase() {
  const [active, setActive] = useState(0)

  function moveTab(index: number) {
    const next = (index + tabs.length) % tabs.length
    setActive(next)
    document.getElementById(`v2-tab-${tabs[next].id}`)?.focus()
  }

  function onTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault()
      moveTab(index + 1)
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault()
      moveTab(index - 1)
    } else if (event.key === "Home") {
      event.preventDefault()
      moveTab(0)
    } else if (event.key === "End") {
      event.preventDefault()
      moveTab(tabs.length - 1)
    }
  }

  return (
    <section
      id="whats-new"
      className={styles.spotlight}
      aria-labelledby="v2-title"
    >
      <div className={styles.spotlightHead}>
        <p className={styles.sectionTag}>New in 2.0</p>
        <h2 id="v2-title" className={styles.displayTitle}>
          The vault, four ways.
        </h2>
        <p>
          Version 2.0 adds a visual library, a live read on the catalogue, a
          quieter workspace, and a choice of themes. Your records, Smart
          Collections, and existing views stay exactly where they are.
        </p>
      </div>

      <div className={styles.spotlightLayout}>
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="New in BladeVault 2.0"
          aria-orientation="vertical"
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              id={`v2-tab-${tab.id}`}
              className={styles.tab}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`v2-panel-${tab.id}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              <span className={styles.tabNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.tabBody}>
                <strong>{tab.label}</strong>
                <small>{tab.note}</small>
              </span>
            </button>
          ))}
          <p className={styles.tabsNote}>
            Current remains the default. Modern is the second option, with more
            themes on the way.
          </p>
        </div>

        <div className={styles.panels}>
          {tabs.map((tab, index) => (
            <article
              key={tab.id}
              id={`v2-panel-${tab.id}`}
              className={styles.panel}
              role="tabpanel"
              aria-labelledby={`v2-tab-${tab.id}`}
              tabIndex={0}
              hidden={active !== index}
            >
              <div className={styles.shot}>
                <ScreenshotLightbox
                  src={tab.image}
                  alt={tab.alt}
                  title={tab.label}
                  className={styles.shotButton}
                >
                  <Image
                    src={tab.image}
                    alt={tab.alt}
                    fill
                    loading="lazy"
                    sizes="(min-width: 1280px) 62vw, 92vw"
                    className="object-cover object-top"
                  />
                </ScreenshotLightbox>
              </div>
              <div className={styles.panelCopy}>
                <div>
                  <h3>{tab.title}</h3>
                  <p>{tab.description}</p>
                  <Link
                    href="/whats-new#release-v2.0.0"
                    className={styles.textLink}
                  >
                    Read the v2.0 notes
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
                <ul className={styles.points}>
                  {tab.points.map((point) => (
                    <li key={point}>
                      <Check aria-hidden="true" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={styles.extras}>
        {extras.map(({ icon: Icon, title, detail }) => (
          <div key={title} className={styles.extra}>
            <Icon className={styles.extraIcon} size={18} aria-hidden="true" />
            <strong>{title}</strong>
            <p>{detail}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
