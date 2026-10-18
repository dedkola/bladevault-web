#!/usr/bin/env node
/**
 * Build-time documentation pipeline for the `/docs` section (Linear TK-43).
 *
 * The markdown lives in the app repo (`dedkola/bladevault`, `docs/` + `docs/images/`); this site
 * never vendors it. The script runs as `predev` / `prebuild`, and:
 *
 *   1. resolves `DOCS_REF` (default `main`) to a commit SHA through the GitHub API,
 *   2. downloads that revision's tarball once into `.docs-cache/<sha>/` and extracts `docs/**`,
 *   3. copies the markdown to `.docs-cache/current/`, the images to `public/docs/images/` and a raw
 *      `.md` copy of every page to `public/docs/`,
 *   4. parses `docs/SUMMARY.md` into `.docs-cache/current/nav.json` (groups, pages, per-page prev/next,
 *      headings, legacy redirects) — routes, sitemap and redirects all read this one file,
 *   5. emits `public/docs/search-index.json` and `public/docs/llms.txt`,
 *   6. validates every relative markdown link and image reference, failing the build with the
 *      offending file and line.
 *
 * A transient GitHub outage must not break the marketing site: if the download fails and a cached
 * revision exists, the newest cached one is used and the build continues with a warning. Only a
 * failure with no cache at all aborts.
 */
import fs from "node:fs"
import path from "node:path"
import { gunzipSync } from "node:zlib"

import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeSlug from "rehype-slug"
import { unified } from "unified"
import { visit } from "unist-util-visit"

const UPSTREAM_REPO = "dedkola/bladevault"
const REQUESTED_REF = process.env.DOCS_REF?.trim() || "main"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN?.trim()
const SITE_URL = (process.env.SITE_URL?.trim() || "https://bladevault.pro").replace(/\/$/, "")

const ROOT = process.cwd()
const CACHE_DIR = path.join(ROOT, ".docs-cache")
const CURRENT_DIR = path.join(CACHE_DIR, "current")
const PUBLIC_DOCS_DIR = path.join(ROOT, "public", "docs")
const IMAGES_DIR = path.join(PUBLIC_DOCS_DIR, "images")

const log = (message) => console.log(`[docs] ${message}`)
const warn = (message) => console.warn(`[docs] warning: ${message}`)

/* ------------------------------------------------------------------ helpers */

function readTarString(buffer, start, length) {
  const slice = buffer.subarray(start, start + length)
  const end = slice.indexOf(0)
  return (end === -1 ? slice : slice.subarray(0, end)).toString("utf8")
}

/** Minimal tar reader: extracts only `docs/**` from a gzipped GitHub tarball. */
function extractDocsFromTarball(gzipped, destination) {
  const buffer = gunzipSync(gzipped)
  let offset = 0
  let extracted = 0

  while (offset + 512 <= buffer.length) {
    const header = buffer.subarray(offset, offset + 512)
    if (header.every((byte) => byte === 0)) {
      offset += 512
      continue
    }

    const name = readTarString(header, 0, 100)
    const prefix = readTarString(header, 345, 155)
    const size = Number.parseInt(readTarString(header, 124, 12).trim() || "0", 8) || 0
    const typeFlag = String.fromCharCode(header[156] || 0x30)
    const fullName = prefix ? `${prefix}/${name}` : name

    offset += 512
    const dataStart = offset
    offset += Math.ceil(size / 512) * 512

    // Drop the `<repo>-<sha>/` root component the tarball wraps everything in.
    const relative = fullName.split("/").slice(1).join("/")
    if (!relative.startsWith("docs/")) continue

    const target = path.join(destination, relative)

    if (typeFlag === "5") {
      fs.mkdirSync(target, { recursive: true })
      continue
    }
    if (typeFlag !== "0" && typeFlag !== "\0") continue

    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, buffer.subarray(dataStart, dataStart + size))
    extracted += 1
  }

  return extracted
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[_\s]+/g, "-")
    .replace(/[^a-z0-9.-]/g, "")
}

/* ---------------------------------------------------------------- fetching */

