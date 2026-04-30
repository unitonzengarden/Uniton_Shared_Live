# UZG+ V3 PWA OS — U-REWARD UX FLOW SPEC

**Document ID:** `UZG_PLUS_V3_UX_UREWARD_FLOW_SPEC_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (UX layer — implements U-Reward UI canon)
**Module:** U-Reward (Mini App, accessible via PLUS Hub + U-Reward pill)
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_UREWARD_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_PLUS_HUB_CANON_v1` (parent hub)
- Tier 3: `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1`

**Source evidence:** Cursor V2 audit (broken Quiz UI), Master Economy Canon

---

## §0 PURPOSE

UX layer cho U-Reward mini app — Connect-to-Earn engine. State machines cho Tap loop / Quiz / Task / Campaign + cross-module earn integration + anti-spam mechanisms.

U-Reward UX khác mọi mini app khác: phải feel ALIVE (action → reward → loop 3-10s) NHƯNG có guardrails (cooldown / diminishing returns / anti-bot).

---

## §1 USER JOURNEY MAP — U-REWARD LIFECYCLE

### §1.1 Master journey

```
[USER taps U-Reward pill (Foundation §3.4) OR U-Reward icon in PLUS Hub]
        ↓
[Mini app full-screen takeover (slide up 320ms)]
        ↓
[4 phần cố định behavior changes]:
   ├─ Bottom Nav: HIDDEN
   ├─ Top Bar: REPLACED
   ├─ Floating +: HIDDEN
   └─ U-Reward pill: HIDDEN (you're inside)
        ↓
[U-Reward UI active — single screen]
        ↓
[User actions]:
   ├─→ Tap Energy Core (default Tap module)
   ├─→ Switch tab (TAP / QUIZ / TASK / CAMPAIGN)
   ├─→ View progress (streak / level)
   ├─→ Tap 🏆 → Achievements
   ├─→ Tap ⚙️ → Settings
   └─→ Tap close (✕) → exit
```

### §1.2 U-Reward Journey segments — 7 chính

| # | Segment | Goal |
|---|---|---|
| **UJ1** | Mini app entry | Open + see balance |
| **UJ2** | Tap loop | Earn U via tap |
| **UJ3** | Quiz answer | Educational earning |
| **UJ4** | Task completion | Action-driven earning |
| **UJ5** | Campaign progress | Time-limited bonuses |
| **UJ6** | Cross-module earn | Earn from outside U-Reward |
| **UJ7** | Exit + return | Close + return to context |

---

## §2 ENTRY FLOW (UJ1)

### §2.1 Entry sources

```
[Source 1: U-Reward pill (Foundation §3.4)]
   ├─ Most common entry
   └─ Quick tap from any module
   
[Source 2: PLUS Hub icon]
   └─ Explicit entry from app launcher
   
[Source 3: HOME daily check-in card]
   └─ Daily reminder tap
   
[Source 4: Cross-module reward notification]
   └─ "+5 U earned" toast → tap → see full
```

### §2.2 Mini app mount sequence

```
[Entry triggered]
      ↓
[Mini app slide-up 320ms]
      ↓
[Top stats bar loads instantly (cached)]
   ├─ U: <balance>
   ├─ Daily Energy: <X%>
   └─ Streak: <Y days>
      ↓
[Energy Core renders (default Tap mode)]
      ↓
[Module strip: TAP / QUIZ / TASK / CAMPAIGN]
      ↓
[Today's stats footer]
      ↓
[All visible < 500ms]
```

### §2.3 First-time user state

```
[New user opens U-Reward first time]
      ↓
[Onboarding overlay (1-2 screens)]:
   ├─ "Welcome to U-Reward"
   ├─ "Earn U from contribution + connection"
   ├─ Brief explanation of 4 modules
   └─ "Try your first tap"
      ↓
[Energy Core highlighted với pulse animation]
      ↓
[User taps → first U earned → "+1 U" feedback]
      ↓
[Onboarding complete — regular UX]
```

---

