# UZG+ V3 PWA OS — U-REWARD MODULE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_UREWARD_CANON_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (Module-specific, governed by Foundation OS Canon Tier 3)
**Module:** U-Reward (Mini App, accessible via PLUS Hub + U-Reward pill cố định Foundation §3.4)
**Inspiration shell:** Telegram mini apps (Notcoin, Hamster Kombat patterns) — full-screen action loop
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` ← MUST read first
- Tier 4: `UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1` (parent hub)
- Tier 3: `UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1`
- Tier 2: MASTER_ECONOMY_CANON, HUMAN_VALUE_CANON

**Companion canons:** HOME, CHAT, WALLET, ENTA, PLUS Hub, TAO, REDLINES_MASTER

---

## §0 PURPOSE

Khóa UI/UX cho **U-Reward mini app** — Connect-to-Earn engine của UZG+ OS. U-Reward là mini app full-screen accessible qua 2 entry: (1) tap U-Reward pill (Foundation PHẦN 4) hoặc (2) tap U-Reward icon trong PLUS Hub.

U-Reward theo Telegram mini app pattern (Notcoin, Hamster Kombat) — single immersive screen, action → reward → loop. NHƯNG khác Notcoin: KHÔNG farming vô nghĩa, KHÔNG token speculation, KHÔNG fake leaderboard. U gắn với value thật (action thật / trust thật / history thật).

**Quan trọng:** File này CHỈ describe nội dung U-Reward mini app. Mini apps có UI/UX freedom theo PLUS Hub Canon §10 — vẫn tuân Design System.

---

## §1 ĐỊNH NGHĨA

### §1.1 Câu định nghĩa official

**U-Reward = Connect-to-Earn Engine của UZG+ OS. Mini app full-screen theo Telegram pattern (action → reward → loop), 1 màn hình duy nhất với 4 modules (Tap / Quiz / Task / Campaign). U-Reward KHÔNG phải landing page, KHÔNG phải dashboard, KHÔNG phải game rời rạc — là engine sống real-time integrated với toàn OS.**

### §1.2 5 câu khóa

**1. U-Reward = Mini App thật (Telegram pattern), KHÔNG phải Landing Page.**
**2. Action → Reward → Loop là lõi — loop ngắn 3-10s.**
**3. Reward phải gắn Value thật (action/trust/history), KHÔNG phải spam.**
**4. U = Energy, phải cảm nhận được (visible flow + animation).**
**5. U-Reward integrated với toàn OS — pill Foundation §3.4 luôn visible (trừ khi user đang ở trong U-Reward).**

### §1.3 Vào U-Reward thấy gì

User entry 2 cách:
1. Tap U-Reward pill (top-right, Foundation PHẦN 4) — quick entry
2. Tap U-Reward icon trong PLUS Hub — explicit entry

Khi entered:
- Mini app full-screen takeover (slide up 320ms)
- 4 phần cố định behavior:
  - Bottom Nav: HIDDEN (immersive)
  - Top Bar: REPLACED by U-Reward top bar
  - Floating +: HIDDEN (mini app provides actions)
  - U-Reward pill: HIDDEN (you're inside)
- Single-screen UX, no multi-page navigation

### §1.4 Khác biệt với Notcoin / Hamster Kombat

| Notcoin / Hamster Kombat | UZG+ U-Reward |
|---|---|
| Tap vô nghĩa farm tokens | Tap với cooldown + diminishing return |
| Token speculation | U gắn value thật, convert to UZG → service |
| Fake leaderboard global | Personal progress + personal stats |
| Engagement-driven (nghiện) | Value-driven (purposeful) |
| Tokens vô giá trị | U → UZG → real services |
| No purpose beyond pump | Connect-to-Earn philosophy |
| Spam invite friends | Quality connections rewarded |
| Endless tap loop | Energy limit + cooldown |
| Crypto casino feel | Energy flow feel |

---

## §2 SHELL ARCHITECTURE — U-REWARD MINI APP

### §2.1 Single-screen layout

```
┌─────────────────────────────────────┐
│ [✕]   U-Reward       [⚙️] [🏆]    │  ← Mini app top bar
├─────────────────────────────────────┤
│                                     │
│   U: 1,250 ⚡                       │  ← Top stats bar
│   Daily Energy: 80% | 🔥 5 days     │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│       ┌─────────────────┐           │
│       │                 │           │  ← Main Action Zone
│       │   ENERGY CORE   │           │  (heart of app)
│       │                 │           │
│       │      ⚡         │           │
│       │                 │           │
│       │    TAP HERE     │           │
│       │                 │           │
│       └─────────────────┘           │
│                                     │
│   Live feedback:                    │
│   +2 U ⚡ (animation)                │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Progress                          │
│   🔥 Day 5 streak                   │
│   ████████░░ 80%                    │
│   Level 3 → Level 4 (200 U to go)   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Module strip                      │
│   [TAP] [QUIZ] [TASK] [CAMPAIGN]   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   Today's stats                     │
│   Earned: +45 U  |  Total: 1,250    │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   [Continue / Next Action CTA]      │
│                                     │
└─────────────────────────────────────┘
```

### §2.2 Top bar (mini app replaced)

Components:
- **Close (✕)** left — exit mini app, return to previous shell
- **App name "U-Reward"** center
- **Settings (⚙️)** right — preferences
- **Trophy (🏆)** right — personal achievements (NOT global leaderboard)

### §2.3 Top stats bar

```
U: 1,250 ⚡
Daily Energy: 80% | 🔥 5 days streak
```

Components:
- **U balance** (big, prominent)
- **Daily Energy %** — remaining tap energy today
- **Streak** — consecutive days check-in

KHÔNG hiển thị:
- Global rank
- "Top players" leaderboard
- "Beat your friends" prompts

---

## §3 MAIN ACTION ZONE — TRÁI TIM APP

### §3.1 Mode 1 — Tap to Earn (default)

```
       ┌─────────────────┐
       │                 │
       │   ENERGY CORE   │
       │                 │
       │      ⚡         │
       │                 │
       │    TAP HERE     │
       │                 │
       └─────────────────┘
