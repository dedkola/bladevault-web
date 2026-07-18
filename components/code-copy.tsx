"use client"

import { useState } from "react"
import { ClipboardCopy, Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface CodeCopyProps {
  text: string
  label?: string
  title?: React.ReactNode
  className?: string
}

export function CodeCopy({ text, label, title, className }: CodeCopyProps) {
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
    <div
      className={cn(
        "min-w-0 rounded-lg border border-border/70 bg-card p-3 sm:p-4",
        className
      )}
    >
      {title && (
        <div className="pb-2 text-center">
          {typeof title === "string" ? (
            <p className="vault-label">{title}</p>
          ) : (
            <span className="vault-label">{title}</span>
          )}
        </div>
      )}

      <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
        <pre className="min-w-0 flex-1 overflow-x-auto rounded-md border border-border/60 bg-muted/60 px-4 py-3 font-mono text-xs leading-5 text-foreground sm:text-sm">
          <code className="block break-all whitespace-pre-wrap sm:whitespace-pre">
            {text}
          </code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={label ?? "Copy to clipboard"}
          className="self-end rounded-md border border-border bg-card p-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:outline-none sm:shrink-0"
        >
          {copied ? (
            <Check className="size-4" />
          ) : (
            <ClipboardCopy className="size-4" />
          )}
        </button>
        {copied && (
          <span className="self-end text-xs text-muted-foreground">
            Copied!
          </span>
        )}
      </div>
    </div>
  )
}
