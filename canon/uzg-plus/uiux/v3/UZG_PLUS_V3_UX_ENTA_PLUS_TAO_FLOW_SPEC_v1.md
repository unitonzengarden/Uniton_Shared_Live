# UZG+ V3 PWA OS — ENTA + PLUS + TAO UX FLOW SPEC

**Document ID:** `UZG_PLUS_V3_UX_ENTA_PLUS_TAO_FLOW_SPEC_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (UX layer — implements ENTA + PLUS Hub + TAO UI canons)
**Modules:** ENTA (Bottom Nav #5), PLUS (Bottom Nav #3 center), TAO (Mini App)
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_ENTA_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_TAO_CANON_v1`
- Tier 3: `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1`

**Source evidence:** Cursor V2 audit (G01 public ENTA gate), Whitepaper §4.2

---

## §0 PURPOSE

UX layer combined cho 3 modules: ENTA (identity spine) + PLUS Hub (mini app launcher) + TAO (wisdom mini app). Combine để giảm fragment vì 3 modules có flows interconnected (ENTA birth data → TAO chart → AIER chat in CHAT).

File này có 3 phần chính:
- **PART A: ENTA UX flows** (§1-§7)
- **PART B: PLUS Hub UX flows** (§8-§12)
- **PART C: TAO UX flows** (§13-§19)
- **Shared sections:** Cross-module integration, Migration, Success metrics

---

# PART A — ENTA UX FLOWS

## §1 ENTA USER JOURNEY MAP

### §1.1 Master journey

```
[USER taps ENTA bottom nav OR avatar in feed]
        ↓
[Auth + Onboarding check]
   ├─ Not authenticated → Login flow
   ├─ Auth + ENTA incomplete → Onboarding wizard
   └─ Auth + ENTA complete → ENTA shell mount
        ↓
[ENTA shell - own profile by default]
        ↓
[User actions:]
   ├─→ Tap ENTA Wheel segment → Element detail sheet
   ├─→ Tab switch (Identity / Resonance / Circles / Journey)
   ├─→ Tap Floating + → Edit Profile / Add Connection / etc.
   ├─→ Tap "View detailed Bazi reading" → TAO mini app
   └─→ Cross-module exits
```

### §1.2 ENTA Journey segments — 6 chính

| # | Segment | Goal |
|---|---|---|
| **EJ1** | First-time onboarding | New user → ENTA created |
| **EJ2** | Returning ENTA view | User checks own identity |
| **EJ3** | View other's ENTA | Browse another user's profile |
| **EJ4** | Edit ENTA | Update profile / privacy |
| **EJ5** | Connect from ENTA | Add new connection |
| **EJ6** | Phase update | Reflect life phase change |

---

## §2 ENTA ONBOARDING FLOW (EJ1)

### §2.1 Onboarding state machine

```
[NOT_ONBOARDED] → [STEP_1_BIRTH_DATA]
                       ↓ Submit
                  [STEP_2_CALCULATING]
                       ↓ 2-3s
                  [STEP_3_RESULT_REVEAL]
                       ↓ Continue
                  [STEP_4_FIRST_RESONANCE]
                       ↓ Connect / Skip
                  [STEP_5_WELCOME_HOME]
                       ↓
                  [ONBOARDED]
```

### §2.2 Step 1: Birth Data

```
[Wizard mounts]
      ↓
[Welcome message]
      ↓
[Form fields]:
   ├─ Birth Date (date picker, required)
   ├─ Birth Time (time picker, optional but encouraged)
   ├─ Gender (Male / Female / Other, required)
   └─ Birth Location (city search, required)
      ↓
[Privacy note: "Used for calculation only. Never shared publicly."]
      ↓
[Submit button]
      ├─ Required fields incomplete → disabled
      └─ Complete → enabled, tap → Step 2
```

### §2.3 Step 2: Calculating

```
[Step 1 submitted]
      ↓
[Calculating overlay (2-3s, no skip)]
      ├─ Animated wheel forming
      ├─ Element percentages computing
      └─ Polarity revealing
      ↓
[Auto-advance to Step 3]
```

KHÔNG mystical "discovering destiny" framing — neutral "Calculating".

### §2.4 Step 3: Result Reveal

```
[Result page]:
   ├─ "You are <Element1>-<Element2> dominant"
   ├─ "<Polarity>"
   ├─ "Current phase: <Phase>"
   ├─ Large ENTA Wheel display
   ├─ Brief explanation
   └─ Continue button
      ↓
[Cultural framing visible]
```

