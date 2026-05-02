# LANE01-INH-CODE-03-BRAIN-BLUEPRINT — REPORT

**Task ID:** `LANE01-INH-CODE-03-BRAIN-BLUEPRINT`
**Executor:** CLAC-1
**Lane:** Lane_01 (CTO scope; design doc = tech non-canon under `AMD_LANE01_CTO_AUTO_APPROVE_TECH_NON_CANON §3.1`)
**Status:** ✅ PASS — awaiting NTS review
**Date:** 2026-04-29
**Branch:** `design/LANE01-INH-CODE-03-brain-blueprint`
**HEAD pre-flight:** `58965ff84ef6f5ea46d22c4c31cceeb798875c20`

---

## RESULT

**PASS.** Blueprint authored at [`docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md`](../docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md). 11 sections complete (10 required + 1 references), 4 NTS decision questions explicit. Ready for NTS review + Task 4 dispatch.

The blueprint document IS the real content of this task — this `_REPORT.md` exists to comply with BOOT §26 (3 mandatory deliverables) and provides a brief pointer + acceptance summary.

---

## DELIVERABLES

| Artifact | Path |
|---|---|
| **Main blueprint** (the real content) | [`docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md`](../docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md) |
| **Snapshot** (DOT format) | [`snapshots/LANE01-INH-CODE-03-BRAIN-BLUEPRINT.snapshot.live.json`](../snapshots/LANE01-INH-CODE-03-BRAIN-BLUEPRINT.snapshot.live.json) |
| **Report** (this file) | reports/LANE01-INH-CODE-03-BRAIN-BLUEPRINT_REPORT.md |
| **Audit log** | [`audit_logs/LANE01-INH-CODE-03-BRAIN-BLUEPRINT_audit.log`](../audit_logs/LANE01-INH-CODE-03-BRAIN-BLUEPRINT_audit.log) |

---

## BLUEPRINT SECTION SUMMARY

1. **INTENT + INHERITANCE** — VN summary, inheritance citations (Whitepaper V3 + Audit V1 + AIER Ops + Blueprint v2 + Memory Spec V1 + Canon Amendment + Day 1 audit + Task 1 + Task 2), NTS Q1 verbatim quote, V0 repo-memory ↔ V1+ DB-brain reconciliation.
2. **4-LAYER OVERVIEW** — L1 Knowledge (RAG) / L2 Episodic / L3 Semantic / L4 Procedural / L0 Interface (deferred Phase 2). Maps to Whitepaper V3 §6.2 5-layer cognitive model.
3. **AIER CODE SPECIFIC CONTENT** — per-layer table of what AIER Code stores: 290-chunk corpus (L1) / 9 event_types (L2) / NTS+project+ecosystem facts (L3) / R-* + LAW_N* + skills tags (L4) / classifier+fanout+budget+assembler (L0).
4. **STORAGE DECISION** — NTS Q1 verbatim share-DB; 4 new tables + 2 existing UDNA/lineage; 5 alternatives rejected; rationale (1 backup / 1 ACL / cost-effective / namespace sovereignty).
5. **READ/WRITE PATHS** — Mgmt API (write) / REST + pgvector (read) / Lane broker JWT (auth) / RLS per layer.
6. **ASCII DIAGRAM** — visualizes L0 / L1-L4 / UDNA + heartbeat alongside V0 repo memory.
7. **QUERY EXAMPLES** — 4 worked examples covering L4 (R-NTS-01 lookup) / L2 (Lane_02 last handoff) / L3 (NTS comm style) / L1 (UDNA structure RAG with pgvector cosine).
8. **MIGRATION PLAN** — `0033_aier_code_brain.sql` SQL DDL preview; build order (Tuần 1 L1 only / Tuần 2 L2 / Tuần 2-3 L3 / Tuần 3 L4); Phase 1 vs Phase 2 split.
9. **NON-GOALS** — 10 explicit deferrals (L0 build / full RAG pipeline / cross-AIER / Web UI / AIER Ops migrations / V0 replacement / LLM auto-extract to L3 / separate Decision layer / Identity row / pre-genesis backfill).
10. **NTS DECISION POINTS** — 4 questions (table prefix / build order / L0 defer / Decision-as-L2-or-L5).
11. **REFERENCES** — full table of cited canon + Task 1/2 deliverables + Day 1 audit.

