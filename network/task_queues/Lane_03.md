# Lane_03 Task Queue — V1 GA path

**Lane:** Lane_03 (canon-boundary owner; canon-adjacent work owner; Lane_03 self-dispatches per `AMD_LANE01_FAST_ENDORSER_MODE` Rule 2 for own roadmap-bound tasks)
**Queue version:** v1.1 (rebaselined `LANE01-W3-QUEUE-REBASELINE-V1` 2026-04-29 — LAW_N13_AUTHOR deferred strategic; 2 hygiene tickets promoted to READY)
**Source:** `roadmaps/MASTER_TASK_LIST_V1.1.md` + W3 rebaseline
**Status notation:** `PENDING` | `READY` | `RUNNING` | `DONE` | `FAILED` | `BLOCKED` | `DEFERRED-STRATEGIC`

> **Auto-managed.** Read by `scripts/runtime/lane_dispatch.py --lane Lane_03 --pick-next`. Lane_03 operator dispatches via `gh workflow run lane_dispatch.yml -f lane_id=Lane_03`.

| Order | Task ID | Status | Depends On | Phase | NTS_GATE |
|---|---|---|---|---|---|
| 1 | LANE03-W2-CANON-HYGIENE-BATCH-V1 | DONE | (none — W2 hygiene work) | W2 | NO |
| 2 | LANE03-W1-LANE02-ROLE-REFRAME-APPLY-V1 | DONE | NTS_APPROVE_AMD_LANE02_AIER_CODE_ROLE_REFRAME | W1 | YES (resolved) |
| 3 | LANE03-W2-CANON-GUARD-HEADING-FIX-V1 | READY | (none) | W2 | NO |
| 4 | LANE03-W3-CAPABILITY-REGISTRY-RECONCILE-V1 | READY | (none) | W3 | NO |
| 5 | LANE03-W3-LANE02-SMOKE-DRYRUN-V1 | PENDING | LANE03-W1-LANE02-ROLE-REFRAME-APPLY-V1 + LANE02-W3-DOMAIN-CANONS-DRAFT-V1 | W3 | NO |
| 6 | LANE03-W3-LANE02-SMOKE-LIVE-V1 | PENDING | LANE03-W3-LANE02-SMOKE-DRYRUN-V1 (verdict READY) | W3 | NO |
| 7 | LANE03-W4-LAW-COMPILATION-V1 | PENDING | LANE03-W3-LANE02-SMOKE-LIVE-V1 | W4 | NO |
| 8 | LANE03-W4-CANON-COMPLETION-AUDIT-V1 | PENDING | LANE03-W4-LAW-COMPILATION-V1 | W4 | NO |
| 9 | LANE03-W4-V1-RC-CROSS-REVIEW-V1 | PENDING | LANE03-W4-CANON-COMPLETION-AUDIT-V1 + LANE01-W4-V1-RC-COMMIT-V1 (in flight) | W4 | NO |
| 10 | LANE03-W5-LAB-RULE-V1-RELEASE-V1 | PENDING | LANE03-W4-V1-RC-CROSS-REVIEW-V1 (verdict ENDORSE) + LANE01-W4-V1-RC-COMMIT-V1 (DONE) | W5 | NO |

## Notes

- Lane_03 W3 has fork at row 3-4: `CANON-GUARD-HEADING-FIX` and `CAPABILITY-REGISTRY-RECONCILE` are independent hygiene tickets — operator may pick row 3 OR 4 first when both READY (no inter-dep).
- Row 5 `SMOKE-DRYRUN` is gated by Lane_02 row 3 `LANE02-W3-DOMAIN-CANONS-DRAFT-V1` (cross-Lane) — stays PENDING until Lane_02 produces that draft.
- Lane_03 self-dispatch eligible per AMD_LANE01_FAST_ENDORSER_MODE Rule 2 for non-canon-adjacent rows; canon-adjacent rows (LAW authoring) require explicit NTS chat directive for topic.
- Each task DONE produces 4 standard deliverables.
- Cross-Lane: Lane_03 W4 V1 RC CROSS-REVIEW is the gating cross-review for Lane_01's W4 V1-RC-COMMIT.

## NTS approval gates (Lane_03-direct: 0 remaining after rebaseline)

After 2026-04-29 rebaseline, `LAW_N13_AUTHOR` (NTS_GATE_W3_LAW_N13_AUTHORIZE) is DEFERRED-STRATEGIC alongside Lane_04. No active Lane_03-direct NTS gates remain.

## Cross-Lane dependency gates affecting Lane_03

- Row 5 deps include `LANE02-W3-DOMAIN-CANONS-DRAFT-V1` (Lane_02-side; Lane_03 Smoke needs Lane_02 to have produced its first parallel-executor work)
- Row 9 deps include `LANE01-W4-V1-RC-COMMIT-V1` in flight (cross-review must be on Lane_01's RC commit, not before)
- Row 10 deps include `LANE01-W4-V1-RC-COMMIT-V1` DONE (Lab+Rule release happens after Lane_01 RC tag stable)

## STRATEGIC DEFERRED (not in active queue)

The following Lane_03 task was deferred to strategic roadmap on 2026-04-29 via `LANE01-W3-QUEUE-REBASELINE-V1`. Spec relocated to `roadmaps/strategic/future_lanes/`. Re-activate by authoring a new injection task when NTS approves Lane_04 onboarding (LAW_N13 = Lane_04 QA Auto-Loop law — not needed until Lane_04 opens).

| Task ID | Original status | Reason | Re-activation criteria |
|---|---|---|---|
| `LANE03-W3-LAW-N13-AUTHOR-V1` | PENDING (was row 3 pre-rebaseline) | LAW_N13 governs Lane_04 QA Auto-Loop; no value authoring before Lane_04 onboarding approved | NTS approves Lane_04 onboarding → CLA author injection task → Lane_03 picks up |

## Rebaseline history

- **2026-04-29 (v1.0 → v1.1):** `LANE01-W3-QUEUE-REBASELINE-V1` — deferred `LANE03-W3-LAW-N13-AUTHOR-V1` to STRATEGIC DEFERRED (was row 3); inserted 2 hygiene tickets at rows 3-4 (`CANON-GUARD-HEADING-FIX` + `CAPABILITY-REGISTRY-RECONCILE`) both READY no deps no NTS gate; row 7 `LAW-COMPILATION` deps cleaned (removed `LAW_N13 status` dependency since LAW_N13 deferred). Net active queue: 9 → 10 rows. Lane_03 unblocked for parallel W3 hygiene execution.
