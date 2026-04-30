# UZG+ V3 PWA OS — FOUNDATION ARCHITECTURE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`
**Version:** v1.1
**Created:** 2026-04-30
**Last amended:** 2026-04-30
**Authority:** Tier 3 (Master OS architecture — overrides all module canons on shell behavior)
**Author:** CLA Lane_01 per NTS verbatim spec 2026-04-30
**Status:** 🔒 LOCKED v1.1 (additive amendment over v1.0)

---

## §0 PURPOSE

Khóa kiến trúc nền **UZG+ PWA OS** theo đúng tầm nhìn NTS:

UZG+ là PWA web app duy nhất, mobile-first, scale lên desktop bằng cách giữ nguyên mobile layout (KHÔNG có UI desktop riêng). OS có 4 phần cố định luôn hiện diện trên mọi module + mỗi module có shell riêng được swap khi user navigate.

File này là Tier 3 — quan trọng hơn module canon khi conflict về shell behavior.

---

## §1 PWA NGUYÊN TẮC NỀN

### §1.1 Single PWA — không có app khác

- **1 URL duy nhất:** `uzg.plus`
- **1 PWA codebase**
- **1 design language**
- KHÔNG có native iOS app, KHÔNG có native Android app, KHÔNG có desktop app riêng
- Install qua "Add to Home Screen" → app icon trên mobile/tablet

### §1.2 Mobile-first, scale up — KHÔNG desktop UI riêng

**Quy tắc:**
- Layout core sinh ra cho mobile (375px width)
- Tablet (768px+): giữ layout mobile, max-width center, không thay đổi structure
- Desktop (1024px+): giữ layout mobile, center column max-width 480px, hai bên là background trống
- KHÔNG sidebar desktop, KHÔNG multi-column desktop, KHÔNG dashboard widget grid

**Lý do:**
- 1 codebase, 1 trải nghiệm
- User behavior consistent across devices
- Maintain 1x cost, không 2x/3x

---

## §2 ĐỊNH NGHĨA OS

### §2.1 OS là gì trong UZG+?

**UZG+ OS = 1 PWA shell chung + nhiều module shells được swap khi user navigate.**

Khi user vào `uzg.plus`:
- Shell chung load lần đầu
- Module shell active = HOME (default)
- Khi user tap CHAT → toàn bộ HOME UI biến mất → CHAT shell load (giống Telegram)
- Khi user tap WALLET → CHAT shell biến mất → WALLET shell load (giống Binance)
- Mỗi module có shell riêng, KHÔNG share UI với module khác

**Inspiration mapping:**

| Module | Inspiration shell |
|---|---|
| HOME | X.com / Twitter feed |
| CHAT | Telegram messenger |
| WALLET | Binance / wallet app |
| ENTA | Identity-centric profile (custom) |
| PLUS | iOS/Android springboard |
| Mini apps (U-Reward, TAO) | Telegram mini app — UI riêng hoàn toàn |

### §2.2 Module isolation rule

Khi user ở module nào → chỉ thấy UI của module đó. KHÔNG show:
- Feed posts khi đang ở Wallet
- Chat list khi đang ở HOME
- Wallet balances khi đang ở CHAT

Chỉ 4 phần cố định (§3) là persistent across modules.

---

## §3 4 PHẦN CỐ ĐỊNH TRÊN OS (PERSISTENT ELEMENTS)

Đây là 4 thành phần LUÔN tồn tại trên mọi module shell. KHÔNG bao giờ ẩn (trừ trường hợp đặc biệt như compose mode full-screen).

### §3.1 PHẦN 1 — Bottom Nav Bar (5 icons cố định)

