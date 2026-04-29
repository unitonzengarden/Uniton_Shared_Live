# NTS DECISIONS LEDGER

**Append-only.** Each row reflects a discrete NTS decision that materialized in repo. Editing existing rows is forbidden — corrections happen via new rows pointing at the corrected one.

**Schema** (per `LIVE_LEDGER_SCHEMA_v1` §3.2):

| Date | DEC-ID | Topic | NTS verbatim source | Repo evidence |

---

## Verified entries (repo-backed)

| Date | DEC-ID | Topic | NTS verbatim source | Repo evidence |
|---|---|---|---|---|
| 2026-04-26 | DEC-001 | AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON activated — Lane_01 self-approves tech non-canon | NTS approval per packet | [`docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON_2026-04-26/`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON_2026-04-26/) |
| 2026-04-26 | DEC-002 | AMD_LANE03_AIER_CODE_CANON_SPEC_STACK activated — AIER Code memory spec V1 + canon stack | NTS approval per packet | [`docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_AIER_CODE_CANON_SPEC_STACK_2026-04-26/`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_AIER_CODE_CANON_SPEC_STACK_2026-04-26/) |
| 2026-04-27 | DEC-003 | AMD_LANE03_LAW_N12_REPO_RUNTIME_STANDARD activated — LAW_N12 ACTIVE | NTS approval per packet | commit `e6c8cf4` + [`packet`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_LAW_N12_REPO_RUNTIME_STANDARD_2026-04-27/) |
| 2026-04-27 | DEC-004 | AIER Code canon bundle (5 numbered + README + NTS approval) activated | NTS approval per `NTS_APPROVAL_AIER_CODE_CANON_2026-04-27.md` | commit `035195c` + [`docs/LAW_CLA_LLM/CANON/`](../docs/LAW_CLA_LLM/CANON/) |
| 2026-04-28 | DEC-005 | AMD_LANE03_AIER_CANON_GUARD_ACTIVATE — `aier-canon-guard` skill ACTIVE | NTS approval per packet | [`packet`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_AIER_CANON_GUARD_ACTIVATE_2026-04-28/) |
| 2026-04-29 | DEC-006 | AMD_LANE03_LAW_N13_AIER_LIFE_INTEGRATION activated — LAW_N13 ACTIVE (multi-repo + handoffs) | NTS approval per packet | commit `9798af2` + [`packet`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE03_LAW_N13_AIER_LIFE_INTEGRATION_2026-04-29/) |
| 2026-04-29 | DEC-007 | AMD_LANE02_AIER_CODE_ROLE_REFRAME applied — Lane_02 = AIER_CODE_PARALLEL_EXECUTOR / TECH_NON_CANON_ONLY | NTS approval per packet | commit `b603832` + [`packet`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE02_AIER_CODE_ROLE_REFRAME_2026-04-29/) |
| 2026-04-29 | DEC-008 | NTS_DECISION 2026-04-29 — APPROVE INTER_AIER_BRIDGE_CANON v1.1 + LAW_N13 multi-repo workflow | "APPROVE INTER_AIER_BRIDGE_CANON v1.1 + LAW_N13 multi-repo workflow" (NTS chat 2026-04-29) | commit `3e1af63` + [`packet`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/NTS_DECISION_2026-04-29_BRIDGE_CANON_v1_1_LAW_N13.md) |
| 2026-04-29 | DEC-009 | AMD_LANE01_AIER_CODE_BRAIN_Q1_Q4 — Q1=A (prefix `aier_code_*`) Q2=A (Tuần 1 = L1 only) Q3=A (L0 defer Phase 2) Q4=A (Decision fold L2) | NTS chat 2026-04-29 (per packet body) | commit `22bfadb` + [`packet`](../docs/LAW_CLA_LLM/SHARED/amendments/approved/AMD_LANE01_AIER_CODE_BRAIN_Q1_Q4_2026-04-29/) |

---

## Pending repo-back (claimed but no packet verified yet)

The following decisions are referenced in dispatched task specs / handoffs but **lack a repo-backed amendment packet** as of this ledger entry. They should be packetized in a follow-up canon-author task; until then, they are governance claims NOT yet promoted to repo authority.

| Claimed DEC-ID | Topic | First citation | Status |
|---|---|---|---|
| (pending) | AMD_NTS_FULL_TECH_AUTONOMY_2026-04-29 — executor self-merge authority | Cited in dispatch headers since 2026-04-29 (multiple task specs); cited in this LANE01-LIVE-LEDGER-FOUNDATION too | **No packet in `docs/LAW_CLA_LLM/SHARED/amendments/approved/`** — promote via separate canon-author task |
| (pending) | LAW-NTS-LLM-11 PRE_DISPATCH_VERIFY | Cited in dispatch §1 PRE-DISPATCH VERIFY blocks since 2026-04-29 | **No `LAW-NTS-LLM-*` law in repo** — closest concept lives inside dispatch templates; promote to formal LAW if NTS approves |
| (pending) | LAW-NTS-LLM-12 REPORT_VERIFY_MANDATORY | Cited in dispatch §7 REMINDERS since 2026-04-29 | **No `LAW-NTS-LLM-*` law in repo** — same as above |

These are tracked here so future tasks can see at a glance which authority claims still need repo-backed packets.

---

## Append-only contract

- Existing rows above MUST NOT be modified once committed.
- Corrections happen by appending new rows that reference the original row's DEC-ID with a `(supersedes DEC-NNN)` note.
- Rows in the "Pending" section move to the "Verified" section ONLY when a packet lands in repo with a real PR + commit SHA.

---

**END decisions.live.md** — schema reference: `docs/architecture/LIVE_LEDGER_SCHEMA_v1.md` §3.2
