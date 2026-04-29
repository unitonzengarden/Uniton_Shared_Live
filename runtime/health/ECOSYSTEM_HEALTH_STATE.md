# Ecosystem Health State

Schema version: ECOSYSTEM_HEALTH_SPINE_V1

Generated at: 2026-04-29T17:49:06.1377711+07:00

Source repo: `unitonzengarden/Uniton_Shared`

Source commit: `32701083b367e1a8d595f3b4d53cba10d7a2f1b8`

Aggregate verdict: YELLOW

Aggregate reason: no confirmed critical blocker, but branch protection, PR backlog, product evidence, mirror expansion, first packet validation, and secret review remain incomplete or future-scoped.

## Domain Table

| Domain | Status | Evidence | Latest commit/source | Blocker | Next action |
|---|---|---|---|---|---|
| GitHub health | YELLOW | LAW_GITHUB_01 active; REPO_REGISTRY exists; metadata hygiene applied with WARNING; read-only gh inspection shows open PRs in `Uniton_OS` and `aier-life-super-app`; branch protection not complete across ecosystem. | `32701083b367e1a8d595f3b4d53cba10d7a2f1b8`; gh read-only inspection 2026-04-29T17:49:06+07:00 | NONE | `LANE03-GITHUB-BRANCH-PROTECTION-PLAN-V1` after sync expansion. |
| Governance health | YELLOW | LAW_GITHUB_01 ACTIVE; LAW_N5 REPORT_TEMPLATE_V2 ACTIVE; `runtime/PROJECT_STATUS.md` reports 16 active law files and 23 pending AMD rows. | `LAW_GITHUB_01`; `LAW_N5`; `runtime/PROJECT_STATUS.md` | NONE | Reconcile historical/pending governance evidence when scoped. |
| Runtime health | YELLOW | `runtime/current_state.md`, `runtime/PROJECT_STATUS.md`, action board, lane registry, and activity feed exist; QA aggregate in project status is 60/100; this packet/spine is first generation. | `runtime/PROJECT_STATUS.md` source commit `7af5683818291ef85559e2ef66b266a99e8a056f` | NONE | Validate and refresh packet/spine through future generator automation. |
| Product health | YELLOW | Product repos classified by LAW_GITHUB_01 and metadata present; product CI/README evidence incomplete; `uzgplus-app` latest workflow was in progress during read-only inspection; product PR evidence incomplete. | `uzgplus-app` `0c7edee8e1396f64f47e22225fc57aba451f20b5`; `AIFI_LIFE` `2690235e00117b5f829a0231a1b34c3d9d0c36db`; `aier-life-super-app` `73960cdb4738334791cb6e58ad0fd898b85b1c8a` | NONE | Product CI/README/PR review tasks when explicitly scoped. |
| Mirror health | YELLOW | `Uniton_Shared_Live` exists and current sync workflow mirrors runtime/checklist/action/project/notification/network files only; packet/spine URLs are planned but not implemented; mirror `SYNC_INFO.md` source commit is older than current source. | Mirror commit `7785581aa5de637bcf7504597a20231a3f28b0ab`; `SYNC_INFO.md` source commit `9798af2cd11dd204cf1898472db94b0cf8d29520` | NONE | `LANE03-UNITON_SHARED_LIVE-SYNC-EXPANSION-V1`. |
| Lane health | YELLOW | `network/LANE_REGISTRY.md` shows Lane_01, Lane_02, Lane_03 active; pending lanes none; activity feed has unknown task identity rows; planned and ready lane work remains. | `network/LANE_REGISTRY.md` source commit `7af5683818291ef85559e2ef66b266a99e8a056f` | NONE | Keep lane registry/activity feed aligned and resolve unknown identity rows when scoped. |
| Report/evidence health | GREEN | LAW_N5 V2 enforcement active; recent Lane_03 governance reports use REPORT_TEMPLATE_V2; this task creates V2 report/json/snapshot/audit. | `reports/LANE03-REPORT-SYSTEM-LAW-N5-APPLY-V1_REPORT.md`; `reports/LANE03-AIER-CONTEXT-PACKET-AND-HEALTH-SPINE-SPEC-V1_REPORT.md` | NONE | Add validator automation in a future scoped task if desired. |
| Security/secret-risk health | YELLOW | LAW_GITHUB_01 security minimum active; prior audit flagged `uzgplus-app` `.env` and `.env.test` for review; this task did not inspect secrets. | `reports/LANE03-GITHUB-METADATA-HYGIENE-APPLY-V1_REPORT.md`; LAW_GITHUB_01 | NONE | Run `uzgplus-app` secret review as a separate scoped product/security task. |

## Blockers

No BLOCKED domain is confirmed.

## Risks And Evidence Gaps

- `BRANCH_PROTECTION_PLAN_REQUIRED`: branch protection is not complete across active governance/runtime/product repos.
- `PR_BACKLOG_REVIEW_REQUIRED`: read-only inspection found 3 open PRs in `Uniton_OS` and 3 in `aier-life-super-app`.
- `MIRROR_EXPANSION_REQUIRED`: packet and health files are not yet mirrored.
- `MIRROR_SYNC_STALE_FOR_PACKET`: `SYNC_INFO.md` shows last mirror source commit `9798af2cd11dd204cf1898472db94b0cf8d29520`, older than current source commit.
- `SECRET_REVIEW_REQUIRED`: `uzgplus-app` secret review remains future-scoped.
- `PRODUCT_CI_README_EVIDENCE_GAP`: product readiness evidence is incomplete.
- `PHASE_GATE_RECONCILIATION_REQUIRED`: current_state and PROJECT_STATUS gate detail differs.

## Next Safe Action

```text
LANE03-UNITON_SHARED_LIVE-SYNC-EXPANSION-V1
```

Reason: generated packet and health spine now exist in `Uniton_Shared`; the next safe step is to make them available through the public mirror under a scoped workflow update.

