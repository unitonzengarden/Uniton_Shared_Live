# NEXT ACTIONS

**Refresh-allowed.** Last updated: 2026-04-29 (LANE01-LIVE-LEDGER-FOUNDATION snapshot).

Schema reference: [`docs/architecture/LIVE_LEDGER_SCHEMA_v1.md`](../docs/architecture/LIVE_LEDGER_SCHEMA_v1.md) §4.4.

---

## Immediate (in flight or up next)

| # | Action | Executor | Dependencies | ETA |
|---|---|---|---|---|
| 1 | This task — `LANE01-LIVE-LEDGER-FOUNDATION` (Option B structural extension) | CLAC-1 | trigger fix landed (PR #15) | 2026-04-29 today |
| 2 | `LANE01-LIVE-LEDGER-EMIT-AUTOMATION` — auto-emit hooks in workflows | CLAC-1 (or Lane_03) | Foundation merged (this task) | next dispatch |

---

## Short-horizon (this week / Tuần 2 ramp-up)

| # | Action | Executor | Dependencies | Notes |
|---|---|---|---|---|
| 3 | Promote `AMD_NTS_FULL_TECH_AUTONOMY` to repo-backed AMD packet | Lane_03 or Lane_01 | NTS approval | Closes BLK-002 |
| 4 | Promote `LAW-NTS-LLM-11` + `LAW-NTS-LLM-12` to numbered LAWs (e.g., LAW_N15 / LAW_N16) OR formalize as dispatch-template-only | Lane_03 | NTS decision on scope | Closes BLK-003 |
| 5 | Tuần 2 brain L2 — Build `aier_code_episodic_events` ingest pipeline | CLAC-1 + Cursor split | LIVE LEDGER EMIT (#2 above) preferred so commit/heartbeat/handoff streams are addressable | next priority after Live Ledger |
| 6 | Tuần 2 brain L3 — Seed `aier_code_semantic_facts` (NTS-gated INSERT) | CLAC-1 | NTS_DECISION packet authorizing initial fact set | small task |
| 7 | Tuần 2 brain L4 — Tag 410 L1 chunks with R-* / LAW_N* / skill codes + priority | CLAC-1 | L1 LIVE (already done) | medium task |

---

## Medium-horizon (after Tuần 2 brain layers + UI deploy track)

| # | Action | Notes |
|---|---|---|
| 8 | UI deploy track (Cursor) — `LANE01-UI-FIX-P1` → `-PRECHECK` → `-PREVIEW` → `-PROD` | Per CLA's UI audit path; orthogonal to brain track |
| 9 | UTF-8 cleanup on `docs/LAW_CLA_LLM/CANON/05_AIER_CODE_INVARIANTS.md` (BLK-P2-001) | Tiny one-shot |
| 10 | Workflow name integrity lint (BLK-P2-002) | Tiny one-shot |
| 11 | Bridge wire protocol (`LANE01-BRIDGE-04-WIRE-PROTOCOL`) — HTTP transport + auth contract | Phase 2 scope per BLOCH spec §11 |
| 12 | Phase 2 — L0 Interface (classifier + parallel fanout + budget enforcer + assembler) | DEFERRED per Q3 NTS approval A |

---

## Recently completed (last 24h)

| Task | Outcome | Reference |
|---|---|---|
| `LANE01-LIVE-LEDGER-AUDIT-V1` | Audit done; Option B recommended; 3 critical gaps surfaced | [PR #14](https://github.com/unitonzengarden/Uniton_Shared/pull/14) |
| `LANE01-LIVE-LEDGER-TRIGGER-FIX` | Sync chain self-healing via `workflow_run`; E2E verified | [PR #15](https://github.com/unitonzengarden/Uniton_Shared/pull/15) |
| `LANE01-CANON-V1-1-LAW-N14` | Canon V1.1 + LAW_N14 prose landed | [PR #12](https://github.com/unitonzengarden/Uniton_Shared/pull/12) |
| `LANE01-BLOCH-SPEC-V1-CITATION-CLEANUP` | "pending" markers narrowed to in-repo paths | [PR #13](https://github.com/unitonzengarden/Uniton_Shared/pull/13) |
| `LANE01-BRIDGE-04-FIRST-BLOCH-PROOF` (Cursor) | First end-to-end BLOCH; Tuần 1 = 8/8 done | Uniton_OS PR #12 |

---

**END NEXT_ACTIONS.live.md**
