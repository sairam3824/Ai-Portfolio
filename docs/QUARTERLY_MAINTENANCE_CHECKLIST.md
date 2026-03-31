# Quarterly Maintenance Checklist

Run this checklist once every quarter.

## Repository Health

1. Run `npm ci`
2. Run `npm run verify`
3. Run `npm run build:deploy`
4. Review open `ops-alert` issues and close stale ones

## Dependencies And Security

1. Review Dependabot PRs and outstanding dependency drift
2. Trigger `Security Audit` manually if needed
3. Patch high or critical findings immediately
4. Confirm `npm audit` remains clean or explicitly documented

## Performance

1. Review the latest `Lighthouse Performance` workflow artifacts
2. Compare route chunk growth against bundle budgets
3. Review large image or asset additions since the last quarter
4. Confirm the homepage, writing page, projects page, and contact page still feel fast on real devices

## Operations

1. Review Vercel production settings and recent deploy health
2. Review Supabase project status, quotas, and retention settings
3. Review Resend sender/domain health
4. Review OpenAI usage and cost trends
5. Confirm GitHub Actions scheduled workflows are still running

## Secrets And Access

1. Review who has access to GitHub, Vercel, Supabase, Resend, and DNS
2. Rotate sensitive credentials if needed
3. Confirm `SLACK_WEBHOOK_URL` is still valid if alerting is enabled
4. Verify no secrets leaked into committed files

## Domain And Billing

1. Check `saiii.in` domain expiry and auto-renew status
2. Check DNS provider account access
3. Review Vercel, Supabase, Resend, and OpenAI billing status
4. Update [PROVIDER_INVENTORY.md](./PROVIDER_INVENTORY.md) if ownership or billing changed

## Content And Recovery

1. Trigger `Shared Data Snapshot` if needed
2. Confirm the latest snapshot artifacts are downloadable
3. Perform a small restore drill on a non-critical file if the process has not been tested recently
4. Review [OPERATIONS_RUNBOOK.md](./OPERATIONS_RUNBOOK.md) for outdated recovery steps
