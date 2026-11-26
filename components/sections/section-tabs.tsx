"use client"

import { useEffect, useRef, useState } from "react"
import type { KeyboardEvent, ReactNode } from "react"

import { cn } from "@/lib/utils"

import styles from "./section-tabs.module.css"

// Tabs for homepage sections that hold several former sections. Each panel
// keeps its old section id (#journal, #care, #backup, …), so existing links
// open the right tab. Inactive panels stay in the DOM, hidden.

export type SectionTab = {
  id: string
  label: string
  /** A rendered icon, e.g. <Wrench aria-hidden="true" />. */
  icon: ReactNode
  content: ReactNode
}

export function SectionTabs({
  label,
  tabs,
}: {
  label: string
  tabs: SectionTab[]
}) {
  const [activeId, setActiveId] = useState(tabs[0].id)
  const listRef = useRef<HTMLDivElement>(null)
  const ids = tabs.map((tab) => tab.id).join(" ")

  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id || !ids.split(" ").includes(id)) return
      setActiveId(id)
      requestAnimationFrame(() =>
        listRef.current?.scrollIntoView({ block: "start" })
      )
    }
    openFromHash()
    window.addEventListener("hashchange", openFromHash)
    return () => window.removeEventListener("hashchange", openFromHash)
  }, [ids])

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0
    if (!step) return
    event.preventDefault()
    const index = tabs.findIndex((tab) => tab.id === activeId)
    const next = tabs[(index + step + tabs.length) % tabs.length]
    setActiveId(next.id)
    document.getElementById(`tab-${next.id}`)?.focus()
  }

  return (
    <>
      <div
        ref={listRef}
        className={styles.tabs}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
      >
        {tabs.map(({ id, label: tabLabel, icon }) => {
          const selected = id === activeId
          return (
            <button
              key={id}
              id={`tab-${id}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={id}
              tabIndex={selected ? 0 : -1}
              className={cn(styles.tab, selected && styles.tabActive)}
              onClick={() => setActiveId(id)}
            >
              {icon}
              {tabLabel}
            </button>
          )
        })}
      </div>

      {tabs.map(({ id, content }) => (
        <div
          key={id}
          id={id}
          role="tabpanel"
          aria-labelledby={`tab-${id}`}
          hidden={id !== activeId}
          className={styles.panel}
        >
          {content}
        </div>
      ))}
    </>
  )
}
