# AIER Context Packet

Schema version: AIER_CONTEXT_PACKET_V1

Generated at: 2026-04-29T21:22:30.3082355+07:00

Source repo: `unitonzengarden/Uniton_Shared`

Source commit: `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a`

Status: ACTIVE / REALTIME_VERIFIED

Authority: NTS

This packet is a cold-start state summary for AITAO and Lane executors. It is evidence routing only. Active laws and `Uniton_Shared` remain source of truth.

## 1. System Identity

- System: AIER Code / Uniton Future ecosystem
- Authority: NTS
- Execution model: Human = Authority; AI = Execution; Repo = Truth
- Governance source repo: `unitonzengarden/Uniton_Shared`
- Public mirror repo: `unitonzengarden/Uniton_Shared_Live`
- Working branch: `main`
- Current source commit: `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a`
- Current mode: `CONTROLLED_EXECUTION / GOVERNANCE_FIRST / RUNTIME_DRYRUN_ONLY`

## 2. Current Phase / Mode

- Current phase from runtime evidence: `V1_0_GA_COMPLETE / READY_FOR_NEXT_PHASE`
- Gate from `runtime/current_state.md`: `ALL_LANE_01_TASKS_DONE / ECOSYSTEM_READY`
- Gate from `runtime/PROJECT_STATUS.md`: `(unknown)`
- Phase status: `YELLOW / NEEDS_RECONCILIATION`
- Reason: current phase aligns on V1.0 GA complete, but gate detail differs between `runtime/current_state.md` and generated `runtime/PROJECT_STATUS.md`.
- Runtime authority: dry-run and scoped foreground apply only when separately authorized.
- No daemon, scheduler, backend mutation, deployment, product repo work, or capability expansion is authorized by this packet.

## 3. Active Laws

Evidence from `runtime/PROJECT_STATUS.md`, `runtime/current_state.md`, LAW_GITHUB_01, and LAW_N5:

- `LAW_GITHUB_01_REPO_GOVERNANCE.md` is ACTIVE.
- `LAW_N5_TASK_PROMPT.md` is ACTIVE and requires REPORT_TEMPLATE_V2 for future executed task reports.
- `LAW_N13_MULTI_REPO_AND_HANDOFFS.md` is ACTIVE for AIER Life multi-repo integration and handoff boundaries.
- `REDLINES.md` remains active.
- `runtime/PROJECT_STATUS.md` reports active law state for the AIER Code governance surface.

REPORT_TEMPLATE_V2 is mandatory. Missing mandatory V2 evidence means a task cannot be marked PASS.

## 4. Active Repo Registry

| Repo | Role | Implementation allowed | Evidence |
|---|---|---|---|
| `unitonzengarden/Uniton_Shared` | GOVERNANCE / BRAIN | Governance and evidence only | LAW_GITHUB_01, REPO_REGISTRY, gh metadata |
| `unitonzengarden/Uniton_Shared_Live` | MIRROR / PUBLIC STATE | No active implementation; mirror sync only when scoped | LAW_GITHUB_01, sync verification, gh metadata |
| `unitonzengarden/Uniton_OS` | RUNTIME / EXECUTION | Runtime only when explicitly scoped | LAW_GITHUB_01, REPO_REGISTRY, gh metadata |
| `unitonzengarden/uzgplus-app` | PRODUCT / UZG+ | UZG+ product only when explicitly scoped | LAW_GITHUB_01, REPO_REGISTRY, gh metadata |
| `unitonzengarden/AIFI_LIFE` | PRODUCT / AIFI LIFE | AIFI LIFE product only when explicitly scoped | LAW_GITHUB_01, REPO_REGISTRY, gh metadata |
| `unitonzengarden/aier-life-super-app` | PRODUCT / AIER LIFE | AIER LIFE product only when explicitly scoped | LAW_GITHUB_01, REPO_REGISTRY, gh metadata |
| `unitonzengarden/_archive_chatbot` | ARCHIVE / LEGACY / NOT ACTIVE | No active work | LAW_GITHUB_01, metadata apply warning, gh metadata |

Repo selection rule: choose repo by role before any task. Repo mismatch requires `RESULT: BLOCKED` and no file changes.

## 5. Current Task

- Task ID: `LANE03-AIER-CONTEXT-PACKET-REFRESH-AFTER-MIRROR-VERIFY-V1`
- Lane: `Lane_03`
- Executor: Codex
- Scope: Refresh the AIER context packet and ecosystem health spine after public mirror verification.
- Target repo: `unitonzengarden/Uniton_Shared`
- Branch: `main`
- Status: `IN_PROGRESS_AT_REFRESH`
- Source prompt: current NTS task prompt in Codex session
- Evidence report path: `reports/LANE03-AIER-CONTEXT-PACKET-REFRESH-AFTER-MIRROR-VERIFY-V1_REPORT.md`

## 6. Last Completed Task

Most recent completed Lane_03 V2 evidence:

