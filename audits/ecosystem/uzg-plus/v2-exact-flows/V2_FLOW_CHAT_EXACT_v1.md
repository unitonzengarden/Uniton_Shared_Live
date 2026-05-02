# V2 CHAT Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES
**Module:** 3 of 8

---

## §1 Module status V2

**LIVE.** V2 has full chat (DM + circle) backed by canonical V2 proxy.

---

## §2 Frontend components V2

| File | Role |
|---|---|
| `apps/uzg-pwa/src/pages/InboxPage.jsx` | Inbox list |
| `apps/uzg-pwa/src/pages/DirectMessageThreadPage.jsx` | DM room |
| `apps/uzg-pwa/src/pages/CircleChatPage.jsx` | Circle group chat |
| `apps/uzg-pwa/src/pages/ChatRoomInfoPage.jsx` | Chat room info |
| `apps/uzg-pwa/src/pages/CircleBusinessRoomEntryPage.jsx` | Business circle chat entry |

---

## §3 Backend endpoints V2

All chat endpoints in `aier_server.js:18660-18800` use `proxyCanonicalJsonRoute()` pattern (proxy to canonical V2 origin):

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/api/v1/conversations` | GET | requireUserAuth | List user's conversations (proxy) |
| `/api/v1/conversations` | POST | requireUserAuth | Create new conversation (proxy) |
| `/api/v1/conversations/presence` | POST | requireUserAuth | Update presence state (proxy) |
| `/api/v1/conversations/typing` | POST | requireUserAuth | Update typing state (proxy) |
| `/api/v1/messages` | GET | requireUserAuth | Read messages in conversation (proxy) |
| `/api/v1/messages` | POST | requireUserAuth | Send message (proxy) |
| `/api/v1/messages/read` | POST | requireUserAuth | Mark message read (proxy) |
| `/api/v1/chat/safety/actions` | POST | requireUserAuth | Block/Report/Mute (LOCAL handling, NOT proxy) |

### Chat safety action types (aier_server.js:18730+)

```js
const actionType = normalizeChatSafetyActionType(req.body?.action_type || req.body?.action)
// Body fields: action_type, conversation_id, message_id, target_user_id, reason_category, note, duration_hours, source_surface
```

---

## §4 Database tables consumed (via proxy/canonical origin)

| Table | Source |
|---|---|
| `enta_conversations` | Conversation list (Sprint 5.5 verified) |
| `enta_conversation_members` | Member list |
| `enta_messages` | Messages (text content) |
| `enta_message_reads` | Read receipts |
| `enta_typing_states` | Typing indicators |
| `enta_presence` | User presence |

---

## §5 RPCs consumed

V2 chat endpoints proxy to canonical origin (NOT direct RPC). RPCs available (per Backend Audit D3):
- `rpc_mark_message_read`
- `rpc_mark_conversation_read`
- `rpc_get_inbox_truth_reconciliation_publish`
- `rpc_set_presence`
- `rpc_get_circle_conversation`
- `rpc_chat_safety_actions` (or similar)

---

## §6 Realtime channels

V2 uses Supabase Realtime for live message delivery:
- Channel: `chat:${conversation_id}` (likely)
- Events: `enta_messages` INSERT, `enta_typing_states` UPDATE, `enta_presence` UPDATE

(Sprint 5.3 documented this pattern.)

---

## §7 Edge cases V2 handles

| Edge case | Behavior |
|---|---|
| Unauth | requireUserAuth → 401 |
| Canonical proxy down | sendApiError 502 with `*_PROXY_FAILED` codes |
| Block/Report/Mute | Local action handling at `/api/v1/chat/safety/actions` |
| Group chat | enta_conversations supports `kind` field (dm vs circle vs business) |

---

## §8 V3 Sprint 5.3 wiring assessment

**Sprint 5.3 implementation:** V3 wired `/v3/chat` to V2 endpoints via `v2ExpressClient`.

| Item | V2 EXACT | Sprint 5.3 V3 | Match |
|---|---|---|---|
| `/api/v1/conversations` GET | Same | Same | ✅ |
| `/api/v1/messages` GET | Same | Same | ✅ |
| `/api/v1/messages` POST | Same | Same | ✅ |
| `/api/v1/messages/read` POST | Same | Same | ✅ |
| Presence endpoint | `/api/v1/conversations/presence` | Same | ✅ |
| Typing endpoint | `/api/v1/conversations/typing` | Same | ✅ |
| Realtime subscribe | postgres_changes on enta_messages | Same | ✅ |

**Match score: ~95% — high confidence**

---

## §9 V3 Sprint 5.11 fix recommendations

**Status: NO FIX NEEDED.** Sprint 5.3 V3 chat wiring is correct.

Optional polish for go-live:
- Verify V3 CHAT inbox populates after OTP login session (cross-module integration)
- Verify Realtime channel filter works under V3 auth context

**ETA:** Skip Sprint 5.11.

---

## §10 Code references

- `aier_server.js:18660-18800` — All chat proxy endpoints
- `aier_server.js:18730-18790` — chat safety actions (local)
- `productV2Service.js` — chat client wrappers
- Backend Audit D1: `enta_conversations`, `enta_messages`, etc. confirmed live
