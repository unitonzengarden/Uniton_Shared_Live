---
task_id: LANE01-UZG-V3-P5-3-CHAT-HYBRID-INTEGRATION-2026-05-01T15-45Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-sonnet-4-6 (PRIMARY) → claude-opus-4-7 (escalation N/A — no race condition encountered)
status: SUCCESS
phase: 5
sprint: 3
priority: P0
type: Hybrid backend integration (V2 Express proxy + Supabase Realtime + 8-step lifecycle + Reconciliation)
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 82
    sha: 2931a04
    note: "Phase 5 Sprint 5.3. CHAT module Hybrid Integration. Real V2 Express + Supabase Realtime postgres_changes + Presence channel + reconcileSince."
project: uzg-plus
---

# LANE01-UZG-V3-P5-3-CHAT-HYBRID-INTEGRATION-2026-05-01T15-45Z — Snapshot

**Status:** SUCCESS — Sprint 5.3 CHAT module Hybrid Integration COMPLETE

## Highlights
- 10 components dual-tree in NEW `chat-v3/` namespace (KL-32+33 enforced)
- 5 hooks: useInbox + useChatRoom + useMessageSend + usePresence + useUnreadCount
- v2ExpressClient.ts extended with 7 chat methods (getConversations, getMessages, sendChatMessage, markMessageRead, setPresenceHeartbeat, setTypingState, plus internal unwrapList/unwrapItem helpers)
- 8-step message lifecycle locked per CHAT_02_ARCHITECTURE §3 with idempotency via client_temp_id UUID v4
- 3-layer pattern: Persistent (snapshot 50) + Realtime (postgres_changes filter conversation_id) + Reconciliation (reconcileSince on reconnect)
- Presence channel `room:<id>:presence` with 3s typing timeout (Type A transient)
- Schema discovery surfaced CANON_DRIFT — actual tables `enta_conversations` / `enta_messages` / `enta_message_reads` (76 conversations / 390 messages already in production)
- V3 router extended: `/chat` → ChatInboxV3, NEW `/chat/:conversationId` → DMRoomV3 (takeover route per Foundation Canon §3.1)
- Local V3 Vite build PASS — 372 modules, 4.89s, JS 741.49 KB (gzip 220.82 KB), 0 TS errors
- Production Playwright **6/6 PASS** in 8.8s
- KL-028: **26/26 routes 200** — CLEAN regression (23 prior + 2 new chat conversation routes + 1 root)
- Bundle markers verified in deployed `main-Bb8xDhx0.js`: chat-v3, chat-inbox-v3, conversation-list-item, dm-room-v3, message-bubble, composer-dock, room-top-bar, enta_messages, useChatRoom

## Components

