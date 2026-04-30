# UZG+ V3 PWA OS — PLUS HUB MODULE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (Module-specific, governed by Foundation OS Canon Tier 3)
**Module:** PLUS (Bottom Nav position #3 — Center, special)
**Inspiration shell:** iOS Home Screen / Android Springboard / Telegram Mini Apps launcher
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` ← MUST read first
- Tier 3: `UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1`
- Tier 3: `UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1`
- Tier 2: GOVERNANCE_CANON, ROLE_AND_BOUNDARY_CANON

**Companion canons:** HOME, CHAT, WALLET, ENTA, U-Reward, TAO, REDLINES_MASTER

---

## §0 PURPOSE

Khóa UI/UX cho **PLUS shell** — Expansion Hub của UZG+ OS. PLUS là center của bottom nav (UZG+ logo) + là springboard launcher cho tất cả mini apps + features mở rộng.

PLUS KHÔNG phải hamburger menu. KHÔNG phải settings page. KHÔNG phải submenu list. PLUS là **iOS/Android home screen-style** grid of mini apps.

**Quan trọng:** File này CHỈ describe nội dung PLUS shell. 4 phần cố định đã spec trong Foundation Canon — không lặp lại.

---

## §1 ĐỊNH NGHĨA

### §1.1 Câu định nghĩa official

**PLUS = Expansion Hub của UZG+ OS — springboard grid hiển thị tất cả mini apps + secondary modules. PLUS theo iOS/Android home screen pattern (icon grid, search, sections), KHÔNG phải hamburger menu hay settings page. Mỗi mini app trong PLUS có UI/UX riêng hoàn toàn (Telegram mini app pattern).**

### §1.2 5 câu khóa

**1. PLUS = Springboard launcher, KHÔNG phải menu/submenu.**
**2. UZG+ Logo center bottom nav = entry vào PLUS Hub.**
**3. Mini apps trong PLUS có UI/UX riêng hoàn toàn (full-screen takeover).**
**4. PLUS là expansion layer — feature nào không thuộc 5 nav core thì vào PLUS.**
**5. Visual priority: PLUS center cao hơn 4 nav khác, distinct shape.**

### §1.3 Vào PLUS thấy gì

Khi user tap UZG+ Logo center bottom nav:

**Option A (single tap behavior):** Tap = quick return HOME (if not already at HOME)
**Option B (double tap / long press):** Open PLUS Hub

CLA recommend **Option B**: 
- Single tap on UZG+ logo = open PLUS Hub (since user đã có other 4 nav buttons)
- Tap HOME nav = explicit way to go HOME
- Long press UZG+ = "Quick return HOME"

(NTS confirm preferred behavior trong production decision.)

```
┌─────────────────────────────────────┐
│ [Avatar]  UZG+ Apps   [🔍] [⚙️]    │  ← PHẦN 2 Top Bar
│                          ┌────────┐ │
│                          │⚡U:1250│ │  ← PHẦN 4 U-Reward pill
│                          └────────┘ │
├─────────────────────────────────────┤
│                                     │
│ Search apps... (sticky)             │  ← Search bar
│                                     │
│ ─────────────────────────────────── │
│                                     │
│ Pinned                              │
│ ─────────────────────────────────── │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐       │
│  │ ⚡ │  │ 🔮│  │ 📅│  │ 💎 │       │
│  │U-R│  │TAO│  │Boo│  │Mem│       │  ← 4-column grid
│  └───┘  └───┘  └───┘  └───┘       │
│                                     │
│ Featured                            │
│ ─────────────────────────────────── │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐       │
│  │ 🛍 │  │ 🌿│  │ 🎫│  │ ⭕ │       │
│  │Mar│  │Ret│  │Tic│  │Cir│       │
│  └───┘  └───┘  └───┘  └───┘       │
│                                     │
│ All Apps                            │
│ ─────────────────────────────────── │
│  ┌───┐  ┌───┐  ┌───┐  ┌───┐       │
│  │ 🤖│  │ 📊│  │ 🗳 │  │ 💼│       │
│  │AIE│  │Sta│  │Gov│  │Bus│       │
│  └───┘  └───┘  └───┘  └───┘       │
│                                     │
│  ┌───┐  ┌───┐  ┌───┐               │
│  │ 🌐│  │ 📚│  │ 💬│               │
│  │UDN│  │Lib│  │For│               │
│  └───┘  └───┘  └───┘               │
│                                     │
│                              ┌───┐  │
│                              │ + │  │  ← PHẦN 3 Floating +
│                              └───┘  │
├─────────────────────────────────────┤
│  HOME  CHAT  [UZG+]  WALLET  ENTA  │  ← PHẦN 1 Bottom Nav (UZG+ active)
└─────────────────────────────────────┘
```

### §1.4 Khác biệt với Settings/Menu/Hamburger

| Hamburger / Settings menu | UZG+ PLUS Hub |
|---|---|
| List of links | Grid of icons |
| Text-heavy | Icon-first |
| Secondary navigation | Expansion layer |
| Hidden behind menu button | Center nav, prominent |
| Settings, account, help | Mini apps, features, services |
| Boring submenu feel | Springboard feel (alive) |
| Open via hamburger ☰ | Open via UZG+ logo |
| Static items | Stateful (badges, recents, featured) |

---

## §2 SHELL ARCHITECTURE — PLUS

### §2.1 Top Bar context

**Title:** "UZG+ Apps" hoặc "Hub"

**Right icons:**
- Search (🔍) — search apps + features
- Settings (⚙️) — global settings (overlap with Avatar Menu shared section, but accessible faster here)

**Avatar Menu PLUS section:**
- Pinned apps (manage)
- Recently used
- App permissions
- Hidden apps

### §2.2 Floating + Button context

**PLUS context = "Add new mini app to favorites"**

Tap → Action sheet:
```
┌─────────────────────────────────────┐
│   Customize Hub                     │
│  ─────────────────────────────────  │
│   📌 Pin app                        │
│   🗂️ Reorder pinned                 │
│   👁️ Hide app                        │
│   ⚙️ App settings                   │
│  ─────────────────────────────────  │
│   [Cancel]                          │
└─────────────────────────────────────┘
```

### §2.3 Main canvas — Grid layout

3 sections:
1. **Pinned** (4-8 apps user pinned)
2. **Featured** (system-curated based on ENTA + activity)
3. **All Apps** (alphabetical or category)

**Grid rules:**
- 4-column on mobile (375px+)
- 5-column on tablet (768px+)
- 6-column on desktop (1024px+)
- Cell size: 72px × 72px (icon) + 16px label below
- Spacing: 16px horizontal, 20px vertical

---

## §3 MINI APPS — INVENTORY

### §3.1 Core mini apps (V3 launch)

| Icon | Name | Purpose | Mini App Canon |
|---|---|---|---|
| ⚡ | U-Reward | Connect-to-Earn engine | `UZG_PLUS_V3_UIUX_UREWARD_CANON_v1` |
| 🔮 | TAO | Bazi/Tử Vi/Phong Thủy | `UZG_PLUS_V3_UIUX_TAO_CANON_v1` |
| 📅 | Booking | Reserve services/retreats | (Tier 5 spec) |
| 💎 | Membership | Tier management | (Tier 5 spec) |
| 🛍 | Marketplace | Courses/workshops/services | (Tier 5 spec) |
| 🌿 | Retreat | Retreat browsing/booking | (Tier 5 spec) |
| 🎫 | Tickets | Event tickets | (Tier 5 spec) |
| ⭕ | Circles | Circle discovery + management | (Tier 5 spec) |
| 🤖 | AIER Hub | Browse AIER directory | (Tier 5 spec) |
| 📊 | Stats | Personal analytics | (Tier 5 spec) |
| 🗳 | Governance | Proposals + voting | (Tier 5 spec) |
| 💼 | Business | Circle Business management | (Tier 5 spec) |

### §3.2 Future mini apps (V3.5+)

| Icon | Name | Purpose |
|---|---|---|
| 🌐 | UDNA Gateway | Public identity gateway |
| 📚 | Library | Knowledge base + resources |
| 💬 | Forum | Discussion threads |
| 🎓 | Courses | Educational content |
| 🧘 | Meditation | Guided sessions |
| 🎨 | Art | Creative tools |
| 🎵 | Music | Audio content |

### §3.3 Mini app categories (for organization)

User can browse by category in "All Apps" section:

```
Category Filter:
○ All
○ Identity & Wisdom (TAO, AIER Hub)
○ Economic (Wallet shortcuts, Marketplace, Booking)
○ Social (Circles, Forum, Resonance)
○ Personal (Stats, Library, U-Reward)
○ Governance (Proposals, Voting, DAO)
○ Business (Circle Business, CRM, Analytics)
```

---

## §4 APP ICON STRUCTURE

### §4.1 Icon design rules

```
┌─────────────────┐
│                 │
│      [icon]     │  ← Icon (48px × 48px)
│                 │
│                 │
│   App Name      │  ← Label (12-14px, max 2 lines)
│                 │
│   [badge]       │  ← Optional badge
└─────────────────┘
Total cell: 72px × 100px
```

### §4.2 Icon visual language

- **Shape:** Rounded square (16px radius) — iOS-like
- **Background:** Element color OR gradient theme based on app domain
- **Symbol:** Simple, single-color or 2-tone
- **No 3D / glassmorphism / heavy shadows**

### §4.3 Element mapping per app

| App | Element field | Color hint |
|---|---|---|
| U-Reward | Hỏa (energy) | Red/orange |
| TAO | Mộc + Thủy (wisdom) | Indigo + green |
| Booking | Thổ (grounding) | Earth tones |
| Membership | Kim (clarity) | Silver/white |
| Marketplace | Hỏa (commerce) | Warm |
| Retreat | Mộc (growth) | Green |
| Governance | Kim (structure) | Silver |
| Stats | Thủy (depth) | Blue |

### §4.4 Badges

App icons có badges:
- **Numeric:** Pending notifications/actions (max display "9+")
- **Dot:** New/unread indicator (no count)
- **Color:** ENTA element of urgent context

---

## §5 PINNED SECTION

### §5.1 Default pinned (first-time user)

System auto-pins 4 apps for new user:
1. **U-Reward** (entry point)
2. **TAO** (introduce wisdom layer)
3. **Booking** (practical action)
4. **Membership** (tier awareness)

### §5.2 User customization

User can:
- Add app to pinned (long press → "Pin")
- Remove from pinned (long press → "Unpin")
- Reorder pinned (long press → drag)

Max pinned: 8 apps (2 rows of 4 on mobile).

### §5.3 Pinned section visual

```
Pinned                              [Edit]
─────────────────────────────────────────
  ┌───┐  ┌───┐  ┌───┐  ┌───┐
  │ ⚡ │  │ 🔮│  │ 📅│  │ 💎 │
  │U-R│  │TAO│  │Boo│  │Mem│
  └───┘  └───┘  └───┘  └───┘
```

[Edit] button enters reorder mode (icons jiggle, drag to rearrange).

---

## §6 FEATURED SECTION

### §6.1 Featured logic

System auto-curates 4-8 apps based on:
- User ENTA dominant element
- Recent activity patterns
- Membership tier
- Time of day / season
- Phase progression

### §6.2 Featured rules

CẤM:
- Sponsored apps in Featured (no pay-to-feature)
- Random rotation (must be relevance-based)
- Excluding mini apps from Featured eternally

PHẢI:
- Transparent reasoning (tap "Why?" → explain)
- Refreshable (manual + auto periodic)
- ENTA-aware

### §6.3 Featured visual

```
Featured                            [Why?]
─────────────────────────────────────────
  ┌───┐  ┌───┐  ┌───┐  ┌───┐
  │ 🛍 │  │ 🌿│  │ 🎫│  │ ⭕ │
  │Mar│  │Ret│  │Tic│  │Cir│
  └───┘  └───┘  └───┘  └───┘
```

[Why?] tap → explain: "Featured because your Mộc element is high → Retreat suggested. New marketplace items in your interest categories."

---

## §7 ALL APPS SECTION

### §7.1 All Apps display

All available mini apps, alphabetical OR category-grouped (user toggle).

```
All Apps                           [A-Z ▾]
─────────────────────────────────────────
[Filter: All | Identity | Economic | Social | ...]

  ┌───┐  ┌───┐  ┌───┐  ┌───┐
  │ 🤖│  │ 📊│  │ 🗳 │  │ 💼│
  │AIE│  │Sta│  │Gov│  │Bus│
  └───┘  └───┘  └───┘  └───┘

  ┌───┐  ┌───┐  ┌───┐
  │ 🌐│  │ 📚│  │ 💬│
  │UDN│  │Lib│  │For│
  └───┘  └───┘  └───┘
```

### §7.2 Sort options

User can sort:
- A-Z (default)
- Recently used
- Most used
- Category

### §7.3 Hidden apps

User can hide apps they don't use:
- Long press app → "Hide"
- Hidden apps accessible via Avatar Menu → "Hidden apps"
- Search still finds hidden apps

---

## §8 SEARCH

### §8.1 Search bar (sticky)

Top of main canvas, sticky during scroll.

```
┌─────────────────────────────────────┐
│ 🔍 Search apps...                   │
└─────────────────────────────────────┘
```

### §8.2 Search behavior

- Type → live filter (instant)
- Match by: app name, category, description, keywords
- Result: matching apps highlighted, others dimmed
- Keyboard shortcuts: `/` to focus search

### §8.3 Search empty state

```
No apps match "<query>"

Try:
- Different keywords
- Browse Featured
- Request a new app feature
```

---

## §9 ENTERING A MINI APP

### §9.1 Tap mini app icon → enter mini app

```
1. User taps app icon
2. App icon scales up briefly (200ms)
3. Mini app full-screen takeover (slide up 320ms)
4. 4 phần cố định behavior:
   - PHẦN 1 Bottom Nav: HIDDEN (immersive)
   - PHẦN 2 Top Bar: REPLACED by mini app top bar
   - PHẦN 3 Floating +: HIDDEN (mini app provides own actions)
   - PHẦN 4 U-Reward pill: HIDDEN if entering U-Reward, VISIBLE if entering other apps
5. Mini app UI active
```

### §9.2 Mini app top bar (replaced)

```
┌─────────────────────────────────────┐
│ [✕]   App Name        [actions]    │  ← Mini app top bar
├─────────────────────────────────────┤
│                                     │
│   [Mini app full UI]                │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

Components:
- **Close (✕):** Exit mini app, return to PLUS Hub
- **App name:** Center
- **Actions:** App-specific (settings, help, refresh, etc.)

### §9.3 Exit mini app

User can exit:
- Tap close (✕) → return to PLUS Hub
- Tap UZG+ logo center bottom nav → return HOME (or PLUS depending on §1.3 choice)
- Browser back button → previous shell
- Swipe down (mobile gesture) → exit (optional)

### §9.4 Cross-mini-app navigation

User in U-Reward → wants to check Booking:
- Exit U-Reward (close X)
- Returns to PLUS Hub
- Tap Booking icon
- Booking mini app loads

KHÔNG có "switch to another mini app" nội bộ (each is full-screen takeover).

### §9.5 Deep link to mini app

External link can deep-link to specific mini app + state:
- `uzg.plus/app/u-reward` → U-Reward landing
- `uzg.plus/app/tao/chart/<id>` → TAO mini app với specific chart
- `uzg.plus/app/booking/retreat/<id>` → Booking mini app với specific retreat

When opened from external:
- Auth check first
- If authenticated → mini app loads directly (skip PLUS Hub)
- If not → login → onboarding → mini app

---

## §10 MINI APP UI/UX FREEDOM

### §10.1 Mini apps có UI/UX riêng hoàn toàn

Mỗi mini app có thể design UI/UX riêng (per Telegram mini app pattern), nhưng PHẢI tuân:

**Mandatory:**
- Use UZG+ Design System tokens (colors, typography, spacing)
- Top bar pattern (✕ close + name + actions)
- Touch target minimum 44px × 44px
- Loading/Empty/Error states
- Vietnamese localization

**Optional (mini app freedom):**
- Layout structure (single page / multi-tab / grid / wizard)
- Navigation pattern within mini app
- Custom interactions (taps, gestures)
- Animation language
- Information architecture

**Forbidden:**
- ❌ Modify or replace Foundation 4 phần cố định behavior
- ❌ Override Bottom Nav (cannot show during mini app)
- ❌ Inject ads
- ❌ Track user data outside mini app scope
- ❌ Bypass UZG+ auth

### §10.2 Mini app categories (UI patterns)

| Category | Typical pattern | Example |
|---|---|---|
| **Action loop** | Single immersive screen | U-Reward (tap-to-earn) |
| **Wizard** | Multi-step linear | TAO (chart generation) |
| **Browse + Detail** | List → Detail | Marketplace, Booking |
| **Dashboard** | Stats + actions | Stats, Business Hub |
| **Form-heavy** | Input-focused | Booking checkout, Edit profile |
| **Conversational** | Chat-like (use CHAT shell instead) | Defer to CHAT module |

### §10.3 Mini app developer guide (future Lane)

When future Lanes build new mini apps, they reference:
- Foundation OS Canon
- Design System Canon
- Component Library Spec
- Mini app reference implementations (U-Reward, TAO)
- This PLUS Hub Canon

---

## §11 STATE LAW — 5 STATES

**§11.1 Loading** — Skeleton grid placeholders, shimmer

**§11.2 Empty** — N/A (always có core mini apps)

**§11.3 Error** — Connection error indicator, retry, "Some apps may be unavailable"

**§11.4 Active** — Default grid display

**§11.5 Disabled** — Tier-locked apps shown with lock icon + "Upgrade required" tooltip

---

## §12 OVERLAY LAYER

### §12.1 Mini app full-screen takeover

Per §9.1 — slide-up animation.

### §12.2 App long-press menu

Long press any app icon → context menu:

```
┌─────────────────────────────────────┐
│   App: U-Reward                     │
│  ─────────────────────────────────  │
│   📌 Pin to top                     │
│   👁️ Hide from grid                  │
│   ℹ️  About                          │
│   🔔 Notification settings          │
│  ─────────────────────────────────  │
│   [Cancel]                          │
└─────────────────────────────────────┘
```

### §12.3 Edit mode (pinned reorder)

Tap [Edit] in Pinned section → enter edit mode:
- All pinned icons jiggle subtly
- Drag to reorder
- ✕ on each → unpin
- Tap "Done" to exit

### §12.4 Featured "Why?" overlay

Tap [Why?] in Featured → modal sheet explaining curation logic.

### §12.5 Search overlay

Per §8 — sticky search activates with keyboard.

---

## §13 MOTION + ANIMATION

### §13.1 Allowed motion

- App icon tap: scale up 200ms (anticipation before mini app load)
- Mini app entry: slide up 320ms ease-out
- Mini app exit: slide down 280ms ease-in
- Pinned reorder: drag-and-drop with 200ms snap
- Search filter: instant fade transition (100ms)
- Edit mode jiggle: subtle wiggle 0.5° rotation 800ms loop

### §13.2 Forbidden motion

- ❌ App icons bouncing endlessly
- ❌ Confetti when opening apps
- ❌ Notification badge pulsing rapidly
- ❌ Auto-shuffle apps for "engagement"

---

## §14 REDLINES

### §14.1 CRITICAL

- ❌ PLUS KHÔNG được giống hamburger menu
- ❌ KHÔNG list-style nav (must be grid)
- ❌ KHÔNG sponsored apps in Featured
- ❌ KHÔNG hidden ads in app icons
- ❌ Mini apps KHÔNG được override 4 phần cố định behavior
- ❌ KHÔNG forced app installs (user chooses)
- ❌ KHÔNG track user across mini apps without consent

### §14.2 HIGH

- ❌ KHÔNG random Featured rotation (must be relevance-based)
- ❌ KHÔNG limit pinned to paid users (free user có 8 pinned slots)
- ❌ KHÔNG dark patterns ("must use this app to continue")
- ❌ KHÔNG trending leaderboard ("top 10 apps")
- ❌ KHÔNG popularity = priority

### §14.3 MEDIUM

- ❌ KHÔNG icon thay đổi tùy hứng (consistency)
- ❌ KHÔNG remove apps without notice
- ❌ KHÔNG complex onboarding for each mini app

---

## §15 ACCESSIBILITY

### §15.1 Screen reader
- Each app icon ARIA: name, badge count, category
- Sections labeled
- Search input properly labeled

### §15.2 Keyboard navigation
- Tab through apps
- Enter to open
- Esc to close mini app
- Cmd+K / Ctrl+K to focus search
- Arrow keys to navigate grid

### §15.3 Touch targets
- App icon tap zone: 80px × 80px (icon 72 + padding)
- Spacing ensures no mistaps
- Long press threshold: 600ms

### §15.4 Color contrast
- App icon backgrounds vs labels: WCAG AA
- Element color hints không là sole indicator (icon symbol always visible)

---

## §16 INTEGRATION VỚI MODULE KHÁC

**§16.1 PLUS → HOME** — Tap UZG+ logo (single tap behavior, per §1.3 Option B): User trong HOME, tap = stays HOME. User in other modules, tap = open PLUS.

**§16.2 PLUS → CHAT** — Some mini apps integrate với CHAT (e.g. Booking confirmation triggers chat thread). Mini app exit → return PLUS, then user tap CHAT.

**§16.3 PLUS → WALLET** — Marketplace mini app checkout → triggers WALLET shell (cross-module flow). User exits checkout, returns to mini app or WALLET.

**§16.4 PLUS → ENTA** — TAO mini app shares chart → ENTA shell shows TAO badge in Identity tab.

**§16.5 PLUS → U-Reward** — U-Reward mini app earnings → reflect in U-Reward pill (Foundation PHẦN 4) + Wallet U balance.

**§16.6 PLUS → TAO** — TAO mini app full-screen UX, entry from PLUS Hub or HOME contextual links.

**§16.7 PLUS → AIER** — AIER Hub mini app (browse AIER directory) → tap specific AIER → CHAT shell với AIER thread.

---

## §17 V2 → V3 MIGRATION PATH

### §17.1 V2 current state (per Cursor audit + Master Audit)

- `/plus` route exists (PlusPage)
- Currently uses `<PlusHub>` component (top-level shell)
- Some mini apps exist as separate routes (`/u-reward`, `/booking`, etc.)
- No clear "springboard" UX
- No pinned/featured logic
- No mini app full-screen takeover pattern (mini apps still in main shell)

### §17.2 V3 implementation order

1. **Build PLUS shell** với Foundation 4 phần cố định
2. **Build app grid component** (4-column responsive)
3. **Build `<AppIcon>` component** (icon + label + badge)
4. **Build Pinned/Featured/All sections**
5. **Build search bar (sticky)**
6. **Build app long-press menu**
7. **Build Edit mode** (reorder pinned)
8. **Migrate existing mini apps to full-screen pattern:**
   - U-Reward
   - Booking
   - Membership
   - Marketplace (build new per Cursor G22 gap)
   - Retreat
9. **Build Featured curation logic** (ENTA-aware)
10. **Build deep-link routing** (`uzg.plus/app/<name>/<state>`)
11. **Build mini app top bar component** (✕ + name + actions)
12. **Define mini app developer guide** (future Lane reference)

### §17.3 V3 Phase 2 mockup priorities

| Priority | Mockup |
|---|---|
| 1 | PLUS Hub shell với Pinned/Featured/All sections |
| 2 | App icon variants (with badge, locked, hidden states) |
| 3 | Mini app entry transition (icon → full-screen) |
| 4 | Mini app top bar (close + name + actions) |
| 5 | App long-press menu |
| 6 | Edit mode (reorder pinned) |
| 7 | Search overlay |
| 8 | Featured "Why?" explanation |
| 9 | Empty/error states |
| 10 | Tier-locked app icons |

---

## §18 SUCCESS METRICS

PLUS Hub thành công nếu:

**Behavioral signals (good):**
- Pinned customization rate >40% (users actively curate)
- Featured app open rate higher than All Apps random open (curation works)
- Mini app session lengths appropriate (focused use, not endless)
- Search used to find apps (efficient discovery)
- New mini apps adoption smooth (after launch)

**Anti-signals (failure):**
- Users complain "where is X feature" (= discoverability problem)
- High rate of unpinning then re-pinning (= confusing pattern)
- Featured ignored (= curation not relevant)
- Users stuck in PLUS without entering app (= grid is dead end)
- Apps abandoned mid-session (= mini app UX issue)

---

## §19 KẾT LUẬN — 5 CÂU KHÓA

**1. PLUS = Springboard Hub (iOS/Android home screen pattern), KHÔNG phải hamburger menu.**

**2. UZG+ Logo center bottom nav = entry vào PLUS Hub.**

**3. 3 sections: Pinned (user-curated 8) / Featured (ENTA-aware curated) / All Apps (alphabet/category).**

**4. Mini apps full-screen takeover (slide up 320ms) — UI/UX riêng nhưng tuân Design System.**

**5. PLUS = expansion layer — feature ngoài 5 nav core (HOME/CHAT/WALLET/ENTA) đi vào PLUS.**

---

## §20 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ Foundation OS + Master UI/UX Canon + Cursor V2 audit + 13 file canon cũ |

---

🔒 UZG+ V3 PWA OS — PLUS Hub Module Canon v1.0
End of file.
