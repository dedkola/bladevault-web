import { CodeBlockDecorator } from "@/components/docs/docs-code"

/**
 * Renders the build-time highlighted page straight from the markdown pipeline. The HTML is produced on the
 * server (`lib/docs.ts`), so no markdown parser ships to the browser.
 */
export function DocsContent({ html }: { html: string }) {
  return (
    <>
      <article
        id="docs-content"
        className="docs-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <CodeBlockDecorator containerId="docs-content" />
    </>
  )
}
