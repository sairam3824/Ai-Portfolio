# Ai-Portfolio

Personal portfolio monorepo for [saiii.in](https://saiii.in), with shared content, multiple historical app generations, and Vercel serverless APIs.

## Live Sites

- [saiii.in](https://saiii.in)
- [hiremind.saiii.in](https://hiremind.saiii.in)
- [systemdesign.saiii.in](https://systemdesign.saiii.in)
- [orravyn.cloud](https://orravyn.cloud)
- [traffic.saiii.in](https://traffic.saiii.in)

## Repository Layout

```text
Ai-Portfolio/
├── Version3/       # Current production app
├── Version2/       # Transitional/legacy reference app
├── Version1/       # Oldest legacy app, deployed under /v1
├── api/            # Vercel serverless functions
├── shared-data/    # Shared routes, writing, SEO, metadata, and content
├── scripts/        # Maintenance and deployment helper scripts
└── docs/           # Maintenance policy and operational notes
```

## Long-Term Support Policy

- `Version3/` is the only target for new feature development.
- `Version2/` and `Version1/` are compatibility surfaces. Keep changes there minimal unless a task explicitly requires them.
- Prefer updating shared sources in `shared-data/` instead of duplicating changes across versions.
- Public writing URLs use `/writing`. Legacy `/blogs` URLs remain as permanent redirects.

Full policy: [docs/MAINTENANCE.md](docs/MAINTENANCE.md)
Operations runbook: [docs/OPERATIONS_RUNBOOK.md](docs/OPERATIONS_RUNBOOK.md)
Branch protection: [docs/BRANCH_PROTECTION_POLICY.md](docs/BRANCH_PROTECTION_POLICY.md)
Quarterly checklist: [docs/QUARTERLY_MAINTENANCE_CHECKLIST.md](docs/QUARTERLY_MAINTENANCE_CHECKLIST.md)
Provider inventory: [docs/PROVIDER_INVENTORY.md](docs/PROVIDER_INVENTORY.md)

## Tooling Baseline

- Node.js: `22.20.0`
- npm: `10.9.3`
- Package manager: npm workspaces from the repo root

Use the root install and verification flow:

```bash
npm ci
npm run verify
npm run content:snapshot
```

## Common Commands

### Root

```bash
npm run check:writing   # Validate redirects, sitemap URLs, and Writing aliases
npm run check:metrics   # Validate homepage/public numbers against shared data
npm run test            # Behavioral tests for routes and APIs
npm run lint            # Lint all workspaces
npm run build:ci        # Build Version1, Version2, and Version3
npm run build:deploy    # Production bundle: build Version3 + embed Version1 under /v1
npm run check:bundle    # Enforce Version3 bundle-size budgets after build
npm run branch-protect:apply # Apply documented GitHub branch protection (requires valid gh auth)
npm run content:snapshot # Export a portable shared-data backup
npm run clean:generated # Remove local dist output and generated snapshot artifacts
npm run verify          # Full maintenance check
```

### Version3

```bash
npm run dev --workspace Version3
npm run build --workspace Version3
```

### Version2

```bash
npm run dev --workspace Version2
npm run build --workspace Version2
```

### Version1

```bash
npm run dev --workspace Version1
npm run build --workspace Version1
```

## Deployment Notes

- Root Vercel deployment builds with `npm run build:deploy`.
- `npm run build:deploy` now validates writing routes, public metrics, and the Version3 bundle budget before producing the deployable output.
- Shared profile facts for the site and chat assistant live in `shared-data/siteMetadata.ts`.
- Shared-data snapshots can be generated locally and are archived weekly through GitHub Actions artifacts.
- Local generated artifacts should stay out of git. Use `npm run clean:generated` after local verification if you want a clean worktree.

## CI

GitHub Actions now verifies the repo on every pull request and on pushes to `main`/`master`:

- install dependencies with the pinned Node/npm toolchain
- run `npm run verify`
- enforce data-drift and bundle-budget checks as part of the root verification flow
- run scheduled uptime checks against the live site and critical APIs
- run scheduled Lighthouse checks against production routes
- raise `ops-alert` GitHub issues on scheduled monitoring failures
- optionally send Slack alerts when `SLACK_WEBHOOK_URL` is configured

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
