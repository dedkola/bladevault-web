"use client"

import Image from "next/image"
import { Expand, X } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

type ScreenshotLightboxProps = {
  src: string
  alt: string
  children: React.ReactNode
  className?: string
  title?: string
}

export function ScreenshotLightbox({
  src,
  alt,
  children,
  className,
  title,
}: ScreenshotLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    const trigger = triggerRef.current
    document.body.style.overflow = "hidden"

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
      requestAnimationFrame(() => trigger?.focus())
    }
  }, [isOpen])

  function closeLightbox() {
    setIsOpen(false)
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Enlarge ${title ?? alt}`}
        className={cn(
          "group/screenshot relative block cursor-zoom-in overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-[var(--bladevault-gold)] focus-visible:outline-none",
          className
        )}
      >
        {children}
        <span className="pointer-events-none absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-md border border-white/30 bg-[rgb(28_31_14/78%)] px-2.5 py-2 font-mono text-[9px] font-semibold tracking-[0.08em] text-white uppercase opacity-0 shadow-lg backdrop-blur transition-all group-hover/screenshot:translate-y-0 group-hover/screenshot:opacity-100 group-focus-visible/screenshot:translate-y-0 group-focus-visible/screenshot:opacity-100 max-md:opacity-100">
          <Expand className="size-3.5" aria-hidden="true" />
          Open screenshot
        </span>
      </button>

      {isOpen
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={closeLightbox}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgb(19_21_10/78%)] p-3 backdrop-blur-md sm:p-8"
            >
              <div
                className="grid max-h-[92dvh] w-full max-w-[88rem] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-xl border border-[var(--bladevault-line)] bg-[#f6f1e5] shadow-[0_30px_90px_rgb(20_23_10/38%)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-[var(--bladevault-line)]/55 px-4 py-3 text-[var(--bladevault-olive)]">
                  <p
                    id={titleId}
                    className="font-mono text-[11px] font-semibold tracking-[0.08em] uppercase"
                  >
                    {title ?? alt}
                  </p>
                  <button
                    type="button"
                    autoFocus
                    onClick={closeLightbox}
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-[var(--bladevault-line)] bg-[#fffefa] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--bladevault-gold)] focus-visible:outline-none"
                    aria-label="Close enlarged screenshot"
                  >
                    <X className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="vault-grid relative grid min-h-0 place-items-center overflow-auto bg-[#ebe6d8] p-2 sm:p-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--bladevault-line)]/55 bg-white shadow-[0_18px_55px_rgb(46_52_23/16%)]">
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      priority
                      sizes="94vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
