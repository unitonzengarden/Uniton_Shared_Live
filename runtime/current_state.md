# AIER CODE CURRENT STATE

## 0. STATUS HEADER

- Project: AIER_CODE
- Repo: Uniton_Shared
- Canonical root: `D:\UZG\Projects-v2\Uniton_Shared`
- Remote: `https://github.com/unitonzengarden/Uniton_Shared.git`
- Branch: `main`
- Last verified commit before this update: `7f9e3a7` (Lane_03 LAW_N12 DRAFT proposal landed)
- Last updated: `2026-04-27T16:05:00Z`
- Updated by: Lane_01 / CLAC-1 (`LANE01-W1-T4-COMBINED-V1` Phase A — runtime slim + archive infrastructure; rebased on top of Lane_03 LAW_N12 DRAFT)
- Current state version: `v1.7`
- Current state mode: `CONTROLLED_EXECUTION / GOVERNANCE_FIRST / RUNTIME_DRYRUN_ONLY`
- Source evidence:
  - `reports/LANE03-AIER-CODE-CANON-NTS-APPROVAL-APPLY-V1_REPORT.md`
  - `reports/LANE01-ROADMAP-FINAL-COMMIT-V1_REPORT.md`
  - `reports/LANE01-W1-T1-SKILL-INFRASTRUCTURE-V1_REPORT.md`
  - `reports/LANE01-W1-T2-CORE-SKILLS-AUTHOR-V1_REPORT.md`
  - `reports/LANE01-W1-T2-SHARED-SKILL-LAW-N9-CONFORMANCE-REPAIR-V1_REPORT.md`
  - `reports/LANE01-RUNTIME-LIVE-SYNC-V1_REPORT.md`
  - `reports/AIER-CODE-RUNTIME-HOT-MEMORY-ADOPTION-V1_REPORT.md`
  - `reports/LANE03-LAW-N12-REPO-RUNTIME-STANDARD-AUTHOR-V1_REPORT.md`

This file is the repo-backed hot-memory entry for cold-start Lane readers. It records current repo truth and task state. It does not approve canon, approve roadmap phases, activate drafts, replace `LAW_SYSTEM.md`, replace `REDLINES.md`, or override NTS authority.

## 1. CURRENT SYSTEM IDENTITY

- Authority: NTS remains final authority for canon, roadmap gates, deploy, backend side effects, new Lanes, and halt/resume decisions.
- Mode: `CONTROLLED_EXECUTION / GOVERNANCE_FIRST / RUNTIME_DRYRUN_ONLY`
- Phase: `ROADMAP_W1_EXECUTION / LAW_N12_DRAFT_AUTHORED`
- Gate: `LAW_N12_DRAFT_PENDING_LANE01_REVIEW / NTS_DECISION_PENDING` — Roadmap V1 FINAL remains APPROVED + LOCKED at git tag `roadmap-locked-v2-final` (commit `14f7509`), but the immediate review flow is the pending `LAW_N12` draft packet.
- Operational note: AIER Code Canon (6 files at `docs/LAW_CLA_LLM/CANON/`) is ACTIVE v1.1 by direct NTS approval applied via `LANE03-AIER-CODE-CANON-NTS-APPROVAL-APPLY-V1` (commit `035195c`). Four authored SHARED skills are LAW_N9-conformant DRAFT bundles. `aier-canon-guard` remains SKELETON and unauthored. Public runtime mirror sync exists for visibility only; `Uniton_Shared` on `main` remains the source of truth. `LAW_N12_REPO_RUNTIME_STANDARD.md` is now authored as `v0.1 DRAFT / PENDING_NTS_APPROVAL` together with a pending AMD packet.

## 2. WHO IS WHO

- NTS: Kernel human and final authority.
- Lane_01: active CTO-style contributor operating under active law, approved amendments, and task-scoped authority. Current visible state: Roadmap V1 FINAL locked, W1.T1 skill infrastructure PASS, W1.T2 core skill authoring PASS, W1.T2 LAW_N9 repair PASS, runtime live sync PASS.
- Lane_02: scaffolded AIER Code consumer Lane. Smoke readiness is still pending. Product execution is disabled.
- Lane_03: active execution-support and canon-boundary review Lane. Current visible state: canon apply PASS, LAB/RULE foundation PASS, runtime hot-memory adoption PASS.
- Future Lanes: unopened unless NTS explicitly registers them.

## 3. ACTIVE CANON AND SUPPORT TRUTH

### 3.1 Active Laws

