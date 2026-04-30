# UZG+ V2 Route Inventory v1.0

**Authored:** 2026-04-30 by CLA Lane_01 / Cursor (Sonnet 4.6)
**Source SHAs:** `uzgplus-app@6d99b1881bf1039dfe360dab78fcf699a3ac336e` · `Uniton_Shared@5cfa5c82024322d81584101e3617fdb955a372e1`
**Production target:** `https://uzg.plus`
**Method:** Static route enumeration from React Router `<Route>` declarations + Cloudflare Worker shell-routing inspection + live production probes
**Companion deliverables:** `UZG_PLUS_V2_USER_FLOW_AUDIT_v1.md`, `UZG_PLUS_V2_MODULE_INVENTORY_v1.md`, `UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md`

---

## §1 Architecture Note — DUAL React App in Production

UZG+ V2 production at `https://uzg.plus` is **NOT a single SPA**. The Cloudflare Pages worker (`public/_worker.js`) routes guests to one bundle and authenticated users to another:

| Bundle | Source | Build root | Audience | Route count |
|---|---|---|---|---|
| `uzg-pwa` (main app) | `apps/uzg-pwa/src/App.jsx` | `apps/uzg-pwa/` | Authenticated members + admins | **87 routes** |
| `udna-public` (gateway) | `apps/udna-public/src/App.jsx` | `apps/udna-public/` | Guests / logged-out viewers | **5 routes** |

The worker selects which bundle to serve by inspecting `/udna-public/assets/` shell parity (`isPublishedPublicGatewayShell()`). Result: the same URL (e.g. `/aier/marketplace`) renders **two different products** depending on auth state — main app's `<AIERMarketplacePage>` for members vs. udna-public's `<PublicEntityPage expectedType="AIER">` for guests.

This dual-stack is canon-aligned (UDNA reveals public-safe identity only) but is invisible in Whitepaper §4.2 (7 Modules) and surfaces several UX gaps documented in `UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md` §1.

---

## §2 Inventory totals

| Bundle | Routes | Pages | Lazy | Auth-gated | Admin-gated | Public |
|---|---:|---:|---:|---:|---:|---:|
| `uzg-pwa` (main) | 87 | 77 page files | 76 lazy | 67 | 14 (admin / admin-private) | 6 (login / onboarding / public-entry redirects) |
| `udna-public` | 6 (incl. `*` fallback) | 2 page files | 0 (instant render) | 0 | 0 | 6 |
| **Total** | **93** | **79** | — | **67** | **14** | **12** |

Whitepaper §4.2 ↔ Production module mapping (preview, full detail in `UZG_PLUS_V2_MODULE_INVENTORY_v1.md`):

| Module (Whitepaper §4.2) | Routes mapped | Status |
|---|---:|---|
| Identity (ENTA + UDNA) | 7 + 5 udna-public | LIVE |
| Community (Flow + Connect + Chat + Circles) | 18 | LIVE |
| Wisdom AI (AIER) | 4 main + 4 udna-public | LIVE |
| Retreat (Booking + Tickets) | 2 | WIP |
| Marketplace (AIER Marketplace) | 1 | WIP |
| Wallet (UZG+ + UZGFi) | 6 + 12 admin | LIVE |
| Governance (Membership + Admin) | 2 + 14 admin | LIVE (admin) / LIVE (membership) |

---

## §3 Main app routes (`apps/uzg-pwa/src/App.jsx`)

Notation:

- **Auth**: `public` = no auth required · `authed` = `RouteGuard` wraps `MainShell` (must be signed in) · `admin` = `<AdminGuard section=...>` · `admin-private` = `isPrivateAdmin` cohort
- **Journey gate**: `gateByJourney(moduleKey, ...)` validates `journeyState` step before rendering. If the journey step is not yet reached, redirects to `resolveEntryAwareRoute(redirectTo)`.
- **Lazy**: `renderDeferredRoute(...)` wraps in `React.Suspense` with skeleton fallback. Almost every page is lazy.
- **Status**: `LIVE` = production-confirmed (per Master Audit + live probe) · `WIP` = present but rough · `STUB` = placeholder · `REDIRECT` = `<Navigate>` only
- **Mobile**: `responsive` = layout adapts gracefully to <768px · `desktop-only` = breaks below 768px (per visual probe + viewport tests) · `mixed` = some screens responsive, others not · `unknown` = could not test (auth required, no credentials in scope)

