import { DocsContent } from "@/components/docs/docs-content"
import { DocsPager } from "@/components/docs/docs-pager"
import { DocsToc } from "@/components/docs/docs-toc"
import { DocsToolbar } from "@/components/docs/docs-toolbar"
import {
  type DocsPage,
  getDocsEditUrl,
  getDocsNav,
  renderDocsPage,
} from "@/lib/docs"

export async function DocsPageView({ page }: { page: DocsPage }) {
  const nav = getDocsNav()
  const { introHtml, html, markdown } = await renderDocsPage(page)

  const prev = page.prev
    ? (nav.pages.find((entry) => entry.route === page.prev) ?? null)
    : null
  const next = page.next
    ? (nav.pages.find((entry) => entry.route === page.next) ?? null)
    : null

  return (
    <div className="vault-shell min-w-0">
      <DocsToolbar
        title={page.title}
        group={page.group}
        route={page.route}
        markdown={markdown}
        editUrl={getDocsEditUrl(page)}
      />

      <header className="docs-intro vault-grid rounded-t-none border-b border-border/60 px-5 py-8 sm:px-8 sm:py-10 xl:px-10">
        <p className="vault-label mb-4">{page.group ?? "Documentation"}</p>
        <div
          className="docs-prose"
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />
      </header>

      <div className="grid min-w-0 gap-8 px-5 py-8 sm:px-8 xl:grid-cols-[minmax(0,1fr)_180px] xl:gap-10 xl:px-10 xl:py-10">
        <div className="max-w-3xl min-w-0">
          <DocsContent key={page.route} html={html} />
          <DocsPager prev={prev} next={next} />
        </div>
        <DocsToc key={page.route} headings={page.headings} />
      </div>
    </div>
  )
}