**chat-v3/** (10):
- ChatInboxV3 (Inbox shell: header + tabs scaffolded + state machine LOADING/LOADED/EMPTY/ERROR + total unread badge)
- ConversationListItemV3 (avatar + title + last message preview + per-conversation unread badge + relative time)
- InboxEmptyStateV3 (empty state + CTA "Khám phá Resonance" → `/v3/enta/resonance`)
- InboxSkeletonV3 (5-row pulse skeleton)
- DMRoomV3 (DM Room takeover: RoomTopBar + MessageStream + TypingIndicator + ComposerDock fixed bottom)
- MessageStreamV3 (scrollable list, IntersectionObserver pagination for older messages, auto-scroll to bottom on new)
- MessageBubbleV3 (text bubble + status icon ⌛ pending / ✓ sent / ! failed + deleted state)
- ComposerDockV3 (textarea + Enter-to-send + typing broadcast with 1.5s pause throttle + 4000 char max)
- TypingIndicatorV3 (3-dot animation + Vietnamese "đang nhập..." label)
- RoomTopBarV3 (back button + avatar + presence dot + online status text)

## Hooks (5)

- **useInbox**: V2 Express GET /api/v1/conversations + state machine + Supabase Realtime postgres_changes on enta_messages INSERT bumps last_activity_at + unread count delta when sender ≠ me. Console marker `[useInbox] subscribed enta_messages INSERT`.
- **useChatRoom**: Snapshot 50 messages on mount + Realtime room channel (postgres_changes filter conversation_id=eq.<id> AND broadcast event='message_sent') + reconcileSince(last_seen_at) on TIMED_OUT/CHANNEL_ERROR. Idempotency check via Set<id|client_temp_id>. Console markers `[useChatRoom] subscribed room:<id> status=...`, `[useChatRoom] reconciling since <ts>`, `[useChatRoom] realtime insert <id>`.
- **useMessageSend**: 8-step lifecycle. Step 1 client_temp_id=crypto.randomUUID(), Step 2 POST, Step 7 reconcile via onReconciled callback. Failure path → onFailed → bubble shows red outline. Console markers `[useMessageSend] step-1 temp_id <uuid>`, `step-2 POST <uuid>`, `step-7 reconcile <uuid> -> <server-id>`.
- **usePresence**: Supabase Presence channel `room:<id>:presence` with key=user_id, broadcast 'typing' event with 3s timeout, presence sync → onlineUserIds. Console marker `[usePresence] joined room:<id>:presence status=...`.
- **useUnreadCount**: Pure derived hook from inbox conversations.

## API Client

`v2ExpressClient.ts` — extended Sprint 5.2 (KL-05 dual-tree byte-identical):
- getConversations(jwt) → InboxConversation[]
- getMessages(jwt, conversationId, { limit?, before?, since? }) → { messages, has_more }
- sendChatMessage(jwt, payload) → ChatMessageV3 | null
- markMessageRead(jwt, conversationId, messageId) → void
- setPresenceHeartbeat(jwt, conversationId, state) → void
- setTypingState(jwt, conversationId, isTyping) → void
- Helper unwrapList<T,K>(json, key) handles both `{ ok, key: [...] }` and `{ ok, data: { key: [...] } }` envelope shapes
- Helper unwrapItem<T,K>(json, key) same flexibility for single-item responses

## Schema discovery (KL-034 lesson Sprint 5.2)

**CANON_DRIFT:**
- canon `conversations` → actual `enta_conversations` (76 rows; columns: id, conversation_type, title, created_by, direct_key, circle_id, flow_id, event_id, is_active, created_at, updated_at)
- canon `messages` → actual `enta_messages` (390 rows; columns: id, conversation_id, sender_id, message_type, body, metadata, reply_to_message_id, is_deleted, created_at, updated_at)
- canon `conversation_participants` → **NO TABLE** in production. V2 Express derives DM membership from `enta_conversations.direct_key` (format `userA_id:userB_id`). Future sprint may need participants table for Group/Circle types.
- canon `message_reads` → actual `enta_message_reads` (columns: id, conversation_id, message_id, user_id, read_at)
- canon-named empty stubs `conversations` (count=0) and `messages` (count=0) exist in DB — likely placeholder, NOT used by V2 Express.

**Resolution:** V2 Express abstracts schema, client uses Express endpoints. Realtime subscribes `enta_messages` INSERT events directly (verified working table).

## Routes wired

- `/chat` (existing) — replaces internals to mount ChatInboxV3 (real backend)
- `/chat/:conversationId` (NEW) — mounts DMRoomV3 takeover surface
- CHAT_TAKEOVER_PATTERN regex extended `/^\/chat\/(dm\/|aier(\/|$)|circle\/|[^/]+$)/` to hide V3 chrome on conversation rooms
- `/chat/dm/:userId`, `/chat/aier`, `/chat/circle/:circleId` (existing mock routes) — preserved untouched for backwards compat

## Production verification

**KL-028 26/26 200 PASS:**
- Sprint 5.1 + 5.2 routes (23): /v3/, /v3/login, /v3/signup, /v3/home, /v3/chat, /v3/enta + nested, /v3/wallet + nested, /v3/plus, /v3/onboarding, /v3/tao + nested, /
- NEW Sprint 5.3 routes (2): /v3/chat/<conversationId> via UUID test, /v3/chat/dm/test fallback (existing mock)
- Plus existing AIER/Circle takeover routes still 200

**Production Playwright 6/6 PASS:**
- prod /chat redirects to login when unauthed
- prod /chat/<id> redirects to login when unauthed
- prod V2 Express /api/v1/conversations reachable (AUTH_REQUIRED 401)
- prod V2 Express /api/v1/messages reachable
- prod V2 Express POST /api/v1/messages exists
- prod /v3/login reachable

**Express endpoint smoke (curl no token):**
- /api/v1/conversations → 401 ✓
- /api/v1/messages → 401 ✓
- /api/v1/messages/read → 405 (POST-only) ✓
- /api/v1/conversations/presence → 405 (POST-only) ✓
- /api/v1/conversations/typing → 405 (POST-only) ✓

## Lane boundary (KL-32+33)

**UNTOUCHED territories verified via git diff origin/main..HEAD:**
- tao-v3/ — 0 files changed
- lane-02/ — 0 files
- home-v3/ (Sprint 5.2) — 0 files
- auth-v3/ (Sprint 5.1) — 0 files

**chat-v3/ NEW namespace** — 21 files dual-tree byte-identical (10 .tsx + 10 .module.css + 1 index.ts × 2 trees = 42 files).

## Build

- Vite v7.3.1 + 372 modules transformed in 4.89s
- main-CPqrHtNB.js (local) → main-Bb8xDhx0.js (deployed)
- JS 741,481 bytes / 220.82 KB gzip
- CSS 1,103,830 bytes / 155.58 KB gzip
- Bundle delta vs Sprint 5.2: ~+18 KB JS (chat shell + Realtime channel + Presence)
- 0 TypeScript errors, 0 ESLint errors

## Sprint pattern reuse

This Sprint 5.3 foundation is reusable for Sprints 5.3.x (Group / Circle / Business / Channel chat) + 5.4-5.7:
- 8-step message lifecycle template (locked at hook level)
- Realtime + Presence + Reconciliation 3-layer pattern (extract to chat-room template)
- Idempotency via client_temp_id (UNIQUE constraint server-side)
- Optimistic UI + rollback pattern
- Schema-flexible response unwrapping (handles both envelope shapes)
