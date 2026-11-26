import Image from "next/image"

import { cn } from "@/lib/utils"

import styles from "./knife-photo.module.css"

// Product photos from the example vault, trimmed to the knife on white and
// stored in public/screenshots/live/knives as [file, width, height].
const knifePhotos = {
  kroc: ["kroc-329", 640, 155],
  raccoon: ["raccoon-tislim", 640, 149],
  nativeChief: ["native-chief-lw", 496, 640],
  military: ["military-2", 451, 640],
  paraMilitary: ["para-military-2-lw", 505, 640],
  porcupine: ["porcupine", 640, 159],
  dingo: ["dingo", 640, 493],
  nymble: ["nymble", 640, 160],
  bugout: ["bugout", 640, 134],
  dropBear: ["drop-bear", 640, 602],
  miniElementum: ["mini-elementum", 640, 153],
  babyBanter: ["baby-banter-2", 555, 640],
  seamount: ["seamount", 640, 185],
  razel: ["razel", 640, 146],
} as const

export type KnifePhotoId = keyof typeof knifePhotos

/**
 * A knife photo on a white plate, the way the app shows knife images.
 * Size, padding and radius come from `className`.
 */
export function KnifePhoto({
  id,
  sizes,
  className,
}: {
  id: KnifePhotoId
  sizes: string
  className?: string
}) {
  const [file, width, height] = knifePhotos[id]
  return (
    <span className={cn(styles.plate, className)}>
      <Image
        src={`/screenshots/live/knives/${file}.webp`}
        alt=""
        width={width}
        height={height}
        sizes={sizes}
      />
    </span>
  )
}
