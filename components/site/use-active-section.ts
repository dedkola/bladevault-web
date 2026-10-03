"use client"

import { useEffect, useState } from "react"

/** Follow document scrolling without adding entries to browser history. */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [activeId, setActiveId] = useState(ids[0])

  useEffect(() => {
    if (!enabled) return

    let frame = 0

    function update() {
      frame = 0
      const sections = ids.flatMap((id) => {
        const element = document.getElementById(id)
        return element ? [element] : []
      })
      if (!sections.length) return

      // Use the same offset as native fragment navigation below the header.
      const offset =
        parseFloat(getComputedStyle(sections[0]).scrollMarginTop) || 0
      let current = sections[0]
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= offset + 1) current = section
      }

      // The final section may not reach the offset before the page ends.
      if (
        window.scrollY > 0 &&
        Math.ceil(window.scrollY + window.innerHeight) >=
          document.documentElement.scrollHeight
      ) {
        current = sections[sections.length - 1]
      }
      setActiveId(current.id)
    }

    function scheduleUpdate() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)
    window.addEventListener("hashchange", scheduleUpdate)
    window.addEventListener("popstate", scheduleUpdate)
    const observer = new ResizeObserver(scheduleUpdate)
    const main = document.querySelector("main")
    if (main) observer.observe(main)
    scheduleUpdate()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      window.removeEventListener("hashchange", scheduleUpdate)
      window.removeEventListener("popstate", scheduleUpdate)
    }
  }, [enabled, ids])

  return enabled ? activeId : undefined
}
