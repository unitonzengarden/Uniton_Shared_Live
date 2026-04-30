# UZG+ V3 PWA OS — HOME UX FLOW SPEC

**Document ID:** `UZG_PLUS_V3_UX_HOME_FLOW_SPEC_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (UX layer — implements HOME UI canon)
**Module:** HOME (Bottom Nav position #1)
**Type:** UX Flow Spec — User journey + Screen states + Logic transitions
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` (4 phần cố định)
- Tier 4: `UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1` (UI canon — what)
- Tier 3: `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1`
- Tier 2: TRUTH_TRUST_CANON (QOT mandatory), IDENTITY_CANON (ENTA precedes capability)

**Source evidence:**
- Cursor V2 audit: `UZG_PLUS_V2_USER_FLOW_AUDIT_v1.md` (12 flows documented)
- Cursor V2 audit: `UZG_PLUS_V2_UX_GAP_ANALYSIS_v1.md` (53 gaps — G18 unmounted FlowFeed, G01 public ENTA gate)
- Whitepaper §4.2 modules + §6 public surfaces

**Companion UX specs:** CHAT, WALLET, ENTA+PLUS+TAO, U-Reward (Batch 1)
**Companion language spec:** `UZG_PLUS_V3_LANGUAGE_OS_MAPPING_v1` (Batch 2)

---

## §0 PURPOSE

File này khóa **UX layer cho HOME module** — cụ thể:

1. **User Journeys** — flow đầu cuối user đi qua HOME (entry → action → exit)
2. **Screen state machines** — mỗi surface có state nào, transition ra sao
3. **Decision points** — nơi user/system phải chọn branch
4. **Cross-module exits** — khi HOME hand-off sang module khác
5. **Edge cases** — error / empty / locked / partial state handling

UI canon (HOME_SOCIAL_CANON) trả lời "**màn hình trông gì**". UX flow (file này) trả lời "**user đi như thế nào**".

---

## §1 USER JOURNEY MAP — HOME LIFECYCLE

### §1.1 Master journey (happy path)

```
[USER OPEN uzg.plus]
        ↓
   [Auth check]
   ┌────┴────┐
   │         │
 [Logged    [Not logged
  in]        in]
   │         │
   │         └─→ [Login flow] ─→ [Onboarding gate] ─→ ...
   │
   ↓
[Onboarding gate]
   ┌────┴────┐
   │         │
 [ENTA      [ENTA not
  done]      done]
   │         │
   │         └─→ [ENTA Onboarding 5-step] ─→ ...
   │
   ↓
[HOME shell mount]
   ↓
[Value Stream feed loads]
   ↓
[User actions:]
   ├─→ Browse feed (scroll / read)
   ├─→ React to post (Ngũ Hành)
   ├─→ Quote/Reply post
   ├─→ Tap user avatar → ENTA shell (cross-module)
   ├─→ Tap QOT icon → provenance sheet
   ├─→ Tap Suggested Resonance → connect flow
   ├─→ Tap Floating + → Compose flow
   ├─→ Tap Top Bar Search → Search overlay
   ├─→ Tap Top Bar Notification → Notification overlay
   ├─→ Tap Avatar → Avatar Menu drawer
   ├─→ Tap +U pill → cross-module to Wallet/U-Reward
   ├─→ Tap UZG+ logo center → PLUS Hub or quick HOME (per Foundation §6.5)
   └─→ Tap CHAT/WALLET/ENTA bottom nav → cross-module
```

### §1.2 Journey segments — 7 chính

| # | Segment | Goal | Key surfaces |
|---|---|---|---|
| **J1** | First Entry | User lần đầu vào uzg.plus | Auth → Onboarding → HOME |
| **J2** | Returning Entry | User đã onboard quay lại | Auth → HOME |
| **J3** | Browse Feed | Đọc Value Stream | Feed scroll |
| **J4** | React/Engage | Tương tác với post | Post tap → React/Quote/Connect |
| **J5** | Compose | Tạo bài viết mới | Floating + → Compose overlay → Submit |
| **J6** | Discover | Tìm người/chủ đề mới | Search / Suggested Resonance |
| **J7** | Cross-module | Hand-off sang module khác | HOME → CHAT/WALLET/ENTA/PLUS/Mini app |

---

## §2 ENTRY FLOWS — J1 + J2

### §2.1 J1 — First Entry (new user)

**Goal:** Bring user from `uzg.plus` URL → HOME usable state.

```
[Open uzg.plus]
      ↓
[Splash 1s] (UZG+ logo)
      ↓
[Auth check API]
      ↓ NOT logged in
[Login screen]
      ├─ Email/password
      ├─ OAuth (Google/Apple)
      └─ Magic link
      ↓ Submit
[Auth success]
      ↓
[Profile check]
      ↓ Profile incomplete OR no birth data
[ENTA Onboarding wizard] (per ENTA canon §9, 5-step)
      ↓ All steps complete
[ENTA onboarding success]
      ↓
[HOME shell mount]
      ↓
[Welcome state — first-time user]
```

**Welcome state (first-time):**

