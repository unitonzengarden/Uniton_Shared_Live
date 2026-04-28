# Lane_01 Task Queue — V1 GA path

**Lane:** Lane_01 (CTO scope; self-approve under `AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON §3.1` for tech non-canon items)
**Queue version:** v1.1 (rebaselined `LANE01-W3-QUEUE-REBASELINE-V1` 2026-04-29 — Lane_04 deferred strategic)
**Source:** `roadmaps/MASTER_TASK_LIST_V1.1.md` + W2.T5 closeout + W3 rebaseline
**Status notation:** `PENDING` | `READY` | `RUNNING` | `DONE` | `FAILED` | `BLOCKED`

> **Auto-managed.** This queue is read by `scripts/runtime/lane_dispatch.py --lane Lane_01 --pick-next`. Lane_01 operator dispatches the next `READY` task via `gh workflow run lane_dispatch.yml -f lane_id=Lane_01`. CRITICAL: `lane_dispatch` workflow does NOT execute the task — it only surfaces the spec for the operator to copy into CLAC.

| Order | Task ID | Status | Depends On | Phase | NTS_GATE |
|---|---|---|---|---|---|
| 1 | LANE01-W2-T5-AIER-QA-SKILL-V1 | DONE | LANE01-W2-T4-AIER-QA-CANON-V1 | W2 | NO |
| 2 | LANE01-W2-CLOSEOUT-V1 | DONE | LANE01-W2-T5-AIER-QA-SKILL-V1 | W2 | NO |
| 3 | LANE01-W3-QA-LOOP-WIRE-V1 | DONE | LANE01-W2-CLOSEOUT-V1 | W3 | NO |
| 4 | LANE01-W4-ROADMAP-HOT-RELOAD-V1 | DONE | LANE01-W3-QA-LOOP-WIRE-V1 | W4 | NO |
| 5 | LANE01-W4-PROJECT-STATUS-EXTEND-V1 | DONE | LANE01-W4-ROADMAP-HOT-RELOAD-V1 | W4 | NO |
| 6 | LANE01-W4-V1-RC-COMMIT-V1 | DONE | LANE01-W4-PROJECT-STATUS-EXTEND-V1 + LANE03-W4-V1-RC-CROSS-REVIEW-V1 | W4 | NO |
| 7 | LANE01-W5-V1-FINAL-AUDIT-V1 | DONE | LANE01-W4-V1-RC-COMMIT-V1 + LANE03-W5-LAB-RULE-V1-RELEASE-V1 | W5 | NO |
| 8 | LANE01-W5-V1-RELEASE-COMMIT-V1 | DONE | LANE01-W5-V1-FINAL-AUDIT-V1 + NTS_SIGN_OFF | W5 | YES |
| 9 | LANE01-W5-UNITON-FUTURE-HANDOFF-V1 | READY | LANE01-W5-V1-RELEASE-COMMIT-V1 | W5 | NO |

## Notes

- Status transitions: `PENDING` → `READY` (when all deps resolve) → `RUNNING` (when dispatched) → `DONE` (when reported PASS) or `FAILED` (when reported FAIL).
- `BLOCKED` is set manually when a non-dependency blocker (e.g., upstream tooling broken) prevents progress.
- After each `DONE` mark, `lane_dispatch.py --mark-done` walks dependent rows and promotes any whose deps are now satisfied to `READY`.
- NTS_GATE=YES rows require explicit NTS chat approval before status moves from `PENDING` to `READY` (operator records verbatim quote in NOTIFICATION_LEDGER).
- Each task spec lives at `task_specs/<TASK_ID>.md`.

## NTS approval gates (1 remaining for Lane_01 path)

1. **NTS_SIGN_OFF (V1.0 RC → FINAL)** — gates row 8 (V1.0 release commit + tag)

## STRATEGIC DEFERRED (not in active queue)

The following Lane_04-related Lane_01 tasks were deferred to strategic roadmap on 2026-04-29 via `LANE01-W3-QUEUE-REBASELINE-V1`. Specs relocated to `roadmaps/strategic/future_lanes/`. Re-activate by authoring a new injection task when NTS approves Lane_04 onboarding.

- `LANE01-W3-LANE04-CONFIG-V1` — Lane_04 config scaffold (was row 3 pre-rebaseline)
- `LANE01-W3-LANE04-LIVE-V1` — Lane_04 go-live (was row 4 pre-rebaseline)

## Rebaseline history

- **2026-04-29 (v1.0 → v1.1):** `LANE01-W3-QUEUE-REBASELINE-V1` — removed 2 Lane_04 rows; renumbered downstream; promoted W3-QA-LOOP-WIRE-V1 to row 3 READY (deps rebased to LANE01-W2-CLOSEOUT-V1); removed `NTS_GATE_W3_LANE04_OPEN` from active path.
