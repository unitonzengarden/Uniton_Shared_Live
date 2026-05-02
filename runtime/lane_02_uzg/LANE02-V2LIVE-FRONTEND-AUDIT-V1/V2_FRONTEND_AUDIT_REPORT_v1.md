# LANE02-V2LIVE-FRONTEND-AUDIT-V1 — V2 Live Frontend Audit Report v1

**Task ID:** LANE02-V2LIVE-FRONTEND-AUDIT-V1  
**Executor:** CURSOR-2 (Desktop stream)  
**Date:** 2026-05-02  
**Mode:** READ-ONLY — zero code modifications  
**Authority:** AMD_NTS_FULL_TECH_AUTONOMY + handoff Lane_01 STRATEGIC-PIVOT-V2-DIRECT-UI-UPGRADE

---

## §A — Repo Structure + Framework

| Item | Value |
|------|-------|
| Framework | React + Vite (SPA) |
| Router | react-router-dom v6 (`<Routes>`, `<Route path=...>`) |
| Build target | Cloudflare Pages (dist/ via `npx wrangler pages deploy dist`) |
| Entry point | `src/main.jsx` + `src/App.jsx` (4,266 lines) |
| Language | TypeScript + JSX mixed (TS: ~60%, JSX: ~40%) |
| Styling | CSS Modules (.module.css) + plain CSS + inline CSS-in-JS |
| Theme | `src/theme/appTheme.js` — 5 themes: metal/water/wood/fire/earth |
| Design tokens | `src/styles.css` (CSS custom properties), `src/theme/` |
| State management | React hooks + Context (no Redux/Zustand) |
| Backend client | `src/lib/v2ExpressClient.ts` + `src/services/productV2Service.js` |

### Top-level src structure

```
src/
  App.jsx            — main router (4266 lines, all routes)
  components/        — all UI components per module
  pages/             — top-level page components
  hooks/             — React hooks per module
  services/          — API client services
  lib/               — Supabase client + V2 express client
  types/             — TypeScript type definitions
  theme/             — theme system + design tokens
  data/              — data layer config (TAO_DATA_SOURCE, mock data)
  system/            — language OS, user journey engine
```

---

## §B — V2 LIVE Routes Catalog (HTTP probe results)

All routes return **HTTP 200** — Cloudflare Pages SPA serves index.html for all paths.

### User-facing routes (V2 LIVE)

| Route | Page Component | Status | Notes |
|-------|---------------|--------|-------|
| `/dashboard` | Dashboard.jsx | ✅ 200 | Home after login |
| `/home` | → redirect /dashboard | ✅ 200 | |
| `/chat` | InboxPage.jsx | ✅ 200 | V2 Chat inbox |
| `/chat/:id` | DirectMessageThreadPage.jsx | ✅ 200 | DM room |
| `/chat/:id/info` | ChatRoomInfoPage.jsx | ✅ 200 | |
| `/wallet` | WalletMainActionPage | ✅ 200 | V2 Wallet |
| `/wallet/asset/:code` | WalletAssetDetailPage | ✅ 200 | |
| `/wallet/convert` | WalletPage.jsx | ✅ 200 | |
| `/app` | PLUSHub (AppGatewayRoute) | ✅ 200 | V2 PLUS Hub |
| `/plus` | → redirect /app | ✅ 200 | |
| `/membership` | MembershipPage.jsx | ✅ 200 | V2 Membership |
| `/u-reward` | → redirect /u-earnings | ✅ 200 | |
| `/u-earnings` | UEarningsPage.jsx | ✅ 200 | V2 U-Reward |
| `/tao/bazi` | TaoBaziOverviewPage.jsx | ✅ 200 | V2 TAO Bazi |
| `/tao/bazi/pillars` | TaoBaziPillarsPage.jsx | ✅ 200 | |
| `/tao/bazi/day-master` | TaoBaziDayMasterPage.jsx | ✅ 200 | |
| `/tao/bazi/create` | TaoBaziCreatePage.jsx | ✅ 200 | |
| `/tao/bazi/saved` | TaoBaziSavedPage.jsx | ✅ 200 | |
| `/tao/bazi/useful-god` | TaoBaziUsefulGodPage.jsx | ✅ 200 | |
| `/tao/bazi/luck-pillars` | TaoBaziLuckPillarsPage.jsx | ✅ 200 | |
| `/tao/phongthuy` | TaoPhongThuyOverviewPage.jsx | ✅ 200 | |
| `/tao/phongthuy/bat-trach` | TaoPhongThuyBatTrachPage.jsx | ✅ 200 | |
| `/tao/lichvannien` | TaoVanNienCalendarPage.jsx | ✅ 200 | |
| `/tao/lichvannien/today` | TaoVanNienDailyDetailPage.jsx | ✅ 200 | |
| `/tao/tuvi` | TaoZiweiNatalChartPage.jsx | ✅ 200 | V2 Tử Vi |
| `/tao/tuvi/create` | TaoZiweiCreatePage.jsx | ✅ 200 | |
| `/tao/tuvi/saved` | TaoZiweiSavedPage.jsx | ✅ 200 | |
| `/tao/aier` | TaoAierPage.jsx | ✅ 200 | AIER chat |