### §2.5 Step 4: First Suggested Resonance

```
[Step 4]:
   ├─ "Connect with people who resonate"
   ├─ 3 suggested users (auto-curated from ENTA fit)
   ├─ Each: avatar + ENTA + reason + resonance score
   └─ Actions:
         ├─ Skip
         ├─ Connect with All (batch)
         └─ Tap individual to view + connect
      ↓
[Continue button → Step 5]
```

### §2.6 Step 5: Welcome to HOME

```
[Welcome page]:
   ├─ "You're all set!"
   ├─ Brief: "Visit Value Stream to..."
   └─ "Enter UZG+" button
      ↓
[Lands on HOME shell]
```

### §2.7 Onboarding edge cases

**Birth time unknown:**
- User can skip
- Mark in profile: "Time unknown"
- ENTA wheel shows partial (3-pillar in Bazi terms)
- Premium reading suggests "Add time for accuracy"

**Validation failed (city not found):**
- Manual coordinates fallback
- Or "Skip location, use country only"

**User abandons mid-onboarding:**
- Save progress
- Resume from last step on next visit
- Banner in HOME: "Complete ENTA setup →"

---

## §3 ENTA OWN PROFILE FLOW (EJ2)

### §3.1 Own profile view state machine

```
[ENTERING] → [LOADING] → [LOADED] | [ERROR]
                            ↓
                       [TAB_SWITCHING] (instant)
                            ↓
                       [LOADED] (steady)
```

### §3.2 ENTA Wheel interaction

```
[User taps element segment]
      ↓
[Element detail sheet bottom slide-up (50% screen)]
      ↓
[Show]:
   ├─ Element name + percentage
   ├─ Element meaning (Vietnamese description)
   ├─ Recent activity in this element
   └─ Suggested actions to balance
      ↓
[Close → return to ENTA shell]

ALT: Long press wheel → all elements highlight sequentially (audio cue optional)
```

### §3.3 Tab switching

```
Tabs: [Identity | Resonance | Circles | Journey]

[Tap tab]
      ↓
[Active tab marked]
      ↓
[Content swap (instant, no animation)]
      ↓
[Tab content rendered]
```

### §3.4 Tab content per tab

**Identity tab (default):**
- ENTA Map detailed
- Polarity Balance
- Suggested Balance Actions
- KHÔNG show: birth data raw

**Resonance tab:**
- Connected count (qualitative)
- Top Resonance list
- Suggested Resonance (refresh)
- KHÔNG show: numeric follower count

**Circles tab:**
- Member of (3 circles)
- Suggested Circles based on ENTA fit

**Journey tab:**
- Energy Journey timeline
- Past phases
- Contribution History (QOT-traced count)

---

## §4 OTHER USER ENTA VIEW (EJ3)

### §4.1 View flow

```
[User taps avatar in HOME / CHAT]
      ↓
[Cross-module exit to ENTA shell]
      ↓
[ENTA loads OTHER user's profile]
      ↓
[Top bar variant]:
   ├─ Back arrow (←) replaces own Avatar
   ├─ Title: "<Their handle>'s ENTA"
   └─ More menu (⋯)
      ↓
[Show]:
   ├─ Their ENTA Wheel
   ├─ Their identity description
   ├─ "X% Resonance with You"
   ├─ Connect / Send Message / More buttons
   └─ Public sections (per their privacy):
         ├─ Public ENTA element distribution (if shared)
         ├─ Mutual circles
         ├─ Recent public posts
         └─ QOT contributions count
```

### §4.2 Action buttons states

**Connect button:**
| State | Display | Action |
|---|---|---|
| Not connected | "Connect" | Open connection action sheet |
| Open Connect | "Connected · Open" | Tap → upgrade options |
| Resonance Connect | "Connected · Resonance" | Tap → manage |
| Trusted Connect | "Connected · Trusted" | Tap → manage |
| Pending request | "Pending" | Tap → cancel |

**Send Message button:**
- Visible only Trusted Connect
- For lower levels: "Connect first to message" (disabled)
- Tap → CHAT shell với DM thread

**More menu (⋯):**
- View public posts
- Mutual circles
- Block (with confirm)
- Report

### §4.3 Privacy edge cases

**User has private profile:**
- Limited info shown:
  - Avatar + handle
  - ENTA element profile (basic)
  - "Private profile — connect to view more"