async function resolveSha(ref) {
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "bladevault-web-docs-pipeline",
  }
  if (GITHUB_TOKEN) headers.authorization = `Bearer ${GITHUB_TOKEN}`

  const response = await fetch(
    `https://api.github.com/repos/${UPSTREAM_REPO}/commits/${encodeURIComponent(ref)}`,
    { headers }
  )
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} resolving ${UPSTREAM_REPO}@${ref}`)
  }
  const payload = await response.json()
  if (!payload?.sha) throw new Error(`GitHub API returned no sha for ${UPSTREAM_REPO}@${ref}`)
  return payload.sha
}

function cachedRevisions() {
  if (!fs.existsSync(CACHE_DIR)) return []
  return fs
    .readdirSync(CACHE_DIR)
    .filter((entry) => fs.existsSync(path.join(CACHE_DIR, entry, "docs", "SUMMARY.md")))
    .map((entry) => ({
      sha: entry,
      modified: fs.statSync(path.join(CACHE_DIR, entry)).mtimeMs,
    }))
    .sort((a, b) => b.modified - a.modified)
}

async function ensureRevision(sha) {
  const revisionDir = path.join(CACHE_DIR, sha)
  if (fs.existsSync(path.join(revisionDir, "docs", "SUMMARY.md"))) {
    log(`using cached ${UPSTREAM_REPO}@${sha.slice(0, 7)}`)
    return revisionDir
  }

  const url = `https://codeload.github.com/${UPSTREAM_REPO}/tar.gz/${sha}`
  log(`downloading ${UPSTREAM_REPO}@${sha.slice(0, 7)}`)
  const response = await fetch(url, {
    headers: {
      "user-agent": "bladevault-web-docs-pipeline",
      ...(GITHUB_TOKEN ? { authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
  })
  if (!response.ok) {
    throw new Error(`codeload ${response.status} for ${UPSTREAM_REPO}@${sha}`)
  }

  const archive = Buffer.from(await response.arrayBuffer())
  const staging = `${revisionDir}.partial`
  fs.rmSync(staging, { recursive: true, force: true })
  fs.mkdirSync(staging, { recursive: true })
  const extracted = extractDocsFromTarball(archive, staging)
  if (!fs.existsSync(path.join(staging, "docs", "SUMMARY.md")) || extracted === 0) {
    fs.rmSync(staging, { recursive: true, force: true })
    throw new Error(`tarball for ${UPSTREAM_REPO}@${sha} contained no docs/`)
  }
  fs.rmSync(revisionDir, { recursive: true, force: true })
  fs.renameSync(staging, revisionDir)
  return revisionDir
}

/* ------------------------------------------------------- markdown analysis */

const analysisPipeline = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)

function hastText(node) {
  if (node.type === "text") return node.value
  if (!Array.isArray(node.children)) return ""
  return node.children.map(hastText).join("")
}

function mdastText(node) {
  if (node.type === "text" || node.type === "inlineCode") return node.value
  if (!Array.isArray(node.children)) return ""
  return node.children.map(mdastText).join(" ")
}

function firstParagraph(mdast) {
  for (const child of mdast.children ?? []) {
    if (child.type === "paragraph") return mdastText(child).replace(/\s+/g, " ").trim()
  }
  return ""
}

async function analyzePage(markdown) {
  const mdast = analysisPipeline.parse(markdown)
  const hast = await analysisPipeline.run(mdast)

  const headings = []
  visit(hast, "element", (node) => {
    if (node.tagName !== "h2" && node.tagName !== "h3") return
    const text = hastText(node).trim()
    if (!text) return
    headings.push({ depth: Number(node.tagName.slice(1)), id: node.properties?.id ?? "", text })
  })

  const body = mdastText({ type: "root", children: (mdast.children ?? []).filter((child) => child.type !== "code" && child.type !== "html") })

  return {
    headings,
    description: firstParagraph(mdast),
    body: body.replace(/\s+/g, " ").trim(),
  }
}

/* ---------------------------------------------------------------- SUMMARY */

function parseSummary(markdown) {
  const rootPages = []
  const groups = []
  let current = null

  for (const rawLine of markdown.split("\n")) {
    const groupMatch = /^##\s+(.+?)\s*$/.exec(rawLine)
    if (groupMatch) {
      current = { title: groupMatch[1], pages: [] }
      groups.push(current)
      continue
    }

    const pageMatch = /^\s*[-*]\s+\[([^\]]+)\]\(([^)]+)\)\s*$/.exec(rawLine)
    if (!pageMatch) continue

    const page = { title: pageMatch[1].trim(), source: pageMatch[2].trim() }
    if (current) current.pages.push(page)
    else rootPages.push(page)
  }

  return { rootPages, groups }
}

function routeForPage(page, groupTitle) {
  if (page.source === "README.md") return "/docs"

  const directory = path.posix.dirname(page.source)
  const fileSlug = slugify(path.posix.basename(page.source))

  if (directory === ".") {
    if (!groupTitle) throw new Error(`root-level page ${page.source} has no SUMMARY group to route under`)
    return `/docs/${slugify(groupTitle)}/${fileSlug}`
  }
  return `/docs/${slugify(directory)}/${fileSlug}`
}