**Vị trí:** Bottom edge, fixed.

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│         [Module content]            │
│                                     │
├─────────────────────────────────────┤
│  HOME   CHAT   [+UZG]   WALLET  ENTA│  ← Bottom Nav (60px)
│   🏠     💬    LOGO      💰      🔮  │
└─────────────────────────────────────┘
```

**5 icons fixed order:**
1. **HOME** — Social feed (X.com style)
2. **CHAT** — Messenger (Telegram style)
3. **PLUS (UZG+ Logo)** — Center, special. Tap = quay về HOME root / go to PLUS Hub
4. **WALLET** — Value flow (Binance style)
5. **ENTA** — Identity spine

**Rules:**
- 5 icons FIXED order, KHÔNG đổi
- Active state: element color theo ENTA của user (không brand color cố định)
- Center icon (UZG+ logo) bigger, distinct shape
- Persistent — không ẩn trừ:
  - Compose overlay full-screen
  - Mini app full-screen mode (e.g. U-Reward immersive)
  - Chat room sâu (optional, depending on Telegram-style nav)

**Behavior of UZG+ logo (center):**
- Single tap = navigate to PLUS Hub (springboard)
- Double tap (hoặc long press) = quick return to HOME
- (Optional) Hold = show recent modules switcher

### §3.2 PHẦN 2 — Top Bar (Avatar + Context Menu)

**Vị trí:** Top edge, fixed.

**Layout:**
```
┌─────────────────────────────────────┐
│  [Avatar 32px]    [Module title]    │  ← Top Bar (56px)
├─────────────────────────────────────┤
│                                     │
│      [Module content]               │
```

**Components:**

**Left:** Avatar (32px, round, ENTA ring color)
- Tap → mở Avatar Menu drawer (slide từ left, 80% screen width)
- Menu nội dung phụ thuộc vào module hiện tại + có 1 phần shared

**Right:** Module-specific actions
- HOME: Search icon + Notification bell
- CHAT: Search + New chat
- WALLET: Notification + Settings
- ENTA: Edit + Settings
- PLUS: Search apps

**Avatar Menu structure:**

```
┌────────────────────────────────┐
│ [Avatar large]                 │
│  Name @handle                  │
│  ENTA: Hỏa-Mộc · Dương Nam     │
│  Resonance: 47 connected       │
├────────────────────────────────┤
│ MODULE-SPECIFIC SECTION:       │
│  (HOME) → My posts             │
│         → Bookmarks            │
│         → Drafts               │
│         → Lists                │
│  (CHAT) → Archived chats       │
│         → Saved messages       │
│         → Folders              │
│  (WALLET) → Transaction history│
│           → Cards              │
│           → Spending limits    │
│  (ENTA) → Edit profile         │
│         → Privacy              │
│         → Connections          │
├────────────────────────────────┤
│ SHARED SECTION (always):       │
│  ⚙️  Settings                   │
│  🎨 Theme & Style              │
│  📊 Projects                   │
│  💎 Membership tier            │
│  🔄 Switch account             │
│  📤 Logout                     │
└────────────────────────────────┘
```

**Rules:**
- Avatar always visible
- Menu drawer slide-in 280ms ease-out
- Outside tap → close
- Module-specific section = top half (changes per module)
- Shared section = bottom half (always same)

### §3.3 PHẦN 3 — Floating + Button (Context Action)

**Vị trí:** Floating, bottom-right, above bottom nav. Position: 16px from right edge, 80px from bottom.

**Size:** 56px diameter, circular, ENTA element accent color.

**Behavior — context-aware:**

| Module | + Button action |
|---|---|
| HOME | Tạo bài viết mới (compose post) |
| CHAT | Tạo chat mới (new conversation) |
| WALLET | Giao dịch mới (new transaction — send/receive/convert) |
| ENTA | Edit ENTA / Add connection |
| PLUS | Add new mini app to favorites |
| Mini app (U-Reward) | Hidden (mini app có own UI) |
| Mini app (TAO) | Tạo lá số mới |

**Visual:**
- Always-on, glow nhẹ theo ENTA element
- Tap → open context-appropriate overlay
- Long press → show shortcut menu (e.g. HOME long press = compose options: text/image/video/poll)

**Rules:**
- Persistent on most modules
- Hidden chỉ khi:
  - Compose overlay đang open (button trở thành submit button)
  - Full-screen mini app immersive (e.g. U-Reward tap mode)
  - Chat room đang typing (composer takes priority)

### §3.4 PHẦN 4 — U-Reward Live Popup (Top-right Corner)

**Vị trí:** Floating, top-right corner, below top bar. Position: 12px from right, 70px from top.

**Size:** Compact pill — 80px wide × 32px tall.

**Visual:**
```
┌─────────────────┐
│  ⚡ U: 1,250    │  ← U balance pill, ENTA glow
└─────────────────┘
```

**Behavior:**

**Idle state:**
- Show current U balance
- Subtle pulse animation (slow, 3s loop)

**Active state (when user earns U):**
- Number animates up (counter spin)
- "+5" floating text bubble emerges từ pill, drifts up + fades 1s
- Glow burst on increment
- Vibration nhẹ (mobile haptic)

**Tap behavior:**
- Single tap → mở U-Reward mini app full-screen
- Mini app UI hoàn toàn riêng (như Telegram mini app)
- Close mini app → quay về module trước đó

**Rules:**
- Persistent — visible across HOME / CHAT / WALLET / ENTA / PLUS
- Hidden inside U-Reward mini app itself (don't show pill while inside)
- Hidden in compose mode full-screen
- Number always live (real-time sync from backend)

---

## §4 4 PHẦN CỐ ĐỊNH — TỔNG HỢP VISUAL

```
┌─────────────────────────────────────┐
│ [Avatar]  Module title    [icons]   │  ← PHẦN 2: Top Bar (56px)
│                          ┌────────┐ │
│                          │⚡U:1250│ │  ← PHẦN 4: U-Reward pill
│                          └────────┘ │
├─────────────────────────────────────┤
│                                     │
│                                     │
│       [Module-specific content]     │
│       (HOME / CHAT / WALLET /       │
│        ENTA / PLUS / mini app)      │
│                                     │
│                                     │
│                              ┌───┐  │
│                              │ + │  │  ← PHẦN 3: Floating + (56px)
│                              └───┘  │
├─────────────────────────────────────┤
│  HOME  CHAT  [UZG+]  WALLET  ENTA  │  ← PHẦN 1: Bottom Nav (60px)
└─────────────────────────────────────┘
```

**Total persistent space:** 56px (top) + 60px (bottom) = 116px
**Available content area:** Remaining viewport height minus 116px

---

## §5 MODULE SHELLS — INSPIRATION + STRUCTURE

Mỗi module có shell riêng được load khi user navigate vào. 4 phần cố định (§3) overlay lên shell.

### §5.1 HOME shell — X.com inspired

**Inspiration:** X.com (Twitter) feed
**Vào HOME thấy:** Value Stream feed, full width, infinite scroll
**Architecture:** [Top Bar persistent] → [Value Stream feed] → [Bottom Nav persistent]

Detailed canon: `UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1.md`

### §5.2 CHAT shell — Telegram inspired

**Inspiration:** Telegram messenger
**Vào CHAT thấy:** Chat list (giống inbox Telegram), tap chat → enter Chat Room

**Architecture khi vào CHAT:**
```
[Top Bar persistent — title="Chat"]
[Search bar (sticky)]
[Chat list — full width]
  - Chat item 1
  - Chat item 2
  - ...
