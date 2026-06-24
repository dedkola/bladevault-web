"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={() =>
        setTheme(resolvedTheme === "dark" ? "light" : "dark")
      }
      aria-label="Toggle theme"
    >
      <Sun className="size-4 dark:hidden" aria-hidden="true" />
      <Moon className="size-4 hidden dark:block" aria-hidden="true" />
    </button>
  )
}
