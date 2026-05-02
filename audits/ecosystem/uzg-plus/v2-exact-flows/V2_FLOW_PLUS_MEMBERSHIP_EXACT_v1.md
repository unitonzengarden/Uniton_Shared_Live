# V2 PLUS Hub + Membership Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES
**Module:** 6 of 8

---

## §1 Module status V2

**LIVE.** V2 has PLUS Hub (mini-app launcher) + Membership module with 4-tier upgrade flow.

---

## §2 Frontend components V2

| File | Role |
|---|---|
| `apps/uzg-pwa/src/pages/PlusPage.jsx` | PLUS Hub springboard |
| `apps/uzg-pwa/src/pages/MembershipPage.jsx` | Membership tier display + upgrade |
| `apps/uzg-pwa/src/pages/AdminMembershipPage.jsx` | Admin tier management |

---

## §3 Backend endpoints V2

### V2 Express endpoints

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/api/v1/membership/upgrade` | GET | requireUserAuth | Upgrade baseline (eligible tiers, current tier) |
| `/api/v1/membership/upgrade` | POST | requireUserAuth | Initiate upgrade (tier_id OR tier_code, idempotency_key) |

### POST /api/v1/membership/upgrade (aier_server.js:18216-)

**Request body:**
```json
{
  "tier_id": "...",
  "tier_code": "seeker",
  "idempotency_key": "<uuid>"
}
```

Either `tier_id` or `tier_code` required.

### Direct Supabase tables (Sprint 5.6 verified)

| Table | Use |
|---|---|
| `memberships` (14 cols) | User's current tier — DRIFT-04: column is `tier_id` (NOT `tier`) |
| `member_tiers` (20 cols) | Tier catalog (Explorer/Seeker/Builder/Sovereign) |
| `membership_current_view` (27-col JOIN view) | Preferred read — JOINed user + tier data |
| `app_memberships` (9 cols) | Alternative simpler table |

### Direct Supabase RPCs (Sprint 5.6 catalogued)

| RPC | Purpose |
|---|---|
| `fn_membership_subscribe` | Direct subscription path (alt to V2 Express) |
| `bootstrap_membership_for_user` | Bootstrap helper |
| `rpc_payment_membership` | Paid upgrade with idempotency |

---

## §4 Mini app catalog V2

V2 PlusPage.jsx mock-driven (per Sprint 5.6 finding). Catalog:
- U-Reward (`/u-reward`)
- TAO (`/tao`)
- Booking
- Membership (`/membership`)
- Marketplace
- Retreat
- Tickets
- Circles
- AIER Hub
- Stats (Member+ tier-locked)
- Governance (Premium+ tier-locked)
- Business Tools (Business+ tier-locked)

(12 apps total per UI canon §3.1.)

---

## §5 Tier gating logic

V2 (per Whitepaper §9.3 + DEC-04):
- Free=0 (Explorer)
- Member=1 (Seeker, $9/30d)
- Premium=2 (Builder, $39/30d)
- Business=3 (Sovereign, $69/30d)

Tier gating: client-side rule engine + RLS server-side enforcement.

---

## §6 V3 Sprint 5.6 wiring assessment

**Sprint 5.6 implementation:** Hybrid pattern (DEC-08 §1.6) — V2 Express upgrade + Direct Supabase catalog.

| Item | V2 EXACT | Sprint 5.6 V3 | Match |
|---|---|---|---|
| Membership read | `membership_current_view` (JOIN view) | Same | ✅ |
| DRIFT-04 (tier_id) | Applied via JOIN view | Same | ✅ |
| Upgrade GET | `/api/v1/membership/upgrade` | Same | ✅ |
| Upgrade POST | `/api/v1/membership/upgrade` | Same | ✅ |
| Tier catalog read | `member_tiers` direct | Same | ✅ |
| Mini app catalog | Mock data (V2 page) | Hardcoded V3 (12 apps) | ✅ EQUIVALENT |
| Tier rank engine | 4 tiers | Same | ✅ |
| Pinned localStorage | (V2 may not have) | localStorage `uzg-plus-pinned-v1` | ⚠️ V3 ADDITION |

**Match score: ~95% — Sprint 5.6 wiring excellent**

---

## §7 V3 Sprint 5.11 fix recommendations

**Status: NO FIX NEEDED.** Sprint 5.6 wiring correct.

**ETA:** Skip Sprint 5.11.

---

## §8 Code references

- `aier_server.js:18177-18215` — membership/upgrade GET
- `aier_server.js:18216-18280` — membership/upgrade POST
- Backend Audit D6 DRIFT-04 — membership.tier_id (not .tier)
- Sprint 5.6 audit — Hybrid pattern verified