```
┌─────────────────────────────────────┐
│ [Avatar]  HOME      [🔍] [🔔]      │
├─────────────────────────────────────┤
│                                     │
│   Chào @nts! 👋                      │
│   Welcome to your Value Stream       │
│                                     │
│   You're new — feed sẽ phong phú     │
│   khi bạn:                          │
│   ✓ Connect với 3 người Suggested    │
│   ○ Tạo bài viết đầu tiên           │
│   ○ Join 1 Circle                   │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│   [SUGGESTED RESONANCE x3]          │
│                                     │
│   [Sample posts từ active community] │
│                                     │
└─────────────────────────────────────┘
```

**Decision logic:**
- IF user has 0 connections → show 3 Suggested Resonance prominent + sample posts
- IF user has ≥1 connection → start regular Value Stream (no welcome banner)

### §2.2 J2 — Returning Entry (existing user)

```
[Open uzg.plus]
      ↓
[Splash 1s]
      ↓
[Auth check] → logged in
      ↓
[HOME shell mount immediate]
      ↓
[Restore last scroll position]  ← per Foundation §7.1 state preservation
      ↓
[Background sync new posts]
      ↓
[Show "X new posts" pill if applicable] (top of feed)
```

**"New posts" pill behavior:**
- Appears at top of feed (sticky below Top Bar)
- Format: "12 new posts ↑"
- Tap → scroll to top + refresh feed
- Auto-dismiss after 10s if not tapped
- KHÔNG auto-scroll user

### §2.3 Auth edge cases

**Token expired mid-session:**
- Detect 401 on API call
- Modal: "Session expired. Login again?"
- "Login" CTA → return to login → preserve intended destination → resume after auth

**Multiple device session conflict:**
- Detect via WebSocket message
- Toast: "Logged in on another device. Continue here?"
- Buttons: "Stay" / "Logout other"

**Offline at boot:**
- Splash → "Cannot connect. Retry?"
- Show cached feed if available (read-only)
- Compose disabled, banner: "Offline — actions queued"

---

## §3 BROWSE FEED FLOW — J3

### §3.1 Feed load state machine

```
States:
[INITIAL] → [LOADING] → [LOADED] | [ERROR] | [EMPTY]
                            ↓
                       [SCROLLING] (steady state)
                            ↓
                       [LOADING_MORE] (pagination)
                            ↓
                       [LOADED_MORE] | [END_OF_FEED]
```

### §3.2 State details

**[INITIAL]**
- HOME shell mounted, feed area shows skeleton
- API call dispatched

**[LOADING]**
- Skeleton: 3-4 placeholder post cards
- Shimmer animation
- Duration: ~500-1500ms typical
- Timeout: 10s → ERROR

**[LOADED]**
- Posts rendered
- Skeletons replaced
- Initial 15-20 posts loaded
- Suggested Resonance card injected at position 5-7

**[ERROR]**
- Banner: "Could not load Value Stream"
- "Retry" button
- Show cached feed below if available

**[EMPTY]**
- Triggered if user has 0 connections AND 0 followed circles
- Empty state per HOME canon §3.5
- CTA: "Discover Suggested Resonance"

**[SCROLLING]**
- Pagination trigger: when user reaches bottom 20% of loaded posts
- Background fetch next batch
- KHÔNG block scroll

**[LOADING_MORE]**
- Skeleton at bottom (1-2 cards)
- Existing posts still scrollable

**[LOADED_MORE]**
- Skeletons replaced
- Continue scroll

**[END_OF_FEED]**
- "You're all caught up ✓"
- Suggested action: "Connect with more people"
- KHÔNG infinite garbage content (per Redlines §2.2)

### §3.3 Pull-to-refresh flow

```
[User pulls down at top]
      ↓ Threshold reached (~80px)
[Spring tension visual]
      ↓ User releases
[Refresh fetch dispatched]
      ↓
[Indicator visible: "Refreshing..."]
      ↓ ≤3s typical
[New posts prepended]
      ↓
[Smooth scroll preserves user position]
[New posts above current view, accessible by scroll up]
```

### §3.4 Post visibility tracking (for QOT analytics)

**KHÔNG track:**
- Time spent on post (engagement metric)
- Scroll depth percentage
- Hover/dwell time

**CHỈ track:**
- Post viewed (boolean, via IntersectionObserver, threshold 50%, dwell 1s)
- Used for: deduping new feeds, "already seen" filter

---

## §4 ENGAGE FLOW — J4

### §4.1 Tap post → action sheet decision

```
[User taps post]
      ↓
[Decide tap target]
      ├─ Body text/media → Expand post detail
      ├─ Avatar → Action sheet (connect)
      ├─ User name/handle → ENTA shell
      ├─ QOT icon → QOT trace sheet
      ├─ Reaction icon → Quick react OR wheel
      ├─ +U signal → Wallet U history
      └─ Quote/reply icon → Compose with quoted
```

### §4.2 React flow (Ngũ Hành) — state machine

