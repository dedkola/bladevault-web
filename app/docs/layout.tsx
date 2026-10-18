import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { getDocsNav } from "@/lib/docs"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const nav = getDocsNav()

  return (
    <div className="mx-auto w-full max-w-[1600px] px-4 py-4 sm:px-6">
      <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[248px_minmax(0,1fr)]">
        <DocsSidebar
          groups={nav.groups}
          repo={nav.repo}
          sha={nav.sha}
          stale={nav.stale}
        />
        <main id="main" className="min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}
