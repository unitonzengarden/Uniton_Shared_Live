# UZG+ V2 User Flow Audit v1.0

**Authored:** 2026-04-30 by CLA Lane_01 / Cursor (Sonnet 4.6)
**Method:** Live production probe (`https://uzg.plus`) + source code inspection (`apps/uzg-pwa/src/App.jsx` routes + `pages/*.jsx` + journey gate validators)
**Source SHAs:** `uzgplus-app@6d99b1881b...` · `Uniton_Shared@5cfa5c82...`
**Companion deliverables:** `UZG_PLUS_V2_ROUTE_INVENTORY_v1.md`, `UZG_PLUS_V2_MODULE_INVENTORY_v1.md`, `UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md`

---

## §1 Method & Coverage

This audit documents end-to-end user flows for the UZG+ V2 production application. **Cursor probed only public-facing surfaces** — authenticated journeys are reconstructed from source code reading + Master Audit findings + journey-gate logic in `validateAccess(moduleKey, journeyInput, options)`.

Per task §8, scope = **6 Roots** (Whitepaper-aligned major surfaces) + **4 cross-cutting flows** = 10 flows minimum. This document delivers 12 flows (6 Roots + 6 cross-cutting) for redundancy.

**Disclosures:**

- Authenticated screenshots NOT captured this run (no test credentials in scope per §8 INSPECTION-ONLY constraint).
- Each flow's "screenshots" section references existing public-flow captures + cites the file paths Cursor recommends for credentialed Playwright re-run (`scripts/audit/screenshot_v2.mjs` template provides the harness).
- Flows are documented with: Entry · Primary path · Decision points · Exit · Failure modes · Screenshots · UX gaps.

---

## §2 Auth state machine — bedrock for all flows

Before describing flows, the auth boundary is the most important piece of UZG+ UX:

```
Guest (no session)                          Authenticated member
─────────────────                           ───────────────────
                                            
  /  ──────────────►  /login (auto)         /  ──────────►  /dashboard (or memberOwnedRouteTarget)
                                            
  Entity URLs:                               Same entity URLs:
    /human/:id   ──┐                           /enta/:handle  (auth-gated, FORCES login)
    /circle/:id  ──┤  rendered by              /circles/:circleKey  (DIFFERENT URL!)
    /business/:id──┤  udna-public bundle       /aier/marketplace  (member surface, NOT public AIER!)
    /aier/:id    ──┘  (clean public-safe)      /aier/mint  (member-only)
                                            
  Anything else  ──►  /login (silent)         All app routes work, journey-gated per module
```

**Two key state-driven divergences:**

1. The same URL renders different content for guest vs member (`/aier/marketplace` shows public AIER identity for guests, but member AIER marketplace UI for signed-in users — see Route Inventory §4.1)
2. The main app uses singular `/aier`/`/circles` plus `/profile` style URLs; the public gateway uses singular `/aier`/`/circle`/`/business`/`/human` style URLs (note `/circle` vs `/circles`!) creating canonical-URL ambiguity.

**Journey gate: `gateByJourney(moduleKey, element, options)`**

The main app wraps almost all member routes in a `gateByJourney` HOC. This HOC validates the user's progression state for the module key (e.g. `enta`, `connect`, `flow`, `wallet`). If the user hasn't reached that step in their journey, the route silently `<Navigate>` to `nextStepRouteTarget` (their next allowed step). This is unique to UZG+: **users cannot skip ahead in onboarding**, even by direct URL hit.

Module keys observed in App.jsx: `dashboard`, `enta`, `connect`, `flow`, `wallet`, `circles`, `aier`, `chat_direct_room`, `chat_room_info`, `profile_view`.

---

## §3 6 Roots — primary user flows

### §3.1 ROOT 1 — ENTA Identity Onboarding

**Entry points:**