## §3 TAP LOOP FLOW (UJ2)

### §3.1 Tap state machine

```
[IDLE_FULL_ENERGY] → [TAPPING]
                          ↓
                     [REWARDING] (animation)
                          ↓
                     [ENERGY_DECREMENTED]
                          ↓
                     [IDLE_PARTIAL_ENERGY] (>0%)
                     OR
                     [IDLE_DEPLETED] (0%)
                          ↓
                     [DEPLETED] → wait reset
                          ↓ midnight reset
                     [IDLE_FULL_ENERGY]
```

### §3.2 Single tap sequence (3-step animation)

```
[User taps Energy Core]
      ↓ <50ms response
[Step 1: Visual feedback]
   ├─ Ripple from tap point (200ms)
   ├─ Vibration haptic (instant, mobile)
   └─ Glow burst on Energy Core (300ms)
      ↓
[Step 2: Reward calculation]
   ├─ Random 1-3 U (with diminishing returns curve)
   ├─ "+X U" floating text emerges (300ms)
   ├─ Floats up + fades (800ms)
   └─ Stats bar number ticks smoothly (300ms)
      ↓
[Step 3: Energy decrement]
   ├─ Daily energy -1%
   ├─ Energy bar updates
   └─ Cooldown check
      ↓
[Total cycle: ~600ms — feels instant]
[User can tap again immediately]
```

### §3.3 Diminishing returns curve

| Tap range | U per tap | Energy cost |
|---|---|---|
| Tap 1-50 (per day) | 2-3 U random | 1% each |
| Tap 51-100 | 1-2 U random | 1% each |
| Tap 101+ | 1 U | 1% each |
| Tap when energy 0% | Disabled | — |

Total daily max from tap: ~100-300 U (per Master Economy Canon).

### §3.4 Energy depleted state

```
[Daily Energy reaches 0%]
      ↓
[Energy Core dimmed]
      ↓
[Banner: "⚡ Daily energy 0%"]
      ↓
[Reset countdown: "Resets in 4h 23m"]
      ↓
[CTA: "Try Quiz or Task instead"]
      ↓
[Tab switcher highlight QUIZ + TASK]
```

### §3.5 Anti-spam detection

```
[Rapid tapping detected (>5 taps/sec)]
      ↓
[Cooldown enforced]:
   ├─ Brief tap disable (200ms)
   ├─ Subtle warning: "Slow down for full reward"
   └─ Tap rate normalized

[Pattern: identical timing 100+ taps]
      ↓
[Bot suspicion flag]
[Account flagged for review]
[Tap disabled temporarily]
[User notified: "Activity flagged"]
```

### §3.6 Tap visual variations

User's ENTA element shapes Energy Core:
- Hỏa dominant: warm red glow
- Mộc: green glow
- Thủy: blue glow
- Kim: silver glow
- Thổ: earthen yellow glow

Reward icon (⚡) consistent.

---

## §4 QUIZ FLOW (UJ3)

### §4.1 Quiz state machine

```
[IDLE] → [QUESTION_LOADED]
              ↓
         [USER_SELECTING_OPTION]
              ↓
         [ANSWER_SUBMITTED]
              ↓
         [VALIDATING]
              ↓
         [CORRECT] OR [WRONG]
              ↓
         [REWARD_GRANTED] (if correct)
              ↓
         [NEXT_QUESTION] OR [DAILY_LIMIT_REACHED]
              ↓
         [IDLE] / [DEPLETED]
```

### §4.2 Quiz session lifecycle