- No element percentages
- No public posts
- No mutual circles displayed

**User blocked you:**
- "Profile not available"
- Cannot send connect request

---

## §5 EDIT ENTA FLOW (EJ4)

### §5.1 Edit Profile lifecycle

```
[User taps Floating + → "Edit Profile"]
      ↓
[Edit overlay full-screen]
      ↓
[Editable fields]:
   ├─ Display name
   ├─ Handle (one-time change only - confirm dialog)
   ├─ Bio (500 chars)
   ├─ Phase narrative
   └─ Privacy settings (sub-overlay)
      ↓
[NOT editable]:
   ├─ Birth data (immutable)
   ├─ ENTA element distribution (calculated)
   ├─ Polarity (from birth data)
   └─ Phase (auto-calculated)
      ↓
[Save → return to profile]
[Discard → return to profile, no change]
```

### §5.2 Privacy settings flow

```
[Tap Privacy Settings]
      ↓
[Privacy overlay]
      ↓
[Toggles]:
   ├─ Profile visibility (Public / Connections / Trusted)
   ├─ Element percentages (Show/Hide)
   ├─ Phase narrative (Show/Hide)
   ├─ Connection count (Show/Hide, default off)
   ├─ Mutual circles (Show/Hide)
   └─ Resonance score with others (Show/Hide)
      ↓
[Save → applies immediately]
```

---

## §6 ENTA CROSS-MODULE EXITS

| From ENTA | To module | Trigger |
|---|---|---|
| Tap "Send Message" (Trusted Connect) | CHAT | Action button |
| Tap "Talk to AIER Tao" | CHAT (AIER thread) | Cross-link |
| Tap "View detailed Bazi reading" | TAO mini app | Cross-link |
| Tap "Join Circle" | PLUS Hub > Circle Business | Action |
| Tap mutual circle | PLUS Hub > Circle Business (that circle) | Cross-link |
| Tap user's recent post | HOME (post detail) | Public posts |
| Tap "Edit Profile" → Privacy → Membership | PLUS Hub > Membership mini app | Cross-link |

---

## §7 ENTA STATES + EDGE CASES

### §7.1 Screen states matrix

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| ENTA Wheel | Skeleton placeholder | N/A | "Calculation failed" | Animated wheel | N/A |
| Identity tab | Skeleton | N/A | Partial fallback | Full | N/A |
| Resonance tab | Skeleton list | "No connections yet" | Failed | List | N/A |
| Circles tab | Skeleton | "Not in any circle" | Failed | List + suggestions | N/A |
| Journey tab | Skeleton timeline | "Journey just starting" | Failed | Full timeline | N/A |
| Other user profile | Skeleton | "Private profile" | Profile not found | Full per privacy | Blocked |
| Onboarding wizard | N/A | N/A | Step retry | Active wizard | Submit disabled |

### §7.2 Edge cases

**Birth data partial:**
- Wheel shows but with "Add birth time for full accuracy" hint
- Premium readings limited

**Phase recalculation needed:**
- System auto-runs based on activity + age cycle
- User notified: "Phase updated: Building → Expanding"

**ENTA recalc requested by user:**
- Floating + → Recalculate
- Confirm: "Recalculation will refresh based on latest activity"
- Loading 2-3s
- New wheel displayed

---

# PART B — PLUS HUB UX FLOWS

## §8 PLUS HUB USER JOURNEY MAP

### §8.1 Master journey

```
[USER taps UZG+ logo center bottom nav]
        ↓
[Decision per Foundation §6.5]:
   ├─ Single tap (chosen behavior): open PLUS Hub
   └─ (alt) Long press: quick HOME return
        ↓
[PLUS shell mount]
        ↓
[Show 3 sections]:
   ├─ Pinned (4-8 apps)
   ├─ Featured (curated)
   └─ All Apps (alphabetical)
        ↓
[User actions:]
   ├─→ Tap app icon → Mini app full-screen
   ├─→ Long press app → Context menu
   ├─→ Tap [Edit] → Reorder mode
   ├─→ Search apps
   ├─→ Tap [Why?] (Featured) → Explanation
   └─→ Cross-module exits
```

### §8.2 PLUS Journey segments — 5 chính

| # | Segment | Goal |
|---|---|---|
| **PJ1** | Browse Hub | Find an app |
| **PJ2** | Launch Mini App | Open + use mini app |
| **PJ3** | Customize Pinned | Reorder / Pin / Unpin |
| **PJ4** | Search Apps | Find specific app |
| **PJ5** | Exit Mini App | Return to Hub |

