# Composer Fix Summary

## Bug

NTS screenshot evidence (production V3 HOME):
> "⚠️ Add text, media, an NFT attachment, or a shared source before posting"

User cannot post anything — even text-only.

## Root cause (KL-067 NEW)

V2 canonical service `apps/uzg-pwa/src/services/productV2Service.js:20246-20320` `createFlowPost`:

```js
const text = String(payload.text || '').trim()
const attachments = Array.isArray(payload.attachments) ? ... : []

if (!text && attachments.length === 0 && !nftAttachment && !parentQotId && !repostOfPostId) {
  return { error: new Error('Add text, media, an NFT attachment, or a shared source before posting.') }
}
```

V2 reads `payload.text` and `payload.attachments`.

V3 client `v2ExpressClient.ts` (BEFORE fix) sent V3 type names directly:
```typescript
return request<{ id: string }>('/flow/posts', {
  method: 'POST',
  body: JSON.stringify(payload),  // V3 ComposePayload: { content, post_type, image_urls, ... }
  jwt,
});
```

V2 received `{ content: '...', image_urls: [], post_type: 'text', visibility: 'public' }` — read `payload.text` (undefined) → empty `attachments` → validation block triggered → 400 error.

## Fix

V3 `createPost` now maps V3 ComposePayload → V2 EXACT body:

```typescript
const v2Body = {
  text: String(payload.content || '').trim(),
  circle_id: null,
  visibility: payload.visibility || 'public',
  attachments: Array.isArray(payload.image_urls)
    ? payload.image_urls.filter(Boolean).map((url) => ({ url, type: 'image' as const }))
    : [],
  nft_attachment: null,
  parent_qot_id: null,
  repost_of_post_id: null,
};
```

## Verification

| Step | Result |
|---|---|
| Build | PASS (V3 bundle 852.80 KB) |
| Sprint 5.11 + Phase 6.1 regression | 27/27 PASS |
| KL-05 mirror | Byte-identical |
| Cloudflare deploy (PR #98) | SUCCESS in 1m22s |
| Production bundle hash | main-B0VorcoR.js |
| Bundle has V2 EXACT field strings | `circle_id`, `nft_attachment`, `parent_qot_id`, `repost_of_post_id` ALL present |
| Composer Playwright spec on production | PASS |

## What this fix does NOT do

- Does NOT add image upload UI (the `attachments` mapping accepts URLs, but composer UI doesn't yet collect them — sub-module D media upload deferred)
- Does NOT add poll editor
- Does NOT add QOT context selector
- Does NOT add 5 ngũ hành reactions
- Does NOT add post detail page
- Does NOT add lightbox
- Does NOT add comments
- Does NOT add connect 4 levels
- Does NOT add notifications

These remain in handoff blocker for follow-up sprints.

## What this fix DOES do

- ✅ V3 text-only posts will now reach V2 successfully (V2 will accept and persist)
- ✅ V3 image-URL posts (when UI provides URLs) will reach V2 successfully
- ✅ The V3↔V2 field mapping pattern is established for future endpoint wires
- ✅ Same-class bug as ENDGAME-1 fixed at the same layer (centralized v2ExpressClient)
- ✅ Sprint 5.11 + Phase 6.1 functionality preserved (27/27 regression)

This is a meaningful but bounded fix. It is NOT the full ENDGAME-2 social-network completion that the spec defined.
