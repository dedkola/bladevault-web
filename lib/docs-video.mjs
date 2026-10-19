/** Only recognized HTTPS YouTube watch/short links can produce a player URL. */
export function youtubeVideoId(value) {
  try {
    const url = new URL(value)
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return null
    let id = null
    if (url.hostname === "youtu.be") {
      id = url.pathname.slice(1)
    } else if (
      ["youtube.com", "www.youtube.com", "m.youtube.com"].includes(
        url.hostname
      ) &&
      url.pathname === "/watch"
    ) {
      id = url.searchParams.get("v")
    }
    return id && /^[A-Za-z0-9_-]{11}$/.test(id) ? id : null
  } catch {
    return null
  }
}

/**
 * Recognize standalone linked video thumbnails and legacy GitBook embed paragraphs.
 * Prose links, code examples and unrelated image links remain ordinary Markdown.
 * @param {import("mdast").Nodes} node
 */
export function docsVideo(node) {
  if (node.type !== "paragraph") return null
  const children = node.children.filter(
    (child) => child.type !== "text" || child.value.trim()
  )
  const link = children.length === 1 ? children[0] : null
  if (
    link?.type === "link" &&
    link.children.length === 1 &&
    link.children[0].type === "image"
  ) {
    const id = youtubeVideoId(link.url)
    return id
      ? { id, title: link.children[0].alt || "YouTube video walkthrough" }
      : null
  }

  const text = node.children
    .map((child) => {
      if (child.type === "text") return child.value
      if (child.type === "link")
        return child.children
          .map((part) => (part.type === "text" ? part.value : ""))
          .join("")
      return ""
    })
    .join("")
  const legacy = /^\{%\s*embed\s+url="([^"]+)"\s*%\}$/.exec(text.trim())
  const id = legacy ? youtubeVideoId(legacy[1]) : null
  return id ? { id, title: "YouTube video walkthrough" } : null
}