```
[User switches to QUIZ tab]
      ↓
[Daily quiz quota check]:
   ├─ < 5 done today → load question
   └─ ≥ 5 done → "Daily quiz limit reached" + reset countdown
      ↓
[Question rendered]:
   ├─ Q text (Vietnamese)
   ├─ 4 options (A/B/C/D)
   ├─ Submit button (disabled until selection)
      ↓
[User selects option]
      ↓
[Submit button enabled]
      ↓
[Tap Submit]
      ↓
[Validation 200ms]
      ↓
[Result modal slide-up]:
   ├─ CORRECT path:
   │     ├─ "Correct! ✓"
   │     ├─ "+5-10 U earned" (variable per question difficulty)
   │     ├─ Explanation
   │     └─ [Next Question →] OR [Continue]
   │
   └─ WRONG path:
         ├─ "Not quite"
         ├─ Hint shown
         ├─ [Try again] (1 retry, no penalty)
         └─ After retry: explanation revealed
      ↓
[Quiz complete → next question OR back to TAP module]
```

### §4.3 Quiz cooldown

```
[Same question answered]
      ↓
[24h cooldown per question]
      ↓
[After 24h → can answer again (rare, mostly fresh questions)]
```

### §4.4 Quiz pool diversity

System rotates question types:
- UZG+ basics (onboarding)
- ENTA-related (test understanding)
- TAO/Bazi wisdom
- Community knowledge
- Cross-module concepts

---

## §5 TASK FLOW (UJ4)

### §5.1 Task state machine

```
[IDLE] → [TASKS_LOADED]
              ↓
         [USER_VIEWING_TASKS]
              ↓
         [TASK_INITIATED] (user starts an action)
              ↓
         [TASK_VERIFYING] (system detects completion)
              ↓
         [TASK_COMPLETE] OR [TASK_PENDING]
              ↓
         [REWARD_GRANTED]
              ↓
         [IDLE] (next task)
```

### §5.2 Task display flow

```
[User switches to TASK tab]
      ↓
[Today's tasks rendered]:
   ├─ ✓ Completed (top, fade)
   ├─ ○ Available (with reward U amount)
   ├─ ⏳ Pending (initiated, not verified)
   └─ "Daily refresh in <countdown>" footer
```

### §5.3 Task initiation flow

```
[User taps task]
      ↓
[Task description expanded]:
   ├─ What to do (clear instruction)
   ├─ Reward amount
   └─ "Start task" button
      ↓
[Tap "Start task"]
      ↓ Most tasks → cross-module action:
[Cross-module exit to relevant surface]:
   ├─ "Connect with new person" → ENTA/HOME
   ├─ "Comment on 3 posts" → HOME
   ├─ "Visit TAO mini app" → TAO
   └─ etc.
      ↓
[User performs action]
      ↓
[System auto-detects completion via QOT trace]
      ↓
[Notification: "+X U earned for <task>"]
      ↓
[User can return to U-Reward to verify]
```

### §5.4 Task verification

**Auto-verification (preferred):**
- System detects via API/QOT
- Most tasks (connect, comment, visit, react)
- Updates within 30s of action

**Manual verification (fallback):**
- Some tasks need claim button
- "I completed this" → user attests
- Backend validates via metadata

### §5.5 Task daily refresh

```
[Midnight reset]
      ↓
[New task list generated based on user's]:
   ├─ Tier (Free / Member / Premium)
   ├─ Activity history
   ├─ ENTA fit
   └─ Engagement patterns
      ↓
[~5 tasks daily]
[Mix: Social / Educational / Cross-module]
      ↓
[Rare weekly tasks (higher reward)]
```

---

## §6 CAMPAIGN FLOW (UJ5)

### §6.1 Campaign state machine

```
[NO_ACTIVE_CAMPAIGN] → [CAMPAIGN_AVAILABLE]
                            ↓
                       [USER_VIEWING]
                            ↓
                       [USER_PARTICIPATING]
                            ↓
                       [PROGRESS_TRACKED]
                            ↓
                       [CAMPAIGN_COMPLETE] OR [TIME_EXPIRED]
                            ↓
                       [BONUS_GRANTED] (if complete)
                            ↓
                       [IDLE]
```

### §6.2 Campaign display

```
[User switches to CAMPAIGN tab]
      ↓
[Active campaigns listed]:
   ├─ Each campaign card:
   │     ├─ Campaign name
   │     ├─ Description
   │     ├─ Progress bar (e.g. 3/5 tasks)
   │     ├─ Bonus reward
   │     └─ Time remaining
   └─ [View tasks →] expand
      ↓
[Tap campaign → expand task list]
      ↓
[Each task in campaign with status]
      ↓
[Tap task → task initiation flow]
```

