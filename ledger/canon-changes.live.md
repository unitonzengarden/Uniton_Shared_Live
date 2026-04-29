# CANON CHANGES LEDGER

**Append-only.** Tracks edits to canon, laws, redlines, amendment packets in the last 7 days. Auto-derivable from `git log` on the relevant paths; this snapshot taken 2026-04-29.

**Schema** (per `LIVE_LEDGER_SCHEMA_v1` §3.3):

| Date | File | Change type | Diff summary | PR # |

Change types: `CREATE | UPDATE | DEPRECATE | RENAME`.

---

## 2026-04-29

| Date | File | Change | Diff summary | PR / Commit |
|---|---|---|---|---|
| 2026-04-29 | `docs/architecture/BLOCH_SCHEMA_SPEC_v1.md` | UPDATE | Citation cleanup — narrowed "pending" markers to in-repo Canon V1.1 / LAW_N14 paths | PR #13 / `eabfdda` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/laws/LAW_N14_INTER_AIER_BRIDGE_STANDARD_v1_1.md` | CREATE | LAW_N14 prose — 7 mandatory rules L14.1–L14.7 + redlines + inheritance | PR #12 / `5140700` |
| 2026-04-29 | `docs/architecture/INTER_AIER_BRIDGE_CANON_v1_1.md` | CREATE | Canon V1.1 prose — 4-layer architecture + 12-field BLOCH schema + V1-V9 verify rules | PR #12 / `5140700` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/laws/LAW_GITHUB_01_REPO_GOVERNANCE.md` | CREATE | LAW_GITHUB_01 applied (renamed from drafts/) — repo selection + branch/PR/Actions governance | `dcc35f1` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/laws/drafts/LAW_GITHUB_01_REPO_GOVERNANCE_DRAFT.md` | UPDATE | Revised draft with report and repo gates | `97379a5` |
| 2026-04-29 | `docs/architecture/BLOCH_SCHEMA_SPEC_v1.md` | CREATE | BLOCH MVP implementer profile — 12 fields + V1-V9 verify + JSON canonical form + 2 examples | PR #11 / `c96af5d` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/laws/LAW_N5_TASK_PROMPT.md` | UPDATE | LAW_N5 report system amendment applied | `a4e607c` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/amendments/approved/NTS_DECISION_2026-04-29_BRIDGE_CANON_v1_1_LAW_N13.md` | CREATE | NTS_DECISION packet — APPROVE Bridge Canon v1.1 + LAW_N13 multi-repo workflow | PR #9 / `3e1af63` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/laws/drafts/LAW_GITHUB_01_REPO_GOVERNANCE_DRAFT.md` | CREATE | LAW_GITHUB_01 draft — initial proposal | `78a0bf4` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE01_AIER_CODE_BRAIN_Q1_Q4_2026-04-29/NTS_DECISION.md` | CREATE | AMD packet recording NTS Q1-Q4 = A/A/A/A blueprint approval | `22bfadb` |
| 2026-04-29 | `docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md` | CREATE | AIER Code 4-layer brain blueprint (L1 RAG / L2 episodic / L3 semantic / L4 procedural + L0 deferred) | PR #8 / `ae76550` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/laws/LAW_N13_MULTI_REPO_AND_HANDOFFS.md` | CREATE | LAW_N13 ACTIVE — multi-repo workflow + cross-Lane handoffs canonical | `9798af2` |
| 2026-04-29 | `docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_LAW_N13_AIER_LIFE_INTEGRATION_2026-04-29/` | CREATE | AMD packet — 5 files (CANDIDATE/IMPACT/NTS_DECISION/PROPOSAL/RATIONALE) | `9798af2` |

---

## 2026-04-28

| Date | File | Change | Diff summary | PR / Commit |
|---|---|---|---|---|
| 2026-04-28 | `docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE02_AIER_CODE_ROLE_REFRAME_2026-04-29/` | CREATE | AMD packet — Lane_02 role reframe to AIER_CODE_PARALLEL_EXECUTOR (5 files) | `b603832` |
| 2026-04-28 | `docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_AIER_CANON_GUARD_ACTIVATE_2026-04-28/` | CREATE | AMD packet — `aier-canon-guard` skill ACTIVATE (4 files) | `7a0e64a` |

---

## 2026-04-27

| Date | File | Change | Diff summary | PR / Commit |
|---|---|---|---|---|
| 2026-04-27 | `docs/LAW_CLA_LLM/SHARED/laws/LAW_N12_REPO_RUNTIME_STANDARD.md` | UPDATE | Activated to ACTIVE v1.0 status | `e6c8cf4` |
| 2026-04-27 | `docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_LAW_N12_REPO_RUNTIME_STANDARD_2026-04-27/` | CREATE | AMD packet — LAW_N12 activation (4 files) | `e6c8cf4` |
| 2026-04-27 | `docs/LAW_CLA_LLM/SHARED/laws/LAW_N12_REPO_RUNTIME_STANDARD.md` | CREATE | Initial draft proposal | `7f9e3a7` |
| 2026-04-27 | `docs/LAW_CLA_LLM/CANON/00_README_CANON.md` | UPDATE | AIER Code canon bundle activated post NTS approval | `035195c` |
| 2026-04-27 | `docs/LAW_CLA_LLM/CANON/01_AIER_CODE_MASTER_CANON.md` | UPDATE | Activated | `035195c` |
| 2026-04-27 | `docs/LAW_CLA_LLM/CANON/02_AIER_CODE_AUTHORITY_CANON.md` | UPDATE | Activated | `035195c` |
| 2026-04-27 | `docs/LAW_CLA_LLM/CANON/03_AIER_CODE_BOUNDARY_CANON.md` | UPDATE | Activated | `035195c` |
| 2026-04-27 | `docs/LAW_CLA_LLM/CANON/04_AIER_CODE_LIFECYCLE_CANON.md` | UPDATE | Activated | `035195c` |
| 2026-04-27 | `docs/LAW_CLA_LLM/CANON/05_AIER_CODE_INVARIANTS.md` | UPDATE | Activated | `035195c` |
| 2026-04-27 | `docs/LAW_CLA_LLM/CANON/NTS_APPROVAL_AIER_CODE_CANON_2026-04-27.md` | CREATE | NTS approval document for AIER Code canon bundle | `035195c` |

---

## Stats (last 7 days)

- **CREATE events**: 18
- **UPDATE events**: 8
- **Most-active days**: 2026-04-29 (12 events) > 2026-04-27 (10 events)
- **Most-touched directory**: `docs/LAW_CLA_LLM/SHARED/amendments/approved/` (8 packets)

---

**END canon-changes.live.md** — schema reference: `docs/architecture/LIVE_LEDGER_SCHEMA_v1.md` §3.3
