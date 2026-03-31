# Backups

This directory stores generated exports that make the portfolio content easier to archive independently of the app code.

## Shared Data Snapshots

- Run `npm run content:snapshot` from the repo root.
- The command writes `backups/shared-data/latest.json`.
- Generated snapshot JSON files are kept out of git so routine maintenance does not create noisy repo churn.
- The weekly GitHub Actions workflow uploads the generated snapshot as an artifact for off-repo retention and historical recovery.

These snapshots are intended as a portable record of the content and metadata in `shared-data/`.
