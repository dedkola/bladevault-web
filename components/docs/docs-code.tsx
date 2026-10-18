"use client"

import { useEffect } from "react"

const DEFAULT_LABEL = "Copy"
const COPIED_LABEL = "Copied"

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return
  } catch {
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()
    document.execCommand("copy")
    document.body.removeChild(textarea)
  }
}

/**
 * Code blocks arrive as build-time highlighted HTML (server-rendered, no client markdown library), so the
 * language label and the copy button are added to the DOM after hydration — client-only, which keeps the
 * server markup and the hydrated tree identical.
 */
export function CodeBlockDecorator({ containerId }: { containerId: string }) {
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const cleanups: Array<() => void> = []

    container.querySelectorAll("pre").forEach((pre) => {
      if (pre.dataset.docsCode === "ready") return
      pre.dataset.docsCode = "ready"

      const code = pre.querySelector("code")
      const language = code?.className.match(/(?:^|\s)language-([a-z0-9+#-]+)/i)?.[1]

      if (language && language !== "text") {
        const label = document.createElement("span")
        label.className = "docs-code-lang"
        label.textContent = language
        pre.appendChild(label)
      }

      const button = document.createElement("button")
      button.type = "button"
      button.className = "docs-code-copy"
      button.textContent = DEFAULT_LABEL
      button.setAttribute("aria-label", language ? `Copy ${language} code` : "Copy code")

      let timer: number | undefined
      function onClick() {
        void copyText(code?.textContent ?? "")
        button.textContent = COPIED_LABEL
        button.setAttribute("aria-label", "Code copied")
        window.clearTimeout(timer)
        timer = window.setTimeout(() => {
          button.textContent = DEFAULT_LABEL
          button.setAttribute("aria-label", language ? `Copy ${language} code` : "Copy code")
        }, 1600)
      }

      button.addEventListener("click", onClick)
      pre.appendChild(button)

      cleanups.push(() => {
        window.clearTimeout(timer)
        button.removeEventListener("click", onClick)
        button.remove()
      })
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
    }
  }, [containerId])

  return null
}
