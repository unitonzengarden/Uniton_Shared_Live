# UZG+ V2 Module Inventory v1.0

**Authored:** 2026-04-30 by CLA Lane_01 / Cursor (Sonnet 4.6)
**Scope:** Map V2 production routes + components + database tables to the 7 Whitepaper §4.2 modules
**Source SHAs:** `uzgplus-app@6d99b1881b...` · `Uniton_Shared@5cfa5c82...`
**Canon authority:** `audits/ecosystem/uzg-plus/CANON_V2_RECONCILIATION_PROPOSAL.md` §2 (DEC-05 — 7 Modules verbatim from Whitepaper §4.2)

---

## §1 Reading guide

The Whitepaper §4.2 names **seven canonical modules**:

1. **Identity** — profile, membership, reputation, activity history
2. **Community** — circles, discussions, social interaction
3. **Wisdom AI** — personal energy mapping, guidance, knowledge synthesis
4. **Retreat** — physical retreat network, events, workshops
5. **Marketplace** — creator economy (courses, workshops, services)
6. **Wallet** — U token, UZG token, in-app payments
7. **Governance** — proposals, voting, decentralised coordination

V2 implementation reality groups code into 16 functional domains (per Master Audit §5.3), 25 component directories, 96+ migrations, ~80 page files. This document maps the production reality to the 7 canonical modules and flags **gaps**, **mis-categorisations**, and **modules with no UI**.

Per-module legend:

- **Status**: `LIVE` (working in production) · `WIP` (functional but rough) · `MISSING UI` (backend exists, no UI) · `STUB` (placeholder)
- **UX maturity**: `HIGH` (polished, consistent) · `MEDIUM` (functional but inconsistent styling/flows) · `LOW` (broken, placeholder, or rough)
- **Tier gating**: which membership tiers (Explorer / Seeker / Builder / Sovereign) can access. `all` = no gating · `seeker+` = Seeker tier and above · etc.

---

## §2 Module map — 7 canonical modules

### §2.1 Module 1 — IDENTITY

**Status:** LIVE · **UX maturity:** MEDIUM · **Tier gating:** all

**Sub-systems:** Authentication (OTP) · Profile (ENTA) · Public identity gateway (UDNA) · Membership · RBAC

#### Routes mapped

