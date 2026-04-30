# UZG+ V3 PWA OS — CHAT MODULE CANON

**Document ID:** `UZG_PLUS_V3_UIUX_CHAT_CANON_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (Module-specific, governed by Foundation OS Canon Tier 3)
**Module:** CHAT (Bottom Nav position #2)
**Inspiration shell:** Telegram messenger (Mobile + Web K/Z)
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1` ← MUST read first
- Tier 3: `UZG_PLUS_UIUX_DESIGN_SYSTEM_CANON_v1` (tokens)
- Tier 3: `UZG_PLUS_UIUX_COMPONENT_LIBRARY_SPEC_v1`
- Tier 2: HUMAN_VALUE_CANON, IDENTITY_CANON, TRUTH_TRUST_CANON

**Companion canons:** HOME, PLUS Hub, WALLET, ENTA, U-Reward, TAO, REDLINES_MASTER

---

## §0 PURPOSE

Khóa UI/UX cho **CHAT shell** — module giao tiếp + execution layer của UZG+. CHAT inherit Telegram-style messenger pattern (real-time, mobile-first, gesture-rich) nhưng nâng cấp message thành value-unit, room thành business operating space, bot thành governed AIER entity.

CHAT KHÔNG chỉ là messaging tool. CHAT là **Execution Layer của Value** — nơi Connection → Trust → Value → Action xảy ra.

**Quan trọng:** File này CHỈ describe nội dung CHAT shell. 4 phần cố định (Bottom Nav, Top Bar Avatar, Floating +, U-Reward pill) đã spec trong Foundation Canon — không lặp lại.

---

## §1 ĐỊNH NGHĨA

### §1.1 Câu định nghĩa official

**CHAT = Communication Core + Execution Layer của UZG+ OS. CHAT shell theo Telegram-mobile pattern (Inbox → Room → Info), nâng cấp message thành value-unit (QOT-bound), AIER thành governed entity, room thành business operating space tích hợp CRM/booking/payment.**

### §1.2 4 câu khóa

**1. Chat = Execution Layer của Value, không phải messaging tool.**
**2. Message = Value Unit, không phải Text Unit.**
**3. AIER = Governed Execution Entity, không phải Chatbot.**
**4. Room = Operating Node (business + community + value), không phải Conversation Box.**

### §1.3 Vào CHAT thấy gì

Khi user tap CHAT bottom nav:
- HOME unmount (fade out 200ms)
- CHAT shell mount (slide in 200ms)
- Top Bar title đổi: "Chat"
- Floating + Button context đổi: "Chat mới"
- Bottom Nav stays (CHAT active)
- U-Reward pill stays
- Main canvas = Chat List (inbox)

KHÔNG còn thấy: HOME feed, Wallet balance, ENTA wheel, etc. (per Foundation §2.2 module isolation rule).

### §1.4 Khác biệt với Telegram

| Telegram | UZG+ CHAT |
|---|---|
| Chat để nói chuyện | Chat để vận hành value |
| Message = text | Message = value unit (QOT-bound) |
| Room = conversation | Room = business / value space |
| Bot = automation tool | AIER = governed execution entity |
| Reaction = emoji | Reaction = ngũ hành energy signal |
| Anonymous OK | QOT mandatory cho value-bearing messages |
| Chat tách rời economy | Chat = Circle Business OS tích hợp |

---

## §2 SHELL ARCHITECTURE — CHAT

### §2.1 3 surface — Inbox → Room → Info (locked flow)

CHAT shell có 3 surfaces theo flow Telegram cố định, KHÔNG đảo:

**Surface 1: Inbox (Chat List)**
Default landing khi vào CHAT.

**Surface 2: Room (Chat Room)**
Tap chat item → enter Room.

**Surface 3: Info (Chat Info)**
Tap header trong Room → mở Info panel.

```
[CHAT tap] → Inbox → [tap chat] → Room → [tap header] → Info
                ↑                    ↑                      ↑
             Avatar tap          Back button          Back button
```

### §2.2 Surface 1 — Inbox (Chat List)

