import Image from "next/image"

import { CodeCopy } from "@/components/code-copy"

export function InstallCta() {
  return (
    <section id="install" className="vault-shell overflow-hidden">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.98fr)]">
        <div className="p-6 sm:p-8 xl:p-10">
          <p className="vault-label">Install</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Run BladeVault the same day you discover it.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            Clone the repo, start the app locally, and begin building your
            collection library right away.
          </p>

          <div className="mt-6 grid gap-4">
            <div>
              <CodeCopy text="git clone https://github.com/kolasokol/bladevault.git && cd bladevault && npm install && npm run dev" />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Clone the repo, install dependencies, then start the local dev
                server.
              </p>
            </div>

            <div>
              <CodeCopy text="docker compose up -d" />
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Prefer containers? Bring up the full stack with Docker instead.
              </p>
            </div>
          </div>

          <div className="mt-6 vault-panel p-5">
            <p className="vault-label">After Launch</p>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Open `http://localhost:3000`, explore the dashboard, browse the
              library, and use compare or quick add to see the strongest parts
              of the product right away.
            </p>
            <a
              href="https://github.com/kolasokol/bladevault"
              className="mt-4 inline-flex text-sm font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              View the full project on GitHub
            </a>
          </div>
        </div>

        <div className="vault-grid border-t border-border/60 p-6 sm:p-8 xl:border-l xl:border-t-0 xl:p-10">
          <div className="vault-panel overflow-hidden p-3">
            <Image
              src="/screenshots/add.png"
              width={1440}
              height={900}
              alt="BladeVault quick add screenshot"
              className="w-full rounded-[1.3rem] border border-border/70"
            />
            <div className="px-2 pb-2 pt-4">
              <p className="vault-label">Quick Add</p>
              <h3 className="mt-2 text-lg font-medium text-foreground">
                Add new entries faster
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Paste a product link to pull in details automatically, or enter
                everything by hand when needed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
