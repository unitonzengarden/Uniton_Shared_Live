# Snapshot — Backend Deep Audit Phase 5 Foundation

**Audit ID:** LANE01-UZG-V2-BACKEND-DEEP-AUDIT-PHASE5-FOUNDATION-CLAC1-2026-05-01T18-15Z  
**Date:** 2026-05-02  
**Auditor:** CLAC1 (Lane 01)  
**Target:** uzg.plus / Supabase project `kkhhpecofolmrodyeslp`  
**Status:** COMPLETE  

---

## What Was Audited

| Layer | Scope | Method |
|---|---|---|
| Database schema | 192 tables/views, all columns | OpenAPI /rest/v1/ (1.13 MB spec) |
| RLS policies | 161 CREATE POLICY statements | supabase/migrations/ (98 files) |
| RPC catalog | 188 functions | OpenAPI /rpc/ paths |
| Edge Functions | 3 deployed functions (2,613 total lines) | Source inspection + prod probe |
| Integrity invariants | 9 verified live | REST probes via SERVICE_ROLE_KEY |
| Canon drift | 14 drift entries identified | Live schema vs code assumptions |
| V2 Express endpoints | 75 endpoints classified | server/aier_server.js grep |

## Key Numbers

- **Tables discovered:** 192 (incl. views)
- **RLS policies:** 161 across 49 tables; **143 tables with no RLS** (mostly views/admin tables)
- **RPCs:** 188 — see D3 for domain breakdown
- **Edge Functions:** 3 deployed — `wallet_convert_u_to_uzg` (419L), `wallet_spend_uzg` (211L), `reward_emit` (1983L)
- **V2 Express:** 75 endpoints — 25 user API, 20 admin/UZGFi, 18 AIER, 12 other

## Critical Findings

1. **DRIFT-04 (HIGH):** `memberships.tier` column does not exist — live column is `tier_id` (FK)
2. **DRIFT-02 (HIGH):** `wallet_balances.asset_code` does not exist — live column is `asset`
3. **DRIFT-14 (HIGH):** `u_reward_baseline_emissions` not exposed via REST — access via RPC only
4. **INV-04:** Wallet balances are view-derived — no direct balance mutations
5. **INV-03:** 100% of wallet_transactions are `status=completed` (no stuck/pending)
6. **Gap:** 143/192 tables/views have no RLS policies — most are views or system tables, but 20+ base tables lack explicit policies

## Production State (2026-05-02)

- 441 registered users, 294 wallets activated (66.7%)
- 2,374 ledger entries, 190 completed transactions
- 1,942 reward events
- 0 AIER license tokens minted
- 3 circles (foundation only)

