# UZG_PLUS_SYSTEM_MAP_V1 — End-to-End Data Flow Map

**Task:** `LANE01-UZG-PLUS-AUDIT-AND-SYSTEM-MAP-V1` Phase I (master view)
**Audit time:** 2026-04-29 (UTC+8)
**Companion files:**
- `system_map/backend/SERVICES_MAP.md` (View 1)
- `system_map/frontend/ROUTES_TREE.md` (View 2)
- `system_map/database/SCHEMA_ERD.md` (View 3)
- `system_map/UZG_PLUS_SYSTEM_MAP_V1.json` (machine-readable)
- `system_map/state.live.json` (live state surface)

---

## 1. Top-level system topology

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USER                                       │
│  Browser (mobile-first PWA) at https://uzg.plus                         │
└─────────────────────────────────────────────────────────────────────────┘
                                  │ HTTPS
                                  ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       CLOUDFLARE PAGES + WORKER                         │
│   ┌────────────────────────────┐   ┌─────────────────────────────────┐  │
│   │  Pages shell               │   │  Pages worker                   │  │
│   │  product-v2-pages-shell    │   │  product-v2-pages-worker        │  │
│   │  Static SPA + assets       │   │  /api/v1/* endpoints            │  │
│   │  React 19 + Vite bundle    │   │  Auth + role gate               │  │
│   └────────────────────────────┘   └─────────────────────────────────┘  │
└──────────────────────────┬──────────────────────────────────────────────┘
                           │
       ┌───────────────────┼────────────────────┐
       ▼                   ▼                    ▼
┌───────────────┐   ┌─────────────────┐   ┌──────────────────────────┐
│ Supabase Auth │   │ Supabase REST + │   │ Supabase Edge Functions  │
│   (OTP/JWT)   │   │ RPC + Realtime  │   │ reward_emit              │
│               │   │ kkhhpecofolmro- │   │ wallet_convert_u_to_uzg  │
│               │   │ dyeslp project  │   │ wallet_spend_uzg         │
└───────┬───────┘   └────────┬────────┘   └────────────┬─────────────┘
        │                    │                         │
        └────────────────────▼─────────────────────────┘
                       ┌──────────────────┐
                       │ Postgres (UZG+)  │
                       │ ~90 tables       │
                       │ ~250 functions   │
                       │ ~290 RLS policies│
                       └──────┬───────────┘
                              │
                              │ (server-side companion)
                              ▼
                  ┌────────────────────────────────┐
                  │  Internal Express server       │
                  │  server/aier_server.js (21k LOC)│
                  │  /api/v1/* + /aier/* surfaces  │
                  │  AIER orchestrator boot        │
                  └────────────┬───────────────────┘
                               │
                               ▼
                  ┌────────────────────────────────┐
                  │  AIER subsystem                │
                  │  • job queue                   │
                  │  • observers / analyzers       │
                  │  • predictors / harmony        │
                  │  • social brain / autopilot    │
                  │  • evolution / universe brain  │
                  │  • dispatch / CTO autobuild    │
                  └────────────┬───────────────────┘
                               │
                  ┌────────────┴──────────────────┐
                  ▼                                ▼
           ┌─────────────┐                 ┌────────────────┐
           │  OpenAI API │                 │  Google Gemini │
           └─────────────┘                 └────────────────┘
```

---

## 2. End-to-end flow A: AUTH → ENTA creation

```
1. User → https://uzg.plus/login
2. Pages shell delivers SPA → LoginPage mounts
3. User submits email
   POST /api/v1/auth/otp/request  →  worker  →  Supabase Auth signInWithOtp
4. Email magic-link delivered by Supabase
5. User clicks link → /enta or /dashboard with session token
6. App.jsx authBootstrap loads:
   • getSession()          (Supabase Auth)
   • fetchAuthContext()    GET /api/v1/auth/context  → worker → roleService
   • fetchProfileBootstrap GET /api/v1/profile/bootstrap → worker → enta_profiles + enta_birth_data
   • resolveProductAccess  → roles + tier + admin flags
7. If enta_birth_data is missing or incomplete → /enta (EntaPage) prompts birth data
8. POST /api/v1/profile/bootstrap (or analogous) → worker
   → INSERT into enta_birth_data + enta_profiles
   → trigger calc functions populate enta_current_fields, enta_resonance_scores
9. Realtime channel emits 'profile_updated' → subscribed components re-render
```

---

## 3. End-to-end flow B: CONTENT + QOT (post creation)

```
1. User → /compose (PlusPage) or post-input on FlowFeedPage
2. POST /api/v1/flow/posts → worker
   → enta_flow_events insert
   → posts insert (implicit via flow events table)
   → trigger fires reward_emit edge function
3. reward_emit:
   • idempotency key check (action_type + user_id + source_id)
   • daily cap check (online_reward_daily_state, u_emission_daily)
   • cooldown check
   • INSERT reward_events + reward_distribution_log
   • UPDATE wallet_accounts (U) and wallet_ledger
   • optional: stamp QOT node into qot_nodes (provenance)
4. Realtime channel emits 'flow_event' → feed re-renders
5. Notification fan-out: user_notifications insert per follower
```

---

## 4. End-to-end flow C: SOCIAL INTERACTION → resonance

```
1. User A → /enta/B (PublicProfileRouteBoundary)
2. A clicks 'connect'
   POST /api/v1/resonance/connect → worker
   → enta_connections insert pending row
   → social_signals insert (event observed by social brain)
3. User B → /connect/requests → ConnectionsPage(lane="requests")
4. B accepts
   POST /api/v1/resonance/connections/actions {action:'accept'} → worker
   → enta_connections.status = 'accepted'
   → reward_emit('user_followed') → 2 U each (+ daily cap check)
   → social brain updates resonance_scores (async, via aier:social-analyzer)
5. Realtime channel emits 'connection_accepted' on both sides
6. /connect/suggestions begins to show resonance recommendations from
   2026-03-15_enta_resonance_024_suggestion_engine RPC
```

---

## 5. End-to-end flow D: VALUE (U) → wallet → conversion

```
1. User accumulates U from reward_emit across actions
2. User → /wallet (WalletMainActionPage) → /u-convert (UConvertPage)
3. UConvertPage shows 1000 U = 1 UZG (whitepaper §5.1, enforced by
   wallet_conversion_rates row)
4. User submits conversion (e.g. 1000 U → 1 UZG)
   POST /api/v1/wallet/transfer or invoke supabase.functions
     wallet_convert_u_to_uzg → edge function
   • atomic swap:
       wallet_ledger DEBIT user U account
       wallet_ledger CREDIT user UZG account
       wallet_conversions row insert (FX rate snapshot)
       wallet_supply_caps recalc
   • idempotency key checks
5. Realtime channel emits 'wallet_balance_changed'
   → WalletBalancePanel + WalletDashboard re-render
6. UZG can be:
   • spent via wallet_spend_uzg edge fn (membership upgrade, tickets, booking)
   • used in marketplace via /api/v1/aier/marketplace
   • burned: burn_events row → reduces UZG circulating supply
```

---

## 6. End-to-end flow E: MEMBERSHIP upgrade

```
1. User → /membership (MembershipPage)
2. UI lists tiers from runtime catalog (tier_code/tier_id) + multipliers
3. User clicks Upgrade
   POST /api/v1/membership/upgrade → worker (requireUserAuth)
   • read current user_roles + tier_code
   • validate UZG balance against required price (v2_p4_membership_usd_credit_canon)
   • wallet_spend_uzg edge fn: DEBIT wallet_ledger UZG, CREDIT treasury_pools
   • UPDATE user_roles (tier_code, tier_id)
   • INSERT admin_audit_logs row (membership_upgrade)
   • optional: aier_command_queue task to provision new privileges
4. Realtime emits 'role_changed'
5. App.jsx re-runs resolveProductAccess() → memberOwnedRoute updates
   → next render shows new tier UI (multiplier, premium circles, AIER mint quota)
```

---

## 7. End-to-end flow F: AIER MINT → ownership → marketplace

```
1. User → /aier/mint (AIERMintEntryPage)
   GET /api/v1/aier/mint → worker → aier_license_collections rows
2. User mints
   POST /api/v1/aier/mint → worker
   • debit UZG via wallet_spend_uzg
   • INSERT aier_license_tokens row
   • INSERT aier_license_owners row (owner = user)
3. User → /aier/my (AIEROwnershipPage)
4. User lists for sale
   POST /api/v1/aier/marketplace/listings
   • INSERT aier_license_sales row (listing)
5. Buyer sees listing on /aier/marketplace
   POST /api/v1/aier/marketplace/purchase
   • debit buyer UZG, credit seller UZG (minus royalty %)
   • INSERT aier_license_royalties row
   • UPDATE aier_license_owners
   • optional: aier_license_renewals lifecycle tracking
6. Aier_agents row may be associated with the license token (agent_network linkage)
```

---

## 8. End-to-end flow G: ADMIN UZGFi reconciliation

```
1. Admin → /admin/uzgfi/reconciliation (UZGFiAdminReconciliationPage)
   GET /api/v1/admin/uzgfi/reconciliation → Express (requireAdminAuth)
2. Express server (long-lived host) runs reconcile:
   • SELECT FROM wallet_ledger WHERE settled = false GROUP BY day
   • compute treasury delta vs reward_distribution_log
   • compute burn delta vs burn_events
   • emit per-day reconcile snapshot
3. Admin clicks 'Apply'
   POST /api/v1/admin/reconciliation/wallet-day → Express
   • write reconcile output to admin_audit_logs
   • adjust treasury_ledger entries if drift detected
4. Snapshot persisted to aier/logs/uzgfi_reconciliation_*.json
   (filesystem queue on the Express host)
```

---

## 9. Membership "tier" decision tree (canon flag)

Whitepaper §4.2 Identity says membership is a profile dimension; it does NOT enumerate "6 tiers" by name. Code is tier-flexible:

```
• productV2Service computes activeMembership from user_roles + tier catalog row
• Multipliers + privileges read from runtime catalog (catalog_key, code, tier_id)
• Reward/credit/marketplace use these multipliers downstream
• Tier change emits user-facing CTAs via privilegeState.runtime_membership_level / _code
```

The literal "6 tiers" framing is **task-prompt only**, not whitepaper-canon — flagged in `audits/05_CANON_VS_IMPLEMENTATION.md` §2.6. Lane_01 reports without claiming to resolve.

---

## 10. Cross-system memory (UZG+ ↔ AIER Code DB)

```
UZG+ DB (kkhhpecofolmrodyeslp)             AIER Code DB (vstnvvwmztotgogobefx)
─────────────────────────────              ───────────────────────────────────
qot_nodes (MVP)        ──── BRIDGE? ────  qot_lineage (full provenance graph)

aier_command_queue     ──── BRIDGE? ────  bridge_task_records
                                          bridge_idempotency_records
                                          bridge_audit_event_records

aier_agents            ──── BRIDGE? ────  (lane_registry + aier_ops_*)
```

The bridge mechanism between the UZG+ product DB and the AIER Code governance DB is **not visible at the source-code surface** in this audit. It may live in:

- A separate "bridge" service not deployed in `uzgplus-app`.
- An aier:* npm script that reads/writes both DBs (unlikely under boundary rules).
- A planned but unimplemented integration.

This is reported as a known gap in `audits/05_CANON_VS_IMPLEMENTATION.md`.

---

## 11. Lane separation (governance)

```
.lane_01/   ← THIS AUDIT (read-only)        Lane_01 CLA / Cursor
.lane_02/   ← TAO + Bazi + Language OS       Lane_02 CLA
            (active scope at audit time)
```

Lane_01 must NOT touch `.lane_02/`; Lane_02 must NOT touch `.lane_01/`. Boundary respected by this audit. Cross-lane handoffs go through `Uniton_Shared/handoffs/{inbox,outbox}/Lane_0X/` via API publish (no local Uniton_Shared clone).

---

## 12. Live state at audit time

| Surface | Status | Header / evidence |
|---|---|---|
| `https://uzg.plus/` | 200 | `x-uzg-runtime: product-v2-pages-shell`, Server: `cloudflare` |
| `https://uzg.plus/api/v1/auth/context` | 401 (unauthed probe) | `x-uzg-runtime: product-v2-pages-worker`, JSON body |
| `https://uzgplus-app.vercel.app/` | 404 DEPLOYMENT_NOT_FOUND | repo `homepage` field stale |
| GitHub `unitonzengarden/uzgplus-app` | private, default `main`, 13 PRs all merged, 0 issues | HEAD = `4b93ee7` |
| `.aier/` runtime brain dumps | present (~120 entries) | last touched within Lane_02 cycle |
| `.lane_02/` | active (TAO / Bazi / Lang OS) | 7 reports, 7 snapshots |
| Supabase project `kkhhpecofolmrodyeslp` (UZG+) | declared in `supabase/config.toml`; live keys NOT in env | live query NOT performed |
| Supabase project `vstnvvwmztotgogobefx` (AIER Code) | env-supplied; live OpenAPI dump captured | 33 tables + 11 RPCs (NOT UZG+ schema) |

---

## 13. Observability gaps (not fixed by Lane_01)

1. No staging environment workflow.
2. Express server not reachable on `uzg.plus` (separate host); no public health endpoint visible to readers.
3. Bundle size baseline not measured.
4. UZG+ DB live schema query pending NTS supply of `kkhhpecofolmrodyeslp` keys.
5. No CSP / HSTS / X-Frame-Options on the SPA shell.
6. `vercel.json` is legacy noise; repo `homepage` field stale.

These are reported transparently. Lane_01 is read-only; resolution belongs to subsequent lanes if NTS approves.