---

## ACCEPTANCE CRITERIA (12/12 PASS)

| AC | Description | Status |
|---|---|---|
| AC1 | Blueprint file created at `docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md` | ✅ |
| AC2 | All 10 required sections present (+1 references bonus) | ✅ |
| AC3 | NTS Q1 decision quoted verbatim ("AIER chung 1 database trên Supabase") | ✅ |
| AC4 | Storage decision: 4 new tables + 2 existing listed; 5 alternatives rejected with reasons | ✅ |
| AC5 | ASCII diagram present (Section 6) | ✅ |
| AC6 | Read/write paths cover Mgmt API + REST + auth (Section 5) | ✅ |
| AC7 | 4 query examples covering L1, L2, L3, L4 (Section 7) | ✅ |
| AC8 | Migration plan preview with SQL DDL (Section 8) | ✅ |
| AC9 | 4 NTS decision questions explicit (Section 10) | ✅ |
| AC10 | DOT format snapshot filename (`.snapshot.live.json`) | ✅ |
| AC11 | 3 mandatory deliverables present (snapshot + report + audit log) | ✅ |
| AC12 | Inheritance citations correct (Whitepaper V3 + Audit V1 + AIER Ops spec) | ✅ |

---

## BOUNDARY COMPLIANCE (8/8 PASS)

- [x] LANE01- DOT format prefix on 3 deliverables
- [x] Blueprint in `docs/architecture/` (new path created)
- [x] No code or migration changes (design doc only)
- [x] No Cursor territory touched (Uniton_OS untouched)
- [x] No Lane_03 territory touched
- [x] Cite Whitepaper V3 + Audit V1 + AIER Ops spec verbatim
- [x] 4 NTS decision questions explicit
- [x] Sovereignty preserved (namespace-based; aier_code_* prefix)

---

## NTS DECISION QUESTIONS (Section 10 of blueprint)

NTS, please answer before CLA dispatches Task 4:

| # | Question | Recommended | Alternatives |
|---|---|---|---|
| Q1 | Table prefix `aier_code_*` OK? | A — OK as proposed | B Postgres schema / C other prefix |
| Q2 | Build order Tuần 1 = L1 only OK? | A — L1 only | B L1+L2 parallel / C all 4 aggressive |
| Q3 | L0 Interface defer Phase 2 OK? | A — defer | B minimal Phase 1 / C full Phase 1 |
| Q4 | Decision Memory fold into L2 or separate L5? | A — fold into L2 | B separate L5 / C defer Phase 2 |

---

## NEXT STEP

1. **NTS reads** [`docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md`](../docs/architecture/BRAIN_BLUEPRINT_AIER_CODE.md) (~30 phút)
2. **NTS answers** Q1-Q4 in Section 10 (or via NTS_DECISION packet)
3. **CLA receives approval** → dispatches **Task 4 = LANE01-INH-CODE-04-BUILD-L1-INGEST** to CLAC-1
4. Task 4 scope: apply migration `0033_aier_code_brain.sql`, ingest 290 chunks via Day 1 audit plan, smoke-test pgvector retrieval, ship 3 mandatory deliverables

This task DOES NOT block:
- Cursor's audit (Lane_03 Bridge work) — different repo
- Cursor's other Uniton_OS tasks

This task BLOCKS:
- Task 4 (Build L1) — needs blueprint approved
- Future Tuần 2 brain tasks (L2, L3, L4)

---

**END LANE01-INH-CODE-03-BRAIN-BLUEPRINT_REPORT.md**