### §6.3 Campaign completion

```
[All campaign tasks done]
      ↓
[Campaign complete celebration (subtle, not confetti)]
      ↓
[Bonus reward granted (50-200 U typical)]
      ↓
[Achievement unlocked (if applicable)]
      ↓
[Campaign archived to history]
```

### §6.4 Campaign types

- **Seasonal** (Tết, Mid-Autumn, etc.)
- **Growth** (invite/onboard)
- **Educational** (course completion)
- **Community** (collective goals)

### §6.5 Time expiration

```
[Campaign deadline approaches]
      ↓
[Notification: "X campaign ends in 2 days"]
[KHÔNG urgency-fear ("HURRY!")]
      ↓
[Deadline passes]
      ↓
[Campaign closed]
[Partial completion: pro-rated reward (if applicable)]
[No completion: campaign archived, no reward]
```

---

## §7 CROSS-MODULE EARN FLOW (UJ6)

### §7.1 Earn outside U-Reward

User actions in other modules trigger U earnings:

**HOME module:**
| Action | U Reward |
|---|---|
| Post value-bearing content (gets +U signal) | +5-15 |
| Receive reaction on post | +1 (capped 10/post) |
| Connect with new user | +5-10 |
| Daily check-in (visit HOME) | +2 |

**CHAT module:**
| Action | U Reward |
|---|---|
| Send value-bearing message (booking/intro) | +5 |
| AIER advisory leading to action | +10 |
| Successful business transaction | +20 |

**WALLET module:**
| Action | U Reward |
|---|---|
| Add funds (small bonus) | +5 (capped weekly) |
| Convert U → UZG | 0 (just transaction) |

**ENTA module:**
| Action | U Reward |
|---|---|
| Onboarding completion | +50 |
| Suggested action followed | +5 |

**TAO module:**
| Action | U Reward |
|---|---|
| First chart created | +10 |
| Daily TAO check | +3 |
| Premium reading consumed | +15 |
| AIER Tao session | +5 |

### §7.2 Cross-module earn UX

```
[User performs earn action in HOME (e.g. connect)]
      ↓
[Backend processes action]
      ↓
[U Reward granted]
      ↓
[U-Reward pill animates]:
   ├─ Number ticks up smoothly
   ├─ "+5" floating text bubble briefly (1s)
   └─ Glow burst
      ↓
[Toast notification (optional, brief)]:
   ├─ "+5 U for new connection"
   └─ Dismisses 3s
      ↓
[User continues HOME activity]
[U balance synced across modules]
```

### §7.3 Earn aggregation

```
[Multiple actions in short time]
      ↓
[Aggregate display]:
   ├─ Pill ticks for each separately (not lumped)
   ├─ Toasts may stack OR aggregate ("+15 U from 3 actions")
   └─ Detail visible in U-Reward → Today's stats
```

---

## §8 EXIT FLOW (UJ7)

### §8.1 Mini app exit paths

```
[User in U-Reward]
      ↓ Multiple exit paths:
   ├─ Tap close (✕) → return to PLUS Hub OR previous module
   ├─ Tap UZG+ logo center → PLUS Hub or HOME (per Foundation)
   └─ Browser back → previous shell
      ↓
[Mini app slide-down 280ms]
      ↓
[4 phần cố định restored]:
   ├─ Bottom Nav: VISIBLE
   ├─ Top Bar: ORIGINAL module
   ├─ Floating +: VISIBLE (context-aware)
   └─ U-Reward pill: VISIBLE (with updated balance)
      ↓
[Original shell active]
```

### §8.2 Re-entry preservation

```
[User exits U-Reward at TASK tab]
      ↓
[State snapshot saved]
      ↓ Later
[User re-enters U-Reward]
      ↓
[Restored to TASK tab]
[Most recent context preserved]
```