```

**Visual:**
- Large circle/sphere (~250px diameter on mobile)
- Pulse animation (2s loop)
- Energy field glow (ENTA element color of user)
- Center: ⚡ icon
- Label below: "TAP HERE"

**Interaction:**
- Tap → +U increment
- Ripple animation từ tap point
- Vibration nhẹ (mobile haptic)
- Sound (optional, off by default)

**Feedback:**
- "+2 U ⚡" floating text bubble emerges, drifts up + fades 800ms
- Number on stats bar increments smoothly
- Glow burst on increment

**Cooldown / Limit:**
- Each tap: 1-3 U random (within range)
- Daily energy: 100% at midnight reset
- Each tap consumes ~1% energy
- When energy 0%: tap disabled, next reset countdown shown
- Overall: ~100-300 U per day max from tap

### §3.2 Mode 2 — Quiz to Earn

When user switches to Quiz module:

```
       ┌─────────────────────────────┐
       │                             │
       │   Q: UZG+ là gì?            │
       │                             │
       │   A. Social app             │
       │   B. Value OS               │
       │   C. Token project          │
       │   D. Game                   │
       │                             │
       │   [Submit answer]           │
       │                             │
       └─────────────────────────────┘
```

**Interaction:**
- Tap option → highlights
- Tap submit → instant result
- Correct: +5-10 U, success animation
- Wrong: hint shown, can retry once (no penalty)

**Quiz pool:**
- Onboarding questions (UZG+ basics)
- ENTA-related (test understanding)
- Wisdom topics (TAO/Bazi)
- Community knowledge

**Limit:**
- Daily 5-10 quizzes
- Cannot replay same quiz immediately
- 24h cooldown per question

### §3.3 Mode 3 — Task to Earn

```
       Today's Tasks:
       
       ✓ Join Circle (+10 U)
       ○ Comment on 3 posts (+5 U)
       ○ Connect with 1 new person (+8 U)
       ○ Visit TAO mini app (+3 U)
       ○ Complete daily check-in (+5 U)
```

**Task types:**
- Social tasks (join circle, comment, connect)
- Educational tasks (read X article, watch tutorial)
- Cross-module tasks (use TAO, Booking, Wallet)
- Connection tasks (introduce 2 people, suggest resonance)

**Verification:**
- Auto-detect when task completed (if technically possible)
- Manual claim button if can't auto-detect
- QOT trace for high-value tasks

**Daily refresh:**
- New task list at midnight
- Each task expires after 24h if not completed
- Rare tasks (weekly/monthly) for higher rewards

### §3.4 Mode 4 — Campaign

```
       🔥 Active Campaigns
       
       Telegram Growth Campaign
       Complete 5 tasks → +50 U bonus
       Progress: ███░░ 3/5
       Ends in 2 days
       
       [View tasks →]
       
       New User Welcome
       First-week tasks → unlock badge
       Progress: ██████░ 6/7
       3 days left
       
       [View tasks →]