| Route | Auth | Lifecycle | Owner |
|---|---|---|---|
| `/login` | public | Auth bootstrap (member entry, 2-step OTP) | Identity |
| `/onboarding` | authed | Profile bootstrap (currently redirect-only) | Identity |
| `/enta` | authed | ENTA root | Identity |
| `/enta/me` | authed | Own profile | Identity |
| `/enta/:handle` | authed | Other user profile | Identity |
| `/enta/:handle/connections` | authed | Profile connections subview | Identity |
| `/enta/view`, `/enta/network` | authed | Legacy redirects | Identity |
| `/profile/edit` | authed | Profile editor | Identity |
| `/profile/enta-edit` | authed | Legacy redirect | Identity |
| `/membership` | authed | Tier overview + catalog (Quick Win #4) | Identity → Membership |
| `/community` | authed | Hub (cross-cutting) | Identity |
| `/` (udna-public) | public | Gateway index — entity discovery | Identity → UDNA |
| `/human/:uniton_id` (udna-public) | public | Public HUMAN identity | Identity → UDNA |
| `/circle/:uniton_id` (udna-public) | public | Public CIRCLE identity (sub-entity, but rendered by UDNA gateway) | Identity → UDNA |
| `/business/:uniton_id` (udna-public) | public | Public BUSINESS identity | Identity → UDNA |
| `/aier/:uniton_id` (udna-public) | public | Public AIER identity | Identity → UDNA |

**Total: 16 routes** (11 main app + 5 udna-public)

#### Components used (`apps/uzg-pwa/src/components/`)

- `enta/` — 10 files (ENTA cards, identity panel, EntaActions, EntaCardHeader, etc.)
- `auth/` — 3 files (auth gates, RouteGuard, AdminGuard)
- `profile/` — 3 files (`PublicProfileRouteBoundary.jsx` redirect-only, profile editor pieces)
- `membership/` — 3 files (`MembershipUpgradePanel`, `MembershipCatalogPanel`, status badges)
- `activation/` — 1 file (activation banner)

In `apps/udna-public/src/components/`:

- `GatewayLayout.jsx` — public gateway layout shell
- `SectionCard.jsx` — S1–S8 section cards
- `ClaimList.jsx` — public claims list

#### Database tables touched (Master Audit §5.3 16 domains)

- Identity / ENTA: `enta_users`, `enta_handles`, `profile_snapshots`, `profile_*` runtime caches
- Membership: `member_tiers` (catalog), `member_subscriptions`, `member_billing_history`, `member_tier_canon` constants
- RBAC: `auth_user_admin_allowlist`, `admin_section_grants`
- UDNA public: `udna_public_view`, `network_metrics` (referenced in S5/S7 sections)

#### API endpoints used

- `POST /api/v1/auth/otp/send` (LoginPage step 1)
- `POST /api/v1/auth/otp/verify` (LoginPage step 2)
- `GET /api/v1/profile/:userId/snapshot`
- `GET /api/v1/membership/status`
- `GET /api/v1/membership/published-catalog` (replaced in V2 by client-side `getMembershipPublishedCatalog()`)
- `GET /api/v1/admin/allowlist/check`

#### Tier gating

- `/login`, `/enta/*`, `/profile/edit`: **all tiers**
- `/membership` page (catalog visible): **all tiers**
- Upgrade flows in `MembershipUpgradePanel`: **explorer** sees Seeker/Builder/Sovereign offers; higher tiers see equal/higher only.
- udna-public `/human|/circle|/business|/aier/:id`: **public (no auth required)** — viewer state badge always says `Logged out` for guests.

#### UX maturity

**MEDIUM.** Login is polished (clean two-step OTP, language switching, secure-OTP badge). Profile editor is functional but inconsistent with the rest of the app's visual system (different button shapes, paddings). udna-public gateway is polished (clear S1–S8 hierarchy) but disconnected from the main app design language. Membership catalog (Quick Win #4) is good. ENTA profiles **do NOT serve public** in production despite canon implying they should (UX gap #G01, P0).

#### Known issues (cross-ref to UX Gap doc)

- #G01 (P0) — ENTA profiles not publicly viewable (canon contradicts implementation)
- #G02 (P1) — No 404 page (catch-all silently redirects to `/login`)
- #G03 (P0) — `/aier/:slug` URL semantics flip across auth boundary
- #G09 (P2) — `/enta/view` route name implies public viewer but is internal redirect
- #G15 (P0) — Thai language partial coverage on login (only dropdown translates, not page)
- #G24 (P2) — Profile editor visual inconsistency with rest of app
- #G27 (P2) — udna-public gateway visually disconnected from main app
- #G29 (P2) — Showing raw entity hashes (`bf39c4f7...34f735`) and timestamp IDs (`1773975846472`) on public gateway

---

### §2.2 Module 2 — COMMUNITY

**Status:** LIVE · **UX maturity:** MEDIUM-HIGH · **Tier gating:** mostly all (some `seeker+` for premium circles)

**Sub-systems:** Flow feed · Connect (friends/requests/suggestions) · Chat (DM/circle) · Circles (discovery + business) · Community hub

#### Routes mapped

| Route | Auth | Owner |
|---|---|---|
| `/post/:id` | authed | Community → Flow |
| `/qot/:qotId` | authed | Community → QOT |
| `/qot/me` | authed | Community → QOT (Quick Win #3) |
| `/connect`, `/connect/friends`, `/connect/requests`, `/connect/suggestions` | authed | Community → Connect |
| `/connections`, `/resonance` | authed (redirect) | Community → Connect (legacy) |
| `/chat`, `/chat/new`, `/chat/:id`, `/chat/:id/info` | authed | Community → Chat |
| `/inbox`, `/inbox/direct/:id`, `/inbox/direct/:id/info` | authed | Community → Chat (legacy alias) |
| `/circles/:circleKey/chat` | authed | Community → Chat (group) |
| `/business`, `/circles` | authed | Community → Circles |
| `/circles/:circleKey` | authed | Community → Circles |
| `/circles/:circleKey/business` | authed | Community → Circles → Business |
| `/circles/:circleKey/business/rooms` | authed | Community → Circles → Business |
| `/circles/:circleKey/business/rooms/:roomKey` | authed | Community → Circles → Business |
| `/community` | authed | Community → Hub |
| `/social-brain` | authed | Community → Quantum Social (Quick Win #1) |
| `/compose`, `/plus` | authed | Community → Plus composer |
| `/flow`, `/events` | authed (redirect-only) | Community → Flow (UNMOUNTED) |

**Total: 26 routes** including redirects + admin overlays.

#### Components used

- `community/` — 11 files
- `feed/` — 4 files
- `flow/` — 5 files
- `post/` — 2 files
- `comment/` — 1 file
- `qot/` — 1 file (`QotUserTrailPanel.jsx`)
- `chat/` — 5 files
- `connection/` (in `connect`) — uses `connections/` and `enta/connections-*`
- `realtime/` — 3 files (presence, typing, etc.)
- `social/` — 1 file (`QuantumSocialDashboard.jsx`)
- `resonance/` — 6 files

#### Database tables touched

- Flow: `enta_posts`, `enta_post_reactions`, `enta_post_comments`
- QOT: `qot_nodes`, `qot_edges`, `qot_user_trails`
- Connect: `enta_connections`, `enta_connection_requests`, `enta_resonance_scores`
- Chat: `chat_conversations`, `chat_messages`, `chat_participants`, `chat_typing_state`
- Circles: `circles`, `circle_members`, `circle_business_profiles`, `circle_business_rooms`, `circle_business_modules`, `circle_business_ops`, `circle_business_roles`, `circle_business_commission`, `circle_business_revenue`, `circle_business_wallets`
- Notifications: `notifications`, `notification_subscriptions`
- Quantum Social: `social_brain_*` (per Master Audit — backend tables exist, UI uses MOCK per LANE01-SOCIAL-BRAIN-USER-V1)

#### API endpoints used

- `GET /api/v1/flow/feed`
- `GET /api/v1/flow/post/:id`
- `POST /api/v1/flow/post`
- `GET /api/v1/qot/node/:qotId`
- `GET /api/v1/connect/friends|requests|suggestions`
- `POST /api/v1/connect/request`
- `GET /api/v1/chat/conversations`
- `POST /api/v1/chat/message`
- `GET /api/v1/circles/discovery`
- `GET /api/v1/circles/:circleKey`
- `POST /api/v1/circles/:circleKey/business/rooms`
- `GET /api/v1/circles/:circleKey/business/commission`

#### Tier gating

- Flow / Connect / Chat / Circles discovery: **all tiers**
- Premium circles: **seeker+** (per `MembershipPrivilegeMatrix` canon — Seeker = 100-member premium, Builder = 500, Sovereign = 1000)
- Circle Business creation: **builder+** (canon: business management eligibility starts at Builder)

#### UX maturity

**MEDIUM-HIGH.** Chat + DM flows feel polished (typing indicators, room info pages). Connect tabs have lane-based filtering (`lane="all|friends|requests|suggestions"`) — clear UI. Circles discovery is functional but `/business` and `/circles` render the same component (`CirclesDiscoveryPage`) which causes semantic confusion. Flow feed is unmounted — `/flow` redirects to `memberOwnedRouteTarget` (so the actual feed lives elsewhere — likely embedded in the Dashboard or a different surface). QOT explorer is functional. **Quantum Social is MOCK ONLY** — Master Audit notes Lane_04 backend not yet live.

#### Known issues

- #G14 (P1) — `/business` and `/circles` are functionally identical (same component)
- #G18 (P2) — `/flow` and `/events` route names exist but route to redirects, not their pages (Flow page is unmounted)
- #G31 (P1) — Quantum Social uses mock data (clearly labelled, but blocks real V3 testing)
- #G07 (P0) — `/inbox/direct/:id` and `/chat/:id` are duplicate URLs for the same content
- #G19 (P2) — `/wallet/transfer`, `/wallet/transfer/detail`, `/wallet/convert` all render same `WalletPage` component (URL meaningless)

---

### §2.3 Module 3 — WISDOM AI

**Status:** WIP · **UX maturity:** LOW (member surface) / HIGH (admin private) · **Tier gating:** mostly admin-only

**Sub-systems:** AIER (the Wisdom AI agent system) · Wisdom training · Intelligence console

#### Routes mapped

| Route | Auth | Status |
|---|---|---|
| `/aier` | authed | LIVE — overview |
| `/aier/mint` | authed | LIVE — mint flow |
| `/aier/my` | authed | LIVE — owned AIERs |
| `/aier/marketplace` | authed | WIP — marketplace UI rough |
| `/aier/dashboard`, `/aier/ops`, `/aier/login` | n/a (redirect) | LEGACY |
| `/intelligence` | authed (redirect) | REDIRECT to `adminConsoleRoute` |
| `/admin/aier` | admin | LIVE |
| `/admin-private/aier-control` | admin-private | LIVE |
| `/admin-private/wisdom` | admin-private | LIVE |
| `/admin-private/training` | admin-private | LIVE |
| `/admin-private/intelligence` | admin-private | LIVE |

**Total: 12 routes**

#### Components used

- `aier/` — 5 files (overview cards, mint sticky, ownership panel, etc.)
- `ai/` — 1 file
- `training` — admin-only (in `pages/AdminPrivateTrainingPage.jsx`)

#### Database tables

- `aier_definitions`, `aier_licenses`, `aier_marketplace_listings`, `aier_marketplace_purchases`
- `aier_agent_runs`, `aier_agent_decisions`
- Wisdom: `wisdom_learning_catalog`, `wisdom_learning_sources`, `wisdom_training_sessions`, `wisdom_training_studio_sources`
- Intelligence: `intelligence_observations`, `intelligence_recommendations`

#### API endpoints

- `GET /api/v1/aier/marketplace`
- `POST /api/v1/aier/marketplace/listings`
- `POST /api/v1/aier/marketplace/purchase`
- `POST /api/v1/aier/mint`

#### Tier gating

- `/aier` member surfaces: **all tiers** (browsable but actions may require seeker+)
- `/admin/aier` + `/admin-private/aier-*`: **admin only** (RBAC allowlist)

#### UX maturity

**LOW for member, HIGH for admin.** The udna-public AIER pages (`/aier/:id`) for guests render the polished S1–S8 UDNA gateway. Member-side `AIEROverviewPage` and `AIERMarketplacePage` are flagged WIP per Master Audit §4 (rough UX). `AIERMintEntryPage` is functional. The admin-private wisdom + training surfaces are reportedly polished (Master Audit §4 lists these as LIVE). **Major asymmetry: guest UDNA AIER view > member AIER view.** UX gap #G06.

#### Known issues

- #G06 (P0) — Member AIER marketplace UI is rougher than the public UDNA gateway view of the same entity
- #G03 (P0) — `/aier/marketplace` URL serves different products to guest vs member
- #G10 (P1) — `AIER License` shown as 0 USD on public gateway with no explanation (intentional? bug?)
- #G11 (P2) — All `/aier/[slug]` paths show identical AIER License content for unknown slugs (no validation against real list)

---

### §2.4 Module 4 — RETREAT

**Status:** WIP · **UX maturity:** LOW · **Tier gating:** all (booking flow access)

**Sub-systems:** Booking · Tickets · Events

#### Routes mapped

| Route | Auth | Status |
|---|---|---|
| `/booking` | authed | LIVE per Master Audit, WIP visual |
| `/tickets` | authed | LIVE |
| `/events` | authed (redirect) | UNMOUNTED |

**Total: 3 routes**

#### Components used

- No dedicated `retreat/` directory
- Booking + Tickets pages render with `ui/` and `layout/` primitives only

#### Database tables

- `retreats`, `retreat_events`, `retreat_bookings`, `retreat_tickets` (per Master Audit §5.3 — 16 functional domains include "Retreat" implicitly under Community / Marketplace overlap)

> **Drift note:** Master Audit §5.3 lists 16 domains but does NOT call out a distinct "Retreat" domain. Retreat as a Whitepaper module is **under-realised in V2** — only 3 routes, 0 dedicated components, ambiguous database ownership.

#### API endpoints

- `GET /api/v1/booking/availability` (presumed — not confirmed)
- `POST /api/v1/booking` (presumed)
- `GET /api/v1/tickets`

#### Tier gating

- `/booking`, `/tickets`: **all tiers** (entry-level)
- Premium retreat slots: **builder+** (per canon — physical retreat allocation tied to higher tiers)

#### UX maturity

**LOW.** No dedicated retreat brand presence. Per Master Audit, the booking flow is functional but rough. No screenshot evidence (no test credentials).

#### Known issues

- #G20 (P1) — Retreat module under-realised — Whitepaper §4.2 names it but only 3 routes, 0 dedicated components
- #G21 (P2) — `/events` route exists but is redirect-only (UNMOUNTED page)
- #G12 (P2) — No public retreat browsing surface (canonical retreat events should be discoverable pre-signup)

---

### §2.5 Module 5 — MARKETPLACE

**Status:** WIP · **UX maturity:** LOW · **Tier gating:** mostly seeker+

**Sub-systems:** AIER Marketplace · Course/workshop creator economy (per Whitepaper)

#### Routes mapped

| Route | Auth | Status |
|---|---|---|
| `/aier/marketplace` | authed | WIP per Master Audit |
| `/aier/marketplace` | public (udna-public) | LIVE — public AIER identity card |
| `/admin/uzgfi/marketplace` | admin | LIVE |

**Total: 3 routes** (1 unique URL with dual semantics)

> **CRITICAL:** Whitepaper §4.2 names "Marketplace" as a top-level module covering "creator economy (courses, workshops, services)" — the V2 implementation has NO general marketplace surface. The only marketplace is `/aier/marketplace` (AIER licenses). Course/workshop/service marketplace is **NOT IMPLEMENTED**. This is a structural gap.

#### Components used

- `aier/AIERMarketplaceListingCard.jsx` and similar inside `aier/`

#### Database tables

- `aier_marketplace_listings`, `aier_marketplace_purchases`
- No `course_listings`, `workshop_listings`, `service_listings` per migrations sample

#### API endpoints

- `GET /api/v1/aier/marketplace`
- `POST /api/v1/aier/marketplace/listings`
- `POST /api/v1/aier/marketplace/purchase`

#### Tier gating

- AIER marketplace browsing: **all tiers**
- Listing AIER for sale: **builder+** (presumed — confirm in canon)
- Purchasing AIER: **all tiers** but requires sufficient UZG balance

#### UX maturity

**LOW.** Marketplace UI per Master Audit is rough. No course/workshop/service variant exists. UDNA gateway view of `/aier/[slug]` for guests is polished but is identity-only, not commerce.

#### Known issues

- #G22 (P0) — Marketplace module per Whitepaper §4.2 covers "creator economy (courses, workshops, services)" but ONLY AIER marketplace is implemented in V2
- #G06 (P0) — Member AIER marketplace UX < public UDNA gateway UX of same data
- #G23 (P1) — No marketplace search / filter / category UI

---

### §2.6 Module 6 — WALLET

**Status:** LIVE · **UX maturity:** MEDIUM (member) / HIGH (UZGFi admin) · **Tier gating:** all + admin-section gated for ops

**Sub-systems:** UZG+ Wallet (member) · UZGFi (treasury / convert / burn) · U token earnings · U conversion · Connect-to-Earn

#### Routes mapped

| Route | Auth | Owner |
|---|---|---|
| `/wallet` | authed | Wallet member surface |
| `/wallet/asset/:assetCode` | authed | Wallet → asset detail |
| `/wallet/activity/:transactionId` | authed | Wallet → transaction detail |
| `/wallet/transfer`, `/wallet/transfer/detail`, `/wallet/convert` | authed | Wallet sub-flows (all → `WalletPage` shell) |
| `/u-earnings` | authed | Earnings ledger |
| `/u-system` | authed | U asset family |
| `/u-convert`, `/u-convert-history` | authed | Conversion |
| `/u-reward`, `/reward` | authed (redirect) | Connect-to-Earn legacy → `/earn` |
| `/earn` | authed | Quick Win #2 unified C2E |
| `/uzgfi` | authed | UZGFi member surface |
| `/admin/uzgfi` and 11 sub-routes (`/conversions`, `/treasury`, `/rewards`, `/credit`, `/audit`, `/marketplace`, `/reconciliation`, `/risk`, `/wallet`, `/wallet/withdrawals`, `/burn`) | admin | UZGFi admin |

**Total: 18 routes**

#### Components used

- `wallet/` — 20 files (largest component dir — wallet panels, transfer flows, asset cards, transaction detail rows, convert form, etc.)
- `uzgfi/` — 5 files (member-side UZGFi panels)
- `uzgfi-admin/` — 12 files (admin-side ops dashboards)
- `earn/` — 1 file (`ConnectToEarnDashboard.jsx` — Quick Win #2)

#### Database tables

- Wallet: `wallet_*`, `wallet_transactions`, `wallet_balances_view`
- U token: `u_balances`, `u_earnings_ledger`, `u_conversion_quotes`, `u_conversion_history`
- UZGFi: `uzgfi_treasury`, `uzgfi_burn_log`, `uzgfi_conversion_orders`, `uzgfi_marketplace_listings`, `uzgfi_credit_lines`, `uzgfi_risk_signals`
- Reward V5: `reward_events`, `reward_owner_balances`, `reward_action_types` (14 canonical actions)

#### API endpoints

Many — major ones:

- `GET /api/v1/wallet`
- `POST /api/v1/wallet/transfer`
- `POST /api/v1/wallet/convert`
- `GET /api/v1/u-earnings`
- `GET /api/v1/u-convert/quote`
- `POST /api/v1/u-convert`
- `GET /api/v1/uzgfi/treasury`
- `POST /api/v1/uzgfi/burn`
- `GET /api/v1/reward/events`
- `POST /api/v1/reward/emit` (Edge Function)

#### Tier gating

- Wallet view: **all tiers**
- Transfer + Convert: **all tiers** (subject to KYC + risk signals)
- Earnings: **all tiers**
- UZGFi member surface: **all tiers** (read-only for explorer/seeker; some actions builder+)
- UZGFi admin: **admin-section `system`**

#### UX maturity

**MEDIUM for member surface, HIGH for admin.** Wallet member surface has the largest component count (20 files) and feels solid. However the URL structure is opinionated (`/wallet/transfer`, `/wallet/convert`, `/wallet/transfer/detail`) but the component is generic (`WalletPage` for all three) — mismatch (UX gap #G19). Asset detail and transaction detail pages are dedicated. Connect-to-Earn dashboard (Quick Win #2) is functional. UZGFi admin (12 components) is impressively complete — Master Audit §4 lists these as polished.

#### Known issues

- #G19 (P2) — Wallet sub-routes share generic `WalletPage` component
- #G13 (P1) — Earnings, U-system, U-convert UI feels disconnected from `/wallet` (separate URL roots, separate visual treatment)
- #G25 (P2) — Connect-to-Earn dashboard mock data flag unclear (Quick Win #2 LIVE but masking incomplete)

---

### §2.7 Module 7 — GOVERNANCE

**Status:** WIP · **UX maturity:** LOW (member) / MEDIUM (admin) · **Tier gating:** mostly admin-only

**Sub-systems:** Admin section gates · UZGFi compliance + audit · Membership + identity governance · (intentional: future proposals/voting per Whitepaper)

#### Routes mapped

| Route | Auth | Owner |
|---|---|---|
| `/admin` | admin | Governance home |
| `/admin/system` | admin | System governance |
| `/admin/aier`, `/admin/aitao` | admin | AIER governance |
| `/admin/business`, `/admin/membership`, `/admin/identity`, `/admin/platform` | admin (redirects) | Section gates → member surfaces |
| `/admin-private/aitao`, `/admin-private/aier-control`, `/admin-private/intelligence`, `/admin-private/wisdom`, `/admin-private/training` | admin-private | Private governance |
| `/admin/uzgfi/audit` | admin | Compliance audit |
| `/admin/uzgfi/risk` | admin | Risk governance |
| `/admin/uzgfi/reconciliation` | admin | Reconciliation governance |

**Total: 15 routes** (overlaps with Wallet for UZGFi admin)

#### Components used

- No dedicated `governance/` directory
- `uzgfi-admin/` — 12 files cover compliance/audit
- Admin pages built from `ui/` + `layout/` primitives

#### Database tables

- RBAC: `auth_user_admin_allowlist`, `admin_section_grants`
- Audit: `audit_log`, `aier_agent_decisions` (decision audit trail)
- (Future: `proposals`, `votes`, `delegations` — NOT IMPLEMENTED)

#### API endpoints

- `GET /api/v1/admin/allowlist/check`
- `GET /api/v1/admin/uzgfi/audit/log`
- `GET /api/v1/admin/uzgfi/reconciliation/state`

#### Tier gating

- Member-facing governance: **NONE** (no proposals UI)
- Admin governance: **admin only** via `<AdminGuard>`

#### UX maturity

**LOW for member, MEDIUM for admin.** Whitepaper §4.2 describes Governance as "proposals, voting, decentralised coordination" — V2 implements **only the admin/RBAC half**. There is **NO member-facing proposals or voting surface**. This is a major Whitepaper-vs-V2 gap (UX gap #G04, P0).

#### Known issues

- #G04 (P0) — No member-facing governance UI (proposals/voting/delegation per Whitepaper §4.2 are not implemented)
- #G16 (P1) — Several `/admin/*` routes redirect to member surfaces (`/admin/business` → `/circles`, `/admin/membership` → `/membership`, `/admin/identity` → `/profile`) — admin context lost
- #G17 (P2) — All admin routes are desktop-only (no responsive treatment per Master Audit)

---

## §3 Summary table — 7 modules vs production reality

| # | Module | Status | UX maturity | Routes | Components | DB tables | Major UX gaps |
|---|---|---|---|---:|---:|---:|---|
| 1 | Identity | LIVE | MEDIUM | 16 | 30+ | ~12 | G01, G02, G03, G15, G27, G29 |
| 2 | Community | LIVE | MEDIUM-HIGH | 26 | 50+ | ~25 | G07, G14, G18, G19, G31 |
| 3 | Wisdom AI | WIP (member) / LIVE (admin) | LOW / HIGH | 12 | 6 | ~10 | G06, G10, G11 |
| 4 | Retreat | WIP | LOW | 3 | 0 | ~4 | G20, G21, G12 |
| 5 | Marketplace | WIP | LOW | 3 | 5 | ~3 | G22, G23, G06 |
| 6 | Wallet | LIVE | MEDIUM / HIGH | 18 | 38 | ~30 | G13, G25 |
| 7 | Governance | WIP | LOW / MEDIUM | 15 | 12 | ~5 | G04, G16, G17 |

> **Total of distinct routes covered:** 93 (some are shared across modules — e.g. `/community` overlaps Identity + Community). 79 unique pages. ~141 component files.

---

## §4 Cross-cutting infrastructure not in any single module

These show up in production but don't map cleanly to one Whitepaper module:

| Surface | Whitepaper alignment | Where in V2 |
|---|---|---|
| Notifications (`/notifications`) | Cross-cutting (mentioned in Identity + Community) | `notifications/` table, `NotificationsPage` |
| Search (`/search`) | Cross-cutting | `SearchPage` (universal search across entities) |
| Settings (`/settings`) | Identity (account-level) | `SettingsPage` |
| Help (`/help`) | None | UNMOUNTED — `HelpPage.jsx` exists but route is redirect-only |
| Compose (`/compose`) | Community (Flow/Plus) | `PlusPage` |
| Quantum Social (`/social-brain`) | Community → Quantum Network | LIVE (Quick Win #1, mock data) |
| QOT (`/qot/*`) | Identity + Community truth substrate | LIVE |

---

## §5 Implementation status per Reconciliation §5

Per `CANON_V2_RECONCILIATION_PROPOSAL.md` §5, V2 implementation status by category:

| Category | Status | Module mapping |
|---|---|---|
| ENTA Identity (canonical) | PRESENT | Identity |
| Membership 4-tier catalog | PRESENT (DEC-04) | Identity |
| Flow + Connect + Chat | PRESENT | Community |
| Wallet + UZGFi | PRESENT | Wallet |
| AIER Mint + Marketplace | PRESENT (member WIP, admin LIVE) | Wisdom AI |
| QOT MVP | PRESENT (Quick Win #3) | Identity / Community |
| Connect-to-Earn unified | PRESENT (Quick Win #2) | Wallet |
| Quantum Social user UI | MOCK (Quick Win #1, Lane_04 backend WIP) | Community |
| Retreat | WIP | Retreat |
| General Marketplace (courses/workshops) | MISSING | Marketplace |
| Member governance (proposals/votes) | MISSING | Governance |
| ENTA public profiles | MISSING (canon-vs-impl) | Identity |
| 404 page | MISSING | Cross-cutting |
| Help surface | MISSING (page file unmounted) | Cross-cutting |

---

## §6 Component inventory by directory

```
apps/uzg-pwa/src/components/
├── activation/      1 file   — activation banner
├── ai/              1 file   — AI inline UI
├── aier/            5 files  — AIER cards, mint, ownership
├── auth/            3 files  — RouteGuard, AdminGuard, etc.
├── chat/            5 files  — chat surfaces
├── comment/         1 file   — comment thread
├── community/      11 files  — community hub, surface cards
├── core/            1 file   — core primitive
├── earn/            1 file   — ConnectToEarnDashboard (QW2)
├── enta/           10 files  — ENTA cards, identity, actions
├── feed/            4 files  — feed primitives
├── flow/            5 files  — flow post + composer
├── layout/         11 files  — page layout primitives
├── membership/      3 files  — Upgrade + Catalog panels
├── navigation/      3 files  — top-bar, drawer, mobile-nav
├── post/            2 files  — post detail, post card
├── profile/         3 files  — profile editor + boundary
├── qot/             1 file   — QotUserTrailPanel (QW3)
├── realtime/        3 files  — presence, typing, live cursors
├── resonance/       6 files  — resonance score widgets
├── social/          1 file   — QuantumSocialDashboard (QW1)
├── ui/              8 files  — InfoCard, StatusBadge, primitives
├── uzgfi/           5 files  — member UZGFi panels
├── uzgfi-admin/    12 files  — admin UZGFi ops
└── wallet/         20 files  — wallet UI (largest dir)
TOTAL: ~141 component files across 25 dirs

apps/udna-public/src/components/
├── GatewayLayout.jsx   — public layout shell
├── SectionCard.jsx     — S1–S8 section cards
└── ClaimList.jsx       — public claims list
TOTAL: 3 files (instant-render, no Suspense)
```

---

## §7 Key observations for V3 redesign

These are summaries — full V3 priorities live in `UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md` §8.

1. **Marketplace module is a structural gap.** Whitepaper §4.2 names it but V2 only implements AIER marketplace. Course/workshop/service marketplace requires a V3 module from scratch.
2. **Retreat module is under-realised.** 3 routes, 0 components — needs a complete UX surface (browsing, booking, ticket management, post-retreat content).
3. **Member governance is missing.** Proposals + voting per Whitepaper §4.2 have no UI. V3 should add a governance module with `/governance/proposals`, `/governance/votes`, `/governance/delegate` surfaces.
4. **Public surfaces are dual-stack.** udna-public + main app create URL semantic collisions. V3 should unify visual language so the same URL doesn't render two different products.
5. **Quantum Social needs Lane_04 backend.** UI scaffolding in place (Quick Win #1) but data is mock — V3 redesign should ride on top of real Lane_04 backend when ready.
6. **Bilingual coverage is incomplete.** Thai is broken on login (G15, P0). EN/VN/FIL work; TH needs full string-pack pass.
7. **Mobile responsiveness for admin is missing.** All `/admin/*` and `/admin-private/*` are desktop-only. V3 should responsive-treat at least the most-used admin views.
8. **No 404 page + no Help page.** Two structural gaps; both routes silently redirect.

---

🔒 END Module Inventory v1.0
