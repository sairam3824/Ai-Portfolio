# Branch Protection Policy

This document defines the GitHub branch protection settings that should be enabled in repository settings.

## Protected Branches

- `main`
- `master`

## Required Rules

- Require a pull request before merging
- Require at least 1 approval
- Dismiss stale approvals when new commits are pushed
- Require conversation resolution before merging
- Block force pushes
- Block branch deletion

## Required Status Checks

- `CI`

## Important Note

The scheduled operations workflows are not appropriate required merge checks because they run on schedules or manual dispatch, not on every pull request:

- `Uptime Checks`
- `Security Audit`
- `Shared Data Snapshot`
- `Lighthouse Performance`

Those workflows are still operationally important and should remain healthy, but they belong to production monitoring rather than branch protection.

## Review Ownership

- `CODEOWNERS` is defined in [../.github/CODEOWNERS](../.github/CODEOWNERS)
- Any changes to shared data, workflows, scripts, or production APIs should request review from the repository owner

## Applying The Policy

If GitHub CLI is authenticated with a valid token, apply the policy with:

```bash
gh auth login -h github.com
npm run branch-protect:apply
```

The automation script lives at [../scripts/apply-branch-protection.ts](../scripts/apply-branch-protection.ts).
