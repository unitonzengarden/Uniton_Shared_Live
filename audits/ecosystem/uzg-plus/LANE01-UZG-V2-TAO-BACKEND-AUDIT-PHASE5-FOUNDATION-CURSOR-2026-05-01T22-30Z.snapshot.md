# Snapshot — TAO Backend Audit (Phase 5 Foundation · Sprint 5.8 Prep)

**Audit ID:** LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z  
**Date:** 2026-05-02  
**Executor:** Cursor (Lane_01 Dev2)  
**Target Supabase:** `kkhhpecofolmrodyeslp` (UZG+ production) — **READ-ONLY**  
**Repos touched by writes:** **unitonzengarden/Uniton_Shared ONLY**  

---

## AC summary

| Gate | Status |
|---|---|
| D1 Tao schema markdown | ✅ `backend/UZG_PLUS_V2_TAO_BACKEND_SCHEMA_v1.md` |
| D2 RPC + RLS markdown | ✅ `backend/UZG_PLUS_V2_TAO_BACKEND_RPC_AND_RLS_v1.md` |
| D3 Integration strategy | ✅ `backend/UZG_PLUS_V2_TAO_INTEGRATION_STRATEGY_v1.md` |
| D4 Canon drift map | ✅ `backend/UZG_PLUS_V2_TAO_CANON_DRIFT_MAP_v1.md` |
| DOT trio + evidence | ✅ this file + `.report.md` + `.audit_log.md` + `evidence/*` |
| uzgplus-app modifications | ✅ **ZERO** |

---

## Key findings (Executive)

**Lane_02 / TAO engine ship status versus Sprint 5.8 UX surface:** **PARTIAL**

Populated relational/JSON persistence exists for **`bazi_charts`**, **`ziwei_charts`**, **`enta_bazi_records`**.  
Canon-predicted **atomic** Tao tables (**`phongthuy_*`**, **`lichvannien_*`**, **`aier_tao_*`**, **`tao_*` umbrellas**) — **NOT present** on production PostgREST.

Dedicated CRUD-style Tao RPC aliases from the task scout list (**`rpc_compute_bazi_chart`**, …) — **NOT exposed** (`PGRST202` on `{}` probes). Existing integration path is **`rpc_*enta*`** constellation + authenticated JSONB persistence.

---

## Evidence paths (Uniton_Shared)

- `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z/evidence/tao_table_discovery.txt`
- `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z/evidence/tao_rpc_discovery.txt`
- `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z/evidence/tao_rls_dump.txt`
- `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z/evidence/tao_canon_xref.txt`

---

**END snapshot**
