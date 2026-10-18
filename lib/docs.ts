import fs from "node:fs"
import path from "node:path"

import rehypeShiki from "@shikijs/rehype"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import rehypeStringify from "rehype-stringify"
import type {
  Element as HastElement,
  ElementContent,
  Parent,
  Root as HastRoot,
} from "hast"
import type { Image, Link, Root } from "mdast"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { visit } from "unist-util-visit"

/**
 * Server-side data layer for the `/docs` section.
 *
 * Everything is read from the build cache the `predev` / `prebuild` pipeline (`scripts/fetch-docs.mjs`)
 * produces: `.docs-cache/current/nav.json` for routes and ordering, `.docs-cache/current/<source>` for the
 * markdown itself. Routes, the sidebar, the sitemap and the redirect table all come from that one file, so
 * they cannot disagree.
 */

const CACHE_DIR = path.join(process.cwd(), ".docs-cache", "current")
const NAV_FILE = path.join(CACHE_DIR, "nav.json")

export type DocsHeading = {
  depth: number
  id: string
  text: string
}

export type DocsPageSummary = {
  title: string
  route: string
  source: string
  headings: DocsHeading[]
}

export type DocsGroup = {
  title: string
  pages: DocsPageSummary[]
}

export type DocsPage = DocsPageSummary & {
  group: string | null
  description: string
  prev: string | null
  next: string | null
}

export type DocsNav = {
  repo: string
  requestedRef: string
  sha: string
  stale: boolean
  generatedAt: string
  groups: DocsGroup[]
  rootPage: DocsPage | null
  pages: DocsPage[]
  redirects: Record<string, string>
}

function readNav(): DocsNav {
  if (!fs.existsSync(NAV_FILE)) {
    throw new Error(
      `Docs navigation is missing at ${NAV_FILE}. Run \`pnpm docs:fetch\` (the predev/prebuild step does it automatically).`
    )
  }

  return JSON.parse(fs.readFileSync(NAV_FILE, "utf8")) as DocsNav
}

let cachedNav: DocsNav | null = null

export function getDocsNav(): DocsNav {
  cachedNav ??= readNav()
  return cachedNav
}

export function getDocsPage(route: string): DocsPage | null {
  return getDocsNav().pages.find((page) => page.route === route) ?? null
}

export function getDocsRouteFromSlug(slug: string[] | undefined): string {
  return slug?.length ? `/docs/${slug.join("/")}` : "/docs"
}

export function getDocsMarkdown(page: DocsPage): string {
  return fs.readFileSync(path.join(CACHE_DIR, page.source), "utf8")
}

export function getDocsSourcePath(page: DocsPage): string {
  return path.join(CACHE_DIR, page.source)
}

/** Raw markdown URL, mirroring GitBook's per-page `.md` output. */
export function getDocsRawPath(page: DocsPage): string {
  return page.route === "/docs" ? "/docs/index.md" : `${page.route}.md`
}

export function getDocsEditUrl(page: DocsPage): string {
  const nav = getDocsNav()
  return `https://github.com/${nav.repo}/blob/${nav.sha}/docs/${page.source}`
}

function routeBySource(): Map<string, string> {
  return new Map(getDocsNav().pages.map((page) => [page.source, page.route]))
}

/**
 * Rewrites the markdown's own relative links and image paths onto this site: `guides/compare.md` →
 * `/docs/guides/compare`, `../images/compare.png` → `/docs/images/compare.png`. Anything external,
 * root-absolute or hash-only is left alone. Broken targets are caught by the fetch pipeline before the
 * build ever renders a page.
 */
function remarkRewriteDocsLinks(options: { source: string; routes: Map<string, string> }) {
  const baseDir = path.posix.dirname(options.source)

  function rewrite(url: string): string | null {
    if (!url || /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith("#") || url.startsWith("/")) {
      return null
    }

    const hashIndex = url.indexOf("#")
    const targetPath = hashIndex === -1 ? url : url.slice(0, hashIndex)
    const hash = hashIndex === -1 ? "" : url.slice(hashIndex)
    const resolved = path.posix.normalize(path.posix.join(baseDir, targetPath))

    if (targetPath.endsWith(".md")) {
      const route = options.routes.get(resolved)
      return route ? `${route}${hash}` : null
    }

    if (resolved.startsWith("images/")) {
      return `/docs/${resolved}${hash}`
    }

    return null
  }

  return (tree: Root) => {
    visit(tree, "image", (node: Image) => {
      const rewritten = rewrite(node.url)
      if (rewritten) node.url = rewritten
    })
    visit(tree, "link", (node: Link) => {
      const rewritten = rewrite(node.url)
      if (rewritten) node.url = rewritten
    })
  }
}

const anchorContent: ElementContent = {
  type: "element",
  tagName: "span",
  properties: { ariaHidden: "true" },
  children: [{ type: "text", value: "#" }],
}

/**
 * Markdown images arrive as `<p><img …></p>`; the docs design wants `<figure>` with the alt text as the
 * caption, so wrap a paragraph that holds nothing but an image. Standalone images get lazy loading.
 */
function rehypeDocsFigures() {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: HastElement, index, parent) => {
      if (node.tagName === "img") {
        node.properties ??= {}
        node.properties.loading = "lazy"
        node.properties.decoding = "async"
        return
      }

      if (node.tagName !== "p" || typeof index !== "number" || !parent) return

      const meaningful = node.children.filter(
        (child) => child.type !== "text" || child.value.trim() !== ""
      )
      if (meaningful.length !== 1) return

      const image = meaningful[0]
      if (image.type !== "element" || image.tagName !== "img") return

      const alt = typeof image.properties?.alt === "string" ? image.properties.alt : ""
      const figure: HastElement = {
        type: "element",
        tagName: "figure",
        properties: {},
        children: [
          image,
          ...(alt
            ? [
                {
                  type: "element" as const,
                  tagName: "figcaption",
                  properties: {},
                  children: [{ type: "text" as const, value: alt }],
                },
              ]
            : []),
        ],
      }

      ;(parent as Parent).children[index] = figure
    })
  }
}

export type RenderedDocs = {
  html: string
  markdown: string
}

export async function renderDocsPage(page: DocsPage): Promise<RenderedDocs> {
  const markdown = getDocsMarkdown(page)

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRewriteDocsLinks, { source: page.source, routes: routeBySource() })
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeDocsFigures)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        className: ["docs-anchor"],
        ariaHidden: "true",
        tabIndex: -1,
      },
      content: anchorContent,
    })
    .use(rehypeShiki, {
      themes: {
        light: "rose-pine-dawn",
        dark: "rose-pine",
      },
      defaultLanguage: "text",
      fallbackLanguage: "text",
      addLanguageClass: true,
    })
    .use(rehypeStringify)
    .process(markdown)

  return { html: String(file), markdown }
}
