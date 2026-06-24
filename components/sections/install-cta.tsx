import Image from "next/image"
import { CodeCopy } from "@/components/code-copy"

export function InstallCta() {
  return (
    <section id="install" className="border-t border-border/40">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="flex flex-col gap-8 rounded-xl border border-border/60 bg-muted/50 p-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Run it yourself.
          </h2>

          <div className="flex flex-col gap-2">
            <CodeCopy text="git clone https://github.com/kolasokol/bladevault.git && cd bladevault && npm install && npm run dev" />
            <p className="text-sm text-muted-foreground">
              Clone the repo, install dependencies, and start the dev server.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <CodeCopy text="docker compose up -d" />
            <p className="text-sm text-muted-foreground">
              Or run the full stack with Docker Compose.
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row">
            <Image
              src="/screenshots/add.png"
              width={1440}
              height={900}
              alt="Quick Add — scrape a product URL or enter details manually"
              className="w-full rounded-lg border border-border/60 shadow-sm md:max-w-sm"
            />
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Quick Add — scrape a product URL or enter details manually
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              Open http://localhost:3000 in your browser.
            </p>
            <a
              href="https://github.com/kolasokol/bladevault"
              className="text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              &rarr; View full setup on GitHub.
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
