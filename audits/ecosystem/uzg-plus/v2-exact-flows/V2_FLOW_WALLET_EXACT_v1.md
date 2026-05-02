# V2 WALLET Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES
**Module:** 4 of 8

---

## §1 Module status V2

**LIVE.** V2 has wallet (balance + transfer + deposits + withdrawals + convert via Edge Function).

---

## §2 Frontend components V2

| File | Role |
|---|---|
| `apps/uzg-pwa/src/pages/WalletPage.jsx` | Main wallet page |
| `apps/uzg-pwa/src/pages/UConvertPage.jsx` | U → UZG convert flow |
| `apps/uzg-pwa/src/pages/UConvertHistoryPage.jsx` | Convert history |

---

## §3 Backend endpoints V2

### V2 Express endpoints (aier_server.js)

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/api/v1/wallet/summary` | GET | requireUserAuth | Wallet summary (proxied to canonical) |
| `/api/v1/wallet/transfers` | GET | requireUserAuth | Transfer history baseline |
| `/api/v1/wallet/transfer` | POST | requireUserAuth | Initiate transfer (asset, amount, to_wallet_id, idempotency_key) |
| `/api/v1/credit/profile` | GET | requireUserAuth | Credit profile + risk flags |
| `/api/v1/deposits` | GET | requireUserAuth | List deposit history |
| `/api/v1/deposits/address` | POST | requireUserAuth | Get/create deposit address |
| `/api/v1/withdrawals` | GET | requireUserAuth | List withdrawals |
| `/api/v1/withdrawals/request` | POST | requireUserAuth | Request withdrawal |

### Direct Supabase Edge Functions (Sprint 5.4 verified)

| Function | Purpose |
|---|---|
| `wallet_convert_u_to_uzg` | U → UZG conversion (idempotent, atomic) |
| `wallet_spend_uzg` | UZG burn for booking/ticket |

### Direct Supabase tables (Sprint 5.4 verified)

| Table | Use |
|---|---|
| `wallet_balances` (view) | Balance read (`asset` not `asset_code`!) |
| `wallet_transactions` | Transaction history |
| `wallet_ledger` | Ledger entries (entry_type debit/credit) |
| `wallet_currencies` | Asset registry (USDc, VNDc, UZG) |
| `wallet_conversion_rates` | U→UZG rate (1 U = 0.001 UZG) |

---

## §4 Asset codes V2 dùng

Per Sprint 5.4 D1 verification: **USD (USDc), VND (VNDc), UZG**, plus internal U asset code via `wallet_asset_registry`.

---

## §5 RPCs consumed

- `rpc_wallet_convert_asset` (called by Edge Function `wallet_convert_u_to_uzg`)
- `rpc_burn_asset` (called by Edge Function `wallet_spend_uzg`)
- (Direct frontend may call via Supabase JS for non-mutation reads)

---

## §6 Realtime channels

V2 wallet may subscribe to:
- `public:wallet_ledger` filter `user_id=eq.<uid>` for live balance updates
- (Sprint 5.4 documented this)

---

## §7 Edge cases V2 handles

| Edge case | Behavior |
|---|---|
| Missing asset_code | 400 MISSING_TRANSFER_ASSET |
| Idempotency | `idempotency_key` field on transfer + convert |
| Daily cap | Convert: max 500 U/tx, 2500 U/day, 60s cooldown |
| RLS on wallet_balances | View enforces user_id=auth.uid() |

---

## §8 V3 Sprint 5.4 wiring assessment

**Sprint 5.4 implementation:** Direct Edge Function pattern (DEC-08 §1.4).

| Item | V2 EXACT | Sprint 5.4 V3 | Match |
|---|---|---|---|
| Convert via | Edge Function `wallet_convert_u_to_uzg` | Same | ✅ |
| Spend (burn) | Edge Function `wallet_spend_uzg` | Same | ✅ |
| Balance read | `wallet_balances` view | Same | ✅ |
| Asset column | `asset` (verified DRIFT-02) | Same | ✅ |
| TX history | `wallet_transactions` | Same | ✅ |
| Idempotency | UUID v4 per request | Same | ✅ |
| Conversion rate | 1 U = 0.001 UZG | Same | ✅ |
| Min/max limits | 100 U min, 500 U max | Same | ✅ |
| Send/Receive routes | V3 has `/v3/wallet/send`, `/v3/wallet/receive` | V2 has `/api/v1/wallet/transfer` POST | ⚠️ V3 routes don't wire to V2 endpoint |
| Buy UZG flow | (V2 has `/api/v1/deposits/address`) | NOT YET WIRED V3 | ❌ Missing |
| Add Funds | (V2 deposit flow) | NOT YET WIRED V3 | ❌ Missing |

**Match score: ~75% — core convert/balance correct, send/receive/buy not yet wired**

---

## §9 V3 Sprint 5.11 fix recommendations

**Priority 2 (after Auth):**
- Wire `/v3/wallet/send` to `POST /api/v1/wallet/transfer` (V2 Express)
- Wire `/v3/wallet/receive` to display `/api/v1/deposits/address` data
- Wire `/v3/wallet/buy` (if exists) to deposit flow

**ETA:** ~30-40 min

**Status: MEDIUM PRIORITY** — Sprint 5.4 convert flow correct, send/receive ship Sprint 5.11.

---

## §10 Code references

- `aier_server.js:18479-18512` — wallet/summary
- `aier_server.js:18515-18552` — wallet/transfers
- `aier_server.js:18554-18620` — wallet/transfer (mutation)
- `aier_server.js:18277+` — deposits/withdrawals
- Backend Audit D4 — Edge Function inspection
- Sprint 5.4 audit — Direct Edge Function pattern