- Task ID: `LANE03-UNITON_SHARED_LIVE-SYNC-VERIFY-V1`
- Result: PASS
- Evidence commit: `9c6fd2b4d983fd71a122a2f488827afc14db75f9`
- Source basis verified by mirror: `c752d15c237e7db3ad3b523beb8e3c12f58685fd`
- Report: `reports/LANE03-UNITON_SHARED_LIVE-SYNC-VERIFY-V1_REPORT.md`
- Snapshot: `snapshots/LANE03-UNITON_SHARED_LIVE-SYNC-VERIFY-V1.snapshot.json`
- Summary: public mirror availability and hash parity were verified for the 7 AIER context/health files.

Latest repo event observed by git:

- Commit: `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a`
- Subject: `[auto-status] regen runtime+network surfaces from 9c6fd2b [vercel skip]`
- Mirror status for this source basis: `VERIFIED / SYNCED`

## 7. Open Blockers

No BLOCKED domain is confirmed by current evidence.

Evidence gaps and warnings:

- `BRANCH_PROTECTION_PLAN_REQUIRED`: ecosystem branch protection is not fully enabled or validated.
- `PR_BACKLOG_REVIEW_REQUIRED`: read-only GitHub inspection found open PRs in `Uniton_OS` and `aier-life-super-app`.
- `SECRET_REVIEW_REQUIRED`: `uzgplus-app` root `.env` and `.env.test` were flagged by prior audit for future review; this task did not inspect secrets.
- `PRODUCT_CI_README_EVIDENCE_GAP`: product CI/README readiness remains incomplete or unverified for some product repos.
- `PHASE_GATE_RECONCILIATION_REQUIRED`: `runtime/current_state.md` and `runtime/PROJECT_STATUS.md` differ in gate detail.
- `MIRROR_VERIFIED`: the public mirror sync layer is verified for the 7 packet/health files, and latest `SYNC_INFO.md` reports source commit `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a`.

## 8. Ecosystem Health Verdict

- Overall verdict: YELLOW
- Reason: mirror availability is verified, but branch protection, PR backlog review, product evidence, secret review, and phase/gate reconciliation remain incomplete.
- Health state file: `runtime/health/ECOSYSTEM_HEALTH_STATE.md`
- Machine-readable health state: `runtime/health/ECOSYSTEM_HEALTH_STATE.json`

Domain summary:

| Domain | Status | Reason |
|---|---|---|
| GitHub health | YELLOW | LAW_GITHUB_01 active and metadata mostly applied; branch protection and PR backlog remain incomplete. |
| Governance health | YELLOW | Active laws and REPORT V2 are present; phase/gate reconciliation remains needed. |
| Runtime health | YELLOW | Runtime surfaces exist and packet/health are refreshed; project status still has evidence gaps. |
| Product health | YELLOW | Product repos are classified; product CI, README, PR, and secret evidence remain incomplete. |
| Mirror health | GREEN | `Uniton_Shared_Live` has the 7 packet/health files, raw URLs are readable, hashes matched, and latest sync source commit is verified. |
| Lane health | YELLOW | Active lanes are registered; ongoing lane activity continues and requires status discipline. |
| Report/evidence health | GREEN | LAW_N5 REPORT_TEMPLATE_V2 is active and recent Lane_03 evidence is V2-compliant. |
| Security/secret-risk health | YELLOW | No confirmed leak, but `uzgplus-app` secret review remains required. |

## 9. Next Safe Action

Next safe action:

```text
LANE03-GITHUB-BRANCH-PROTECTION-PLAN-V1
```

Reason: mirror availability is now verified. The next highest governance gap is branch-protection planning under LAW_GITHUB_01.

Allowed scope for next task:

- plan branch protection by repo role;
- do not enable branch protection yet unless explicitly scoped;
- preserve repo role registry and REPORT_TEMPLATE_V2 evidence.

## 10. Forbidden Actions

- Do not treat this packet as law or NTS approval.
- Do not use `Uniton_Shared_Live` as source of truth.
- Do not change GitHub settings unless a task explicitly scopes it.
- Do not enable branch protection unless a branch-protection apply task explicitly scopes it.
- Do not write to `Uniton_OS` unless runtime scope explicitly authorizes it.
- Do not write to product repos unless product scope explicitly authorizes it.
- Do not deploy without NTS authority.
- Do not mutate backend/API/database state without explicit authority.
- Do not activate or modify laws unless an approved apply task explicitly scopes it.
- Do not perform archive implementation work in `_archive_chatbot`.
- Do not invent health facts. Use `UNKNOWN / EVIDENCE_GAP` when evidence is missing.

## 11. Raw Mirror Fetch URLs Currently Available And Verified

Current public mirror root:

```text
https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/
```

Verified packet/health URLs:

- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/AIER_CONTEXT_PACKET.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/AIER_CONTEXT_PACKET.json`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/health/ECOSYSTEM_HEALTH_STATE.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/health/ECOSYSTEM_HEALTH_STATE.json`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/health/LATEST_VERIFIED_COMMITS.json`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/health/BLOCKERS_AND_RISKS.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/health/NEXT_SAFE_ACTION.md`