```
[Idle]
   ↓ tap reaction icon (quick)
[Reaction submitted]
   ↓ ≤200ms
[Visual confirm: element glow + count update]
   ↓
[Idle (with reacted state)]

ALT path:
[Idle]
   ↓ long-press post (600ms threshold)
[Reaction wheel overlay] (5 elements pentagon)
   ↓ user drag-selects
[Element highlighted on hover]
   ↓ release on element
[Reaction submitted]
   ↓
[Visual confirm + wheel fades]
   ↓
[Idle (with reacted state)]

ALT cancel:
[Reaction wheel overlay]
   ↓ release outside wheel
[Wheel fades, no reaction]
[Idle]
```

### §4.3 Reaction edit flow

User can change reaction:
- Tap same element again → un-react
- Tap different element → switch reaction
- Long-press → wheel reopens, can switch

### §4.4 React state per post (3-state)

```
[NOT_REACTED]
   ↓ user reacts
[REACTED] (with element type tracked)
   ↓ user un-reacts
[NOT_REACTED]
```

UI display:
- NOT_REACTED: 5 ngũ hành icons inactive
- REACTED: chosen element highlighted + glow
- Aggregate sentiment text below ("Mostly Mộc")

### §4.5 Quote/Reply flow

```
[User taps Quote icon]
   ↓
[Compose overlay opens]
   ↓ pre-filled with quoted post inline
[User adds own commentary]
   ↓
[Submit Compose]  (per §5)
   ↓
[New post created with quote relationship]
[QOT chain links new post → quoted post]
```

### §4.6 Connect flow (from feed)

```
[User taps avatar in feed]
   ↓
[Connection action sheet bottom slide-up]
   ↓
[Sheet shows: avatar + name + ENTA + resonance score]
   ↓
[User selects trust level]:
   ├─ Open Connect (default) → Submit immediate
   ├─ Resonance Connect → Submit immediate
   ├─ Circle Connect → Requires both in same circle (check + branch)
   └─ Trusted Connect → Send request → other party approves
   ↓
[Connect submitted]
   ↓ ≤300ms
[Confirm toast: "Connected with @elsa"]
   ↓
[Sheet dismisses]
[Avatar in feed gets ring update (Connected state)]
```

### §4.7 Connect edge cases

**User already has Open Connect, wants to upgrade:**
- Action sheet shows current level
- Upgrade options visible
- Confirm with same flow

**Trusted Connect needs approval:**
- Request sent
- Status: "Pending approval"
- Other party gets notification → approve/decline → original requester notified

**Block flow (in More menu of action sheet):**
- "Block" → Confirm dialog "Block @elsa? Their content will be hidden."
- Confirm → Block → All their content hidden in feed
- KHÔNG show notification to blocked user

---

## §5 COMPOSE FLOW — J5

### §5.1 Compose lifecycle

```
[Idle in HOME]
      ↓ tap Floating + Button
[Compose overlay slide-up 320ms]  ← per Foundation §6.2
      ↓
[Compose UI mounted]
      ↓
[Auto-focus text input]
      ↓
[User types content]
      ↓
[User adds optional media] (image/video/poll/quote)
      ↓
[User MUST select QOT context]  ← gate
[User MUST declare Actor]  ← gate
      ↓
[User selects Visibility (default: Public)]
      ↓
[Tap "Post" button]
      ├─ NOT all gates met → button disabled, tooltip
      └─ All gates met → submit
      ↓
[Submit dispatch]
      ↓
[Optimistic UI: post appears at top of feed]
      ↓
[Server confirms ≤2s typical]
      ├─ Success → post stays + QOT trace assigned
      └─ Error → post removed + error toast + draft auto-saved
      ↓
[Compose overlay slides down 280ms]
      ↓
[Idle in HOME with new post visible]
```

### §5.2 Compose state machine

```
States:
[CLOSED] → [OPENING] → [OPEN] → [DRAFTING] → [SUBMITTING] → [CLOSED]
                          ↓
                       [SAVING_DRAFT] (auto every 30s)
                          ↓
                       [DRAFTING] (continue)
                          
                       [VALIDATION_FAIL] (gate fail) → [DRAFTING]
                          
                       [SUBMIT_ERROR] → [DRAFTING] (with error banner)
```

### §5.3 Validation gates (block "Post" button)

**Gate 1: Content non-empty**
- Text length > 0 OR media attached OR poll attached
- Helper: "Add content to post"

**Gate 2: QOT context selected**
- One of: Own thought / Referenced / Quote post
- IF "Referenced" → require source URL/text input
- IF "Quote post" → require selected post
- Helper: "Select Provenance type"

**Gate 3: Actor declared**
- One of: Human / AIER co-authored
- Helper: "Declare Actor"

**Gate 4: Character limit**
- Text ≤ 2000 chars
- Counter visible, turns warning at 1900
- Disabled at 2001
- Helper: "Reduce to 2000 characters"

**Gate 5: Media file size (if applicable)**
- Image ≤ 5MB each, max 4
- Video ≤ 100MB
- Helper: "File too large"

### §5.4 Draft auto-save