/* ---------------------------------------------------------------- validate */

const LINK_PATTERN = /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g

function validatePage(relativeSource, markdown, knownSources, docsDir, problems) {
  const baseDir = path.posix.dirname(relativeSource)
  let inFence = false

  markdown.split("\n").forEach((line, index) => {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      return
    }
    if (inFence) return

    for (const match of line.matchAll(LINK_PATTERN)) {
      const [full, bang, , target] = match
      if (/^[a-z][a-z0-9+.-]*:/i.test(target) || target.startsWith("#") || target.startsWith("/")) continue

      const [targetPath] = target.split("#")
      const resolved = path.posix.normalize(path.posix.join(baseDir, targetPath))
      const lineNumber = index + 1
      const location = `${relativeSource}:${lineNumber} (${full})`

      if (resolved.startsWith("../")) {
        problems.push(`${location} escapes the docs directory`)
        continue
      }

      if (targetPath.endsWith(".md")) {
        if (!knownSources.has(resolved)) {
          problems.push(`${location} links to unknown page ${resolved}`)
        }
        continue
      }

      const onDisk = path.join(docsDir, resolved)
      if (!fs.existsSync(onDisk)) {
        const kind = bang ? "image" : "link"
        problems.push(`${location} ${kind} target ${resolved} does not exist`)
        continue
      }

      if (bang && !resolved.startsWith("images/")) {
        problems.push(`${location} image outside docs/images (${resolved})`)
      }
    }
  })
}