```
┌─────────────────────────────────────┐
│ [Avatar]  Chat       [🔍] [📁]      │  ← PHẦN 2 Top Bar
│                          ┌────────┐ │
│                          │⚡U:1250│ │  ← PHẦN 4 U-Reward pill
│                          └────────┘ │
├─────────────────────────────────────┤
│ Search chats... (sticky)            │  ← Search bar (sticky)
├─────────────────────────────────────┤
│ [Tabs: All | DM | Circles | AIER]   │  ← Filter tabs
├─────────────────────────────────────┤
│                                     │
│ [👤] Elsa                    2m  ⚡ │  ← Chat item
│  Hỏa-Mộc · 83% resonance            │
│  "Đã book retreat tháng 5..."       │
│  ─────────────────────────────────  │
│ [⭕] Forest Circle           1h     │
│  Circle · 47 members                │
│  Marcus: "Buổi thiền sáng nay..."   │
│  ─────────────────────────────────  │
│ [🤖] AIER Tao              3h  📌  │  ← AIER pinned
│  Governed Entity · Advisor          │
│  "Lá số tháng 5 của bạn..."         │
│  ─────────────────────────────────  │
│ [🏢] Garden Bay Spa         Yesterday│
│  Business · 12 active rooms         │
│  System: "Booking confirmed..."     │
│                                     │
│                              ┌───┐  │
│                              │ + │  │  ← PHẦN 3 Floating +
│                              └───┘  │
├─────────────────────────────────────┤
│  HOME  CHAT  [UZG+]  WALLET  ENTA  │  ← PHẦN 1 Bottom Nav
└─────────────────────────────────────┘
```

### §2.3 Surface 2 — Room (Chat Room)

```
┌─────────────────────────────────────┐
│ [←]  [👤] Elsa             [···]   │  ← Top Bar (Room context)
│       Hỏa-Mộc · online              │
├─────────────────────────────────────┤
│                                     │
│  [Today]                            │
│                                     │
│  ┌──────────────────────┐           │
│  │ Chào em, retreat     │           │  ← Their message (left)
│  │ tháng 5 còn slot ko? │           │
│  │              10:24  │           │
│  └──────────────────────┘           │
│                                     │
│            ┌──────────────────────┐ │
│            │ Còn 3 slot anh nhé   │ │  ← Your message (right)
│            │ Mộc retreat 12-14/5  │ │
│            │ [QOT 🔍]      10:25 ✓│ │
│            └──────────────────────┘ │
│                                     │
│  ┌──────────────────────┐           │
│  │ Em book 1 slot nhé   │           │
│  │ ⚡+5 (value action)   │           │
│  │              10:26   │           │
│  └──────────────────────┘           │
│                                     │
├─────────────────────────────────────┤
│ [📎] [Type message...]   [🤖] [→]  │  ← Composer dock
├─────────────────────────────────────┤
│  HOME  CHAT  [UZG+]  WALLET  ENTA  │  ← Bottom Nav (still visible)
└─────────────────────────────────────┘
```

**Note:** Telegram pattern hides bottom nav trong Room. UZG+ giữ bottom nav để user dễ navigate cross-module. NTS có thể quyết hide nếu muốn focus.

### §2.4 Surface 3 — Info Panel

```
┌─────────────────────────────────────┐
│ [←]  Chat Info               [⚙️]  │
├─────────────────────────────────────┤
│                                     │
│         [Avatar 96px]               │
│         Elsa @elsa                  │
│         Hỏa-Mộc · Âm Nữ             │
│         83% resonance               │
│                                     │
│  ─────────────────────────────────  │
│  ENTA Profile          [View →]    │
│  Trust level: Trusted Connect       │
│  Connected: 2 months                │
│  Mutual circles: 3                  │
│                                     │
│  ─────────────────────────────────  │
│  Business Actions (if applicable):  │
│    📅 Booking history (2)           │
│    💎 Membership: Builder           │
│    💰 Transaction history (5)       │
│    📋 CRM notes                     │
│                                     │
│  ─────────────────────────────────  │
│  Chat Settings:                     │
│    🔔 Notifications: On             │
│    📌 Pin chat                      │
│    🗂️ Archive                        │
│    🚫 Block                         │
│    🗑️ Clear history                 │
│                                     │
└─────────────────────────────────────┘
```

---

## §3 CHAT TYPES — 4 LOẠI

### §3.1 DM (Direct Message)

- 1-on-1 conversation
- Chỉ giữa 2 users với Trusted Connect level
- KHÔNG cho Open Connect (privacy)
- ENTA-aware (resonance score visible in info)

