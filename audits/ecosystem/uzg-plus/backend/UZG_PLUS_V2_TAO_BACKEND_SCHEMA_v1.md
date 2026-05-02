# UZG+ V2 — TAO Backend Schema (Production Reference) v1

**Audit ID:** `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z`  
**Date:** 2026-05-02 (UTC)  
**Supabase project:** `kkhhpecofolmrodyeslp` (UZG+ production) — host `kkhhpecofolmrodyeslp.supabase.co`  
**Method:** PostgREST `select` + `count=exact` with **service role** (KL-034: live schema is source of truth). OpenAPI definitions from Backend Deep Audit #78 cross-checked for columns.  
**Evidence:** `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z/evidence/tao_table_discovery.txt`

---

## 1. Executive summary

| Category | Tables found in prod | Rows (service-role count) | Interpretation |
|---|---:|---:|---|
| Dedicated Bazi / Ziwei JSONB charts | `bazi_charts`, `bazi_audit_log`, `ziwei_charts`, `ziwei_audit_log` | 3 / 3 / 4 / 9 | **Populated** — persistence layer exists; not empty stubs. |
| ENTA Bazi facet (pillar + `root_payload`) | `enta_bazi_records` | **77** | **Populated** — primary structured Bazi record store for ENTA integration. |
| Canon-candidate “normalized” TAO tables (`bazi_pillars`, `phongthuy_*`, `lichvannien_*`, `aier_tao_*`, `tao_*` aggregate) | 0 / 27 probed | — | **NOT in public PostgREST schema cache** (PGRST205). |
| Row count meaning | — | — | **>0** implies real production usage or seed; **PGRST205** implies no exposed table with that exact name (not “empty”). |

---

## 2. Candidate matrix (all names from task spec + audit extensions)

Task required **≥30** candidate names. This audit probed **35** canonical candidates **plus** `bazi_audit_log`, `ziwei_audit_log`, `enta_bazi_records` (37 lines in evidence).