---

## §9 PLUS HUB ENTRY (PJ1)

### §9.1 Hub mount flow

```
[User taps UZG+ logo]
      ↓
[PLUS shell mount (slide-up 280ms)]
      ↓
[Top Bar: "UZG+ Apps" + Search + Settings]
      ↓
[Sections render]:
   ├─ Pinned (loading skeleton if first time)
   ├─ Featured (ENTA-aware curation API call)
   └─ All Apps (full inventory)
      ↓ ≤500ms typical (mostly cached)
[All sections rendered]
      ↓
[User browses or acts]
```

### §9.2 First-time user (no pinned customization)

System auto-pins 4 default apps:
- U-Reward
- TAO
- Booking
- Membership

Banner: "We've pinned starter apps. Customize anytime."

---

## §10 LAUNCH MINI APP FLOW (PJ2)

### §10.1 Launch sequence

```
[User taps mini app icon]
      ↓
[Icon scale-up animation (200ms anticipation)]
      ↓
[Mini app full-screen slide up (320ms)]
      ↓
[4 phần cố định behavior change]:
   ├─ Bottom Nav: HIDDEN
   ├─ Top Bar: REPLACED by mini app top bar
   ├─ Floating +: HIDDEN (mini app provides own)
   └─ U-Reward pill: HIDDEN if entering U-Reward, VISIBLE otherwise
      ↓
[Mini app loads]
   ├─ Cached → instant
   └─ Not cached → skeleton → API → render
      ↓
[Mini app UI active]
```

### §10.2 Mini app loading state

```
[Skeleton/splash specific to mini app]
      ↓ ≤2s typical
[Content rendered]

ALT: Slow load:
[Loading > 3s → "Loading <app>..." indicator]
[> 8s → "Slow connection. Continue?"]
```

### §10.3 Deep link entry

```
[External link e.g. uzg.plus/app/u-reward]
      ↓
[Auth check]
   ├─ Not auth → Login → resume
   └─ Auth → continue
      ↓
[Mini app loads directly (skip PLUS Hub)]
      ↓
[Top bar shows close (X) → returns to PLUS Hub on exit]
```

---

## §11 CUSTOMIZE PINNED FLOW (PJ3)

### §11.1 Pin/Unpin flow

```
[User long-presses app icon]
      ↓
[Context menu]:
   ├─ Pin to top
   ├─ Hide from grid
   ├─ About
   └─ Notification settings
      ↓
[Tap "Pin"]
      ↓
[Icon moves to Pinned section (animation 300ms)]
      ↓
[Confirm toast: "Pinned"]
```

### §11.2 Reorder mode

```
[Tap [Edit] in Pinned section]
      ↓
[Edit mode active]:
   ├─ Pinned icons jiggle (subtle wiggle 0.5° rotation, 800ms loop)
   ├─ ✕ on each (unpin button)
   └─ Drag-handle visible
      ↓
[User drags to reorder]
      ↓
[Layout re-arranges in real-time]
      ↓
[Tap "Done" (or anywhere outside) → exit edit mode]
      ↓
[New order saved]
```

### §11.3 Hide app

```
[Long press → "Hide from grid"]
      ↓
[Confirm]
      ↓
[App removed from main view]
[Search still finds it]
[Avatar Menu → "Hidden apps" to restore]
```

---

## §12 SEARCH + EXIT FLOWS (PJ4-PJ5)

### §12.1 Search flow

```
[Tap 🔍 in Top Bar]
      ↓
[Search overlay sticky]
      ↓
[User types query]
      ↓ debounce 300ms
[Live filter (instant, no API call)]
      ↓
[Results: matching apps highlighted, others dimmed]
      ↓
[Tap result → Launch mini app]

ALT: No results
[Empty state: "No apps match '<query>'" + suggestions]
```

### §12.2 Exit mini app flow

```
[User in mini app]
      ↓ Multiple exit paths:
   ├─ Tap close (✕) → return to PLUS Hub
   ├─ Tap UZG+ logo center → PLUS Hub OR HOME (per Foundation)
   ├─ Browser back → previous shell
   └─ Swipe down (mobile gesture, optional) → exit
      ↓
[Mini app exit transition (slide down 280ms)]
      ↓
[4 phần cố định restored]
      ↓
[PLUS Hub or HOME shell active]
```