### §3.2 Circle Chat

- Multi-user conversation trong circle
- Inherit circle membership
- Visibility: chỉ circle members
- Roles: Member / Moderator / Founder

### §3.3 AIER Chat

- Conversation với AIER (governed entity)
- AIER có identity rõ ràng + role (Concierge / Sales / Ops / Advisor)
- AIER label: "Governed Entity"
- Always visible distinct visual treatment

### §3.4 Business Chat

- Conversation với business circle (vendor/service provider)
- Tích hợp CRM + booking + payment
- Multi-room cho business: General / Booking / Support / etc.
- Right sidebar (swipe) reveal business operations

---

## §4 LUẬT MESSAGE — VALUE UNIT

### §4.1 Message structure (mandatory)

```
┌──────────────────────────────────┐
│ [Avatar 32px]                    │
│  Name · ENTA hint · Time         │
│                                  │
│  Message content (text/media)    │
│                                  │
│  [QOT 🔍] [Ngũ hành reactions]  │
│  [⚡+U if value-bearing]          │
└──────────────────────────────────┘
```

### §4.2 Avatar

- Round, 32px (room view), 40px (info)
- ENTA ring color
- Group chat: avatar appears on first message của mỗi sender (Telegram pattern)
- Subsequent consecutive messages: no avatar repeat

### §4.3 QOT trace (value-bearing messages)

Messages quan trọng PHẢI có QOT icon:
- Booking/payment confirmations
- Deal/contract messages
- AIER advisory messages
- Cross-referenced quotes

KHÔNG cần QOT cho:
- Casual chat ("OK", "Cảm ơn")
- Emoji-only messages
- Quick acknowledgments

QOT click → mở provenance sheet (giống HOME §11.1).

### §4.4 Actor attribution — 3 loại

| Actor | Visual marker |
|---|---|
| Human | Avatar normal + name |
| AIER | Avatar + AIER badge + "Governed Entity" label đỏ/vàng đặc biệt |
| System | System icon + neutral border |

CẤM: Anonymous message / Hidden sender / Mixing AIER messages như human messages.

### §4.5 Message types

| Type | Allowed | Rule |
|---|---|---|
| Text | ✅ | VN/EN/TH/FIL, max 4000 chars |
| Image | ✅ | 1-10 images, lazy-load |
| Video | ✅ | Inline player, tap to play |
| Voice message | ✅ | Audio waveform display |
| File attachment | ✅ | Document, max 50MB |
| Location | ✅ | Map preview |
| Booking link | ✅ | Inline card với CTA |
| Payment request | ✅ | Inline card với amount + currency |
| Quote message | ✅ | Quoted message inline |
| Poll | ✅ | 2-10 options |
| Sticker | ✅ | Static only, no animation |
| GIF | ❌ | Disabled (engagement bait) |
| Disappearing message | ❌ | Conflicts với QOT permanence |

### §4.6 Message states

- Sent (✓ single check)
- Delivered (✓✓ double check)
- Read (✓✓ blue or ENTA element color)
- Failed (⚠️ retry icon)
- Edited (small "(edited)" tag)
- Deleted (placeholder "Message deleted")

### §4.7 Message tap behavior

- Tap message → no action (default)
- Long press → action menu (Reply / Forward / Copy / Edit / Delete / React)
- Swipe right → quick reply
- Swipe left → quick forward (Trusted Connects only)
- Tap QOT icon → provenance sheet
- Double tap → quick ngũ hành Hỏa reaction (most common)

---

## §5 LUẬT INTERACTION — NGŨ HÀNH REACTION

### §5.1 Same as HOME §5

5 elements: Kim / Thủy / Mộc / Hỏa / Thổ (per HOME canon §5.2).

### §5.2 Reaction UX trong Chat Room

**Quick tap:**
- Long press message → reaction wheel (5 elements pentagon)
- Drag-select → confirm
- Animation: element glow on message

**Display:**
- Reaction icons appear below message
- Aggregate display: "3 Mộc, 1 Hỏa"
- Click → list reactors (only in DM/Circle if user is member)

### §5.3 +U signal trong Chat

Messages tạo real value get +U:
- Booking confirmation = +U for both parties
- Deal closed = +U
- Successful introduction = +U for matchmaker
- AIER advisory leading to action = +U

