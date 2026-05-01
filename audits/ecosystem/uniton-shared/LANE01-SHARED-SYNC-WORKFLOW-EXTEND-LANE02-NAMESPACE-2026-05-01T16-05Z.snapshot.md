# LANE01-SHARED-SYNC-WORKFLOW-EXTEND-LANE02-NAMESPACE-2026-05-01T16-05Z — Snapshot

## Scope

- **Repo**: `unitonzengarden/Uniton_Shared` (shared sync infrastructure).
- **Change**: Extend `.github/workflows/sync_runtime_to_public.yml` to mirror:
  - `runtime/lane_02_uzg/**`
  - `network/lane_02_uzg/**`
- **Doc**: New root `SYNC_INFO.md` in private repo (none existed previously; Live `SYNC_INFO.md` continues to be generated inside the workflow heredoc, now updated consistently).

## Pre-edit baseline (verified 2026-05-02Z)

| Check | Result |
| --- | --- |
| Remote branch `origin/feat/lane02/clac2/runtime-namespace-v1` | Present |
| `runtime/lane_02_uzg/**`, `network/lane_02_uzg/**` on `origin/main` | **Absent** — files exist only on feature branch (`git ls-tree` empty on `origin/main`; 10 blobs on Lane_02 branch) |
| Workflow already included `aier-status/**` in push paths + recursive copy | Confirmed (`findstr` / file read) |
| Live baseline `runtime/lane_02_uzg/INDEX.live.md` | HTTP **404** |
| Live baseline `network/lane_02_uzg/MISSION.live.md` | HTTP **404** |
| Live baseline `aier-status/uzg-plus/supabase_projects.live.json` | HTTP **200** |

## Intended post-change behavior

Once **Lane_02 namespace files land on private `main`**, a successful `sync_runtime_to_public` run will recurse-copy those directories into `Uniton_Shared_Live`; raw URLs listed in root `SYNC_INFO.md` and in the workflow-generated Live `SYNC_INFO.md` section should resolve with **200**.

**Prerequisite**: Merge or cherry-pick of `feat/lane02/clac2/runtime-namespace-v1` into `main` — without source files on `main`, mirror paths remain empty / 404 regardless of workflow includes.

## Files

- `.github/workflows/sync_runtime_to_public.yml` — paths filter + shell copy blocks + SYNC_INFO heredoc section + “Files synced” bullets.
- `SYNC_INFO.md` (repo root; new).

## Acceptance mapping

- YAML validated locally with Python `yaml.safe_load` after edit (**PASS** at commit time).

Task ID: `LANE01-SHARED-SYNC-WORKFLOW-EXTEND-LANE02-NAMESPACE-2026-05-01T16-05Z`.
