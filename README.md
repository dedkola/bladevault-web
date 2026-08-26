# BladeVault Web

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-20232a?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel)](https://vercel.com/)

Promo website for [BladeVault](https://github.com/dedkola/bladevault), the local-first desktop knife collection manager. This repository contains the marketing site and screenshot-driven product presentation, not the main app codebase.

## About

The site is built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. It focuses on presenting the BladeVault product clearly through editorial sections, a sidebar-first desktop layout, and app screenshots sourced from the main repository.

If you need the application itself, use the main [BladeVault repo](https://github.com/dedkola/bladevault).

## Product Screenshots

<div align="center">

  <img src="public/screenshots/insights.png" alt="BladeVault collection insights showing collection analytics and data completeness" width="80%" />
  <p><sub>Insights — patterns, dimensions, materials, and collection health</sub></p>

  <img src="public/screenshots/collection.png" alt="BladeVault collection showing search, filters, pinned knives, and image-rich records" width="80%" />
  <p><sub>Collection — search, filter, pin, and browse every knife</sub></p>

  <img src="public/screenshots/detail.png" alt="BladeVault knife detail page with specifications, notes, and image gallery" width="80%" />
  <p><sub>Detail view — specifications, notes, and image gallery</sub></p>

  <img src="public/screenshots/compare.png" alt="BladeVault side-by-side knife comparison table" width="80%" />
  <p><sub>Compare — the details that matter, side by side</sub></p>

  <img src="public/screenshots/add.png" alt="BladeVault add knife page with URL import and manual entry options" width="80%" />
  <p><sub>Add knife — import a product URL or enter it yourself</sub></p>

</div>

## Project Structure

- `app/` - Next.js routes, layout, and global styles
- `components/sections/` - homepage content blocks
- `components/site/` - shared site chrome such as header, footer, and sidebar
- `components/ui/` - reusable UI primitives
- `public/screenshots/` - BladeVault product screenshots used in the promo site

## Development

This project uses [pnpm](https://pnpm.io/) 11. Install dependencies and start the development server with:

```bash
pnpm install
pnpm dev
```

Run the quality gates with:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Assets

Screenshots and product imagery are derived from the main [BladeVault](https://github.com/dedkola/bladevault) repository.
