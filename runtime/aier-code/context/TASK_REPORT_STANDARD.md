# AIER Code Task Report Standard

Generated: `2026-05-03T09:02:00+07:00`  
Status: canon standard for task evidence until Phase 3 emitter automates it.

## Required Evidence Files Per Task

Every task should produce four evidence files:

1. `reports/<TASK_ID>_REPORT.md`
2. `reports/<TASK_ID>.json`
3. `snapshots/<TASK_ID>.snapshot.json`
4. `audit_logs/<TASK_ID>_audit.log`

No task may be considered complete without report evidence.

## Markdown Report Requirements

`reports/<TASK_ID>_REPORT.md` must include:

- Task ID.
- Timestamp.
- Result: `PASS`, `WARNING`, or `FAIL`.
- Summary.
- Files created or changed.
- Validation commands and results.
- Changed files section.
- Risks section.
- Next safe action section.
- Scope and non-goal notes when needed.

## Report JSON Requirements

`reports/<TASK_ID>.json` must be machine-readable and include:

- `task_id`
- `generated_at`
- `result`
- `summary`
- `files_created_or_changed`
- `validation`
- `risks`
- `next_safe_action`
- rule/scope compliance fields when relevant

The JSON report must validate with `ConvertFrom-Json` or an equivalent parser.

## Snapshot Requirements

`snapshots/<TASK_ID>.snapshot.json` must include:

- `task_id`
- `timestamp`
- current repo or runtime state relevant to the task
- key decisions
- important inputs
- important outputs
- known stale or blocked surfaces
- no secrets

Snapshots are for state reconstruction, not narrative.

## Audit Log Requirements

`audit_logs/<TASK_ID>_audit.log` must include append-only execution events:

- task start
- runtime read/gate command if applicable
- files inspected
- files changed
- validation commands
- task closeout

Audit logs must not include secrets, tokens, credentials, or sensitive host details.

## Result Meanings

`PASS`:

- Task scope completed.
- Required evidence exists.
- Validation passed.
- No unresolved warning materially affects the task result.

`WARNING`:

- Task scope completed, but there are advisory findings, dirty worktree context, stale runtime state, partial validation limits, or external blockers.
- Warning does not mean enforcement unless a later governance gate says so.

`FAIL`:

- Task scope not completed.
- Required evidence missing.
- Validation failed.
- Scope was violated.
- The work should not be treated as complete.

## Required Validation Section

Every task report must list:

- exact commands run
- pass/fail result for each command
- skipped validation and reason, if any
- final `git status --short` result or summary

## Changed Files Section

Every task report must list exact files created or changed by the task. It must separate unrelated dirty files or pre-existing untracked files from task-owned changes.

## Risks Section

Every task report must include current risks, limitations, and known non-goals.

## Next Safe Action Section

Every task report must identify one next safe action. If no action is safe, it must say so and explain why.

## Future Phase 3 Emitter

The future Phase 3 post-task report/state emitter should automate this standard by:

- checking required evidence files
- generating or validating report JSON
- generating task state
- drafting ledger/status updates
- linking pre-task gate receipts
- refusing to mark DONE until evidence is complete

For now, this is a canon standard only. It does not introduce enforcement.
