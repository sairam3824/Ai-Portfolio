# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

Monorepo with two versions:
- `Version2/` — Production app deployed at [saiii.in](https://saiii.in) via Vercel
- `Version1/` — Legacy portfolio (not deployed)
- `api/` — Vercel serverless functions (root-level, detected by Vercel)

All active development happens in `Version2/`.

## Commands

All commands run from `Version2/`:

```bash
cd Version2
npm install       # Install dependencies
npm run dev       # Dev server at localhost:5173
npm run build     # tsc + vite build (TypeScript check first)
npm run lint      # ESLint
npm run preview   # Preview production build locally
```

Root-level `npm run build` builds both versions via postinstall hooks.

Vercel uses: `DISABLE_PWA=true npm run build` (output: `Version2/dist`).

## Architecture

**Feature-based modules** under `Version2/src/features/`:
Each feature has a `Page.tsx` (full-page route), `Section.tsx` (embeddable), and optionally a `*Data.ts` file.

**All content is client-side data** — no CMS. Editing content means editing data files:
- `features/blog/blogData.ts` — Blog posts (interface: `{ id, title, excerpt, date, readTime, tags, icon, iconColor, content?, externalLink? }`)
- `features/projects/projectsData.ts` — Projects
- `features/skills/skillsData.ts` — Skills by category (8 categories, 75+ skills)
- `features/certifications/certificationsData.ts` — Certifications
- `features/coding-profiles/codingProfilesData.ts` — Competitive programming profiles
- `features/education/EducationSection.tsx` — Education data is embedded in the component (no separate data file)

**Routing** is in `src/App.tsx` with React Router DOM v6. Routes are lazy-loaded. Nav items (`NAV_ITEMS` array in App.tsx) drive the sidebar and mobile menu.

**AI Chat Widget** (`features/home/ChatWidget.tsx`) calls `/api/chat.ts` (Vercel serverless, Node.js runtime, OpenAI gpt-4o-mini). Rate limited at 15 req/hour per IP. `OPENAI_API_KEY` must be set in Vercel environment (not in `.env`).

**SEO** is handled via `src/shared/Seo.tsx` (React Helmet Async). Every page uses this component with appropriate props including schema.org structured data.

**Supabase** (`src/lib/supabase.ts`) is initialized with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from `.env`. Used for contact forms and auth.

## Key Patterns

**Adding a blog post:** Add entry to `blogData.ts`. For long-form posts, create a file in `features/blog/posts/` and import the content into the `content` field. For external posts, use `externalLink`.

**Adding a route:** Add to the route list in `App.tsx` and add to `NAV_ITEMS` if it needs sidebar navigation.

**Icons:** Only Lucide React icons are used. Pass icon names as strings in data files; components import and render them dynamically.

**Path alias:** `@/*` resolves to `src/*`. Use this for all internal imports.

**Chunking:** Vite is configured with manual chunks: `vendor` (react/router), `icons` (lucide), `supabase`, `web-vitals`. Don't move these deps without updating `vite.config.ts`.

**PWA is disabled on Vercel** (`DISABLE_PWA=true`) to avoid service worker conflicts. PWA only activates in local production preview.

## Environment Variables

```
VITE_SUPABASE_URL=       # Required for contact/auth
VITE_SUPABASE_ANON_KEY=  # Required for contact/auth
OPENAI_API_KEY=           # Set in Vercel env only (server-side)
```
