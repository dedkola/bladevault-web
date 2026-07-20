"use client"

import Image from "next/image"
import { Expand, X } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

type ScreenshotLightboxProps = {
  src: string
  alt: string
  children: React.ReactNode
  className?: string
}

export function ScreenshotLightbox({
  src,
  alt,
  children,
  className,
}: ScreenshotLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open ${alt} fullscreen`}
        className={cn(
          "group/screenshot relative block cursor-zoom-in overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
          className
        )}
      >
        {children}
        <span className="pointer-events-none absolute right-3 bottom-3 inline-flex size-9 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white opacity-0 shadow-sm backdrop-blur transition-opacity group-hover/screenshot:opacity-100 group-focus-visible/screenshot:opacity-100">
          <Expand className="size-4" aria-hidden="true" />
        </span>
      </button>

      {isOpen
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
            >
              <div
                className="relative flex h-full w-full items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <p id={titleId} className="sr-only">
                  {alt}
                </p>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-contain"
                />
                <button
                  type="button"
                  autoFocus
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0 inline-flex size-10 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  aria-label="Close fullscreen image"
                >
                  <X className="size-5" aria-hidden="true" />
                </button>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  )
}
