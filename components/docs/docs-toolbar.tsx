"use client"

import { ArrowUpRight, Check, ClipboardCopy } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { DocsSearch } from "@/components/docs/docs-search"

interface DocsToolbarProps {
  title: string
  group: string | null
  route: string
  markdown: string
  editUrl: string
}

export function DocsToolbar({ title, group, route, markdown, editUrl }: DocsToolbarProps) {
  const [copied, setCopied] = useState(false)

  async function copyPage() {
    try {
      await navigator.clipboard.writeText(markdown)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = markdown
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
    <div className="sticky top-16 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-background/85 py-2.5 backdrop-blur-xl">
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2 text-[13px]">
        <Link
          href="/docs"
          className="text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          Docs
        </Link>
        {group ? (
          <>
            <span aria-hidden="true" className="text-muted-foreground/60">
              ›
            </span>
            <span className="hidden text-muted-foreground sm:inline">{group}</span>
          </>
        ) : null}
        <span aria-hidden="true" className="text-muted-foreground/60">
          ›
        </span>
        <span aria-current="page" className="min-w-0 truncate font-semibold text-foreground">
          {title}
        </span>
        <span className="sr-only">{route}</span>
      </nav>

      <div className="flex items-center gap-2">
        <DocsSearch />

        <button
          type="button"
          onClick={copyPage}
          className="vault-action h-9 gap-1.5 px-3 text-[13px]"
          aria-label={copied ? "Page markdown copied" : "Copy page markdown"}
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <ClipboardCopy className="size-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">{copied ? "Copied" : "Copy page"}</span>
        </button>

        <a
          href={editUrl}
          target="_blank"
          rel="noreferrer"
          title="Edit this page on GitHub"
          aria-label="Edit this page on GitHub"
          className="vault-action h-9 w-9 justify-center px-0"
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
