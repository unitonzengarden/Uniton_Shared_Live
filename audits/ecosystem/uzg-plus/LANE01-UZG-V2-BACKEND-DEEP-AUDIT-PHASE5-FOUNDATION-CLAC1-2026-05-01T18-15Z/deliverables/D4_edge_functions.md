# D4 — Edge Function Source Inspection

**Date:** 2026-05-02  
**Source:** supabase/functions/ (3 deployed functions)  
**Method:** Direct source read + production endpoint probe  

---

## Function Inventory

| Function | Lines | Auth gate | Key RPC | Idempotency |
|---|---|---|---|---|
| `wallet_convert_u_to_uzg` | 419 | JWT Bearer (auth_required 401) | `rpc_wallet_convert_asset` | Required (`idempotency_key`) |
| `wallet_spend_uzg` | 211 | JWT Bearer (auth_required 401) | `rpc_burn_asset` | Required (`idempotency_key`) |
| `reward_emit` | 1,983 | JWT Bearer (auth_required 401) | Multiple (11 settlement RPCs) | Per action type |

---

## wallet_convert_u_to_uzg (419 lines)

**Endpoint:** `POST /functions/v1/wallet_convert_u_to_uzg`  
**Auth:** Bearer JWT — `getUser()` verification, returns 401 `auth_required` if missing/invalid  

### Request Payload
```json
{
  "from_asset": "U",
  "to_asset": "UZG",
  "amount": 100,
  "idempotency_key": "<uuid>",
  "source": "optional",
  "context": "optional"
}
```

### Policy Constants (hardcoded in source)
| Constant | Value |
|---|---|
| `WALLET_CONVERT_MINIMUM_AMOUNT_IN` | 100 U |
| `WALLET_CONVERT_MAXIMUM_AMOUNT_IN` | 500 U |
| `WALLET_CONVERT_MAXIMUM_DAILY_AMOUNT_IN` | 2,500 U |
| `WALLET_CONVERT_COOLDOWN_SECONDS` | 60 s |
| `WALLET_SETTLEMENT_SCALE` | 2 decimal places |

### Execution Flow
1. Auth gate — JWT verify via `serviceClient.auth.getUser(accessToken)`
2. Validate `from_asset=U`, `to_asset=UZG`, idempotency key presence
3. Read conversion rate from `wallet_conversion_rates` (U→UZG rate: 1/1000)
4. Read asset registry from `wallet_asset_registry`
5. Check existing conversion in `wallet_conversions` by `idempotency_key` (dedup guard)
6. Call `rpc_wallet_convert_asset` with `p_user_id`, `p_from_asset`, `p_to_asset`, `p_amount_in`, `p_idempotency_key`
7. Return `{ success, status, request, ledger: {debit, credit}, policy }`

### Atomicity
- Conversion atomicity delegated to `rpc_wallet_convert_asset` (SQL transaction in Postgres)
- Idempotency key stored in `wallet_conversions` table — prevents double-debit on retry

### Tables Accessed
- `wallet_conversion_rates` (read)
- `wallet_asset_registry` (read)
- `wallet_conversions` (read idempotency check)
- Via RPC: `wallet_ledger`, `wallet_accounts` (atomic write)

---

## wallet_spend_uzg (211 lines)

**Endpoint:** `POST /functions/v1/wallet_spend_uzg`  
**Auth:** Bearer JWT — `getUser()` verification, returns 401 `auth_required` if missing/invalid  

### Request Payload
```json
{
  "spend_type": "booking | ticket",
  "source_id": "<uuid>",
  "source_label": "optional",
  "amount": 50.0,
  "idempotency_key": "<uuid>",
  "route": "optional"
}
```

### Supported Spend Types
`booking`, `ticket` (Set constant `SUPPORTED_SPEND_TYPES`)

### Execution Flow
1. Auth gate — JWT verify
2. Validate `spend_type` is in `SUPPORTED_SPEND_TYPES`, idempotency key presence
3. Call `rpc_burn_asset` with `p_user_id`, `p_asset_code=UZG`, `p_amount`, `p_spend_type`, `p_source_id`, `p_idempotency_key`
4. Return `{ success, status, spend_type, burn: {...}, context: {...}, policy: {...} }`

### Atomicity
- Burn atomicity delegated to `rpc_burn_asset` (SQL transaction)
- Idempotency key prevents double-burn

---

## reward_emit (1,983 lines)

**Endpoint:** `POST /functions/v1/reward_emit`  
**Auth:** Bearer JWT — `getUser()` verification, returns 401 `auth_required` if missing/invalid  

### Request Payload
```json
{
  "action_type": "<action_key>",
  "source_id": "<uuid>",
  "target_user_id": "optional",
  "circle_id": "optional",
  "metadata": {}
}
```

### Supported Action Types (from `REWARD_RULES`)
| Action | Amount | Daily Cap | Cooldown | Settlement Mode |
|---|---|---|---|---|
| `online_active` | 0 U | 1000 | 0 s | online_presence |
| `post_created` | 5 U | 10/day | 60 s | standard |
| `comment_created` | 2 U | 20/day | 30 s | standard |
| `reaction_added` | 1 U | 40/day | 10 s | standard |
| `circle_joined` | 3 U | 12/day | 300 s | standard |
| `user_followed` | 2 U | 20/day | 45 s | standard |
| `daily_checkin` | 10 U | 1/day | 0 s | daily_checkin |
| `lucky_spin` | 5 U | 1/day | 0 s | lucky_spin |
| `chest_loot` | 5 U | 1/day | 0 s | chest_loot |
| `quiz_answer` | 5 U | 1/day | 0 s | quiz_answer |

### Settlement RPCs (called by reward_emit)
- `rpc_prepare_online_reward_distribution` / `rpc_finalize_online_reward_distribution` / `rpc_cancel_online_reward_distribution`
- `rpc_prepare_promotion_u_claim_distribution` / `rpc_finalize_...` / `rpc_cancel_...`
- `rpc_prepare_daily_checkin_distribution` / `rpc_finalize_...` / `rpc_cancel_...`
- `rpc_prepare_lucky_spin` / `rpc_finalize_lucky_spin` / `rpc_cancel_lucky_spin`
- `rpc_prepare_chest_loot` / `rpc_finalize_chest_loot` / `rpc_cancel_chest_loot`
- `rpc_prepare_quiz_answer` / `rpc_finalize_quiz_answer` / `rpc_cancel_quiz_answer`
- `rpc_grant_season_xp`
- `rpc_treasury_distribute_u`

### Settlement Pattern
Prepare → validate → finalize (three-phase commit pattern) with cancel fallback on error.

---

## Production Probe Results (2026-05-02)

| Endpoint | Method | Status | Meaning |
|---|---|---|---|
| `wallet_convert_u_to_uzg` (no JWT) | POST | **401** | Auth gate active ✓ |
| `wallet_spend_uzg` (no JWT) | POST | **401** | Auth gate active ✓ |
| `reward_emit` (not probed) | POST | expected 401 | Not in Sprint 5.4 scope |

All three functions are deployed and reachable at `kkhhpecofolmrodyeslp.supabase.co/functions/v1/`.  
**Note:** `uzg.plus/functions/v1/` returns 405 (Cloudflare proxy does not forward `/functions/v1/` path).

