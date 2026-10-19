import assert from "node:assert/strict"
import test from "node:test"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { unified } from "unified"

import { docsVideo, youtubeVideoId } from "../lib/docs-video.mjs"

const parser = unified().use(remarkParse).use(remarkGfm)
const video = (markdown) => docsVideo(parser.parse(markdown).children[0])

test("linked thumbnails and GitBook tags identify both requested videos", () => {
  for (const id of ["GJiksvGPBs0", "vOOuwQlW0hI"]) {
    assert.equal(
      video(
        `[![Watch video](https://img.youtube.com/vi/${id}/hqdefault.jpg)](https://www.youtube.com/watch?v=${id})`
      ).id,
      id
    )
    assert.equal(
      video(`{% embed url="https://www.youtube.com/watch?v=${id}" %}`).id,
      id
    )
    assert.equal(youtubeVideoId(`https://youtu.be/${id}`), id)
  }
})

test("ordinary links, screenshots, prose, and code are not players", () => {
  for (const markdown of [
    "[Video](https://www.youtube.com/watch?v=GJiksvGPBs0)",
    "![Screenshot](../images/compare.png)",
    "[![Screenshot](image.png)](https://example.com)",
    'Read this {% embed url="https://www.youtube.com/watch?v=GJiksvGPBs0" %}',
    '`{% embed url="https://www.youtube.com/watch?v=GJiksvGPBs0" %}`',
    '```text\n{% embed url="https://www.youtube.com/watch?v=GJiksvGPBs0" %}\n```',
  ])
    assert.equal(video(markdown), null, markdown)
})

test("player IDs cannot introduce an external host, scheme, or extra path", () => {
  for (const url of [
    "https://www.youtube.com.evil.example/watch?v=GJiksvGPBs0",
    "https://www.youtube.com@evil.example/watch?v=GJiksvGPBs0",
    "http://www.youtube.com/watch?v=GJiksvGPBs0",
    "javascript:alert(1)",
    "https://www.youtube.com/watch?v=bad",
    "https://youtu.be/GJiksvGPBs0/extra",
    "https://www.youtube.com:8443/watch?v=GJiksvGPBs0",
  ])
    assert.equal(youtubeVideoId(url), null, url)
})
