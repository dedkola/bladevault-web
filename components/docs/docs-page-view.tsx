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

/**
 * One rendered documentation page: toolbar, the 768 px content column with the sticky "On this page" rail,
 * and the SUMMARY-ordered prev/next pair. Both `/docs` and `/docs/[...slug]` render through this.
 */
export async function DocsPageView({ page }: { page: DocsPage }) {
  const nav = getDocsNav()
  const { html, markdown } = await renderDocsPage(page)

  const prev = page.prev ? (nav.pages.find((entry) => entry.route === page.prev) ?? null) : null
  const next = page.next ? (nav.pages.find((entry) => entry.route === page.next) ?? null) : null

  return (
    <div className="pb-2">
      <DocsToolbar
        title={page.title}
        group={page.group}
        route={page.route}
        markdown={markdown}
        editUrl={getDocsEditUrl(page)}
      />

      <div className="pt-8">
        <div className="grid gap-14 xl:grid-cols-[minmax(0,768px)_232px]">
          <DocsContent html={html} />
          <DocsToc headings={page.headings} />
        </div>

        <div className="xl:max-w-[768px]">
          <DocsPager
            prev={prev ? { title: prev.title, route: prev.route } : null}
            next={next ? { title: next.title, route: next.route } : null}
          />
        </div>
      </div>
    </div>
  )
}