**Total V2 LIVE user-facing routes: 28+ (27 above + enta/connect/profile/settings/notifications)**

---

## §C — CHAT Module Audit

**Folder:** `src/components/chat/` (V2) + `src/components/chat-v3/` (V3 upgrade)  
**File count:** V2=26 files, V3=20 files  
**Main pages:** `InboxPage.jsx` → `ChatRoomInfoPage.jsx` → `DirectMessageThreadPage.jsx`

### V2 Chat Components
```
ChatInbox.tsx        — inbox list (stories + CSS module)
ChatComposer.tsx     — message input
DMRoom.tsx           — DM thread view
MessageBubble.tsx    — single message bubble
AIERAdvisor.tsx      — AIER chat advisor surface
CircleGroup.tsx      — circle group chat surface
TypingIndicator.jsx  — typing state indicator
PresenceBadge.jsx    — online/offline badge
MuteControls.jsx     — mute/unmute actions
SafetyBanner.jsx     — content safety alert
+ hooks/ subfolder
```

### V3 Chat Components (upgrade layer already shipped)
```
ChatInboxV3.tsx, DMRoomV3.tsx, MessageBubbleV3.tsx, ComposerDockV3.tsx
InboxSkeletonV3.tsx, InboxEmptyStateV3.tsx, ConversationListItemV3.tsx
MessageStreamV3.tsx, RoomTopBarV3.tsx, TypingIndicatorV3.tsx
```

### V2 Routes
- `GET /chat` → inbox (loads conversations via `/api/v1/conversations`)
- `GET /chat/:conversationId` → DM room (messages via `/api/v1/messages`)
- `POST /chat/:conversationId` → create message

### Backend Endpoints
- `GET /api/v1/conversations` — inbox list
- `POST /api/v1/conversations` — create conversation
- `GET /api/v1/messages?conversation_id=X` — message history
- `POST /api/v1/messages` — send message
- `POST /api/v1/messages/read` — mark read
- `POST /api/v1/conversations/presence` — online presence
- `POST /api/v1/conversations/typing` — typing indicator
- Supabase Realtime: `enta_messages` INSERT channel

### Styling
- CSS Modules (`.module.css`) for V2 + V3 components
- Theme tokens via CSS custom properties (`--bg-surface`, `--text-primary`)

### V3 Pivot Status
- V3 upgrade components: ✅ 20 files already in `chat-v3/`
- Consumed by: `/v3/chat` routes (Sprint 5.3+)
- Gap: V2 pages (`InboxPage.jsx`, `DirectMessageThreadPage.jsx`) still use old V2 components
- **Strategic pivot**: Swap V2 `ChatInbox.tsx` → `ChatInboxV3.tsx` in `InboxPage.jsx`

### Known Issues (from Track A audit)
- BUG-CHAT-01 ENTA gate: **FIXED** commit `ef9bf33` (LANE02-PHASE6-P1-BUGFIX-V1)
- Chat blocked for users without ENTA Root profile — now shows Vietnamese CTA

---

## §D — WALLET Module Audit

**Folder:** `src/components/wallet/` (V2) + `src/components/wallet-v3/` (V3 upgrade)  
**File count:** V2=41 files, V3=12 files  
**Main pages:** `WalletPage.jsx` → `WalletMainActionPage`, `WalletAssetDetailPage`