- Every 30s: silent save to local storage
- Manual "Save draft" button (top-right Compose)
- Drafts accessible: Avatar Menu → "Drafts"
- Max 10 drafts
- Drafts persist across sessions

### §5.5 Compose cancel flow

```
[User taps "Cancel" (✕)]
      ↓
[Check: is content empty?]
      ├─ Empty → close immediately
      └─ Not empty → confirm dialog
            ↓
            [Dialog: "Discard or save draft?"]
            ├─ "Discard" → close, lose content
            ├─ "Save draft" → save + close
            └─ "Continue editing" → return to compose
```

### §5.6 Compose with media flow

**Image attach:**
```
[Tap 📷 Image]
   ↓
[Native file picker (multi-select up to 4)]
   ↓
[Files selected]
   ↓
[Preview shown in compose with delete X per image]
   ↓
[Compose UI grows to fit preview]
```

**Video attach:**
```
[Tap 🎥 Video]
   ↓
[Native file picker (single)]
   ↓
[Video selected]
   ↓
[Thumbnail preview + duration shown]
   ↓
[Server processes async — visible "processing" until ready]
```

**Poll attach:**
```
[Tap 📊 Poll]
   ↓
[Inline poll editor]
   ↓
[Add 2-4 options]
   ↓
[Set duration (1d / 3d / 7d)]
   ↓
[Optional: ngũ hành theme per option]
   ↓
[Poll attached to post]
```

### §5.7 Compose error recovery

**Submit fails:**
- Compose stays open
- Banner: "Could not post. Try again?"
- Content preserved
- Draft auto-saved
- "Retry" button

**Network drop mid-submit:**
- Detect timeout (10s)
- Compose stays open
- Banner: "Network issue. Saved as draft."
- Retry available manually

---

## §6 DISCOVER FLOW — J6

### §6.1 Search flow

```
[Tap 🔍 Top Bar]
      ↓
[Search overlay fade-in 200ms]
      ↓
[Auto-focus search input]
      ↓
[Show: Recent searches + Categories]
      ↓
[User types query]
      ↓ debounce 300ms
[Live search dispatched]
      ↓
[Results render in 4 sections]:
   ├─ People (avatar + ENTA + handle)
   ├─ Circles (icon + name + member count)
   ├─ Posts (snippet + author + time)
   └─ AIER (badge + name + domain)
      ↓
[User taps result]
      ├─ People → ENTA shell
      ├─ Circles → PLUS Hub > Circle Business mini app (cross-module)
      ├─ Posts → Post detail
      └─ AIER → CHAT shell với AIER thread
      ↓
[Search overlay closes]
[Cross-module navigation]
```

### §6.2 Search edge cases

**No results:**
- "No matches for '<query>'"
- Suggest: "Try shorter query / Browse Suggested Resonance"

**Query too short:**
- < 2 chars → show recent + popular categories
- ≥ 2 chars → live search

**Recent searches:**
- Max 10 stored locally
- Tap recent → re-search immediately
- Clear option

### §6.3 Suggested Resonance interaction

```
[User scrolling feed]
      ↓
[Suggested Resonance card appears (every 5-7 posts)]
      ↓
[User options]:
   ├─ Tap "Connect →" → Connect flow §4.6
   ├─ Tap avatar → ENTA shell (preview)
   ├─ Swipe left → "Not now" (dismiss this suggestion)
   └─ Tap "Why suggested?" → Explanation sheet
      ↓
[After dismiss/connect → next suggestion in subsequent card]
```

### §6.4 "Why suggested?" sheet

Bottom sheet, 50% screen:
```
Why suggested

Elsa @elsa is suggested because:

✓ Mộc-Thủy element strengthens your Kim
✓ 3 mutual circles with you (Forest, Garden Bay, Wisdom)
✓ Active in your interest themes: meditation, retreat
✓ 2 connections away from you

Resonance score: 83%

[Connect →]  [Not interested]
```

KHÔNG hiển thị: black-box algorithm reasoning. Always transparent.

---

## §7 CROSS-MODULE EXITS — J7

### §7.1 Cross-module exit matrix

| From HOME action | To module | State preserved |
|---|---|---|
| Tap user avatar in feed | ENTA shell (their profile) | HOME scroll preserved |
| Tap "Send Message" in action sheet | CHAT shell (DM thread) | HOME scroll preserved |
| Tap +U signal on post | WALLET (filtered to this post) | HOME scroll preserved |
| Tap U-Reward pill (top right) | U-Reward mini app | Module state preserved |
| Tap CHAT bottom nav | CHAT Inbox | HOME state preserved |
| Tap WALLET bottom nav | WALLET overview | HOME state preserved |
| Tap ENTA bottom nav | ENTA own profile | HOME state preserved |
| Tap UZG+ logo center | PLUS Hub OR HOME (per Foundation) | HOME state preserved |
| Tap Notification bell → AIER alert | CHAT shell (AIER thread) | HOME state preserved |
| Tap Notification → Booking confirm | WALLET (transaction detail) | HOME state preserved |

### §7.2 Return-to-HOME from cross-module