---

# PART C — TAO UX FLOWS

## §13 TAO USER JOURNEY MAP

### §13.1 Master journey

```
[USER taps TAO icon in PLUS Hub]
   (or from HOME daily widget / ENTA cross-link / CHAT AIER)
        ↓
[Mini app launch (per PLUS Hub flow)]
        ↓
[TAO Overview surface]
        ↓
[Cultural framing visible at top]
        ↓
[3-tab navigation: Bazi / Tử Vi / Phong Thủy]
        ↓
[User actions per tab]:
   ├─→ View charts (Bazi 4 pillars, Tử Vi palaces, Phong Thủy compass)
   ├─→ Drill into details
   ├─→ Premium readings (gated)
   ├─→ Talk to AIER Tao (cross to CHAT)
   ├─→ Lịch Vạn Niên detail
   └─→ Compatibility check (Premium)
```

### §13.2 TAO Journey segments — 6 chính

| # | Segment | Goal |
|---|---|---|
| **TJ1** | First chart creation | New user → Bazi/Tử Vi chart |
| **TJ2** | View existing chart | Returning user reads chart |
| **TJ3** | Premium reading | Unlock advanced reading |
| **TJ4** | AIER Tao chat | Conversational advisory |
| **TJ5** | Daily widget consume | Lịch Vạn Niên check |
| **TJ6** | Compatibility | Premium relationship analysis |

---

## §14 CHART CREATION FLOW (TJ1)

### §14.1 Create chart wizard

```
[User has no chart yet]
      ↓
[TAO Overview shows: "Bạn chưa có Bazi chart. Tạo từ ENTA birth data" + CTA]
      ↓
[User taps "Create Bazi chart"]
      ↓
[Wizard mounts]
      ↓
[Step 1: Confirm birth data]
   ├─ Auto-fill from ENTA
   ├─ User can edit
   └─ Continue
      ↓
[Step 2: Computing... (calm animation, 2-3s)]
[Calculating Bazi pillars, day master, hidden stems]
      ↓
[Step 3: Result reveal]
   ├─ "Day Master: Mộc Dương (Giáp Mộc)"
   ├─ Brief explanation
   ├─ Element distribution preview
   └─ "View full chart" CTA
      ↓
[Chart saved to user profile]
[Auto-redirect to 4 Pillars Chart view]
```

### §14.2 Tử Vi chart auto-creation

Tử Vi chart auto-created same time as Bazi (shared birth data).

User can switch tabs to view Tử Vi without separate creation flow.

### §14.3 Phong Thủy profile

```
[User views Phong Thủy tab first time]
      ↓
[Cung Mệnh derived from birth data + gender]
[Shown immediately - no separate creation]
      ↓
[Bát Trạch Profile gated by Member tier]
   ├─ Free: see Cung Mệnh + element resonance
   └─ Member+: full Bát Trạch
```

---

## §15 VIEW CHART FLOW (TJ2)

### §15.1 Bazi 4 Pillars view

```
[User on Bazi tab]
      ↓
[Show]:
   ├─ Day Master prominent
   ├─ 4 vertical pillars (Year / Month / Day / Hour)
   ├─ Each pillar: Stem + Branch + Hidden Stems + Element marking
   ├─ 10 Gods relationships shown subtly
   └─ QOT trace icon
      ↓
[User can]:
   ├─ Tap pillar → deep dive sheet
   ├─ Tap "Day Master Analysis" (Member tier) → unlocks
   ├─ Tap "Useful God" (Premium) → unlocks
   ├─ Tap "Luck Pillars" (Premium) → unlocks
   └─ Tap QOT → provenance sheet
```

### §15.2 Pillar deep dive

```
[Tap any pillar]
      ↓
[Bottom sheet 70% screen]
      ↓
[Show]:
   ├─ Pillar name (Year/Month/Day/Hour)
   ├─ Heavenly Stem detail
   ├─ Earthly Branch detail
   ├─ Hidden Stems
   ├─ Element interactions
   ├─ 10 Gods present
   └─ Educational explanation
      ↓
[Close sheet → return to chart]
```

### §15.3 Tử Vi 12-Palace view

```
[User switches to Tử Vi tab]
      ↓
[12-Palace Chart visualization]
   ├─ Circular grid OR 4×3 grid
   ├─ Each palace: name + stars + element
   ├─ Mệnh palace highlighted
   └─ Tap palace → palace detail sheet
```

