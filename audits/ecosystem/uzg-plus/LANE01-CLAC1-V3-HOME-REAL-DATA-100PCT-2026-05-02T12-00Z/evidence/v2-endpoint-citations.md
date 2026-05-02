# V2 Endpoint Citations (KL-048)

## /api/v1/flow/feed

**Source location:** `aier_server.js:20011-20070`
**Audit reference:** `V2_FLOW_HOME_EXACT_v1.md` §3
**Method:** GET
**Auth:** requireUserAuth (Bearer JWT)
**Query params:**
- `page` (1-based, default 1, min 1)
- `page_size` (default 12, max 50)
- `preferred_table` (optional)

**Response shape (success):**
```json
{
  "ok": true,
  "request_id": "...",
  "code": "FLOW_FEED_READY",
  "data": { "items": [...] },
  "meta": {
    "page": 1,
    "page_size": 12,
    "has_more": true,
    "source_table": "enta_posts",
    "warnings": []
  }
}
```

**Response shape (ENTA gate, sovereign user without ENTA Root):**
```json
{
  "ok": false,
  "code": "ENTA_ROOT_REQUIRED",
  "message": "Complete ENTA Root before entering this Product V2 flow step.",
  "data": {
    "enta_present": false,
    "next_route": "/enta/view",
    "gate": "enta_required_before_downstream_flow"
  }
}
```

## V2 canonical service consumer

**Source:** `apps/uzg-pwa/src/services/productV2Service.js:22322-22384`
**Function:** `fetchFlowFeed(session, { page, pageSize, preferredTable })`
**Reads:** `response.data.data.items` + `response.data.meta`

This is V2's OWN service reading its OWN endpoint. The mapper pattern here is canonical:
```js
const items = Array.isArray(response.data?.data?.items) ? response.data.data.items : []
const meta = response.data?.meta || {}
const has_more = Boolean(meta.has_more)
```

V3's `fetchFeed` should follow the SAME pattern. Phase 6 ENDGAME HOME fix does this.

## V2 frontend item field reads

**Source:** `apps/uzg-pwa/src/components/flow/FlowFeedList.jsx:1218+`

V2's own React component reads FLAT snake_case fields:
- `item.id`
- `item.author_id`
- `item.author_display_name`, `item.author_identity_label`
- `item.author_avatar_url`
- `item.author_handle`
- `item.text` (NOT `content`)
- `item.title`
- `item.created_at`, `item.updated_at`
- `item.visibility`
- `item.reaction_count`, `item.comment_count`, `item.share_count`
- `item.user_reaction`
- `item.media` (object array, NOT flat `image_urls`)
- `item.link_url`, `item.link_title`
- `item.tao_ref`
- `item.circle_id`, `item.circle_name`
- `item.source_label`

V3 expects nested `author: {...}`. The V3 mapper `mapV2ItemToFeedPost` converts FLAT → nested.

## /api/v1/flow/posts (POST, create post)

**Source:** `aier_server.js:20072-20112`
**Audit:** `V2_FLOW_HOME_EXACT_v1.md` §3
**Already V2 EXACT** in V3 client `createPost` (no fix needed).

## /api/v1/flow/interactions (POST/DELETE, reactions)

**Source:** `aier_server.js:20245-20316`
**Audit:** `V2_FLOW_HOME_EXACT_v1.md` §3
**Already V2 EXACT** in V3 client `sendInteraction` / `removeInteraction` (no fix needed).

## /api/v1/media/enta/upload (POST, multipart)

**Source:** `aier_server.js:20114-20150`
**Audit:** `V2_FLOW_ENTA_EXACT_v1.md` §3
**Wired in Phase 6.1** via `uploadEntaMedia`.