/* -------------------------------------------------------------------- emit */

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`)
}

function parseGitbookRedirects(configText, pagesBySource, problems) {
  const redirects = new Map()
  const lines = configText.split("\n")
  const start = lines.findIndex((line) => /^redirects:\s*$/.test(line))
  if (start === -1) return redirects

  for (const line of lines.slice(start + 1)) {
    if (line.trim() && !/^\s/.test(line)) break
    const match = /^\s+([^:\s]+):\s*(\S+)\s*$/.exec(line)
    if (!match) continue

    const [, from, to] = match
    const target = to.endsWith(".md") ? pagesBySource.get(to) : pagesBySource.get(`${to}.md`)
    if (!target) {
      problems.push(`.gitbook.yaml redirect ${from} -> ${to} points at an unknown page`)
      continue
    }
    redirects.set(`/${from}`, target.route)
  }

  return redirects
}

async function main() {
  let sha
  let stale = false
  let revisionDir

  try {
    sha = await resolveSha(REQUESTED_REF)
    revisionDir = await ensureRevision(sha)
  } catch (error) {
    const cached = cachedRevisions()
    if (!cached.length) {
      throw new Error(
        `[docs] could not resolve or download ${UPSTREAM_REPO}@${REQUESTED_REF} (${error.message}) and there is no cached revision to fall back to`
      )
    }
    sha = cached[0].sha
    stale = true
    revisionDir = path.join(CACHE_DIR, sha)
    warn(`${error.message} — falling back to cached ${UPSTREAM_REPO}@${sha.slice(0, 7)}`)
  }

  const docsDir = path.join(revisionDir, "docs")
  const summary = fs.readFileSync(path.join(docsDir, "SUMMARY.md"), "utf8")
  const { rootPages, groups } = parseSummary(summary)

  /** @type {Map<string, {title: string, group: string|null, route: string, source: string}>} */
  const pagesBySource = new Map()
  for (const page of rootPages) {
    if (pagesBySource.has(page.source)) continue
    pagesBySource.set(page.source, { title: page.title, group: null, route: "/docs", source: page.source })
  }
  for (const group of groups) {
    for (const page of group.pages) {
      if (pagesBySource.has(page.source)) {
        warn(`SUMMARY.md lists ${page.source} more than once — keeping the first entry`)
        continue
      }
      pagesBySource.set(page.source, {
        title: page.title,
        group: group.title,
        route: routeForPage(page, group.title),
        source: page.source,
      })
    }
  }

  if (!pagesBySource.size) throw new Error("SUMMARY.md produced no pages")

  const problems = []
  const analyses = new Map()

  for (const source of pagesBySource.keys()) {
    const markdownPath = path.join(docsDir, source)
    if (!fs.existsSync(markdownPath)) {
      problems.push(`SUMMARY.md references ${source}, which does not exist`)
      continue
    }
    const markdown = fs.readFileSync(markdownPath, "utf8")
    validatePage(source, markdown, pagesBySource, docsDir, problems)
    analyses.set(source, await analyzePage(markdown))
  }

  const gitbookConfigPath = path.join(docsDir, ".gitbook.yaml")
  const redirects = fs.existsSync(gitbookConfigPath)
    ? parseGitbookRedirects(fs.readFileSync(gitbookConfigPath, "utf8"), pagesBySource, problems)
    : new Map()

  if (problems.length) {
    throw new Error(`docs validation failed:\n  - ${problems.join("\n  - ")}`)
  }

  const orderedPages = [...pagesBySource.values()]
  const flatPages = orderedPages.map((page, index) => ({
    title: page.title,
    group: page.group,
    route: page.route,
    source: page.source,
    description: analyses.get(page.source)?.description ?? "",
    headings: analyses.get(page.source)?.headings ?? [],
    prev: index > 0 ? orderedPages[index - 1].route : null,
    next: index < orderedPages.length - 1 ? orderedPages[index + 1].route : null,
  }))

  const navGroups = groups
    .map((group) => ({
      title: group.title,
      pages: group.pages
        .map((page) => pagesBySource.get(page.source))
        .filter(Boolean)
        .map((page) => ({
          title: page.title,
          route: page.route,
          source: page.source,
          headings: analyses.get(page.source)?.headings ?? [],
        })),
    }))
    .filter((group) => group.pages.length)

  // Legacy GitBook paths (`/guides/compare`, …) become 301s onto `/docs/...`. The site root is not
  // touched: `/` belongs to the marketing homepage, so the README page has no legacy counterpart.
  const redirectMap = {}
  for (const page of orderedPages) {
    if (page.route === "/docs") continue
    redirectMap[page.route.replace(/^\/docs/, "")] = page.route
  }
  for (const [from, to] of redirects) redirectMap[from] = to

  const nav = {
    repo: UPSTREAM_REPO,
    requestedRef: REQUESTED_REF,
    sha,
    stale,
    generatedAt: new Date().toISOString(),
    groups: navGroups,
    rootPage: flatPages.find((page) => page.route === "/docs") ?? null,
    pages: flatPages,
    redirects: redirectMap,
  }

  // Clean generation: `public/docs` is a build artifact and never committed.
  fs.rmSync(PUBLIC_DOCS_DIR, { recursive: true, force: true })
  fs.rmSync(CURRENT_DIR, { recursive: true, force: true })
  fs.mkdirSync(CURRENT_DIR, { recursive: true })
  fs.mkdirSync(PUBLIC_DOCS_DIR, { recursive: true })

  const searchIndex = []
  const llmsLines = [
    "# BladeVault documentation",
    "",
    `> BladeVault is a local-first knife collection manager. These pages are rendered from ${UPSTREAM_REPO}@${sha}.`,
    "",
  ]

  for (const page of flatPages) {
    const markdown = fs.readFileSync(path.join(docsDir, page.source), "utf8")

    const currentPath = path.join(CURRENT_DIR, page.source)
    fs.mkdirSync(path.dirname(currentPath), { recursive: true })
    fs.writeFileSync(currentPath, markdown)

    const rawRelative = page.route === "/docs" ? "index.md" : `${page.route.replace(/^\/docs\//, "")}.md`
    const rawPath = path.join(PUBLIC_DOCS_DIR, rawRelative)
    fs.mkdirSync(path.dirname(rawPath), { recursive: true })
    fs.writeFileSync(rawPath, markdown)

    searchIndex.push({
      title: page.title,
      group: page.group ?? "Overview",
      route: page.route,
      description: page.description,
      headings: page.headings,
      body: analyses.get(page.source)?.body ?? "",
    })
  }

  for (const group of navGroups) {
    llmsLines.push(`## ${group.title}`, "")
    for (const page of group.pages) {
      const description = flatPages.find((entry) => entry.route === page.route)?.description
      llmsLines.push(
        description
          ? `- [${page.title}](${SITE_URL}${page.route}): ${description}`
          : `- [${page.title}](${SITE_URL}${page.route})`
      )
    }
    llmsLines.push("")
  }

  fs.cpSync(path.join(docsDir, "images"), IMAGES_DIR, { recursive: true })

  writeJson(path.join(CURRENT_DIR, "nav.json"), nav)
  writeJson(path.join(PUBLIC_DOCS_DIR, "search-index.json"), searchIndex)
  fs.writeFileSync(path.join(PUBLIC_DOCS_DIR, "llms.txt"), `${llmsLines.join("\n").trimEnd()}\n`)

  const imageCount = fs.readdirSync(IMAGES_DIR).length
  log(
    `${UPSTREAM_REPO}@${sha} (ref ${REQUESTED_REF}${stale ? ", stale cache" : ""}) → ` +
      `${flatPages.length} pages, ${navGroups.length} groups, ${imageCount} images, ` +
      `${Object.keys(redirectMap).length} redirects`
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
