# V2 U-Reward Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES
**Module:** 7 of 8

---

## §1 Module status V2

**LIVE.** V2 has U-Reward module with reward_emit Edge Function (12 actionTypes per Sprint 5.7 D4 audit).

---

## §2 Frontend components V2

| File | Role |
|---|---|
| `apps/uzg-pwa/src/pages/URewardPage.jsx` | U-Reward primary page |
| `apps/uzg-pwa/src/pages/EarnPage.jsx` | Earn dashboard (rewards events + membership status) |
| `apps/uzg-pwa/src/pages/UEarningsPage.jsx` | Earnings detail history |
| `apps/uzg-pwa/src/components/earn/ConnectToEarnDashboard.jsx` | Connect-to-earn dashboard |
| `apps/uzg-pwa/src/services/rewardOwnerService.js` | reward_emit invocation client |

---

## §3 Backend endpoints V2

### V2 Express endpoints

**NONE for users** — V2 has NO user-facing `/api/v1/reward/*` endpoints. Sprint 5.7 D7 confirmed.

Only admin endpoint:
- `/api/v1/admin/uzgfi/rewards` GET (admin scope only)

### Direct Supabase Edge Function (PRIMARY mutation path)

**`reward_emit`** (1983 lines, Sprint 5.7 D4 audit)

**Invocation pattern (rewardOwnerService.js:227):**
```js
const result = await supabase.functions.invoke('reward_emit', {
  body: normalized.payload,
  headers: { authorization: `Bearer ${liveSession.access_token}` },
})
```

**12 actionTypes (REWARD_RULES from Edge Function source):**

| Action | Amount | Daily Cap | Cooldown |
|---|---|---|---|
| `online_active` | 0 U | 1000/day | 0s |
| `post_created` | 5 U | 10/day | 60s |
| `comment_created` | 2 U | 20/day | 30s |
| `reaction_added` | 1 U | 40/day | 10s |
| `circle_joined` | 3 U | 12/day | 300s |
| `user_followed` | 2 U | 20/day | 45s |
| `daily_checkin` | 10 U | 1/day | 0s |
| `mission_daily` | 5 U | 5/day | 0s |
| `promotion_claim` | variable | 1/day | 0s |
| `lucky_spin` | 5 U | 1/day | 0s |
| `chest_loot` | 5 U | 1/day | 0s |
| `quiz_answer` | 5 U | 5/day | 0s |

### Direct Supabase tables (Sprint 5.7 verified)

| Table | Use |
|---|---|
| `wallet_balances` (view) | U balance (asset='U') |
| `reward_events` (36 cols) | Recent earnings list |
| `daily_missions` (14 cols) | Task module daily list |
| `missions` (14 cols) | Mission catalog |
| `user_missions` (13 cols) | User progress |
| `promotion_u_campaigns` (21 cols) | Active campaigns |
| `u_emission_daily` | Daily emission stats |
| `u_reward_settled_history_view` (18 cols JOIN view) | Settled history |

### Direct Supabase RPCs (Sprint 5.7 catalogued)

- `rpc_emit_u_reward(p_amount, p_event, p_metadata, p_user_id)` — Direct emission
- `rpc_emit_reward_event(...)` — Event emission
- `rpc_get_u_emission_snapshot(p_date)` — Daily snapshot
- `rpc_treasury_distribute_u(...)` — Treasury distribution
- `rpc_sync_daily_missions(p_event_date, p_user_id)` — Mission sync
- `rpc_get_promotion_u_campaign_state(...)` — Campaign state
- `rpc_prepare_promotion_u_claim_distribution(...)` / `rpc_finalize_...` / `rpc_cancel_...`

---

## §4 Tap mechanism V2 thực tế

V2 URewardPage.jsx focuses on:
- Reward read model (history)
- Wallet history
- Earnings display

V2 does NOT have an "Energy Core tap loop" UI. **That's a V3 Sprint 5.7 INNOVATION** (per UI canon §4.1).

V2 has `EarnPage` ConnectToEarnDashboard which displays earned rewards from social activity (post_created, reaction_added, etc.) — these emit via reward_emit when user takes action elsewhere (HOME, CHAT, ENTA), NOT a dedicated tap UI.

---

## §5 Quiz / Task / Campaign V2 status

**V2 has NO quiz UI.** Sprint 5.7 hardcoded 5 sample questions because quiz_questions table doesn't exist in DB.

**V2 has Task daily_missions** — same data Sprint 5.7 uses.

**V2 has Campaign promotion_u_campaigns** — same data Sprint 5.7 uses.

---

## §6 Anti-spam V2

V2 anti-spam at server (Edge Function REWARD_RULES enforces caps + cooldowns). Frontend client-side limits:
- (V2 Earn page doesn't have tap loop, so no client-side limiter)

V3 Sprint 5.7 added client-side rate limiter (5 taps/sec, 50+ tap diminishing returns) for Tap module — V2 doesn't have this UI.

---

## §7 V3 Sprint 5.7 wiring assessment

**Sprint 5.7 implementation:** Direct Edge Function pattern (DEC-08 §1.7).

| Item | V2 EXACT | Sprint 5.7 V3 | Match |
|---|---|---|---|
| reward_emit invocation | `supabase.functions.invoke('reward_emit', { body, headers })` | Same pattern | ✅ |
| Bearer token | `authorization: Bearer <token>` | Same | ✅ |
| 12 actionTypes | All defined in REWARD_RULES | All wrapped in V3 types | ✅ |
| Idempotency | `idempotency_key` UUID v4 | Same | ✅ |
| Balance read | `wallet_balances` view | Same | ✅ |
| Reward events | `reward_events` table | Same | ✅ |
| Tap UI | NOT IN V2 | V3 INNOVATION (Energy Core) | ⚠️ V3 ADDS NEW UI |
| Quiz UI | NOT IN V2 | V3 hardcodes 5 samples | ⚠️ V3 ADDS NEW UI |
| Task UI | V2 EarnPage simpler list | V3 TaskModule with claim button | ⚠️ V3 RICHER UI |
| Campaign UI | V2 simpler | V3 CampaignModule with progress | ⚠️ V3 RICHER UI |

**Match score:** Backend integration ~95%. Frontend UI is V3-richer (Energy Core, modules, anti-spam) — V2 simpler.

---

## §8 V3 Sprint 5.11 fix recommendations

**Status: NO FIX NEEDED** for backend integration (Sprint 5.7 Direct pattern correct).

V3 Sprint 5.7 ships richer UI than V2 — that's by design (UI canon innovation). V2 backend supports all V3 actions.

**ETA:** Skip Sprint 5.11.

**Optional Phase 6:**
- Cross-module reward_emit (Sprint 5.7.x) for HOME/CHAT/ENTA actions

---

## §9 Code references

- `apps/uzg-pwa/src/services/rewardOwnerService.js:200-260` — invokeAuthoritativeRewardOwner
- `apps/uzg-pwa/src/services/rewardOwnerService.js:227` — `supabase.functions.invoke('reward_emit', ...)`
- `apps/uzg-pwa/src/pages/URewardPage.jsx` — V2 UI (rewards history)
- `apps/uzg-pwa/src/pages/EarnPage.jsx` — V2 Earn dashboard
- `supabase/functions/reward_emit/index.ts` (1983 lines) — Edge Function source
- Backend Audit D4 — reward_emit signature documentation
- Sprint 5.7 audit — Direct Edge Function pattern