---

## §9 STREAK + LEVEL FLOWS

### §9.1 Streak management

```
[User opens U-Reward daily]
      ↓
[Daily check-in detected]
      ↓
[Streak day +1]
      ↓
[Visual feedback]:
   ├─ 🔥 fire icon updates
   ├─ Subtle glow if streak > 7
   └─ Streak number animates
      
[User misses a day]
      ↓
[Streak resets to 0]
[Banner: "Streak reset"]
[KHÔNG aggressive guilt-trip]
```

### §9.2 Streak milestone celebrations

| Day | Bonus | Celebration |
|---|---|---|
| 7 | +20 U | Subtle modal |
| 14 | +50 U | Modal + achievement |
| 30 | +100 U | Modal + badge |
| 60 | +200 U | Modal + special badge |
| 100 | +500 U + special perk | Modal + permanent badge |

KHÔNG confetti spam, KHÔNG fireworks.

### §9.3 Level progression

```
[User accumulates U lifetime]
      ↓
[Level threshold crossed]:
   ├─ L1: 0-100 U
   ├─ L2: 101-500 U
   ├─ L3: 501-2000 U
   ├─ L4: 2001-10000 U
   └─ L5+: scaling thresholds
      ↓
[Level up celebration (subtle, 600ms)]
[Banner: "Level X reached"]
[Perks unlocked (if applicable)]
```

---

## §10 ACHIEVEMENTS FLOW

### §10.1 Trophy overlay

```
[User taps 🏆 in Top Bar]
      ↓
[Achievements overlay full-screen]
      ↓
[2 sections]:
   ├─ Earned (12 achievements with dates)
   └─ In Progress (3 active with progress bars)
      ↓
[Tap achievement → details]
      ↓
[Close → return to U-Reward]
```

### §10.2 Achievement examples

- First Tap (Day 1)
- Quiz Master (10 correct in row)
- Connector (5 connections)
- Marathon (30-day streak)
- Wise One (50 quizzes total)
- Builder (Level 5)
- Chart Maker (TAO chart created)

KHÔNG global leaderboard. Personal only.

### §10.3 Achievement unlock UX

```
[User completes condition]
      ↓
[Achievement unlocked]
      ↓
[Subtle modal slide-up]:
   ├─ Achievement icon
   ├─ Achievement name
   └─ "+X U bonus"
      ↓
[Auto-dismiss 4s OR tap to dismiss]
[Added to Trophy collection]
```

---

## §11 SCREEN STATES MATRIX

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| Top stats bar | Skeleton | N/A | "Sync failed" | Live numbers | N/A |
| Energy Core | N/A | N/A | N/A | Pulsing animated | DEPLETED (dimmed) |
| TAP module | N/A | N/A | N/A | Tap loop active | DEPLETED state |
| QUIZ module | Loading question | Daily limit reached | "Quiz unavailable" | Question + options | Submit disabled (no selection) |
| TASK module | Loading tasks | "No tasks today" | "Failed to load" | Tasks listed | Task pending verification |
| CAMPAIGN module | Loading | "No active campaigns" | Failed | Campaigns listed | Campaign expired (archived) |
| Trophy overlay | Skeleton | "No achievements yet" | Failed | Full list | N/A |
| Streak milestone | N/A | N/A | N/A | Celebration modal | N/A |
| Quiz result modal | N/A | N/A | N/A | Correct/Wrong | N/A |
| Settings overlay | N/A | N/A | N/A | Toggles | N/A |

---

## §12 EDGE CASES + ERROR HANDLING

### §12.1 Network drop during tap

```
[User taps]
      ↓
[Network drops mid-tap]
      ↓
[Optimistic UI: +U shown locally]
      ↓
[Action queued]
      ↓ Reconnect
[Sync with server]
   ├─ Match → confirmed
   └─ Mismatch → rollback (rare)
```

### §12.2 Quiz answer submission fail

```
[User submits answer]
      ↓
[Network fails]
      ↓
[Banner: "Could not submit. Retry?"]
[User can retry or skip question]
[No penalty for failed submission]
```

