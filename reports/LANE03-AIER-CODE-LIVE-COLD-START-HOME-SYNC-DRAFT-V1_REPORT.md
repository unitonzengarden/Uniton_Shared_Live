# LANE03 AIER Code Live Cold-Start Home Sync Draft V1

Task ID: `LANE03-AIER-CODE-LIVE-COLD-START-HOME-SYNC-DRAFT-V1`  
Generated: `2026-05-03T09:47:02+07:00`  
Repo: `D:\UZG\Projects-v2\Uniton_Shared`  
Mode: report-only sync update proposal.

## Result

`WARNING`

Created the report-only sync update proposal. The result is `WARNING` because the repo remains dirty with untracked runtime/report/script/doc artifacts and `git status` reports a `.pytest_cache` permission warning. No direct `Uniton_Shared_Live` edit, workflow change, manifest change, enforcement change, real sync, deploy, Supabase change, product repo change, law rewrite, or branch protection change was made.

## Summary

Drafted the safest later path to mirror:

- `AIER_CONTEXT_START_HERE.md`
- `runtime/aier-code/context/**`

to `Uniton_Shared_Live` as public cold-start state. The draft includes proposed raw URLs, sync workflow additions, manifest additions, exposure review, risks, and next implementation boundary.

## Files Created Or Changed

- `runtime/aier-code/sync/COLD_START_HOME_SYNC_DRAFT_V1.md`
- `runtime/aier-code/sync/COLD_START_HOME_SYNC_DRAFT_V1.json`
- `reports/LANE03-AIER-CODE-LIVE-COLD-START-HOME-SYNC-DRAFT-V1_REPORT.md`
- `reports/LANE03-AIER-CODE-LIVE-COLD-START-HOME-SYNC-DRAFT-V1.json`

## Validation

Confirmed all source files exist:

```powershell
AIER_CONTEXT_START_HERE.md
runtime/aier-code/context/SYSTEM_LAW_RUNTIME.md
runtime/aier-code/context/PROJECT_STATE_RUNTIME.json
runtime/aier-code/context/LANE03_RUNTIME_STATE.json
runtime/aier-code/context/SYSTEM_MAP_RUNTIME.md
runtime/aier-code/context/TASK_REPORT_STANDARD.md
```

Result: `PASS`

Validated JSON files:

```powershell
Get-Content -Raw .\runtime\aier-code\sync\COLD_START_HOME_SYNC_DRAFT_V1.json | ConvertFrom-Json | Out-Null
Get-Content -Raw .\reports\LANE03-AIER-CODE-LIVE-COLD-START-HOME-SYNC-DRAFT-V1.json | ConvertFrom-Json | Out-Null
```

Result: `PASS`

Exposure keyword scan:

```powershell
Select-String -Path <six proposed files> -Pattern 'secret|token|password|credential|private key|BEGIN |SUPABASE_SERVICE|api[_-]?key'
```

Result: `PASS`. Matches were only safety guidance text in `TASK_REPORT_STANDARD.md`; no secret values were found.

Ran git status:

```powershell
git status --short
```

Result: dirty working tree with untracked runtime/report/script/doc artifacts. Git also printed `warning: could not open directory '.pytest_cache/': Permission denied`. No commit was created.

## Sync Draft Summary

Proposed public mirror files:

1. `AIER_CONTEXT_START_HERE.md`
2. `runtime/aier-code/context/SYSTEM_LAW_RUNTIME.md`
3. `runtime/aier-code/context/PROJECT_STATE_RUNTIME.json`
4. `runtime/aier-code/context/LANE03_RUNTIME_STATE.json`
5. `runtime/aier-code/context/SYSTEM_MAP_RUNTIME.md`
6. `runtime/aier-code/context/TASK_REPORT_STANDARD.md`

Raw URL base:

`https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/`

Required later sync workflow proposal:

- Add trigger paths for `AIER_CONTEXT_START_HERE.md` and `runtime/aier-code/context/**`.
- Add copy logic for the root start file and context directory.
- Add a `SYNC_INFO.md` section listing the six raw URLs.

Required later manifest proposal:

- Add `AIER_CONTEXT_START_HERE.md` as safe public cold-start home entry.
- Add `runtime/aier-code/context/**` as safe public cold-start context.
- Keep `runtime/aier-code/state/**` source-side and not mirrored by this draft.

## Exposure Safety Review

- Source files exist.
- No secret values found.
- Files are public-safe.
- Files are context/cold-start only.
- Files do not grant `Uniton_Shared_Live` source-of-truth authority.
- Files do not automate task execution.
- Files do not change enforcement.

## Risks

- Current sync workflow may conflict with the Phase 1 public mirror draft.
- Live direct writes remain forbidden.
- Actual sync requires a later explicit implementation task.
- This draft does not add hash manifests or exposure gates.
- This draft does not fix stale runtime surfaces.
- This draft does not modify `Uniton_Shared_Live`.

## Next Safe Action

`LANE03-AIER-CODE-LIVE-COLD-START-HOME-SYNC-IMPLEMENTATION-V1`

Only run after explicit NTS approval. The implementation task should modify `Uniton_Shared` sync workflow/manifest only, then let the existing sync process publish to `Uniton_Shared_Live`.