### §15.4 Phong Thủy compass view

```
[User switches to Phong Thủy tab]
      ↓
[Cung Mệnh display]
[8-direction compass]
[Bát Trạch favorable / unfavorable directions]
[Member tier: full analysis]
[Premium tier: Cửu Cung Phi Tinh annual]
```

---

## §16 PREMIUM READING FLOW (TJ3)

### §16.1 Tier-locked surface UX

```
[User taps locked surface (e.g. "Useful God Reading")]
      ↓
[Locked overlay]:
   ├─ Lock icon
   ├─ "Premium feature"
   ├─ Description of what's inside
   ├─ [Upgrade to Sovereign] CTA
   └─ [Free alternative: Day Master →]
      ↓
[User options]:
   ├─ Upgrade → PLUS Hub > Membership mini app
   ├─ Free alternative → unlocked surface
   └─ Back → return to Overview
```

### §16.2 KHÔNG paywall ép buộc

- Always có Free fallback path
- Clear value proposition (not aggressive)
- KHÔNG urgency-fear

---

## §17 AIER TAO FLOW (TJ4)

### §17.1 AIER Tao invocation

```
[User taps "Talk to AIER Tao" in TAO Overview]
   (or "AIER Tao bound to your chart" in ENTA)
      ↓
[Cross-module exit to CHAT shell]
      ↓
[CHAT opens AIER Tao thread]
      ↓
[Top Bar shows]:
   ├─ AIER avatar + "Governed Entity" badge
   ├─ "AIER Tao"
   └─ Chart reference: "Grounded on Bazi chart"
      ↓
[AIER greeting message auto-shown]
[User can ask questions]
```

### §17.2 AIER Tao response constraints

Per CHAT canon §6.4 + TAO canon §6.5:
- Identifies as AIER Tao
- References chart elements specifically
- Advisor tone (NOT thầy-phán)
- Acknowledges limits
- QOT chain in advice
- Hand-off to human if needed

---

## §18 DAILY WIDGET FLOW (TJ5)

### §18.1 HOME widget consume

```
[User scrolling HOME stream]
      ↓
[Lịch Vạn Niên daily widget appears]
      ↓
[Widget shows]:
   ├─ Today's date (lunar)
   ├─ Heavenly Stem + Branch
   ├─ Element of day
   ├─ Theo ENTA: hợp X (Free)
   ├─ Theo Bazi: dụng thần Y (Member)
   └─ Phi Tinh: Z (Premium)
      ↓
[Tap widget → Lịch Vạn Niên detail screen]
      ↓
[Detail screen full TAO mini app context]
   ├─ Solar / Lunar calendar
   ├─ Auspicious / Cautious activities
   └─ Personalized matching per tier
```

### §18.2 Push notification (opt-in)

Per TAO canon §7.4:
- User opt-in
- Neutral framing only
- KHÔNG fear notifications

---

## §19 COMPATIBILITY FLOW (TJ6)

### §19.1 Compatibility check (Premium)

```
[User taps Compatibility (Premium)]
      ↓
[Lock check]:
   ├─ Free/Member → Upgrade prompt
   └─ Premium → continue
      ↓
[Select other person]:
   ├─ From connections list
   ├─ Search user
   └─ Manual birth data entry
      ↓
[Calculate]
      ↓
[Result]:
   ├─ Both users' Day Masters
   ├─ Element relationship (sinh / khắc / hợp)
   ├─ Compatibility patterns
   └─ Educational framing
      ↓
[KHÔNG absolute scores]
[KHÔNG "Hai người này KHÔNG hợp"]
```

---

## §20 SCREEN STATES MATRIX (3 modules combined)

### §20.1 ENTA states

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| ENTA Wheel | Skeleton | N/A | "Calculation failed" | Animated | N/A |
| Tabs (4) | Skeleton | "Just starting" | Failed | Full | N/A |
| Other user profile | Skeleton | "Private" | Not found | Per privacy | Blocked |
| Onboarding | N/A | N/A | Step retry | Active | Submit disabled |

### §20.2 PLUS Hub states

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| Hub grid | Skeleton 8-12 | N/A (always có core) | "Some apps unavailable" | All sections | Tier-locked apps (lock icon) |
| Mini app launch | Skeleton/splash | N/A | "App unavailable" | Mini app loaded | Permission denied |
| Search | N/A | "No matches" | N/A | Live filter | N/A |
| Edit mode | N/A | N/A | N/A | Jiggle + drag | N/A |