Visual: ⚡+5 inline với message timestamp.

KHÔNG +U khi:
- Casual chat
- Emoji-only
- Spam-like patterns

---

## §6 AIER TRONG CHAT — GOVERNED ENTITY

### §6.1 AIER KHÔNG phải chatbot

AIER là **governed intelligence entity** với:
- Identity rõ ràng (UDNA-bound)
- Role specific (Concierge/Sales/Ops/Advisor/Tao)
- Ethics constraints (per AIER canon)
- Audit log (per QOT canon)
- Human oversight (Human = Authority)

### §6.2 AIER UI treatment

Mọi AIER message phải có:
- Avatar với AIER badge (distinctive icon)
- Label: "Governed Entity" (subtle, không to)
- Border color: ENTA element của AIER's domain
- Provenance: visible từ AIER name

### §6.3 AIER roles

| Role | Function | Example use |
|---|---|---|
| **Concierge** | General assistance | Answer questions about UZG+ |
| **Sales** | Suggest products/services | Recommend retreats based on ENTA |
| **Ops** | Operational tasks | Booking confirmation, scheduling |
| **Advisor** | Domain expert advice | TAO Advisor, Wisdom AI |
| **Tao** | Bazi/Tử Vi/Phong Thủy specific | Chart reading, advisory |

### §6.4 AIER PHẢI

- Identify mình rõ at conversation start
- Reference QOT chain khi đưa advice
- Acknowledge limits ("I'm an AIER, my advice is advisory")
- Handoff to human khi vượt scope
- Maintain consistent persona (governed)

### §6.5 AIER KHÔNG ĐƯỢC

- Pretend là human (CRITICAL)
- Make autonomous decisions affecting user value
- Push transactions (payment, subscription) without explicit user consent
- Manipulate emotionally (urgency-fear, FOMO)
- Override Human Authority

### §6.6 AIER xuất hiện khi

- User tap AIER chat trong inbox
- User invoke AIER trong existing chat (composer "🤖" button)
- Context-triggered (e.g. user asks question matches AIER domain)
- KHÔNG always-on / KHÔNG spam DM

### §6.7 AIER invocation in DM/Circle chat

Trong DM hoặc Circle chat (human conversations), user có thể invoke AIER:

```
1. Tap "🤖" button trong composer dock
2. Select AIER (Concierge / Sales / Ops / Advisor / Tao)
3. AIER joins as participant với "Governed Entity" badge
4. AIER message visible to all chat members
5. Other humans can ask AIER follow-up
6. User can dismiss AIER any time (keeps message history)
```

---

## §7 CIRCLE BUSINESS CHAT OS

### §7.1 Business Chat = Operating Node

Business Chat KHÔNG chỉ là group chat. Là:
- **Communication layer** (general chat)
- **CRM layer** (member segmentation, notes)
- **Booking layer** (calendar, slots)
- **Ticket layer** (tracked requests)
- **Event layer** (announcements, RSVP)
- **Payment layer** (transactions)

Tất cả integrated trong 1 Chat surface.

### §7.2 Business Chat Architecture

```
[Business Chat Room]
   |
   ├─ [General chat] (default view)
   ├─ [Sidebar] (swipe right → reveal)
   |     ├─ Members (segmented: lead/customer/vip)
   |     ├─ CRM notes
   |     ├─ Booking calendar
   |     ├─ Active tickets
   |     ├─ Events (upcoming/past)
   |     └─ Transactions
   └─ [Info panel] (tap header)
```

### §7.3 Sidebar — Business Operations

Swipe right từ chat → reveal sidebar (60% screen width).

```
┌─────────────────────────────────────┐
│ Garden Bay Spa                      │
│  47 members · 12 active             │
│  ─────────────────────────────────  │
│                                     │
│  Members                            │
│  ─ Leads (8)                        │
│  ─ Customers (32)                   │
│  ─ VIP (7)                          │
│                                     │
│  CRM                                │
│  ─ Active conversations (12)        │
│  ─ Notes & tags                     │
│                                     │
│  Booking                            │
│  ─ Today (3 bookings)               │
│  ─ This week (15)                   │
│  ─ Calendar →                       │
│                                     │
│  Tickets                            │
│  ─ Open (2)                         │
│  ─ Resolved (45)                    │
│                                     │
│  Events                             │
│  ─ Mộc Retreat - May 12             │
│  ─ Past events (8)                  │
│                                     │
│  Transactions                       │
│  ─ This month: $3,240 USDc          │
│  ─ All transactions →               │
│                                     │
└─────────────────────────────────────┘
```