### V2 Wallet Components (selected)
```
WalletOverview.tsx       — balance overview (CSS module)
WalletDashboard.jsx      — full dashboard
WalletHero.jsx           — hero balance display
AssetDetail.tsx          — asset detail view
TransactionHistory.tsx   — transaction list
ConvertPanel.tsx         — U→UZG conversion
SendFlow.tsx             — send U/UZG flow
ReceiveQR.tsx            — receive QR code
TransferPanel.jsx, DepositPanel.jsx, WithdrawPanel.jsx
WalletActionModal.jsx, WalletActionRail.jsx
WalletBalancePanel.jsx, WalletRestrictionState.jsx
```

### V3 Wallet Components (upgrade layer)
```
WalletOverviewV3.tsx, WalletShellV3.tsx, AssetCardV3.tsx
ConvertOverlayV3.tsx, WalletEmptyStateV3.tsx, WalletSkeletonV3.tsx
TransactionListV3.tsx, TransactionRowV3.tsx + more
```

### V2 Routes
- `/wallet` — main wallet overview
- `/wallet/asset/:assetCode` — asset detail
- `/wallet/activity/:transactionId` — transaction detail
- `/wallet/transfer`, `/wallet/convert` — action sub-pages

### Backend Endpoints
- `GET /api/v1/wallet/summary` — balances
- `GET /api/v1/wallet/history` — transaction history
- `POST /api/v1/wallet/transfer` — P2P transfer
- `POST /api/v1/wallet/convert` — U→UZG conversion
- `GET /api/v1/wallet/convert/readiness` — eligibility check
- `POST /api/v1/deposits/address` — deposit address
- Edge Functions: `reward_emit`, `wallet_convert_u_to_uzg`, `wallet_spend_uzg`
- Supabase tables: `wallet_accounts`, `wallet_ledger`, `wallet_transactions`, `wallet_assets`

### Known Issues (from Track A audit)
- BUG-WALLET-01 black background on `/v3/wallet/convert`: **FIXED** commit `ef9bf33`
- BUG-WALLET-02 empty state no CTA: **FIXED** commit `ef9bf33`
- Note: These bugs were in V3 namespace — V2 wallet uses different components

### V3 Pivot Status
- V3 upgrade components: ✅ 12 files in `wallet-v3/`
- Consumed by `/v3/wallet` routes
- Gap: V2 `/wallet` still uses old components
- **Strategic pivot**: Swap V2 pages to use `wallet-v3/` components

---

## §E — PLUS Hub + Membership Module Audit

**Folder:** `src/components/plus-hub/` (19 files) + `src/components/membership/` (3 files)  
**V3 versions:** `src/components/plus-v3/` + `src/components/membership-v3/`  
**Main pages:** `PlusPage.jsx` (compose), `MembershipPage.jsx`

### V2 PLUS Hub Components
```
PLUSHub.tsx              — main hub shell (MiniAppTakeover pattern)
PinnedSection.tsx        — pinned apps grid
AllAppsSection.tsx       — all apps catalog
FeaturedSection.tsx      — featured/promoted apps
AppGrid.tsx              — grid layout for app icons
AppIcon.tsx              — single app icon with label
AppSearchOverlay.tsx     — search overlay
AppLongPressMenu.tsx     — long-press context menu
MiniAppTakeover.tsx      — full-screen mini app shell
utils/                   — catalog utilities
```

### V2 Routes
- `/app` → PLUSHub (mini-app gateway)
- `/plus` → redirect to `/app`

### PLUSHub App Catalog (current pinned apps observed)
- TAO (referenced in `MOCK_RECENT_SEARCHES = ['rewards', 'tao', 'wisdom']`)
- U-Reward
- Membership
- ... (data-driven from backend)

### V2 Membership Components
```
MembershipCatalogPanel.jsx   — tier catalog (FREE/Seeker/Builder/Sovereign)
MembershipPrivilegesPanel.jsx — tier benefits list
MembershipUpgradePanel.jsx    — upgrade CTA + payment flow
```

### Backend Endpoints
- `GET /api/v1/membership/status` — current tier
- `GET /api/v1/membership/history` — membership history
- `POST /api/v1/membership/upgrade` — initiate upgrade
- `POST/PATCH /api/v1/membership/auto-renew` — auto-renew toggle
- Supabase: `memberships`, `member_tiers` tables (4 tiers: Explorer/Seeker/Builder/Sovereign)

