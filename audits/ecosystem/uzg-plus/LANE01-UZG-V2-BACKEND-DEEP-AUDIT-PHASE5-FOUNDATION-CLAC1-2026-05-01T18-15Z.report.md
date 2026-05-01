# Report — Backend Deep Audit Phase 5 Foundation

**Audit ID:** LANE01-UZG-V2-BACKEND-DEEP-AUDIT-PHASE5-FOUNDATION-CLAC1-2026-05-01T18-15Z  
**Date:** 2026-05-02  
**Purpose:** Provide authoritative ground-truth for Sprints 5.5-5.8 backend integration  

---

## Executive Summary

The UZG+ production Supabase database (`kkhhpecofolmrodyeslp`) has been fully audited at the column level across all 192 tables/views. Key findings: the live schema diverges from canon assumptions in 14 documented ways (D6), 9 integrity invariants are verified live (D5), and the wallet subsystem is sound with 100% completed transactions and active idempotency protection.

The V2 Express server (`server/aier_server.js`) has 75 active endpoints, of which the 3 wallet write endpoints (`/api/v1/wallet/summary`, `/api/v1/wallet/transfers`, `/api/v1/wallet/transfer`) were replaced by Direct Edge Functions in Sprint 5.4. The remaining 72 endpoints remain in active use.

---

## Deliverables Produced

| ID | Deliverable | Key Numbers |
|---|---|---|
| D1 | Schema Deep Dump | 192 tables, all columns from OpenAPI |
| D2 | RLS Policy Synthesis | 161 policies across 49 tables; 143-table gap |
| D3 | RPC Catalog | 188 RPCs, 11 domain groups |
| D4 | Edge Function Inspection | 3 functions, atomicity verified |
| D5 | Integrity Invariants | 9 invariants verified live |
| D6 | Canon Drift Map | 14 drift entries (3 HIGH severity) |
| D7 | V2 Express Dependency Map | 75 endpoints classified by domain |

---

## Sprint 5.5-5.8 Recommendations

### 1. Use D1 as single source of truth for column names
Canon documents are wrong on: `currency_code` (not `.code`), `asset` (not `.asset_code`), `tier_id` (not `.tier`). Always cross-reference D1 before writing Supabase JS queries.

### 2. Handle `wallet_balances` as a view
Sprint 5.5 multi-asset wallet display should read from `wallet_assets_unified` (which includes `wallet_account_id`) rather than the simplified `wallet_balances` view — gives access to multi-wallet data.

### 3. memberships join must go through member_tiers
```sql
SELECT m.*, mt.name as tier_name
FROM memberships m
JOIN member_tiers mt ON m.tier_id = mt.id
```

### 4. RLS gap is acceptable for views
143 tables without policies are primarily views — they inherit base table security. However, 20+ base tables (activation, analytics, admin) have no policies and are accessible via service role only. Verify access control for any new Sprint 5.x tables.

### 5. reward_emit settlement pattern
The three-phase prepare→finalize→cancel pattern is the standard for all reward settlement RPCs. Sprint 5.x code calling reward_emit must handle `status: "already_settled"` idempotency responses.

### 6. AIER license system is uninitialized
`aier_license_tokens` has 0 rows. Sprint AIER scope must include seeding before any UI renders token state.

---

## Method Notes

- `execute_sql` RPC exists but returns HTTP 204 (no content) for arbitrary SQL — blocked at policy level
- OpenAPI spec (`/rest/v1/`) was the primary schema discovery source
- 98 migration files provided RLS and function definitions
- Production probes used SERVICE_ROLE_KEY via REST headers

