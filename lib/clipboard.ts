/** Copy with a fallback for browsers that deny the async clipboard API. */
export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const focused = document.activeElement
    const textarea = document.createElement("textarea")
    textarea.value = text
    textarea.style.position = "fixed"
    textarea.style.opacity = "0"
    textarea.readOnly = true
    document.body.appendChild(textarea)
    try {
      textarea.select()
      if (!document.execCommand("copy")) throw new Error("Copy failed")
    } finally {
      textarea.remove()
      if (focused instanceof HTMLElement) focused.focus({ preventScroll: true })
    }
  }
}