### V3 Pivot Status
- V3 upgrade: `src/components/plus-v3/` (many files), `src/components/membership-v3/` (many files)
- Consumed by `/v3/plus`, `/v3/membership` routes (Sprint 5.6)

---

## §F — U-Reward Module Audit

**Folder:** `src/components/u-reward/` (14 files) + `src/components/u-reward-v3/` (V3 upgrade)  
**Main page:** `UEarningsPage.jsx` (primary), `URewardPage.jsx` redirects here

### V2 U-Reward Components
```
URewardMiniApp.tsx     — main U-Reward mini app shell
TapModule.tsx          — energy tap mechanic (TAP module)
QuizModule.tsx         — daily quiz module
CampaignModule.tsx     — promotion/campaign module
TaskModule.tsx         — daily task module
utils/                 — reward calculation utilities
```

### V2 Routes
- `/u-reward` → redirect `/u-earnings`
- `/u-earnings` → UEarningsPage (main U-Reward surface)
- `/u-convert` → UConvertPage (U→UZG conversion)
- `/u-convert-history` → UConvertHistoryPage

### Backend Endpoints
- `GET /api/v1/u-reward/checkin` — daily check-in state
- `GET /api/v1/u-reward/lucky-spin` — lucky spin
- `GET /api/v1/u-reward/chest-loot` — chest loot
- `GET /api/v1/u-reward/quiz` — quiz state
- `GET /api/v1/u-reward/season` — season state
- `GET /api/v1/u-reward/live-ops` — live ops rotation
- `GET /api/v1/missions/daily` — daily missions
- `GET /api/v1/promotion-u/campaign` — active campaign
- `POST /api/v1/promotion-u/claim` — claim promotion
- Edge Function: `reward_emit`
- Supabase: `reward_events`, `energy_events`, `energy_daily`, `daily_missions`, `promotion_u_claims`

### V3 Pivot Status
- V3 upgrade: `src/components/u-reward-v3/` (many files)
- Consumed by `/v3/u-reward` route (Sprint 5.7)

---

## §G — TAO Module Audit

**FINDING: TAO module is FULLY PRESENT in V2 — NOT missing as task spec assumed.**

**Folder:** `src/components/tao/` (189 files total in 12 sub-folders)  
**V2 page count:** 16 pages × lazy-loaded  
**V3 upgrade components:** Already embedded within `tao/` as `-v3` sub-folders

### Sub-modules and data source status

| Sub-module | V2 Components | TAO_DATA_SOURCE | Backend |
|-----------|---------------|-----------------|---------|
| Bazi | `tao/bazi/` (30+ files) | `'real'` ✅ | bazi_charts + enta_bazi_records |
| Tử Vi (Ziwei) | `tao/ziwei/` (15+ files) | `'real'` ✅ | ziwei_charts |
| Phong Thủy | `tao/phongthuy/` (8+ files) | `'mock'` ⚠️ | pending DDL |
| Lịch Vạn Niên | `tao/vannien/` (12+ files) | `'mock'` ⚠️ | pending DDL |
| AIER TAO Chat | `tao/aier/` (5+ files) | `'real'` 🔄 | /api/v1/tao/aier/chat (migration pending) |

### V2 Routes (16 routes)
```
/tao/bazi              — Bazi overview (LIVE)
/tao/bazi/pillars      — 4 pillars chart (LIVE)
/tao/bazi/day-master   — day master analysis (LIVE)
/tao/bazi/create       — create new chart (LIVE)
/tao/bazi/saved        — saved charts list (LIVE)
/tao/bazi/useful-god   — useful god analysis (LIVE)
/tao/bazi/luck-pillars — luck pillars timeline (LIVE)
/tao/phongthuy         — phong thuy overview (MOCK)
/tao/phongthuy/bat-trach — bat trach compass (MOCK)
/tao/lichvannien       — lich van nien calendar (MOCK)
/tao/lichvannien/today — today detail (MOCK)
/tao/lichvannien/day/:date — day detail (MOCK)
/tao/tuvi              — Tu Vi natal chart (LIVE)
/tao/tuvi/create       — create new chart (LIVE)
/tao/tuvi/saved        — saved charts list (LIVE)
/tao/aier              — AIER TAO chat (wired, migration pending)
```