```
[User in cross-module (e.g. CHAT Room)]
      ↓
[User taps HOME bottom nav OR UZG+ logo]
      ↓
[Outgoing module state snapshot]
      ↓
[HOME shell mount (instant if cached)]
      ↓
[Restore scroll position from snapshot]
      ↓
[Background sync new posts since last visit]
      ↓
[Show "X new posts" pill if applicable]
```

### §7.3 Browser back button behavior

User pressed browser back:
- IF deep-linked from notification → return to previous module/state
- IF browsed within HOME → undo last navigation step
- IF at HOME root → no-op (or show "Tap again to exit" if PWA)

---

## §8 NOTIFICATION FLOW

### §8.1 Notification bell flow

```
[Tap 🔔 Top Bar]
      ↓
[Notification overlay fade-in 200ms]
      ↓
[Show: list of notifications, sorted recent first]
      ↓
[User actions per notification]:
   ├─ Tap → contextual action (cross-module exit)
   ├─ Swipe left → Dismiss (mark read)
   └─ Long press → Action menu (mute sender, dismiss type)
      ↓
[Tap [Clear] → mark all read]
      ↓
[Overlay closes]
      ↓
[Bell badge updates]
```

### §8.2 Notification → cross-module routing

| Notification type | Tap action |
|---|---|
| Connection request | ENTA shell với requester profile |
| Reaction on your post | Post detail (your post) |
| Quote of your post | Post detail (the quote) |
| AIER message | CHAT shell với AIER thread |
| Circle invite | PLUS Hub > Circle Business mini app |
| Booking confirmation | WALLET (transaction detail) |
| +U earned | WALLET (U history) OR U-Reward mini app |

### §8.3 Real-time notification arrival (in HOME)

While user in HOME:
- New notification arrives via WebSocket
- Bell badge increments (subtle pulse 1x)
- KHÔNG popup (per Redlines — no engagement spam)
- KHÔNG sound by default
- User must tap bell to see

---

## §9 AVATAR MENU FLOW

### §9.1 Avatar drawer flow

```
[Tap Avatar Top Bar]
      ↓
[Menu drawer slide-in from left, 280ms]  ← per Foundation §3.2
      ↓
[Show 2 sections]:
   ├─ HOME-specific (My posts / Bookmarks / Drafts / Lists)
   └─ Shared (Settings / Theme / Projects / Membership / Switch / Logout)
      ↓
[User selects item]
      ↓
[Action depends on item]:
   ├─ My posts → filtered HOME view (your posts only)
   ├─ Bookmarks → Bookmarks list overlay
   ├─ Drafts → Drafts list overlay
   ├─ Lists → Lists overlay
   ├─ Settings → Settings full-screen
   ├─ Theme → Theme selector overlay
   ├─ Projects → Projects view (cross-module)
   ├─ Membership → PLUS Hub > Membership mini app
   ├─ Switch account → Account switcher
   └─ Logout → Logout confirm dialog
      ↓
[Drawer closes after navigation]
```

### §9.2 Drafts list flow

```
[Tap "Drafts" in Avatar Menu]
      ↓
[Drafts overlay full-screen]
      ↓
[List of drafts (chronological)]:
   ├─ Each draft: snippet + timestamp + Edit / Delete
   ↓
[User taps draft]
      ↓
[Compose overlay opens with draft pre-loaded]
      ↓
[Edit/Continue → Submit OR Save → returns to Drafts list]
```

---

## §10 SCREEN STATES MATRIX — HOME

### §10.1 Per-surface state coverage

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| **Value Stream feed** | Skeleton 3-4 cards shimmer | "Welcome to Value Stream" + Suggested Resonance | "Could not load" + Retry | Posts rendered | N/A |
| **Post component** | Skeleton inline | N/A | "Failed to load post" | Full post | Blocked content (hidden) |
| **Reaction wheel** | N/A | N/A | Toast "Could not react" | Pentagon UI | N/A |
| **Compose overlay** | N/A | Empty input prompt | "Could not post" + Retry | Input + media + gates | Submit disabled until gates met |
| **Search overlay** | Skeleton results | "No matches" + suggestions | "Search failed" + Retry | Results in 4 sections | N/A |
| **Notification overlay** | Skeleton list | "No notifications" | "Could not load" | List | N/A |
| **Avatar Menu drawer** | N/A | N/A | N/A | Always full | N/A |
| **Connection action sheet** | Skeleton fields | N/A | "Could not connect" | Avatar + ENTA + buttons | Sent (locked) |
| **QOT trace sheet** | Skeleton | N/A | "Trace unavailable" | Provenance chain | N/A |
| **Suggested Resonance card** | Skeleton | "No suggestions yet" | N/A | User card + Connect | Already connected (hide) |

### §10.2 Loading state rules

- Skeleton matches expected layout
- Shimmer 1.5s loop
- KHÔNG full-screen spinner
- KHÔNG block other UI from interaction during background loads

### §10.3 Error state rules

