# UZG+ V3 PWA OS — CHAT UX FLOW SPEC

**Document ID:** `UZG_PLUS_V3_UX_CHAT_FLOW_SPEC_v1`
**Version:** v1.0
**Created:** 2026-04-30
**Authority:** Tier 4 (UX layer — implements CHAT UI canon)
**Module:** CHAT (Bottom Nav position #2)
**Status:** DRAFT — pending NTS approval

**Parent docs:**
- Tier 3: `UZG_PLUS_V3_UIUX_FOUNDATION_OS_CANON_v1`
- Tier 4: `UZG_PLUS_V3_UIUX_CHAT_CANON_v1`
- Tier 3: `UZG_PLUS_V3_UIUX_REDLINES_MASTER_v1`

**Source evidence:** Cursor V2 audit (G07 duplicate routes), Whitepaper §4.2

---

## §0 PURPOSE

UX layer cho CHAT module — user journeys + state machines + decision points cho Inbox / Room / Info surfaces + 4 chat types (DM / Circle / AIER / Business).

---

## §1 USER JOURNEY MAP — CHAT LIFECYCLE

### §1.1 Master journey

```
[USER taps CHAT bottom nav]
        ↓
[Module isolation: HOME unmounts]
        ↓
[CHAT shell mount → Inbox surface (default)]
        ↓
[User actions:]
   ├─→ Tap chat → Room surface
   ├─→ Search chats → Search overlay
   ├─→ Filter tab (All / DM / Circles / AIER) → Filtered Inbox
   ├─→ Tap Floating + → New chat sheet
   ├─→ Tap Avatar → Avatar Menu (CHAT context)
   └─→ Tap UZG+/HOME/WALLET/ENTA → Cross-module exit
```

### §1.2 Journey segments — 8 chính

| # | Segment | Goal | Surfaces |
|---|---|---|---|
| **J1** | Inbox Browse | Scan chat list | Inbox |
| **J2** | Enter Room | Open chat | Inbox → Room |
| **J3** | Send Message | Compose + send | Room composer |
| **J4** | Receive Real-time | Get new message | Room WebSocket |
| **J5** | AIER Invocation | Talk to governed entity | Room (AIER) |
| **J6** | Business Operations | Use sidebar (CRM/booking/payment) | Room (Business) |
| **J7** | Chat Info | View metadata | Room → Info |
| **J8** | New Chat | Start fresh | Floating + → New chat |

---

## §2 ENTRY FLOWS

### §2.1 Inbox surface load (J1)

```
[CHAT shell mount]
      ↓
[Auth check (already done at OS level)]
      ↓
[API: fetch user's chat list]
      ↓
[Inbox state: LOADING (skeleton)]
      ↓ ≤1.5s typical
[Inbox state: LOADED]
      ↓
[Restore last filter tab if any]
      ↓
[Real-time WebSocket connect for live updates]
```

### §2.2 Inbox state machine

```
[INITIAL] → [LOADING] → [LOADED] | [ERROR] | [EMPTY]
                            ↓
                       [FILTERING] (filter applied)
                            ↓
                       [SEARCHING] (search active)
                            ↓
                       [LOADED] (back to default after clear)
```

### §2.3 Filter tabs flow

```
Tabs: [All | DM | Circles | AIER]

[Tap tab]
      ↓
[Active tab visually marked]
      ↓
[List filtered (instant, no API call)]
      ↓
[Empty state if no chats in filter]:
   ├─ All: "No chats yet" + [Start chat]
   ├─ DM: "No DMs" + [Find connections]
   ├─ Circles: "Not in any circle" + [Browse circles]
   └─ AIER: "No AIER chats" + [Browse AIER]
```

---

## §3 ENTER ROOM FLOW (J2)

### §3.1 Tap chat → Room transition

```
[User taps chat item in Inbox]
      ↓
[Mark unread → read (UI update)]
      ↓
[Room mount with slide-from-right transition 200ms]
      ↓
[Top Bar updates: Avatar + name + status (online/offline)]
      ↓
[Composer dock appears at bottom (replaces Bottom Nav OR overlays)]
      ↓ NOTE: Per CHAT canon §2.3 — bottom nav stays visible
      
[Message history loads]:
   ├─ Cached → instant render
   └─ Not cached → skeleton → API → render
      ↓
[Auto-scroll to last unread (or bottom if all read)]
      ↓
[Mark messages "read" via API + WebSocket emit]
```

### §3.2 Room state machine

```
[ENTERING] → [LOADED] | [ERROR] | [LIMITED]
                  ↓
            [TYPING] (composer focused)
                  ↓
            [SENDING] (message sent, not confirmed)
                  ↓
            [RECEIVING] (WebSocket new message)
                  ↓
            [LOADED] (idle steady state)
```

**LIMITED state:** chat with non-Trusted Connect user → composer disabled, banner "Connect at Trusted level to message"

### §3.3 Room exit flow

```
[User taps back arrow OR CHAT bottom nav]
      ↓
[Room state snapshot saved (scroll, composer draft)]
      ↓
[Outgoing transition slide-to-right 200ms]
      ↓
[Inbox surface restored]
      ↓
[WebSocket subscription for that room reduced (still listen for new messages, just not active)]
```

---

## §4 SEND MESSAGE FLOW (J3)

### §4.1 Compose lifecycle

```
[User taps text input]
      ↓
[Composer focuses, keyboard appears (mobile)]
      ↓
[User types content]
      ↓
[Auto-save draft per 5s (local only, per chat)]
      ↓
[Optional: tap 📎 attach OR 🤖 AIER]
      ↓
[Tap → (Send) OR Enter key]
      ↓
[Validation gate]
      ├─ Empty → button disabled
      ├─ Over char limit → block
      └─ Pass → submit
      ↓
[Optimistic UI: message appears in room with "sending..." state ✓]
      ↓
[Server confirms ≤500ms typical]
      ├─ Success: ✓ → ✓✓ delivered
      └─ Fail: ⚠️ retry icon, draft preserved
      ↓
[Composer clears, focus retained]
```

### §4.2 Message status state machine

```
[COMPOSING] → [SENDING] (✓ single check)
                  ↓
            [DELIVERED] (✓✓ double check)
                  ↓
            [READ] (✓✓ ENTA color)
            
ALT: [SENDING] → [FAILED] (⚠️) → [RETRY] → [SENDING]
```

### §4.3 QOT requirement gate

For value-bearing messages (booking / payment / deal):
- Auto-detect message type via content/template
- IF detected → require QOT context selection (mini-modal before send)
- Choose: Own / Referenced / Quote
- Submit → QOT chain attached + message sent

For casual chat: no QOT gate (per CHAT canon §4.3).

### §4.4 Attachment flow

```
[Tap 📎]
      ↓
[Bottom sheet attachment options]:
   ├─ 🖼️ Photo/Video (native picker, max 10 images / 1 video)
   ├─ 📄 Document (max 50MB)
   ├─ 📍 Location (map picker)
   ├─ 📅 Booking link (only in Business chat)
   ├─ 💰 Payment request (only in Business chat)
   ├─ 📊 Poll (2-10 options)
   └─ 🎵 Voice (press-and-hold record)
      ↓
[User selects type]
      ↓
[Type-specific picker]
      ↓
[Preview in composer]
      ↓
[Send same flow]
```

### §4.5 Voice message flow

```
[User press-and-hold 🎤]
      ↓
[Recording starts immediately]
      ↓
[Visual: waveform animated + duration counter]
      ↓ User decision:
[Release within recording] → [Send]
[Slide left while holding] → [Cancel + delete recording]
[Release after 1min limit] → [Auto-send]
      ↓
[Voice message sent with waveform display]
```

### §4.6 Message edit/delete

```
[User long-press own message]
      ↓
[Action menu appears]:
   ├─ Reply
   ├─ Forward
   ├─ Copy
   ├─ Edit (if < 24h)
   ├─ Delete (Delete for me / Delete for everyone if < 24h)
   └─ React (open wheel)
      ↓
[Edit flow]:
   ├─ Composer pre-fills with message text
   ├─ Tag: "Editing message"
   ├─ Save → message updated, "(edited)" label appended
   └─ Cancel → no change
      ↓
[Delete flow]:
   ├─ Confirm dialog
   ├─ "Delete for me" → hide locally
   └─ "Delete for everyone" → message replaced with "Message deleted" placeholder
```

---

## §5 RECEIVE REAL-TIME FLOW (J4)

### §5.1 New message arrival flow

```
[WebSocket emits new message event]
      ↓
[Check: is user in this room currently?]
   ├─ YES (in room):
   │     ↓
   │   [Append message to room view]
   │   [Smooth scroll if user at bottom]
   │   [DON'T scroll if user reading older]
   │   [Show "↓ X new" pill if not at bottom]
   │   [Mark as read via API]
   │
   └─ NO (outside room):
         ↓
       [Inbox: chat item updates with preview + unread count]
       [Bell badge increments (Top Bar)]
       [Toast notification (in-app, brief)]
       [System notification (if browser permission granted)]
```

### §5.2 Typing indicator flow

```
[Other user starts typing]
      ↓
[WebSocket: typing event]
      ↓
[Show "typing..." in room footer (subtle)]
      ↓ 3s no activity
[Hide indicator]
      
ALT: Group chat:
[Multiple users typing]
      ↓
["Elsa, Marcus typing..."]
```

### §5.3 Online/offline status flow

```
[User opens app]
      ↓
[WebSocket: presence "online" emit]
      ↓
[Other users see green dot on avatar]
      
[User closes app / inactive 5min]
      ↓
[WebSocket: presence "offline" emit]
      ↓
[Other users see "last seen X ago"]

NOTE: User can disable last-seen sharing (Privacy settings) → others see "last seen recently"
```

---

## §6 AIER INVOCATION FLOW (J5)

### §6.1 Direct AIER chat

```
[User in Inbox]
      ↓
[Tap AIER chat (e.g. AIER Tao)]
      ↓
[Room opens with AIER thread]
      ↓
[Top Bar shows AIER badge: "Governed Entity"]
      ↓
[Border/visual treatment distinct (per CHAT canon §6.2)]
      ↓
[User sends message]
      ↓
[AIER response with QOT chain reference]
      ↓
[AIER message visible với attribution clear]
```

### §6.2 AIER invocation in DM/Circle chat

```
[User in DM with another human]
      ↓
[Tap 🤖 button in composer dock]
      ↓
[Bottom sheet: Select AIER]:
   ├─ AIER Concierge (general)
   ├─ AIER Sales (recommendations)
   ├─ AIER Ops (operations)
   ├─ AIER Advisor (domain expert)
   └─ AIER Tao (Bazi/Tử Vi)
      ↓
[User selects AIER]
      ↓
[AIER joins as participant]
      ↓
[AIER message visible to ALL chat members]
[Badge "Governed Entity" persistent]
      ↓
[Other humans can ask follow-up to AIER]
      ↓
[User can dismiss AIER]:
   ├─ Tap AIER avatar → "Dismiss from chat"
   └─ Confirms → AIER leaves, history preserved
```

### §6.3 AIER state machine

```
[NOT_INVOKED] → [INVOKING] (selection sheet)
                    ↓
            [JOINED] (active in chat)
                    ↓
            [RESPONDING] (processing query)
                    ↓
            [JOINED] (idle, available for next query)
                    ↓
            [DISMISSED] (left chat, history retained)
```

### §6.4 AIER ethics gate

Each AIER response:
- Must include QOT chain reference
- Must acknowledge limits ("I'm an AIER, advisory only")
- Must NOT push transaction without explicit user consent
- Must NOT pretend to be human
- Hand-off to human if exceeds scope

---

## §7 BUSINESS CHAT FLOW (J6)

### §7.1 Business chat sidebar reveal

```
[User in Business Chat Room]
      ↓
[Swipe right from message area]
      ↓
[Sidebar reveals (slide from right, 280ms)]
      ↓
[Sidebar shows]:
   ├─ Members (Leads/Customers/VIP)
   ├─ CRM (Active conversations / Notes / Tags)
   ├─ Booking (Today / This week / Calendar)
   ├─ Tickets (Open / Resolved)
   ├─ Events (Upcoming / Past)
   └─ Transactions (This month / All)
      ↓
[User taps section]
      ↓
[Section detail full-screen]:
   ├─ Members: list with filters
   ├─ Calendar: full booking calendar
   ├─ Transactions: full history
   └─ etc.
      ↓
[Back returns to sidebar]
[Swipe sidebar away → return to chat]
```

### §7.2 Booking message flow

```
[Customer asks about service in chat]
      ↓
[Business owner taps 📅 in attachments]
      ↓
[Booking creator]:
   ├─ Service type
   ├─ Time slots (auto-fetch from calendar)
   ├─ Price (Credit unit)
   └─ Confirmation policy
      ↓
[Send booking link as message]
      ↓
[Customer sees booking card inline]
      ↓
[Customer taps "Book this slot"]
      ↓
[Cross-module exit to WALLET for payment]
      ↓
[After payment success → return to chat]
      ↓
[Booking message updates: "Confirmed ✓ + QOT trace"]
      ↓
[Both parties get +U for value-bearing transaction]
```

### §7.3 Multi-room business flow

```
[Large business has multi-rooms]
      ↓
[User in Business node Info panel]
      ↓
[Section "Rooms"]:
   ├─ General (default)
   ├─ Booking (booking-specific)
   ├─ Support
   ├─ VIP (if member)
   └─ Events
      ↓
[Tap room → switch to that room within same Business node]
      ↓
[Sidebar (CRM/booking) accessible from any room]
```

---

## §8 INFO + NEW CHAT FLOWS

### §8.1 Info panel flow (J7)

```
[User in Room]
      ↓
[Tap header (avatar + name area)]
      ↓
[Info panel slides up (full screen)]
      ↓
[Show]:
   ├─ Avatar large + name + ENTA + resonance
   ├─ ENTA Profile link (cross-module)
   ├─ Trust level + Connection date + Mutual circles
   ├─ Business Actions (if applicable):
   │     ├─ Booking history
   │     ├─ Membership tier
   │     ├─ Transaction history
   │     └─ CRM notes
   └─ Chat Settings:
         ├─ Notifications toggle
         ├─ Pin chat
         ├─ Archive
         ├─ Block
         └─ Clear history
      ↓
[User actions or tap back → return to Room]
```

### §8.2 New chat flow (J8)

```
[User taps Floating + (CHAT context)]
      ↓
[Bottom sheet "Start new chat"]:
   ├─ 👤 New DM (search user)
   ├─ ⭕ New Circle chat (select circle)
   ├─ 🤖 Talk to AIER (select AIER)
   └─ 🏢 Browse Businesses (PLUS Hub > Business mini app)
      ↓
[User selects]:

[New DM path]:
   ├─ Search overlay (find user by handle/name)
   ├─ Tap user → check connection level
   ├─ IF NOT Trusted Connect → "Upgrade connection to message" sheet
   └─ IF Trusted Connect → Room opens, composer focused

[New Circle chat path]:
   ├─ List of circles user is founder/mod of
   ├─ Tap circle → Room created/opened
   └─ Composer focused

[AIER path]:
   ├─ List of available AIER
   ├─ Tap AIER → Room opens
   └─ AIER greeting message auto-shown
```

---

## §9 SCREEN STATES MATRIX

| Surface | LOADING | EMPTY | ERROR | ACTIVE | DISABLED |
|---|---|---|---|---|---|
| **Inbox list** | Skeleton 5-6 chats | "No chats yet" + [Start chat] | "Could not load" + Retry | Chat list rendered | N/A |
| **Chat item** | Skeleton row | N/A | Failed thumbnail | Avatar + preview + time | Archived (lower opacity) |
| **Room messages** | Skeleton bubbles | "No messages yet" + send first | "Could not load history" | Messages rendered | LIMITED (composer disabled) |
| **Message bubble** | Sending dots | N/A | ⚠️ retry | Bubble | Edited/Deleted placeholder |
| **Composer** | N/A | Empty input | "Send failed" | Active input | Disabled (LIMITED state) |
| **AIER thread** | Skeleton | "Greeting from AIER" | "AIER unavailable" | Conversation | N/A |
| **Business sidebar** | Skeleton sections | "No data yet" | "Could not load" | All sections | N/A |
| **Info panel** | Skeleton | N/A | Partial info shown | Full info | Some sections locked (privacy) |
| **New chat sheet** | N/A | N/A | N/A | 4 options | N/A |
| **Voice recording** | Recording... | N/A | "Recording failed" | Waveform animated | Permission denied |

---

## §10 EDGE CASES + ERROR HANDLING

### §10.1 Network drop during message send

```
[User sends message]
      ↓
[Network drops mid-send]
      ↓
[Message stays in queue, ⏳ icon]
      ↓
[Banner: "Offline — messages queued"]
      ↓ Reconnect
[Queue auto-flushes]
      ↓
[Messages confirm sent (✓) one by one]
```

### §10.2 Failed message retry

```
[Message send fails (server error)]
      ↓
[⚠️ icon next to message]
      ↓
[User taps message → action: Retry / Delete / Edit]
      ↓
[Retry → re-send]
[Delete → remove from local + queue]
[Edit → composer pre-fills, original removed]
```

### §10.3 AIER unavailable

```
[AIER service down]
      ↓
[User sends message to AIER thread]
      ↓
[AIER responds: "Temporarily unavailable. Try again or contact support."]
      ↓
[Retry available, manual]
```

### §10.4 Block during conversation

```
[User blocks other party mid-conversation]
      ↓
[Confirm dialog]
      ↓
[On confirm]:
   ├─ Other party's messages hidden going forward
   ├─ Past messages remain (preserved for QOT)
   ├─ Block user notification (private to user)
   ├─ Other party not notified
   └─ Composer disabled in this thread
```

### §10.5 Connection level downgrade

User downgrades connection (Trusted → Resonance):
- Existing chat preserved (history)
- New messages disabled (LIMITED state)
- Banner: "Connection level changed — chat read-only"

---

## §11 PERMISSION + GATING

### §11.1 Connection level → Chat capability

| Level | Can DM? | Can in Circle? |
|---|---|---|
| Open Connect | NO | NO |
| Resonance Connect | NO | YES (if same circle) |
| Circle Connect | NO | YES |
| Trusted Connect | YES | YES |

### §11.2 Tier gating in CHAT

| Feature | Free | Member | Premium |
|---|---|---|---|
| DM with Trusted Connects | ✓ | ✓ | ✓ |
| Circle chat | ✓ | ✓ | ✓ |
| AIER chat (basic) | Limited 5/day | Unlimited | Unlimited |
| AIER advanced (Tao etc.) | ❌ | Limited | ✓ |
| Business chat | ✓ | ✓ | ✓ |
| Business CRM features | ❌ | Limited | ✓ |
| Voice messages | ✓ | ✓ | ✓ |
| Voice transcription | ❌ | ❌ | ✓ |

### §11.3 Privacy gating

- Last seen: user opt-in/out
- Read receipts: user opt-in/out
- Online status: user opt-in/out
- Group chat addition: user must approve

---

## §12 TIMING + PERFORMANCE TARGETS

| Action | Target | Max |
|---|---|---|
| Inbox load (cached) | < 200ms | 500ms |
| Inbox initial load | < 1.5s | 3s |
| Room open (cached) | < 100ms | 300ms |
| Room initial load | < 1s | 2s |
| Message send (optimistic) | < 100ms (visual) | 500ms (server) |
| Message receive (WebSocket) | < 500ms | 1.5s |
| Typing indicator | < 100ms | 300ms |
| Sidebar reveal | 280ms | — |
| Voice message upload | < 3s for 1min audio | 8s |
| Image preview load | < 800ms | 2s |

---

## §13 CROSS-MODULE EXITS

| From CHAT action | To module | State preserved |
|---|---|---|
| Tap user avatar in chat header | ENTA shell (their profile) | CHAT scroll preserved |
| Booking link tap (in business chat) | WALLET (transaction confirm) | CHAT preserved |
| Payment request tap | WALLET | CHAT preserved |
| AIER badge tap | PLUS Hub > AIER mini app (profile) | CHAT preserved |
| Profile link in Info | ENTA shell | Info panel preserved |
| Browse Businesses (new chat) | PLUS Hub > Business mini app | CHAT preserved |
| HOME bottom nav | HOME | CHAT state preserved |
| WALLET bottom nav | WALLET | CHAT preserved |
| ENTA bottom nav | ENTA | CHAT preserved |
| UZG+ logo center | PLUS Hub | CHAT preserved |

---

## §14 DECISION POINTS

### §14.1 New chat → connection level check

Decision: Allow user to start DM?
- Has Trusted Connect → YES → Room opens
- NOT Trusted Connect → NO → Show upgrade prompt

### §14.2 Message receive → in-room or notification

Decision: How to surface new message?
- User in same room → append to view
- User outside room → unread count + notification

### §14.3 AIER invoke → role selection

Decision: Auto-route AIER or let user pick?
- IF context matches specific AIER (e.g. TAO question) → suggest specific
- ELSE → user selects from list

### §14.4 Voice message limit

Decision: Cap voice duration?
- Default cap: 1 minute
- Premium tier: up to 5 minutes
- Hit limit → auto-stop record + send

---

## §15 ANALYTICS EVENTS

| Event | Purpose |
|---|---|
| `chat.shell.mounted` | Performance |
| `chat.inbox.loaded` | Success rate |
| `chat.room.entered` | Engagement |
| `chat.message.sent` | Activity |
| `chat.message.received` | Real-time health |
| `chat.aier.invoked` | AIER usage |
| `chat.aier.dismissed` | AIER fit |
| `chat.business.booking_sent` | Business flow |
| `chat.business.booking_confirmed` | Conversion |
| `chat.voice.recorded` | Feature usage |

---

## §16 ACCESSIBILITY

### §16.1 Screen reader

- Inbox: "Chat list, X chats"
- Chat item: avatar + name + last message preview + time
- Room: "Chat with @user, online status"
- Messages: ARIA live region for new messages
- Composer: properly labeled

### §16.2 Keyboard navigation

| Key | Action |
|---|---|
| Tab | Next chat / element |
| Enter | Open chat / send message |
| Esc | Back to inbox / close overlay |
| Cmd+K / Ctrl+K | Search chats |
| Cmd+/ / Ctrl+/ | Shortcuts help |
| Cmd+N / Ctrl+N | New chat |

### §16.3 Voice messages

- Auto-transcribe option (premium)
- Playback controls accessible
- Duration announced

---

## §17 V2 → V3 UX MIGRATION

### §17.1 V2 issues (per Cursor audit)

| Gap | Issue | Fix |
|---|---|---|
| G07 | `/chat/:id` and `/inbox/direct/:id` duplicate | Standardize `/chat/*` routes (per CHAT canon §18) |
| — | No QOT in messages | §4.3 QOT gate for value-bearing |
| — | AIER no governed treatment | §6 AIER state machine + badge |
| — | Business CRM not in chat | §7 sidebar architecture |
| — | No Telegram-style flow | §3 enter Room transition |

### §17.2 V3 implementation order

Sprint 1:
1. CHAT shell mount + Inbox load
2. Filter tabs + state machine
3. Room enter + state machine
4. Message send/receive with WebSocket

Sprint 2:
5. AIER invocation + governance treatment
6. Voice messages
7. Attachments (image/file/booking/payment)
8. Info panel

Sprint 3:
9. Business sidebar + multi-room
10. Edit/delete flows
11. Block/Privacy controls
12. Edge cases (offline / retry / fail)

---

## §18 SUCCESS METRICS

**Good signals:**
- Trusted Connect chats > Open Connect (chứng tỏ trust working)
- Booking messages QOT-verified
- AIER advisory leading to action (+U)
- Business sidebar usage by business owners
- Voice messages used appropriately

**Failure signals:**
- Spam patterns
- Anonymous business chat requests
- AIER mistaken for human
- Disappearing message requests
- Session length > 4h consecutive (= addiction)

---

## §19 KẾT LUẬN — 5 CÂU KHÓA

**1. CHAT UX = Inbox → Room → Info flow (Telegram pattern), KHÔNG đảo.**

**2. State machines: Inbox / Room / Message / AIER — instant feedback + optimistic UI.**

**3. AIER governed entity: invocation flow + dismiss + ethics gate per response.**

**4. Business chat sidebar swipe-reveal: CRM / Booking / Tickets / Events / Transactions tích hợp.**

**5. Real-time priority — message latency < 500ms, typing < 100ms, optimistic send.**

---

## §20 CHANGELOG

| Version | Date | Change |
|---|---|---|
| v1.0 | 2026-04-30 | Initial — synthesized từ CHAT UI canon + Foundation OS + Cursor V2 audit |

---

🔒 UZG+ V3 PWA OS — CHAT UX Flow Spec v1.0
End of file.