Active law files per `docs/LAW_CLA_LLM/SHARED/SHARED_INDEX.md`:

- `docs/LAW_CLA_LLM/SHARED/laws/LAW_SYSTEM.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N1_IDENTITY.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N2_DISCUSSION.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N4_ROADMAP.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N5_TASK_PROMPT.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N6_OS.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N7_MEMORY.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N8_RUNTIME.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N9_SKILL.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N10_CAPABILITY_MATRIX.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N11_BACKEND_BRIDGE.md`
- `docs/LAW_CLA_LLM/SHARED/laws/REDLINES.md`

### 3.2 Active Support and Operating Docs

- `docs/LAW_CLA_LLM/SHARED/boot/AIER_CODE_BOOT_MINIMUM_V1.md`
- `docs/LAW_CLA_LLM/SHARED/boot/AIER_CODE_TASK_CONTEXT_TEMPLATE_V1.md`
- `docs/LAW_CLA_LLM/SHARED/boot/AIER_CODE_DOCUMENT_STACK_INDEX_V1.md`
- `docs/LAW_CLA_LLM/SHARED/os_operations/AIER_CODE_TOKEN_AND_CONTEXT_OPTIMIZATION_PROTOCOL_V1.md`
- `docs/LAW_CLA_LLM/SHARED/os_operations/AUDIT_PROCEDURE.md`
- `docs/LAW_CLA_LLM/SHARED/os_operations/PROPAGATION_PROCEDURE.md`
- `docs/LAW_CLA_LLM/SHARED/os_operations/WORKSPACE_REPO_INTEGRITY_POLICY.md`

### 3.3 Active AIER Code Canon

The six-file AIER Code project canon bundle is active by direct NTS approval captured in `LANE03-AIER-CODE-CANON-NTS-APPROVAL-APPLY-V1`:

- `docs/LAW_CLA_LLM/CANON/00_README_CANON.md`
- `docs/LAW_CLA_LLM/CANON/01_AIER_CODE_MASTER_CANON.md`
- `docs/LAW_CLA_LLM/CANON/02_AIER_CODE_AUTHORITY_CANON.md`
- `docs/LAW_CLA_LLM/CANON/03_AIER_CODE_BOUNDARY_CANON.md`
- `docs/LAW_CLA_LLM/CANON/04_AIER_CODE_LIFECYCLE_CANON.md`
- `docs/LAW_CLA_LLM/CANON/05_AIER_CODE_INVARIANTS.md`

Approval was granted directly by NTS and mechanically applied by Lane_03 / Codex because Lane_01 was offline. This activation does not approve deploy, backend mutation, daemon/autonomy, product repo work, law changes, or capability grants.

### 3.4 Active Roadmap

- `roadmaps/AIER_CODE_V1_AUTOPILOT_ROADMAP_FINAL.md` — APPROVED + LOCKED (commit `14f7509`; git tag `roadmap-locked-v2-final`).
- `roadmaps/AIER_CODE_V1_AUTOPILOT_ROADMAP.md` — SUPERSEDED (preserved per historical trail rules).
- `roadmaps/IMPROVEMENTS_LOG.md` — active discovery log for later roadmap versions.

### 3.5 Active Skill Infrastructure

- `docs/LAW_CLA_LLM/SHARED/skills/INDEX.md` (ACTIVE registry)
- `docs/LAW_CLA_LLM/SHARED/skills/SKILL_AUTHORING_GUIDE.md` (ACTIVE authoring standard)
- `docs/LAW_CLA_LLM/SHARED/skills/SKILL_INVOCATION_PROTOCOL.md` (ACTIVE invocation standard)
- `docs/LAW_CLA_LLM/SHARED/skills/README.md` (ACTIVE folder overview)
- Skill bundle status:
  - `aier-dispatch` — DRAFT v0.1, LAW_N9-conformant
  - `aier-verify` — DRAFT v0.1, LAW_N9-conformant
  - `aier-state-update` — DRAFT v0.1, LAW_N9-conformant
  - `aier-handoff-route` — DRAFT v0.1, LAW_N9-conformant
  - `aier-canon-guard` — SKELETON, unblocked, not yet authored

### 3.6 Lab + Rule Foundation

- `docs/LAW_CLA_LLM/SHARED/lab/` — SKELETON / DRAFT reference library surfaces only.
- `docs/LAW_CLA_LLM/SHARED/rules/` — SKELETON / DRAFT rule surfaces only.

### 3.7 Draft but Visible Operating Surfaces