- Clear, non-technical message (Vietnamese)
- Specific action to recover (Retry / Refresh / Login)
- KHÔNG dump stack trace
- KHÔNG generic "Something went wrong"
- Banner color: warning amber (NOT alarming red unless CRITICAL data loss)

### §10.4 Empty state rules

- Meaningful message specific to context
- One primary CTA toward action
- Light illustration optional
- KHÔNG generic "Nothing to see here"

---

## §11 EDGE CASES + ERROR HANDLING

### §11.1 Slow network handling

**Indicator:**
- IF API response > 3s → show "Loading..." subtle indicator
- IF > 8s → show "Slow connection. Continue waiting?"
- IF > 15s → timeout error

**Background ops on slow network:**
- React submit: optimistic UI, rollback if fails
- Compose submit: optimistic post in feed, rollback if fails
- Notification fetch: silent retry every 30s

### §11.2 Offline handling

**Detected offline:**
- Banner top of HOME: "Offline — showing cached"
- Compose disabled
- React queued (submit when reconnect)
- Connection actions queued

**Reconnect:**
- Banner: "Reconnected"
- Process queue (silently)
- Refresh feed in background

### §11.3 Auth expiry mid-session

```
[User scrolling HOME]
      ↓
[API call returns 401]
      ↓
[Modal: "Session expired"]
      ↓
[Re-auth flow]
      ├─ Magic link (silent re-auth if token in localStorage)
      └─ Login screen
      ↓
[On success: return to HOME at preserved state]
```

### §11.4 Profile / ENTA missing data

User has account but ENTA incomplete:
- HOME shows banner: "Complete your ENTA to unlock full Value Stream"
- CTA: "Continue ENTA setup →"
- Tap → ENTA Onboarding wizard (resume from incomplete step)
- Limited feed shown until complete

### §11.5 Blocked / muted content handling

- Blocked user content: hidden entirely from feed
- Muted user content: visible nhưng collapsed by default ("Show post from @user")
- Reported content: depends on resolution status

### §11.6 Content moderation actions

Post flagged by community:
- IF threshold reached → soft hide với "Content under review" placeholder
- Post detail shows reason + "Why am I seeing this?"
- User can request review

---

## §12 PERMISSION + GATING

### §12.1 ENTA gating

| HOME feature | ENTA required |
|---|---|
| Browse public feed | NO (guest preview limited) |
| React to post | YES (must have ENTA) |
| Compose post | YES |
| Connect with user | YES |
| Send message | Trusted Connect (gated separately) |
| QOT trace view | YES |

**Guest preview (no auth):**
- Limited public posts visible
- Reactions disabled
- Compose disabled
- "Sign up to participate" banner

### §12.2 Tier gating in HOME

HOME core experience available to all tiers (Explorer free).

Tier-gated:
- Schedule post (Builder+)
- Advanced search filters (Builder+)
- AIER co-author option (Sovereign)
- Custom feed algorithms (Sovereign — future)

Display:
- Locked features show subtle lock icon
- Tap → tier upgrade explainer (NOT aggressive paywall)

### §12.3 Connection-level gating

| Action | Connection level required |
|---|---|
| View public posts | Open Connect (anyone) |
| View connection-only posts | Resonance Connect+ |
| View circle posts | Circle Connect (with same circle) |
| Send DM | Trusted Connect |
| Quote post | Resonance Connect+ |

---

## §13 TIMING + PERFORMANCE TARGETS

### §13.1 Critical UX timings

| Action | Target | Max acceptable |
|---|---|---|
| HOME shell mount (cached) | < 200ms | 500ms |
| Initial feed load | < 1.5s | 3s |
| Pagination load | < 800ms | 2s |
| Pull-to-refresh | < 1s | 2s |
| React submit (optimistic) | < 100ms (visual) | 300ms |
| Compose submit (optimistic) | < 200ms (visual) | 1s |
| Search debounce | 300ms | — |
| Search results render | < 600ms | 1.5s |
| Cross-module exit | < 250ms | 500ms |
| Avatar drawer open | 280ms (animation) | — |
| QOT trace sheet | < 500ms | 1.5s |

### §13.2 Frame rate targets

- Scroll: 60fps consistent
- Animations: 60fps
- No janks > 50ms
- Reaction wheel: 60fps during drag

### §13.3 Bundle size impact

HOME shell + dependencies:
- Initial load: < 200KB gzipped
- Lazy load: Compose overlay, Search overlay, etc.
- Image lazy load mandatory

---

## §14 INTEGRATION VỚI MODULE KHÁC — UX HAND-OFF

### §14.1 HOME → CHAT (Send message)

```
[User in HOME]
   ↓ tap user avatar in feed
[Connection action sheet]
   ↓ tap "Send Message"
[CHECK: connection level]
   ├─ NOT Trusted Connect → show "Upgrade to Trusted to message"
   └─ IS Trusted Connect → proceed
   ↓
[CHAT shell mount (full transition 280ms)]
   ↓
[CHAT Room mounted directly with this user's DM thread]
   ↓
[If thread exists → show history]
[If thread new → empty room with composer focused]
```

State preservation: HOME scroll position saved.

