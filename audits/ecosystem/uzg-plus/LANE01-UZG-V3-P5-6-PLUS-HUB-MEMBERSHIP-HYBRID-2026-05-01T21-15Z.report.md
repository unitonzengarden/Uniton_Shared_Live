# Report — Sprint 5.6 PLUS Hub + Membership Hybrid

**Audit ID:** LANE01-UZG-V3-P5-6-PLUS-HUB-MEMBERSHIP-HYBRID-2026-05-01T21-15Z
**Date:** 2026-05-02
**Pattern:** Hybrid (DEC-08 §1.6) — V2 Express upgrade + Direct Supabase catalog

---

## Executive Summary

Sprint 5.6 ships PLUS Hub springboard + Membership mini app via Hybrid pattern. **Critical D6 DRIFT-04 applied** — used `membership_current_view` (27-col JOIN view) instead of broken `memberships.tier` reference.

Backend Deep Audit zero-discovery PROVEN 3rd sprint in a row (5.5 ENTA, 5.6 PLUS).

---

## D6 DRIFT-04 Compliance (HIGH severity drift)

**Drift entry:** `memberships.tier` does NOT exist; column is `tier_id` (FK to `member_tiers`).

**Resolution applied in Sprint 5.6:**

1. **Read pattern** — Use `membership_current_view` (JOIN view, 27 cols including `tier_name`, `tier_code`, `tier_benefits`, `price_amount`, `duration_days`):

```typescript
// useUserMembership.ts:30
.from('membership_current_view')
.select('*')
.eq('user_id', userId)
.maybeSingle();
```

2. **Display pattern** — Reads `membership.tier_name`, `membership.tier_code`, `membership.tier_icon` (NOT `membership.tier`):

```typescript
// CurrentTierCardV3.tsx:33
const tierName = membership?.tier_name || 'Khám phá';
const tierCode = membership?.tier_code || 'free';
```

3. **Verification** — `grep -n "memberships.tier\b"` against all Sprint 5.6 files: 0 matches in code (only 1 comment explaining drift).

---

## Hybrid Pattern Compliance (DEC-08 §1.6)

### Read paths — Direct Supabase RLS

| Hook | Table queried | Filter |
|---|---|---|
| useUserMembership | `membership_current_view` | `user_id = auth.uid()` |
| useTierCatalog | `member_tiers` | `is_active=true AND is_public=true` |

### Write path — V2 Express Hybrid

| Method | V2 Express endpoint | Purpose |
|---|---|---|
| GET | `/api/v1/membership/upgrade` | Baseline (eligible tiers + payment methods) |
| POST | `/api/v1/membership/upgrade` | Initiate upgrade with idempotency_key |

**Why Hybrid:** V2 Express `/api/v1/membership/upgrade` has battle-tested Stripe/payment provider integration. Direct rewrite would waste 10-15h and risk financial integrity. Sprint 5.6 reuses V2 write path while moving reads to Direct.

---

## Tier Gating Rule Engine (Whitepaper §9.3)

```typescript
// useTierGating.ts
const TIER_NAME_TO_RANK = {
  explorer: 0, free: 0,        // Free tier
  seeker: 1, member: 1,        // $9/30d
  builder: 2, premium: 2,      // $39/30d
  sovereign: 3, business: 3,   // $69/30d
};
```

**UX rules:**
- ALL tiers see ALL 12 mini app icons (not hidden)
- Locked apps show lock icon + "Upgrade to <tier>" CTA on tap
- Tier badge in PLUS Hub header shows current tier name + rank

---

## Backend Deep Audit References

### D1 Schema (verified)

| Table | Cols | Used by |
|---|---|---|
| `memberships` | 14 | (NOT used directly — DRIFT-04) |
| `member_tiers` | 20 | useTierCatalog + UpgradeFlowV3 |
| `membership_current_view` | 27 (JOIN) | useUserMembership (PRIMARY READ) |

### D7 V2 Express (verified)

| Endpoint | Method | Sprint 5.6 use |
|---|---|---|
| `/api/v1/membership/upgrade` | GET | useMembershipUpgrade baseline |
| `/api/v1/membership/upgrade` | POST | useMembershipUpgrade.confirm() |

### D3 RPCs (Sprint 5.6 deferred — 5.6.x or 5.7)

- `fn_membership_subscribe` — alternative Direct subscription path (deferred — V2 Express used)
- `bootstrap_membership_for_user` — bootstrap helper (not invoked Sprint 5.6)
- `rpc_payment_membership` — paid upgrade with idempotency (deferred — V2 Express used)

---

## Acceptance Criteria

| AC | Status | Evidence |
|---|---|---|
| AC-1 D1+D6+D7 references read | PASS | Schema verified, DRIFT-04 applied |
| AC-2 Routes 200 | PASS | 19/19 KL-028 probe |
| AC-3 Phase 4 + 5.1-5.5 regression CLEAN | PASS | All prior routes still 200 |
| AC-4 PLUS Hub functional | PASS | 12 mini apps render, default Pinned 4 apps |
| AC-5 Membership mini app functional | PASS | DRIFT-04 verified — tier_name from JOIN view |
| AC-6 Tier gating logic functional | PASS | 4 ranks, console marker active |
| AC-7 Auth integration | PASS | Unauth redirect verified |
| AC-8 KL-028 production probe gate | PASS | 19/19 200 |
| AC-9 KL-030 mobile shell | PASS | 480px CSS preserved |
| AC-10 KL-32+33 namespace separation | PASS | plus-v3/ + membership-v3/ NEW |
| AC-11 Build + deploy CLEAN | PASS | V3 bundle 768 KB (+12 KB), Cloudflare PASS |
| AC-12 Playwright tests PASS | PASS | 6/6 in 7.3s |
| AC-13 Hybrid compliance | PASS | V2 upgrade + Direct catalog verified |
| AC-14 Live mirror DOT 4+ URLs 200 | PASS | /v3/plus + /v3/membership 200 |

---

## Pattern Reusable for Sprints 5.6.x + 5.7 + 5.8

- **Hybrid V2 Express + Direct split** template (membership upgrade pattern)
- **Tier gating rule engine** (reusable for any premium feature)
- **Mini app full-screen takeover** pattern (MiniAppShellV3 + MiniAppTopBarV3 — for future Sprint 5.6.x mini apps)
- **JOIN view consumption** (DRIFT-04 lesson: prefer views over manual JOINs to avoid drift)