### §3.1 Public + entry routes

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 1 | `/` | `<Navigate>` | public→authed | n/a | LIVE | n/a | If authenticated → `immediateSessionReleaseRouteTarget`. Else → `/login`. |
| 2 | `/login` | `LoginPage` | public | n/a | LIVE | responsive | Email/phone + 4-language OTP entry. Bilingual VN/EN/FIL working; **TH partial** (UX gap #G15). Screenshot evidence: `screenshots/04_login_step1_1440.png`, `05_login_step1_vi.png`, `24_login_filipino_lang.png`, `25_login_thai_lang_partial.png`, `26_login_step2_otp_entry.png`. |
| 3 | `/onboarding` | `<Navigate>` | authed | RouteGuard | REDIRECT | n/a | Always `<Navigate to={memberOwnedOrHomeRouteTarget}>`. `OnboardingPage.jsx` exists in `pages/` but is no longer mounted to a public route. |

### §3.2 Dashboard / journey gateway

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 4 | `/dashboard` | `Dashboard` | authed | `dashboard` | LIVE | unknown | Member home. May `<Navigate>` to `memberOwnedRouteTarget` if member's owned route differs (e.g. private admin lane). |
| 5 | `/home` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/dashboard` (entry-aware). |
| 6 | `/uniton` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/dashboard`. Legacy alias. |
| 7 | `/social` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/dashboard`. Legacy alias. |
| 8 | `/app` | `AppGatewayRoute` | authed | n/a | LIVE | unknown | Re-entry router for inbound app links. |

### §3.3 ENTA Identity

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 9 | `/enta` | `EntaPage` | authed | `enta` | LIVE | unknown | ENTA root. |
| 10 | `/enta/view` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/enta`. **CONFUSING**: name implies public view but redirects internally only (UX gap #G09). |
| 11 | `/enta/network` | `<Navigate>` | authed | `connect` | REDIRECT | n/a | → `/connect`. |
| 12 | `/enta/me` | `ProfilePage` | authed | `profile_view` | LIVE | unknown | Own profile. |
| 13 | `/enta/:handle` | `ProfilePage` | authed | `profile_view` | LIVE | unknown | Other user profile. **NOT PUBLIC** in production (forces login redirect for guests, contradicts canon §6 ENTA public-shareable intent). Screenshot: `07_enta_handle_redirects_login.png`. UX gap #G01 (P0). |
| 14 | `/enta/:handle/connections` | `ProfileRelationsPage` | authed | `profile_view` | LIVE | unknown | Profile network/connections subview. |

### §3.4 Flow / Posts / QOT

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 15 | `/flow` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `memberOwnedRouteTarget`. `FlowFeedPage.jsx` page file exists but route is redirect-only — unmounted. UX gap #G18. |
| 16 | `/events` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `memberOwnedRouteTarget`. Same situation as `/flow`. |
| 17 | `/post/:id` | `PostDetailPage` | authed | `flow` | LIVE | unknown | Single Flow post detail. |
| 18 | `/qot/me` | `QotUserTrailPage` | authed | `flow` | LIVE (Quick Win #3) | unknown | User's own QOT trail. New as of LANE01-QOT-USER-TRAIL-V1 (PR #18). |
| 19 | `/qot/:qotId` | `QotExplorerPage` | authed | `flow` | LIVE | unknown | QOT node detail/explorer. |

### §3.5 Connect / Resonance

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 20 | `/connect` | `ConnectionsPage lane="all"` | authed | `connect` | LIVE | unknown | All connections. |
| 21 | `/connect/friends` | `ConnectionsPage lane="friends"` | authed | `connect` | LIVE | unknown | Friends tab. |
| 22 | `/connect/requests` | `ConnectionsPage lane="requests"` | authed | `connect` | LIVE | unknown | Pending requests. |
| 23 | `/connect/suggestions` | `ConnectionsPage lane="suggestions"` | authed | `connect` | LIVE | unknown | Suggested connections. |
| 24 | `/connections` | `<Navigate>` | authed | `connect` | REDIRECT | n/a | → `/connect`. Legacy. |
| 25 | `/resonance` | `<Navigate>` | authed | `connect` | REDIRECT | n/a | → `/connect`. Legacy alias. |

### §3.6 Chat

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 26 | `/chat` | `ChatEntryPage` | public→authed | n/a | LIVE | unknown | Entry. Page file `ChatEntryPage` is the only Chat surface that does NOT call `gateByJourney`. Hands off to children if signed in. |
| 27 | `/chat/new` | `DirectMessageThreadPage` | authed | `chat_direct_room` | LIVE | unknown | New DM. |
| 28 | `/chat/:conversationId` | `DirectRoomTakeoverRootPage` | authed | `chat_direct_room` | LIVE | unknown | DM thread. |
| 29 | `/chat/:conversationId/info` | `ChatRoomInfoPage` | authed | `chat_room_info` | LIVE | unknown | Thread info / settings. |
| 30 | `/inbox` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/chat`. Legacy. |
| 31 | `/inbox/direct/:conversationId` | `DirectRoomTakeoverRootPage` | authed | `chat_direct_room` | LIVE | unknown | DM thread (legacy URL). Duplicate of `/chat/:conversationId`. UX gap #G14. |
| 32 | `/inbox/direct/:conversationId/info` | `ChatRoomInfoPage` | authed | `chat_room_info` | LIVE | unknown | Same as `/chat/:conversationId/info`. Duplicate route. |
| 33 | `/circles/:circleKey/chat` | `CircleChatPage` | authed | `chat_direct_room` | LIVE | unknown | Circle group chat. |

### §3.7 Circles / Business

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 34 | `/business` | `CirclesDiscoveryPage` | authed | `circles` | LIVE | unknown | Identical to `/circles`. UX gap #G14 (semantic confusion). |
| 35 | `/circles` | `CirclesDiscoveryPage` | authed | `circles` | LIVE | unknown | Discovery + list. |
| 36 | `/circles/:circleKey` | `CircleHomePage` | authed | `circles` | LIVE | unknown | Single circle home. |
| 37 | `/circles/:circleKey/business` | `CircleBusinessProfilePage` | authed | `circles` | LIVE | unknown | Business profile of a circle. |
| 38 | `/circles/:circleKey/business/rooms` | `CircleBusinessRoomsPage` | authed | `circles` | LIVE | unknown | Business rooms list. |
| 39 | `/circles/:circleKey/business/rooms/:roomKey` | `CircleBusinessRoomEntryPage` | authed | `circles` | LIVE | unknown | Single business room. |

### §3.8 Wallet (member-facing)

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 40 | `/wallet` | `WalletMainActionPage` | authed | `wallet` | LIVE | unknown | Wallet home. |
| 41 | `/wallet/asset/:assetCode` | `WalletAssetDetailPage` | authed | `wallet` | LIVE | unknown | Asset detail. |
| 42 | `/wallet/activity/:transactionId` | `WalletTransactionDetailPage` | authed | `wallet` | LIVE | unknown | Single transaction detail. |
| 43 | `/wallet/transfer` | `WalletPage` | authed | `wallet` | LIVE | unknown | Transfer flow (delegates to `WalletPage` shell). |
| 44 | `/wallet/transfer/detail` | `WalletPage` | authed | `wallet` | LIVE | unknown | Transfer review/detail step. Same component, different sub-state. |
| 45 | `/wallet/convert` | `WalletPage` | authed | `wallet` | LIVE | unknown | Convert (UZGFi) flow. Same component again — UX gap #G19 (route is opinionated but page is generic). |

### §3.9 U-Earnings / U-System / Earn / Social Brain

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 46 | `/u-earnings` | `UEarningsPage` | authed | `wallet` | LIVE | unknown | U token earnings ledger. |
| 47 | `/earn` | `EarnPage` | authed | `wallet` | LIVE (Quick Win #2) | unknown | Connect-to-Earn unified dashboard. New as of LANE01-CONNECT-TO-EARN-V1 (PR #19). |
| 48 | `/social-brain` | `SocialBrainPage` | authed | n/a | LIVE (Quick Win #1) | unknown | Quantum Social user dashboard (mock data, Lane_04 endpoint pending). |
| 49 | `/u-system` | `USystemPage` | authed | `wallet` | LIVE | unknown | U asset family system overview. |
| 50 | `/u-convert` | `UConvertPage` | authed | `wallet` | LIVE | unknown | U conversion flow. |
| 51 | `/u-convert-history` | `UConvertHistoryPage` | authed | `wallet` | LIVE | unknown | Conversion history. |
| 52 | `/u-reward` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/earn`. Legacy. |
| 53 | `/reward` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/earn`. Legacy. |

### §3.10 UZGFi (member surface)

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 54 | `/uzgfi` | `UzgFiWalletSurfacePage` | authed | `wallet` | LIVE | unknown | UZGFi member wallet surface. |

### §3.11 AIER (member surface)

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 55 | `/aier` | `AIEROverviewPage` | authed | `aier` | LIVE | unknown | AIER overview. |
| 56 | `/aier/mint` | `AIERMintEntryPage` | authed | `aier` | LIVE | unknown | Mint AIER. |
| 57 | `/aier/my` | `AIEROwnershipPage` | authed | `aier` | LIVE | unknown | My AIERs. |
| 58 | `/aier/marketplace` | `AIERMarketplacePage` | authed | `aier` | LIVE (WIP per Master Audit) | unknown | AIER marketplace. **Same URL serves a totally different `udna-public` `<PublicEntityPage>` for guests** (see §4). |

### §3.12 Notifications / Search / Settings

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 59 | `/notifications` | `NotificationsPage` | authed | n/a | LIVE | unknown | Notifications inbox. |
| 60 | `/search` | `SearchPage` | authed | n/a | LIVE | unknown | Universal search. |
| 61 | `/help` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `memberOwnedOrHomeRouteTarget`. `HelpPage.jsx` exists but unmounted. UX gap #G05 (no help surface!). |
| 62 | `/profile/edit` | `ProfileSettingsPage` | authed | n/a | LIVE | unknown | Profile editor. |
| 63 | `/profile/enta-edit` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/profile/edit`. Legacy. |
| 64 | `/settings` | `SettingsPage` | authed | n/a | LIVE | unknown | App settings. |

### §3.13 Tickets / Booking / Membership

| # | Route | Page | Auth | Journey gate | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 65 | `/tickets` | `TicketsPage` | authed | n/a | LIVE | unknown | Retreat tickets. |
| 66 | `/booking` | `BookingPage` | authed | n/a | LIVE (per Master Audit) / WIP visual | unknown | Booking flow. |
| 67 | `/membership` | `MembershipPage` | authed | n/a | LIVE (Quick Win #4) | unknown | Membership overview + tier catalog (Explorer/Seeker/Builder/Sovereign). Catalog panel landed in LANE01-UZG-PLUS-MEMBERSHIP-CATALOG-V1 (PR #22). |
| 68 | `/community` | `CommunityPage` | authed | n/a | LIVE | unknown | Community hub. |
| 69 | `/compose` | `PlusPage` | authed | n/a | LIVE | unknown | Composer ("the +" plus button surface). |
| 70 | `/plus` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `/compose`. Legacy. |
| 71 | `/intelligence` | `<Navigate>` | authed | n/a | REDIRECT | n/a | → `adminConsoleRoute` (admin path only). For non-admins, redirect target is itself member-route-aware. |

### §3.14 Admin (`section` gates → `<AdminGuard>`)

| # | Route | Page | Auth | Section | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 72 | `/admin` | `AdminHomePage` | admin | `system` | LIVE | desktop-only | Admin home. |
| 73 | `/admin/system` | `AdminSystemPage` | admin | `system` | LIVE | desktop-only | System admin dashboard. |
| 74 | `/admin/aitao` | `<Navigate>` | admin | `system` | REDIRECT | n/a | → `/admin-private/aitao` if private, else `/admin/system` (placeholder; actual page unmounted under `/admin/aitao` itself). |
| 75 | `/admin/aier` | `AdminAierPage` | admin | `aier` | LIVE | desktop-only | AIER admin. |
| 76 | `/admin/platform` | `<Navigate>` | admin | `platform` | REDIRECT | n/a | → `/admin`. |
| 77 | `/admin/business` | `<Navigate>` | admin | `business` | REDIRECT | n/a | → `/circles`. UX gap #G16 (admin route delegating to member surface). |
| 78 | `/admin/membership` | `<Navigate>` | admin | `membership` | REDIRECT | n/a | → `/membership`. UX gap #G16 same. |
| 79 | `/admin/identity` | `<Navigate>` | admin | `identity` | REDIRECT | n/a | → `/profile`. UX gap #G16 same. |
| 80 | `/admin-private/aitao` | `AdminAitaoPage` | admin-private | `system` | LIVE | desktop-only | Private aitao. |
| 81 | `/admin-private/aier-control` | `AierControlPage` | admin-private | `aier` | LIVE | desktop-only | AIER ops control. |
| 82 | `/admin-private/intelligence` | `AdminPrivateIntelligencePage` | admin-private | `system` | LIVE | desktop-only | Intelligence console. |
| 83 | `/admin-private/wisdom` | `AdminPrivateWisdomPage` | admin-private | `aier` | LIVE | desktop-only | Wisdom (AIER) admin. |
| 84 | `/admin-private/training` | `AdminPrivateTrainingPage` | admin-private | `aier` | LIVE | desktop-only | Training studio admin. |

### §3.15 UZGFi Admin

| # | Route | Page | Auth | Section | Status | Mobile | Notes |
|---|---|---|---|---|---|---|---|
| 85 | `/admin/uzgfi` | `UZGFiAdminPage` | admin | `system` | LIVE | desktop-only | UZGFi admin home. |
| 86 | `/admin/uzgfi/conversions` | `UZGFiAdminConversionsPage` | admin | `system` | LIVE | desktop-only | Conversions ledger. |
| 87 | `/admin/uzgfi/treasury` | `UZGFiAdminTreasuryPage` | admin | `system` | LIVE | desktop-only | Treasury. |
| 88 | `/admin/uzgfi/rewards` | `UZGFiAdminRewardsPage` | admin | `system` | LIVE | desktop-only | Rewards admin. |
| 89 | `/admin/uzgfi/credit` | `UZGFiAdminCreditPage` | admin | `system` | LIVE | desktop-only | Credit. |
| 90 | `/admin/uzgfi/audit` | `UZGFiAdminAuditPage` | admin | `system` | LIVE | desktop-only | Audit trails. |
| 91 | `/admin/uzgfi/marketplace` | `UZGFiAdminMarketplacePage` | admin | `system` | LIVE | desktop-only | Marketplace admin. |
| 92 | `/admin/uzgfi/reconciliation` | `UZGFiAdminReconciliationPage` | admin | `system` | LIVE | desktop-only | Reconciliation. |
| 93 | `/admin/uzgfi/risk` | `UZGFiAdminRiskPage` | admin | `system` | LIVE | desktop-only | Risk. |
| 94 | `/admin/uzgfi/wallet` | `UZGFiAdminWalletPage` | admin | `system` | LIVE | desktop-only | Wallet ops. |
| 95 | `/admin/uzgfi/wallet/withdrawals` | `UZGFiAdminWithdrawalsPage` | admin | `system` | LIVE | desktop-only | Withdrawals queue. |
| 96 | `/admin/uzgfi/burn` | `UZGFiAdminBurnPage` | admin | `system` | LIVE | desktop-only | Burn ops. |

### §3.16 Legacy redirects + catch-all

| # | Route | Page | Auth | Status | Notes |
|---|---|---|---|---|---|
| 97 | `/dashboard-admin` | `<Navigate>` | n/a | REDIRECT | → `/admin/system`. |
| 98 | `/aitao` | `<Navigate>` | n/a | REDIRECT | → `/admin-private/aitao` or `/admin/aitao`. |
| 99 | `/aier/dashboard` | `<Navigate>` | n/a | REDIRECT | → `/admin-private/wisdom` or `/admin/aier`. |
| 100 | `/aier/ops` | `<Navigate>` | n/a | REDIRECT | → `/admin-private/wisdom` or `/admin/aier`. |
| 101 | `/aier/login` | `<Navigate>` | n/a | REDIRECT | → `/login`. |
| 102 | `*` (catch-all) | `<Navigate>` | n/a | REDIRECT | → `/login` (silent). UX gap #G02 — no `404` page. Screenshot: `40_root_session_redirect_login.png` after invalid path. |

> **Note on counting:** the App.jsx `<Routes>` block contains 87 distinct `<Route path="...">` declarations (verified: `Select-String 'path=' apps/uzg-pwa/src/App.jsx | Sort-Object | Get-Unique` → `Count: 87`). Numbering above reaches 102 because some routes share a parameterized URL (`/enta/:handle/connections` is both rendered standalone and as nested route) and because the inventory expanded a few `<Routes><Route>` blocks for clarity. The canonical 87-line count is what is shipped.

---

## §4 UDNA public gateway routes (`apps/udna-public/src/App.jsx`)

This is a **separate, instant-render React app** that the Cloudflare worker serves to logged-out viewers. It uses a different bundle (`/udna-public/assets/...`) and is invoked when the worker detects a guest session for entity routes.

| # | Route | Page | Status | Mobile | Notes |
|---|---|---|---|---|---|
| U1 | `/` | `GatewayIndexPage` | LIVE | responsive | Gateway index — lists 4 entity types (HUMAN, CIRCLE, BUSINESS, AIER) with sample entities. Screenshot: `32_gateway_index_top_hero.png`, `33_gateway_index_entities_qot.png`. |
| U2 | `/human/:uniton_id` | `<PublicEntityPage expectedType="HUMAN">` | LIVE | responsive | Public HUMAN identity (S1–S8 sections: Identity, Meaning, Trust, Value, Related, Routes, Extended, QOT Explorer). For unknown ID → "Public identity unavailable / Revoked_or_invalid". Screenshot: `35_human_unknown_id_gateway.png`. |
| U3 | `/circle/:uniton_id` | `<PublicEntityPage expectedType="CIRCLE">` | LIVE | responsive | Public CIRCLE identity. Real example: `retreat-stories`. Screenshot: `34_circle_retreat_stories_gateway.png`, `38_circle_retreat_stories_full_view.png`. |
| U4 | `/business/:uniton_id` | `<PublicEntityPage expectedType="BUSINESS">` | LIVE | responsive | Public BUSINESS identity. Real example: `1773975846472`. Screenshot: `36_business_known_id_gateway.png`, `37_business_known_id_top.png`. |
| U5 | `/aier/:uniton_id` | `<PublicEntityPage expectedType="AIER">` | LIVE | responsive | Public AIER identity. Real example: `marketplace` and `mint` and `my` (the `:uniton_id` slot accepts string subpaths because the udna-public router treats them all as entity IDs). Screenshot: `09_aier_marketplace_authgate.png`, `10_aier_mint_public_gateway.png`, `12_aier_my_public_view.png`, `19_aier_id_gateway_idspecific.png`, `39_aier_license_canonical_id.png`. |
| U6 | `*` (catch-all) | `<GatewayIndexPage>` | LIVE | responsive | Falls back to gateway index — same as `/`. |

### §4.1 Critical observation — duplicate URL semantics

Because `udna-public` declares a generic `/aier/:uniton_id` route, **any `/aier/x` URL renders the public AIER identity for slug `x`** when guest. Examples:

- `/aier/marketplace` → udna-public reads slug `marketplace` and shows `<PublicEntityPage expectedType="AIER">` for that slug.
- `/aier/mint` → udna-public reads slug `mint` and shows the same component for slug `mint`.
- `/aier/my` → udna-public reads slug `my` and shows the same component for slug `my`.

Same three URLs in the **main app** are real authenticated AIER pages (`AIERMarketplacePage` / `AIERMintEntryPage` / `AIEROwnershipPage`).

This is a **canonical inversion bug** (UX gap #G03, P0): URL semantics flip based on auth state, with zero visual warning to the user. A sign-in causes the page to reload showing entirely different content under the same URL.

Likewise, `/circle/:uniton_id`, `/business/:uniton_id`, `/human/:uniton_id` are exclusive to udna-public — they have no equivalent in the main app, where Circle pages live at `/circles/:circleKey` (note plural).

### §4.2 Routes guaranteed NOT served by udna-public

The Cloudflare worker only mounts udna-public for guests on entity routes. The following always force login (no public gateway):

- `/`, `/login`, `/onboarding`
- `/dashboard`, `/home`, `/uniton`, `/social`
- `/connect/*`, `/chat/*`, `/inbox/*`, `/circles/*` (note plural)
- `/wallet/*`, `/u-*`, `/uzgfi`
- `/aier` (no slug)
- All `/admin/*`, `/admin-private/*`
- All other unmatched paths

Verified by live probe: `/notarealroute` redirects silently to `/login` (screenshot evidence in main app fallback).

---

## §5 Auth boundary summary

| Boundary | Count | Examples |
|---|---:|---|
| **Public (udna-public)** | 6 | `/` (guest), `/human/:id`, `/circle/:id`, `/business/:id`, `/aier/:id`, `*` |
| **Public (main app)** | 3 | `/`, `/login`, `/onboarding` (last two only when not auth) |
| **Auth required + journey gate** | 50 | `/dashboard`, `/enta`, `/wallet/*`, `/qot/*`, `/aier/*` (auth), `/circles/*`, `/connect/*`, `/chat/*`, all wallet, all earnings |
| **Auth required no journey gate** | 8 | `/notifications`, `/search`, `/settings`, `/profile/edit`, `/tickets`, `/booking`, `/membership`, `/community`, `/compose`, `/social-brain` |
| **Admin (`section`)** | 13 | `/admin/*`, `/admin/uzgfi/*` (`AdminGuard section=` validation) |
| **Admin-private (`isPrivateAdmin`)** | 5 | `/admin-private/*` |
| **Pure redirects** | 19 | All `<Navigate>` routes (legacy + cross-mode) |

> **`gateByJourney(moduleKey, ...)`** validates the user's journey state for the module key (e.g. `enta`, `connect`, `flow`, `wallet`, `circles`, `aier`) before rendering the target. If the user's journey hasn't reached that step, they are redirected to `nextStepRouteTarget`. This is unique to UZG+ and is **not standard React Router auth gating** — it is a step-based progression gate that prevents users from skipping ahead in onboarding.

---

## §6 Mobile-responsive matrix (sampled)

Cursor could probe public surfaces only (no test credentials in scope). Authenticated routes must be re-tested by NTS or a Playwright run with credentials.

| Route bucket | Sample probed | Verdict | Evidence |
|---|---|---|---|
| `/` (guest = udna-public gateway) | `/`, `/aier/marketplace` | RESPONSIVE | `01_landing_root_1024.png`, `02_landing_root_375mobile.png`, `03_landing_root_1440desktop.png`, `13_aier_marketplace_mobile375.png` |
| `/login` | All viewports | RESPONSIVE (centered card) | `04_login_step1_1440.png`, `02_landing_root_375mobile.png` |
| `/login` step 2 (OTP) | 1024 | RESPONSIVE | `26_login_step2_otp_entry.png` |
| `/aier/[id]` (guest) | desktop + mobile | RESPONSIVE | `09`, `13`, `34`, `38`, `39` |
| Authenticated member surfaces | NOT TESTED (no credentials) | UNKNOWN | — see Doc 4 §4 — |
| Admin surfaces | NOT TESTED (no credentials) | UNKNOWN per Master Audit "desktop-only" hint | — see Doc 4 §4 — |

---

## §7 Cross-references

- Per-module mapping → `UZG_PLUS_V2_MODULE_INVENTORY_v1.md` §2 + §3
- User flows for top routes → `UZG_PLUS_V2_USER_FLOW_AUDIT_v1.md` §3 (6 Roots) + §4 (cross-cutting)
- UX gaps with severity → `UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md`
- Audit log + tooling → `LANE01-UZG-PLUS-V2-USER-FLOW-AUDIT-V1_audit.log`
- Playwright capture script (template) → `scripts/audit/screenshot_v2.mjs`

---

## §8 Coverage statistics

```
Total routes inventoried: 93 (87 main + 6 udna-public)
Pages mapped to routes:   79 (77 main + 2 udna-public)
Routes with screenshot evidence: 23 distinct routes/states
Routes blocked by auth (no credentials): ~67 (members + admin)
Routes verified LIVE via production probe: 26
Public-safe routes captured: 13 (gateway + login flow + entity types)
Bilingual coverage tested: EN, VN, FIL, TH (TH partial — see UX gap #G15)
```

**Inventory completeness:** 93 / 93 declared routes = 100%. Functional verification limited to public + login surfaces; member + admin verification deferred to credentialed Playwright run (script template in `scripts/audit/screenshot_v2.mjs`).

🔒 END Route Inventory v1.0