### §14.2 HOME → ENTA (View profile)

```
[User in HOME]
   ↓ tap user avatar OR name
[ENTA shell mount (transition 280ms)]
   ↓
[OTHER user's ENTA profile loaded]
   ↓
[Profile rendered with ENTA Wheel, Identity tab default]
   ↓ user can:
   ├─ Browse 4 tabs (Identity / Resonance / Circles / Journey)
   ├─ Tap "Connect" / "Send Message"
   ├─ Tap More menu (Block / Report)
   └─ Tap back arrow → return HOME (scroll preserved)
```

### §14.3 HOME → WALLET (+U signal)

```
[User in HOME]
   ↓ tap +U icon on post (e.g. "+5")
[WALLET shell mount]
   ↓
[Filtered to U history showing this post's contribution]
   ↓
[Header context: "U from post by @author"]
   ↓ user can tap back → HOME preserved
```

### §14.4 HOME → U-Reward (pill tap)

```
[User in HOME]
   ↓ tap U-Reward pill (top-right Foundation §3.4)
[U-Reward mini app mount (slide up 320ms)]
   ↓
[4 phần cố định behavior changes per Foundation §6.3]
[U-Reward UI active]
   ↓ user can tap close (✕) → return HOME preserved
```

### §14.5 HOME → PLUS Hub

```
[User in HOME]
   ↓ tap UZG+ logo center bottom nav
[Decision per Foundation §6.5]:
   ├─ Single tap: open PLUS Hub
   └─ Long press / double tap: quick HOME (already at HOME, no-op)
   ↓
[PLUS shell mount (slide-up 280ms)]
   ↓ user can tap any mini app OR back → HOME preserved
```

### §14.6 HOME → CHAT/WALLET/ENTA via bottom nav

```
[User in HOME]
   ↓ tap any of CHAT/WALLET/ENTA bottom nav icons
[Outgoing HOME state snapshot]
[Target shell mount (fade transition 200ms)]
[Target module shell rendered]
   ↓ user can return to HOME via bottom nav HOME icon
```

---

## §15 DECISION POINTS — KEY UX FORK BEHAVIORS

### §15.1 First-time vs Returning user

**Decision:** Show welcome state vs regular feed?

- Has ENTA + has ≥1 connection → Regular feed (J2)
- Has ENTA but 0 connections → Welcome with prominent Suggested Resonance
- No ENTA → Force ENTA onboarding (J1)
- Not authenticated → Login screen

### §15.2 Empty feed vs Loading

**Decision:** Is feed empty or still loading?

- < 1.5s after mount → Loading state
- ≥ 1.5s with no posts returned → Empty state
- ≥ 1.5s with error → Error state

### §15.3 Quick react vs Wheel

**Decision:** Tap or long-press behavior?

- Tap < 600ms → Quick reaction (Hỏa default OR last-used element)
- Tap ≥ 600ms → Reaction wheel opens

### §15.4 Connect trust level

**Decision:** Default trust level on Connect tap?

- IF mutual circles ≥ 1 → suggest Circle Connect
- ELSE IF resonance score ≥ 75% → suggest Resonance Connect
- ELSE → default Open Connect

User can override in action sheet.

### §15.5 Compose validation gate

**Decision:** Allow Post submission?

ALL must be true:
- Content non-empty
- QOT context selected
- Actor declared
- Within character limit
- Media within file limits

ANY false → button disabled với specific helper text.

---

## §16 ANALYTICS / OBSERVABILITY EVENTS

### §16.1 UX events to track (privacy-respecting)

| Event | Purpose |
|---|---|
| `home.shell.mounted` | Performance timing |
| `home.feed.loaded` | Feed load success rate |
| `home.feed.error` | Error rate monitoring |
| `home.post.viewed` (50% threshold, 1s dwell) | Dedup new feed loading |
| `home.post.reacted` | Reaction distribution per element |
| `home.compose.opened` | Compose intent |
| `home.compose.submitted` | Compose conversion |
| `home.compose.cancelled` | Compose drop-off |
| `home.compose.draft_saved` | Draft usage |
| `home.search.opened` | Search engagement |
| `home.suggested_resonance.connected` | Discovery success |
| `home.qot_trace.opened` | Trust verification engagement |

### §16.2 KHÔNG track (per Redlines)

- ❌ Time spent per post (engagement metric)
- ❌ Scroll depth %
- ❌ Hover duration
- ❌ Tab focus/blur (presence tracking)
- ❌ Any cross-module behavioral correlation without consent

---

## §17 ACCESSIBILITY UX FLOWS

### §17.1 Screen reader flow

```
[Screen reader user opens HOME]
      ↓
[HOME announced: "HOME, Value Stream"]
      ↓
[Top Bar landmark announced]
      ↓
[Feed list announced: "Value Stream, X posts"]
      ↓
[Per post: avatar + name + ENTA + content + reactions + actions]
      ↓
[User Tab/Arrow keys to navigate]
      ↓
[Reactions navigable via keyboard with element names]
      ↓
[Compose accessible via "C" shortcut]
```

