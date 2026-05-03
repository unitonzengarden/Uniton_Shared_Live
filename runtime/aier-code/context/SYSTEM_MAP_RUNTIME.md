# AIER Code System Map Runtime

Generated: `2026-05-03T09:02:00+07:00`  
Purpose: cold-start map for AIER Code runtime governance.

## Repositories

- `Uniton_Shared`: governance/source-of-truth repo. Laws, runtime spine, reports, scripts, context pack, task evidence, ledger, status, and network state originate here.
- `Uniton_Shared_Live`: public mirror/cold-start state. It is not source of truth and must not receive direct source-authority changes.
- `Uniton_OS`: future execution/runtime repo or plane. It is out of scope until a scoped backend/runtime control phase.
- `uzgplus-app`: product repo. Out of scope for AIER Code runtime governance tasks unless explicitly assigned.
- `AIFI_LIFE`, `AIER LIFE`, and other product repos: ecosystem product repos tracked by runtime/aier-status when available. They are not governance source-of-truth.

## Runtime Components

Implemented:

- Runtime spine: `runtime/aier-code/state/**`
- Pre-task gate: `scripts/aier_code_os/pretask_gate.py`
- Gate schema and receipts: `runtime/aier-code/gates/**`
- Context pack: `runtime/aier-code/context/**`

Future:

- Post-task emitter.
- Lane queue controller.
- Live mirror sync hardening.
- Skill registry and executable skill runner.
- Health, heartbeat, CI, and runtime monitor.
- Governance enforcement and redline gate.
- Backend/runtime control bridge.

## Existing Scripts And Automation Components

- `scripts/aier_code_os/runtime_inventory.py`: read-only runtime inventory and stale surface report.
- `scripts/aier_code_os/pretask_gate.py`: report-only pre-task gate that emits ALLOW/WARN/BLOCK receipts.
- `docs/LAW_CLA_LLM/SHARED/skills/aier-verify/run.cjs`: executable aier-verify skill implementation.
- `docs/LAW_CLA_LLM/SHARED/skills/aier-verify/verify_all.cjs`: batch aier-verify runner.
- `.github/workflows/sync_runtime_to_public.yml`: Uniton_Shared to Uniton_Shared_Live sync workflow.
- `.github/workflows/auto_project_status.yml`: regenerates project status, lane registry, and activity feed.
- `.github/workflows/aier_code_heartbeat.yml`: heartbeat workflow.
- `.github/workflows/ecosystem_state_poll.yml`: ecosystem repo state poller.
- `.github/workflows/aier_verify.yml`: informational aier-verify workflow.

Generated or partially generated surfaces:

- `runtime/PROJECT_STATUS.md`
- `network/LANE_REGISTRY.md`
- `network/ACTIVITY_FEED.md`
- `network/heartbeat/**`
- `aier-status/**/repo-state.live.json`
- `aier-status/**/poll-log.live.md`
- `runtime/lane_02_uzg/STATE.live.md`
- `status/DASHBOARD.live.md` when its generator is run
- aier-verify result outputs when aier-verify is run

## Current Known Gaps

- Runtime state is still partly stale.
- Pre-task gate is report-only and non-blocking.
- No post-task report/state emitter exists.
- No lane queue controller exists.
- Live Ledger emit automation is not complete.
- Uniton_Shared_Live mirror hardening is not complete.
- Skill execution is not yet unified under an OS runner.
- Health, heartbeat, dashboard, and aier-status are split across multiple surfaces.
- Some current sync behavior conflicts with the Phase 1 public mirror draft.
- Manual task reports still carry completion evidence until Phase 3 exists.

## AITAO Cold-Start Procedure

1. Read `runtime/aier-code/context/SYSTEM_LAW_RUNTIME.md`.
2. Read `runtime/aier-code/context/PROJECT_STATE_RUNTIME.json`.
3. Read `runtime/aier-code/context/LANE03_RUNTIME_STATE.json`.
4. Read `runtime/aier-code/context/SYSTEM_MAP_RUNTIME.md`.
5. Read `runtime/aier-code/context/TASK_REPORT_STANDARD.md`.
6. Read Phase 1 spine files under `runtime/aier-code/state/**` when detail is needed.
7. Run the report-only pre-task gate before accepting task work.
8. Do only the scoped task.
9. Produce report evidence after work.
10. Treat repo runtime as source of truth, not chat memory.
