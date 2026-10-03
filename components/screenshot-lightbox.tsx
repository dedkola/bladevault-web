"use client"

import { Dialog } from "@base-ui/react/dialog"
import Image from "next/image"
import { Expand, X } from "lucide-react"

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
  return (
    <Dialog.Root>
      <Dialog.Trigger
        aria-label={`Enlarge ${title ?? alt}`}
        className={cn(
          "group/screenshot relative block cursor-zoom-in overflow-hidden text-left focus-visible:ring-2 focus-visible:ring-[var(--bladevault-gold)] focus-visible:outline-none",
          className
        )}
      >
        {children}
        <span className="pointer-events-none absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-md border border-white/30 bg-[rgb(28_31_14/78%)] px-2.5 py-2 text-xs font-medium text-white shadow-lg backdrop-blur transition-opacity group-hover/screenshot:opacity-100 group-focus-visible/screenshot:opacity-100 md:opacity-0">
          <Expand className="size-3.5" aria-hidden="true" />
          Open screenshot
        </span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-[rgb(19_21_10/78%)] backdrop-blur-md" />
        <Dialog.Viewport className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-8">
          <Dialog.Popup className="grid max-h-[92dvh] w-full max-w-[88rem] grid-rows-[auto_minmax(0,1fr)] overflow-hidden rounded-xl border border-[var(--bladevault-line)] bg-[#f6f1e5] shadow-[0_30px_90px_rgb(20_23_10/38%)] outline-none">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--bladevault-line)]/55 px-4 py-3 text-[var(--bladevault-olive)]">
              <Dialog.Title className="text-sm font-semibold">
                {title ?? alt}
              </Dialog.Title>
              <Dialog.Description className="sr-only">{alt}</Dialog.Description>
              <Dialog.Close
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-[var(--bladevault-line)] bg-[#fffefa] transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[var(--bladevault-gold)] focus-visible:outline-none"
                aria-label="Close enlarged screenshot"
              >
                <X className="size-4" aria-hidden="true" />
              </Dialog.Close>
            </div>
            <div className="vault-grid relative grid min-h-0 place-items-center overflow-auto bg-[#ebe6d8] p-2 sm:p-4">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-[var(--bladevault-line)]/55 bg-white shadow-[0_18px_55px_rgb(46_52_23/16%)]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes="94vw"
                  className="object-contain"
                />
              </div>
            </div>
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
