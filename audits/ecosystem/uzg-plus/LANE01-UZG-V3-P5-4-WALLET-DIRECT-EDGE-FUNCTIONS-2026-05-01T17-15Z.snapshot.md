# Snapshot — LANE01-UZG-V3-P5-4-WALLET-DIRECT-EDGE-FUNCTIONS-2026-05-01T17-15Z

**Sprint**: 5.4  
**Task ID**: LANE01-UZG-V3-P5-4-WALLET-DIRECT-EDGE-FUNCTIONS-2026-05-01T17-15Z  
**Pattern**: Direct Edge Functions (DEC-08 §1.4) — NO V2 Express proxy for wallet  
**Date**: 2026-05-02  
**Executor**: CLAC1 (Claude Opus 4.7 / LANE01-Cursor)  
**PR**: unitonzengarden/uzgplus-app#83 (merged sha `af3a26f`)

---

## Files Created

### Types
- `apps/uzg-pwa/src/types/walletV3.ts` (+ `src/` mirror)
  - `WalletBalance`, `WalletCurrency`, `LedgerEntry`, `WalletTransaction`
  - `ConvertPayload`, `ConvertResult`, `EdgeFnError`, `ConvertPolicy`
  - `AssetViewModel`, `UseWalletReturn`, `UseWalletLedgerReturn`, `UseConvertReturn`, `UseWalletRealtimeReturn`

### Edge Function Wrapper (NEW)
- `apps/uzg-pwa/src/lib/supabaseEdgeFunctions.ts` (+ `src/` mirror)
  - `invokWalletConvert(payload)` → `wallet_convert_u_to_uzg`
  - `invokeWalletSpend(payload)` → `wallet_spend_uzg` (scaffolded for future)

### Hooks (4)
- `useWallet.ts` — wallet_balances + wallet_currencies via Supabase JS, state machine INITIAL→LOADING→LOADED|EMPTY|ERROR
- `useWalletLedger.ts` — wallet_transactions paginated (PAGE_SIZE=30), optional assetCode filter
- `useConvert.ts` — Edge Function convert flow, idempotency key fresh per open() call
- `useWalletRealtime.ts` — Realtime postgres_changes on wallet_ledger INSERT → triggers reload

### Components wallet-v3/ (12)
| Component | Description |
|---|---|
| `WalletShellV3` | Top-level shell: state machine router (skeleton/error/empty/overview) |
| `WalletOverviewV3` | Header + "Chuyển đổi" CTA + asset list |
| `AssetCardV3` | Balance row with color dot, ticker, formatted balance, chevron |
| `AssetDetailV3` | Asset deep-dive: balance card + ledger list + convert CTA |
| `TransactionListV3` | Scrollable ledger with "Xem thêm" pagination |
| `TransactionRowV3` | Tx row: type label, date, signed amount, status badge |
| `WalletSkeletonV3` | 4-row pulse skeleton |
| `WalletEmptyStateV3` | Empty wallet state |
| `WalletErrorStateV3` | Error + retry CTA |
| `ConvertOverlayV3` | Bottom sheet: input → confirm → submitting → success/error |
| `ConvertConfirmV3` | Confirm details sub-component |
| `ConvertSuccessV3` | Success receipt sub-component |

### Pages wired
- `V3WalletPage.jsx` → `WalletShellV3` (replaces mock `WalletOverview`)
- `V3AssetDetailPage.jsx` → `AssetDetailV3` (replaces mock `AssetDetail`)
- `V3ConvertPage.jsx` → `ConvertOverlayV3` + `useConvert` (replaces mock `ConvertPanel`)

### Tests
- `tests/visual/p5-4-wallet.spec.mjs` — 6 local preview tests (BASE=localhost:4173)
- `tests/visual/p5-4-wallet-prod.spec.mjs` — 6 production tests (BASE=uzg.plus)

---

## Schema Discovery (live 2026-05-02)

### Tables confirmed (HTTP 200)
| Table | Key Columns |
|---|---|
| `wallet_balances` | `user_id, asset, balance, balance_u, balance_uzg, updated_at` |
| `wallet_currencies` | `currency_code` (CANON_DRIFT), `full_name, ticker, precision, is_convertible` |
| `wallet_ledger` | `direction (debit/credit), asset_code, amount, entry_type, created_at` |
| `wallet_transactions` | `tx_type, status, asset_code, amount, amount_in, amount_out, created_at` |
| `wallet_accounts` | `user_id, status, wallet_kind` |

### Edge Functions
| Function | Method | Auth | Status |
|---|---|---|---|
| `wallet_convert_u_to_uzg` | POST | JWT Bearer | 401 unauthed (reachable) |
| `wallet_spend_uzg` | POST | JWT Bearer | 401 unauthed (reachable) |

### Conversion Rate (live)
- `wallet_conversion_rates`: rate_numerator=1, rate_denominator=1000
- Effective rate: **1 U = 0.001 UZG** (1/1000)
- Minimum: 100 U, Maximum: 500 U per conversion
- Daily cap: 2500 U, Cooldown: 60 seconds

---

## KL-05 Dual-Tree Sync
- 34 files synced byte-identical: `apps/uzg-pwa/src/` ↔ `src/`
- Verified: `diff` 0 on types/walletV3.ts and lib/supabaseEdgeFunctions.ts

## Build Summary
- 0 TypeScript errors
- V3 bundle: **741.54 KB** (unchanged from Sprint 5.3 — wallet components are small)
- Build time: 4.11s (vite build:v3)