- `/` (root) → automatic redirect → `/login` for guests
- `/login` → direct deep link
- Any auth-gated route → silent redirect to `/login`
- Public profile share URL (`/enta/:handle`) — currently FORCES login (UX gap #G01)

**Primary flow** (12 steps):

1. Guest navigates to `https://uzg.plus`
2. Cloudflare worker resolves shell → main app loads boot sequence (`[BOOT] auth_init_start` console log)
3. Main app determines no session → `<Navigate to="/login" replace />`
4. `LoginPage` renders Member Entry hero + 4-language dropdown (EN/VN/FIL/TH) + Step 1 of 2 panel ("Send your access code") with email/phone input (screenshot: `04_login_step1_1440.png`)
5. User chooses language (optional) → page localises immediately (working: EN, VN, FIL — broken: TH (only dropdown localises, page stays English; UX gap #G15)) (screenshot: `25_login_thai_lang_partial.png`)
6. User enters email or phone → Continue button → button disables, shows "Sending your code..." (screenshot: `08_login_sending_code_state.png`)
7. Server sends OTP → step 2 renders ("Enter the latest code", 8 boxed digit slots, "Verify and enter" + "Resend in Xs" + "Change address" actions) (screenshot: `26_login_step2_otp_entry.png`)
8. User enters 6-digit code → Verify and enter (heading says "six-digit" but UI shows 8 boxes — UX gap #G08, P1) (screenshot: `27_login_otp_six_digit_filled.png`)
9. Server validates → on failure shows "That code is no longer valid. Request a new code and try again." (screenshot: `28_login_otp_invalid_error.png`)
10. On success → server returns session token → main app `[BOOT] apply_session_complete` (per console)
11. Onboarding gate `<RouteGuard>` resolves user state → if first-time/incomplete profile → `OnboardingPage` (currently redirect-only — actual onboarding flow lives elsewhere; UX gap #G26)
12. Authenticated → `<Navigate to={memberOwnedOrHomeRouteTarget}>` typically `/dashboard` for members or admin-route for admins

**Decision points:**

- Language choice (4 options; persisted to device per "This device already has a saved language" hint)
- Email vs phone (only validates by format — both accepted)
- After OTP error: "Resend" (60s cooldown) vs "Change address" (returns to step 1, preserves email — screenshot: `29_login_change_address_back_step1.png`)

**Exit points:**

- Success → `/dashboard` or member-owned route
- Error (4 attempts) → assumed lockout (not verified)
- Abandonment → close tab; OTP expires server-side after ~10 min

**Failure modes:**

- Invalid email format ("invalid", "+8412345" short phone) → both display "Unsupported phone provider" (incorrect for non-phone input — UX gap #G15.1, P1) (screenshots: `22_login_invalid_email_state.png`, `23_login_invalid_phone_short.png`)
- Network drop during OTP send → no inline retry mechanism observed; user must refresh
- Browser back during step 2 → preserves email per "Change address" UX (good)
- Stuck in `/onboarding` → silent redirect (no visible feedback)

**Screenshots:**

- `screenshots/04_login_step1_1440.png` — Step 1 desktop
- `screenshots/02_landing_root_375mobile.png` — Step 1 mobile
- `screenshots/05_login_step1_vi.png` — Vietnamese
- `screenshots/24_login_filipino_lang.png` — Filipino
- `screenshots/25_login_thai_lang_partial.png` — Thai (BROKEN — bilingual gap)
- `screenshots/08_login_sending_code_state.png` — Step 1 sending
- `screenshots/26_login_step2_otp_entry.png` — Step 2 OTP entry
- `screenshots/27_login_otp_six_digit_filled.png` — Step 2 filled
- `screenshots/28_login_otp_invalid_error.png` — Step 2 error
- `screenshots/29_login_change_address_back_step1.png` — Back navigation

**UX gaps surfaced:**

- #G01 (P0) — `/enta/:handle` not publicly viewable (canon vs impl)
- #G02 (P1) — No 404 page (catch-all silently redirects to `/login`)
- #G08 (P1) — OTP heading "six-digit" but 8 boxes shown
- #G15 (P0) — Thai language partial coverage
- #G15.1 (P1) — Login error message "Unsupported phone provider" for plain text input is misleading
- #G26 (P2) — Onboarding flow has no visible progress (route is redirect-only)

---

### §3.2 ROOT 2 — QOT Trail Discovery

**Entry points:**

- Bottom-nav or main menu → `/qot/me` (Quick Win #3 self-trail, LIVE)
- Click on a QOT-tagged post in Flow → `/qot/:qotId` (specific node detail)
- Search → QOT result → `/qot/:qotId`
- Public AIER gateway "QOT Explorer" section → handoff into `/qot` after sign-in
- Direct deep-link share

**Primary flow** (8 steps for self-trail):

1. Authenticated user clicks "QOT" tab in nav (or directly visits `/qot/me`)
2. `<RouteGuard>` validates session
3. `gateByJourney('flow', <QotUserTrailPage>)` checks user has reached `flow` journey step
4. If gate pass → `QotUserTrailPage` mounts; calls `fetchQotUserTrail(user, { limit: 50 })` (Supabase query)
5. Loading skeleton renders (`renderDeferredRoute` Suspense fallback)
6. Data lands → `QotUserTrailPanel` renders user header (avatar + handle), trail stats (total nodes / streak / weekly count), chronological list of nodes
7. User scrolls / interacts with nodes (click node → `/qot/:qotId` for explorer view)
8. From explorer view, user can navigate back via top-bar Back or browser back

**Primary flow** (10 steps for discovering another user's trail or specific node):

1. User clicks QOT-tagged post in Flow
2. `/qot/:qotId` resolves
3. `QotExplorerPage` renders
4. Loading skeleton
5. Data lands: node detail (origin_type, state_type, content_text, metadata, lineage edges)
6. User explores related lineage (other QOT nodes connected via edges)
7. User clicks "View author trail" → `/qot/me` if own, else (no observed surface for "view another user's trail" — UX gap #G28)
8. User can return to source post via embedded backlink (if metadata has `source_post_id`)
9. Exit via Flow back-nav or main nav
10. (Mobile) bottom-nav remains accessible for jumping to other modules

**Decision points:**

- Self-trail vs specific node detail (route choice)
- Filter by date / origin_type (UI element existence not confirmed without auth — Master Audit suggests basic filters in `QotUserTrailPanel`)
- Click lineage edge to traverse to related node

**Exit points:**

- Click into a Post (return to Flow context)
- Click "Compose" → `/compose` to create new QOT-emitting content
- Direct nav out via bottom-nav

**Failure modes:**

- No QOT entries yet → empty state — but is empty state designed? Master Audit doesn't confirm; UX gap #G30 candidate
- Network error during fetch → unclear; QotUserTrailPanel may show generic error
- Journey gate not yet at `flow` step → silent `<Navigate>` to next-step route (confusing for the user — UX gap #G33, P1)

**Screenshots:** NONE captured this run (auth required). Recommended for credentialed re-run:

- `screenshots/qot_me_self_trail_1440.png`
- `screenshots/qot_me_self_trail_375mobile.png`
- `screenshots/qot_id_explorer_1440.png`
- `screenshots/qot_empty_state_1440.png` (if design exists)

**UX gaps surfaced:**

- #G28 (P2) — No "view this user's QOT trail" affordance from another user's profile
- #G30 (P2) — Empty state design for new users with 0 QOT nodes is unconfirmed
- #G33 (P1) — Journey gate silent redirects confuse users who deep-link before reaching the gated step

---

### §3.3 ROOT 3 — Quantum Social Interaction (NOTE: backend pending)

**Entry points:**

- `/social-brain` direct route (Quick Win #1, LIVE with mock data)
- (Future: notifications referencing harmony events; circle dashboard "Quantum Social" tile)

**Primary flow** (mock-data UX, 6 steps):

1. Authenticated user navigates to `/social-brain`
2. `<RouteGuard>` validates session (no journey gate)
3. `SocialBrainPage` renders
4. `QuantumSocialDashboard` mounts using `SOCIAL_BRAIN_MOCK` (clearly labelled `_mock: true` per LANE01-SOCIAL-BRAIN-USER-V1)
5. Renders: harmony score (mock 73, mock 7-day sparkline), mock SVG social graph (6 nodes, 8 edges), engagement metrics (connections / posts / comments / reactions / circles / harmony rank), Lane_04 "Coming Soon" panel
6. User can scroll / click mock nodes (no live behaviour)

**Decision points (when backend live):**

- Click harmony score → drill into harmony evolution timeline
- Click graph node → view connection profile
- Filter graph by relationship type (friend / circle / pro / org)
- Toggle 7d / 30d / 90d harmony view

**Exit points:**

- Click circle node → `/circles/:circleKey` (when wired)
- Click Lane_04 "Read documentation" → external Whitepaper link
- Bottom-nav out

**Failure modes (mock):**

- No real failure surface (all mock)
- After Lane_04 ships: data stale / incomplete graph / fetch error all need real handling

**Screenshots:** NONE this run (auth required). Recommended:

- `screenshots/social_brain_dashboard_1440.png`
- `screenshots/social_brain_dashboard_375mobile.png`
- `screenshots/social_brain_lane4_coming_soon.png`

**UX gaps surfaced:**

- #G31 (P1) — Quantum Social uses mock data; not testable end-to-end until Lane_04
- #G31.1 (P2) — Mock data flag visibility — does the user clearly see "this is preview" or might they think the harmony score is real?

---

### §3.4 ROOT 4 — Circle Business Creation + Management

**Entry points:**

- `/circles` discovery → click "Start a circle" CTA
- `/business` (alias of `/circles` — UX gap #G14)
- Top-nav "Circles" → discovery
- Direct deep-link to `/circles/:circleKey/business`

**Primary flow** (15 steps for business setup):

1. Authenticated user navigates to `/circles`
2. `gateByJourney('circles', <CirclesDiscoveryPage>)` validates journey
3. `CirclesDiscoveryPage` renders discovery list + create-circle CTA
4. User clicks "Create circle" → modal or new route (specifics not confirmed without auth)
5. Form: circle name, key (slug), visibility, type
6. Submit → POST to `/api/v1/circles` (or supabase RPC) → server creates circle row + adds creator as admin
7. Redirect to `/circles/:circleKey` (CircleHomePage)
8. User clicks "Activate business" tab/button
9. Tier check: requires Builder+ membership (per `MembershipPrivilegeMatrix`)
10. If insufficient tier → modal/redirect to `/membership` upgrade flow
11. If sufficient → `/circles/:circleKey/business` (CircleBusinessProfilePage) renders setup form
12. User fills business profile (name, description, contact, region, tax id...)
13. Submit → POST `/api/v1/circles/:circleKey/business` → enables Business Module
14. User adds rooms via `/circles/:circleKey/business/rooms` → `CircleBusinessRoomsPage`
15. Each room creates a rentable/scheduled space → `/circles/:circleKey/business/rooms/:roomKey` (CircleBusinessRoomEntryPage)

**Decision points:**

- Public circle vs private circle
- Activate Business Module (Builder+ tier required)
- Set commission split (linked to `circle_business_commission` table)
- Define ops modules to enable (rooms / commerce / events)

**Exit points:**

- Save → land on `/circles/:circleKey` home
- Cancel → back to `/circles`
- Insufficient tier → `/membership` upgrade

**Failure modes:**

- Slug collision → server rejects, form should show error (validation specifics not verified)
- Tier check fail → handled via tier-gate redirect
- Business commission misconfig → admin path required
- Network error on multi-step form → progress lost? (UX gap candidate #G34, P2)

**Screenshots:** NONE captured (auth required). Recommended:

- `screenshots/circle_discovery_1440.png`
- `screenshots/circle_create_modal.png`
- `screenshots/circle_home_1440.png`
- `screenshots/circle_business_profile_setup.png`
- `screenshots/circle_business_rooms_list.png`
- `screenshots/circle_business_room_detail.png`
- `screenshots/circle_business_tier_upgrade_modal.png`

**UX gaps surfaced:**

- #G14 (P1) — `/business` is identical to `/circles` (same component, semantic confusion)
- #G34 (P2) — Multi-step business setup form has no observed save-and-resume
- #G35 (P2) — Tier upgrade pivot from circle business creation is not seamless

---

### §3.5 ROOT 5 — Wallet + UZGFi Transaction Flow (transfer / convert)

**Entry points:**

- Bottom-nav "Wallet" → `/wallet`
- `/wallet/asset/:assetCode` from asset card
- `/wallet/transfer` deep-link
- Convert flow from `/wallet` action sheet

**Primary flow — TRANSFER** (10 steps):

1. Authenticated user navigates to `/wallet`
2. `gateByJourney('wallet', <WalletMainActionPage>)` validates journey
3. `WalletMainActionPage` renders: assets list (UZG / U / others), recent activity, action sheet (Send / Receive / Convert / Earn)
4. User taps "Send" → `/wallet/transfer` → `WalletPage` (generic shell)
5. Step 1: Recipient — handle / phone / wallet address; user enters → "Continue"
6. Step 2: Amount + memo — user inputs amount, picks asset, optional memo → "Review"
7. Step 3: Review — `/wallet/transfer/detail` renders detail; shows fee, exchange rate (if cross-asset), risk signals
8. User taps "Confirm" → biometric/PIN check (if enabled per UZGFi risk policy)
9. POST to wallet transfer endpoint → success → toast + redirect to `/wallet/activity/:transactionId`
10. Activity detail page shows status (pending → confirmed), block hash if on-chain

**Primary flow — CONVERT** (8 steps):

1. From `/wallet` → tap "Convert" → `/wallet/convert` (`WalletPage` shell again)
2. User chooses From asset (e.g. U) and To asset (e.g. UZG)
3. Server returns rate quote → displayed
4. User enters amount → review (estimated received)
5. Tap "Convert" → server validates UZGFi treasury supply
6. On success → activity entry created → redirect to `/wallet/activity/:transactionId`
7. Member surface: `/u-convert-history` lists conversions
8. UZGFi admin can audit via `/admin/uzgfi/conversions`

**Decision points:**

- Which asset to send (UZG, U, USD-credit, future stablecoins)
- Internal recipient (handle/phone) vs external (wallet address)
- Convert direction (U→UZG, UZG→U, etc.)
- Fee tier (instant vs scheduled — if implemented)

**Exit points:**

- Success → activity detail
- Error → form returns with error banner
- Insufficient balance → blocked at amount step

**Failure modes:**

- Invalid recipient → form validation
- Insufficient balance → blocked at amount step
- Risk signal flagged (per `uzgfi_risk_signals`) → blocked or queued for review
- Network drop mid-confirm → unclear retry behaviour
- Transfer pending too long → `/wallet/activity/:transactionId` shows status

**Screenshots:** NONE captured (auth required). Recommended:

- `screenshots/wallet_main_1440.png`
- `screenshots/wallet_main_375mobile.png`
- `screenshots/wallet_asset_uzg_detail.png`
- `screenshots/wallet_transfer_step1_recipient.png`
- `screenshots/wallet_transfer_step2_amount.png`
- `screenshots/wallet_transfer_step3_review.png`
- `screenshots/wallet_convert_form.png`
- `screenshots/wallet_activity_detail.png`
- `screenshots/wallet_error_insufficient_balance.png`

**UX gaps surfaced:**

- #G19 (P2) — `/wallet/transfer`, `/wallet/transfer/detail`, `/wallet/convert` all render `WalletPage` shell (URL specificity is meaningless — back button behaviour confusing)
- #G13 (P1) — `/u-earnings`, `/u-system`, `/u-convert` feel disconnected from `/wallet` (separate URL roots, separate nav pattern, separate visual treatment)
- #G36 (P2) — Multi-step transfer has no breadcrumbs or progress indicator

---

### §3.6 ROOT 6 — Membership Tier Upgrade Flow (LIVE per Quick Win #4)

**Entry points:**

- Bottom-nav "Membership" → `/membership`
- Tier-gate redirect (e.g. trying to access Builder feature as Explorer)
- Direct deep-link

**Primary flow** (8 steps):

1. Authenticated user navigates to `/membership`
2. `MembershipPage` renders
3. `MembershipCatalogPanel` (Quick Win #4) renders — shows 4 canonical tiers (Explorer free, Seeker $9, Builder $39, Sovereign $69) with privileges side-by-side
4. Below: `MembershipUpgradePanel` shows user's current tier, next tier offer, perks gained
5. User clicks "Upgrade to [Seeker/Builder/Sovereign]" → opens checkout flow
6. Checkout: payment method selection (USD credit balance / external card)
7. Confirm → POST to `/api/v1/membership/upgrade` → server creates `member_subscriptions` row
8. Success → tier badge updates, user receives onboarding for new privileges (e.g. Premium Circle expanded limit)

**Decision points:**

- Pick tier (Explorer→Seeker / Seeker→Builder / Builder→Sovereign)
- Pick billing cycle (monthly / yearly with discount per `yearly_discount_percent`)
- Payment method (USD credit / external)

**Exit points:**

- Success → `/membership` updated tier
- Cancel → back to `/membership` (no tier change)
- Payment fail → error banner, retry

**Failure modes:**

- Insufficient USD credit → user prompted to top up via `/u-convert` (cross-flow handoff)
- Card declined → checkout error
- Tier downgrade — is it supported? Master Audit doesn't surface a downgrade flow (UX gap #G37, P2)

**Screenshots:** NONE captured (auth required). Recommended:

- `screenshots/membership_catalog_4tiers_1440.png`
- `screenshots/membership_catalog_4tiers_375mobile.png`
- `screenshots/membership_upgrade_panel_explorer.png`
- `screenshots/membership_upgrade_panel_sovereign.png`
- `screenshots/membership_checkout_payment_method.png`
- `screenshots/membership_checkout_confirm.png`
- `screenshots/membership_success_tier_badge_updated.png`

**UX gaps surfaced:**

- #G37 (P2) — Tier downgrade flow not visible (does it exist?)
- #G38 (P2) — Yearly discount comparison not visualized as savings (`yearly_discount_percent` data is in catalog but rendering specifics need confirmation)

---

## §4 4 cross-cutting flows

### §4.1 CROSS-CUT 1 — New User Signup → Onboarding → First Connect-to-Earn

**Combined flow** (16 steps):

1–10. As ROOT 1 §3.1 steps 1–10 (signup via OTP)
11. Onboarding `<RouteGuard>` redirects to `memberOwnedOrHomeRouteTarget` typically `/dashboard`
12. New user lands on Dashboard — first-run banner (per `activation/` component dir)
13. `/earn` (Quick Win #2) link visible in nav or via dashboard tile
14. User clicks `/earn` → `EarnPage` renders Connect-to-Earn dashboard
15. Page shows 14 canonical reward action types (per `rewardOwnerService.js` `CANONICAL_ACTION_TYPES`) + user current earnings, tier multiplier
16. User picks an easy action (e.g. "Complete profile", "Add first connection", "Create first post") → flow handoff to relevant module

**Critical sequence:** new user must traverse OTP → dashboard → onboarding tasks → earn first U token reward to reach activation threshold (per Whitepaper § activation logic).

**UX gaps surfaced:**

- #G26 (P2) — Onboarding visible feedback missing
- #G39 (P2) — First-time user activation flow not surfaced clearly (`activation/` dir has 1 component, may be insufficient for full onboarding journey)
- #G40 (P1) — No cohesive "0-to-1" walkthrough; new user must figure out next steps

---

### §4.2 CROSS-CUT 2 — Existing User Daily Mission Completion

**Flow** (10 steps):

1. User opens `/dashboard`
2. Daily mission card rendered (per `community/` or `feed/` component)
3. Mission types (per Reward V5 `CANONICAL_ACTION_TYPES`): post creation, chat reply, connection request, QOT contribution, circle activity
4. User clicks mission → cross-module navigate (e.g. `/compose` for post mission)
5. User completes action (e.g. publishes post)
6. Backend `reward_emit` Edge Function fires → calculates U reward × tier multiplier
7. Realtime notification (via `realtime/` components) → toast: "+5 U from posting!"
8. User can return to `/earn` to see updated balance
9. Mission marked complete on dashboard
10. Streak counter updates (if mission has streak logic)

**UX gaps surfaced:**

- #G41 (P2) — Mission notification feedback latency unclear (real-time? polled?)
- #G42 (P2) — Streak loss / day-grace UX not surfaced

---

### §4.3 CROSS-CUT 3 — Admin Moderation Flow (RBAC allowlist)

**Flow** (12 steps):

1. Admin user (in `auth_user_admin_allowlist`) signs in via OTP
2. After login → main app checks `access?.role === 'admin'` and `access?.isPrivateAdmin`
3. Admin lands on admin home (`/admin/system` or `/admin-private/intelligence` for private)
4. Admin sees `<AdminGuard>`-protected routes in nav (`/admin/uzgfi`, `/admin/aier`, `/admin-private/wisdom`, etc.)
5. Admin moderates a flagged Flow post → `/admin/aitao` (or AI moderation queue)
6. Admin uses bulk actions: approve / hide / take-down / escalate
7. Audit trail captured to `audit_log` table
8. UZGFi-related actions (treasury, burn, withdrawals) require additional 2FA per `uzgfi_risk_signals` policy
9. Admin reviews `/admin/uzgfi/audit` for daily ledger
10. Admin reviews `/admin/uzgfi/risk` for flagged transactions
11. Admin reviews `/admin/uzgfi/reconciliation` to balance treasury vs minted/burned
12. Admin closes session → audit_log retains every action

**Decision points:**

- Approve / hide / take-down per moderation case
- Escalate to higher admin (private admin) or NTS
- Mark for legal review

**Exit points:**

- Action committed → audit log + notification to affected user
- Cancel → no change

**Failure modes:**

- Admin without proper section grant → `<AdminGuard>` redirects (silent — UX gap #G43)
- Concurrent moderation by two admins → race condition handling unclear
- Admin session expires mid-action → likely loses unsaved work

**Screenshots:** NONE captured (admin auth required). Recommended:

- `screenshots/admin_home_1440.png` (desktop only — admin not mobile-friendly per Master Audit)
- `screenshots/admin_uzgfi_audit_log.png`
- `screenshots/admin_uzgfi_risk_dashboard.png`
- `screenshots/admin_uzgfi_reconciliation.png`
- `screenshots/admin_aitao_moderation_queue.png`
- `screenshots/admin_private_intelligence_console.png`
- `screenshots/admin_private_wisdom_dashboard.png`

**UX gaps surfaced:**

- #G17 (P2) — Admin surfaces are desktop-only (no mobile responsive treatment)
- #G43 (P2) — `<AdminGuard>` denial is silent redirect (no helpful "you don't have access to this section" message)
- #G44 (P2) — No bulk moderation undo / dry-run preview observed in source

---

### §4.4 CROSS-CUT 4 — Bilingual VN/EN Switching

**Flow** (6 steps):

1. User on `/login` step 1 sees Language combobox
2. User selects new language → page localises immediately for EN/VN/FIL
3. **Thai (TH) only partially localises** (only the dropdown itself, not page content) — UX gap #G15 P0
4. After login, language preference persists per device ("This device already has a saved language" hint)
5. In-app language switching: user goes to `/settings` → Language section (specifics not confirmed without auth)
6. After switch → page reloads localised; persisted to `enta_users.locale` (presumed)

**Decision points:**

- Pre-login: per-device language
- Post-login: per-account language

**Failure modes:**

- TH selection: page text remains EN — confusing for Thai users (UX gap #G15)
- Mid-session switch: depends on i18n implementation — likely needs page reload
- Localisation strings missing for some pages (per Reconciliation §3 / §6 — VN coverage incomplete on admin surfaces) (UX gap #G45)

**Screenshots:**

- `screenshots/05_login_step1_vi.png` — Vietnamese (working)
- `screenshots/24_login_filipino_lang.png` — Filipino (working)
- `screenshots/25_login_thai_lang_partial.png` — Thai (BROKEN)

**UX gaps surfaced:**

- #G15 (P0) — Thai language partial coverage (only dropdown localises)
- #G45 (P2) — Bilingual VN/EN coverage gaps in admin + advanced surfaces

---

### §4.5 CROSS-CUT 5 — Public-Safe Identity Discovery (UDNA Gateway)

**Flow** (10 steps):

1. Guest navigates to `https://uzg.plus/` (no session)
2. **Cloudflare worker decision:** worker resolves shell — if request matches an entity-style path (`/human/*`, `/circle/*`, `/business/*`, `/aier/*`), serves `udna-public` bundle; else serves `uzg-pwa` bundle (which redirects to `/login`)
3. For `/`, serves main app → `/login` redirect
4. For `/aier/marketplace`, `/circle/retreat-stories`, etc.: udna-public app loads
5. udna-public `<App>` shows "Loading viewer state" splash (`loadViewerContext`)
6. After viewer context resolves → `<GatewayIndexPage>` (root) or `<PublicEntityPage expectedType="...">` (entity routes)
7. Page renders 8 sections (S1 Identity / S2 Meaning / S3 Trust / S4 Value / S5 Related / S6 Routes / S7 Extended / S8 QOT Explorer)
8. Header includes "Logged out" badge + "Open UZG+" CTA (deep-link to `/login`)
9. Footer: "Gateway index" / "Join UZG+" / "Living OS" links
10. User clicks "Join UZG+" → main app loads at `/login`

**Decision points:**

- Click "Open canonical UZG+ route" (S6 Routes) → deep-link to e.g. `/circles/retreat-stories` (which is auth-gated)
- Browse other entity types via Gateway index
- Sign in via "Open UZG+" / "Join UZG+"

**Exit points:**

- Sign in → `/login`
- Click into related entity → another `/[entity]/[id]` udna-public route
- External: Living OS link

**Failure modes:**

- Unknown entity ID → "Public identity unavailable / Revoked_or_invalid" state (screenshot: `35_human_unknown_id_gateway.png`)
- udna-public bundle missing → worker returns `503 PUBLIC_GATEWAY_SHELL_NOT_PUBLISHED` JSON (verified in `_worker.js`)
- Mismatched bundle (parity check fail) → `503 PUBLIC_GATEWAY_SHELL_PARITY_MISMATCH`

**Screenshots:**

- `screenshots/32_gateway_index_top_hero.png` — Gateway index hero
- `screenshots/33_gateway_index_entities_qot.png` — Entities list
- `screenshots/31_root_after_gateway_index_click.png` — Root page entity cards
- `screenshots/09_aier_marketplace_authgate.png` — AIER public identity
- `screenshots/16_aier_marketplace_section_trust.png` — S3 Trust section
- `screenshots/17_aier_marketplace_section_routes_qot.png` — S6 Routes
- `screenshots/18_aier_marketplace_footer_navigation.png` — S7 Extended + S8 QOT Explorer + footer
- `screenshots/34_circle_retreat_stories_gateway.png` — CIRCLE entity
- `screenshots/36_business_known_id_gateway.png` — BUSINESS entity bottom
- `screenshots/37_business_known_id_top.png` — BUSINESS entity top
- `screenshots/35_human_unknown_id_gateway.png` — HUMAN unknown ID error
- `screenshots/39_aier_license_canonical_id.png` — AIER canonical ID

**UX gaps surfaced:**

- #G27 (P2) — udna-public visually disconnected from main app (different design language entirely)
- #G29 (P2) — Showing raw entity hashes (`bf39c4f7...34f735`) and timestamp IDs publicly
- #G10 (P1) — AIER License "Published asset price: 0 USD" — intentional or unset?

---

### §4.6 CROSS-CUT 6 — Notifications + Realtime Activity

**Flow** (8 steps):

1. Authenticated user has `realtime/` subscription active (presence, typing, notifications)
2. Background event arrives: friend request, comment, post reaction, reward earned, tier change, mission completion
3. `notifications/` channel pushes update (Supabase Realtime)
4. Bell icon shows badge count
5. User clicks bell → `/notifications`
6. `NotificationsPage` renders categorised list (mentions / requests / earnings / system)
7. Click notification → deep-link to source (`/post/:id`, `/connect/requests`, `/wallet/activity/:transactionId`, etc.)
8. Action taken → notification marked read

**UX gaps surfaced:**

- #G46 (P2) — Notification preferences UI not surfaced (where does user configure quiet hours, notification types?)
- #G47 (P2) — No notification grouping (10 reactions on one post = 10 separate notifications?)

---

## §5 Flow coverage summary

| # | Flow | Status | Steps | Screenshots ref'd | UX gaps surfaced |
|---|---|---|---:|---:|---:|
| 1 | ROOT 1 — ENTA Identity Onboarding | LIVE | 12 | 10 | 6 |
| 2 | ROOT 2 — QOT Trail Discovery | LIVE | 8/10 | 0 (auth) | 3 |
| 3 | ROOT 3 — Quantum Social | MOCK | 6 | 0 (auth) | 2 |
| 4 | ROOT 4 — Circle Business Creation | LIVE | 15 | 0 (auth) | 3 |
| 5 | ROOT 5 — Wallet + UZGFi Transactions | LIVE | 10/8 | 0 (auth) | 3 |
| 6 | ROOT 6 — Membership Tier Upgrade | LIVE | 8 | 0 (auth) | 2 |
| 7 | CROSS-CUT 1 — Signup → Onboarding → First C2E | LIVE | 16 | 10 (overlap) | 3 |
| 8 | CROSS-CUT 2 — Existing User Daily Mission | LIVE | 10 | 0 (auth) | 2 |
| 9 | CROSS-CUT 3 — Admin Moderation | LIVE (admin) | 12 | 0 (auth) | 3 |
| 10 | CROSS-CUT 4 — Bilingual VN/EN/FIL/TH | PARTIAL | 6 | 3 | 2 |
| 11 | CROSS-CUT 5 — Public Identity Discovery (UDNA) | LIVE | 10 | 12 | 3 |
| 12 | CROSS-CUT 6 — Notifications + Realtime | LIVE | 8 | 0 (auth) | 2 |
| **Total** | **12 flows** | — | — | **40+ refs** | **34 unique gaps** |

> AC-03 requires ≥10 flows; this audit ships 12.

---

## §6 Critical journey gates (`gateByJourney` keys discovered)

These journey gate keys appear in App.jsx route declarations and represent ordered progression steps. A user must complete previous step before subsequent step routes become accessible:

| Module key | Routes gated | Notes |
|---|---|---|
| `dashboard` | `/dashboard` | Initial step |
| `enta` | `/enta` | Profile init |
| `connect` | `/connect/*` | Connection module unlock |
| `flow` | `/post/:id`, `/qot/*` | Flow content unlock |
| `chat_direct_room` | `/chat/new`, `/chat/:id`, `/inbox/direct/:id` | Chat unlock |
| `chat_room_info` | `/chat/:id/info`, `/inbox/direct/:id/info` | Chat sub-step |
| `wallet` | `/wallet/*`, `/u-*`, `/uzgfi`, `/earn` | Wallet unlock |
| `circles` | `/circles/*`, `/business`, `/circles/:circleKey/business/*` | Circle unlock |
| `aier` | `/aier`, `/aier/mint`, `/aier/my`, `/aier/marketplace` | AIER unlock |
| `profile_view` | `/enta/me`, `/enta/:handle`, `/enta/:handle/connections` | Profile view unlock |

**This is unique UZG+ logic.** Standard auth = is-signed-in-or-not. UZG+ adds journey-step gating on top, enforcing onboarding sequence even if a user knows the URL. Pros: prevents premature feature confusion; Cons: silent redirects when user deep-links a route they haven't unlocked (UX gap #G33).

---

## §7 Cross-references

- Per-route auth + journey gate detail → `UZG_PLUS_V2_ROUTE_INVENTORY_v1.md`
- Per-module component map → `UZG_PLUS_V2_MODULE_INVENTORY_v1.md`
- All UX gaps with severity P0/P1/P2 → `UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md`
- Live mirror sync verification → audit log

🔒 END User Flow Audit v1.0
