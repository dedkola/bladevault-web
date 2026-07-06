"use client"

import Image from "next/image"
import { ArrowRight, Cloud, Monitor, ShieldCheck } from "lucide-react"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { CodeCopy } from "@/components/code-copy"

const stats = [
  {
    label: "Storage",
    value: "Local-first",
    detail: "Your collection stays on your machine by default.",
  },
  {
    label: "Surface",
    value: "Desktop-grade",
    detail: "A focused workspace built for browsing and reviewing your vault.",
  },
  {
    label: "Workflow",
    value: "Compare fast",
    detail: "Move from quick add to deep detail without losing context.",
  },
]

export function Hero() {
  return (
    <section id="overview" className="vault-shell overflow-hidden">
      <div className="grid lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)]">
        <div className="border-b border-border/60 p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-10 xl:p-12">
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="vault-chip">Your private knife collection</span>
            <span className="vault-chip">EDC blade app</span>
            <span className="vault-chip">Open Source</span>
            <span className="vault-chip">Free</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="vault-label mb-4">Overview</p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              Your private collection deserves a vault, not a spreadsheet.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg"
          >
            BladeVault is a local-first desktop app for collectors who want a
            cleaner library, stronger detail pages, faster comparison, and a
            workspace that feels deliberate instead of improvised.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button
              render={<a href="https://github.com/kolasokol/bladevault" />}
              nativeButton={false}
              size="lg"
              className="rounded-2xl px-4"
            >
              View Repository
              <ArrowRight className="size-4" />
            </Button>
            <Button
              render={<a href="#install" />}
              nativeButton={false}
              variant="outline"
              size="lg"
              className="rounded-2xl px-4"
            >
              Open Install Guide
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-6"
          >
            <CodeCopy text="git clone https://github.com/kolasokol/bladevault.git && cd bladevault && npm install && npm run dev" />
          </motion.div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="vault-panel p-4">
                <p className="vault-label">{stat.label}</p>
                <p className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="vault-grid relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-[rgb(200_156_61_/_0.12)] to-transparent" />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="vault-panel relative overflow-hidden p-4 sm:p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="vault-label">Dashboard</p>
                <p className="mt-1 text-lg font-medium text-foreground">
                  Collection overview
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-[var(--bladevault-line)]/80" />
                <span className="size-2.5 rounded-full bg-[var(--bladevault-gold)]/80" />
                <span className="size-2.5 rounded-full bg-[var(--bladevault-olive)]/90" />
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.35rem] border border-border/70">
              <Image
                src="/screenshots/dashboard.png"
                width={1440}
                height={900}
                alt="BladeVault dashboard screenshot"
                priority
                className="h-auto w-full"
              />
            </div>
          </motion.div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="vault-panel p-4">
              <ShieldCheck className="size-4 text-[var(--bladevault-title)]" />
              <p className="mt-3 text-sm font-medium text-foreground">
                Private by default
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Keep the vault local and in your control.
              </p>
            </div>
            <div className="vault-panel p-4">
              <Cloud className="size-4 text-[var(--bladevault-title)]" />
              <p className="mt-3 text-sm font-medium text-foreground">
                Backup when you want it
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Optional cloud sync without changing the core model.
              </p>
            </div>
            <div className="vault-panel p-4">
              <Monitor className="size-4 text-[var(--bladevault-title)]" />
              <p className="mt-3 text-sm font-medium text-foreground">
                Calm desktop feel
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Sidebar-first UI with clean hierarchy and focused depth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