[Bottom Nav persistent]
```

**Khi tap vào 1 chat:**
- Enter Chat Room
- Top bar đổi: Avatar người chat + name + status
- Optional: Bottom nav ẩn để focus chat (Telegram pattern)
- Composer dock ở bottom thay cho bottom nav
- Persistent elements vẫn có top bar avatar (left) + maybe U pill

Detailed canon: `UZG_PLUS_V3_UIUX_CHAT_CANON_v1.md` (next)

### §5.3 WALLET shell — Binance inspired

**Inspiration:** Binance / wallet app
**Vào WALLET thấy:** Balance overview, asset list, action buttons

**Architecture:**
```
[Top Bar persistent — title="Wallet"]
[Total balance (large)]
[Tab selector: Overview | Credit | Utility | History]
[Asset cards]
  - U balance
  - UZG balance
  - USDc balance
  - VNDc balance
[Quick actions: Convert | Transfer | Use]
[Bottom Nav persistent]
```

NHƯNG khác Binance:
- KHÔNG có chart trading
- KHÔNG có order book
- KHÔNG có pump/dump UI
- Convert thay cho Trade
- Use thay cho Sell

Detailed canon: `UZG_PLUS_V3_UIUX_WALLET_CANON_v1.md` (turn 3)

### §5.4 ENTA shell — Custom identity-centric

**Inspiration:** Custom — không inspired by mainstream app
**Vào ENTA thấy:** Identity wheel + resonance + connections + ENTA map

**Architecture:**
```
[Top Bar persistent — title="ENTA"]
[ENTA Wheel hero (large, animated)]
[Polarity state: Dương Nam · 78% Mộc dominant]
[Resonance suggestions]
[Circles you're in]
[Connections grid]
[Bottom Nav persistent]
```

Detailed canon: `UZG_PLUS_V3_UIUX_ENTA_CANON_v1.md` (turn 4)

### §5.5 PLUS shell — iOS/Android springboard

**Inspiration:** iOS home screen / Android springboard
**Vào PLUS thấy:** Grid of all mini apps + apps available

**Architecture:**
```
[Top Bar persistent — title="UZG+ Apps"]
[Search apps (sticky)]
[Grid 4-column on mobile, 6-column on tablet]
  - U-Reward icon
  - TAO icon
  - Marketplace icon
  - Retreat icon
  - Governance icon
  - Booking icon
  - ...all mini apps
[Featured / Recently used section]
[Bottom Nav persistent]
```

**Tap mini app icon → enter mini app** (UI hoàn toàn riêng)

Detailed canon: `UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1.md` (turn 5)

### §5.6 Mini app shells — Fully custom UI

**Pattern:** Telegram mini app — UI riêng hoàn toàn
**Examples:** U-Reward, TAO, Marketplace, etc.

**Architecture inside mini app:**
- Top bar: simplified — close (X) button left, mini app title center, mini app actions right
- Bottom nav: hidden (full immersive) hoặc replaced by mini app's own bottom controls
- 4 phần cố định behavior:
  - PHẦN 1 Bottom Nav: hidden (immersive)
  - PHẦN 2 Top Bar: replaced by mini app top bar
  - PHẦN 3 Floating +: hidden (mini app provides own actions)
  - PHẦN 4 U-Reward pill: hidden inside U-Reward mini app, visible inside other mini apps

**Exit mini app:**
- Tap close (X) → quay về module trước đó (PLUS Hub thường)
- Hoặc tap UZG+ logo center bottom nav → return HOME

Detailed canon per mini app: U-Reward (turn 6), TAO (turn 7).

---

## §6 NAVIGATION FLOW

### §6.1 Default entry

```
User mở uzg.plus → 
  Authentication check →
    Not authenticated: Login flow →
    Authenticated: HOME shell (default)
```

### §6.2 Module switching

```
User in HOME → tap CHAT bottom nav →
  HOME shell unmount (smooth fade 200ms)
  CHAT shell mount (slide-in 200ms)
  Top bar updates to Chat context
  + button changes to "New chat"
  4 persistent elements stay visible
```

**State preservation:**
- Scroll position của mỗi module preserved khi quay lại
- Compose drafts preserved
- Read state preserved
- Search query preserved

### §6.3 Mini app entry

```
User in HOME → tap U-Reward pill (PHẦN 4) →
  U-Reward mini app slides in from bottom (full-screen)
  4 persistent elements behavior:
    - Bottom Nav: hidden (immersive)
    - Top Bar: replaced by mini app top bar
    - Floating +: hidden
    - U-Reward pill: hidden (you're inside)
  
User taps close (X) →
  Mini app slides down
  Original module shell + 4 persistent elements restored
```

### §6.4 Quick return to HOME

```
From any module → tap UZG+ logo (center bottom nav) →
  Direct return to HOME shell
  No intermediate state
```

### §6.5 PLUS Hub access

```
From HOME → tap UZG+ logo (center bottom nav) →
  HOME stays (already at HOME)

From CHAT/WALLET/ENTA → tap UZG+ logo → 
  Single tap = return HOME
  Long press / double tap = open PLUS Hub directly
```

(Note: alternative pattern — tap UZG+ logo always opens PLUS Hub, separate Home button. NTS confirm preferred behavior in turn 5 PLUS Hub canon.)

---

## §7 STATE PERSISTENCE — CRITICAL OS BEHAVIOR

### §7.1 Module state preservation

Khi user rời module và quay lại, state PHẢI preserved:
- Scroll position
- Active tab/sub-section
- Search query
- Form drafts
- Read/unread markers

**Implementation:**
- Per-module state stored in memory (PWA session)
- Survives navigation between modules
- Lost on full page reload (acceptable trade-off)

### §7.2 Shell unmount/mount lifecycle

Khi switching modules:
- Outgoing module: snapshot state → unmount UI
- Incoming module: mount UI → restore state nếu có

**Animation:**
- Outgoing: fade out 200ms
- Incoming: slide in from edge 200ms
- Crossfade for adjacent modules (HOME ↔ CHAT)
- Direct cut for distant modules (HOME → ENTA)

### §7.3 Cross-module continuity

User in HOME viewing post → tap user avatar → ENTA tab opens với that user's profile

State flow:
- HOME state preserved
- ENTA shell mounts with target user's profile
- Back button (browser back) returns to HOME with exact scroll position

---

## §8 RESPONSIVE BEHAVIOR (MOBILE → TABLET → DESKTOP)

### §8.1 Mobile (375px - 767px)

**Default target.** Layout exactly as described in §3-§4.

### §8.2 Tablet (768px - 1023px)

**Same layout as mobile** — không thay đổi structure.

Adjustments:
- Max-width 480px center column
- Background sides: subtle gradient OR ENTA element ambient color (very low opacity)
- Top bar + bottom nav: stretch full viewport width nhưng content centered
- Touch targets stay same size

### §8.3 Desktop (1024px+)

**SAME layout as mobile** — KHÔNG có desktop UI riêng.

Adjustments:
- Max-width 480px center column
- Background sides: keep subtle ambient
- 2 sides empty (or very subtle decorative — ENTA element pattern, low opacity)
- Mouse hover states for buttons (subtle)
- Keyboard shortcuts active

**KHÔNG:**
- Sidebar layouts
- Multi-column dashboards
- Hover-heavy desktop interactions
- Desktop-only features

**Lý do:** 1 codebase, 1 UX, mobile-first forever.

---

## §9 OS-WIDE VISUAL SYSTEM

### §9.1 Dark mode default

- Background: deep dark (#0a0a0f or similar per Design System Canon)
- Light mode optional toggle (in Avatar Menu → Theme)
- ENTA element colors visible on both themes

### §9.2 ENTA-aware theming

User's dominant ENTA element affects:
- Active state color in bottom nav
- + Button glow color
- U-Reward pill glow
- Avatar ring
- Subtle accent throughout

NOT affected (always neutral):
- Text colors
- Background colors
- Layout structure
- Module shell core

### §9.3 Motion language

- Transitions: 200ms ease-out (standard)
- Module switching: 280ms
- Mini app entry: 320ms
- Reduced motion: instant state changes

### §9.4 Typography

Per Design System Canon:
- System font stack (SF on iOS, Roboto on Android, native on each)
- Vietnamese diacritics rendering perfect
- Sizes: 12 / 14 / 16 / 18 / 20 / 24 / 32 / 48px ramp

---

## §10 OS-WIDE REDLINES (HARD RULES)

### §10.1 CRITICAL

- ❌ KHÔNG làm desktop UI riêng (mobile-first scale up only)
- ❌ KHÔNG show UI của module khác khi đang trong 1 module
- ❌ KHÔNG đổi 5 icons bottom nav (HOME / CHAT / PLUS / WALLET / ENTA fixed)
- ❌ KHÔNG đổi vị trí 4 phần cố định
- ❌ KHÔNG hide 4 phần cố định trừ trường hợp đặc biệt được spec
- ❌ KHÔNG có sidebar desktop
- ❌ KHÔNG có hamburger menu (avatar drawer thay thế)

### §10.2 HIGH

- ❌ KHÔNG mix UI giữa modules (HOME content trong CHAT shell)
- ❌ KHÔNG state loss khi switch module
- ❌ KHÔNG animation > 400ms
- ❌ KHÔNG bottom nav dài hơn 5 icons
- ❌ KHÔNG menu drawer ở phải (luôn từ left, theo Avatar)

### §10.3 MEDIUM

- ❌ KHÔNG icon rác trong top bar
- ❌ KHÔNG badge spam (max 1 notification badge tại 1 time)
- ❌ KHÔNG U-Reward pill nhảy số liên tục (quá distracting)

---

## §11 OS-WIDE INTEGRATION RULES

### §11.1 Module isolation

Mỗi module độc lập về data + UI nhưng share:
- 4 phần cố định
- Design tokens
- Auth state
- ENTA context
- U balance (display only)

### §11.2 Cross-module deep links

User có thể deep-link từ module này sang module khác:
- HOME post → tap user → ENTA shell với that user
- CHAT message → tap product link → WALLET shell với that asset
- ENTA profile → tap "Connect" → CHAT shell mở DM

State preservation: original module state preserved khi quay back.

### §11.3 Mini app communication với main shell

Mini apps có thể trigger main shell actions:
- U-Reward mini app earn U → main shell U pill animates +X
- TAO mini app generate chart → ENTA shell có hint "Bazi available"
- Marketplace mini app booking → WALLET shell sees pending transaction

---

## §12 ONBOARDING FLOW (FIRST-TIME OS ENTRY)

### §12.1 First load sequence

```
1. Splash screen (UZG+ logo, 1s)
2. Loading shell (skeleton)
3. Authentication check
4a. Not authenticated → Login flow → loop back to step 4b
4b. Authenticated → onboarding check
5a. Onboarding incomplete → ENTA setup wizard
5b. Onboarding complete → HOME shell
```

### §12.2 ENTA setup wizard (one-time)

5 steps:
1. Birth data (year, month, day, time, gender)
2. ENTA chart calculation (animated, 2s)
3. Result: dominant element + polarity
4. First connections suggestion (3 Suggested Resonance)
5. Welcome to HOME (first post explainer)

---

## §13 KẾT LUẬN — 5 CÂU KHÓA

**1. UZG+ là 1 PWA mobile-first, scale up KHÔNG thay đổi structure — KHÔNG có desktop UI riêng.**

**2. OS = Shell chung + module shells swap. Mỗi module độc lập (HOME như X, CHAT như Telegram, WALLET như Binance, ENTA custom, PLUS springboard, mini apps tự do).**

**3. 4 phần cố định luôn tồn tại: Bottom Nav 5 icons / Avatar Menu drawer / Floating + Button / U-Reward pill.**

**4. + Button và Avatar Menu context-aware — nội dung phụ thuộc module hiện tại + có shared section.**

**5. UZG+ Logo center bottom nav = quick return HOME / open PLUS Hub. Logo là OS root navigation.**

---

## §14 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — authored per NTS verbatim spec for OS architecture |

---

## §A1 v1.1 Amendment — Foundation Pattern Locked (2026-04-30)

Locks final Foundation OS pattern after NTS-approved Mockup #1 review. CANON. Overrides any conflicting v1.0 interpretations.

**Approver:** NTS verbatim 2026-04-30
**Authority:** R-AUTH-01 + AMD_NTS_FULL_TECH_AUTONOMY

### §A1.1 Reaction icon row — 8 icons fixed

Every social-feed surface (HOME Value Stream, CHAT thread, Circle wall, ENTA Resonance) displays exactly 8 reaction icons in single horizontal row, `justify-content: space-between`.

Order (left → right, fixed):

1. Comment — grey stroke
2. Share — grey stroke
3. Hỏa — flame outline, active `#E24B4A`, idle `#9099B0`
4. Mộc — sprout outline, active `#1D9E75`, idle `#9099B0`
5. Kim — concentric circles, active `#888780`, idle `#9099B0`
6. Thủy — droplet outline, active `#185FA5`, idle `#9099B0`
7. Thổ — block + horizontal divide, active `#BA7517`, idle `#9099B0`
8. QOT — quantum dot + dashed orbit, color `#4A6FFF`, no number (badge only)

REDLINE: Adding/removing/reordering requires NTS approval + canon amendment.

### §A1.2 Reaction icon style — fully transparent

Each reaction button:
- `background: transparent !important` on all states
- `border: none !important`
- `border-radius: 0`
- `padding: 4px 0`
- Content: SVG 15×15 + 5px gap + number text only

Hover: color shift to `#4A6FFF` over 150ms ease-out, NO background fill.
Active: `transform: scale(0.94)`, NO background fill.

REDLINE: NO pill, NO border, NO background fill on reaction icons. Color shift only on hover.

### §A1.3 Reaction sizing + typography

- Icon: 15×15px, viewBox 0 0 16 16, stroke-width 1.3-1.4
- Number: DM Sans 500, 11px
- Number color: `#9099B0` idle / `#4A6FFF` hover
- Gap icon-to-number: 5px

### §A1.4 Number format — compact

`Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })`:

| Range | Display |
|---|---|
| 0-999 | `0`-`999` literal |
| 1k-999k | `1k`, `12k`, `301k` |
| 1M+ | `1M`, `2.5M` |
| 1B+ | `1B`, `1.2B` |

VI locale MAY override (`tr` for triệu) per LANG_OS resolver. Document choice in implementation.

REDLINE: NEVER display raw 4+ digit numbers in reaction row.

### §A1.5 Feed style — X.com pattern

Layout:
- Avatar 38×38 circle left, content column right, 10px gap
- Author line: name (DM Sans 600, `#1A1F2E`) + @handle (DM Sans 400, `#9099B0`) + `·` + relative time (DM Sans 400, `#9099B0`), 5px gap between elements
- Body: DM Sans 400, 14.5px, `#1A1F2E`, line-height 1.45
- Media preview: full-width, `border-radius: 16px`, max 200px image / 168px video
- Reaction row directly below media, 12px margin-top, no separator

Post-to-post separator: `border-bottom: 0.5px solid rgba(160, 175, 200, 0.22)`. No padding/margin between posts.

REDLINE:
- NO card boxed wrapper
- NO border viền around posts
- NO box-shadow elevation
- NO nested chrome on repost/quote

### §A1.6 Quantum aesthetic — light touch

ENTA = Entanglement (rối lượng tử). Visual language reflects quantum-physical metaphor at low intensity.

Required:
1. Background base: `#FBFCFE`
2. Particle field: 8-15 micro-dots, `fill: #4A6FFF`, `opacity: 0.22`, radius 0.4-0.6px, `pointer-events: none`
3. Radial glows: 2-3 large gradients, `opacity: 0.06-0.10` peak. Quantum Blue `#4A6FFF` + AIER Purple `#A066E8` reference (MAY drift to other ramps when ENTA dominant changes)
4. Backdrop-blur: Top bar + Bottom nav + Drawer + Action sheet use `rgba(251, 252, 254, 0.94)` + `backdrop-filter: blur(14-18px)`
5. Avatar gradient: `linear-gradient(135deg, <element-light> 0%, <element-dark> 100%)`
6. Concentric dashed orbits: ENTA Wheel + QOT icon use `stroke-dasharray`
7. Floating button shadow: `box-shadow: 0 6px 20px rgba(74, 111, 255, 0.32)`

REDLINE:
- NO neon glow outlines
- NO animated particles or "data streaming" effects
- NO holographic gradients (mesh/iridescent/chromatic)
- NO matrix/wireframe/sci-fi overlays
- NO pulse animation on always-visible chrome
- NO glow-on-hover for cards/buttons/feed items

Aesthetic must read "premium / canonical / governed". NEVER "video game / crypto / synthwave".

### §A1.7 ENTA framing — Entanglement

User-facing labels:
- Short: `ENTA` (Syne 800, all-caps, primary)
- Long sublabel: `Entanglement` (DM Sans 500, sentence case, `#9099B0`)

Pairing appears:
- ENTA Wheel center inner circle: `ENTA` main + `Entanglement` sublabel + dominant elements line
- Top bar module sublabel when ENTA active: `Entanglement`
- ENTA section headers in marketing surface

VI locale: `Entanglement (rối lượng tử)`.

REDLINE: NEVER use "Identity Wheel" or "Identity Spine" as user-facing label. Internal docs MAY use those terms; user-facing UI uses ENTA + Entanglement only.

### §A1.8 U-Reward pill — tinted style

Top bar right pill:
- `background: rgba(74, 111, 255, 0.07)`
- `border: 0.5px solid rgba(74, 111, 255, 0.22)`
- `padding: 5px 11px 5px 8px`
- `border-radius: 14px`
- Content: dashed-orbit dot icon (12×12, `#4A6FFF`) + 6px gap + `U <balance>` in Syne 800, 11px, `#243870`

REDLINE: NOT solid quantum-blue pill. NOT white pill. Tinted only.

### §A1.9 Bottom Nav center — "U+" gradient

Center position (3rd of 5):
- 44×44 square
- `background: linear-gradient(135deg, #4A6FFF 0%, #3B5BAA 100%)`
- `border-radius: 12px`
- `box-shadow: 0 4px 14px rgba(74, 111, 255, 0.25)`
- Content: `U+` text in Syne 800, 15px, white, `letter-spacing: -0.04em`
- NO label below (icon-only anchor)

REDLINE: NOT decorative ring logo. NOT plain `+` (would conflict with Floating + button). MUST be `U+` lettermark on gradient square.

### §A1.10 Reserved — long-press reaction wheel (v1.2)

Long-press (300ms threshold) on any 5 Ngũ Hành icon triggers radial reaction wheel for fine-grained selection within element family. Full mechanics deferred to v1.2 amendment after Mockup #2. v1.1 reserves trigger gesture only.

### §A1.11 Reference assets

Mockup #1 final design rendered as Visualize artifact 2026-04-30 chat session:
- Title: `uzg_plus_v3_foundation_locked_clean_final`
- 4 iteration rounds: v1 → v2 → v3 → v3 final clean
- NTS approval: verbatim "Ok, chốt save" 2026-04-30

Implementation MUST follow this pattern. Deviation requires CLA approval. Static HTML/CSS extract reserved for v1.2 if needed.

### §A1.12 Amendment summary

| # | Decision | Section |
|---|---|---|
| 1 | 8 reaction icons row | §A1.1 |
| 2 | Order Comment-Share-5Hành-QOT | §A1.1 |
| 3 | Transparent button (no pill) | §A1.2 |
| 4 | Hover = color shift only | §A1.2 |
| 5 | Compact number format | §A1.4 |
| 6 | X.com feed pattern | §A1.5 |
| 7 | Quantum aesthetic light touch | §A1.6 |
| 8 | ENTA = Entanglement framing | §A1.7 |
| 9 | U-Reward pill tinted | §A1.8 |
| 10 | Bottom Nav center "U+" gradient | §A1.9 |

End of v1.1 amendment.

---

🔒 UZG+ V3 PWA OS — Foundation Architecture Canon v1.0
End of file.
