# V2 HOME Social — Screen / Route Inventory (PHASE A)

**Audit:** LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2
**Captured:** 2026-05-03 (post Fix-3 keystone PR #114 + bugfix PR #119)
**Auditor:** CLAC1 (Lane_01)
**Base URL:** `https://uzg.plus/`
**Auth user:** `lane02-test-sovereign@uzg.local` (sovereign role, ENTA Root seeded for audit-only access)

---

## Route inventory — HOME social Lane_01 territory

Discovered from [App.jsx:4066-4185](apps/uzg-pwa/src/App.jsx) `<Route path="/...">` enumeration. Filtered to HOME-related routes (excluded Lane_02 territory: `/chat`, `/wallet`, `/tao`, `/plus`, `/u-reward`, `/aier`, `/admin`).

| # | Route | Component (lazy-loaded) | App.jsx line | Status (HTTP) | Audited |
|---|-------|------------------------|--------------|---------------|---------|
| 1 | `/` | Navigate → `/login` if anon, else `resolveEntryAwareRoute(/dashboard)` | [4066](apps/uzg-pwa/src/App.jsx:4066) | 200 → /dashboard | YES |
| 2 | `/dashboard` | (Dashboard via routing, gated `flow`) | [4090](apps/uzg-pwa/src/App.jsx:4090) | 200 | YES |
| 3 | `/home` | Navigate → `/dashboard` | [4095](apps/uzg-pwa/src/App.jsx:4095) | 200 → /dashboard | INDIRECT |
| 4 | `/uniton` | Navigate → `/dashboard` | [4096](apps/uzg-pwa/src/App.jsx:4096) | 200 → /dashboard | INDIRECT |
| 5 | `/social` | Navigate → `/dashboard` | [4097](apps/uzg-pwa/src/App.jsx:4097) | 200 → /dashboard | INDIRECT |
| 6 | `/flow` | Navigate → memberOwnedRoute | [4106](apps/uzg-pwa/src/App.jsx:4106) | 200 | INDIRECT |
| 7 | `/post/:id` | `<PostDetailPage>` (gateByJourney 'flow') | [4108](apps/uzg-pwa/src/App.jsx:4108) | 200 | NO (need real post id) |
| 8 | `/qot/me` | `<QotUserTrailPage>` | [4109](apps/uzg-pwa/src/App.jsx:4109) | 200 | NO |
| 9 | `/qot/:qotId` | `<QotExplorerPage>` | [4110](apps/uzg-pwa/src/App.jsx:4110) | 200 | NO |
| 10 | `/connect` | `<ConnectionsPage lane="all">` | [4111](apps/uzg-pwa/src/App.jsx:4111) | 200 | YES |
| 11 | `/connect/friends` | `<ConnectionsPage lane="friends">` | [4112](apps/uzg-pwa/src/App.jsx:4112) | 200 | NO |
| 12 | `/connect/requests` | `<ConnectionsPage lane="requests">` | [4113](apps/uzg-pwa/src/App.jsx:4113) | 200 | NO |
| 13 | `/connect/suggestions` | `<ConnectionsPage lane="suggestions">` | [4114](apps/uzg-pwa/src/App.jsx:4114) | 200 | NO |
| 14 | `/connections` | Navigate → `/connect` | [4115](apps/uzg-pwa/src/App.jsx:4115) | 200 → /connect | INDIRECT |
| 15 | `/resonance` | Navigate → `/connect` | [4116](apps/uzg-pwa/src/App.jsx:4116) | 200 → /connect | INDIRECT |
| 16 | `/social-brain` | `<SocialBrainPage>` | [4139](apps/uzg-pwa/src/App.jsx:4139) | 200 | NO |
| 17 | `/notifications` | `<NotificationsPage>` | [4154](apps/uzg-pwa/src/App.jsx:4154) | 200 | YES |
| 18 | `/search` | `<SearchPage>` | [4155](apps/uzg-pwa/src/App.jsx:4155) | 200 | YES |
| 19 | `/profile` | `<ProfilePage>` (lazy-mounted via guard chain) | [4158](apps/uzg-pwa/src/App.jsx:4158) | 200 | (alias) |
| 20 | `/profile/edit` | `<ProfileSettingsPage mode="edit">` | [4166](apps/uzg-pwa/src/App.jsx:4166) | 200 | NO |
| 21 | `/profile/enta-edit` | Navigate → `/enta` | [4167](apps/uzg-pwa/src/App.jsx:4167) | 200 → /enta | INDIRECT |
| 22 | `/profile/:userId` | `<PublicProfileRouteBoundary>` | [4169](apps/uzg-pwa/src/App.jsx:4169) | 200 (`/profile/me`) | YES |
| 23 | `/enta` | `<EntaPage>` (gateByJourney 'enta') | [4098](apps/uzg-pwa/src/App.jsx:4098) | 200 | YES |
| 24 | `/enta/me` | `<ProfilePage>` (own profile) | [4103](apps/uzg-pwa/src/App.jsx:4103) | 200 | NO |
| 25 | `/enta/:handle` | `<ProfilePage>` (handle profile) | [4105](apps/uzg-pwa/src/App.jsx:4105) | 200 | NO |
| 26 | `/enta/:handle/connections` | `<ProfileRelationsPage>` | [4104](apps/uzg-pwa/src/App.jsx:4104) | 200 | NO |
| 27 | `/enta/onboarding` | `<EntaOnboardingPage>` (5-step wizard) | [4100](apps/uzg-pwa/src/App.jsx:4100) | 200 | NO |
| 28 | `/enta/view` | Navigate → `/enta` | [4101](apps/uzg-pwa/src/App.jsx:4101) | 200 → /enta | INDIRECT |
| 29 | `/enta/network` | Navigate → `/connect` | [4102](apps/uzg-pwa/src/App.jsx:4102) | 200 → /connect | INDIRECT |
| 30 | `/compose` | `<ComposePage>` (gateByJourney 'plus') | [4184](apps/uzg-pwa/src/App.jsx:4184) | 200 | YES |
| 31 | `/settings` | `<SettingsPage>` | [4172](apps/uzg-pwa/src/App.jsx:4172) | 200 | YES (adjacent) |
| 32 | `/login` | `<LoginPage>` | [4068](apps/uzg-pwa/src/App.jsx:4068) | 200 | (covered in prev audit) |
| 33 | `/onboarding` | (auth onboarding) | [4074](apps/uzg-pwa/src/App.jsx:4074) | 200 | NO |

**Total HOME social routes:** 33 (Lane_01 territory)
**Audited via screenshot capture:** 9 routes × 2 viewports = 18 captures (mobile 375 + desktop 1280)
**Indirect coverage:** 8 routes (redirect targets)
**Deferred:** 16 routes (post detail, qot, profile sub-pages, connect sub-lanes, social-brain, onboarding) — recommend Sprint Audit-C extension follow-up

---

## Route resolution behavior table (PHASE A.2 finding)

Per audit-results.json — tested against authenticated sovereign + ENTA-Root-seeded.

| Route requested | Actual URL after navigation | Redirected? | HTTP | Notes |
|---|---|---|---|---|
| `/` | `/dashboard` | YES | 200 | Correct per Canon §1.1 (default landing) |
| `/dashboard` | `/dashboard` | NO | 200 | Direct |
| `/compose` | `/compose` | NO | 200 | Direct |
| `/notifications` | `/notifications` | NO | 200 | Direct |
| `/search` | `/search` | NO | 200 | Direct |
| `/connect` | `/connect` | NO | 200 | Direct (BUT renders Chat-style UI — see BUG-018) |
| `/profile/me` | `/profile/me` | NO | 200 | Direct |
| `/enta` | `/enta` | NO | 200 | Direct |
| `/settings` | `/settings` | NO | 200 | Direct |

**Important caveat:** Authentication harness must seed `enta_profiles.user_id = sovereign.id` to pass [userJourneyEngine.js:204](apps/uzg-pwa/src/system/userJourneyEngine.js:204) ENTA gate. Without seed, ALL routes redirect to `/enta` (G011 architectural keystone — confirms previous audit baseline).

For new users without ENTA Root, the journey gate forces them through `/enta` onboarding before any HOME social access. This is by-design per `userJourneyEngine.resolveNextRequiredAction` but may be too aggressive UX (canon §1.1 suggests preview / discovery without onboarding). Flagged as canon-drift candidate.

---

## Routes captured (screenshots)

| ID | Route | Mobile (375) | Desktop (1280) |
|----|-------|--------------|----------------|
| 00 | `/` (→ /dashboard) | `00_root_mobile.png` | `00_root_desktop.png` |
| 01 | `/dashboard` | `01_dashboard_mobile.png` | `01_dashboard_desktop.png` |
| 02 | `/compose` | `02_compose_mobile.png` | `02_compose_desktop.png` |
| 06 | `/notifications` | `06_notifications_mobile.png` | `06_notifications_desktop.png` |
| 07 | `/search` | `07_search_mobile.png` | `07_search_desktop.png` |
| 08 | `/connect` | `08_connect_mobile.png` | `08_connect_desktop.png` |
| 09 | `/profile/me` | `09_profile_me_mobile.png` | `09_profile_me_desktop.png` |
| 10 | `/enta` | `10_enta_mobile.png` | `10_enta_desktop.png` |
| 11 | `/settings` | `11_settings_mobile.png` | `11_settings_desktop.png` |

**Total screenshot files:** 18 (≥14 minimum per AC-3)

---

## Deferred routes (recommend audit extension)

| Route | Why deferred | Recommended sprint |
|---|---|---|
| `/post/:id` | Need real post id for content | Sprint Audit-C |
| `/qot/me`, `/qot/:qotId` | Need QOT trail data | Sprint Audit-C |
| `/connect/friends`, `/connect/requests`, `/connect/suggestions` | Direct lane variants | Sprint Audit-C |
| `/enta/me`, `/enta/:handle`, `/enta/:handle/connections` | Profile own/other variants | Sprint Audit-C |
| `/enta/onboarding` | Wizard 5-step flow | Sprint Audit-C (already audited 2026-05-02 V2-ENTA wizard sprint, but full re-capture pending) |
| `/profile/edit`, `/profile/enta-edit` | Profile edit form | Sprint Audit-C |
| `/social-brain` | Social brain entry | Sprint Audit-C |
| `/onboarding` | Auth onboarding | Sprint Audit-C |

Coverage in this audit: 9/33 directly + 8/33 indirect = 17/33 (52% of HOME social routes). Remaining 16 deferred to future audit extension.