Other public runtime/network URLs remain available from the sync workflow:

- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/current_state.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/checklist/MASTER_CHECKLIST.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/ACTION_REQUIRED_BOARD.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/runtime/PROJECT_STATUS.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/notifications/NOTIFICATION_LEDGER.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/network/LANE_REGISTRY.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/network/ACTIVITY_FEED.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/network/task_queues/Lane_01.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/network/task_queues/Lane_02.md`
- `https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/network/task_queues/Lane_03.md`

## 12. Mirror Sync Verification

- Mirror status: `VERIFIED / SYNCED`
- Latest sync run: `25113988449`
- Latest sync run conclusion: `success`
- Latest sync event: `workflow_run`
- Latest synced source commit: `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a`
- Latest mirror commit: `8c254ef2adc3d0572ec78954f522c1f71c19fe12`
- Latest mirror sync timestamp: `2026-04-29T14:12:00Z`
- Prior hash parity verification report: `reports/LANE03-UNITON_SHARED_LIVE-SYNC-VERIFY-V1_REPORT.md`
- Private exposure check: PASS in prior verify report.

## 13. Last Verified Commits

See `runtime/health/LATEST_VERIFIED_COMMITS.json` for the machine-readable record.

| Repo | Latest verified commit | Evidence source |
|---|---|---|
| `unitonzengarden/Uniton_Shared` | `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a` | `git rev-parse HEAD`, `gh repo view`, `gh api commits/main` |
| `unitonzengarden/Uniton_Shared_Live` | `8c254ef2adc3d0572ec78954f522c1f71c19fe12` | `gh repo view`, `gh api commits/main`, `SYNC_INFO.md` |
| `unitonzengarden/Uniton_OS` | `da381919836a4da517da9700799fccb1e336e8d4` | `gh repo view`, `gh api commits/main` |
| `unitonzengarden/uzgplus-app` | `57ba05c6d85d3887cc82641823719e14b217e942` | `gh repo view`, `gh api commits/main` |
| `unitonzengarden/AIFI_LIFE` | `2690235e00117b5f829a0231a1b34c3d9d0c36db` | `gh repo view`, `gh api commits/main` |
| `unitonzengarden/aier-life-super-app` | `73960cdb4738334791cb6e58ad0fd898b85b1c8a` | `gh repo view`, `gh api commits/main` |
| `unitonzengarden/_archive_chatbot` | `7ded30f4301b29efa2a03d6ed4959a913aed1349` | `gh repo view`, `gh api commits/main` |

## 14. Last Sync Timestamp

- Packet refreshed at: `2026-04-29T21:22:30.3082355+07:00`
- Health spine refreshed at: `2026-04-29T21:22:30.3082355+07:00`
- Source commit at refresh: `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a`
- Mirror `SYNC_INFO.md` last sync: `2026-04-29T14:12:00Z`
- Mirror `SYNC_INFO.md` source commit: `895e0415b5e4d608a835a31e9dcf6b5f5c1c7c7a`
- Mirror sync status for packet/spine: `VERIFIED / SYNCED`

## 15. Evidence Sources

- `runtime/AIER_CONTEXT_PACKET.md`
- `runtime/AIER_CONTEXT_PACKET.json`
- `runtime/health/ECOSYSTEM_HEALTH_STATE.md`
- `runtime/health/ECOSYSTEM_HEALTH_STATE.json`
- `runtime/health/LATEST_VERIFIED_COMMITS.json`
- `runtime/health/BLOCKERS_AND_RISKS.md`
- `runtime/health/NEXT_SAFE_ACTION.md`
- `reports/LANE03-UNITON_SHARED_LIVE-SYNC-VERIFY-V1_REPORT.md`
- `snapshots/LANE03-UNITON_SHARED_LIVE-SYNC-VERIFY-V1.snapshot.json`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_GITHUB_01_REPO_GOVERNANCE.md`
- `docs/LAW_CLA_LLM/SHARED/laws/LAW_N5_TASK_PROMPT.md`
- `.github/workflows/sync_runtime_to_public.yml`
- read-only `gh` metadata, workflow, PR count, commit, and branch-protection reads

## 16. AITAO Cold-Start Instruction

1. Read `runtime/AIER_CONTEXT_PACKET.json` first.
2. Read `runtime/AIER_CONTEXT_PACKET.md` second for human-readable details.
3. Read `runtime/health/ECOSYSTEM_HEALTH_STATE.json` before selecting any repo or next task.
4. Confirm the target repo role against the active repo registry.
5. Public mirror files are verified for visibility, but `Uniton_Shared` remains source of truth for write-capable work.
6. If a required fact is missing, mark `UNKNOWN / EVIDENCE_GAP` and do not invent state.
7. If the task target does not match the repo role, stop with `RESULT: BLOCKED` and reason `REPO_SELECTION_MISMATCH`.
