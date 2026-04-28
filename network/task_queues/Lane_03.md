# Lane_03 Task Queue — V1 GA path

**Lane:** Lane_03 (canon-boundary owner; canon-adjacent work owner; Lane_03 self-dispatches per `AMD_LANE01_FAST_ENDORSER_MODE` Rule 2 for own roadmap-bound tasks)
**Queue version:** v1.0
**Source:** `roadmaps/MASTER_TASK_LIST_V1.1.md`
**Status notation:** `PENDING` | `READY` | `RUNNING` | `DONE` | `FAILED` | `BLOCKED`

> **Auto-managed.** Read by `scripts/runtime/lane_dispatch.py --lane Lane_03 --pick-next`. Lane_03 operator dispatches via `gh workflow run lane_dispatch.yml -f lane_id=Lane_03`.

| Order | Task ID | Status | Depends On | Phase | NTS_GATE |
|---|---|---|---|---|---|
| 1 | LANE03-W2-CANON-HYGIENE-BATCH-V1 | DONE | (none — W2 hygiene work) | W2 | NO |
| 2 | LANE03-W1-LANE02-ROLE-REFRAME-APPLY-V1 | DONE | NTS_APPROVE_AMD_LANE02_AIER_CODE_ROLE_REFRAME | W1 | YES (resolved) |
| 3 | LANE03-W3-LAW-N13-AUTHOR-V1 | PENDING | LANE03-W3-LANE02-SMOKE-LIVE-V1 + NTS_GATE_W3_LAW_N13_AUTHORIZE | W3 | YES |
| 4 | LANE03-W3-LANE02-SMOKE-DRYRUN-V1 | PENDING | LANE03-W1-LANE02-ROLE-REFRAME-APPLY-V1 + LANE02-W3-DOMAIN-CANONS-DRAFT-V1 | W3 | NO |
| 5 | LANE03-W3-LANE02-SMOKE-LIVE-V1 | PENDING | LANE03-W3-LANE02-SMOKE-DRYRUN-V1 (verdict READY) | W3 | NO |
| 6 | LANE03-W4-LAW-COMPILATION-V1 | PENDING | LANE03-W3-LANE02-SMOKE-LIVE-V1 + LAW_N13 status (DRAFT or ACTIVE) | W4 | NO |
| 7 | LANE03-W4-CANON-COMPLETION-AUDIT-V1 | PENDING | LANE03-W4-LAW-COMPILATION-V1 | W4 | NO |
| 8 | LANE03-W4-V1-RC-CROSS-REVIEW-V1 | PENDING | LANE03-W4-CANON-COMPLETION-AUDIT-V1 + LANE01-W4-V1-RC-COMMIT-V1 (in flight) | W4 | NO |
| 9 | LANE03-W5-LAB-RULE-V1-RELEASE-V1 | PENDING | LANE03-W4-V1-RC-CROSS-REVIEW-V1 (verdict ENDORSE) + LANE01-W4-V1-RC-COMMIT-V1 (DONE) | W5 | NO |

## Notes

- Lane_03 W3 has fork at row 3-5: SMOKE-DRYRUN → SMOKE-LIVE flows in parallel with LAW_N13_AUTHOR (which has its own NTS gate). Order in this queue is logical — operator may pick row 3 OR 4 first when both READY.
- Lane_03 self-dispatch eligible per AMD_LANE01_FAST_ENDORSER_MODE Rule 2 — but LAW_N13_AUTHOR (canon-adjacent) requires explicit NTS chat directive for topic.
- Each task DONE produces 4 standard deliverables.
- Cross-Lane: Lane_03 W4 V1 RC CROSS-REVIEW is the gating cross-review for Lane_01's W4 V1-RC-COMMIT.

## NTS approval gates (Lane_03-direct: 1 remaining)

1. **NTS_GATE_W3_LAW_N13_AUTHORIZE** — gates row 3 (NTS chat directive for LAW_N13 topic before Lane_03 begins authoring; not a final approval — that's a separate apply task gate)

## Cross-Lane dependency gates affecting Lane_03

- Row 4 deps include `LANE02-W3-DOMAIN-CANONS-DRAFT-V1` (Lane_02-side; Lane_03 Smoke needs Lane_02 to have produced its first parallel-executor work)
- Row 8 deps include `LANE01-W4-V1-RC-COMMIT-V1` in flight (cross-review must be on Lane_01's RC commit, not before)
- Row 9 deps include `LANE01-W4-V1-RC-COMMIT-V1` DONE (Lab+Rule release happens after Lane_01 RC tag stable)
