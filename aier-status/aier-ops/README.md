# aier-ops — Live Status Namespace

> Per-AIER live state for **AIER Ops** (target repo: `unitonzengarden/Uniton_OS`).
> Files in this folder are auto-emitted by `scripts/ecosystem_state_poller.cjs` (LANE01-AIER-CODE-UZG-PLUS-RUNTIME-NAMESPACE-V1, 2026-04-29).
> Do not hand-edit — changes will be overwritten by the next poll.

## Files

- `repo-state.live.json` — compact summary (HEAD SHA, open PRs/issues, last CI status, last poll timestamp).
- `repo-meta.live.json` — repo metadata snapshot (private flag, default branch, stars).

## Polling cadence

`*/15 * * * *` (every 15 minutes) via `.github/workflows/ecosystem_state_poll.yml`.
Manual poll: `node scripts/ecosystem_state_poller.cjs --repo=aier-ops`.

## Mirror

These files mirror to `Uniton_Shared_Live/aier-status/aier-ops/` via `sync_runtime_to_public.yml`. NTS can fetch:
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/aier-status/aier-ops/repo-state.live.json`
