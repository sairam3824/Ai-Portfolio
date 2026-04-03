# Maintenance Policy

This repository is structured to stay maintainable over the long term.

## Version Policy

- `Version3/` is the active product and the default target for all new feature work.
- `Version2/` is frozen for compatibility and historical reference. Only accept fixes that preserve public behavior or keep the build healthy.
- `Version1/` is legacy and should receive only compatibility, security, or deployment-fix changes.
- When the same content exists in `shared-data/`, update the shared source instead of copying edits across versions.

## Tooling Baseline

- Node.js is pinned in [.nvmrc](../.nvmrc) and [.node-version](../.node-version).
- npm workspaces are defined at the repo root, and the root lockfile is the canonical dependency snapshot.
- Use root commands for routine maintenance:
  - `npm ci`
  - `npm run verify`
  - `npm run build:deploy`
  - `npm run clean:generated`

## Release Guardrails

- CI must stay green on every pull request.
- `npm run check:writing` protects the `/writing` route migration and sitemap/redirect invariants.
- `npm run check:metrics` protects the public homepage stats from drifting away from shared source data.
- `npm run test` covers core route and API validation behavior.
- `npm run check:bundle` protects the Version3 production bundle from silent growth regressions.
- Production deploys build the site only.
- Scheduled uptime, security, shared-data snapshot, and Lighthouse workflows should remain healthy.

## Shared Sources Of Truth

- Site metadata lives in `shared-data/siteMetadata.ts`.
- Public homepage metrics live in `shared-data/publicMetrics.ts`.
- Writing routes live in `shared-data/siteRoutes.ts`.
- Writing content lives in `shared-data/blogData.ts` and `shared-data/blogContent.ts`.
- Portfolio chat context is generated from shared data in `shared-data/chatContext.ts`.

## Operations

- Production recovery steps and provider ownership live in [OPERATIONS_RUNBOOK.md](./OPERATIONS_RUNBOOK.md).
- Branch protection requirements live in [BRANCH_PROTECTION_POLICY.md](./BRANCH_PROTECTION_POLICY.md).
- Quarterly recurring maintenance lives in [QUARTERLY_MAINTENANCE_CHECKLIST.md](./QUARTERLY_MAINTENANCE_CHECKLIST.md).
- Provider ownership and billing notes live in [PROVIDER_INVENTORY.md](./PROVIDER_INVENTORY.md).
- Scheduled monitoring failures create or update `ops-alert` GitHub issues.
- Optional Slack alerting is supported through the `SLACK_WEBHOOK_URL` GitHub secret.

## Change Checklist

Before merging a maintenance change:

1. Run `npm run verify`.
2. Run `npm run content:snapshot` when shared portfolio content changes materially.
3. Run `npm run clean:generated` before committing if local build artifacts were produced.
4. If public URLs changed, update redirects and route constants together.
5. If profile facts changed, update the shared metadata or `shared-data/publicMetrics.ts` instead of patching page copy directly.
6. If a change touches legacy apps, keep the scope minimal and avoid feature drift between versions.
