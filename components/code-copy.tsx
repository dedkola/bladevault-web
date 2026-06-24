"use client"

import { useState } from "react"
import { ClipboardCopy, Check } from "lucide-react"

interface CodeCopyProps {
  text: string
  label?: string
}

export function CodeCopy({ text, label }: CodeCopyProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
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
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex items-center gap-2">
      <pre className="flex-1 overflow-x-auto font-mono text-sm bg-muted p-3 rounded-md">
        <code>{text}</code>
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label ?? "Copy to clipboard"}
        className="shrink-0 rounded-md border border-border/60 p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {copied ? (
          <Check className="size-4" />
        ) : (
          <ClipboardCopy className="size-4" />
        )}
      </button>
      {copied && (
        <span className="text-xs text-muted-foreground">Copied!</span>
      )}
    </div>
  )
}