### §7.4 Business Chat flow

```
Member sends DM → Business Chat
      ↓
Business owner sees + responds
      ↓
Trust built → Move to Booking
      ↓
Booking confirmed → +U for both + payment via Wallet
      ↓
Service delivered → Experience
      ↓
Review/feedback → QOT chain
```

### §7.5 Multi-room business

Large business có thể có multi-room within 1 Chat node:
- General (announcements, public)
- Booking (booking-specific)
- Support (customer support)
- VIP (premium members)
- Events (event-specific)

User sees rooms via Info panel "Rooms" section.

---

## §8 LUẬT COMPOSE — MESSAGE COMPOSITION

### §8.1 Composer dock (always visible in Room)

```
┌─────────────────────────────────────┐
│ [📎]  [Type message...]   [🤖] [→] │
└─────────────────────────────────────┘
```

Components:
- 📎 Attachment (image/video/file/location/booking/payment)
- Text input (auto-grow up to 5 lines, then scroll)
- 🤖 AIER invoke button
- → Send button (or 🎤 Voice if input empty)

### §8.2 Attachment types

Tap 📎 → bottom sheet:
- 🖼️ Photo / Video
- 📄 Document
- 📍 Location
- 📅 Booking link (for business chats)
- 💰 Payment request (for business chats)
- 📊 Poll
- 🎵 Voice message

### §8.3 Voice message

- Press and hold 🎤 → record
- Release → send
- Slide left → cancel
- Visual: waveform animated during recording
- Playback: tap → play, tap again → pause
- Speed: 1x / 1.5x / 2x options

### §8.4 Quick reply

- Swipe right on any message → composer focuses with quoted message
- Quoted message visible above input
- Tap × on quote → cancel reply

### §8.5 Edit/Delete

- Long press own message → action menu
- Edit: edit within 24h, "(edited)" tag added
- Delete: option "Delete for me" / "Delete for everyone" (within 24h)

### §8.6 Floating + Button (Foundation PHẦN 3) trong CHAT

CHAT context = "Chat mới":
- Tap + → bottom sheet "Start new chat"
- Options:
  - 👤 New DM (search user)
  - ⭕ New Circle chat (select circle, must be founder/mod)
  - 🤖 Talk to AIER (select AIER)
  - 🏢 Browse Businesses (open PLUS Hub > Business mini app)

---

## §9 LUẬT REAL-TIME

### §9.1 Real-time priority

CHAT phải feel native. Performance priority:
- Message send latency < 200ms
- Receive latency < 500ms
- Typing indicator instant
- Online status real-time

### §9.2 Connection states

User sees connection state in Top Bar (Room view):
- "online" — currently active
- "last seen 5m ago"
- "last seen yesterday"
- "last seen recently" (privacy fallback)
- "offline"

User can disable last-seen sharing (Privacy settings).

### §9.3 Typing indicator

- Show "typing..." khi other party đang gõ
- Hide sau 3s no activity
- Group chat: "Elsa, Marcus typing..."

### §9.4 Read receipts

- ✓ sent
- ✓✓ delivered
- ✓✓ (colored) read
- User can disable read receipts (Privacy)
- Group chat: read count visible (e.g. "Read by 5/10")

### §9.5 Offline mode

- Messages compose offline → queued
- Send when reconnect
- Visual: ⏳ icon for pending messages
- Failed messages: ⚠️ retry option

---

## §10 NOTIFICATION

### §10.1 Notification types (chat-specific)

**Allowed:**
- New DM from connection
- @mention in circle/business chat
- AIER advisory message
- Booking confirmation
- Payment request received
- Event reminder

**Conditional:**
- Circle chat messages (user can mute per-circle)
- Business chat messages (user can mute per-business)

**KHÔNG allowed:**
- "X is typing..." (presence spam)
- "X joined the chat" (group event spam, unless admin)
- Marketing notifications
- "You haven't checked X chat" (engagement bait)