### V3 upgrade components already in tao/ (not separate namespace)
```
tao/bazi-premium-v3/   — 6 files: LuckPillarCard, LuckPillarDetailSheet, LuckPillarsTimeline
tao/ziwei-v3/          — 13 files: ZiweiInputWizard, ZiweiPalaceChartFull, ZiweiPalaceDetailSheet, etc.
tao/phong-thuy-v3/     — 5 files: BatTrachCompass, CuuCungPhiTinh, PhongThuyOverview, etc.
tao/lich-van-nien-v3/  — 5 files: LichVanNienHero, LichMonthView, LichVanNienDetail, LichDayDetailSheet
tao/aier-tao-v3/       — 9 files: AierTaoReadingSurface, AierTaoChatLauncher, TierContentGate, etc.
tao/aier-tao-chat-v3/  — 4 files: AierTaoChatSurface, ChatInput, ChatMessage
tao/residence-v3/      — 4 files: ResidenceConsent, ResidenceForm, ResidenceMappingView
```

### AIER TAO Chat current state
- `TAO_DATA_SOURCE.aierTao = 'real'` (flipped by LANE02-PHASE6-AIER-CHAT-WIRE-V1)
- Backend: `POST /api/v1/tao/aier/chat` wired in `public/_worker.js`
- KB: `aier_kb_entries` (168 rows, HNSW pgvector)
- Blocked: migration `20260502093001_lane02_aier_kb_rag_v1.sql` NOT applied to Supabase
- Status: PARTIAL (LANE02-PHASE6-AIER-CHAT-WIRE-V1 PARTIAL escalated to Lane_01)

---

## §H — V3 Namespace Existing

The V3 namespace (`src/components/*-v3/`) was built during Sprint 4-5 as parallel development. It exists as upgrade layers within the codebase:

| Component Set | Location | File Count | Used By |
|--------------|----------|-----------|---------|
| chat-v3 | `src/components/chat-v3/` | 20 | `/v3/chat` routes |
| wallet-v3 | `src/components/wallet-v3/` | 12+ | `/v3/wallet` routes |
| plus-v3 | `src/components/plus-v3/` | 15+ | `/v3/plus` route |
| u-reward-v3 | `src/components/u-reward-v3/` | many | `/v3/u-reward` route |
| membership-v3 | `src/components/membership-v3/` | many | `/v3/membership` route |
| enta-v3 | `src/components/enta-v3/` | many | `/v3/enta` route (Lane_01) |
| home-v3 | `src/components/home-v3/` | many | `/v3/` home (Lane_01) |
| settings-v3 | `src/components/settings-v3/` | many | `/v3/settings` (Lane_01) |
| profile-v3 | `src/components/profile-v3/` | many | `/v3/profile` (Lane_01) |
| tao V3 (embedded) | `src/components/tao/*-v3/` | 46 | `/v3/tao/*` routes |

**Total V3 upgrade components for Lane_02 modules: ~100+ files**

### V3 vs V2 component pattern
V3 components use:
- `.module.css` (scoped CSS Modules)
- CSS custom properties for design tokens (`var(--bg-surface)`, `var(--text-primary)`)
- TypeScript interfaces (`Props` type)
- Consistent naming: `*V3.tsx`

V2 components mix:
- `.module.css` + plain `.css` files
- Some inline styles + className strings
- Mix of JSX (`.jsx`) and TSX (`.tsx`)

---

## §I — Design Tokens / Theming Current State

### Theme system
- `src/theme/appTheme.js` — 5 themes: `metal` (light), `water`, `wood`, `fire`, `earth`
- `src/theme/AppThemeContext.jsx` — React context for theme switching
- Token types: `background`, `surface`, `surfaceAlt`, `textPrimary`, `textSecondary`, `accent`, `border`, `success`, `warning`, `danger`

### CSS Custom Properties (theme-attributes.css)
```css
/* Applied at :root level */
--bg-primary: <theme.background>
--text-primary: <theme.textPrimary>
--text-secondary: <theme.textSecondary>
--border: <theme.border>
--nam-tao-primary: #7c3aed (TAO purple accent)
--moc: #1D9E75 (wood/green success)
--t-primary: #e24b4a (fire/red alert)
--uzg-blue-light: #7B95FF (UZG blue)
```

