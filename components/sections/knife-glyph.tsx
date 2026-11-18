/** Simple folding-knife silhouette used in the coded app previews. */
export function KnifeGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 36"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Handle with a lanyard hole */}
      <path
        fillRule="evenodd"
        d="M6 18c0-4 3-7 7-7h40c3 0 5 1 6 3v8c-1 2-3 3-6 3H15c-6 0-9-3-9-7zm7 0a2.4 2.4 0 1 0 4.8 0a2.4 2.4 0 1 0-4.8 0z"
        fill="currentColor"
        opacity="0.5"
      />
      {/* Drop-point blade with pivot */}
      <path
        fillRule="evenodd"
        d="M55 12h39c9 0 17 2 23 5-8 6-24 9-43 9H58c-2 0-3-1-3-3V12zm3 6a2.6 2.6 0 1 0 5.2 0a2.6 2.6 0 1 0-5.2 0z"
        fill="currentColor"
      />
      <path
        d="M66 21.5c16 0 32-1 46-4"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
    </svg>
  )
}
