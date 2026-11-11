<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository Guidelines

## Project Structure & Module Organization

This repo is a Next.js 16 marketing site for BladeVault. Route entry points live in `app/`, with the homepage assembled in `app/page.tsx` and shared styles in `app/globals.css`. Reusable UI lives in `components/`: `components/sections/` for homepage blocks, `components/site/` for shell elements like the sidebar/header/footer, and `components/ui/` for primitives. Static assets and screenshots live in `public/`.

## Build, Test, and Development Commands

Use `pnpm dev` for local development, `pnpm build` for a production build, `pnpm preview` to serve the static export on the local Workers runtime, and `pnpm deploy` to publish it to Cloudflare. Quality gates are `pnpm lint`, `pnpm typecheck`, and `pnpm format`. Run lint and typecheck before opening a PR; run build for layout or routing changes.

## Coding Style & Naming Conventions

TypeScript and React function components are the default. Follow Prettier formatting and keep Tailwind utility ordering intact. Use PascalCase for component files (`PromoSidebar.tsx` style in code, current repo uses kebab-case filenames like `promo-sidebar.tsx`), camelCase for helpers, and keep section-specific copy/data close to the component that renders it. Reuse shared utilities such as `cn()` from `lib/utils.ts`.

## UI Design Language

Preserve the current BladeVault visual system as the baseline. The palette is warm and archival: olive (`--bladevault-olive`), gold (`--bladevault-gold`), parchment backgrounds, and soft line colors from `app/globals.css`. Use Geist for body and heading text, Geist Mono only for code-like accents. Prefer layered gradients, radial highlights, blur, and the existing `vault-shell`, `vault-panel`, `vault-chip`, and `vault-grid` classes over flat boxes. Hero sections should feel spacious and editorial; sidebars should stay compact, sticky, and utility-first rather than decorative.

## Testing Guidelines

There is no dedicated test suite yet. For every change, run `pnpm lint` and `pnpm typecheck` at minimum. For visual updates, verify desktop and mobile layouts in `pnpm dev` and confirm screenshots in `public/screenshots/` still match the intended presentation.

## Commit & Pull Request Guidelines

Recent history follows Conventional Commit style such as `feat(hero): ...`, `feat(ui): ...`, and `chore(...): ...`. Keep commits scoped and descriptive. PRs should include a short summary, note any design or content decisions, link related issues when applicable, and attach screenshots or recordings for UI changes.