### §20.3 TAO states

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| Overview | Skeleton | "No chart yet" + Create CTA | Failed | Full | N/A |
| 4 Pillars Chart | Skeleton chart | N/A | "Chart calc failed" | Full chart | N/A |
| 12 Palaces | Skeleton | N/A | Failed | Full | N/A |
| Phong Thủy compass | Skeleton | N/A | Failed | Full | N/A |
| Premium surfaces | N/A | N/A | N/A | Unlocked | Locked (upgrade CTA) |
| Chart wizard | N/A | N/A | Step retry | Active | Submit disabled |
| Lịch Vạn Niên detail | Skeleton | N/A | Failed | Full | N/A |

---

## §21 EDGE CASES + ERROR HANDLING

### §21.1 ENTA Edge cases

**Birth data partial (no time):**
- Wheel partial
- Premium readings limited
- Banner: "Add birth time for full accuracy"

**Phase auto-update:**
- System detects life cycle progression
- Notification: "Phase updated: Building → Expanding"

### §21.2 PLUS Hub Edge cases

**Mini app permanently unavailable:**
- Icon shows lock + "Coming soon" tooltip
- Cannot launch

**Mini app version mismatch:**
- Force refresh on launch
- "App updated, please refresh"

### §21.3 TAO Edge cases

**Calendar engine fail:**
- Banner "Calendar service unavailable"
- Cached results fallback (last known)

**AIER Tao service down:**
- "AIER temporarily unavailable"
- Retry available

**Birth data inconsistent (Bazi vs Tử Vi month boundary):**
- UI explanation: "Bazi uses solar month, Tử Vi uses lunar — slight differences expected"
- Both shown clearly

---

## §22 PERMISSION + GATING

### §22.1 ENTA gating

| Feature | Required |
|---|---|
| ENTA created | Auto on auth + birth data |
| Edit profile | Owner only |
| Edit birth data | NOT possible (immutable) |
| View other ENTA (public) | Anyone (Open Connect+) |
| Send Message | Trusted Connect |

### §22.2 PLUS Hub gating

| Feature | Free | Member | Premium |
|---|---|---|---|
| All core mini apps | ✓ | ✓ | ✓ |
| Pinned (8 slots) | ✓ | ✓ | ✓ |
| Featured curation | ✓ | ✓ | ✓ |
| Tier-locked apps (e.g. Sovereign features) | ❌ | Limited | ✓ |

### §22.3 TAO gating

| Feature | Free | Member | Premium |
|---|---|---|---|
| Bazi Overview + 4 Pillars | ✓ | ✓ | ✓ |
| Day Master Analysis | ❌ | ✓ | ✓ |
| Useful God Reading | ❌ | ❌ | ✓ |
| Luck Pillars | ❌ | ❌ | ✓ |
| Tử Vi 12 Palaces | ✓ | ✓ | ✓ |
| Cung Mệnh | ✓ | ✓ | ✓ |
| Bát Trạch full | ❌ | ✓ | ✓ |
| Cửu Cung Phi Tinh | ❌ | ❌ | ✓ |
| AIER Tao basic | 3 questions/month | Unlimited | Unlimited |
| AIER Tao advanced | ❌ | Limited | ✓ |
| Compatibility | ❌ | ❌ | ✓ |
| Lịch Vạn Niên (basic) | ✓ | ✓ | ✓ |
| Lịch Vạn Niên personalized | ENTA-only | + Bazi | + Phi Tinh |

---

## §23 PERFORMANCE TARGETS

| Action | Target |
|---|---|
| ENTA shell mount | < 200ms |
| ENTA Wheel render | < 500ms |
| ENTA tab switch | Instant |
| PLUS Hub mount | < 200ms |
| Mini app launch | < 800ms (cached) / < 2s (fresh) |
| TAO Overview load | < 1s |
| Chart calculation | 2-3s (animated wait) |
| Pillar deep dive | < 400ms |
| AIER Tao response | < 3s typical |

---

## §24 CROSS-MODULE EXITS (3 modules combined)

### §24.1 ENTA exits

| To | Trigger |
|---|---|
| CHAT (DM) | Send Message button |
| CHAT (AIER Tao) | Talk to AIER Tao |
| TAO mini app | View detailed Bazi reading |
| HOME (post detail) | Recent posts in profile |
| PLUS Hub > Circles | Join Circle / Mutual circle |
| PLUS Hub > Membership | Upgrade flow |

