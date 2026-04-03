# Operations Runbook

This runbook is the production recovery and routine-operations reference for the portfolio monorepo.

## Production Systems

- Vercel:
  - Hosts the production site from `Version3/dist`
  - Serves root APIs under `api/`
- Domain and DNS:
  - Primary production domain: `saiii.in`
  - Validate DNS, SSL, and redirect behavior through Vercel first
- Supabase:
  - Stores contact/message data
- OpenAI:
  - Powers `/api/chat`
- GitHub Actions:
  - CI, uptime checks, security audit, shared-data snapshot, and Lighthouse monitoring

## Required Secrets And Environment

### Vercel

- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### GitHub Actions

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SLACK_WEBHOOK_URL`:
  - Optional
  - If set, scheduled uptime, security, and Lighthouse failures send Slack alerts

## Routine Checks

Run these before and after meaningful maintenance work:

1. `npm run verify`
2. `npm run build:deploy`
3. `npm run content:snapshot` when shared content changes
4. `npm run clean:generated`

Scheduled GitHub workflows should remain healthy:

- `CI`
- `Uptime Checks`
- `Security Audit`
- `Shared Data Snapshot`
- `Lighthouse Performance`

## Incident Playbooks

### Site Down Or Broken In Production

1. Check the latest Vercel deployment status and logs.
2. Run the `Uptime Checks` workflow manually to confirm scope.
3. Validate root pages and redirects:
   - `/`
   - `/writing`
   - `/sitemap.xml`
   - `/v1/`
4. If the latest deploy is bad, roll back in Vercel to the last healthy deployment.
5. If the issue is code-related, fix locally and rerun:
   - `npm run verify`
   - `npm run build:deploy`

### Chat API Failure

1. Check `/api/chat` logs in Vercel.
2. Confirm `OPENAI_API_KEY` is present in Vercel production environment settings.
3. Confirm there were no recent prompt/shared-data changes that broke payload generation.
4. Re-run `Uptime Checks` after the fix.

### Security Audit Failure

1. Open the `Security Audit` workflow run.
2. Download the `npm-audit-report` artifact.
3. Patch or upgrade the affected packages.
4. Re-run:
   - `npm ci`
   - `npm run verify`
5. Close the linked ops issue once the scheduled workflow recovers.

### Lighthouse Regression

1. Open the `Lighthouse Performance` workflow run.
2. Download the Lighthouse artifacts and compare the failing route.
3. Check:
   - Route chunk growth
   - New blocking assets
   - LCP image changes
   - Third-party script additions
4. Re-run `npm run verify` locally after the fix.

## Content Recovery

Shared content is recoverable from:

- Git history
- Weekly `Shared Data Snapshot` workflow artifacts
- Local `npm run content:snapshot` output

Recovery steps:

1. Download the latest snapshot artifact.
2. Compare it against current `shared-data/`.
3. Restore only the intended content files.
4. Run `npm run verify`.

## Alerting Model

- GitHub Issues:
  - Scheduled monitoring workflows open or update `ops-alert` issues on failure
  - Those issues auto-close when the next healthy run succeeds
- Slack:
  - Optional via `SLACK_WEBHOOK_URL`
  - Used for scheduled uptime, security, and Lighthouse failures

## Owner Notes

- Keep `Version3/` as the only active feature surface.
- Keep production secrets out of repo files and `.env` commits.
- Prefer fixing shared sources of truth over patching multiple app generations.
