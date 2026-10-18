"use client"

import { ArrowUpRight, Check, ClipboardCopy } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { DocsSearch } from "@/components/docs/docs-search"
import { copyText } from "@/lib/clipboard"

interface DocsToolbarProps {
  title: string
  group: string | null
  route: string
  markdown: string
  editUrl: string
}

export function DocsToolbar({
  title,
  group,
  route,
  markdown,
  editUrl,
}: DocsToolbarProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle")
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])
  const copied = status === "copied"

  async function copyPage() {
    clearTimeout(timer.current)
    try {
      await copyText(markdown)
      setStatus("copied")
    } catch {
      setStatus("error")
    }
    timer.current = setTimeout(() => setStatus("idle"), 2000)
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-xl border-b border-border/60 bg-muted/40 px-5 py-3 sm:px-8 xl:px-10">
      <nav
        aria-label="Breadcrumb"
        className="flex min-w-0 flex-1 items-center gap-2 text-xs"
      >
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
            <span className="text-muted-foreground">{group}</span>
          </>
        ) : null}
        <span aria-current="page" className="sr-only">
          {title}
        </span>
        <span className="sr-only">{route}</span>
      </nav>

      <div className="flex items-center gap-2">
        <span role="status" className="sr-only">
          {status === "error"
            ? "Copy failed. Please try again."
            : copied
              ? "Page markdown copied."
              : ""}
        </span>
        <DocsSearch />

        <button
          type="button"
          onClick={copyPage}
          className="vault-action h-9 gap-1.5 px-3 text-[13px]"
          aria-label={
            status === "error"
              ? "Copy failed. Try again"
              : copied
                ? "Page markdown copied"
                : "Copy page markdown"
          }
        >
          {copied ? (
            <Check className="size-4" aria-hidden="true" />
          ) : (
            <ClipboardCopy className="size-4" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">
            {status === "error" ? "Try again" : copied ? "Copied" : "Copy page"}
          </span>
        </button>

        <a
          href={editUrl}
          target="_blank"
          rel="noreferrer"
          title="View source on GitHub"
          aria-label="View source on GitHub"
          className="vault-action h-9 w-9 justify-center px-0"
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