```

**Campaign types:**
- Seasonal (Tết, Mid-Autumn, etc.)
- Growth campaigns (invite/onboard)
- Educational campaigns (course completion)
- Community campaigns (collective goals)

**Campaign UX:**
- Limited-time
- Progress visible
- Clear reward
- Bonus on completion

---

## §4 LIVE FEEDBACK LAYER

### §4.1 Animation rules

**Tap feedback:**
```
Action: User taps Energy Core
↓
1. Ripple from tap point (200ms)
2. "+2 U ⚡" text emerges (300ms)
3. Floats up (800ms)
4. Fades out (200ms)
5. Stats bar number increments smoothly (300ms)
6. Glow burst on Energy Core
7. Vibration haptic (instant, mobile only)
```

### §4.2 Animation principles

**MUST:**
- < 100ms response time
- Smooth, no janky frames
- Multiple taps overlap gracefully
- Number animation feels alive

**KHÔNG:**
- Loading spinner
- "Please wait" prompts
- Delay between tap and feedback
- Number "racing up" excessive
- Confetti / fireworks (too gamification)

### §4.3 Sound (optional, off by default)

If user enables sound:
- Tap: subtle click (50ms)
- Reward: gentle chime (150ms)
- Streak milestone: warmer tone (300ms)

KHÔNG dùng:
- Coin clink (crypto casino)
- Slot machine sounds
- Aggressive "WIN" voiceover

---

## §5 PROGRESS LAYER

### §5.1 Display

```
Progress
🔥 Day 5 streak
████████░░ 80%
Level 3 → Level 4 (200 U to go)
```

### §5.2 Streak system

**Rules:**
- Daily check-in to maintain streak
- Streak bonus: +1 U per day in streak (capped at 30 days)
- Miss a day: streak resets to 0 (no grace period in V3, may add in V4)
- Streak visible in pill (Foundation PHẦN 4) too

**Visual:**
- 🔥 fire icon
- Number of days
- Subtle glow effect when streak > 7 days

### §5.3 Level system

**Rules:**
- Level based on total U accumulated (lifetime)
- Level 1: 0-100 U
- Level 2: 101-500 U
- Level 3: 501-2,000 U
- Level 4: 2,001-10,000 U
- Level 5+: scaling thresholds

**Visual:**
- Progress bar to next level
- Level number visible
- Subtle level-up animation (when crossed)

**Level perks:**
- Higher level = unlocked features (e.g. tier benefits)
- KHÔNG public level display (privacy)
- KHÔNG bragging rights mechanism

### §5.4 Daily energy

**Rules:**
- 100% at midnight reset
- Each tap consumes ~1% energy
- Quiz / Task does NOT consume energy
- Energy refills instantly at midnight
- KHÔNG paid energy refill (avoid pay-to-win)

---

## §6 MODULE STRIP — TAB SWITCHER

### §6.1 4 modules tabs

```
[TAP] [QUIZ] [TASK] [CAMPAIGN]
```

**Switching rules:**
- Tap tab → switch instant (no page load)
- Active tab highlighted
- Previously active state preserved
- KHÔNG load page mới (single-page mini app)

### §6.2 Tab content

| Tab | Content |
|---|---|
| TAP | Energy Core (default) |
| QUIZ | Current quiz question + options |
| TASK | Today's task list + progress |
| CAMPAIGN | Active campaigns + progress |

### §6.3 Visual

- Tab bar dưới Energy Core area
- 4 buttons equal width
- Active: ENTA element color background
- Inactive: subtle outline

---

## §7 LOGIC CHỐNG GAME RÁC

### §7.1 Anti-spam mechanisms

**Tap limits:**
- Daily energy cap (~100-300 U/day from tap)
- Cooldown if rapid tapping detected (>5 taps/sec)
- Diminishing returns (1-3 U random, weighted toward 1)

**Quiz limits:**
- 5-10 quizzes/day
- 24h cooldown per question
- No re-answer same question

**Task verification:**
- Auto-detect when possible
- QOT trace for high-value tasks
- Anti-fake action detection

**Campaign integrity:**
- Identity-bound progress (can't farm via multi-account)
- Trusted Connect required for connection-based tasks
- Earn caps per campaign

### §7.2 Diminishing returns

**Tap:**
- First 50 taps: 2-3 U each
- Taps 51-100: 1-2 U each
- After 100: 1 U each
- Energy depletes faster as you tap more

**Lý do:** Encourage variety (use Quiz/Task/Campaign too) instead of tap-only farming.

### §7.3 Quality over quantity

**Reward weighting:**
- Tap: low (1-3 U)
- Quiz: medium (5-10 U)
- Task: high (5-50 U)
- Campaign: highest (50-200 U bonus)

User incentivized toward meaningful actions, not just tapping.

### §7.4 Anti-bot detection

**Patterns flagged:**
- Tap rate > 10/sec (likely bot)
- Identical timing patterns
- Cross-account identical behavior
- IP/device fingerprint anomalies

**Action:**
- Flag account for review
- Temporary tap disable
- Manual review by Lane (governance)

---

## §8 INTEGRATION VỚI UZG+ OS

### §8.1 U-Reward pill (Foundation PHẦN 4)

User outside U-Reward sees pill in top-right:
```
┌────────────────┐
│  ⚡ U: 1,250   │
└────────────────┘
```

**Behavior:**
- Pill visible across HOME / CHAT / WALLET / ENTA / PLUS
- Pill HIDDEN inside U-Reward mini app (you're already there)
- Earn U from outside actions → pill animates "+5"
- Tap pill → enter U-Reward mini app

### §8.2 Earn U from other modules

**HOME module:**
- Post value-bearing content (gets +U signal) → earn U
- Get reactions on post → earn U (capped per post)
- Connect with new user → earn U
- Daily check-in → earn U

**CHAT module:**
- Send value-bearing message (booking/deal/intro) → earn U
- AIER advisory leading to action → earn U
- Successful business transaction → earn U

**WALLET module:**
- Deposit Credit → small +U bonus (not main earning)
- Convert U → UZG (reduces U balance)
- Use UZG → no U change

**ENTA module:**
- Onboarding completion → earn U
- Phase update → earn U
- Suggested action followed → earn U

**TAO module:**
- Generate first chart → earn U
- Daily TAO check → earn U
- Premium reading → earn U

### §8.3 Spend U (use cases)

User can convert U:
- U → UZG (per Wallet canon)
- UZG → service (booking, retreat, premium features)
- U → membership tier upgrades (with Credit too)
- U → unlocks (advanced features)

KHÔNG:
- U → cash directly (must go U → UZG → Credit, gated by tier)

### §8.4 Cross-module flow

```
Action in HOME (post) 
   → +5 U earned 
   → Pill animates "+5"
   → Total U: 1,255