### §10.2 Notification settings

Per-chat settings (Info panel → Notifications):
- All messages
- Mentions only
- Off

Quiet hours (System tray → settings):
- Schedule (e.g. 22:00-07:00 no notifications)
- DND mode (manual toggle)

---

## §11 SEARCH

### §11.1 Search bar (Inbox sticky)

Top Bar Inbox: search bar sticky below top bar.

### §11.2 Search scope

User search:
- Chat name (DM/Circle/Business/AIER)
- Message content (full-text within accessible chats)
- Members (who's in which chat)
- Files (search attachments)

### §11.3 Search overlay

```
┌─────────────────────────────────────┐
│ [✕]  🔍 Search chat...              │
├─────────────────────────────────────┤
│ Recent: meditation, garden          │
│                                     │
│ Categories:                         │
│  💬 Chats                           │
│  💭 Messages                        │
│  📁 Files                           │
│  👥 People                          │
│                                     │
└─────────────────────────────────────┘
```

---

## §12 STATE LAW — 5 STATES PER COMPONENT

**§12.1 Loading** — Skeleton chat list, shimmer 1.5s

**§12.2 Empty** — "No chats yet" + suggested action "Start with Suggested Resonance"

**§12.3 Error** — Connection issue indicator, retry path

**§12.4 Active** — Default chat list/room

**§12.5 Disabled** — Blocked user / archived chat (lower opacity)

---

## §13 OVERLAY LAYER — CHAT-SPECIFIC

### §13.1 QOT trace sheet
Per HOME §11.1 — same pattern.

### §13.2 Reaction wheel
Per HOME §11.2 — long-press message.

### §13.3 Business sidebar
Swipe right in business chat → reveal sidebar (§7.3).

### §13.4 Action menu (long-press message)
- Reply
- Forward
- Copy
- Edit (own message, < 24h)
- Delete
- React (open wheel)
- Pin (admin only)
- Report

### §13.5 Attachment sheet
Per §8.2 — bottom sheet.

### §13.6 AIER invocation sheet
Per §6.7 — bottom sheet to select AIER.

### §13.7 New chat overlay
Per §8.6 — Floating + tap.

---

## §14 MOTION + ANIMATION

### §14.1 Allowed

- Message slide-in: 200ms ease-out
- Composer expand: 150ms
- Sidebar swipe: 280ms ease-out
- Reaction wheel: 200ms fade-in
- Voice waveform: real-time
- Typing indicator: gentle pulse

### §14.2 Forbidden

- ❌ Auto-play voice messages on scroll
- ❌ Animation > 400ms
- ❌ Bouncy spring overshoot
- ❌ Confetti on send
- ❌ "Message sent" celebration animation

---

## §15 REDLINES

### §15.1 CRITICAL

- ❌ Chat KHÔNG được chỉ là messaging tool (must support value execution)
- ❌ AIER KHÔNG được pretend là human
- ❌ Anonymous message KHÔNG cho phép cho value-bearing communications
- ❌ KHÔNG QOT cho booking/payment/deal messages
- ❌ KHÔNG biến chat thành spam loop
- ❌ KHÔNG read message data cross-Lane (privacy)
- ❌ KHÔNG store messages plaintext on server (E2E for DM)

### §15.2 HIGH

- ❌ Emoji-only reactions (chỉ ngũ hành)
- ❌ Bot spam patterns
- ❌ Always-on AIER (DM)
- ❌ Tách chat khỏi business operations
- ❌ Disappearing messages (provenance break)
- ❌ Anonymous group chat
- ❌ Public chat history (default private)

### §15.3 MEDIUM

- ❌ Animation quá đà
- ❌ UI nặng
- ❌ Desktop sidebar layout
- ❌ Notification spam

---

## §16 ACCESSIBILITY

### §16.1 Screen reader
- Each message ARIA label: sender, content, timestamp, QOT status
- Reactions navigable
- Composer accessible

### §16.2 Keyboard navigation
- Tab through chats in inbox
- Enter to open chat
- Esc to back
- Cmd+K / Ctrl+K to search
- Cmd+/ / Ctrl+/ for shortcuts help

### §16.3 Voice messages
- Auto-transcribe option (premium)
- Playback controls accessible
- Captions for video messages

### §16.4 High contrast
- ENTA ring có alternate symbol
- Reaction colors có alternate icon

---

## §17 INTEGRATION VỚI MODULE KHÁC

**§17.1 CHAT → HOME** — Tap user avatar in chat → ENTA shell mounts với that profile (or HOME post search filtered to that user).

**§17.2 CHAT → PLUS** — Business chat sidebar → "Browse circle apps" → PLUS Hub > Business mini app.

**§17.3 CHAT → WALLET** — Payment request message → tap → WALLET shell mounts với transaction confirmation. Booking message → tap → Wallet pending.

**§17.4 CHAT → ENTA** — Tap user avatar in chat header → ENTA shell với that user profile.

**§17.5 CHAT → U-Reward** — Earn +U for value-bearing messages → pill animates. Tap pill → U-Reward mini app.

**§17.6 CHAT → TAO** — TAO advisory chart shared in chat → tap → TAO mini app với shared chart.

**§17.7 CHAT → AIER** — AIER messages in chat → tap badge → AIER profile in PLUS Hub.

---

## §18 V2 → V3 MIGRATION PATH

### §18.1 V2 current state (per Cursor audit)

- `/chat/:id` and `/inbox/direct/:id` duplicate routes (G07 gap)
- `InboxPage`, `DirectMessageThreadPage`, `ChatRoomInfoPage` exist
- Telegram-style not implemented (basic chat only)
- No ngũ hành reactions
- No QOT in messages
- AIER chat exists but no clear "Governed Entity" treatment
- Business CRM not integrated into chat
- Sidebar feature missing

### §18.2 V3 implementation order

1. **Resolve duplicate routes** — Deprecate `/inbox/direct/*` → `/chat/*` (G07 fix)
2. **Build CHAT shell** với Foundation 4 phần cố định
3. **Build Inbox surface** (chat list with filter tabs)
4. **Build Room surface** (Telegram-style messaging)
5. **Build Info surface** (chat info + business operations)
6. **Build `<Message>` component** với QOT + ENTA ring
7. **Build `<NguHanhReaction>` for messages** (reuse from HOME)
8. **Implement AIER governed entity treatment** (badge, label, role)
9. **Build business sidebar** (swipe-reveal CRM/booking/etc.)
10. **Build composer dock** với attachment/AIER/voice
11. **Real-time WebSocket** for typing/online/messages
12. **Migrate existing chat data** to new schema

### §18.3 V3 Phase 2 mockup priorities

| Priority | Mockup |
|---|---|
| 1 | CHAT Inbox shell với filter tabs |
| 2 | Chat list item (DM/Circle/AIER/Business variants) |
| 3 | Chat Room view với message bubbles |
| 4 | Message component (QOT/Ngũ Hành/+U) |
| 5 | Composer dock (attachments expanded) |
| 6 | AIER chat thread (governed entity treatment) |
| 7 | Business chat với sidebar revealed |
| 8 | Info panel |
| 9 | Voice message recording UX |
| 10 | New chat overlay |

---

## §19 SUCCESS METRICS

CHAT thành công nếu:

**Behavioral signals (good):**
- Trusted Connect chats > Open Connect chats
- Booking/payment messages có QOT verified
- AIER advisory leading to action (+U signal)
- Business chats với active CRM integration usage
- Voice messages used appropriately (not spam)

**Anti-signals (failure):**
- Spam patterns emerging
- Anonymous business chat requests (= QOT friction)
- AIER mistaken as human (= attribution failure)
- Chat session length tăng without value (= addiction loop)
- Disappearing message requests (= provenance break attempt)

---

## §20 KẾT LUẬN — 5 CÂU KHÓA

**1. CHAT shell = Telegram-mobile pattern (Inbox → Room → Info), KHÔNG đảo flow.**

**2. Message = Value Unit (QOT-bound), không phải Text Unit.**

**3. AIER = Governed Execution Entity (badge, role, audit), không phải chatbot.**

**4. Room = Operating Node — DM/Circle/AIER/Business — Business room tích hợp CRM/booking/payment.**

**5. Reaction = Ngũ Hành (giống HOME), +U cho value-bearing messages.**

---

## §21 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ Foundation OS + 13 file canon cũ + Cursor V2 audit |

---

🔒 UZG+ V3 PWA OS — CHAT Module Canon v1.0
End of file.
