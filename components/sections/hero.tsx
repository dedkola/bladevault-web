"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { CodeCopy } from "@/components/code-copy"

export function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <div className="flex flex-col items-center gap-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            A sharp, local-first knife collection manager.
          </h1>
        </motion.div>
        <p className="max-w-2xl text-muted-foreground">
          Track your EDC knives with a clean inventory, side-by-side compare,
          and one-paste URL scraping — all on your own machine.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button
            render={<a href="https://github.com/kolasokol/bladevault" />}
            nativeButton={false}
            size="lg"
          >
            View on GitHub
          </Button>
          <div className="w-full sm:w-auto">
            <CodeCopy text="docker compose up -d" />
          </div>
        </div>
      </div>
    </section>
  )
}
