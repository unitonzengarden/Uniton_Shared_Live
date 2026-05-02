# UZG+ V2 — TAO Backend RPC & RLS (Production Reference) v1

**Audit ID:** `LANE01-UZG-V2-TAO-BACKEND-AUDIT-PHASE5-FOUNDATION-CURSOR-2026-05-01T22-30Z`  
**Date:** 2026-05-02 (UTC)  
**Evidence:** companion folder `evidence/tao_rpc_discovery.txt`, `evidence/tao_rls_dump.txt`  
**Baseline RPC catalog:** CLAC1 Backend Deep Audit #78 — `D3_rpc_catalog.md` (188 RPCs, OpenAPI `/rest/v1/`)

---

## 1. How this audit probed RPCs

PostgREST resolves RPC overloads **by argument list**. Invoking `rpc()` with `{}` returns:

- **`PGRST202` … “without parameters”** — either the function truly does not exist, **or** it exists only with **required parameters** (false negative for zero-arg probe).
- **`42501` / `P0001` “Authenticated user required”** — function **exists** but requires a JWT **user** context (not service role acting as postgres only).

Follow-up: `calc_enta_profile` was re-probed with typed args (`p_year`, `p_month`, `p_day`, `p_hour`, `p_gender`); result **“Authentication required”** — confirms registration in API, not absence.

**Rule for Sprint 5.8:** Use CLAC1 **D3** as the authoritative name list; use auth’d client probes for behavior.

---

## 2. Task candidate RPCs (≥15) — probe summary

(See evidence file for raw lines.)

| Candidate | `{}` probe result | Interpretation |
|---|---|---|
| `rpc_compute_bazi_chart` | NOT_FOUND (`PGRST202`) | No zero-arg overload; **not** advertised as standalone “TAO compute” RPC in OpenAPI-derived catalog. |
| `compute_bazi_chart` | NOT_FOUND | — |
| `bazi_compute` | NOT_FOUND | — |
| `rpc_compute_tuvi_chart` | NOT_FOUND | — |
| `compute_ziwei_chart` | NOT_FOUND | — |
| `tuvi_compute` | NOT_FOUND | — |
| `rpc_compute_phongthuy` | NOT_FOUND | — |
| `phongthuy_compute` | NOT_FOUND | — |
| `rpc_get_lichvannien_today` | NOT_FOUND | — |
| `get_today_calendar` | NOT_FOUND | — |
| `rpc_get_daily_match` | NOT_FOUND | — |
| `compute_daily_match` | NOT_FOUND | — |
| `rpc_unlock_useful_god` | NOT_FOUND | — |
| `rpc_unlock_luck_pillars` | NOT_FOUND | — |
| `rpc_get_compatibility` | NOT_FOUND | — |
| `compute_compatibility` | NOT_FOUND | — |
| `rpc_aier_tao_query` | NOT_FOUND | — |
| `aier_tao_completion` | NOT_FOUND | — |
| `rpc_get_enta_bazi_record` | EXISTS (requires auth user) | **Primary read path for ENTA-integrated Bazi record.** |
| `calc_enta_profile` | EXISTS (requires auth — confirmed with typed args) | Lightweight ENTA astro element profile from birth triple. |
| `rpc_upsert_enta_root_snapshot` | EXISTS (requires auth / session) | Persists rooted chart snapshot incl. `p_bazi_record` JSONB |
| `rpc_update_enta_birth_core` | EXISTS (requires auth user) | Normalization + payload pipeline for ENTA/Tao inputs |
| `execute_sql` | NOT probed safely | Exists in catalog #78 (**requires `{ query }`**) — **blocked for Lane auditors per KL-039** (`execute_sql` gated); `{}` probes are inconclusive / disallowed here. |

**Count:** 22 candidate probes logged (≥15 AC).

---

## 3. TAO-adjacent production RPCs (authoritative excerpt from CLAC1 D3 — ENTA / Astro domain)

These are **live** functions Sprint 5.8 should treat as the **integrated “TAO + ENTA” compute plane** until dedicated `rpc_compute_*` TAO names appear:

| RPC | Purpose (from signature / naming) |
|---|---|
| `calc_enta_profile` | Element / ENTA-facing profile derivation from gregorian pieces |
| `rpc_get_enta_bazi_record` | Fetch canonical ENTA **Bazi** record for caller |
| `rpc_get_enta_birth_normalization` | Birth pipeline normalization artifact |
| `rpc_get_enta_canonical_record` | Composite canonical ENTA read |
| `rpc_update_enta_birth_core` | Upload `p_bazi_payload`, calendars, lunar/solar payloads |
| `rpc_upsert_enta_root_snapshot` | Upsert immutable root snapshot incl. **`p_bazi_record`** JSONB |
| `rpc_compute_enta_state`, `rpc_compute_enta_state_v2` | ENTA recomputation gates |
| `rpc_needs_enta_recompute`, `rpc_recompute_enta_state` | Recompute scheduling |
| `rpc_get_enta_profile`, `rpc_get_enta_snapshots`, `rpc_get_enta_state` | Profile + snapshot reads |

**Ziwei-specific RPC names:** **None** in D3 grouping — Ziwei persistence is **REST on `ziwei_charts`** (direct table R/W under RLS) unless a renamed RPC exists outside OpenAPI introspection.

---

## 4. RPC “source excerpt” notes

Production **does not expose** Postgres `SECURITY DEFINER` source through this audit channel. Sprint 5.8 should:

1. Inspect function bodies in Supabase Dashboard (SQL editor) or migration SQL (`docs/sql/*.sql`, `supabase/sql/*.sql`) for authoritative logic — **read-only**.
2. Use **authenticated** RPC smoke tests mirroring Sprint 5.5 ENTA pattern.

---

## 5. RLS — TAO-named tables (`bazi_*`, `ziwei_*`)

Captured from Backend Audit raw aggregate `rls_policies_raw.txt` (Lane_01 `#78`). Policies are **owner-scoped**:

| Table | Policies | Roles | Rule |
|---|---|---|---|
| `bazi_charts` | `_select_own`, `_insert_own`, `_update_own`, `_delete_own` | `authenticated` | `auth.uid() = user_id` |
| `bazi_audit_log` | `_select_own`, `_insert_own` | `authenticated` | `auth.uid() = user_id` |
| `ziwei_charts` | `_select_own`, `_insert_own`, `_update_own`, `_delete_own` | `authenticated` | `auth.uid() = user_id` |
| `ziwei_audit_log` | `_select_own`, `_insert_own` | `authenticated` | `auth.uid() = user_id` |

**Tier gating:** Policies do **not** encode Free vs Member vs Premium in the WHERE clause — commercial gating stays at **RPC / Edge / app layer** (per Sprint 5.6 membership audit pattern).

### 5.1 `enta_bazi_records` — expected pattern

Not present in truncated `tao_rls_dump` excerpt file; authoritative migration excerpt (read-only Lane_02/ENTA docs in `uzgplus-app`) defines:

```text
enta_bazi_records_select_own ... using (user_id = auth.uid());
grant select on public.enta_bazi_records to authenticated, service_role;
```

Production row count (**77**) with service role confirms persistence; Sprint 5.8 client path must still use **`authenticated`** reads per RLS.

### 5.2 `anon` exposure

Assume **anon cannot read** chart tables unless explicit grants contradict — Sprint 5.8 must verify with Supabase Advisors before any public chart sharing features.

---

**END — UZG_PLUS_V2_TAO_BACKEND_RPC_AND_RLS_v1**