User taps pill
   → Enter U-Reward
   → See updated balance
   → Continue action loop
```

---

## §9 STATE LAW — 5 STATES

**§9.1 Loading** — Skeleton Energy Core, shimmer (rarely shown, mini app optimized)

**§9.2 Empty** — N/A (always có content)

**§9.3 Error** — Connection issue → "Reconnect" button, last sync timestamp

**§9.4 Active** — Default mini app

**§9.5 Disabled** — Energy depleted state:
```
⚡ Daily energy 0%
Resets in 4h 23m
[Try Quiz or Task instead]
```

---

## §10 OVERLAY LAYER

### §10.1 Quiz result modal

After answer submitted:

```
┌─────────────────────────────────────┐
│   Correct! ✓                        │
│                                     │
│   +5 U earned                       │
│                                     │
│   Explanation:                      │
│   "UZG+ is a Value Operating        │
│   System, not just a token..."      │
│                                     │
│   [Next Question →]                 │
└─────────────────────────────────────┘
```

### §10.2 Task completion confirmation

```
┌─────────────────────────────────────┐
│   Task Complete! ✓                  │
│                                     │
│   "Connect with 1 new person"       │
│   +8 U earned                       │
│                                     │
│   [Continue]                        │
└─────────────────────────────────────┘
```

### §10.3 Streak milestone celebration

When user hits streak milestone (7, 14, 30, 60, 100 days):

```
┌─────────────────────────────────────┐
│   🔥 7-day streak!                  │
│                                     │
│   You've shown commitment.          │
│   Bonus: +20 U                      │
│                                     │
│   Keep going for 14-day milestone   │
│                                     │
│   [Continue]                        │
└─────────────────────────────────────┘
```

KHÔNG over-celebrate (subtle, not confetti spam).

### §10.4 Trophy / achievements overlay

Tap 🏆 in top bar → personal achievements list:

```
┌─────────────────────────────────────┐
│ [✕]   Your Achievements             │
├─────────────────────────────────────┤
│                                     │
│ Earned (12)                         │
│  ─ First Tap (Day 1)                │
│  ─ Quiz Master (10 correct)         │
│  ─ Connector (5 connections)        │
│  ─ 7-day Streak                     │
│  ─ ...                              │
│                                     │
│ In Progress (3)                     │
│  ─ Marathon (30-day streak): 5/30   │
│  ─ Wise One (50 quizzes): 12/50     │
│  ─ Builder (Level 5): Lvl 3         │
│                                     │
└─────────────────────────────────────┘
```

KHÔNG global leaderboard. Personal only.

### §10.5 Settings overlay

Tap ⚙️ → settings:

```
- Sound effects: On/Off
- Haptic feedback: On/Off
- Daily reminder notification: On/Off
- Animation level: Full / Reduced / Off
- Privacy: Hide my stats from others
```

---

## §11 MOTION + ANIMATION

### §11.1 Allowed motion (energetic, alive)

- Energy Core pulse: 2s loop subtle
- Tap ripple: 200ms
- "+U" text float: 800ms
- Stats number tick: 300ms ease-out
- Glow burst on tap: 400ms
- Tab switch: instant
- Streak fire flicker: subtle 1s loop
- Level up: 600ms celebration (not confetti)

### §11.2 Forbidden motion

- ❌ Confetti everywhere (looks like crypto casino)
- ❌ Slot machine spin
- ❌ Coin shower animation
- ❌ Aggressive "WIN" popups
- ❌ Number "racing up" exaggerated
- ❌ Auto-tap suggestion animations
- ❌ "Hurry up" countdown timers (urgency-fear)

### §11.3 Performance

- 60fps target
- < 100ms tap response
- No frame drops on rapid tap
- Battery-efficient animations

---

## §12 REDLINES

### §12.1 CRITICAL

- ❌ KHÔNG landing page hoặc "coming soon" UI
- ❌ KHÔNG "please wait" prompts
- ❌ KHÔNG dead UI sections
- ❌ KHÔNG reward vô nghĩa (mỗi U gắn value)
- ❌ KHÔNG spam tap không cooldown
- ❌ KHÔNG crypto-style UI (pump/dump/coin shower)
- ❌ KHÔNG paid energy refill (pay-to-win)
- ❌ KHÔNG fake leaderboard global

### §12.2 HIGH

- ❌ KHÔNG UI tĩnh (must feel alive)
- ❌ KHÔNG delay reward feedback
- ❌ KHÔNG thiếu loop (action → reward → next)
- ❌ KHÔNG urgency-fear tactics
- ❌ KHÔNG dark patterns (forced ads, paywall)
- ❌ KHÔNG farm-friendly bot patterns

### §12.3 MEDIUM

- ❌ KHÔNG animation quá đà (excessive sparkle)
- ❌ KHÔNG sound aggressive
- ❌ KHÔNG over-gamification (too many badges)
- ❌ KHÔNG complex onboarding cho mini app

---

## §13 ACCESSIBILITY

### §13.1 Screen reader
- Energy Core ARIA: "Tap to earn U energy"
- Stats bar values readable
- Quiz options accessible
- Tasks list properly labeled

### §13.2 Keyboard navigation (desktop fallback)
- Spacebar: tap Energy Core
- Tab: navigate modules
- Enter: select option
- Esc: exit mini app

### §13.3 Reduced motion
- Pulse disabled
- Tap response: instant feedback (no ripple animation)
- Number changes instant
- Glow effects minimal

### §13.4 Color contrast
- ENTA element backgrounds vs U number: WCAG AA
- Energy bar visible color-blind alternate

---

## §14 INTEGRATION VỚI MODULE KHÁC

**§14.1 U-Reward → HOME** — Daily check-in card surfaces in HOME stream. Connect-related tasks redirect to HOME suggested resonance.

**§14.2 U-Reward → CHAT** — "Send 1 message" task tracked. AIER quizzes can be done via CHAT (advanced).

**§14.3 U-Reward → WALLET** — U balance synced. Convert U → UZG action available from Wallet.

**§14.4 U-Reward → ENTA** — Element-aware quiz questions. Earn U for ENTA balance suggestions followed.

**§14.5 U-Reward → PLUS** — U-Reward icon in PLUS Hub. Cross-mini-app tasks (e.g. "Visit TAO once").

**§14.6 U-Reward → TAO** — TAO daily lookup task earns U. TAO premium subscription tracked for tier rewards.

**§14.7 U-Reward → AIER** — AIER governed quizzes for educational tasks. Higher U reward for AIER-validated content.

---

## §15 V2 → V3 MIGRATION PATH

### §15.1 V2 current state (per Cursor audit + 13 file canon cũ)

- `/u-reward`, `/u-earnings`, `/u-system`, `/u-convert`, `/u-convert-history` exist
- Quiz module currently broken ("Please wait" dead UI per file canon)
- Tap module not implemented
- No streak system
- No Telegram-style mini app pattern
- Disconnected from main shell (separate page surfaces)
- Existing components: `URewardPage`, `UEarningsPage`, `UConvertPage`, etc.

### §15.2 V3 implementation order

1. **Build U-Reward mini app shell** (full-screen takeover pattern from PLUS Hub)
2. **Build top stats bar** (U balance + Energy + Streak)
3. **Build Energy Core component** (animated, tappable)
4. **Build Tap module** với cooldown + diminishing returns
5. **Build Quiz module** (REPLACE current dead UI)
6. **Build Task module** với daily refresh
7. **Build Campaign module** với time-limited campaigns
8. **Build Module Strip** (4-tab switcher, instant)
9. **Build Live Feedback** (ripple + +U text + stats tick)
10. **Build Progress Layer** (streak + level)
11. **Build Trophy / Achievements** (personal only)
12. **Integrate U-Reward pill** (Foundation PHẦN 4) cross-module
13. **Implement anti-bot detection**
14. **Migrate `/u-earnings` → `/wallet/earnings`** (per Wallet canon)
15. **Migrate `/u-convert` → Wallet Exchange Panel** (per Wallet canon)
16. **Deprecate standalone U pages** (consolidate into U-Reward mini app + Wallet)

### §15.3 V3 Phase 2 mockup priorities

| Priority | Mockup |
|---|---|
| 1 | U-Reward mini app full-screen với Energy Core + stats |
| 2 | Tap interaction (ripple + +U animation) |
| 3 | Quiz module (correct + wrong states) |
| 4 | Task module (today's list + completed) |
| 5 | Campaign module |
| 6 | Streak milestone celebration overlay |
| 7 | Energy depleted state |
| 8 | Trophy / Achievements list (personal) |
| 9 | Cross-module +U pill animation |
| 10 | Settings overlay |

---

## §16 SUCCESS METRICS

U-Reward thành công nếu:

**Behavioral signals (good):**
- Daily active rate high (returning daily for streak)
- Module variety (Tap + Quiz + Task balanced, không tap-only)
- U → UZG conversion regular (cycle works)
- Connection-based tasks completed (= social cohesion)
- Quiz scores improve over time (= learning)

**Anti-signals (failure):**
- Tap rate 100% (= farming, not engagement)
- Quiz module ignored (= broken or boring)
- Task completion drop (= tasks too hard or irrelevant)
- Streak gaming (= pure habit without value)
- Multi-account farming detected (= bot patterns)
- User burnout: stop using after Level 4 (= reward curve broken)

---

## §17 KẾT LUẬN — 5 CÂU KHÓA

**1. U-Reward = Mini App full-screen Telegram pattern (Notcoin/Hamster style nhưng KHÔNG farming vô nghĩa).**

**2. 1 màn hình, 4 modules: TAP / QUIZ / TASK / CAMPAIGN — switch instant.**

**3. Action → Reward → Loop là lõi (3-10s loop) — instant feedback, no delay.**

**4. U gắn value thật (cooldown / diminishing return / quality > quantity).**

**5. Integrated với toàn OS — pill Foundation PHẦN 4 visible cross-module, earn U from any action.**

---

## §18 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ Foundation OS + PLUS Hub Canon + 2 file canon U-Reward cũ + Master Economy Canon |

---

🔒 UZG+ V3 PWA OS — U-Reward Module Canon v1.0
End of file.
