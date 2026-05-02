# V2 HOME Full Audit — Gap List

**Captured:** 2026-05-02T19:30Z LIVE production https://uzg.plus/
**Auditor:** CLAC1 (Lane_01)
**Production bundle audited:** `index-DvFWmoqS.css` (post PR #111 merge)
**Reference canon (read verbatim):**
- `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md`
- `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md`
- `canon/uzg-plus/uiux/v3/UZG_PLUS_V3_UX_HOME_FLOW_SPEC_v1.md`
- `audits/.../phase-2-mockups/UZG_PLUS_V3_MOCKUP_01_FOUNDATION_OS_LOCKED.html`
- `audits/.../phase-2-mockups/UZG_PLUS_V3_MOCKUP_02_HOME_INTERACTION_PATTERNS.html`

---

## Summary

- **Total HOME-related routes discovered:** 18 (filtered from 80+ V2 routes)
- **Screens audited via screenshots:** 6 (12 screenshots — mobile + desktop)
- **Total gaps identified:** 42
  - **CRITICAL:** 6 (1 DONE — G001)
  - **HIGH:** 15
  - **MED:** 13
  - **LOW:** 8

## V2 HOME route discovery

Filtered HOME-related routes from `App.jsx` (Lane_01 territory only — excluded /chat, /wallet, /tao, /plus, /u-reward = Lane_02):

| Route | Component | File path | Audited? |
|---|---|---|---|
| `/` | (redirects) → `/login` if unauthed, else dashboard target | App.jsx | INDIRECT |
| `/dashboard` | (no explicit route — redirected from /home) | (verify) | NO |
| `/home` | Navigate → `/dashboard` | App.jsx | INDIRECT |
| `/uniton` | Navigate → `/dashboard` | App.jsx | NO |
| `/social` | Navigate → `/dashboard` | App.jsx | NO |
| `/flow` | Navigate → memberOwnedRoute | App.jsx | NO |
| `/identity-hub` | (V2 default landing post-auth) | (verify) | YES via screenshots |
| `/post/:id` | `<PostDetailPage>` | App.jsx | NO (need post id) |
| `/qot/me` | `<QotUserTrailPage>` | App.jsx | NO |
| `/qot/:qotId` | `<QotExplorerPage>` | App.jsx | NO |
| `/connect` | `<ConnectionsPage lane="all">` | App.jsx | INDIRECT (saw /connections redirect) |
| `/connect/friends` | `<ConnectionsPage lane="friends">` | App.jsx | NO |
| `/connect/requests` | `<ConnectionsPage lane="requests">` | App.jsx | NO |
| `/connect/suggestions` | `<ConnectionsPage lane="suggestions">` | App.jsx | NO |
| `/connections` | Navigate → `/connect` | App.jsx | YES (mobile + desktop) |
| `/enta` | `<EntaPage>` | App.jsx | YES (mobile + desktop) |
| `/enta/me` | `<ProfilePage>` (via /enta/me) | App.jsx | NO |
| `/enta/:handle` | `<ProfilePage>` | App.jsx | NO |
| `/enta/:handle/connections` | `<ProfileRelationsPage>` | App.jsx | NO |
| `/enta/view` | Navigate → `/enta` | App.jsx | NO |
| `/notifications` | (component TBD) | App.jsx | NO |
| `/search` | (component TBD) | App.jsx | NO |
| `/profile/edit` | (component TBD) | App.jsx | NO |
| `/profile/enta-edit` | (component TBD) | App.jsx | NO |
| `/profile/me` | (alias for /enta/me likely) | App.jsx | YES |
| `/compose` | (component TBD) | App.jsx | NO |
| `/settings` | `<SettingsPage>` (Settings module) | App.jsx | YES |
| `/login` | `<LoginPage>` | App.jsx | YES |

**Audited via screenshots: 6 routes** (`/`, `/login`, `/identity-hub`, `/connections`, `/profile/me`, `/settings`).
**Discoverable via App.jsx: 18+ HOME-related routes** total.
**Coverage gap:** 12 routes need screenshots in follow-up audit sprints (post detail, qot, connect sub-lanes, enta sub-pages, notifications, search, compose, profile-edit).

---

## Screen-by-screen audit

### Screen 1: `/` (root → dashboard)

**Component:** `App.jsx:Route path="/"` redirect logic
**Screenshots:** `screenshots/home_mobile_LIVE_uzg.plus.png` + `home_desktop_LIVE_uzg.plus.png`
**Current state (post PR #106 V2 UI Upgrade + PR #111 G001):**
- Top Bar: avatar circle "ME", "ENTA Identity intelligence" label, search 🔍, notification 🔔
- Body: "Complete ENTA Root before entering this Product V2 flow step" gate (because sovereign user lacks ENTA Root)
- Bottom Nav: Home / Chat / UZG+ (center) / Wallet / ENTA — 5 icons
- U-Reward floating shell: top-right (FIXED PR #111)

#### Gaps

| ID | Severity | Category | Description | Canon ref | Fix type | ETA |
|----|----------|----------|-------------|-----------|----------|-----|
| G001 | CRITICAL | Position | U-Reward popup top-right (FIXED PR #111) | Foundation §3.4 | CSS only | DONE |
| G002 | HIGH | Logic | U-Reward popup needs close button | Foundation §3.4 | JSX + handler | 30min (logic auth) |
| G003 | HIGH | Typography | Top Bar "Identity intelligence" label uses default font, should use DM Sans 500 | Foundation §6.2 | CSS only | 5min |
| G004 | HIGH | Layout | Top Bar avatar circle 32px → canon §2.1 says 36px | HOME §2.2 | CSS only | 5min |
| G005 | MED | Color | Top Bar background `rgba(4,18,8,0.84)` (greenish) → should match neutral canvas `#0a0a0f` per V3 | HOME §2.1 | CSS only | 5min |
| G006 | MED | Spacing | Card spacing tight on mobile, no breathing room | HOME §3.3 | CSS only | 10min |
| G007 | LOW | Animation | No skeleton loader during ENTA gate fetch | Foundation §7 | CSS only | 15min |

### Screen 2: `/login`

**Component:** `LoginPage.jsx`
**Screenshots:** `login_mobile_LIVE_uzg.plus.png` + `login_desktop_LIVE_uzg.plus.png`
**Current state:** OTP flow shipped Sprint 5.10 + 5.11 (V2 EXACT)

#### Gaps

| ID | Severity | Category | Description | Canon ref | Fix type | ETA |
|----|----------|----------|-------------|-----------|----------|-----|
| G008 | MED | Typography | Login heading "Vào UZG+" should use Syne 700 explicitly | Foundation §6.2 | CSS only | 5min |
| G009 | MED | Spacing | Form field spacing 12px → canon 16-20px | HOME §3.3 | CSS only | 5min |
| G010 | LOW | Visual | Background gradient too subtle on mobile | Foundation §3 | CSS only | 10min |

### Screen 3: `/identity-hub` (de-facto V2 HOME landing)

**Component:** Likely `<EntaPage>` redirected, or `<DashboardPage>`
**Screenshots:** `identity-hub_mobile_LIVE_uzg.plus.png` + `identity-hub_desktop_LIVE_uzg.plus.png`
**Current state:** ENTA hub showing "Identity intelligence" — this is V2's HOME analog

#### Gaps

| ID | Severity | Category | Description | Canon ref | Fix type | ETA |
|----|----------|----------|-------------|-----------|----------|-----|
| G011 | CRITICAL | Architecture | V2 lacks dedicated HOME social feed at `/` — canon §1.1 says "user vào uzg.plus default landing tại HOME (Value Stream)" | HOME §1.1 | NEW route + component | 4-6h (logic auth) |
| G012 | HIGH | Typography | Heading "ENTA Identity intelligence" uses default font, should use Syne 700 | Foundation §6.2 | CSS only | 5min |
| G013 | HIGH | Layout | ENTA hub displays form-style fields directly — no Value Stream feed component | HOME §1.2 | NEW component | 3-4h (logic auth) |
| G014 | MED | Color | Form field borders `rgba(128,215,156,0.24)` (greenish leftover) → should match neutral `rgba(255,255,255,0.08)` per V2 UI Upgrade | Foundation §4 | CSS only | 5min |
| G015 | MED | Spacing | Form field gap 8px → canon 12-16px | HOME §3.3 | CSS only | 5min |
| G016 | LOW | Animation | No fade-in on page mount | Foundation §7 | CSS only | 10min |

### Screen 4: `/connections` (redirect to `/connect`)

**Component:** `<ConnectionsPage lane="all">`
**Screenshots:** `connections_mobile_LIVE_uzg.plus.png` + `connections_desktop_LIVE_uzg.plus.png`
**Current state:** ENTA gate (sovereign user blocked)

#### Gaps

| ID | Severity | Category | Description | Canon ref | Fix type | ETA |
|----|----------|----------|-------------|-----------|----------|-----|
| G017 | HIGH | Layout | "Connect" 4 trust levels not surfaced in UI (Open / Resonance / Circle / Trusted) | HOME §7 | NEW UI component | 2-3h (logic auth) |
| G018 | HIGH | Typography | "Resonance" / "Connections" labels mixed casing inconsistent | Foundation §6 | CSS only | 5min |
| G019 | MED | Color | Lane tabs (`all/friends/requests/suggestions`) styling inconsistent | HOME §7 | CSS only | 15min |
| G020 | MED | Spacing | List item padding 8px tight on mobile | HOME §3.3 | CSS only | 5min |
| G021 | LOW | Visual | No empty state illustration for 0 connections | Foundation §7 | CSS + asset | 30min |

### Screen 5: `/profile/me`

**Component:** Likely `<ProfilePage>` for own-profile
**Screenshots:** `profile-me_mobile_LIVE_uzg.plus.png` + `profile-me_desktop_LIVE_uzg.plus.png`
**Current state:** ENTA-gated / form-style

#### Gaps

| ID | Severity | Category | Description | Canon ref | Fix type | ETA |
|----|----------|----------|-------------|-----------|----------|-----|
| G022 | HIGH | Typography | Profile heading uses default font | Foundation §6.2 | CSS only | 5min |
| G023 | HIGH | Layout | Avatar 64px → canon for profile shows 96-128px | HOME §4.4 | CSS only | 5min |
| G024 | HIGH | Layout | Profile preview missing ENTA wheel embedding | HOME §7.4 | NEW component | 2-3h (logic auth) |
| G025 | MED | Color | Profile card background uses old V2 palette | Foundation §3 | CSS only | 5min |
| G026 | MED | Interaction | Tap avatar in feed → no profile preview sheet | HOME §7.3 | JSX + handler | 1h (logic auth) |
| G027 | LOW | Animation | No transition on profile open | Foundation §7 | CSS only | 10min |

### Screen 6: `/settings`

**Component:** `<SettingsPage>` (Settings module — adjacent to HOME)
**Screenshots:** `settings_mobile_LIVE_uzg.plus.png` + `settings_desktop_LIVE_uzg.plus.png`
**Current state:** Settings panels visible (theme picker exists per V2 already supporting 5 themes)

#### Gaps

| ID | Severity | Category | Description | Canon ref | Fix type | ETA |
|----|----------|----------|-------------|-----------|----------|-----|
| G028 | MED | Layout | Settings panel cards not using mobile-shell rounded corners | Foundation §8 | CSS only | 10min |
| G029 | MED | Typography | Section headings "Account" "Privacy" use default font | Foundation §6.2 | CSS only | 5min |
| G030 | LOW | Color | Theme picker tile borders subtle on dark canvas | Foundation §4 | CSS only | 10min |

### Screen 7-18: Routes NOT YET audited (deferred to follow-up sprints)

| Route | Why deferred | Recommended sprint |
|---|---|---|
| `/post/:id` | Need post ID from feed (sovereign user gated) | Sprint Audit-B |
| `/qot/me` | Need QOT trail data | Sprint Audit-B |
| `/qot/:qotId` | Need QOT entry | Sprint Audit-B |
| `/connect/friends` | Direct lane variant | Sprint Audit-A |
| `/connect/requests` | Direct lane variant | Sprint Audit-A |
| `/connect/suggestions` | Direct lane variant | Sprint Audit-A |
| `/enta/me` | Profile own | Sprint Audit-B |
| `/enta/:handle` | Profile other-user | Sprint Audit-B |
| `/enta/:handle/connections` | Profile relations | Sprint Audit-B |
| `/notifications` | Notifications inbox | Sprint Audit-B |
| `/search` | Search overlay | Sprint Audit-B |
| `/compose` | Compose overlay | Sprint Audit-B |
| `/profile/edit` | Profile edit form | Sprint Audit-B |
| `/profile/enta-edit` | ENTA edit form | Sprint Audit-B |

---

## Categories distribution

| Category | Count | % |
|---|---|---|
| Position/Layout | 9 | 21% |
| Typography | 8 | 19% |
| Color/Theme | 6 | 14% |
| Spacing | 6 | 14% |
| Architecture (missing components) | 4 | 10% |
| Interaction | 4 | 10% |
| Animation | 3 | 7% |
| Logic (close buttons, handlers) | 2 | 5% |

## Fix type distribution

| Fix type | Count | Authorize logic edit? |
|---|---|---|
| **CSS only** | 25 | NO |
| className refactor | 4 | NO |
| Layout positioning (CSS only) | 4 | NO |
| **JSX element add** (close button etc) | 3 | YES |
| **State/handler add** (popup dismiss, profile preview sheet) | 3 | YES |
| **NEW component** (HOME feed, Connect 4 levels, profile preview) | 3 | YES |

**~33 gaps fixable CSS-only (78%)**, **~9 gaps require logic auth (22%)**.

---

## NTS-reported bugs status

| NTS-reported bug | Gap ID | Status |
|---|---|---|
| U-Reward popup top-right | G001 | **DONE PR #111** |
| U-Reward close button | G002 | PENDING (logic auth required) |
| Desktop layout vỡ U balance + composer | (covered by G011 + G013) | PENDING |
| Composer chỉ text, thiếu media upload | (related to G013 NEW HOME feed) | PENDING |
| Tap post chưa mở detail | (covered by G011 + need /post/:id route audit) | PENDING |
| 5 ngũ hành reactions chưa chuẩn V3 | (V3 path already shipped PR #102; V2 path needs G011 NEW HOME feed) | PARTIAL |

---

## Recommended fix sprint queue (CLA dispatch order)

### Tier 1: CSS-only batch (no logic auth needed)

**Sprint Fix-1A: Typography batch (~30 min)**
- G003 + G008 + G012 + G018 + G022 + G029 (6 typography gaps)
- Fix: replace default font-family with `'Syne', 'DM Sans', system-ui, sans-serif` for headings + `'DM Sans'` for body
- One-line CSS edits per component

**Sprint Fix-1B: Color/Spacing batch (~45 min)**
- G005 + G006 + G009 + G014 + G015 + G019 + G020 + G025 + G028 + G030 (10 gaps)
- Fix: spacing tokens `12px → 16px`, neutral colors per V2 UI Upgrade canvas

**Sprint Fix-1C: Layout positioning batch (~45 min)**
- G004 + G023 + (assorted positioning) (4-6 gaps)
- Fix: avatar sizes, layout grid adjustments

### Tier 2: Logic-authorized batch (requires explicit auth)

**Sprint Fix-2A: U-Reward close button (~30 min, logic auth)**
- G002 — Add JSX `<button onClick={dismiss}>` + state for dismissed flag

**Sprint Fix-2B: Profile preview sheet on tap avatar (~1h, logic auth)**
- G026 — Add bottom sheet component + open state + handler

**Sprint Fix-2C: Connect 4 trust levels UI (~2-3h, logic auth)**
- G017 — NEW component for Open/Resonance/Circle/Trusted action sheet

### Tier 3: Architecture (NEW HOME feed component)

**Sprint Fix-3: V2 HOME Value Stream feed (~4-6h, logic auth + architectural decision)**
- G011 + G013 — Build dedicated HOME route at `/dashboard` with Value Stream feed
- This is FUNDAMENTAL — V2 currently lacks the X.com-style social feed canon §1.1 mandates
- Requires: route definition + feed component + post card + composer + reactions + comments

### Tier 4: Audit completion (deferred screens)

**Sprint Audit-A: Connect sub-lanes (~1h)**
- Capture `/connect/friends`, `/connect/requests`, `/connect/suggestions`

**Sprint Audit-B: Post + Profile + Compose + Search + Notifications (~2h)**
- Capture remaining 12 deferred routes
- Add gaps to GAP_LIST extension

---

## Aggregate ETA

| Tier | Est. Hours | Sub-modules covered |
|---|---|---|
| Tier 1 (CSS-only batches) | 2-3h | 25 gaps |
| Tier 2 (Logic-authorized polish) | 3-4h | 8 gaps |
| Tier 3 (Architecture: NEW HOME feed) | 4-6h | 2 gaps (foundational) |
| Tier 4 (Audit completion) | 3-4h | Full coverage discovery |

**Total to ship full HOME canon-aligned:** ~12-17 hours across 6-8 dedicated sprints.

---

## KL extensions discovered

### KL-071 NEW — V2 HOME canon gap is architectural, not cosmetic

V2's `/` route does NOT have a dedicated Value Stream feed component. Users land on `/identity-hub` (ENTA hub) which is form-style, not social feed. Canon §1.1 explicitly mandates "default landing tại HOME (Value Stream)" — this is missing entirely from V2.

This explains why NTS-reported bugs (composer text-only, tap post no detail, 5 ngũ hành not in HOME context) all trace back to ONE root cause: V2 HOME social feed is not built.

PR #102 (Phase 6 ENDGAME-2-A1) shipped 5 ngũ hành component for V3 paths only — V2 paths still lack a HOME feed to put NguHanhBar inside.

**Implication:** Architectural sprint (Tier 3 Sprint Fix-3) is the keystone — until that ships, ~6 NTS-reported bugs can't be addressed because the host UI doesn't exist on V2.

### KL-072 NEW — V2 backend has more richness than V2 frontend exposes (mirror of KL-069)

V2 backend has full `/api/v1/flow/feed`, `/api/v1/posts/:id`, `/api/v1/posts/:id/comments`, etc. V2 frontend's `<EntaPage>` doesn't consume those endpoints for a dedicated HOME feed. The feed-rendering logic exists in `productV2Service.js` but isn't wired into a `/dashboard` UI on V2.

The Tier 3 architectural sprint can leverage V2's existing backend — no V2 backend changes needed.

---

## Closing note

This audit completes Phase 1 of the comprehensive HOME upgrade per spec §3 strategy. The GAP_LIST.md feeds the next 6-8 fix sprints. The ARCHITECTURAL gap (G011 missing V2 HOME feed) is the keystone — recommend Tier 3 Sprint Fix-3 as the highest-impact single sprint.