### §24.2 PLUS Hub exits

| To | Trigger |
|---|---|
| Mini app full-screen | Tap any app icon |
| HOME | UZG+ logo center (Foundation behavior) |
| Other bottom nav | Tap CHAT/WALLET/ENTA |

### §24.3 TAO exits

| To | Trigger |
|---|---|
| CHAT (AIER Tao thread) | Talk to AIER button |
| ENTA (own) | Birth data edit cross-link |
| WALLET | Premium subscription / Marketplace |
| HOME (daily widget) | Daily check insights |
| PLUS Hub | Close (✕) button |

---

## §25 DECISION POINTS

### §25.1 ENTA: First-time vs returning

- No ENTA → forced onboarding (cannot skip)
- ENTA incomplete → resume from last step
- ENTA complete → own profile view

### §25.2 PLUS Hub: UZG+ logo behavior

Per Foundation §6.5:
- Single tap → open PLUS (recommended)
- Long press → quick HOME

NTS confirm preferred behavior trong production.

### §25.3 TAO: Chart creation auto vs manual

- Birth data exists → auto-create on first TAO open
- Birth data missing → prompt for ENTA completion first

### §25.4 TAO: Premium upgrade

- Tier-locked surface tap → show upgrade prompt
- KHÔNG aggressive paywall
- Always có free alternative

---

## §26 V2 → V3 UX MIGRATION

### §26.1 V2 issues

| Module | Gap | Fix |
|---|---|---|
| ENTA | G01 — `/enta/:handle` requires login | Public profile per privacy settings |
| ENTA | 3D placeholder (Master Audit) | Animated wheel SVG/Canvas |
| ENTA | `/profile/*` separate routes | Migrate to `/enta/*` |
| PLUS | No springboard pattern (V2 uses PlusHub but flat) | Hub with 3 sections + grid |
| PLUS | Mini apps still in main shell | Full-screen takeover pattern |
| TAO | Module concept exists but not shipped | Build mini app per V3 canon |
| TAO | Fear-UX risk | 5 redlines compliance gate |

### §26.2 V3 implementation order

Sprint 1 (foundational):
1. ENTA shell + animated Wheel
2. ENTA onboarding wizard 5-step (mandatory)
3. PLUS Hub shell với grid + sections
4. Mini app full-screen pattern

Sprint 2 (depth):
5. ENTA 4 tabs content
6. ENTA edit + privacy
7. TAO mini app shell + 3-tab
8. TAO chart creation wizard

Sprint 3 (premium + cross-module):
9. AIER Tao integration với CHAT
10. Lịch Vạn Niên daily widget
11. Premium readings flow
12. Compatibility flow

---

## §27 SUCCESS METRICS

### §27.1 ENTA success signals

- Onboarding completion > 90%
- Returning ENTA visits regular pattern
- Connection actions từ ENTA > 30%
- Cross-element connections (deficiency-balancing)
- Phase update engagement

### §27.2 PLUS Hub success signals

- Pinned customization > 40%
- Featured app open rate > random
- Search → tap > 50%
- Mini app session focused (not endless)

### §27.3 TAO success signals

- Chart creation > 50% of users
- Daily widget engagement (educational)
- Premium upgrade driven by interest (not fear)
- AIER Tao chat sessions với grounded follow-ups
- KHÔNG complaints "TAO scared me"

---

## §28 KẾT LUẬN — 5 CÂU KHÓA

**1. ENTA UX = Identity-first onboarding (mandatory, 5 steps), Wheel hero animated, 4 tabs (Identity/Resonance/Circles/Journey).**

**2. PLUS Hub UX = Springboard pattern (3 sections), mini app full-screen takeover (slide up 320ms), customizable Pinned.**

**3. TAO UX = 3 sub-modules (Bazi/Tử Vi/Phong Thủy) + AIER Tao integration với CHAT + Lịch Vạn Niên daily widget.**

**4. Cross-module flow: ENTA birth data → TAO chart → AIER Tao chat (CHAT) → ENTA enriched.**

**5. Tier gating clear: Free / Member / Premium — KHÔNG paywall ép buộc, always có free alternative.**

---

## §29 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ ENTA + PLUS Hub + TAO UI canons + Foundation OS + Cursor V2 audit + Lane_02 TAO canons |

---

🔒 UZG+ V3 PWA OS — ENTA + PLUS + TAO UX Flow Spec v1.0
End of file.
