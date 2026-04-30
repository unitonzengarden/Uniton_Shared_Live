# UZG+ V3 PWA OS — HOME/SOCIAL MODULE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_HOME_SOCIAL_CANON_v1`
**Version:** v1.0 (rewrite per Foundation OS Architecture)
**Created:** 2026-04-30
**Authority:** Tier 4 (Module-specific, governed by Foundation OS Canon Tier 3)
**Module:** HOME (Bottom Nav position #1)
**Inspiration shell:** X.com / Twitter feed
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` ← MUST read first
- Tier 3: `UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1` (tokens)
- Tier 3: `UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1` (45 components)
- Tier 2: HUMAN_VALUE_CANON, IDENTITY_CANON, TRUTH_TRUST_CANON

**Companion canons:** CHAT, PLUS Hub, WALLET, ENTA, U-Reward, TAO, REDLINES_MASTER

---

## §0 PURPOSE

Khóa UI/UX cho **HOME shell** — module đầu tiên user gặp khi vào `uzg.plus` (default landing post-auth). HOME inherit shell architecture từ Foundation OS Canon (4 phần cố định) và thêm content layer riêng giống X.com feed nhưng với value-stream logic.

**Quan trọng:** File này CHỈ describe nội dung HOME shell. 4 phần cố định (Bottom Nav, Top Bar Avatar, Floating +, U-Reward pill) đã spec trong Foundation Canon — không lặp lại.

---

## §1 ĐỊNH NGHĨA

### §1.1 Câu định nghĩa official

**HOME = social feed surface theo X.com pattern, nhưng feed là Value Stream (không phải News Feed). User vào uzg.plus default landing tại HOME. HOME reveal: ai contribute gì, energy đang chảy đâu, trust đang xây ra sao.**

### §1.2 3 câu khóa

**1. HOME shell = X.com inspiration + Value Stream logic.**
**2. Vào uzg.plus = HOME (default).**
**3. Tab CHAT/WALLET/ENTA/PLUS active = HOME unmount, không hiện feed nữa.**

### §1.3 Khác biệt với X.com

| X.com | UZG+ HOME |
|---|---|
| News Feed | Value Stream |
| Like (❤️) | Ngũ Hành Reaction (Kim/Thủy/Mộc/Hỏa/Thổ) |
| Follow + numeric count | Connect + Resonance (no public count) |
| Trending tab | KHÔNG có (no engagement-driven discovery) |
| Algorithm tối ưu retention | Ranking 4-layer: ENTA fit + QOT trust + Value signal + Context |
| Anonymous post OK | QOT mandatory (provenance-bound) |
| Auto-play video | KHÔNG (addiction trigger) |

---

## §2 SHELL ARCHITECTURE — HOME

### §2.1 Vào HOME thấy gì

```
┌─────────────────────────────────────┐
│ [Avatar]  HOME      [🔍] [🔔1]      │  ← PHẦN 2 Top Bar (Foundation §3.2)
│                          ┌────────┐ │
│                          │⚡U:1250│ │  ← PHẦN 4 U-Reward pill (Foundation §3.4)
│                          └────────┘ │
├─────────────────────────────────────┤
│                                     │
│  ─────────────────────────────────  │
│  [POST 1 — Value Stream item]       │
│   Avatar + Name + ENTA + QOT        │
│   Content (text/image/video)        │
│   Ngũ Hành reaction bar             │
│  ─────────────────────────────────  │
│  [POST 2]                           │
│  ─────────────────────────────────  │
│  [SUGGESTED RESONANCE card]         │
│  ─────────────────────────────────  │
│  [POST 3]                           │
│  ─────────────────────────────────  │
│  ... infinite scroll                │
│                                     │
│                              ┌───┐  │
│                              │ + │  │  ← PHẦN 3 Floating + (Foundation §3.3)
│                              └───┘  │
├─────────────────────────────────────┤
│  HOME  CHAT  [UZG+]  WALLET  ENTA  │  ← PHẦN 1 Bottom Nav (Foundation §3.1)
└─────────────────────────────────────┘
```

### §2.2 Module-specific elements

HOME shell có 3 elements riêng (overlay lên 4 phần cố định):

**1. Top Bar context (Foundation PHẦN 2):**
- Title: "HOME"
- Right icons: Search (🔍) + Notification bell (🔔)
- Avatar tap → Avatar Menu với HOME-specific section: My posts / Bookmarks / Drafts / Lists

**2. Floating + Button context (Foundation PHẦN 3):**
- HOME context = "Tạo bài viết mới"
- Tap → Compose overlay full-screen (§6)

**3. Main canvas content (HOME-specific):**
- Value Stream feed (this file's main content)

---

## §3 LUẬT FEED — VALUE STREAM

### §3.1 KHÔNG gọi tên cũ

CẤM dùng: News Feed / Timeline / Activity Stream / What's happening / For You

PHẢI dùng: **Value Stream** (default) / Flow / Stream

### §3.2 Ranking logic — 4 lớp ưu tiên

KHÔNG ranking theo: Engagement / Viral velocity / Recency alone

PHẢI ranking theo:

| Lớp | Trọng số | Source |
|---|---|---|
| 1. Identity fit (ENTA) | 30% | User ENTA × content ENTA match |
| 2. Trust (QOT) | 30% | Provenance verified + actor credibility |
| 3. Value signal | 25% | Contribution measure (not popularity) |
| 4. Context relevance | 15% | Time + place + journey state |

### §3.3 Format — flow, không card

CẤM: Card UI nặng / Box wrapping / Dashboard widget feel / Heavy divider

PHẢI: Full-width flow / Spacing 16-20px / Light divider 1px opacity 0.1 / "Thở"

### §3.4 Infinite scroll — virtualization

LEARN từ X.com: Smooth scroll / Virtualization / Không page break

KHÔNG learn: Algorithm hooks / Auto-play video on scroll / Trending bait / "You may have missed" prompts

### §3.5 Empty state

Khi feed empty (new user):
```
┌─────────────────────────────────────┐
│         [ENTA wheel small]          │
│                                     │
│   Welcome to your Value Stream      │
│                                     │
│   Connect with people who           │
│   resonate with your ENTA           │
│                                     │
│      [Suggested Resonance →]        │
└─────────────────────────────────────┘
```

KHÔNG: "Nothing to see here" / "Be the first to post" / generic empty state.

---

## §4 LUẬT POST — VALUE UNIT

### §4.1 Post structure (mandatory)

```
┌─────────────────────────────────────┐
│  [👤] Name @handle · 2h · [QOT 🔍] │
│   ENTA: Hỏa-Mộc                     │
│                                     │
│   Content body (text/media)         │
│   Up to 2000 chars Vietnamese       │
│   Media inline (image/video/poll)   │
│                                     │
│  ─────────────────────────────────  │
│   [Kim] [Thủy] [Mộc] [Hỏa] [Thổ]   │
│   ⚡+5 (if value-bearing)            │
└─────────────────────────────────────┘
```

### §4.2 Avatar — ENTA ring

- Avatar tròn, 40px (feed), 56px (post detail), 72px (profile)
- Ring color theo ENTA element của poster:
  - Kim = trắng/bạc
  - Thủy = đen/xanh đậm
  - Mộc = xanh lá
  - Hỏa = đỏ
  - Thổ = vàng/nâu
- Ring dày 2px, glow nhẹ theo element

### §4.3 QOT trace icon

Mỗi post quan trọng PHẢI có QOT icon (12px) ở góc trên phải header.

Click QOT → mở provenance sheet (bottom sheet, 60% screen):
- Source actor (human/AIER/system)
- Created timestamp
- Trust chain (linked sources, expandable)
- Audit hash (collapsed)
- Footer: "View on QOT explorer"

**KHÔNG QOT = post không value-bearing → HOME không hiển thị.**

### §4.4 Actor attribution — 3 loại

| Actor | Visual marker |
|---|---|
| Human | Avatar + ENTA ring + name normal |
| AIER | Avatar + AIER badge + "Governed Entity" label |
| System | System icon + neutral border + "System" label |

CẤM: Anonymous post / Hidden actor type / Mixing AIER posts với human posts không có visual differentiation

### §4.5 Content types

| Type | Allowed | Rule |
|---|---|---|
| Text | ✅ | Plain VN/EN/TH/FIL, max 2000 chars |
| Image | ✅ | 1-4 images, lazy-load, NO auto-play |
| Video | ✅ | Inline player, NO auto-play, NO autoloop |
| Link preview | ✅ | Domain + title + 1-line description |
| Poll | ✅ | 2-4 options, ngũ hành theme optional |
| Quote post | ✅ | Quoted post inline với QOT trace |
| Live stream | ❌ | Not in V3 — defer |
| Stories (24h ephemeral) | ❌ | Conflicts với provenance |

### §4.6 Post tap behavior

- Tap post body → expand post detail (full-screen)
- Tap avatar → ENTA shell mounts với that user's profile
- Tap QOT icon → QOT provenance sheet
- Long press post → reaction wheel
- Swipe left on post → quick connect action sheet

---

## §5 LUẬT INTERACTION — NGŨ HÀNH REACTION

### §5.1 KHÔNG dùng Like

CẤM tuyệt đối:
- ❤️ Like / Love / Heart / 👍 / 👎
- Numeric like count visible
- "X liked this" attribution

### §5.2 5 Ngũ Hành reactions

| Element | Color | Meaning | Use case |
|---|---|---|---|
| **Kim** | Trắng/bạc | Rõ ràng, structure, clarity | Post explain rõ, framework |
| **Thủy** | Đen/xanh đậm | Đồng cảm, flow, depth | Post empathy, emotional, deep |
| **Mộc** | Xanh lá | Phát triển, growth, life | Post inspire, action, building |
| **Hỏa** | Đỏ | Kích hoạt, passion | Post catalytic, breakthrough |
| **Thổ** | Vàng/nâu | Ổn định, ground | Post foundation, practical |

### §5.3 Interaction UX

**Quick tap:**
- Tap reaction icon trực tiếp = quick add reaction
- Visual: icon highlight + glow theo element color

**Radial selection:**
- Long press anywhere on post → reaction wheel overlay
- 5 elements arranged in pentagon
- Drag-select to confirm
- Release outside = cancel
- Animation: 200ms fade-in

**Counts display:**
- KHÔNG hiển thị raw count "123 likes"
- HIỂN THỊ aggregate sentiment:
  - "Mostly Mộc" (single element dominant)
  - "Strong Hỏa" (passionate response)
  - "Balanced 5 elements" (mature post)
- Click → mở detail breakdown sheet
  - Distribution percent per element
  - KHÔNG list users (privacy)

### §5.4 +U signal (value-bearing posts)

Posts that contribute real value get +U marker:
- Position: bottom-right of reaction bar
- Visual: ⚡ icon + number "+5"
- Glow: ENTA element of poster
- Tap → mở Wallet U history filtered to this post's contribution

**Logic:** +U appears when post:
- Is referenced/quoted by N+ trusted users (multiplier)
- Triggers real action (booking, connection, deal)
- Verified by QOT chain

KHÔNG +U khi:
- Post chỉ có reactions (engagement không = value)
- Post viral (popularity không = contribution)

### §5.5 No public ranking

CẤM: Top reacted posts of the day / Most viral / Trending hashtags / "Popular in your network"

CHO PHÉP:
- Personal "Posts that resonated with you" (private, in Avatar Menu)
- Circle-internal ranking (within consent group, not public)

---

## §6 LUẬT COMPOSE — POST CÓ CHỦ ĐÍCH

### §6.1 KHÔNG status box cố định

CẤM:
- "What's on your mind?" box ở top feed
- Always-visible compose textarea
- Inline status update at top

**Lý do:** UZG+ post là intentional act, không phải reactive scrolling habit.

### §6.2 Compose mode entry

User tap **Floating + Button** (Foundation PHẦN 3, context HOME = "Tạo bài viết mới"):

```
1. Tap + button (bottom right, 56px diameter)
2. Compose overlay slides up from bottom (320ms ease-out)
3. Full-screen takeover
   - 4 phần cố định behavior:
     - Bottom Nav: hidden (focus mode)
     - Top Bar: replaced by compose top bar (Cancel ← Compose → Post)
     - Floating +: replaced by inline post button
     - U-Reward pill: hidden
4. Compose UI active
```

### §6.3 Compose UI structure

```
┌─────────────────────────────────────┐
│ [Cancel ✕]   New Post   [Post →]   │
├─────────────────────────────────────┤
│                                     │
│  [Avatar 32px] @your_handle         │
│                                     │
│  ┌─────────────────────────────────┐│
│  │ Type your post here...          ││
│  │                                 ││
│  └─────────────────────────────────┘│
│                                     │
│  [📷 Image] [🎥 Video] [📊 Poll]    │
│                                     │
│  ─────────────────────────────────  │
│                                     │
│  QOT Context (REQUIRED):            │
│  ○ Own thought                      │
│  ○ Referenced (paste source)        │
│  ○ Quote post (search)              │
│                                     │
│  Actor (REQUIRED):                  │
│  ○ I am posting as human            │
│  ○ AIER co-authored                 │
│                                     │
│  Visibility:                        │
│  ○ Public                           │
│  ○ Connections only                 │
│  ○ Specific circle                  │
│                                     │
│  ─────────────────────────────────  │
│  [Save draft]      Char: 245/2000   │
└─────────────────────────────────────┘
```

### §6.4 Compose flow

1. User opens compose
2. Type content (text, optionally add media)
3. **REQUIRED:** Select QOT context (own/referenced/quoted)
4. **REQUIRED:** Actor declaration (human/AIER-assisted)
5. Optional: Visibility (public/connection/circle)
6. Tap Post → submit
7. Animation: post slides into top of stream
8. Compose overlay closes
9. Original HOME shell + 4 phần cố định restored

### §6.5 QOT mandatory enforcement

UI block "Post" button until both QOT + Actor selections made.

Helper text below disabled button: "Mỗi post cần Provenance + Actor để xây trust"

### §6.6 Compose KHÔNG encourage spam

CẤM:
- "What's happening?" prompt baits
- Suggested prompts that bait reactive posting
- Notification "You haven't posted in X days"
- Streak/gamification on posting frequency
- "Engagement boost" prompts

CHO PHÉP:
- Draft save (local storage, max 10 drafts)
- Schedule post (premium feature, max 7 days ahead)
- AIER co-author option (optional, marked clearly)

### §6.7 Drafts management

Drafts accessible via Avatar Menu (HOME context) → "Drafts":
- List of saved drafts
- Created timestamp
- Edit / Delete / Post action per draft
- Auto-save current compose every 30s

---

## §7 LUẬT CONNECT — RESONANCE, NOT FOLLOW

### §7.1 KHÔNG "Follow"

CẤM:
- "Follow" / "Following" / "Followers"
- Numeric follower count anywhere
- "X followers" badge
- Public follower list

### §7.2 PHẢI "Connect"

Verbs: Connect (action) / Connected (state) / Resonance (relationship strength)

Display:
- KHÔNG: "1.2k followers"
- PHẢI: "Connected with 47 in your resonance field"

### §7.3 Suggested Resonance card

KHÔNG: "People you may know"

PHẢI: **Suggested Resonance** card integrated trong feed (mỗi 5-7 posts → 1 card).

```
┌─────────────────────────────────────┐
│ Suggested Resonance                 │
│  ─────────────────────────────────  │
│  [👤] Elsa @elsa                    │
│      ENTA: Mộc-Thủy · Âm Nữ         │
│                                     │
│      "Strengthens your Kim element" │
│      "Balances your Hỏa excess"     │
│                                     │
│      83% resonance · 3 mutual circles│
│                                     │
│              [Connect →]            │
└─────────────────────────────────────┘
```

### §7.4 Connection types — 4 trust levels

| Type | Trust level | Default visibility |
|---|---|---|
| Open Connect | Low | Public posts only |
| Resonance Connect | Medium | Connection-only posts visible |
| Circle Connect | High | Circle-internal posts visible |
| Trusted Connect | Highest | Direct messages enabled, value-bearing flows |

### §7.5 Connect/Disconnect UX

**Connect action:**
- Tap user avatar in feed → action sheet bottom slide up
- Avatar + name + ENTA hint
- Resonance score
- Buttons: Connect (default Open) / Custom level / View profile / Send message (if Trusted) / Block

**Disconnect:**
- KHÔNG public notification
- KHÔNG counter decrease publicly
- Disconnected user simply không còn trong stream
- Past content QOT trace remains if was value-bearing

---

## §8 LUẬT SEARCH + DISCOVERY

### §8.1 Search bar — minimal

- Top Bar right side: 🔍 icon
- Tap → expand search overlay (fade in 200ms)
- KHÔNG always-visible search box

### §8.2 Search overlay

```
┌─────────────────────────────────────┐
│ [✕]  🔍 Search...                   │
├─────────────────────────────────────┤
│                                     │
│ Recent searches:                    │
│  - meditation                       │
│  - circle business                  │
│                                     │
│ Categories:                         │
│  👥 People                          │
│  ⭕ Circles                         │
│  📝 Posts                           │
│  🤖 AIER                            │
│                                     │
└─────────────────────────────────────┘
```

### §8.3 Search scope

User tìm:
- People (handle, name, ENTA element)
- Circles (name, element, theme)
- Posts (content, QOT trace)
- AIER (domain, license)

KHÔNG search:
- Trending hashtags (no trending)
- Popular accounts (no popularity ranking)
- Sponsored content (no ads)

### §8.4 Discovery — flow integrated

Discovery KHÔNG là tab riêng. Discovery integrate vào HOME stream:
- Mỗi 5-7 posts → 1 discovery card
- Discovery card visually distinct (subtle border, "Suggested" tag)
- Format types:
  - Suggested Resonance (people)
  - Circle suggestion
  - Topic exploration (based on user ENTA)

CẤM:
- Trending tab
- Explore tab với grid of viral content
- Sponsored discovery
- "Recommended for you" algorithm dark patterns

---

## §9 NOTIFICATION

### §9.1 Notification bell (Top Bar PHẦN 2 right side)

- Bell icon 🔔
- Badge với count (max display "9+")
- Tap → mở notification overlay (fade in 200ms)

### §9.2 Notification types

**Allowed (value-bearing):**
- Someone connected with you
- Someone reacted to your post (with ngũ hành element)
- Someone quoted your post (with QOT trace)
- AIER message in chat (Trusted Connect only)
- Circle invite
- Booking confirmation
- U-Reward earned (small notification + pill update)

**KHÔNG allowed:**
- "X is now active" (presence spam)
- "Someone liked X's post" (third-party engagement)
- "Trending in your area" (no trending)
- "You haven't posted in X days" (engagement bait)
- Marketing notifications

### §9.3 Notification UX

```
┌─────────────────────────────────────┐
│ [✕]   Notifications        [Clear] │
├─────────────────────────────────────┤
│                                     │
│  [👤] Elsa connected with you       │
│       2 minutes ago                 │
│                                     │
│  [👤] Marcus reacted Mộc to your    │
│       post about meditation         │
│       1 hour ago                    │
│                                     │
│  [⭕] Circle "Forest" invited you   │
│       3 hours ago                   │
│                                     │
│  [⚡] You earned +5 U for           │
│       contribution                  │
│       5 hours ago                   │
│                                     │
└─────────────────────────────────────┘
```

---

## §10 STATE LAW — 5 STATES PER COMPONENT

Mỗi UI component trong HOME PHẢI cover 5 state:

**§10.1 Loading** — Skeleton (không spinner full screen), shimmer 1.5s loop, match expected layout.

**§10.2 Empty** — Meaningful message, suggested action (1 primary CTA), light illustration.

**§10.3 Error** — Clear message, retry path explicit, KHÔNG technical error dump.

**§10.4 Active (default)** — Content rendered, ENTA-aware styling.

**§10.5 Disabled** — Lower opacity (0.5), tooltip explaining why.

---

## §11 OVERLAY LAYER — HOME-SPECIFIC

### §11.1 QOT trace sheet

Trigger: tap QOT icon (12px) on any post.

- Bottom sheet, 60% screen height
- Header: "Provenance Trace"
- Body: Source actor / Created timestamp / Trust chain (expandable) / Audit hash (collapsed)
- Footer: "View on QOT explorer" (link to QOT module)

### §11.2 Reaction wheel overlay

Trigger: long-press any post.

- Radial overlay over post
- 5 elements arranged in pentagon
- Drag-select to confirm
- Release outside = cancel
- Animation: 200ms fade-in, element color glow on hover

### §11.3 Compose overlay

Trigger: Floating + Button (Foundation PHẦN 3 context HOME).

Per §6 spec.

### §11.4 Connection action sheet

Trigger: tap user avatar in feed.

- Bottom sheet, 40% screen height
- Avatar + name + ENTA hint
- Resonance score
- Actions: Connect / Custom level / View profile / Send message / Block

### §11.5 Notification overlay

Trigger: tap bell icon Top Bar.

Per §9.3 spec.

### §11.6 Search overlay

Trigger: tap search icon Top Bar.

Per §8.2 spec.

---

## §12 MOTION + ANIMATION

### §12.1 Allowed motion

- Post slide-in on new post: 280ms ease-out
- Reaction confirm: element glow 400ms ease-out
- Connect/disconnect: subtle fade 200ms
- Pull to refresh: spring-back 300ms
- Compose overlay slide: 320ms ease-out (full-screen takeover)
- QOT sheet slide-up: 240ms ease-out
- Reaction wheel: fade-in 200ms

### §12.2 Forbidden motion

- ❌ Auto-play video on scroll (CRITICAL — addiction trigger)
- ❌ Auto-loop animation
- ❌ Bouncy spring overshoot
- ❌ Flash/blink effects
- ❌ Confetti on actions
- ❌ Fireworks on milestones
- ❌ Animation > 400ms (except onboarding wow)

### §12.3 Reduced motion respect

- Detect `prefers-reduced-motion`
- Disable all non-essential animation
- Replace với instant state change

---

## §13 REDLINES — HARD RULES

### §13.1 CRITICAL (immediate halt)

- ❌ KHÔNG biến HOME thành dopamine social network
- ❌ KHÔNG reward engagement rỗng
- ❌ KHÔNG content vô danh (QOT mandatory)
- ❌ KHÔNG Like system cũ (chỉ ngũ hành)
- ❌ KHÔNG ranking theo viral/trending
- ❌ KHÔNG card UI nặng (chỉ flow)
- ❌ KHÔNG auto-play video
- ❌ KHÔNG sponsored / ad content
- ❌ KHÔNG status box cố định
- ❌ KHÔNG follower count public

### §13.2 HIGH

- ❌ KHÔNG follower = authority signal
- ❌ KHÔNG trending hashtags
- ❌ KHÔNG spam compose prompts
- ❌ KHÔNG UI nghiện
- ❌ KHÔNG hide AIER posts như human posts
- ❌ KHÔNG public reaction list
- ❌ KHÔNG infinite scroll without value filter

### §13.3 MEDIUM

- ❌ KHÔNG animation quá đà
- ❌ KHÔNG overload thông tin trong post
- ❌ KHÔNG desktop-style multi-column (Foundation rule)
- ❌ KHÔNG emoji-only reaction

---

## §14 ACCESSIBILITY

### §14.1 Color contrast
- Text vs background: ≥ 4.5:1 (WCAG AA)
- ENTA element colors có alternate symbol cho color-blind users
- High contrast mode toggle (Avatar Menu → Theme)

### §14.2 Screen reader
- Mỗi post có ARIA label đầy đủ: actor, content, QOT status
- Reactions navigable via keyboard
- QOT trace sheet ARIA live region

### §14.3 Keyboard navigation (desktop fallback)
- Tab through posts
- Enter on post → expand
- R key → react (open wheel)
- C key → compose
- / key → search
- N key → notifications

### §14.4 Touch targets
- Minimum 44px × 44px
- Spacing ≥ 8px
- Reaction icons: 16px visual, 44px tap zone

---

## §15 INTEGRATION VỚI MODULE KHÁC

**§15.1 HOME → CHAT** — Tap user avatar in stream → action sheet → "Send message" (if Trusted Connect) → CHAT shell mounts với DM thread mở.

**§15.2 HOME → PLUS** — Tap circle suggestion card → if circle-related action needed → PLUS Hub mở relevant mini app (Circle Business mini app).

**§15.3 HOME → WALLET** — Post với +U signal → tap "+5" → WALLET shell mounts với U history filter on this post.

**§15.4 HOME → ENTA** — Tap user avatar (in feed, not menu) → ENTA shell mounts với that user's identity profile.

**§15.5 HOME → U-Reward** — Daily check-in card in stream → tap → U-Reward mini app full-screen. Action posts → +U signal aggregates.

**§15.6 HOME → TAO** — Post với TAO context (shared Bazi/Tử Vi reading) → tap → TAO mini app opens với shared chart context.

**§15.7 HOME → AIER** — AIER posts in stream → tap "Governed Entity" badge → AIER profile in PLUS Hub > AIER mini app.

---

## §16 V2 → V3 MIGRATION PATH

### §16.1 V2 current state (per Cursor audit 2026-04-30)

- `/dashboard` is current home surface
- `FlowFeedPage.jsx` exists but NOT mounted (Gap G18)
- No ngũ hành reactions (uses standard like/comment)
- Card-heavy UI
- No QOT visible per post
- Anonymous content allowed
- Status box visible at top
- Numeric like counts shown

### §16.2 V3 implementation order

1. **Mount root path:** Make `/` route to HOME shell (not `/dashboard`)
2. **Build HOME shell** với Foundation 4 phần cố định
3. **Build `<Post>` component** với ENTA ring + QOT trace icon
4. **Build `<NguHanhReaction>` component** (5 elements + radial wheel)
5. **Replace existing like system** với ngũ hành migration
6. **Build `<SuggestedResonance>` card** integrated trong feed
7. **Build compose overlay** với QOT mandatory
8. **Deprecate "follower" terminology** toàn hệ → "connection"
9. **Migrate `/dashboard` redirect** → `/`
10. **Remove status box** ở top feed
11. **Add value ranking algorithm** (4-layer)
12. **Hide raw like counts** → aggregate sentiment display

### §16.3 V3 Phase 2 mockup priorities

| Priority | Mockup |
|---|---|
| 1 | HOME shell với 4 phần cố định + empty state |
| 2 | Value Stream với 5 sample posts (mixed content types) |
| 3 | Post component chi tiết (Avatar/QOT/Ngũ Hành/+U) |
| 4 | Reaction wheel overlay |
| 5 | Suggested Resonance card |
| 6 | Compose overlay full flow |
| 7 | QOT trace sheet |
| 8 | Notification overlay |
| 9 | Search overlay |
| 10 | Connection action sheet |

---

## §17 SUCCESS METRICS

HOME thành công nếu:

**Behavioral signals (good):**
- User contribute (post value-bearing) > consume (passive scroll)
- Resonance Connect > Open Connect ratio tăng
- Ngũ hành reactions distributed (no single element dominant)
- QOT trace clicks > reaction clicks (trust > popularity)
- Compose count steady (intentional, not reactive spike)

**Anti-signals (failure indicators):**
- Average session length tăng vô lý (= addiction loop)
- "Trending" content emergent (= we accidentally built engagement)
- User complain "too quiet" (= ranking too restrictive)
- Anonymous post requests (= QOT friction too high)
- Reaction count visible bypass (= we leaked popularity signal)

---

## §18 KẾT LUẬN — 5 CÂU KHÓA

**1. HOME shell = X.com inspiration + Value Stream logic. Vào uzg.plus = HOME default.**

**2. Feed = Value Stream (4-layer ranking: ENTA fit + QOT trust + Value signal + Context).**

**3. Interaction = Ngũ Hành (Kim/Thủy/Mộc/Hỏa/Thổ) — KHÔNG Like.**

**4. Connection = Resonance — KHÔNG Follow. Suggested Resonance integrated trong feed.**

**5. Compose qua Floating + Button (Foundation PHẦN 3) — full-screen mode, QOT mandatory.**

---

## §19 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ Foundation OS Canon + 13 file canon cũ + Cursor V2 audit |

---

🔒 UZG+ V3 PWA OS — HOME/Social Module Canon v1.0
End of file.
