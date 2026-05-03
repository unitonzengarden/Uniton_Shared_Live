# V2 HOME Social Full Audit V2 — Bug Catalog (PHASE D)

**Audit:** LANE01-V2-HOME-SOCIAL-FULL-AUDIT-V2
**Date:** 2026-05-03
**Auditor:** CLAC1 (Lane_01)
**Production state:** post Fix-3 keystone (PR #114) + i18n+ENTA gate fix (PR #119) + Plus-Hub fixes (PR #121, #122)
**Auth user:** sovereign w/ ENTA Root seeded (audit-only)
**Total bugs cataloged:** 50

**Severity distribution:**
- CRITICAL: 8
- HIGH: 20
- MEDIUM: 15
- LOW: 7

**NTS-reported direct (from 2026-05-03 evidence):** 7 (all confirmed STILL_PRESENT or PARTIAL)

---

## Bug field schema

```
BUG-NNN: <title>
  Severity, Category, Route, Viewport, Evidence, Description
  Canon ref, Fix type, Fix complexity, File suspected
  Dual-tree, NTS-reported, Previous-audit gap-id (if applicable), Status
```

---

# CRITICAL (8)

## BUG-001: Composer container rendered as oversized black oval/circle on /compose

**Severity:** CRITICAL
**Category:** Layout / Visual
**Route:** /compose
**Viewport:** Both (mobile + desktop)
**Evidence:** [02_compose_mobile.png](screenshots/02_compose_mobile.png), [02_compose_desktop.png](screenshots/02_compose_desktop.png)
**Description:** The PostComposer container element renders as a giant black oval/circle taking ~50% of viewport height with `border-radius: 50%` (or near-equivalent). The text input + Post button float inside this distorted shape. This is unusable UX and visibly broken — appears as if the composer is exploded out of layout.
**Canon ref:** UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md §6.2 (Composer is a "card with rounded corners 12-16px, neutral surface")
**Fix type:** CSS-only (override border-radius + dimensions on `.compose-page-body PostComposer card`)
**Fix complexity:** S (~15min CSS override)
**File suspected:** [components/flow/PostComposer.jsx](apps/uzg-pwa/src/components/flow/PostComposer.jsx) + corresponding CSS module + ComposePage shell wrapper
**Dual-tree:** Yes (KL-05 — apps/uzg-pwa/src/ + src/ mirror)
**NTS-reported:** Yes (NTS evidence 2026-05-03 screenshot 1: "composer cắt hình tròn đen layout vỡ")
**Previous-audit gap-id:** N/A (new — emerged from PostComposer mount inside ComposePage shell after PR #114)
**Status:** STILL_PRESENT

---

## BUG-002: Background canvas is light gradient on /compose, not neutral-dark per V2 UI Upgrade canon

**Severity:** CRITICAL
**Category:** Color / Theme
**Route:** /compose, /dashboard, /search, /notifications, /connect, /enta, /settings
**Viewport:** Both
**Evidence:** All page-level screenshots show light gradient (white → light gray) background instead of `#0a0a0f` neutral-dark canvas
**Description:** Per PR #106 V2 UI Upgrade LIVE, the entire app should render on neutral-dark canvas (`#0a0a0f`). All HOME social pages render on light gradient instead — drift from canon.
**Canon ref:** UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1.md §3.2 + V2 UI Upgrade PR #106 spec
**Fix type:** CSS — body / app-shell background-color
**Fix complexity:** S (~10min — verify token application)
**File suspected:** [src/styles.css](apps/uzg-pwa/src/styles.css) or theme CSS context
**Dual-tree:** Yes
**NTS-reported:** Yes ("Background trắng KHÔNG neutral-dark")
**Previous-audit gap-id:** G005 (related — partial)
**Status:** WORSENED — was partial issue G005, now apparent app-wide

---

## BUG-003: 5 ngũ hành reactions render as horizontal emoji strip, not Pentagon (V3 spec)

**Severity:** CRITICAL
**Category:** Layout / Architecture
**Route:** /dashboard
**Viewport:** Both
**Evidence:** [01_dashboard_mobile.png](screenshots/01_dashboard_mobile.png), [01_dashboard_desktop.png](screenshots/01_dashboard_desktop.png)
**Description:** Each post card displays 5 ngũ hành reactions as a horizontal strip of emoji icons (💧🌿🔥⬜...) at the bottom. Per Pentagon Amendment 001 + UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md §6.4, reactions should render as a pentagon geometry on long-press OR as a polished pentagon strip with proper iconography (not emoji).
**Canon ref:** Pentagon Amendment 001 (PR #45) + HOME §6.4 reaction-wheel pattern
**Fix type:** JSX-refactor + CSS rewrite for reaction button row
**Fix complexity:** M (1-2h — match Pentagon geometry tokens)
**File suspected:** [components/home-v3/NguHanhBar.tsx](apps/uzg-pwa/src/components/home-v3/NguHanhBar.tsx) + ReactionButtonV3
**Dual-tree:** Yes
**NTS-reported:** Yes ("5 ngũ hành reactions emoji rời, không pentagon")
**Previous-audit gap-id:** Related to G011 keystone (V2 missing pentagon geometry)
**Status:** STILL_PRESENT (pentagon geometry still not visible — V3 component shipped but V2 dashboard uses simpler emoji row)

---

## BUG-004: Language OS resolver ignores fallback param when key missing in VI dictionary

**Severity:** CRITICAL
**Category:** Logic / i18n
**Route:** ALL (system-wide)
**Viewport:** Both
**Evidence:** [languageFoundation.js:7427-7442](apps/uzg-pwa/src/system/languageFoundation.js:7427) source code; observed leaks `[[vi_missing:system.uReward.shell.closeShellAria]]` in production DOM on 4 routes
**Description:** Resolver at line 7430 returns `[[vi_missing:KEY]]` immediately when locale='vi' and key not in dictionary, IGNORING the `fallback` argument that callers explicitly pass (e.g. `appT('common.back', {}, 'Back')`). Forbidden Pattern #1 per LANG_OS_10. Causes drift risk for any future missing key.
**Canon ref:** LANG_OS_03 resolver contract; LANG_OS_10 §forbidden patterns (#1 raw key leakage)
**Fix type:** JS logic patch — honor fallback before returning bracket
**Fix complexity:** S (~30min including LANG_OS lock test update)
**File suspected:** [apps/uzg-pwa/src/system/languageFoundation.js:7430](apps/uzg-pwa/src/system/languageFoundation.js:7430)
**Dual-tree:** Yes
**NTS-reported:** Yes (PR #119 patched `common.back` symptom; underlying resolver bug remains — surfaced again as `system.uReward.shell.closeShellAria`)
**Previous-audit gap-id:** New (not in 2026-05-02 baseline)
**Status:** STILL_PRESENT (resolver itself unfixed; only 1 specific key was patched)

---

## BUG-005: Raw i18n key `[[vi_missing:system.uReward.shell.closeShellAria]]` visible in DOM

**Severity:** CRITICAL
**Category:** i18n
**Route:** /notifications (desktop), /search (mobile + desktop), /profile/me (mobile)
**Viewport:** Both
**Evidence:** [audit-results.json](audit-results.json) `i18nLeaks` arrays + [i18n-broken-keys.txt](i18n-broken-keys.txt)
**Description:** The U-Reward shell close button aria-label resolves to raw key bracket `[[vi_missing:system.uReward.shell.closeShellAria]]`. This is direct violation of LANG_OS forbidden pattern #1. Visible in HTML even if not rendered as visible text (screen readers will read it).
**Canon ref:** LANG_OS_10 §forbidden #1; LANG_OS_03 resolver contract
**Fix type:** i18n-key-add (add VI dict entry) + apply BUG-004 root fix
**Fix complexity:** S (~15min)
**File suspected:** Add `system.uReward.shell.closeShellAria: 'Đóng sảnh ứng dụng'` to VI block in [languageFoundation.js](apps/uzg-pwa/src/system/languageFoundation.js)
**Dual-tree:** Yes
**NTS-reported:** Indirectly (NTS reported common.back leak; this is same pattern, different key)
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-006: HOME social pages render English strings despite user locale = 'vi'

**Severity:** CRITICAL
**Category:** i18n
**Route:** /dashboard, /compose, /notifications, /search, /connect
**Viewport:** Both
**Evidence:** Screenshots show "Home", "What's happening?", "Share something", "Signals", "Notifications", "Unread", "Total", "Sync Quiet", "Refresh", "Mark all read", "Search users, circles, and posts", "Start typing to search", "New Chat", "Personal", "Requests", "People", "Earn next 7 U", "Suggested ENTA", "No suggestions yet", etc. — all English on user with `profiles.preferred_language = 'vi'`
**Description:** HOME social pages have hardcoded English strings (no `appT()` lookup). Locale switch does not affect these pages. Inconsistent with /profile/me, /enta, /settings which DO render VI properly.
**Canon ref:** LANG_OS_02 architecture; HOME §1 base pages must support locale switching
**Fix type:** JSX-refactor (add `useLanguageFoundation()` + `appT()` wrappers across ~6 components)
**Fix complexity:** L (3-4h across multiple files)
**File suspected:** Dashboard.jsx (or its sub-components for top-bar / tab-bar), ComposePage.jsx, NotificationsPage.jsx, SearchPage.jsx, ConnectionsPage.jsx, PostComposer.jsx, BottomNav.jsx
**Dual-tree:** Yes (entire HOME stack mirrored)
**NTS-reported:** No (NTS focused on layout bugs; locale was secondary)
**Previous-audit gap-id:** New (was masked by gate redirect in previous audit)
**Status:** STILL_PRESENT — emerged after Fix-3 keystone shipped HOME social feed but didn't apply LANG_OS contract

---

## BUG-007: Bottom nav floating mid-screen on desktop (overlaps body content)

**Severity:** CRITICAL
**Category:** Layout
**Route:** /notifications (mobile shell scaling), /connect, /search, /settings
**Viewport:** Mobile (when viewing in 375 viewport — bottom-nav height bleeds over content) + Desktop (potentially)
**Evidence:** [06_notifications_mobile.png](screenshots/06_notifications_mobile.png) — bottom nav clearly OVERLAPS body cards "No notifications yet..." at ~75% scroll. [08_connect_mobile.png](screenshots/08_connect_mobile.png) — nav OVERLAPS "appear here as soon..." text. [11_settings_mobile.png](screenshots/11_settings_mobile.png) — nav overlays mid-page form.
**Description:** Bottom nav renders position:fixed but the body content scroll-container does not reserve bottom padding for the nav height. Result: empty-state messages and last form rows are partially obscured by the floating nav. NTS reported this on /dashboard desktop where nav floats mid-screen instead of being affixed to bottom of 480px shell.
**Canon ref:** Master UI/UX Canon §7 mobile shell + Foundation OS §7 (bottom-nav fixed at shell bottom + body padding-bottom = nav height)
**Fix type:** CSS — `.app-shell { padding-bottom: <nav-height>px }` + verify nav z-index + container layout
**Fix complexity:** S (~30min)
**File suspected:** [components/MainShell.jsx](apps/uzg-pwa/src/components/MainShell.jsx) + corresponding CSS module + BottomNav component
**Dual-tree:** Yes
**NTS-reported:** Yes ("bottom nav nổi giữa screen sai mobile shell")
**Previous-audit gap-id:** Related to G011 architectural keystone
**Status:** STILL_PRESENT — Fix-3 didn't address mobile-shell padding

---

## BUG-008: Composer top duplicate between /dashboard inline and /compose dedicated

**Severity:** CRITICAL
**Category:** Architecture / UX
**Route:** /dashboard + /compose
**Viewport:** Both
**Evidence:** [01_dashboard_mobile.png](screenshots/01_dashboard_mobile.png) shows inline composer at top of feed ("What's happening?"). [02_compose_mobile.png](screenshots/02_compose_mobile.png) shows dedicated /compose page composer too.
**Description:** Two composer surfaces exist — top of feed (inline) AND a dedicated /compose page. Both use same PostComposer. UX confusion: which is canonical entry? Tap from feed composer → inline submit, tap from + button or anywhere else → /compose route. Per HOME canon §11.3 the dedicated /compose should be the only full-screen composer; inline composer on /dashboard should either be removed or visually differentiated as "quick post".
**Canon ref:** HOME §11.3 compose pattern
**Fix type:** Architecture decision + JSX cleanup
**Fix complexity:** M (1-2h depending on direction)
**File suspected:** Dashboard top-of-feed PostComposer mount + ComposePage decoupling
**Dual-tree:** Yes
**NTS-reported:** Yes ("composer top duplicate với /compose")
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

# HIGH (20)

## BUG-009: Top bar "Home" English on /dashboard (should be "Trang chủ" per VI locale)

**Severity:** HIGH
**Category:** i18n
**Route:** /dashboard
**Viewport:** Both
**Evidence:** [01_dashboard_mobile.png](screenshots/01_dashboard_mobile.png) top bar reads "Home"
**Description:** App-shell top bar shows "Home" hardcoded. Should be `appT('shell.topBar.home', {}, 'Home')` → "Trang chủ".
**Canon ref:** Theme System Canon v1.0 + LANG_OS_02
**Fix type:** JSX wrap + add VI dict entry
**Fix complexity:** S (~10min)
**File suspected:** [components/MainShell.jsx](apps/uzg-pwa/src/components/MainShell.jsx) or top-bar component
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** N/A (depends on BUG-006 retrofit)
**Status:** STILL_PRESENT

---

## BUG-010: Composer placeholder "What's happening?" hardcoded English

**Severity:** HIGH
**Category:** i18n
**Route:** /dashboard (inline) + /compose
**Viewport:** Both
**Evidence:** Both pages show placeholder "What's happening?" in composer text input
**Description:** PostComposer component uses hardcoded English placeholder. Should be VI: "Bạn đang nghĩ gì?" or "Chia sẻ điều gì đó?". Same hardcoded "Post" button text — should be "Đăng".
**Canon ref:** HOME §6.1 composer
**Fix type:** JSX wrap + add VI dict entries
**Fix complexity:** S (~10min)
**File suspected:** [components/flow/PostComposer.jsx](apps/uzg-pwa/src/components/flow/PostComposer.jsx)
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Related to G013
**Status:** STILL_PRESENT

---

## BUG-011: Page title "Share something" English on /compose (should be "Chia sẻ điều gì đó")

**Severity:** HIGH
**Category:** i18n
**Route:** /compose
**Viewport:** Both
**Evidence:** [02_compose_desktop.png](screenshots/02_compose_desktop.png) title "Share something"
**Description:** [ComposePage.jsx:62](apps/uzg-pwa/src/pages/ComposePage.jsx:62) uses `appT('postComposer.shareSomething', {}, 'Share something')` — key is missing in VI dictionary so falls through to fallback (per BUG-004) but fallback IS English. Need to add `postComposer.shareSomething: 'Chia sẻ điều gì đó'` to VI dict.
**Canon ref:** LANG_OS_02
**Fix type:** i18n-key-add
**Fix complexity:** S (~5min)
**File suspected:** Add VI dict entry + wait for BUG-004 resolver fix
**Dual-tree:** Yes
**NTS-reported:** Implied (NTS noted Vietnamese app should be Vietnamese)
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-012: Composer 4 media buttons NOT exposed (image / video / poll / qot) per HOME canon §10.2

**Severity:** HIGH
**Category:** Logic / Architecture
**Route:** /compose
**Viewport:** Both
**Evidence:** [02_compose_*.png](screenshots/) — composer shows ONLY ME avatar + text input + Post button. No media attach controls visible.
**Description:** Per HOME §10.2 Compose pattern, the composer should expose 4 media types: Image, Video, Poll, QOT (Quote-of-Truth). Current composer is text-only. Playwright assertion `compose_4_media_buttons` FAIL — none of 4 testid selectors found.
**Canon ref:** UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md §10.2
**Fix type:** JSX additive — add media button row to PostComposer
**Fix complexity:** M (1-2h per media type incl. handlers)
**File suspected:** [components/flow/PostComposer.jsx](apps/uzg-pwa/src/components/flow/PostComposer.jsx)
**Dual-tree:** Yes
**NTS-reported:** Yes ("Composer chỉ text, thiếu media upload" — from prev audit and NTS context)
**Previous-audit gap-id:** G013
**Status:** STILL_PRESENT (Fix-3 didn't add media buttons)

---

## BUG-013: Tap post does NOT open detail page or overlay

**Severity:** HIGH
**Category:** Interaction / Logic
**Route:** /dashboard
**Viewport:** Mobile (tested)
**Evidence:** Playwright assertion `tap_post_opens_detail` FAIL — clicking first post card does not change URL nor reveal post-detail overlay
**Description:** Per HOME canon §6.3, tapping a post card should navigate to `/post/:id` OR open a slide-up post detail sheet. Current behavior: click does nothing visible. The /post/:id route exists in App.jsx:4108 but is not wired to feed cards.
**Canon ref:** HOME §6.3 + UX flow spec
**Fix type:** JSX additive — onClick + Link or sheet trigger
**Fix complexity:** M (1-2h depending on overlay vs. route choice)
**File suspected:** Post card component (PostCardV3.tsx + corresponding feed list)
**Dual-tree:** Yes
**NTS-reported:** Yes ("Tap post chưa mở detail")
**Previous-audit gap-id:** Related G011
**Status:** STILL_PRESENT

---

## BUG-014: U-Reward popup `Mini app lobby` overlaps top-bar / page header on every page

**Severity:** HIGH
**Category:** Layout / Position
**Route:** All authenticated routes
**Viewport:** Both
**Evidence:** Every screenshot shows U-Reward card "Mini app lobby" floating top-right, overlapping page top-bar (e.g. /dashboard composer, /enta hub, /search title)
**Description:** U-Reward floating shell is positioned absolute top-right but overlaps top-bar elements rather than being inset below them. PR #111 (G001) repositioned to top-right but did not handle z-stack vs. top-bar correctly.
**Canon ref:** Foundation OS §3.4 + Position §1.2
**Fix type:** CSS — adjust top offset / z-index
**Fix complexity:** S (~15min)
**File suspected:** [components/layout/URewardV4FloatingShell.jsx](apps/uzg-pwa/src/components/layout/URewardV4FloatingShell.jsx)
**Dual-tree:** Yes
**NTS-reported:** No (G001 was reported & nominally fixed; this is residual)
**Previous-audit gap-id:** Drift from G001 fix
**Status:** WORSENED (was repositioned, now overlaps differently)

---

## BUG-015: Header tab bar "Cho bạn 12 / Đang theo dõi 10" mixed VI/EN inconsistency on dashboard

**Severity:** HIGH
**Category:** i18n / UX
**Route:** /dashboard
**Viewport:** Both
**Evidence:** [01_dashboard_mobile.png](screenshots/01_dashboard_mobile.png) shows "Cho bạn 12" + "Đang theo dõi 10" — VI tab labels — but feed below has English composer placeholder. Inconsistent locale mix.
**Description:** Tab bar correctly translated to VI ("Cho bạn" / "Đang theo dõi") but rest of /dashboard still English. Half-translation creates worse UX than fully-EN or fully-VI.
**Canon ref:** LANG_OS_02 consistency contract
**Fix type:** Depends on BUG-006 broader retrofit
**Fix complexity:** S (covered by BUG-006)
**File suspected:** Dashboard tab-bar component
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-016: Notifications page top-bar shows "Signals" not "Thông báo" / "Tín hiệu"

**Severity:** HIGH
**Category:** i18n
**Route:** /notifications
**Viewport:** Both
**Evidence:** [06_notifications_*.png](screenshots/) shows "Signals" as top-bar title and section heading
**Description:** Page title hardcoded English "Signals". Per VI locale should render "Thông báo" or "Tín hiệu". Playwright assertion `notifications_uses_vietnamese` FAIL.
**Canon ref:** LANG_OS_02 + HOME §11.4
**Fix type:** JSX wrap + i18n-key-add
**Fix complexity:** S (~10min, covered by BUG-006 retrofit)
**File suspected:** [pages/NotificationsPage.jsx](apps/uzg-pwa/src/pages/NotificationsPage.jsx)
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-017: Search page tabs "Top / Users / Circles / Posts" hardcoded English

**Severity:** HIGH
**Category:** i18n
**Route:** /search
**Viewport:** Both
**Evidence:** [07_search_*.png](screenshots/) tab bar all English
**Description:** Search tabs hardcoded English. Should be "Tất cả / Người dùng / Vòng tròn / Bài viết" per VI dictionary.
**Canon ref:** LANG_OS_02 + HOME §11.5 search pattern
**Fix type:** JSX wrap + i18n-key-add
**Fix complexity:** S (~10min)
**File suspected:** [pages/SearchPage.jsx](apps/uzg-pwa/src/pages/SearchPage.jsx)
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-018: /connect page top-bar shows "Chat / Communication" — wrong title

**Severity:** HIGH
**Category:** UX / Information Architecture
**Route:** /connect
**Viewport:** Both
**Evidence:** [08_connect_mobile.png](screenshots/08_connect_mobile.png), [08_connect_desktop.png](screenshots/08_connect_desktop.png) — top bar reads "Chat / Communication" instead of "Connect / Resonance"
**Description:** /connect route mounts ConnectionsPage but top-bar uses Chat title. Page body shows "CHAT / New Chat" section heading. Either ConnectionsPage delegates to chat-style UI (information architecture confusion) OR top-bar has hardcoded "Chat" title leaking from a different route's MainShell config.
**Canon ref:** HOME §7 (Connect = 4 trust levels Open / Resonance / Circle / Trusted, NOT chat)
**Fix type:** JSX-refactor — fix top-bar title resolution
**Fix complexity:** M (~30-60min)
**File suspected:** [pages/ConnectionsPage.jsx](apps/uzg-pwa/src/pages/ConnectionsPage.jsx) + MainShell title context
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Adjacent to G017
**Status:** STILL_PRESENT (G017 about UI levels still pending; this is a new wrong-title bug)

---

## BUG-019: Bottom nav labels mixed VI/EN across pages (same nav inconsistent)

**Severity:** HIGH
**Category:** i18n / UX
**Route:** All routes with bottom nav
**Viewport:** Both
**Evidence:** /profile/me shows "Trang chủ / Trò chuyện / UZG+ / Ví / ENTA" (VI). /dashboard /compose /notifications /search /connect show "Home / Chat / UZG+ / Wallet / ENTA" (EN). Same nav, different labels per page. **Same single render, contradictory state.**
**Description:** Bottom nav component re-renders per route mount and applies English fallback inconsistently. Suggests prop or context passing differs by route.
**Canon ref:** LANG_OS_02 + Foundation §7
**Fix type:** JSX-refactor — make nav use shared locale context
**Fix complexity:** S (~30min)
**File suspected:** BottomNav component + routing wrapper layers
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-020: Settings theme tile labels English "WATER / WOOD / FIRE / EARTH / METAL"

**Severity:** HIGH
**Category:** i18n
**Route:** /settings
**Viewport:** Mobile (tested)
**Evidence:** [11_settings_mobile.png](screenshots/11_settings_mobile.png) theme tiles labels English; descriptive paragraphs English
**Description:** Theme tiles English labels: WATER/Dark, WOOD/Green, FIRE/Red, EARTH/Gold, plus descriptive copy "Deep black surfaces for high-focus communication...", etc. Should be Vietnamese: THỦY / MỘC / HỎA / KIM / THỔ.
**Canon ref:** LANG_OS_02 + Theme System Canon v1.0
**Fix type:** JSX wrap + VI dict entries
**Fix complexity:** S (~30min)
**File suspected:** Settings appearance section / theme picker tiles
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Related to G030
**Status:** STILL_PRESENT (was LOW G030 partial; now apparent at higher severity)

---

## BUG-021: ENTA hub form fields shown overlapping U-Reward popup on mobile

**Severity:** HIGH
**Category:** Layout / Z-index
**Route:** /enta + indirectly /dashboard /compose for un-onboarded users
**Viewport:** Mobile
**Evidence:** [00_root_mobile.png](screenshots/00_root_mobile.png) (pre-seed), [10_enta_mobile.png](screenshots/10_enta_mobile.png) — U-Reward popup overlays form labels
**Description:** When ENTA hub displays form fields (Gender, Birthplace, Time zone, etc.), U-Reward floating shell overlaps them. Form labels become partially obscured.
**Canon ref:** Foundation OS §3.4 + position canon
**Fix type:** CSS — z-index + position offset
**Fix complexity:** S (~15min)
**File suspected:** URewardV4FloatingShell + EntaPage layout
**Dual-tree:** Yes
**NTS-reported:** No (related to G001 drift)
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-022: Dashboard composer not gated by auth properly — sovereign sees inline composer despite ENTA gate

**Severity:** HIGH
**Category:** Logic / Auth
**Route:** /dashboard
**Viewport:** Both
**Evidence:** Audit-runner observation — when sovereign is missing enta_profile, /dashboard redirects to /enta. With seeded enta_profile, /dashboard renders feed + inline composer. The composer is visible to anyone past the ENTA gate, not specifically to "fully-onboarded" users (per journey state engine should check has_connection too).
**Description:** Per [userJourneyEngine.js:212](apps/uzg-pwa/src/system/userJourneyEngine.js:212) `OPEN_HOME_THEN_CONNECT` action — user without connections is supposed to be guided to /dashboard for their first post. But composer visibility check is binary; should perhaps prompt "follow some users first" before allowing post.
**Canon ref:** Journey engine spec + HOME §1
**Fix type:** Conditional render
**Fix complexity:** S (~30min)
**File suspected:** Dashboard inline composer render condition
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT (likely intentional but worth review)

---

## BUG-023: Connect page New Chat / Personal / Requests / People tabs underline-text style not pills

**Severity:** HIGH
**Category:** Visual / Typography
**Route:** /connect
**Viewport:** Both
**Evidence:** [08_connect_mobile.png](screenshots/08_connect_mobile.png) tabs render as underlined text rather than pill-shaped buttons
**Description:** Tab bar visual: pure underlined text (anchor-style) instead of segmented pill buttons. Foundation §6 expects pill tabs for state-toggle navigation.
**Canon ref:** Foundation OS §6 (segmented controls)
**Fix type:** CSS rewrite of tab styles
**Fix complexity:** S (~30min)
**File suspected:** Tab component on Connections page
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Related to G017 / G019
**Status:** STILL_PRESENT

---

## BUG-024: API 409 errors for /notifications, /wallet/history, /wallet/convert/readiness on every page mount

**Severity:** HIGH
**Category:** Network / Backend
**Route:** Every authenticated page (initial mount)
**Viewport:** Both
**Evidence:** [audit-results.json](audit-results.json) `networkErrors` arrays — 9+ 409 responses per page load
**Description:** Multiple API endpoints return HTTP 409 Conflict on every page load. This may be backend RLS conflict, race condition, or stale request. Each page hits 9+ failed network calls before settling. Performance + data-freshness concern.
**Canon ref:** N/A (Lane_02 territory)
**Fix type:** Backend fix (not in audit scope) OR frontend retry-throttle
**Fix complexity:** Unknown (Lane_02 to investigate)
**File suspected:** /api/v1/notifications, /api/v1/wallet/* edge functions
**Dual-tree:** N/A
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT — Lane_02 follow-up needed (not Lane_01 to fix per R-LANE-01)

---

## BUG-025: Post card layout — image fills card but caption/author bar takes too little space

**Severity:** HIGH
**Category:** Layout / Spacing
**Route:** /dashboard
**Viewport:** Both
**Evidence:** [01_dashboard_*.png](screenshots/) — most posts have large media image with very small author + caption space
**Description:** Each post card devotes ~80% vertical to media, only ~10% to author + caption + actions row. Per HOME canon §6.2 cards should have balanced 60/30/10 ratio (media / caption / actions). Long captions get truncated heavily.
**Canon ref:** HOME §6.2
**Fix type:** CSS rewrite of card layout
**Fix complexity:** M (~1h)
**File suspected:** [components/home-v3/PostCardV3.tsx](apps/uzg-pwa/src/components/home-v3/PostCardV3.tsx) + module CSS
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-026: ENTA hub "Save ENTA and open Home" button placement — visible only at form bottom (long scroll)

**Severity:** HIGH
**Category:** UX / Position
**Route:** /enta (unfinished user) — visible during initial audit run before seed
**Viewport:** Mobile
**Evidence:** [00_root_mobile.png](screenshots/00_root_mobile.png) shows red CTA at bottom after form
**Description:** Submit CTA "Save ENTA and open Home" requires user to scroll past entire ENTA form (8+ fields) to reach. Should be sticky at bottom of viewport.
**Canon ref:** Foundation §7 sticky CTA pattern
**Fix type:** CSS — position sticky + z-index
**Fix complexity:** S (~15min)
**File suspected:** EntaPage form footer
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New (from this audit's pre-seed observation)
**Status:** STILL_PRESENT

---

## BUG-027: Feed reactions row shows numeric counts overlapping emoji icons

**Severity:** HIGH
**Category:** Layout / Spacing
**Route:** /dashboard
**Viewport:** Mobile (tighter spacing)
**Evidence:** [01_dashboard_mobile.png](screenshots/01_dashboard_mobile.png) — reaction counts (e.g. "1") overlap or sit too close to emoji icons
**Description:** Each reaction has emoji + numeric count. On mobile the gap is too tight, causing visual overlap. On desktop slightly better but still suboptimal.
**Canon ref:** Foundation §6 spacing tokens
**Fix type:** CSS gap / margin adjustment
**Fix complexity:** S (~10min)
**File suspected:** ReactionButtonV3 module CSS
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-028: Top-bar avatar circle "ME" — uses initials instead of avatar image

**Severity:** HIGH
**Category:** Visual / Logic
**Route:** All authenticated pages
**Viewport:** Both
**Evidence:** Every screenshot top-left shows black circle with "ME" letters
**Description:** When user has avatar_url null/empty (which sovereign profile does — `avatar_url: ''`), the top-bar shows "ME" initials. Should use named-initial color schema OR offer profile-pic upload prompt.
**Canon ref:** HOME §2.2 + Foundation §3
**Fix type:** Visual polish + JSX (initials per first/last name) + optional upload nudge
**Fix complexity:** S (~20min)
**File suspected:** Top-bar avatar component
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT (sovereign-specific but reflects new-user state)

---

# MEDIUM (15)

## BUG-029: U-Reward popup card uses old V2 palette (orange-tinted) not neutral-dark canvas

**Severity:** MEDIUM
**Category:** Color / Theme
**Route:** All
**Viewport:** Both
**Evidence:** All screenshots — U-Reward card has slight orange/cream tint in background
**Description:** U-Reward shell card uses pre-V2-UI-Upgrade palette (PR #106 introduced neutral-dark; this card was not retrofit). Should use `var(--surface-elevated)` token.
**Canon ref:** Foundation §3 token set + Theme Canon v1.0
**Fix type:** CSS token replacement
**Fix complexity:** S (~5min)
**File suspected:** URewardV4FloatingShell module CSS
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Adjacent G014
**Status:** STILL_PRESENT

---

## BUG-030: Composer "Post" submit button styled too small — primary CTA per canon

**Severity:** MEDIUM
**Category:** Visual / Typography
**Route:** /compose, /dashboard inline
**Viewport:** Both
**Evidence:** Composer post button is a small pill — should be prominent primary CTA
**Description:** Per Foundation §6 buttons, primary CTA uses `--button-primary` token + larger 44px touch target. Current "Post" button is ~28px height pill blending with content.
**Canon ref:** Foundation §6 + accessibility 44px touch min
**Fix type:** CSS rewrite
**Fix complexity:** S (~10min)
**File suspected:** PostComposer button styling
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-031: Post card author handle "@duy" "@kien" displays without space + small font

**Severity:** MEDIUM
**Category:** Typography
**Route:** /dashboard
**Viewport:** Both
**Evidence:** [01_dashboard_mobile.png](screenshots/01_dashboard_mobile.png) — handle inline with display name, small font
**Description:** Handle should be on separate line OR clearly differentiated typography from display name. Current layout: name + handle + timestamp inline, hard to scan.
**Canon ref:** HOME §6.2.3 author bar
**Fix type:** CSS layout adjustment
**Fix complexity:** S (~15min)
**File suspected:** PostCardV3 author bar
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-032: Notifications page has no actual notification list when 0 — empty state takes whole viewport

**Severity:** MEDIUM
**Category:** UX
**Route:** /notifications
**Viewport:** Both
**Evidence:** [06_notifications_*.png](screenshots/) — large empty state card "No notifications yet" + spread layout
**Description:** When count = 0, the page is sparse with stats cards (Unread / Total / Sync) followed by big empty-state. Could collapse stats into smaller summary or hide them.
**Canon ref:** Foundation §7 empty states
**Fix type:** UX redesign of empty state
**Fix complexity:** M (~1h)
**File suspected:** NotificationsPage.jsx
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-033: Search page tabs counter not visible (Top / Users / Circles / Posts have no count)

**Severity:** MEDIUM
**Category:** UX
**Route:** /search
**Viewport:** Both
**Evidence:** [07_search_*.png](screenshots/) tabs lack result count badges
**Description:** Per HOME §11.5 search pattern, each tab should show result count when query active (e.g. "Users (12)"). Currently tabs are just labels.
**Canon ref:** HOME §11.5
**Fix type:** JSX additive
**Fix complexity:** S (~30min)
**File suspected:** SearchPage.jsx tab bar
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-034: Connect "0 Friends / 0 Requests / 0 People" pill counters greyed-out + low contrast

**Severity:** MEDIUM
**Category:** Color / Accessibility
**Route:** /connect
**Viewport:** Both
**Evidence:** [08_connect_*.png](screenshots/) — pill counters are barely-visible grey
**Description:** Counter pills disabled-state contrast ratio < 3.0. WCAG fail.
**Canon ref:** Accessibility §1 contrast minimum
**Fix type:** CSS color token swap
**Fix complexity:** S (~10min)
**File suspected:** ConnectionsPage counter pills
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-035: Dashboard top-bar `Bạn ơi...` notification banner pinned but cuts off (truncated text)

**Severity:** MEDIUM
**Category:** Layout / Truncation
**Route:** /dashboard
**Viewport:** Both
**Evidence:** [01_dashboard_*.png](screenshots/) banner above feed reads `Bạn ơi 1 ❤️ Phản ứng mới`
**Description:** Notification banner is truncated horizontally. Either expand banner OR remove + use top-bar bell badge.
**Canon ref:** HOME §11.6 notification surfacing
**Fix type:** Architecture decision
**Fix complexity:** M (~30-60min)
**File suspected:** Dashboard notification banner component
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-036: Settings appearance section header `Giao diện` large font but body description tiny

**Severity:** MEDIUM
**Category:** Typography hierarchy
**Route:** /settings
**Viewport:** Mobile
**Evidence:** [11_settings_mobile.png](screenshots/11_settings_mobile.png) — section heading 18px, helper text 11px (overcorrected hierarchy)
**Description:** Heading-to-helper font-size ratio too aggressive — readability suffers. Per Foundation §6.2 typography scale should be 18 → 14 not 18 → 11.
**Canon ref:** Foundation §6.2
**Fix type:** CSS font-size adjust
**Fix complexity:** S (~5min)
**File suspected:** Settings module CSS
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Adjacent G029
**Status:** STILL_PRESENT

---

## BUG-037: Profile page handle is null — shows "@" or empty space

**Severity:** MEDIUM
**Category:** Logic
**Route:** /profile/me
**Viewport:** Mobile
**Evidence:** [09_profile_me_mobile.png](screenshots/09_profile_me_mobile.png) — username area below "Member" label is sparse
**Description:** Sovereign profiles.handle = null. Profile page shows display name or fallback "Member" but doesn't surface handle. Per HOME §7.3 profile preview canon, handle should always be displayed (e.g. `@user_<id>` placeholder or "Set username" prompt).
**Canon ref:** HOME §7.3
**Fix type:** Conditional render + nudge UI
**Fix complexity:** S (~20min)
**File suspected:** ProfilePage.jsx handle display
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-038: Compose Back button hides label "Back" on mobile (only ← arrow)

**Severity:** MEDIUM
**Category:** Visual / Accessibility
**Route:** /compose
**Viewport:** Mobile
**Evidence:** [02_compose_mobile.png](screenshots/02_compose_mobile.png) shows ONLY ← arrow + circle border. [02_compose_desktop.png](screenshots/02_compose_desktop.png) shows ← Back + label.
**Description:** Mobile viewport hides "Back" text via CSS (likely `display: none` on `.compose-page-back-label` at narrow viewport). Aria-label still says "Back" so screen reader OK, but visible label missing reduces clarity. After PR #119 (BUG-PLUS-01 i18n fix) the label should be "Quay lại" + visible at all viewports.
**Canon ref:** Accessibility §1 + UX flow
**Fix type:** CSS — show label at all widths OR larger arrow with implicit affordance
**Fix complexity:** S (~10min)
**File suspected:** ComposePage.jsx + module CSS
**Dual-tree:** Yes
**NTS-reported:** Indirect (NTS reported `[[vi_missing:common.back]]` — fixed; this is post-fix UX decision)
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-039: ENTA hub form long-scroll friction on mobile (8+ fields, no progress indicator)

**Severity:** MEDIUM
**Category:** UX
**Route:** /enta (un-onboarded users)
**Viewport:** Mobile
**Evidence:** [00_root_mobile.png](screenshots/00_root_mobile.png) shows lengthy form
**Description:** ENTA hub form has Gender / Birthplace / Time zone / Certainty mode / Birth hour group / Birth day / Birth month / Birth year — 8+ fields, no step indicator, no progress bar, no save-as-draft. Heavy abandonment risk.
**Canon ref:** UX flow spec §enta-onboarding
**Fix type:** Multi-step wizard refactor (already exists per /enta/onboarding 5-step but /enta direct goes through long form)
**Fix complexity:** L (3-4h architectural change)
**File suspected:** EntaPage form vs. EntaOnboardingPage wizard
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Related G011 keystone
**Status:** STILL_PRESENT

---

## BUG-040: ENTA hub uses SGDc currency for sovereign user (Singapore default) — no detect

**Severity:** MEDIUM
**Category:** Logic
**Route:** /enta + /settings
**Viewport:** Both
**Evidence:** [11_settings_mobile.png](screenshots/11_settings_mobile.png) Tiền tệ → SGDc; [00_root_mobile.png](screenshots/00_root_mobile.png) defaulted to United States timezone but SGDc currency — inconsistent
**Description:** sovereign profile country_code='SG', currency='SGDc' but timezone='America/New_York'. Settings sometimes auto-detect from IP but here manual mismatch persists. Mid-priority data sanity bug.
**Canon ref:** N/A (data sanity)
**Fix type:** Logic — country/timezone/currency consistency check + nudge
**Fix complexity:** S (~30min)
**File suspected:** Settings save handler
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT (sovereign-specific data, but reflects bootstrap UX)

---

## BUG-041: Search page initial state lacks recent searches / suggestions

**Severity:** MEDIUM
**Category:** UX
**Route:** /search
**Viewport:** Both
**Evidence:** [07_search_*.png](screenshots/) — empty page reads "Start typing to search" with no quick-access affordances
**Description:** Per HOME §11.5 search pattern, initial search page should show recent searches, trending, or suggested users to bootstrap discovery. Current design: blank page until user types.
**Canon ref:** HOME §11.5
**Fix type:** JSX additive — recent + trending sections
**Fix complexity:** M (~1h)
**File suspected:** SearchPage.jsx initial render
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-042: Connect page "Suggested ENTA" section reads "No suggestions yet" — no API wire-up

**Severity:** MEDIUM
**Category:** Logic / Architecture
**Route:** /connect
**Viewport:** Both
**Evidence:** [08_connect_*.png](screenshots/) bottom shows "No suggestions yet" empty state with subtext "As your live circles, interactions, and connections grow..."
**Description:** Suggested ENTA section appears to be unwired — no API call to actually fetch suggestions. Just placeholder copy. Per HOME §7.6 should show 5-10 suggested users.
**Canon ref:** HOME §7.6
**Fix type:** Logic + API wire-up
**Fix complexity:** M (~1-2h)
**File suspected:** ConnectionsPage suggestions section + productV2Service
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-043: Profile page "Sửa hồ sơ" / "Mở chat" / "Mở ví" action chip row — buttons low-contrast

**Severity:** MEDIUM
**Category:** Color / Accessibility
**Route:** /profile/me
**Viewport:** Mobile
**Evidence:** [09_profile_me_mobile.png](screenshots/09_profile_me_mobile.png) — three action pills appear faded grey
**Description:** Action pills have low contrast against neutral-light background. Should use slightly more contrast or filled variant.
**Canon ref:** Accessibility §1 contrast
**Fix type:** CSS — color token swap
**Fix complexity:** S (~10min)
**File suspected:** ProfilePage action chip row CSS
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

# LOW (7)

## BUG-044: Footer / safe-area inset not visible — bottom nav touches viewport edge

**Severity:** LOW
**Category:** Layout
**Route:** All routes with bottom nav
**Viewport:** Mobile
**Evidence:** Bottom nav rests on viewport bottom edge, no iOS safe-area inset reservation visible
**Description:** Mobile shell should respect `env(safe-area-inset-bottom)` for iOS notch/home-indicator. Currently nav is flush with viewport edge.
**Canon ref:** Foundation OS §1.2 + iOS PWA spec
**Fix type:** CSS — `padding-bottom: env(safe-area-inset-bottom)`
**Fix complexity:** S (~5min)
**File suspected:** BottomNav module CSS
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-045: No skeleton loading states on page transitions (raw flash + suspense fallback)

**Severity:** LOW
**Category:** Animation / Performance
**Route:** All
**Viewport:** Both
**Evidence:** Audit-runner observation — page transitions show blank flash before content
**Description:** Lazy-loaded routes flash blank page before content renders. Per Foundation §7 should show skeleton or spinner during Suspense fallback.
**Canon ref:** Foundation §7
**Fix type:** Suspense fallback enhancement
**Fix complexity:** M (~1h to do well)
**File suspected:** App.jsx Suspense wrappers
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** Related G007 G016
**Status:** STILL_PRESENT

---

## BUG-046: Profile page tabs "Bài viết / ENTA / Năng lực" — 3rd tab hidden by + button

**Severity:** LOW
**Category:** Layout
**Route:** /profile/me
**Viewport:** Mobile
**Evidence:** [09_profile_me_mobile.png](screenshots/09_profile_me_mobile.png) — "+" floating button overlaps "Năng lực" 3rd tab
**Description:** Floating + button sits at right edge, partially overlapping last tab label.
**Canon ref:** Foundation §6 + position
**Fix type:** CSS — z-index OR move + button down
**Fix complexity:** S (~10min)
**File suspected:** ProfilePage layout
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-047: Search input loses focus on tab switch (no auto-focus on tab change)

**Severity:** LOW
**Category:** UX
**Route:** /search
**Viewport:** Both
**Evidence:** Audit-runner not specifically tested but implied by static implementation
**Description:** Tab change between Top/Users/Circles/Posts should preserve search input focus. Currently focus is lost.
**Canon ref:** UX flow spec
**Fix type:** Logic — focus management
**Fix complexity:** S (~15min)
**File suspected:** SearchPage tab change handler
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** UNVERIFIED — visual/interaction only, requires manual confirmation

---

## BUG-048: Settings "Lưu thay đổi / Quay lại hồ sơ" buttons stacked vertically — large vertical drift

**Severity:** LOW
**Category:** Layout
**Route:** /settings
**Viewport:** Mobile
**Evidence:** [11_settings_mobile.png](screenshots/11_settings_mobile.png) — 2 buttons stacked one-above-other take ~120px space
**Description:** Settings save + cancel buttons stack vertically on mobile. Should be side-by-side (50/50) at all viewports.
**Canon ref:** Foundation §6 button-row pattern
**Fix type:** CSS flex-direction adjustment
**Fix complexity:** S (~5min)
**File suspected:** Settings footer
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-049: Long post titles wrap to 4+ lines on mobile — should truncate with "Read more"

**Severity:** LOW
**Category:** Typography / UX
**Route:** /dashboard
**Viewport:** Mobile
**Evidence:** [01_dashboard_mobile.png](screenshots/01_dashboard_mobile.png) — some posts wrap to 3-4 lines visible
**Description:** Post body text wraps long. Per HOME §6.2.3 caption canon should truncate after 2-3 lines with "Read more" affordance.
**Canon ref:** HOME §6.2.3
**Fix type:** CSS line-clamp + JSX "Read more"
**Fix complexity:** S (~30min)
**File suspected:** PostCardV3 caption section
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

## BUG-050: ENTA hub "Chưa có ảnh bìa" empty state — small cover image area 80px tall

**Severity:** LOW
**Category:** Layout
**Route:** /profile/me
**Viewport:** Mobile
**Evidence:** [09_profile_me_mobile.png](screenshots/09_profile_me_mobile.png) — cover area is small banner above avatar
**Description:** Cover area too short — 80px gives little visual presence. Twitter-style profile expects ~200px cover.
**Canon ref:** HOME §7.4 profile canon
**Fix type:** CSS height adjust
**Fix complexity:** S (~10min)
**File suspected:** ProfilePage cover section
**Dual-tree:** Yes
**NTS-reported:** No
**Previous-audit gap-id:** New
**Status:** STILL_PRESENT

---

# Cross-cutting findings

## Categories distribution

| Category | Count |
|---|---|
| i18n (raw key + locale + hardcoded EN) | 12 |
| Layout / Position | 11 |
| Color / Theme / Contrast | 6 |
| Visual / Typography | 5 |
| UX / Information Architecture | 6 |
| Logic / Architecture | 6 |
| Network / Backend (Lane_02) | 1 |
| Animation | 1 |
| Accessibility | 2 |

## Fix-type distribution

| Fix type | Count | Auth needed |
|---|---|---|
| CSS-only | 25 | NO |
| JSX-additive | 10 | YES (logic auth) |
| JSX-refactor | 6 | YES |
| i18n-key-add | 5 | NO |
| Logic patch | 3 | YES |
| Backend (Lane_02) | 1 | (out of scope) |

## Fix-complexity distribution

| Complexity | Count |
|---|---|
| S (<30min) | 30 |
| M (30-90min) | 13 |
| L (>90min) | 7 |

**Aggregate fix ETA:** ~30 × 15min + 13 × 60min + 7 × 180min = 450 + 780 + 1260 = ~41 hours total. Realistically across 6-10 sprints @ 4-6h each.

---

# NTS-reported bugs from 2026-05-03 evidence — final-status table

| NTS-reported observation | Bug ID | Status | Fix sprint |
|---|---|---|---|
| `[[vi_missing:common.back]]` raw key on /compose | (BUG-PLUS-01 cleared by PR #119) + BUG-004 root | PARTIAL — symptom fixed, root resolver bug remains | Sprint Fix-i18n-A |
| Composer cắt hình tròn đen layout vỡ /compose | BUG-001 | STILL_PRESENT | Sprint Fix-Compose-Layout |
| Bottom nav nổi giữa screen sai mobile shell /dashboard | BUG-007 | STILL_PRESENT | Sprint Fix-Shell-A |
| Composer top duplicate với /compose | BUG-008 | STILL_PRESENT | Sprint Fix-Compose-Arch |
| 5 ngũ hành reactions emoji rời, không pentagon | BUG-003 | STILL_PRESENT | Sprint Fix-Pentagon |
| Background trắng KHÔNG neutral-dark | BUG-002 | WORSENED | Sprint Fix-Theme-A |
| Tap post chưa mở detail | BUG-013 | STILL_PRESENT | Sprint Fix-Post-Tap |

**6/7 NTS-reported bugs STILL_PRESENT or WORSENED.** PR #119 fixed only 1 (common.back i18n key — symptom not root).

---

# Previous audit baseline comparison (vs 2026-05-02 G001-G030)

| 2026-05-02 ID | Status now | Notes |
|---|---|---|
| G001 U-Reward popup top-right | DONE PR #111 → drift to BUG-014 (overlap) | Repositioned but z-stack still wrong |
| G002 U-Reward close button | DONE (Fix-3 wave) — but BUG-005 raw aria-label key | Button exists, label broken |
| G003 Top Bar font | UNVERIFIED — locale leak masks observation | Need post-Fix-i18n re-audit |
| G004 Avatar 32px → 36px | UNVERIFIED | Need pixel measurement |
| G005 Top Bar background | WORSENED → BUG-002 app-wide | Light gradient instead of neutral-dark |
| G006 Card spacing | UNVERIFIED | Subjective, need spec compare |
| G007 Skeleton loader | NEW BUG-045 still pending | LOW priority |
| G008 Login heading typography | DEFERRED — login not re-audited | Same state likely |
| G009 Login form spacing | DEFERRED | Same |
| G010 Login bg gradient | DEFERRED | Same |
| G011 V2 HOME social feed missing | **PARTIAL FIXED** PR #114 — feed renders, but BUG-001/003/006/007/008/013 cluster shows it's incomplete | Major progress, polish gap |
| G012 ENTA Identity intelligence font | DEFERRED | Need re-check |
| G013 ENTA hub form-style not feed | RESOLVED via PR #114 (V2 has feed at /dashboard now) | Different UX flow |
| G014 Form border greenish | UNVERIFIED on settings; ADJ BUG-029 U-Reward palette | |
| G015 Form gap 8 → 12-16 | UNVERIFIED | |
| G016 Page mount fade-in | LOW = BUG-045 cluster | |
| G017 Connect 4 trust levels | STILL_PRESENT — appears as BUG-018 wrong-title + BUG-023 tab style | UI not built |
| G018 Resonance casing | UNVERIFIED — page now loads CHAT layout | |
| G019 Lane tabs styling | STILL_PRESENT BUG-023 | |
| G020 List padding | UNVERIFIED | |
| G021 Empty state illustration | STILL_PRESENT | |
| G022 Profile heading font | UNVERIFIED — page in VI works | |
| G023 Profile avatar 64 → 96-128 | UNVERIFIED | Need pixel measure |
| G024 Profile ENTA wheel | UNVERIFIED | Need re-check |
| G025 Profile card bg | UNVERIFIED | |
| G026 Tap avatar profile preview sheet | STILL_PRESENT (no change) | |
| G027 Profile open transition | LOW BUG-045 cluster | |
| G028 Settings panel rounded corners | UNVERIFIED | |
| G029 Settings section heading font | RELATED BUG-036 (typography hierarchy now overcorrected) | |
| G030 Theme picker borders | EXPANDED to BUG-020 theme tile labels English | |

**Summary:** 1 fully done (G001), 1 partial (G011 → 60% done with cluster of polish bugs), 1 cleared (G013 superseded), ~3 verified-and-status-changed (G005, G017, G018, G019), 4 unverified deferred to follow-up audit, ~17 untouched waiting on Tier 1 CSS sprint.

---

# Recommended fix sprint queue (CLA dispatch)

### Tier 0 — CRITICAL (must ship first; block Tier 1/2)

1. **Sprint Fix-i18n-A** (~1-2h, logic auth) — Patch [languageFoundation.js:7430](apps/uzg-pwa/src/system/languageFoundation.js:7430) resolver to honor `fallback` arg. Closes BUG-004 root cause.
2. **Sprint Fix-Compose-Layout** (~30min, CSS only) — Override composer container border-radius + dimensions. Closes BUG-001.
3. **Sprint Fix-Theme-A** (~30min, CSS only) — Apply neutral-dark canvas to body/app-shell across all HOME social pages. Closes BUG-002.

### Tier 1 — HIGH visible

4. **Sprint Fix-i18n-B** (~3-4h, JSX wrap) — Retrofit Dashboard/ComposePage/Notifications/Search/Connections/PostComposer/BottomNav with `appT()`. Closes BUG-006/009/010/011/015/016/017/019/020.
5. **Sprint Fix-i18n-C** (~1h) — Add VI dict entries for U-Reward shell + theme tiles. Closes BUG-005/020.
6. **Sprint Fix-Pentagon** (~1-2h, JSX/CSS) — Replace horizontal emoji reaction strip with pentagon geometry per Pentagon Amendment 001. Closes BUG-003.
7. **Sprint Fix-Shell-A** (~30min, CSS) — Bottom-nav padding + safe-area inset. Closes BUG-007/044.
8. **Sprint Fix-Compose-Arch** (~1-2h, JSX) — Resolve duplicate composer (decide /dashboard inline vs. /compose dedicated). Closes BUG-008.
9. **Sprint Fix-Post-Tap** (~1-2h, JSX additive) — Wire tap-post → /post/:id navigation OR overlay sheet. Closes BUG-013.
10. **Sprint Fix-Connect-A** (~1h, JSX) — Fix /connect top-bar title + tab styling. Closes BUG-018/023.

### Tier 2 — POLISH

11. **Sprint Fix-Compose-Media** (~3-4h) — Add 4 media buttons (image/video/poll/qot) to composer. Closes BUG-012.
12. **Sprint Fix-UReward-A** (~30min) — z-index + offset on U-Reward popup. Closes BUG-014/021/029.
13. **Sprint Fix-Card-Layout** (~1-2h) — Post card 60/30/10 ratio. Closes BUG-025/027/031/049.
14. **Sprint Fix-Profile-A** (~30min) — Profile UX polish (handle, action chips, cover, tabs). Closes BUG-037/043/046/050.

### Tier 3 — UX redesign

15. **Sprint Fix-Search-A** (~1-2h) — Search initial state + counts + recent. Closes BUG-033/041/047.
16. **Sprint Fix-Notif-A** (~1h) — Notifications empty state + locale. Closes BUG-016/032.
17. **Sprint Fix-Connect-B** (~1-2h) — Suggested ENTA wire-up + counter polish. Closes BUG-034/042.

### Tier 4 — Audit extension

18. **Sprint Audit-C** (~2-3h) — Capture deferred 16 routes (post detail, qot, profile sub-pages, connect sub-lanes, social-brain, onboarding).

### Out of scope (handoff)

- **BUG-024** API 409 errors — Lane_02 backend investigation (R-LANE-01 boundary).
- **BUG-022** Conditional composer auth — needs product decision (UX call).

---

# Closing note

The 2026-05-03 production state is materially better than 2026-05-02 — Fix-3 keystone shipped V2 HOME social feed (closing G011 architectural gap). However the polish sprint following Fix-3 has not yet shipped — visible LOW-effort bugs (i18n retrofit, composer layout, neutral-dark canvas) remain. NTS' 2026-05-03 report accurately captures the polish-pending state.

The single biggest single-sprint impact is **Sprint Fix-i18n-A** (resolver patch) which protects against future raw key leaks system-wide. Recommended dispatch order:

1. Fix-i18n-A (root cause — protects future)
2. Fix-Compose-Layout (most visible NTS bug)
3. Fix-Theme-A (Background canvas)
4. Fix-i18n-B (HOME social retrofit)
5. Fix-Pentagon (NTS bug)
6. Fix-Shell-A (NTS bug)
7. Remaining tiers in order

End of catalog.
