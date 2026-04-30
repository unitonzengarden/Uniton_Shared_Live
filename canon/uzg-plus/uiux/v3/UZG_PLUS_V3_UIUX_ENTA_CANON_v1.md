# UZG+ V3 PWA OS — ENTA MODULE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_ENTA_CANON_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (Module-specific, governed by Foundation OS Canon Tier 3)
**Module:** ENTA (Bottom Nav position #5)
**Inspiration shell:** Custom — NOT inspired by mainstream app (LinkedIn/Facebook profile patterns rejected)
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` ← MUST read first
- Tier 3: `UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1`
- Tier 3: `UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1`
- Tier 2: IDENTITY_CANON, HUMAN_VALUE_CANON, TRUTH_TRUST_CANON

**Companion canons:** HOME, CHAT, PLUS Hub, WALLET, U-Reward, TAO, REDLINES_MASTER

---

## §0 PURPOSE

Khóa UI/UX cho **ENTA shell** — Identity Spine của UZG+ OS. ENTA KHÔNG phải profile page truyền thống (LinkedIn/Facebook). ENTA là **Energy Identity Layer** — hiện diện identity của user qua ngũ hành wheel, polarity state, resonance field, và contribution history.

ENTA là module CỐT LÕI của UZG+ vì **identity precedes capability** — không có identity hợp lệ thì không participation, không value, không economy.

**Quan trọng:** File này CHỈ describe nội dung ENTA shell. 4 phần cố định đã spec trong Foundation Canon — không lặp lại.

---

## §1 ĐỊNH NGHĨA

### §1.1 Câu định nghĩa official

**ENTA = Identity Spine của UZG+ OS. ENTA shell hiển thị Energy Identity Layer của user (ngũ hành wheel + polarity + resonance) thay vì profile card truyền thống. ENTA reveal: tôi là ai trong hệ, tôi đang ở phase nào, tôi cộng hưởng với ai. ENTA KHÔNG phải LinkedIn-style profile.**

### §1.2 5 câu khóa

**1. ENTA = Identity Spine, KHÔNG phải Profile Page.**
**2. ENTA Wheel = hero widget #1 của toàn app — animated, alive.**
**3. Identity precedes capability — không ENTA = không participation hợp lệ.**
**4. Resonance > Connection count — chất lượng cộng hưởng > số lượng follow.**
**5. ENTA reveal — KHÔNG invent identity. Identity sinh từ birth data + contribution history.**

### §1.3 Vào ENTA thấy gì

Khi user tap ENTA bottom nav:
- Module trước unmount
- ENTA shell mount (slide in 200ms)
- Top Bar title: "ENTA"
- Floating + Button context: "Edit ENTA / Add Connection"
- Bottom Nav stays (ENTA active)
- U-Reward pill stays
- Main canvas = ENTA Identity Surface

KHÔNG thấy: HOME feed, CHAT messages, Wallet balance.

### §1.4 Khác biệt với LinkedIn/Facebook profile

| LinkedIn / Facebook profile | UZG+ ENTA |
|---|---|
| Job title / company | ENTA element + polarity |
| Skills list | Contribution history (QOT) |
| Connections count | Resonance field (qualitative) |
| About section | Identity narrative (energy-based) |
| Posts gallery | Value contributions |
| Recommendations | Resonance from connections |
| "Follow" button | "Connect" với trust level |
| Profile completeness % | Identity coherence (ENTA balance) |
| Static profile picture | Avatar với ENTA ring (animated) |
| Career timeline | Energy journey timeline |

---

## §2 SHELL ARCHITECTURE — ENTA

### §2.1 Vào ENTA thấy gì (own profile)

```
┌─────────────────────────────────────┐
│ [Avatar]  ENTA      [✏️] [⚙️]      │  ← PHẦN 2 Top Bar
│                          ┌────────┐ │
│                          │⚡U:1250│ │  ← PHẦN 4 U-Reward pill
│                          └────────┘ │
├─────────────────────────────────────┤
│                                     │
│       [ENTA WHEEL HERO]             │  ← Animated 5-element wheel
│       (large, ~280px diameter)      │
│        Hỏa: 35%                     │
│        Mộc: 28%                     │
│        Thủy: 18%                    │
│        Kim: 12%                     │
│        Thổ: 7%                      │
│                                     │
│   Nam Tiên Sinh @nts                │
│   Hỏa-Mộc dominant · Dương Nam     │
│   Phase: Building (Q2 2026)         │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   [Tabs: Identity | Resonance | Circles | Journey]
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Identity Tab (default):           │
│                                     │
│   ENTA Map                          │
│   ─────────────────────────────────  │
│   Element strengths visualization   │
│                                     │
│   Polarity Balance                  │
│   ─────────────────────────────────  │
│   Yang: 65%  Yin: 35%               │
│   "Strong Yang lean — consider..."  │
│                                     │
│   Suggested Balance                 │
│   ─────────────────────────────────  │
│   Connect with Thủy-dominant        │
│   Visit Mộc circle for grounding    │
│                                     │
│                              ┌───┐  │
│                              │ + │  │  ← PHẦN 3 Floating +
│                              └───┘  │
├─────────────────────────────────────┤
│  HOME  CHAT  [UZG+]  WALLET  ENTA  │  ← PHẦN 1 Bottom Nav
└─────────────────────────────────────┘
```

### §2.2 Vào ENTA thấy gì (other user's profile)

When user taps another user's avatar from HOME/CHAT → ENTA shell mounts với THEIR profile (not own).

```
┌─────────────────────────────────────┐
│ [←]  Elsa's ENTA          [⋯]      │  ← Different top bar
├─────────────────────────────────────┤
│                                     │
│       [ENTA WHEEL of Elsa]          │
│        Mộc: 40%                     │
│        Thủy: 30%                    │
│        Hỏa: 15%                     │
│        ...                          │
│                                     │
│   Elsa @elsa                        │
│   Mộc-Thủy dominant · Âm Nữ        │
│                                     │
│   83% Resonance with You            │
│   "Strengthens your Kim element"    │
│   "Balances your Hỏa excess"        │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   [Connect]  [Send Message]  [···]  │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Public Identity                   │
│   ─ Phase: Founding                 │
│   ─ Mutual circles: Forest, Garden  │
│   ─ QOT contributions: 47           │
│                                     │
│   Recent Public Contributions       │
│   ─ Post: "Buổi thiền sáng nay..." │
│   ─ Circle reflection: ...          │
│                                     │
└─────────────────────────────────────┘
```

### §2.3 Module-specific elements

**Top Bar context (own profile):**
- Title: "ENTA"
- Right icons: Edit (✏️) + Settings (⚙️)
- Avatar Menu ENTA section: Edit profile / Privacy / Connections / Block list

**Top Bar context (other's profile):**
- Back arrow (←) instead of Avatar
- Title: "<Their handle>'s ENTA"
- Right icon: More (⋯) - Block/Report options

**Floating + Button context:**
- ENTA context = "Edit ENTA / Add Connection"
- Tap → Action sheet (§7)

**Main canvas:**
- ENTA Wheel hero (large, animated)
- Identity description + phase
- 4-tab navigation
- Tab content (Identity / Resonance / Circles / Journey)

---

## §3 ENTA WHEEL — HERO WIDGET #1

### §3.1 Vai trò

ENTA Wheel là hero widget số 1 của toàn app — hiện diện identity của user qua visualization 5 elements.

KHÔNG phải:
- Static profile picture
- Avatar circle truyền thống
- Pie chart vô hồn

PHẢI:
- Animated, alive (subtle pulse)
- Shows real-time element distribution
- Interactive (tap to explore)
- Visual identity language của UZG+

### §3.2 Wheel structure

```
              [Hỏa - 35%]
             ───────────
            /            \
   [Kim]  /                \  [Thủy]
   12%   |                  |  18%
         |    [Avatar]      |
         |                  |
   [Thổ] \                  / [Mộc]
   7%     \                /   28%
            \____________/
```

**Visual:**
- Diameter: 280px (own profile), 200px (other's profile), 96px (chat header), 40px (feed avatar with ring)
- 5 segments per element, sized proportionally
- Element colors:
  - Kim: trắng/bạc với silver glow
  - Thủy: đen/xanh đậm với deep blue glow
  - Mộc: xanh lá với soft green glow
  - Hỏa: đỏ với warm red glow
  - Thổ: vàng/nâu với earth tone glow
- Center: avatar (rotated subtly per polarity)
- Overall: pulse animation (slow, 4s loop)

### §3.3 Wheel interaction

**Tap on segment:**
- Element name + percentage
- Brief description of element meaning
- Recent activity in this element

**Long press:**
- Wheel rotates to highlight all elements sequentially
- Audio cue (optional)

**Pinch:**
- Zoom in/out on wheel detail
- Show micro-elements (sub-distributions)

### §3.4 Wheel calculation source

Wheel based on:
1. **Birth data** (Bazi/Lá số) — base element distribution
2. **Polarity** (Yang/Yin Nam/Nữ)
3. **Activity history** — adjusts subtle weights:
   - Recent posts với element themes
   - Circles joined với element fields
   - Reactions given (frequency per element)
4. **Connection field** — resonance influences
5. **Time/seasonal** — natural cycle adjustments

KHÔNG calculation source:
- User self-claim (must be data-grounded)
- Random
- Algorithm "for engagement"

---

## §4 IDENTITY DESCRIPTION

### §4.1 Identity description structure

Below ENTA Wheel:

```
Nam Tiên Sinh @nts
Hỏa-Mộc dominant · Dương Nam
Phase: Building (Q2 2026)
```

### §4.2 Components

**Display name:** Real name or chosen identity name (Vietnamese OK)

**Handle:** @username (unique, immutable after first set)

**Element profile:**
- Top 2 dominant elements (e.g. "Hỏa-Mộc")
- Polarity (Dương Nam / Âm Nam / Dương Nữ / Âm Nữ)
- Format: `<Element1>-<Element2> dominant · <Polarity>`

**Phase:**
- Current life phase per ENTA model
- Examples: Founding / Building / Expanding / Harvesting / Resting / Renewing
- Auto-calculated from age + activity + Bazi cycle

KHÔNG hiển thị (default):
- Job title
- Company
- Location (privacy)
- Real name unless user opts in

---

## §5 4 TABS — IDENTITY / RESONANCE / CIRCLES / JOURNEY

### §5.1 Tab 1 — Identity (default)

Default tab on entry.

```
Identity Tab Content:

ENTA Map
─────────────────────────────────
[Detailed element breakdown]
- Kim: 12% (deficient)
  Description: "Need more clarity in life"
  Suggestion: Connect with Kim-dominant
  
- Thủy: 18% (balanced)
- Mộc: 28% (strong)
- Hỏa: 35% (excess)
  Description: "High passion, may burn out"
  Suggestion: Practice Thủy meditation
- Thổ: 7% (deficient)
  Description: "Lack grounding"
  Suggestion: Visit nature retreats

Polarity Balance
─────────────────────────────────
Yang: 65% (Dương dominant)
Yin: 35%
"Strong Yang lean — consider Yin practices"

Suggested Balance Actions
─────────────────────────────────
○ Connect with 3 Thủy-dominant users
○ Join Mộc circle for grounding
○ Visit retreat (Thổ environment)
○ Reduce activity in Hỏa themes
```

### §5.2 Tab 2 — Resonance

```
Resonance Tab Content:

Connected (47)
─────────────────────────────────
Group by trust level:
- Trusted Connect (5)
- Circle Connect (12)
- Resonance Connect (20)
- Open Connect (10)

Top Resonance
─────────────────────────────────
[Avatar] Elsa @elsa - 83% resonance
  "Strengthens your Kim"
  
[Avatar] Marcus @marcus - 78% resonance
  "Balances your Hỏa"
  
[Avatar] Sarah @sarah - 71% resonance
  "Mutual Mộc growth"

Suggested Resonance (new)
─────────────────────────────────
[New suggestions card]
- 3 people who resonate with current ENTA state
- Each with brief explanation
```

### §5.3 Tab 3 — Circles

```
Circles Tab Content:

Member of (3)
─────────────────────────────────
[Circle icon] Forest Circle
  Mộc-Thủy field · 47 members
  Your role: Member
  Resonance with circle: 76%

[Circle icon] Garden Bay
  Thổ field · 23 members
  Your role: Founder
  Resonance: 92%

[Circle icon] Wisdom Council
  Kim field · 8 members
  Your role: Member
  Resonance: 65%

Suggested Circles
─────────────────────────────────
Based on your ENTA balance needs:

[Circle icon] Sunrise Meditation
  Thủy field
  "Good for grounding your Hỏa"
  47 members · Public
  [Join →]

[Circle icon] Iron Path
  Kim field
  "Strengthens your Kim deficiency"
  12 members · Invitation only
  [Request invite →]
```

### §5.4 Tab 4 — Journey

```
Journey Tab Content:

Energy Journey Timeline
─────────────────────────────────

Now (Q2 2026) - Building Phase
[Visual current state on timeline]

Past phases:
─ Q1 2026 - Founding
  ENTA shifted: Hỏa 30% → 35%
  Key events: Joined Forest Circle
  
─ Q4 2025 - Renewing
  ENTA shifted: balanced
  Key events: Retreat (Mộc)

─ Q3 2025 - Resting
  ...

Contribution History
─────────────────────────────────
Total QOT-traceable contributions: 247

By element:
─ Kim contributions: 28
─ Thủy: 35
─ Mộc: 65
─ Hỏa: 95 (most active)
─ Thổ: 24

[View full journey →]
```

---

## §6 PUBLIC vs PRIVATE — IDENTITY VISIBILITY

### §6.1 Public profile (when other user views your ENTA)

PHẢI hiển thị:
- Display name + handle
- ENTA element profile (top 2 dominant)
- Polarity (Yang/Yin Nam/Nữ)
- Current phase
- ENTA Wheel (simplified, may hide exact percentages)
- Resonance with viewer (calculated)
- Public QOT contributions count
- Recent public posts (5 latest)
- Mutual circles (if any)

OPTIONAL hiển thị (per user setting):
- Connections count (default OFF — quality over quantity)
- Specific element percentages (default ON — basic transparency)
- Phase narrative
- Custom bio (text, max 500 chars)

NEVER hiển thị publicly:
- Birth data (Bazi calculation source)
- Full QOT trail (only public contributions)
- Email / phone
- Wallet balances
- Specific resonance scores với other users
- Chat messages
- Private circle membership

### §6.2 Privacy controls

User can adjust per setting in Avatar Menu → Privacy:

```
ENTA Privacy Settings
─────────────────────────────────

Profile visibility:
○ Public (anyone can view)
○ Connections only (Resonance+)
○ Trusted only

Element percentages: [Show / Hide]
Phase narrative: [Show / Hide]
Connection count: [Show / Hide]
Mutual circles: [Show / Hide]
Public posts: [Show / Hide]
Resonance score with others: [Show / Hide]
```

---

## §7 FLOATING + BUTTON — ACTIONS

### §7.1 Tap Floating + → Action sheet

ENTA context (Foundation PHẦN 3):

```
┌─────────────────────────────────────┐
│   ENTA Actions                      │
│  ─────────────────────────────────  │
│                                     │
│   ✏️  Edit Profile                   │
│      Update ENTA, narrative, bio    │
│                                     │
│   👥 Add Connection                 │
│      Search & connect new user      │
│                                     │
│   ⭕ Join/Create Circle             │
│      Open Circles tab               │
│                                     │
│   📅 Update Phase                   │
│      Reflect current life phase     │
│                                     │
│   🔄 Recalculate ENTA               │
│      Refresh from latest activity   │
│                                     │
│  ─────────────────────────────────  │
│   [Cancel]                          │
└─────────────────────────────────────┘
```

### §7.2 Edit Profile flow

```
1. Tap "Edit Profile"
2. Full-screen edit overlay
3. Editable:
   - Display name
   - Handle (one-time change only)
   - Bio (500 chars)
   - Phase narrative
   - Privacy settings
4. NOT editable (data-bound):
   - Birth data (set during onboarding only, immutable)
   - ENTA element distribution (calculated)
   - Polarity (from birth data)
   - Phase (auto-calculated)
5. Save → return to profile
```

### §7.3 Add Connection flow

```
1. Tap "Add Connection"
2. Search overlay
3. Search by handle / name / element / circle
4. Result: list of matches với resonance score
5. Tap user → preview their profile
6. "Connect" button → choose trust level:
   - Open Connect (default)
   - Resonance Connect
   - Circle Connect
   - Trusted Connect (requires their approval)
7. Submit → notification sent if approval needed, else immediate
```

---

## §8 CONNECTION ACTION (when viewing other's ENTA)

### §8.1 Action buttons (other user's profile)

```
[Connect]  [Send Message]  [···]
```

### §8.2 Connect button states

**Not connected yet:**
- Button: "Connect"
- Tap → choose trust level (sheet)

**Open Connect:**
- Button: "Connected · Open"
- Tap → upgrade options (Resonance/Circle/Trusted)

**Higher trust level:**
- Button: "Connected · <level>"
- Tap → manage connection (downgrade/disconnect)

**Pending:**
- Button: "Pending request"
- Tap → cancel option

### §8.3 Send Message button

- Visible only if Trusted Connect (privacy default)
- For lower levels: "Connect first to message"
- Tap → CHAT shell mounts với DM thread mở

### §8.4 More menu (···)

```
[···] menu:
- View public posts
- Mutual circles
- Block
- Report
```

---

## §9 ONBOARDING — FIRST-TIME ENTA SETUP

### §9.1 Trigger

After authentication first time:
- New user redirected to onboarding wizard
- Cannot skip (identity precedes capability)

### §9.2 5-step wizard

**Step 1: Birth Data**
```
Welcome to UZG+
Let's discover your ENTA

Birth Date: [date picker]
Birth Time: [time picker, optional]
Gender: [○ Male / ○ Female / ○ Other]
Birth Location: [city search]

Note: Used for Bazi calculation only.
Never shared publicly. You can adjust 
privacy after.

[Skip] [Continue →]
```

**Step 2: ENTA Calculation (animated)**
```
Calculating your ENTA...

[Animated wheel forming]
[Element percentages computing]
[Polarity revealing]

(2-3 seconds, no skip)
```

**Step 3: Result Reveal**
```
You are Hỏa-Mộc dominant
Dương Nam (Yang Male)
Current phase: Founding

[ENTA Wheel large display]

Hỏa (passion) and Mộc (growth) lead 
your energy.
You bring catalytic energy + life force.
You may need: Thủy (depth) and Kim (clarity).

[Continue →]
```

**Step 4: First Suggested Resonance**
```
Connect with people who resonate

Based on your ENTA, here are 3 suggestions:

[Avatar] Sarah (Thủy-dominant)
  "Balances your Hỏa excess"
  78% resonance

[Avatar] Liam (Kim-dominant)
  "Strengthens your Kim deficiency"
  72% resonance

[Avatar] Maya (Mộc-Thổ)
  "Grounds your Mộc growth"
  68% resonance

[Skip] [Connect with All] [Continue →]
```

**Step 5: Welcome to HOME**
```
You're all set!

Your ENTA is now live.
Visit your Value Stream (HOME) to:
- See posts that resonate
- Make your first contribution
- Build your energy field

[Enter UZG+ →]

(Lands on HOME shell)
```

### §9.3 Onboarding rules

- Cannot skip Step 1 (birth data required)
- Step 4 connections optional but encouraged
- Onboarding only happens once
- Birth data immutable after this (per Identity Canon)
- ENTA recalculation later possible but base data stays

---

## §10 STATE LAW — 5 STATES

**§10.1 Loading** — Skeleton ENTA wheel placeholder, shimmer

**§10.2 Empty** — N/A (every authenticated user has ENTA after onboarding)

**§10.3 Error** — Wheel calculation failed indicator, retry path

**§10.4 Active** — Default ENTA display

**§10.5 Disabled** — Privacy-locked sections show "Connect to view" prompt

---

## §11 OVERLAY LAYER

### §11.1 Wheel detail overlay

Trigger: tap any element segment of ENTA Wheel.

Bottom sheet, 50% screen:
- Element name + percentage
- Element meaning (descriptive)
- Recent activity in this element
- Suggested actions to balance

### §11.2 Edit Profile overlay

Per §7.2 — full-screen overlay.

### §11.3 Add Connection overlay

Per §7.3 — search overlay.

### §11.4 Connection action sheet

Per §8.1 — bottom sheet with trust level options.

### §11.5 Privacy settings overlay

Per §6.2 — full-screen privacy controls.

### §11.6 Onboarding wizard

Per §9 — 5-step full-screen wizard, only once.

---

## §12 MOTION + ANIMATION

### §12.1 ENTA Wheel motion

- Idle: subtle pulse (4s loop, 3-5% scale variance)
- On focus: brighter glow (200ms ease-in)
- Element tap: segment highlights (200ms)
- Polarity shift over time: slow rotation (very subtle, days/weeks)

### §12.2 Allowed motion

- Profile entry transition: 280ms ease-out
- Tab switch: 150ms fade
- Connection action confirmation: subtle checkmark
- New resonance discovery: gentle reveal

### §12.3 Forbidden motion

- ❌ Wheel "spinning" (gambling feel)
- ❌ Element percentages "racing" up
- ❌ Confetti on connect
- ❌ Hearts/sparkles
- ❌ Fast rotations
- ❌ Hyperactive pulse

---

## §13 REDLINES

### §13.1 CRITICAL

- ❌ ENTA KHÔNG được giống LinkedIn / Facebook profile
- ❌ KHÔNG follower count public (use resonance qualitative)
- ❌ KHÔNG profile completeness % gamification
- ❌ KHÔNG "Verified" badges (we use QOT, not external verification)
- ❌ Birth data KHÔNG được publicly visible
- ❌ KHÔNG resume / CV display
- ❌ KHÔNG endorsements / recommendations from others (LinkedIn pattern)
- ❌ KHÔNG profile views count

### §13.2 HIGH

- ❌ KHÔNG ENTA hidden behind paywall (all users have ENTA)
- ❌ KHÔNG ENTA score gamified
- ❌ KHÔNG numerical leaderboards
- ❌ KHÔNG public connection count
- ❌ KHÔNG fake resonance (must be calculated)
- ❌ KHÔNG manipulation: "X people viewed your profile"

### §13.3 MEDIUM

- ❌ KHÔNG cover photo (focus on wheel)
- ❌ KHÔNG carousel of life moments
- ❌ KHÔNG location check-ins
- ❌ KHÔNG "feeling" status

---

## §14 ACCESSIBILITY

### §14.1 Screen reader
- ENTA Wheel: ARIA label describes element distribution
- Element segments individually focusable
- Polarity stated clearly
- Identity description fully readable

### §14.2 Color contrast
- Element colors có alternate symbols for color-blind
- ENTA segments distinguishable by pattern + color
- High contrast mode preserves wheel readability

### §14.3 Keyboard navigation
- Tab through wheel segments
- Enter to expand element detail
- Tab through 4 main tabs
- C key for Connect (when viewing other)
- M key for Message

### §14.4 Reduced motion
- Wheel pulse disabled
- Element tap = instant detail (no animation)
- Tab switch = instant

---

## §15 INTEGRATION VỚI MODULE KHÁC

**§15.1 ENTA → HOME** — Tap any user element/contribution → HOME post detail. Tap "Recent posts" → HOME filtered feed.

**§15.2 ENTA → CHAT** — Tap "Send Message" (Trusted Connect) → CHAT shell với DM thread.

**§15.3 ENTA → PLUS** — Tap "Join/Create Circle" → PLUS Hub > Circle Business mini app.

**§15.4 ENTA → WALLET** — Phase change might trigger wallet event (e.g. tier upgrade).

**§15.5 ENTA → U-Reward** — ENTA contribution count visible → tap → U-Reward history.

**§15.6 ENTA → TAO** — Birth data shared with TAO module (Bazi/Tử Vi/Phong Thủy).
- "View detailed Bazi reading →" link in Identity tab → TAO mini app with chart.

**§15.7 ENTA → AIER** — User can have AIER advisors (governed) tied to ENTA elements.
- "AIER Tao bound to your chart" → CHAT shell với AIER thread.

---

## §16 V2 → V3 MIGRATION PATH

### §16.1 V2 current state (per Cursor audit)

- `/enta`, `/enta/:handle` exist
- `/enta/:handle` forces login (Gap G01) — should be public
- `/profile`, `/profile/relations`, `/profile/settings` separate
- 3D placeholder for ENTA visualization (per Master Audit)
- No animated wheel
- Static profile-style UI
- Public ENTA profile contradicts Whitepaper §6 (G01)

### §16.2 V3 implementation order

1. **Resolve G01 — Public ENTA profiles** — Make `/enta/:handle` work for guests with public-safe view
2. **Build ENTA shell** với Foundation 4 phần cố định
3. **Build animated `<ENTAWheel>` component** (5 elements pentagon, pulse animation)
4. **Build Identity description block**
5. **Build 4-tab navigation** (Identity / Resonance / Circles / Journey)
6. **Build Identity tab** (ENTA Map + Polarity + Suggested Balance)
7. **Build Resonance tab** (Connected + Top Resonance + Suggestions)
8. **Build Circles tab** (Member of + Suggested)
9. **Build Journey tab** (Timeline + Contribution History)
10. **Build other-user profile variant** (different top bar + Connect/Message buttons)
11. **Build Onboarding wizard** (5-step, mandatory first time)
12. **Build privacy controls** (Avatar Menu → Privacy)
13. **Migrate `/profile/*` routes** → `/enta/*`
14. **Deprecate "follower" terminology** (already in HOME canon, applies here)

### §16.3 V3 Phase 2 mockup priorities

| Priority | Mockup |
|---|---|
| 1 | ENTA shell với animated Wheel + identity description |
| 2 | Identity tab content (ENTA Map + Polarity + Suggestions) |
| 3 | Resonance tab content |
| 4 | Other user's ENTA profile (with Connect/Message) |
| 5 | Onboarding wizard 5-step |
| 6 | Wheel detail overlay |
| 7 | Edit Profile overlay |
| 8 | Add Connection overlay |
| 9 | Connection action sheet (trust levels) |
| 10 | Privacy settings overlay |

---

## §17 SUCCESS METRICS

ENTA thành công nếu:

**Behavioral signals (good):**
- Users complete onboarding (>90%)
- Users return to ENTA tab regularly (identity check-in pattern)
- Resonance Connects > Open Connects ratio
- Users engage với "Suggested Balance" actions
- Circle joins driven by element fit (Mộc users joining Mộc circles)
- Cross-element connections (deficiency-balancing)

**Anti-signals (failure):**
- Users skip onboarding (= we made it too long)
- ENTA never visited again post-setup (= wheel feels static)
- Users complain "what does Hỏa mean" (= education insufficient)
- Profile completeness farming (= we accidentally gamified)
- Anonymous browsing requests (= privacy too loose OR too tight)

---

## §18 KẾT LUẬN — 5 CÂU KHÓA

**1. ENTA = Identity Spine — Energy Identity Layer, KHÔNG phải Profile Page truyền thống.**

**2. ENTA Wheel = hero widget #1 — animated, alive, hiện diện identity qua 5 elements.**

**3. Identity precedes capability — onboarding mandatory, identity unlocks participation.**

**4. Resonance > Connection count — chất lượng cộng hưởng over follower quantity.**

**5. ENTA reveals — KHÔNG invent identity. Calculation từ birth data + activity history (QOT-bound).**

---

## §19 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ Foundation OS + Identity Canon + ENTA Design System v1 + 13 file canon cũ + Cursor V2 audit |

---

🔒 UZG+ V3 PWA OS — ENTA Module Canon v1.0
End of file.
