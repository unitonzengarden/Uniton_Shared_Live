# D6 — Canon Drift Map

**Date:** 2026-05-02  
**Method:** Live schema (OpenAPI) vs canonical type definitions and code references  
**Drift entries:** 14 (≥10 required)  

---

## Canon Drift Entries

### DRIFT-01: `wallet_currencies.currency_code` vs `.code`
- **Canon assumption:** column named `.code`
- **Live schema:** `currency_code` (string)
- **Impact:** Any hook or migration using `.code` will fail; use `currency_code`
- **Resolution:** Sprint 5.4 hooks updated to use live column name

### DRIFT-02: `wallet_balances.asset` vs `.asset_code`
- **Canon assumption:** column named `asset_code`
- **Live schema:** `asset` (string)
- **Impact:** Supabase JS `.eq('asset_code', ...)` filter will silently miss rows; must use `.eq('asset', ...)`
- **Resolution:** `useWallet.ts` and `useWalletLedger.ts` use `asset` correctly

### DRIFT-03: `wallet_ledger.direction` (not `entry_type` as direction)
- **Canon assumption:** `direction` field = `debit|credit`, separate `entry_type` field
- **Live schema:** Both exist — `direction` (`debit|credit`) AND `entry_type` (`transfer|treasury|mint|burn`)
- **Impact:** Code must use `direction` for sign, `entry_type` for category
- **Resolution:** `TransactionRowV3.tsx` reads `direction` for +/- sign correctly

### DRIFT-04: `memberships.tier` vs `.tier_id`
- **Canon assumption:** `tier` column on `memberships`
- **Live schema:** `tier_id` (FK reference to `member_tiers.id`)
- **Impact:** Any query using `.eq('tier', 'plus')` returns 400 error; must JOIN to `member_tiers`
- **Severity:** High — membership checks will silently fail

### DRIFT-05: `wallet_balances` is a view (not a base table)
- **Canon assumption:** Direct table with mutable balance column
- **Live schema:** View — `{user_id, asset, balance, balance_u, balance_uzg, updated_at}` derived from `wallet_ledger`
- **Impact:** Cannot INSERT/UPDATE `wallet_balances` directly; all balance changes go through ledger writes
- **Resolution:** All wallet hooks read `wallet_balances` as view correctly

### DRIFT-06: `wallet_available_balances` exists alongside `wallet_balances`
- **Canon assumption:** Single `wallet_balances` view
- **Live schema:** Two views — `wallet_balances` (with `balance_u`, `balance_uzg`) and `wallet_available_balances` (simpler: `user_id, asset, balance`)
- **Impact:** Sprint 5.5 should prefer `wallet_assets_unified` for multi-asset portfolio view

### DRIFT-07: `aier_license_tokens` is empty (0 rows)
- **Canon assumption:** License system has minted tokens (aier_license_tokens)
- **Live schema:** Table exists, 0 rows
- **Impact:** Any UI rendering license token lists will show empty; Sprint AIER scope must account for seeding
- **Note:** `aier_license_collections`, `aier_license_owners` may also be empty

### DRIFT-08: `reward_events.action_type` is nullable in sample
- **Canon assumption:** `action_type` always populated
- **Live schema:** Column exists but 200 probed rows all show `action_type=null` (data populated via `event_code` and `event_type` instead)
- **Impact:** Filtering by `action_type` may miss legacy entries; use `event_type` as primary filter

### DRIFT-09: `wallet_currencies` has 3 currencies (not 2)
- **Canon assumption:** U and UZG only
- **Live schema:** USD (USDc), VND (VNDc), UZG — plus `wallet_asset_registry` tracks all asset codes
- **Impact:** wallet_currencies is for fiat hub currencies; U/UZG tracked in `wallet_asset_registry`

### DRIFT-10: `wallet_conversion_rates` has 6 rows (not 1)
- **Canon assumption:** Single U→UZG rate
- **Live schema:** 6 rows including VND_CREDIT→USD_CREDIT, UZG→U (disabled), plus historical rates
- **Impact:** Must filter `is_active=true AND from_asset='U' AND to_asset='UZG'` — do not assume single row

### DRIFT-11: `wallet_accounts` has `financial_subject_id` and `enta_subject_id`
- **Canon assumption:** Simple `{id, user_id, status}` structure
- **Live schema:** 13 columns including `financial_subject_id`, `enta_subject_id`, `wallet_kind`, `wallet_code`, `display_name`
- **Impact:** Sprint 5.5+ multi-wallet support requires these fields; old V1 code only set `user_id`

### DRIFT-12: `circles` count = 3 (not > 10)
- **Canon assumption:** Active community with many circles
- **Live schema:** Only 3 circles exist — likely foundation/system circles only
- **Impact:** Sprint 5.5 community features (circle discovery, join) must handle sparse data state

### DRIFT-13: `reactions` count = 0
- **Canon assumption:** Reaction events accumulate
- **Live schema:** 0 rows in `reactions` table
- **Note:** May use `flow_reactions` instead; separate table for social graph reactions vs engagement reactions

### DRIFT-14: `u_reward_baseline_emissions` not exposed via REST (404)
- **Canon assumption:** Table accessible via service role
- **Live schema:** Returns `PGRST205` — not in REST schema cache; hint suggests `user_missions` instead
- **Impact:** Any Sprint code accessing `u_reward_baseline_emissions` via Supabase JS client will fail; use RPC

---

## Summary

| Severity | Count | Entries |
|---|---|---|
| High | 3 | DRIFT-04, DRIFT-02, DRIFT-14 |
| Medium | 7 | DRIFT-01, DRIFT-03, DRIFT-05, DRIFT-08, DRIFT-10, DRIFT-11, DRIFT-13 |
| Low | 4 | DRIFT-06, DRIFT-07, DRIFT-09, DRIFT-12 |

**Recommendation for Sprints 5.5-5.8:** Always validate column names against D1 (this audit) before writing Supabase JS queries. Do not trust canon documents for column naming — use live OpenAPI schema.