- `docs/LAW_CLA_LLM/SHARED/os_operations/AIER_CODE_LANE_NOTIFICATION_ACK_PROTOCOL_V1.md` remains `DRAFT / PENDING_REVIEW`.
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N12_REPO_RUNTIME_STANDARD.md` is `v0.1 DRAFT / PENDING_NTS_APPROVAL` and paired with pending packet `docs/LAW_CLA_LLM/SHARED/amendments/pending/AMD_LANE03_LAW_N12_REPO_RUNTIME_STANDARD_2026-04-27/`.
- `roadmaps/AIER_CODE_DISPATCHER_SPEC_V1.md` remains a DRAFT design artifact and does not create runtime authority.

### 3.8 Runtime Hot-Memory Surfaces

- `runtime/current_state.md` — single human-readable hot-memory entry and the only operational current-state file per `LAW_N7_MEMORY.md` R-MEM-04.
- `runtime/checklist/MASTER_CHECKLIST.md` — active task/progression ledger.
- `runtime/ACTION_REQUIRED_BOARD.md` — active visibility board for unresolved actions and next task routing.
- `notifications/NOTIFICATION_LEDGER.md` + `notifications/NOTIFICATION_LEDGER.json` — notification visibility surfaces.
- `reports/AIER-CODE-CURRENT-STATE-FOR-AITAO-HANDOFF-V1.{md,json}` — historical AITAO handoff artifacts only; not the live current-state file.
- `runtime/current_state.json` — not present. No dedicated machine-readable runtime state file currently exists in `runtime/`.
- Public mirror visibility:
  - `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/current_state.md`
  - `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/checklist/MASTER_CHECKLIST.md`
  - `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/ACTION_REQUIRED_BOARD.md`
  - `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/notifications/NOTIFICATION_LEDGER.md`
  These are read-only mirror copies generated by `sync_runtime_to_public.yml`. `Uniton_Shared` remains source of truth.

## 4. CURRENT PHASE, MODE, AND GATE

- Current phase: `ROADMAP_W1_EXECUTION / LAW_N12_DRAFT_AUTHORED`
- Mode: `CONTROLLED_EXECUTION / GOVERNANCE_FIRST / RUNTIME_DRYRUN_ONLY`
- Gate: `LAW_N12_DRAFT_PENDING_LANE01_REVIEW / NTS_DECISION_PENDING`. The immediate next review flow is Lane_01 review / fast-endorse if boundary clean, then NTS review for `APPROVE / REVISE / REJECT`.
- Runtime authority: DryRun and scoped foreground Apply only when separately authorized. The public runtime mirror sync workflow is active visibility automation only; it is not daemon authority, scheduler authority, autonomous execution, backend mutation, or deploy authority.
- Backend authority: `LAW_N11` remains boundary law only. No backend mutation, no direct API/DB writes, no external side effects.
- Roadmap authority: V1 FINAL is APPROVED + LOCKED. Future structural changes still require proper amendment workflow.

## 5. ACTIVE LANE STATUS

- Lane_01: `ACTIVE / CTO trial day 2/30 / FAST-ENDORSER MODE ACTIVE / W1.T1 DONE / W1.T2 core skills authored / LAW_N9 repair PASS / runtime live sync PASS / LAW_N12 review pending`
- Lane_02: `ONBOARDING_SCAFFOLDED / SMOKE_PENDING / PRODUCT_EXECUTION_DISABLED`
- Lane_03: `ACTIVE / EXECUTION_SUPPORT / LAB+RULE foundation DONE / canon apply DONE / hot-memory adoption DONE / LAW_N12 draft authored`

## 6. LATEST COMPLETED KEY TASKS

(5 most recent; older entries see `runtime/archive/` once rotation begins.)

- `LANE03-LAW-N12-REPO-RUNTIME-STANDARD-AUTHOR-V1` — PASS. Authored `LAW_N12_REPO_RUNTIME_STANDARD.md` as `v0.1 DRAFT / PENDING_NTS_APPROVAL`, created the full pending AMD packet, and updated runtime visibility surfaces to route review without implying approval or activation.
- `LANE01-FULL-REPO-AUDIT-V1` — PASS. Read-only audit of repo state (local + GitHub); 9 tables + §A-§E conclusions; identified W1 next-actions and cleanup follow-ups.
- `AIER-CODE-RUNTIME-HOT-MEMORY-ADOPTION-V1` — PASS. Adopted the existing hot-memory file instead of creating a duplicate; refreshed `runtime/current_state.md`; aligned checklist, action board, notification ledger, and task templates.
- `LANE01-RUNTIME-LIVE-SYNC-V1` — PASS. Registered `sync_runtime_to_public.yml` so the runtime surfaces are mirrored to `Uniton_Shared_Live` for read-only fetch.
- `LANE01-W1-T2-SHARED-SKILL-LAW-N9-CONFORMANCE-REPAIR-V1` — PASS. Repaired `aier-dispatch`, `aier-verify`, `aier-state-update`, and `aier-handoff-route` to LAW_N9 structure while keeping all 4 skills DRAFT.

## 7. CURRENT AND NEXT RECOMMENDED WORK

- Current task: `LANE03-LAW-N12-REPO-RUNTIME-STANDARD-AUTHOR-V1` (completed in this update).
- Next allowed action: Lane_01 review / fast-endorse if boundary clean. Then escalate to NTS for `APPROVE / REVISE / REJECT`.
- Secondary planned actions:
  - `LANE03-W1-T2-CANON-GUARD-AUTHOR-V1` remains queued only after the `LAW_N12` review flow unless Lane_01 / NTS reroutes.
  - `LANE01-W1-AUTHORING-INFRASTRUCTURE-LAW-N9-ALIGNMENT-V1`
  - `LANE01-W1-SHARED-SKILL-REGISTRY-NAMING-V1`
  - `LANE03-DISPATCHER-SPEC-V1-CROSS-REVIEW-V1`
  - `LANE02-AIER-CODE-CONSUMER-READINESS-SMOKE-V1`
  - `LANE03-AIER-CODE-NOTIFICATION-COLLECTOR-DRYRUN-DESIGN-V1`

## 8. OPEN BLOCKERS AND WARNINGS

- The 4 repaired SHARED skill bundles are DRAFT only. They are not ACTIVE and cannot create new authority.
- `LAW_N12_REPO_RUNTIME_STANDARD.md` is DRAFT only and does not create active runtime authority until a later NTS-approved apply task.
- `aier-canon-guard` is unblocked but not yet authored.
- No dedicated `runtime/current_state.json` exists. Do not invent one without a separate scoped task or explicit repo evidence.
- The notification and ACK protocol remains `DRAFT / PENDING_REVIEW`.
- Lane_02 smoke readiness is still pending. Product execution remains disabled until a scoped smoke task passes.
- Skill infrastructure follow-ups remain open: `SKILL_AUTHORING_GUIDE.md` / `SKILL_INVOCATION_PROTOCOL.md` LAW_N9 alignment and `SHARED/skills/REGISTRY.md` naming reconciliation.
- No daemon, scheduler, autonomy, backend mutation, deploy, or external write authority is active.

## 9. BOOT AND READ ORDER

Minimum read order remains per Boot Minimum and LAW_N7:

1. `docs/LAW_CLA_LLM/SHARED/SHARED_INDEX.md`
2. `docs/LAW_CLA_LLM/SHARED/laws/LAW_SYSTEM.md`
3. `docs/LAW_CLA_LLM/SHARED/laws/REDLINES.md`
4. `docs/LAW_CLA_LLM/SHARED/boot/AIER_CODE_BOOT_MINIMUM_V1.md`
5. `runtime/current_state.md`
6. `runtime/checklist/MASTER_CHECKLIST.md`
7. task-specific packet/report/context
8. target files only

For runtime, memory, handoff, roadmap, or state-surface tasks, read these immediately after the checklist:

- `runtime/ACTION_REQUIRED_BOARD.md`
- `notifications/NOTIFICATION_LEDGER.md`

If a private clone is unavailable, a Lane may fetch the read-only mirror copies from `Uniton_Shared_Live`, but must still treat `Uniton_Shared` on `main` as source of truth.

## 10. HOT-MEMORY ADOPTION STANDARD

- Single human-readable hot-memory entry: `runtime/current_state.md`
- Selected machine-readable state file: none dedicated. Until a dedicated runtime JSON state file is separately scoped and approved, machine readers should consume `runtime/current_state.md` plus the latest task-scoped snapshot/report JSON evidence referenced by the current task.
- Historical JSON such as `reports/AIER-CODE-CURRENT-STATE-FOR-AITAO-HANDOFF-V1.json` is preserved as historical handoff evidence only and must not be treated as live current-state authority.
- Every future AIER Code task must read `runtime/current_state.md` and `runtime/checklist/MASTER_CHECKLIST.md` at start.
- If a task materially changes repo truth, it must update `runtime/current_state.md` and any directly affected aligned surfaces (`MASTER_CHECKLIST`, `ACTION_REQUIRED_BOARD`, `NOTIFICATION_LEDGER`) before PASS, or explicitly record `N/A` with reason.
- Duplicate current-state files are forbidden. Do not create a new `current_state` file to work around stale content.

## 11. WHAT AITAO / ANY FUTURE LANE MUST NOT DO

- Do not treat chat memory as operational truth.
- Do not treat historical handoff JSON or report snapshots as the live current-state file.
- Do not create a second `current_state` file.
- Do not treat review as approval.
- Do not treat draft as active.
- Do not author `aier-canon-guard` inside a task that is not explicitly scoped for it.
- Do not infer deploy, backend mutation, daemon/autonomy, product repo work, or capability grants from runtime state or mirror automation.
- Do not bypass NTS, active law, canon, or checklist/action-board evidence.

## 12. UPDATE PROTOCOL

Update `runtime/current_state.md` after:

- major task completion;
- NTS decision or apply event;
- Lane status change;
- roadmap phase or gate change;
- capability or acceptance status change;
- runtime mode or runtime visibility-surface change;
- material repo-truth change that invalidates visible state surfaces.

Rules:

- Do not use `runtime/current_state.md` to approve canon.
- Do not use it to approve or unlock roadmap execution.
- Do not hide blockers or warnings.
- Preserve changelog as append-only evidence.
- If `runtime/current_state.md` conflicts with `SHARED_INDEX`, active law, approved amendment, canon, or repo-backed report evidence, those sources control until this file is corrected by scoped task.

## 13. CHANGELOG

- 2026-04-26 - `T-RUNTIME-001` created the initial current-state memory file.
- 2026-04-26 - `T-L01-RUNTIME-FIX-CHECKLIST-001` corrected path and checklist references.
- 2026-04-26 - `T-L01-NTS-APPROVE-AND-MIGRATE-CANON-STACK-001` activated the AIER Code architecture stack under `SHARED/architecture/`.
- 2026-04-26 - `T-L01-NTS-APPROVE-PENDING-PACKETS-V1` activated Boot Minimum and the Token/Context protocol.
- 2026-04-27 - `LANE01-LAWS-N7-N11-APPROVAL-APPLY-V1` activated `LAW_N7` through `LAW_N11` as active v1.0 canon.
- 2026-04-27 - `LANE01-ROADMAP-FINAL-COMMIT-V1` locked Roadmap V1 FINAL at git tag `roadmap-locked-v2-final`.
- 2026-04-27 - `LANE01-W1-T1-SKILL-INFRASTRUCTURE-V1` activated the SHARED skill infrastructure docs.
- 2026-04-27 - `LANE01-W1-T2-CORE-SKILLS-AUTHOR-V1` authored 4 SHARED skill bundles to DRAFT and deferred `aier-canon-guard`.
- 2026-04-27 - `LANE01-W1-T2-SHARED-SKILL-LAW-N9-CONFORMANCE-REPAIR-V1` repaired the 4 authored DRAFT SHARED skills to active `LAW_N9` structure while keeping every skill DRAFT.
- 2026-04-27 - `LANE01-RUNTIME-LIVE-SYNC-V1` enabled read-only runtime mirror sync to `Uniton_Shared_Live`.
- 2026-04-27 - `AIER-CODE-RUNTIME-HOT-MEMORY-ADOPTION-V1` adopted `runtime/current_state.md` as the active hot-memory entry, aligned checklist/action board/ledger, and recorded the future-task update rule.
- 2026-04-27 - `LANE01-FULL-REPO-AUDIT-V1` produced a 9-table read-only audit of repo state with §A-§E conclusions.
- 2026-04-27 - `LANE03-LAW-N12-REPO-RUNTIME-STANDARD-AUTHOR-V1` authored `LAW_N12_REPO_RUNTIME_STANDARD.md` plus a pending AMD packet and routed the next action into Lane_01 review / NTS decision flow without activating the law.
- 2026-04-27 - `LANE01-W1-T4-COMBINED-V1` Phase A created `runtime/archive/` and `notifications/archive/` infrastructure with rotation policy, trimmed §6 to 5 most-recent, updated sync workflow to exclude archive folders. Phase B verifies mirror sync timing. Phase C runs W1.T4 smoke loop (aier-dispatch + aier-verify) on a real W1.T3 boot-protocol update.