### §17.2 Keyboard navigation flow

| Key | Action |
|---|---|
| Tab | Next post / element |
| Shift+Tab | Previous post / element |
| Enter | Activate (open post detail / submit) |
| Escape | Close overlays |
| R | Open reaction wheel for focused post |
| C | Open compose |
| / | Focus search |
| N | Open notifications |
| H | Return to HOME (from cross-module) |
| ? | Show keyboard shortcut help |

### §17.3 Reduced motion flow

User has `prefers-reduced-motion`:
- Feed transitions: instant (no fade)
- Compose overlay: instant open/close
- Reaction wheel: instant appear (no fade-in)
- Pull-to-refresh: simple loading indicator (no spring)
- Animations replaced with state changes

---

## §18 V2 → V3 UX MIGRATION NOTES

### §18.1 V2 current UX issues (per Cursor audit Gap Analysis)

| Gap ID | Issue | V3 fix in this UX spec |
|---|---|---|
| G18 | FlowFeedPage exists but NOT mounted at `/` | §1.1 + §16.1 of HOME canon: mount `/` to HOME |
| G01 | `/enta/:handle` requires login (should be public) | §7.2 cross-module: public ENTA for guests |
| G07 | `/chat/:id` and `/inbox/direct/:id` duplicate routes | §14.1: standardize HOME → CHAT exit |
| G13 | `/wallet/*` and `/u-*` siblings disconnected | §14.3: HOME → WALLET unified entry |
| G18 | Status box at top of HOME | §5.1: replaced by Floating + Compose flow |
| — | Like/comment system | §4.2: replaced by Ngũ Hành reaction state machine |
| — | No QOT visible per post | §4.1: QOT icon mandatory for value-bearing posts |

### §18.2 V3 UX implementation order (from this spec)

Sprint 1 — Core UX flows:
1. J2 Returning entry (most common)
2. J3 Browse feed + state machine
3. J4.2 React state machine (Ngũ Hành)
4. J5 Compose flow with gates

Sprint 2 — Enrichment:
5. J6 Search + Discover
6. J4.6 Connect flow
7. Notification flow
8. Avatar Menu flow

Sprint 3 — Edge cases:
9. Error/offline handling
10. Auth expiry recovery
11. Cross-module exit polish
12. Accessibility flows

### §18.3 Mockup priorities for Phase 2 (Artifact build)

Based on this UX spec, Phase 2 mockups should cover:

| Priority | Mockup | UX section |
|---|---|---|
| 1 | HOME shell + feed load states (empty/loading/error/active) | §10.1 |
| 2 | Post component với 5 states (idle/reacted/QOT-traced/+U/blocked) | §10.1 |
| 3 | Reaction wheel state machine (idle → wheel → confirm) | §4.2 |
| 4 | Compose overlay full flow with gates | §5.1-5.3 |
| 5 | Suggested Resonance card with "Why suggested?" sheet | §6.3-6.4 |
| 6 | Connection action sheet với trust level decision | §4.6 + §15.4 |
| 7 | Search overlay với 4 categories results | §6.1 |
| 8 | Notification overlay với cross-module routing | §8 |
| 9 | Avatar Menu drawer với HOME-specific section | §9 |
| 10 | First-time welcome state vs Returning entry | §2.1-2.2 + §15.1 |

---

## §19 SUCCESS METRICS

### §19.1 UX success signals (good)

- First-time → ENTA onboarding completion > 90%
- HOME first feed load < 1.5s p75
- Compose submission rate (open → submit) > 60% (intentional, not reactive)
- Pull-to-refresh usage steady (engagement without infinite scroll)
- Cross-module exits balanced (not stuck in HOME)
- Reaction distribution across 5 elements (no single dominant)
- Suggested Resonance connect rate > 30%
- Search → result tap > 50% (discovery works)

### §19.2 UX failure signals

- Compose drop-off > 50% (too many gates? UX friction?)
- Pull-to-refresh frenzy (addiction loop)
- Auth expiry recovery friction
- Cross-module exit failures (state loss complaints)
- "I can't find X" reports (discovery broken)
- Reaction wheel mistaps (UI threshold tuning needed)

---

## §20 KẾT LUẬN — 5 CÂU KHÓA

**1. UX Flow = User Journey + State machines + Decision points + Cross-module exits + Edge cases. UI canon trả lời "what", UX flow trả lời "how user moves".**

**2. 7 segments chính: Entry (J1/J2) / Browse (J3) / Engage (J4) / Compose (J5) / Discover (J6) / Cross-module (J7).**

**3. State preservation cross-module mandatory — HOME scroll/draft/search must survive navigation.**

**4. 5 states per surface: LOADING / EMPTY / ERROR / ACTIVE / DISABLED — đầy đủ cho mọi component.**

**5. Optimistic UI mặc định cho React/Compose — feel native với rollback nếu fail.**

---

## §21 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ HOME UI canon + Cursor V2 user flow audit + Foundation OS architecture |

---

🔒 UZG+ V3 PWA OS — HOME UX Flow Spec v1.0
End of file.