### §12.3 Task auto-verification delay

```
[Task initiated, user performs action]
      ↓
[Backend takes >30s to detect]
      ↓
[Task status: "Pending"]
      ↓
[User can manually claim]:
   ├─ "I did this" button
   └─ Backend validates via metadata
      ↓
[Reward granted on validation]
```

### §12.4 Campaign progress sync issue

```
[User completes campaign tasks]
      ↓
[Progress shows 4/5 but should be 5/5]
      ↓
[Manual refresh available]
      ↓
[If still mismatched → support]
```

### §12.5 Bot detection false positive

```
[User flagged for "rapid tapping"]
[But user is genuinely fast]
      ↓
[Brief cooldown applied]
[Banner: "Activity rate normalized"]
[KHÔNG ban — just throttle]
[User can resume after 30s]
```

---

## §13 PERMISSION + GATING

### §13.1 Tier gating

| Feature | Free | Member | Premium |
|---|---|---|---|
| Tap module | ✓ | ✓ | ✓ |
| Quiz daily | 5 | 10 | Unlimited |
| Tasks daily | 5 | 10 | 15 |
| Campaigns | All | All | Premium-only campaigns |
| Trophy | ✓ | ✓ | ✓ |
| Settings | ✓ | ✓ | ✓ |

### §13.2 Anti-abuse gating

- Multi-account farming detection
- IP/device fingerprint check
- Activity pattern analysis
- Identity-bound progress
- Trusted Connect required for connection-based tasks

---

## §14 PERFORMANCE TARGETS

| Action | Target | Max |
|---|---|---|
| Mini app launch | < 500ms | 1s |
| Tap response | < 100ms | 200ms |
| Tap animation | 600ms cycle | — |
| Quiz load | < 600ms | 1.5s |
| Quiz submit | < 800ms | 2s |
| Task load | < 800ms | 1.5s |
| Task verification (auto) | < 30s | 60s |
| Cross-module earn → pill update | < 2s | 5s |
| Streak update | Instant | — |
| Frame rate (Tap) | 60fps consistent | — |

---

## §15 CROSS-MODULE EXITS

| From U-Reward | To module | Trigger |
|---|---|---|
| Task: "Connect with X" | HOME / ENTA | Task initiation |
| Task: "Comment on posts" | HOME | Task initiation |
| Task: "Visit TAO" | TAO mini app | Task initiation |
| Campaign task | Various modules | Per campaign |
| Close (✕) | PLUS Hub or previous module | Exit |
| UZG+ logo center | PLUS Hub or HOME | Exit |

---

## §16 DECISION POINTS

### §16.1 Tap reward random range

Decision: How much U per tap?
- Random within range: 1-3 U
- Curve based on diminishing returns
- Energy cost: 1% per tap
- Capped daily: ~100-300 U

### §16.2 Quiz difficulty matching

Decision: Which question to serve?
- Match user's tier + experience
- Mix difficulties (avoid all easy/all hard)
- Avoid recently answered

### §16.3 Task assignment

Decision: Which tasks today?
- Algorithm: tier + ENTA + history + engagement patterns
- Mix: 60% social + 30% educational + 10% cross-module
- Rare: weekly bonus task

### §16.4 Campaign timing

Decision: When show campaign banner?
- New campaign → push notification (opt-in) day 1
- Active campaign banner in TAB strip (subtle)
- Ending soon (< 2 days) → notification (no urgency-fear)

---

## §17 ANALYTICS EVENTS

| Event | Purpose |
|---|---|
| `ureward.app.opened` | Engagement |
| `ureward.tap.performed` | Tap rate |
| `ureward.quiz.answered` | Quiz engagement |
| `ureward.quiz.correct` | Learning |
| `ureward.task.completed` | Task success |
| `ureward.campaign.completed` | Campaign engagement |
| `ureward.streak.milestone` | Retention |
| `ureward.cross_module.earned` | Cross-module integration health |

