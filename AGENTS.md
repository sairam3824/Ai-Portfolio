# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Repository Structure

Monorepo with three app generations plus shared data:
- `Version3/` — Current production app deployed at [saiii.in](https://saiii.in) via the root `vercel.json`
- `Version2/` — Legacy/transitional portfolio kept for reference and compatibility work
- `Version1/` — Oldest legacy portfolio served under `/v1`
- `api/` — Root-level Vercel serverless functions
- `shared-data/` — Shared site metadata, writing content, routes, and SEO artifacts used across versions

All active feature development should target `Version3/` unless the task explicitly calls for Version1 or Version2.
Version1 and Version2 should generally receive only compatibility fixes, historical maintenance, or explicit user-requested updates.

## Commands

Primary app commands run from `Version3/`:

```bash
cd Version3
npm install       # Install dependencies
npm run dev       # Dev server at localhost:5173
npm run build     # tsc + vite build (TypeScript check first)
npm run preview   # Preview production build locally
```

Version2 uses the same command shape from `Version2/`.
Version1 also uses Vite, but has its own legacy dependency graph and should only be touched when needed.

Root-level maintenance commands:

```bash
npm run check:writing   # Validate writing routes, redirects, and sitemap invariants
npm run build           # Runs writing checks, builds Version3 and Version1, and copies Version1 into Version3/dist/v1
```

Root Vercel deployment uses: `DISABLE_PWA=true npm run build` (output: `Version3/dist`).

## Architecture

**Feature-based modules** under `Version3/src/features/`:
Each feature has a `Page.tsx` (full-page route), `Section.tsx` (embeddable), and optionally a `*Data.ts` file.

**All content is client-side data** — no CMS. Editing content means editing data files:
- `shared-data/blogData.ts` — Writing entries (internal historical name retained for compatibility; interface: `{ id, title, excerpt, date, readTime, tags, icon, iconColor, content?, externalLink? }`)
- `shared-data/blogContent.ts` — Long-form writing content loaders
- `features/projects/projectsData.ts` — Projects
- `features/skills/skillsData.ts` — Skills by category
- `features/certifications/certificationsData.ts` — Certifications
- `features/coding-profiles/codingProfilesData.ts` — Competitive programming profiles

**Routing** is in each app's `src/App.tsx`. Shared public route constants live in `shared-data/siteRoutes.ts`.
Use those shared constants for stable public URLs instead of hardcoding route strings in new work.

**Primary writing route** is `/writing`. Legacy `/blogs` URLs must continue to redirect permanently.
Do not remove these redirects without an explicit migration plan.

**AI Chat Widget** calls `/api/chat.ts` (Vercel serverless, Node.js runtime, OpenAI). `OPENAI_API_KEY` must be set in Vercel environment (not in `.env`).

**SEO** is handled via each app's shared `Seo.tsx` component together with `shared-data/seoArtifacts.ts`.
Sitemaps, metadata, and public canonicals should always prefer `/writing` over `/blogs`.

**Supabase** is initialized with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `.env`. Used for contact forms and subscriptions/auth where present.

## Key Patterns

**Adding a writing entry:** Add it to `shared-data/blogData.ts`. For long-form entries, create a file in `shared-data/blog/posts/` and import the content into the `content` field. For external entries, use `externalLink`.

**Adding a route:** Prefer shared constants from `shared-data/siteRoutes.ts` for stable public URLs. Preserve old URLs with permanent redirects whenever renaming.

**Version policy:** Prefer changing one shared source of truth over repeating edits across Version1, Version2, and Version3. If a change is purely historical, keep it scoped to the legacy version instead of mirroring it everywhere.

**Internal naming:** Some internal modules still use `blog` in filenames for compatibility. User-facing language should use `Writing`. When modernizing internals, add aliases first rather than breaking imports abruptly.

**Icons:** Only Lucide React icons are used. Pass icon names as strings in data files; components import and render them dynamically.

**Path alias:** `@/*` resolves to `src/*`. Use this for all internal imports.

## Environment Variables

```bash
VITE_SUPABASE_URL=       # Required for contact/auth
VITE_SUPABASE_ANON_KEY=  # Required for contact/auth
OPENAI_API_KEY=          # Set in Vercel env only (server-side)
```
