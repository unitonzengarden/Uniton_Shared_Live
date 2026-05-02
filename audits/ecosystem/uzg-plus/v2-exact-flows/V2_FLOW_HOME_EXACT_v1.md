# V2 HOME / Social Feed Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES
**Module:** 2 of 8

---

## §1 Module status V2

**LIVE.** V2 has full Flow feed (HOME) backed by V2 Express endpoints with canonical proxy fallback.

---

## §2 Frontend components V2

| File | Role |
|---|---|
| `apps/uzg-pwa/src/pages/FlowFeedPage.jsx` | HOME page (Flow feed list + composer) |
| `apps/uzg-pwa/src/components/flow/FlowFeedList.jsx` | Feed list rendering |
| `apps/uzg-pwa/src/components/flow/PostComposer.jsx` | Compose new post |
| `apps/uzg-pwa/src/components/flow/RewardPopup.jsx` | Reward popup on post create |
| `apps/uzg-pwa/src/services/productV2Service.js:22322` | `fetchFlowFeed(session, opts)` client |

### Key constants
```js
const FLOW_PAGE_SIZE = 12  // FlowFeedPage.jsx:15
```

### Page query params (FlowFeedPage.jsx)
- `?page=N` — pagination
- `?preferred_table=enta_posts|posts|community_posts` — source override

---

## §3 Backend endpoints V2

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/api/v1/flow/feed` | GET | requireUserAuth | Read flow feed paginated (page, page_size, preferred_table) |
| `/api/v1/flow/posts` | POST | requireUserAuth | Create new post (proxied to canonical V2 origin) |
| `/api/v1/flow/interactions` | POST | requireUserAuth | Add reaction/comment (proxied) |
| `/api/v1/flow/interactions` | DELETE | requireUserAuth | Remove reaction |
| `/api/v1/media/enta/upload` | POST | requireUserAuth | Upload media (multipart proxied) |

### GET /api/v1/flow/feed (aier_server.js:20011-20070)

**Query params:**
- `page` (default 1, min 1)
- `page_size` (default 12, max 50)
- `preferred_table` (optional)

**Response (200):**
```json
{
  "ok": true,
  "request_id": "...",
  "code": "FLOW_FEED_READY",
  "path": "/api/v1/flow/feed",
  "auth_context": { ... },
  "role_context": { ... },
  "data": { "items": [...] },
  "meta": {
    "scope": "user_own",
    "route": "/api/v1/flow/feed",
    "source": "local_node_runtime",
    "page": 1,
    "page_size": 12,
    "has_more": true,
    "source_table": "enta_posts",
    "warnings": [...]
  }
}
```

### POST /api/v1/flow/posts (aier_server.js:20072-20112)

**Pattern:** Proxy to canonical V2 origin via `fetchCanonicalJsonPath('/api/v1/flow/posts', token, opts)`. Response forwarded as-is.

### POST /api/v1/flow/interactions (aier_server.js:20245-)

**Body example:** `{ post_id, reaction_type }`

---

## §4 Database tables consumed

| Table | Source |
|---|---|
| `enta_posts` | Primary feed source (preferred_table=enta_posts) |
| `posts` | Legacy source |
| `community_posts` | Community source |

V2 reads via `queryLocalFlowFeedSource()` (aier_server.js helper).

---

## §5 RPCs consumed

V2 Flow feed does NOT directly call RPCs from frontend. Backend `aier_server.js` routes call canonical proxy + local Supabase queries.

---

## §6 Realtime channels

V2 Flow does NOT use Realtime currently. Manual refresh / scroll pagination only.

---

## §7 Edge cases V2 handles

| Edge case | Behavior |
|---|---|
| Unauth | requireUserAuth middleware → 401 |
| Empty feed | Display EmptyState component |
| Network/fetch error | RetryBar component with manual retry |
| Locked (RLS denied) | Friendly message: "The current session cannot read the published ENTA flow right now..." |
| Token expired | "Flow needs a fresh authenticated session before it can sync again." |

---

## §8 V3 Sprint 5.2 wiring assessment

**Sprint 5.2 implementation:** V3 wired `/v3/home` to V2 `/api/v1/flow/feed` via `v2ExpressClient.fetchFeed()`.

| Item | V2 EXACT | Sprint 5.2 V3 | Match |
|---|---|---|---|
| Endpoint | `/api/v1/flow/feed?page=N&page_size=12` | Same | ✅ |
| Page size default | 12 | Configurable | ✅ |
| Compose endpoint | `/api/v1/flow/posts` POST | Same | ✅ |
| Reaction endpoint | `/api/v1/flow/interactions` POST | Same | ✅ |
| Page param naming | `page` + `page_size` | `page` + `pageSize` (camelCase) | ⚠️ MINOR (V2 accepts both) |
| Source table preference | `?preferred_table=` | Not exposed | ⚠️ MINOR |

**Match score: ~85% — minor cosmetic differences only**

---

## §9 V3 Sprint 5.11 fix recommendations

**Status: LOW PRIORITY** — Sprint 5.2 wiring largely correct. Optional polish:
- Expose `preferred_table` param if needed for ENTA-aware feed
- Standardize page param naming to `page_size` (snake_case to match V2)

**ETA:** ~5 min if needed, OR skip Sprint 5.11.

---

## §10 Code references

- `aier_server.js:20011-20070` — GET /api/v1/flow/feed
- `aier_server.js:20072-20112` — POST /api/v1/flow/posts
- `aier_server.js:20245-20316` — POST /api/v1/flow/interactions
- `productV2Service.js:22322` — fetchFlowFeed client
- `FlowFeedPage.jsx:15` — FLOW_PAGE_SIZE = 12
