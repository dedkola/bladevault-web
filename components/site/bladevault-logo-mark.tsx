import { useId } from "react"

type BladevaultLogoMarkProps = {
  className?: string
}

/**
 * The app's folding-knife "V" mark: the handle (left stroke) follows
 * currentColor and the blade (right stroke) reads its gradient from the
 * --brand-blade-* tokens. Same artwork as the desktop app's brand mark.
 */
export function BladevaultLogoMark({
  className = "size-10",
}: BladevaultLogoMarkProps) {
  const gradientId = `bv-blade-${useId().replace(/:/g, "")}`

  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={`text-foreground ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--brand-blade-from)" }} />
          <stop offset="0.5" style={{ stopColor: "var(--brand-blade-mid)" }} />
          <stop offset="1" style={{ stopColor: "var(--brand-blade-to)" }} />
        </linearGradient>
      </defs>
      <g transform="translate(23 40) rotate(22)">
        <path
          d="M-4.6 0V-29Q-4.6 -34.6 -1.6 -37.6Q4.6 -32 4.6 -22V0Z"
          fill={`url(#${gradientId})`}
        />
        <path
          d="M2.6 -2V-22Q2.6 -30 -1.2 -35"
          fill="none"
          stroke="rgb(255 255 255 / 55%)"
          strokeWidth="0.9"
        />
      </g>
      <path
        transform="translate(23 40) rotate(-22)"
        fillRule="evenodd"
        fill="currentColor"
        d="M-4.6 -32Q-4.6 -36.6 0 -36.6Q4.6 -36.6 4.6 -32V0A4.6 4.6 0 0 1 -4.6 0ZM-1.9 0a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0 -3.8 0Z"
      />
      <circle cx="23" cy="40" r="0.9" fill="currentColor" />
    </svg>
  )
}