KHÔNG track:
- ❌ Per-tap dwell time
- ❌ Mini app "addiction" patterns
- ❌ Excessive granular monitoring

---

## §18 ACCESSIBILITY

### §18.1 Screen reader

- Energy Core: "Tap to earn U energy. Daily energy <X>%."
- Stats bar: balance + energy + streak announced
- Quiz options: properly labeled
- Task descriptions: clear ARIA

### §18.2 Keyboard navigation

| Key | Action |
|---|---|
| Spacebar | Tap Energy Core |
| Tab | Navigate modules / options |
| Enter | Select option / submit |
| Esc | Exit mini app |

### §18.3 Reduced motion

- Pulse disabled
- Tap response: instant (no ripple)
- Number changes instant
- Glow effects minimal

### §18.4 Sound (optional, off by default)

- Tap: subtle click (50ms)
- Reward: gentle chime (150ms)
- Streak milestone: warmer tone (300ms)

KHÔNG aggressive sounds.

---

## §19 V2 → V3 UX MIGRATION

### §19.1 V2 issues (per Cursor audit + 13 file canon cũ)

| Issue | Fix |
|---|---|
| Quiz module broken ("Please wait" dead UI) | Build live Quiz module per §4 |
| Tap module not implemented | Build per §3 |
| No streak system | Build per §9 |
| No Telegram-style mini app pattern | Mini app full-screen takeover (PLUS Hub canon) |
| Disconnected from main shell | U-Reward pill (Foundation §3.4) cross-module |
| `/u-earnings`, `/u-system`, `/u-convert` siblings | Consolidate: earnings → Wallet, convert → Wallet Exchange Panel |

### §19.2 V3 implementation order

Sprint 1 (core):
1. U-Reward mini app shell
2. Top stats bar (balance + energy + streak)
3. Energy Core tap loop
4. State machines: Tap / Energy depletion

Sprint 2 (modules):
5. Quiz module (REPLACE broken UI)
6. Task module với daily refresh
7. Campaign module
8. Module strip (4-tab switcher instant)

Sprint 3 (depth):
9. Streak + Level progress
10. Trophy / Achievements (personal only)
11. Cross-module earn integration
12. U-Reward pill animation cross-module

Sprint 4 (edge):
13. Anti-spam detection
14. Energy depleted state polish
15. Settings overlay
16. Migration: deprecate `/u-earnings`, `/u-convert` standalone

---

## §20 SUCCESS METRICS

### §20.1 Good signals

- Daily active rate (returning daily for streak)
- Module variety (Tap + Quiz + Task balanced, không tap-only)
- Connection-based tasks completed (= social cohesion)
- Quiz scores improve (= learning)
- U → UZG conversion regular (cycle works)
- Cross-module earn natural integration

### §20.2 Failure signals

- Tap rate 100% of activity (= farming, not engagement)
- Quiz module ignored (= broken or boring)
- Task completion drop (= tasks too hard or irrelevant)
- Streak gaming pure habit (= no value)
- Multi-account farming detected (= bot patterns)
- User burnout post Level 4 (= reward curve broken)

---

## §21 KẾT LUẬN — 5 CÂU KHÓA

**1. U-Reward UX = Telegram mini app pattern (Notcoin/Hamster style với guardrails). Single-screen alive.**

**2. Tap loop: action → reward → loop trong 600ms. Energy Core hero. Diminishing returns + cooldown.**

**3. 4 modules instant-switch: TAP / QUIZ / TASK / CAMPAIGN. KHÔNG page navigation, single-screen state.**

**4. Cross-module earn: pill (Foundation §3.4) animate khi earn từ HOME/CHAT/etc. Visible across modules (trừ U-Reward itself).**

**5. Anti-spam: cooldown / diminishing returns / bot detection. Quality > quantity philosophy.**

---

## §22 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ U-Reward UI canon + Foundation OS + Master Economy + Cursor V2 audit |

---

🔒 UZG+ V3 PWA OS — U-Reward UX Flow Spec v1.0
End of file.
