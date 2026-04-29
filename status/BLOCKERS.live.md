# ACTIVE BLOCKERS

**Refresh-allowed.** Last updated: 2026-04-29 (LANE01-LIVE-LEDGER-FOUNDATION snapshot).

Schema reference: [`docs/architecture/LIVE_LEDGER_SCHEMA_v1.md`](../docs/architecture/LIVE_LEDGER_SCHEMA_v1.md) §4.3.

---

## P0 (deploy blocker — system cannot ship without resolution)

**None active** as of 2026-04-29.

---

## P1 (critical — blocks downstream tasks)

| ID | Description | Owner | Since | Resolution path |
|---|---|---|---|---|
| BLK-001 | Live Ledger emit automation not yet built — manual writes to `tasks/`, `ledger/`, `aier-status/` are CLAC-1 / Cursor responsibility per task close-out | Lane_01 (CLAC-1) | 2026-04-29 | `LANE01-LIVE-LEDGER-EMIT-AUTOMATION` task pending dispatch (next priority after this Foundation merges) |
| BLK-002 | `AMD_NTS_FULL_TECH_AUTONOMY` cited in dispatches since 2026-04-29 but has NO repo-backed amendment packet | Lane_03 (canon-author) or Lane_01 | 2026-04-29 | Either author the AMD packet at `docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_NTS_FULL_TECH_AUTONOMY_2026-04-29/` or stop citing it as authority |
| BLK-003 | `LAW-NTS-LLM-11` (PRE_DISPATCH_VERIFY) + `LAW-NTS-LLM-12` (REPORT_VERIFY_MANDATORY) cited in dispatch templates but no actual `LAW-NTS-LLM-*` law file in repo | Lane_03 (canon-author) | 2026-04-29 | Either promote concept to a numbered LAW (e.g., LAW_N15) or formalize as dispatch-template-only convention |

---

## P2 (polish — nice-to-have, parallel-safe)

| ID | Description | Owner | Resolution |
|---|---|---|---|
| BLK-P2-001 | UTF-8 mojibake artifacts in `docs/LAW_CLA_LLM/CANON/05_AIER_CODE_INVARIANTS.md` (em-dash bytes mis-encoded; observed during L1 ingest) | Lane_03 | small one-shot fix task `LANE01-CANON-INVARIANTS-UTF8-CLEANUP` (suggested) |
| BLK-P2-002 | Workflow `name:` integrity check — `workflow_run.workflows[]` in `sync_runtime_to_public.yml` could silently drift if upstream workflow renames | Lane_01 | optional lint workflow; `LANE01-WORKFLOW-NAME-INTEGRITY-CHECK` (suggested) |
| BLK-P2-003 | Lane_04 deferred-strategic — no Lane_04 task queue or boot in repo (intentional per V1.0 GA scope; may revisit Phase 2) | n/a | hold for V2.0+ scope decision |

---

## Recently resolved (last 7 days)

| ID | Description | Resolved by | When |
|---|---|---|---|
| BLK-LL-CORE | Sync workflow not firing for ~14h (LANE01-LIVE-LEDGER-AUDIT-V1 finding) | `LANE01-LIVE-LEDGER-TRIGGER-FIX` PR #15 | 2026-04-29 |
| BLK-INH-04-PREREQ | `LANE01-INH-CODE-04-BUILD-L1-INGEST` first dispatch HALTED on missing prereqs (env vars + Mgmt API runner + PR #8 + Q1-Q4 packet) | `LANE01-INFRA-AUTOMATION-V1` (Cursor) + AMD `22bfadb` + PR #8 merge + redispatch as split execution | 2026-04-29 |
| BLK-INH-02-COLLISION | Duplicate dispatch of `LANE01-INH-CODE-02-HEARTBEAT-7COND` (already shipped as `-7-CONDITION`) | CLA cancellation + redispatch as `LANE01-INH-CODE-02b-HEARTBEAT-FIX-FAILING` | 2026-04-29 |
| BLK-BRIDGE-CANON-PENDING | Canon V1.1 + LAW_N14 cited but not in repo at time of BLOCH MVP spec | `LANE01-CANON-V1-1-LAW-N14` PR #12 + `LANE01-BLOCH-SPEC-V1-CITATION-CLEANUP` PR #13 | 2026-04-29 |
| BLK-LIVE-MIRROR-STALE | Public mirror 14h stale | `LANE01-LIVE-LEDGER-TRIGGER-FIX` (systemic) + this Foundation task (structural) | 2026-04-29 |

---

**END BLOCKERS.live.md**
