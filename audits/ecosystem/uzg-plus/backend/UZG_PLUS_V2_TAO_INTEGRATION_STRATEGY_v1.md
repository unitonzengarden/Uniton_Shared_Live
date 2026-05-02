# UZG+ V2 — TAO Integration Strategy (Sprint 5.8) v1 — **PRIMARY DELIVERABLE**

**Audit ID:** `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z`  
**Date:** 2026-05-02 (UTC)

---

## 1. Decision matrix (from audit evidence)

| Scenario | Detection signals | Sprint 5.8 strategy |
|---|---|---|
| **FULL Lane_02 ship** | TAO tables **with rows** **and** callable compute RPC surface for module | Direct **RPC + RLS** (+ optional REST), retire mocks for wired surfaces |
| **PARTIAL ship** | Some tables/APIs exist; others absent; or **JSONB-first** replaces normalized canon | **Hybrid:** wire what exists (`bazi_charts`, `ziwei_charts`, ENTA RPCs), **keep mock** where schema missing |
| **NONE** | PGRST205 / consistent NOT_FOUND for module | Pure **mock** + tag **`TAO_BACKEND_LANE02_DEFERRED`** |

---

## 2. Discovery snapshot (production)

**Lane_02 / TAO engine global verdict:** **PARTIAL**

| Signal | Observation |
|---|---|
| `bazi_charts` | **Exists**, **3** rows (`chart_object` JSONB populated pattern) |
| `ziwei_charts` | **Exists**, **4** rows |
| `enta_bazi_records` | **Exists**, **77** rows |
| Dedicated Phong Thủy / Vạn Niên / `aier_tao_*` / generic `tao_*` tables | **NOT exposed** |
| Dedicated `rpc_compute_bazi_chart` / ziwei / phong / vannien names | **Not found** via PostgREST `{}` probes; **compute** concentrates in **ENTA / Astro RPC family** |

---

## 3. Recommendation per sub-module (5 / 5)

### 3.1 Bazi — **HYBRID (Direct data + ENTA RPC plane + Phase 4 mock fallback)**

**Status:** **PARTIAL→strong** storage exists; standalone “TAO” compute RPC naming **not** found.

**Wiring:**

1. **Reads (authenticated Supabase client):**
   - `bazi_charts` — chart JSON (`chart_object`, `summary`, versioning columns).
   - `enta_bazi_records` — pillar + `root_payload` + certainty (ENTA-aligned).
2. **Writes / recomputation:** ENTA orchestration RPCs (`rpc_update_enta_birth_core`, `rpc_upsert_enta_root_snapshot`, `rpc_recompute_enta_state` family) — same pattern as **Sprint 5.5 ENTA**.
3. **Fallback:** Until UI mapping is complete, **`apps/uzg-pwa/src/data/v3-mock-tao.ts`** (`MOCK_BAZI_CHART_HOA_USER`) and **`v3-mock-bazi-premium.ts`** (`MOCK_LUCK_PILLARS_HOA_USER`) stay as **tier preview + offline UX**.

**Concrete tables:** `bazi_charts`, `bazi_audit_log`, `enta_bazi_records` (+ ENTA birth stack per #78).

**Concrete RPCs:** `rpc_get_enta_bazi_record`, `calc_enta_profile`, `rpc_update_enta_birth_core`, `rpc_upsert_enta_root_snapshot`, `rpc_compute_enta_state*`, `rpc_recompute_enta_state`.

---

### 3.2 Tử Vi (Ziwei) — **HYBRID (Direct REST on `ziwei_charts` + mock)**

**Status:** **PARTIAL** — **table + rows** ✓ ; **normalized** palace/star tables ✗ ; **Ziwei RPC** ✗.

**Wiring:**

1. **Primary backend:** `.from('ziwei_charts').select(...)` filtered by user + `is_primary`.
2. **Chart construction:** Persist engine output into `chart_object`, `cycle_layers`, `interpretive_layer`.
3. **Fallback / demo:** **`apps/uzg-pwa/src/data/v3-mock-ziwei.ts`**, **`TaoMiniAppShell.tsx`** LocalStorage UX.

**Concrete tables:** `ziwei_charts`, `ziwei_audit_log`.

---

### 3.3 Phong Thủy — **MOCK**

**Status:** **NONE** — zero `phongthuy_*` tables in production PostgREST.

**Wiring:** Keep **`v3-mock-phong-thuy.ts`**, **`residence`** mocks; introduce **adapter interface** `{ loadProfile(), saveProfile() }` returning mock until Phase 6.

**Flag:** **`TAO_BACKEND_LANE02_DEFERRED`** for Phong Thủy schema + RPC.

---

### 3.4 Lịch Vạn Niên — **MOCK**

**Status:** **NONE** — no `lichvannien_*`, `vannien_calendar`, or activity tables exposed.

**Wiring:** **`v3-mock-tao.ts`** (`MOCK_TODAY_LICH_VAN_NIEN`) + deterministic client library when ready (TAO_VANNIEN_DATA_API recommends static JSON packs — CI-friendly).

**Flag:** **`TAO_BACKEND_LANE02_DEFERRED`** for authoritative daily rows + RPC caching layer.

---

### 3.5 AIER Tao — **HYBRID (app-layer + mocks; no `aier_tao_*` DB)**

**Status:** **NONE** — no `aier_tao_threads|messages|readings`.

**Wiring:** Continue orchestration via existing AI surfaces (Unified AI Storage / Wisdom / Tier gates per Phase 4) — exact path is **out of backend audit scope** but **must not assume** persistent `aier_tao_*` tables yet.

**Mock layer:** **`v3-mock-aier-tao.ts`**, **`AierTaoChatSurface`**.

---

## 4. Sprint 5.8 implementation checklist (actionable)

1. **Define `taoDataSource` façade** (`'live'|'mock'|'hybrid'`) per sub-module above.
2. **Bazi/Ziwei live path:** JWT-authenticated Supabase only — mirrors ENTA (**KL-035** naming pattern analogy).
3. **Do not delete mocks** until Phong/Vannien backend exists + integration tests Green.
4. **Document divergence:** canon normalized table names (**Cách B** in Ziwei spec) are **not** in prod — drift file §D4 references.

---

## 5. Explicit non-goals (from task §4)

- No production DDL/DML (`INSERT`/`UPDATE`/`DELETE`).
- No algorithm correctness sign-off for Lane_02 engines.

---

**END — UZG_PLUS_V2_TAO_INTEGRATION_STRATEGY_v1**
