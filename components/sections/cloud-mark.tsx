import { useId } from "react"

import { cn } from "@/lib/utils"

/**
 * Layered cloud illustration with a vault archive inside, drawn in the
 * BladeVault palette so it follows light and dark themes.
 */
export function CloudMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "")
  const fill = `cloud-fill-${id}`
  const glow = `cloud-glow-${id}`

  return (
    <svg
      viewBox="0 0 240 160"
      className={cn(className)}
      role="img"
      aria-label="Cloud holding a BladeVault backup archive"
    >
      <defs>
        <linearGradient id={fill} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--card)" />
          <stop
            offset="100%"
            stopColor="color-mix(in srgb, var(--bladevault-gold) 16%, var(--card))"
          />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="55%" r="55%">
          <stop
            offset="0%"
            stopColor="var(--bladevault-gold)"
            stopOpacity="0.32"
          />
          <stop
            offset="100%"
            stopColor="var(--bladevault-gold)"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <ellipse cx="120" cy="92" rx="118" ry="66" fill={`url(#${glow})`} />

      <path
        d="M62 132h118a38 38 0 0 0 4-75.8A52 52 0 0 0 86.6 44 34 34 0 0 0 62 132Z"
        fill={`url(#${fill})`}
        stroke="var(--bladevault-gold)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M80 118h88a24 24 0 0 0 2.5-47.9"
        fill="none"
        stroke="color-mix(in srgb, var(--bladevault-gold) 45%, transparent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 5"
      />

      <g transform="translate(98 70)">
        <rect
          width="44"
          height="40"
          rx="7"
          fill="var(--bladevault-olive)"
          stroke="var(--bladevault-gold)"
          strokeWidth="1.5"
        />
        <rect
          x="6"
          y="7"
          width="32"
          height="6"
          rx="3"
          fill="var(--bladevault-gold)"
        />
        <circle
          cx="22"
          cy="26"
          r="7"
          fill="none"
          stroke="var(--bladevault-gold)"
          strokeWidth="1.8"
        />
        <path
          d="M22 21.5v4.5l3 2"
          fill="none"
          stroke="var(--bladevault-gold)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>

      <g fill="var(--bladevault-gold)">
        <circle cx="46" cy="40" r="2.2" />
        <circle cx="200" cy="30" r="1.8" />
        <circle cx="214" cy="118" r="2.4" />
        <circle cx="28" cy="104" r="1.6" />
      </g>
    </svg>
  )
}
