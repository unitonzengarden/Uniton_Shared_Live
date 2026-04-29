# uzg-plus — Live Status Namespace

> Per-AIER live state for **UZG+** (target repo: `unitonzengarden/uzgplus-app`).
> Primary focus of LANE01-AIER-CODE-UZG-PLUS-RUNTIME-NAMESPACE-V1 (2026-04-29).
> Files in this folder are auto-emitted by `scripts/ecosystem_state_poller.cjs`. Do not hand-edit.

## Files

- `repo-state.live.json` — compact summary (HEAD SHA, open PRs/issues, last CI status, polled at).
- `repo-meta.live.json` — repo metadata (private, default branch, stars).
- `recent-commits.live.json` — last 30 commits with full metadata (uzg-plus only).
- `open-prs.live.json` — full open-PR list (uzg-plus only).
- `ci-status.live.json` — last 20 GitHub Actions workflow runs (uzg-plus only).

## Polling cadence

`*/15 * * * *` (every 15 minutes) via `.github/workflows/ecosystem_state_poll.yml`.
Manual poll: `node scripts/ecosystem_state_poller.cjs --repo=uzg-plus`.

## Mirror (NTS fetch URLs)

- https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/aier-status/uzg-plus/repo-state.live.json
- https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/aier-status/uzg-plus/recent-commits.live.json
- https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/aier-status/uzg-plus/open-prs.live.json
- https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/aier-status/uzg-plus/ci-status.live.json