| Candidate | Prod status | Rows (snapshot) | Notes |
|---|---|---|---|
| `bazi_charts` | **EXISTS** | 3 | JSONB chart store; owner-scoped via RLS (§4). |
| `bazi_pillars` | NOT_FOUND | — | Not exposed in `public` API schema. |
| `bazi_ten_gods` | NOT_FOUND | — | Same. |
| `bazi_useful_god` | NOT_FOUND | — | Same. |
| `bazi_luck_pillars` | NOT_FOUND | — | Same. |
| `bazi_calculations` | NOT_FOUND | — | Same. |
| `bazi_users` | NOT_FOUND | — | Same. |
| `tuvi_charts` | NOT_FOUND | — | Production uses `ziwei_charts` naming, not `tuvi_*`. |
| `ziwei_charts` | **EXISTS** | 4 | JSONB + `cycle_layers`, `interpretive_layer`. |
| `tuvi_palaces` | NOT_FOUND | — | — |
| `ziwei_palaces` | NOT_FOUND | — | Palaces live inside `chart_object` JSONB (see §3). |
| `tuvi_stars` | NOT_FOUND | — | — |
| `tuvi_calculations` | NOT_FOUND | — | — |
| `phongthuy_residences` | NOT_FOUND | — | — |
| `phongthuy_bat_trach` | NOT_FOUND | — | — |
| `phongthuy_cuu_cung` | NOT_FOUND | — | — |
| `phongthuy_compass` | NOT_FOUND | — | — |
| `phongthuy_residence_mapping` | NOT_FOUND | — | — |
| `lichvannien_days` | NOT_FOUND | — | — |
| `vannien_calendar` | NOT_FOUND | — | — |
| `lunar_calendar` | NOT_FOUND | — | — |
| `auspicious_activities` | NOT_FOUND | — | — |
| `cautious_activities` | NOT_FOUND | — | — |
| `aier_tao_threads` | NOT_FOUND | — | — |
| `aier_tao_messages` | NOT_FOUND | — | — |
| `aier_tao_readings` | NOT_FOUND | — | — |
| `tao_charts` | NOT_FOUND | — | — |
| `tao_readings` | NOT_FOUND | — | — |
| `tao_engine_results` | NOT_FOUND | — | — |
| `tao_birth_data` | NOT_FOUND | — | Birth core for ENTA lives under `enta_birth_data` / normalizations (see CLAC1 #78 D1). |
| `user_tao_profiles` | NOT_FOUND | — | — |
| `tao_subscriptions` | NOT_FOUND | — | Premium gating not modeled as dedicated `tao_*` tables in prod. |
| `tao_premium_unlocks` | NOT_FOUND | — | — |
| `bazi_audit_log` | **EXISTS** | 3 | Paired with `bazi_charts`. |
| `ziwei_audit_log` | **EXISTS** | 9 | Paired with `ziwei_charts`. |
| `enta_bazi_records` | **EXISTS** | 77 | Select-only for `authenticated` + `service_role` per migration docs. |

**Found count:** 7 tables. **NOT_FOUND (PGRST205):** 30 candidate names from the task list (plus extensions counted in evidence file).

---

## 3. Found tables — column detail

### 3.1 `bazi_charts`

| Column | Type (OpenAPI) | Nullable | Default / notes |
|---|---|---|---|
| `id` | uuid | NO | PK |
| `user_id` | uuid | NO | Owner key; RLS: `auth.uid() = user_id` |
| `chart_name` | text | YES | |
| `is_primary` | boolean | NO | |
| `birth_datetime_input` | text | NO | |
| `birth_gender` | text | NO | |
| `birth_timezone` | text | YES | |
| `birth_location` | text | YES | |
| `summary` | jsonb | NO | |
| `chart_object` | jsonb | NO | Machine-readable Bazi chart (canon: `bazi_chart_object` versioning in TAO_BAZI_IMPLEMENTATION_SPEC). |
| `algorithm_version` | text | NO | |
| `formula_versions` | jsonb | NO | |
| `computed_at` | timestamptz | NO | |
| `created_at` | timestamptz | NO | |
| `updated_at` | timestamptz | NO | |

**Primary key:** `id`  
**Foreign keys (logical):** `user_id` → auth subject (ENTA / profile ecosystem); see `docs/sql/enta_pack1_5_schema.sql` pattern for related tables.  
**Indexes:** PostgREST OpenAPI snapshot used in #78 does not enumerate secondary indexes; expect btree on `user_id` for RLS workloads — verify with `pg_indexes` if Sprint 5.8 adds hot paths.

### 3.2 `bazi_audit_log`

| Column | Type | Nullable |
|---|---|---|
| `id` | uuid | NO |
| `user_id` | uuid | NO |
| `chart_id` | uuid | NO | FK to `bazi_charts.id` (per OpenAPI fk hint in #78 raw spec) |
| `event_type` | text | NO |
| `algorithm_version` | text | NO |
| `formula_versions` | jsonb | NO |
| `metadata` | jsonb | NO |
| `created_at` | timestamptz | NO |

### 3.3 `ziwei_charts`

| Column | Type | Nullable |
|---|---|---|
| `id` | uuid | NO |
| `user_id` | uuid | NO |
| `chart_name` | text | YES |
| `is_primary` | boolean | NO |
| `birth_datetime_input` | text | NO |
| `birth_gender` | text | NO |
| `birth_timezone` | text | YES |
| `birth_utc_offset` | text | YES | |
| `birth_location` | text | YES |
| `birth_lunar` | jsonb | YES | Lunar payload for Ziwei pipeline |
| `summary` | jsonb | NO |
| `chart_object` | jsonb | NO | 12-palace structure + stars per TAO Ziwei canon |
| `cycle_layers` | jsonb | NO | Đại vận / Tiểu vận / Lưu niên layers |
| `interpretive_layer` | jsonb | NO | |
| `algorithm_version` | text | NO |
| `formula_versions` | jsonb | NO |
| `computed_at` | timestamptz | NO |
| `created_at` | timestamptz | NO |
| `updated_at` | timestamptz | NO |

### 3.4 `ziwei_audit_log`

Same shape as `bazi_audit_log` but references `ziwei_charts`.

### 3.5 `enta_bazi_records`

22 columns; pillar fields (`year_pillar` … `hour_branch`), `certainty_*`, `root_payload` jsonb, `normalization_id` → `enta_birth_normalizations`. See OpenAPI `enta_bazi_records` definition in #78 raw `openapi_spec.json`.

---

## 4. Grouping by TAO sub-module

| Sub-module | Prod tables | Data signal |
|---|---|---|
| **Bazi** | `bazi_charts`, `bazi_audit_log`, `enta_bazi_records` (+ ENTA birth stack) | **FULL storage** for chart JSON + ENTA pillar record; **no** separate `bazi_pillars` table. |
| **Tử Vi (Ziwei)** | `ziwei_charts`, `ziwei_audit_log` | **JSONB-first** (Cách A in TAO_ZIWEI_IMPLEMENTATION_SPEC §12.4.5); normalized palace tables **absent**. |
| **Phong Thủy** | — | **NONE** in candidate set. |
| **Lịch Vạn Niên** | — | **NONE** (no `vannien_*` / `lichvannien_*` tables). |
| **AIER Tao** | — | **NONE** (`aier_tao_*` absent). |

---

## 5. Canon name match

- **`bazi_charts` / `ziwei_charts`:** Align with TAO Ziwei spec **Cách A** (`ziwei_charts` + JSONB). Bazi spec discusses `bazi_chart_object` versioning; production column is `chart_object` + `formula_versions` — naming drift tracked in `UZG_PLUS_V2_TAO_CANON_DRIFT_MAP_v1.md`.
- **`tuvi_*` vs `ziwei_*`:** Production uses **`ziwei_*`** exclusively; canon Vietnamese label “Tử Vi” maps to **`ziwei_charts`** in Supabase.

---

**END — UZG_PLUS_V2_TAO_BACKEND_SCHEMA_v1**