### Gaps
- No centralized `tokens.ts` file (token values embedded in appTheme.js)
- V3 components reference tokens via CSS custom properties directly (correct pattern)
- V2 legacy components sometimes use hardcoded colors (#1a1a2e, #0f172a, etc.)
- **Strategic pivot**: V3 upgrade = replace hardcoded colors with CSS custom property tokens

---

## §J — Integration Strategy Proposal

### Context (corrected from task spec assumption)

**TAO module already exists in V2.** The strategic pivot is NOT about building TAO from scratch. Instead:

1. **V3 upgrade components already exist** within `src/components/tao/*-v3/` for Bazi, Ziwei, Phong Thủy, Lịch Vạn Niên, AIER TAO
2. **V2 pages already render** TAO at `/tao/*` routes
3. The pivot is to **wire V3 upgrade components into V2 pages** + flip data sources

### 4-Step Integration Plan

#### Step 1 — Complete AIER TAO Chat wire (4-6h) — BLOCKER
- **Status:** PARTIAL (migration not applied)
- **Owner:** CLAC-2 + NTS (apply migration to Supabase)
- **Action:** Apply `20260502093001_lane02_aier_kb_rag_v1.sql` to production Supabase → AIER chat becomes live
- **Risk:** LOW (additive, migration already written and tested)
- **Est time:** 30 min (apply migration) + 4h (debug/test if issues)

#### Step 2 — Wire V3 Bazi + Ziwei components into V2 pages (3-4h)
- **Scope:** Swap V2 `.jsx` components for V3 `.tsx` upgrade components in Bazi/Ziwei pages
- **Files to update:** `TaoBaziLuckPillarsPage.jsx` (use `bazi-premium-v3/`), `TaoZiweiNatalChartPage.jsx` (use `ziwei-v3/`)
- **Risk:** LOW — V3 components already exist, same data shape, no backend change needed
- **Backend:** Already `real` (bazi_charts + enta_bazi_records + ziwei_charts)

#### Step 3 — Flip Phong Thủy + Lịch Vạn Niên to real backend (4-6h)
- **Scope:** `TAO_DATA_SOURCE.phongthuy = 'real'` + `TAO_DATA_SOURCE.vannien = 'real'`
- **Requires:** DDL migration for phong_thuy_residences table + vannien data source
- **Files:** `src/data/v3-tao-data-layer.ts` (flip flags), implement `fetchRealPhongThuy()`, `fetchRealVanNien()`
- **Risk:** MEDIUM (new DDL migration needed)

#### Step 4 — UI upgrade CHAT/WALLET/PLUS+Membership/U-Reward (6-8h total)
Apply V3 upgrade components to V2 pages for each module:

| Module | V2 Page | V3 Component | Action | Risk |
|--------|---------|--------------|--------|------|
| CHAT inbox | InboxPage.jsx | ChatInboxV3.tsx | Swap component import | LOW |
| CHAT DM room | DirectMessageThreadPage.jsx | DMRoomV3.tsx | Swap + wire | LOW |
| WALLET | WalletPage.jsx | WalletShellV3.tsx | Swap outer shell | LOW |
| PLUS Hub | AppGatewayRoute | PLUSHub V3 (plus-v3) | Swap | LOW-MEDIUM |
| U-Reward | UEarningsPage.jsx | URewardMiniAppV3.tsx | Swap | LOW |
| Membership | MembershipPage.jsx | MembershipMiniAppV3.tsx | Swap | LOW |

**Est per module: ~1.5-2h**

#### Each step = 1 PR + deploy + smoke test + rollback if crash

### Risk Assessment

| Step | Risk | Mitigation |
|------|------|-----------|
| Step 1 (AIER migration) | LOW | Migration already written, apply via Studio |
| Step 2 (Bazi/Ziwei V3 swap) | LOW | No backend change, same data types |
| Step 3 (Phong Thuy/Van Nien DDL) | MEDIUM | New migration required, test in Supabase |
| Step 4 (UI upgrades) | MEDIUM | CSS refactor may break visual unintended; 1 PR per module |

### Priority Order
1. Step 1 (unblock AIER chat) — P0 blocker, needs NTS/Lane_01 to apply migration
2. Step 2 (Bazi/Ziwei V3 swap) — P1, can start immediately
3. Step 4 CHAT (highest user impact) — P1
4. Step 4 WALLET — P1
5. Step 4 PLUS+Membership — P2
6. Step 4 U-Reward — P2
7. Step 3 (Phong Thuy/Van Nien) — P2, separate sprint
