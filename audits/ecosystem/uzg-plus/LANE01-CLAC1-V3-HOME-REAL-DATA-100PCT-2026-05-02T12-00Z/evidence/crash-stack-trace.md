# Crash Stack Trace + Root Cause

## NTS-reported crash (production V3 HOME)

```
⚠️ Không thể tải bài viết
Cannot read properties of undefined (reading 'length')
[Thử lại]
Nếu lỗi tiếp tục, vui lòng kiểm tra kết nối mạng.
```

## Stack trace (reconstructed from source)

```
TypeError: Cannot read properties of undefined (reading 'length')
    at useFeed.load (useFeed.ts:48)
        // page.posts.length === 0 ? 'EMPTY' : 'LOADED'
        //              ^^^^^^^ undefined
    at useFeed.refresh (useFeed.ts:62)
    at HomeFeedV3 useEffect (HomeFeedV3.tsx:28)
    [React] error boundary in HomeFeedV3 catches
    [React] renders FeedErrorStateV3 with message "Không thể tải bài viết"
```

## Root cause chain

```
1. V3 client fetchFeed() called with cursor (V2 ignores) + limit (V2 ignores)
2. V2 receives unrecognized params → uses defaults (page=1, page_size=12)
3. V2 returns: { ok: true, data: { items: [...] }, meta: { has_more: true } }
4. V3 client returns: res.data ?? { posts: [], next_cursor: null, has_more: false }
5. res.data = { items: [...] } (truthy → ?? does NOT trigger fallback)
6. fetchFeed return value = { items: [...] }
7. useFeed receives `page` = { items: [...] }
8. useFeed reads page.posts → undefined
9. useFeed reads page.posts.length → TypeError thrown
10. React error boundary catches throw
11. Renders FeedErrorStateV3 with msg "Không thể tải bài viết"
```

## File:line citations (KL-048)

| Layer | File | Line | Issue |
|---|---|---|---|
| V3 fetch | `apps/uzg-pwa/src/lib/v2ExpressClient.ts` | 41-46 (BEFORE FIX) | sent wrong params, mapped wrong fields |
| V3 hook | `apps/uzg-pwa/src/hooks/useFeed.ts` | 48 (BEFORE FIX) | read `.length` on undefined |
| V2 source | `aier_server.js` | 20011-20070 | V2 EXACT endpoint reference |
| V2 audit | `V2_FLOW_HOME_EXACT_v1.md` | §3 | V2 EXACT response contract |
| V2 canonical service | `productV2Service.js` | 22322-22384 | V2's own reader (data.items + meta.has_more) |
| V2 frontend item shape | `FlowFeedList.jsx` | 1218+ | V2 FLAT author_*, text, media field reads |

## Fix applied

`v2ExpressClient.ts` rewrite (lines 41-130 AFTER FIX):
- Send V2 EXACT params (`page`, `page_size`)
- Map `data.items` → `posts[]` via `mapV2ItemToFeedPost`
- Map `meta.has_more` → `has_more`
- Encode page number as cursor for backward compat

`useFeed.ts` defensive guard (line 48 AFTER FIX):
```typescript
const safePosts = Array.isArray(page?.posts) ? page.posts : [];
```

## Verification

5/5 consecutive Playwright runs PASS on production. Body text confirms:
- "Cộng đồng" header renders
- ENTA Root gate message renders cleanly (V2 EXACT for users without ENTA)
- 0 page errors (React error boundary triggers count = 0)
- 0 network failures
- "Cannot read properties of undefined" text NOT present in body
