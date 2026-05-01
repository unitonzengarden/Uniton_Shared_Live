# Report — DRIFT-02 Hot-fix Verify (Sprint 5.4)

**Audit ID:** LANE01-UZG-V3-P5-4-HOTFIX-VERIFY-DRIFT02-ASSET-CODE-2026-05-01T19-00Z  
**Date:** 2026-05-02  
**Executor:** CLAC1 (Lane 01)  
**Outcome:** CLEAN — no hot-fix required  
**Decision branch:** B (hits found, all legitimate against `wallet_transactions`)  

---

## DRIFT-02 Context

Backend Deep Audit D6 DRIFT-02 (HIGH severity):
- Canon claim: `wallet_balances.asset_code`
- Production reality: `wallet_balances` column is **`asset`** (not `asset_code`)

---

## Grep Results

**Scope:** Sprint 5.4 wallet namespace — `wallet-v3/` components, hooks, types, lib  
**Trees checked:** `apps/uzg-pwa/src/` + `src/` (KL-05 dual tree)

| File | Line | Reference | Table targeted |
|---|---|---|---|
| `components/wallet-v3/TransactionRowV3.tsx` | 45 | `tx.asset_code` | `wallet_transactions` (read field from query result) |
| `hooks/useWalletLedger.ts` | 36 | `.select('...asset_code...')` | `wallet_transactions` |
| `hooks/useWalletLedger.ts` | 42 | `.eq('asset_code', ...)` | `wallet_transactions` |
| `types/walletV3.ts` | 39, 60, 64, 65, 115, 116 | TypeScript field definitions | Matches `wallet_transactions` schema |
| `lib/supabaseEdgeFunctions.ts` | 61 | `asset_code: 'UZG'` | Edge Function request payload (not a DB column) |

**Zero hits against `wallet_balances` with `asset_code`.**

---

## Schema Verification

`wallet_balances` schema (from Backend Deep Audit D1):
```
user_id, asset, balance, balance_u, balance_uzg, updated_at
```
→ Column is `asset` (NO `asset_code`) ✅

`wallet_transactions` schema (from Backend Deep Audit D1):
```
..., source_asset_code, target_asset_code, from_asset_code, to_asset_code, asset_code, ...
```
→ Column `asset_code` EXISTS ✅

---

## Critical Path Confirmation

`hooks/useWallet.ts:65` — the hook that reads `wallet_balances`:
```typescript
.from('wallet_balances')
.select('user_id,asset,balance,balance_u,balance_uzg,updated_at')
.eq('user_id', userId)
```
→ Uses `asset` (correct live column). **DRIFT-02 latent bug does NOT exist in Sprint 5.4.**

---

## Decision: Branch B — CLEAN

- All `asset_code` references in Sprint 5.4 code are against `wallet_transactions` (which has an `asset_code` column)
- `useWallet.ts` reads `wallet_balances` correctly using `asset`
- `supabaseEdgeFunctions.ts:61` — `asset_code` in Edge Function payload is contract-correct (verified against D4 source inspection)
- **No code changes required. No PR opened.**

---

## NTS Report

```
DRIFT-02 verify — Sprint 5.4 CLEAN ✓ (wallet_transactions column verified)

Grep results: 5 hits for "asset_code":
  - 3 hits in useWalletLedger.ts + TransactionRowV3.tsx → all against wallet_transactions
  - 2 hits in types/walletV3.ts → interface fields matching wallet_transactions schema
  - 1 hit in supabaseEdgeFunctions.ts → Edge Function payload contract

useWallet.ts (wallet_balances query) already uses correct column: "asset" ✓
Schema confirmed: wallet_transactions.asset_code = real column ✓
DRIFT-02 specific to wallet_balances only — not hit by Sprint 5.4 code.

Sprint 5.4 CORRECT. No hot-fix needed.

Next: Sprint 5.5 ENTA dispatch ready.
```

