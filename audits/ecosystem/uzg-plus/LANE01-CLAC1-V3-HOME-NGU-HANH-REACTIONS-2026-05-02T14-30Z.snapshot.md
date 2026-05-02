# Snapshot — V3 HOME 5 Ngũ Hành Reactions (Sub-module C)

**Audit ID:** LANE01-CLAC1-V3-HOME-NGU-HANH-REACTIONS-2026-05-02T14-30Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Pattern:** Single-component sprint per ENDGAME-2 sprint split (sub-module C only)
**Significance:** First UZG+ DNA core feature shipped per canon §5 (5 elements: Kim/Thủy/Mộc/Hỏa/Thổ). Replaces V3-only `like/love/insight/zen` with V2 EXACT element-based reactions.

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#102](https://github.com/unitonzengarden/uzgplus-app/pull/102) | `f5736f51` | MERGED at 2026-05-02T14:22:23Z |
| unitonzengarden/Uniton_Shared | (this audit branch) | TBD | OPEN |

## Major discovery — V2 already supports 5 ngũ hành natively

**KL-066/KL-067 evidence:**

`apps/uzg-pwa/src/services/productV2Service.js:126-137 FLOW_ELEMENT_ALIASES`:
```js
const FLOW_ELEMENT_ALIASES = {
  metal: 'metal', water: 'water', wood: 'wood', fire: 'fire', earth: 'earth',
  kim: 'metal',  thuy: 'water',  moc: 'wood',  hoa: 'fire',  tho: 'earth',
}
```

V2 endpoint `POST /api/v1/flow/interactions` (`productV2Service.js:20338-20363`) accepts `element_type` field that maps both English canonical (metal/water/wood/fire/earth) AND Vietnamese aliases (kim/thuy/moc/hoa/tho) — V3 sends Vietnamese to preserve UZG+ DNA per canon §5.

V3 client previously sent V3-only `{ post_id, reaction_type: 'like'|'love'|'insight'|'zen' }` which V2 rejected. Same V3↔V2 field-mismatch class as ENDGAME-1 (data.posts vs data.items) and ENDGAME-2 (content vs text). All three were KL-067 violations.

## What shipped

### `apps/uzg-pwa/src/lib/v2Adapters/reactionAdapter.ts` (NEW + KL-05 mirror)

NEW centralized adapter module. Exports:
- `NguHanhElement` type — `'kim' | 'thuy' | 'moc' | 'hoa' | 'tho'`
- `NGU_HANH_ORDER` — display order Kim→Thổ
- `NGU_HANH_META` — Vietnamese label + canonical color (canon §5.2) + symbol
- `mapV3ReactionToV2(element)` — passes through (V2 accepts Vietnamese aliases)
- `mapV2ReactionToV3(value)` — handles English+Vietnamese aliases → V3 NguHanhElement
- `buildV2InteractionBody(postId, element)` — V2 EXACT body shape
- `computeAggregateSentiment(counts)` — "Chủ yếu Mộc" / "Mạnh Hỏa" / "Cân bằng ngũ hành" per canon §5.4

### `apps/uzg-pwa/src/lib/v2ExpressClient.ts` (MODIFY + KL-05 mirror)

`sendInteraction` + `removeInteraction` now send V2 EXACT body:
```typescript
{ target_id, target_type: 'flow_post', element_type }
```

Per V2 canonical service `interactWithFlowPost` (productV2Service.js:20338-20363).

### `apps/uzg-pwa/src/types/feed.ts` (MODIFY + KL-05 mirror)

`ReactionPayload.reaction_type` now typed as `NguHanhReactionType` (5 ngũ hành).

### `apps/uzg-pwa/src/hooks/usePostReaction.ts` (MODIFY + KL-05 mirror)

Hook now:
- Normalizes V2's `element_type` (English alias) → V3 NguHanhElement via `mapV2ReactionToV3`
- Optimistic update + revert on network fail (logged via console.warn)
- Switching element keeps total count same; net delta = 0

### `apps/uzg-pwa/src/components/home-v3/NguHanhBar.tsx` (NEW + KL-05 mirror)

5-icon component:
- 5 buttons in horizontal row, each with element circle + Vietnamese label
- Mobile (≤480px): icons only, 44px tap zone via padding
- Desktop (≥768px): icon + label
- 3 states: NOT_REACTED / REACTED / can switch
- Active state: scale(1.05) + glow `box-shadow` + element color
- Inactive state: grayscale + 0.6 opacity
- Aggregate sentiment text below bar (only when ≥5 total reactions)
- Animation: 200ms transitions on color/transform/box-shadow per canon §5.3

### `apps/uzg-pwa/src/components/home-v3/NguHanhBar.module.css` (NEW + KL-05 mirror)

Module CSS using `--ngu-hanh-color` CSS custom property exposed by React inline style. Respects `prefers-reduced-motion`.

### `apps/uzg-pwa/src/components/home-v3/PostCardV3.tsx` (MODIFY + KL-05 mirror)

Replaced `<ReactionButtonV3>` with `<NguHanhBar>` in footer. Preserved all other PostCard behavior.

### `apps/uzg-pwa/src/components/home-v3/index.ts` (MODIFY + KL-05 mirror)

Added `export { NguHanhBar }` to barrel.

### `tests/lane01/audit/04-ngu-hanh-reactions.audit.spec.js` (NEW)

2 tests:
1. NguHanhBar sends V2 EXACT body to `/api/v1/flow/interactions` (target_id, target_type, element_type ∈ {kim,thuy,moc,hoa,tho})
2. NguHanhBar renders 5 element buttons per post (data-element=kim,thuy,moc,hoa,tho in order)

Tests skip when test user is ENTA-gated (no posts visible) — honest behavior.

## V2 EXACT references (KL-048 file:line)

| Layer | File | Line | Purpose |
|---|---|---|---|
| V2 endpoint | aier_server.js | 20245-20316 | POST /api/v1/flow/interactions |
| V2 canonical service | productV2Service.js | 20338-20363 | interactWithFlowPost (target_id/target_type/element_type) |
| V2 element aliases | productV2Service.js | 126-137 | FLOW_ELEMENT_ALIASES (English + Vietnamese) |

## Verification

| Gate | Result |
|---|---|
| Build | PASS (V3 bundle 853.35 KB, +0.55 KB delta from PR #98) |
| 0 TS errors | PASS |
| Sprint 5.11 + Phase 6.1 regression | 27/27 PASS (no regression) |
| KL-05 mirror byte-identical | PASS (verified `diff -r apps/uzg-pwa/src/components/home-v3 src/components/home-v3` empty) |
| Cloudflare deploy | SUCCESS in 1m16s — bundle hash `main-Dqpw9Wi3.js` |
| Production bundle has `ngu-hanh-bar` | PASS |
| Production bundle has V2 EXACT fields (`element_type`, `target_type:`, `target_id:`) | PASS |
| Production bundle has Vietnamese labels (Kim/Thủy/Mộc/Hỏa/Thổ) | PASS |
| Production bundle has aggregate strings (Chủ yếu/Cân bằng/ngũ hành) | PASS |
| Lane boundaries CLEAN | PASS |

## Files

| Action | Count | Notes |
|---|---|---|
| NEW | 4 | reactionAdapter.ts, NguHanhBar.tsx, NguHanhBar.module.css, 04-ngu-hanh test spec |
| MODIFY | 5 | v2ExpressClient.ts, types/feed.ts, usePostReaction.ts, PostCardV3.tsx, home-v3/index.ts |
| KL-05 mirrors | 8 | All apps/uzg-pwa files mirrored to src/ byte-identical |
| Total | 17 files / +574 / -39 |

## Lane boundaries

```
✅ apps/uzg-pwa/src/lib/v2Adapters/                   [NEW adapter module]
✅ apps/uzg-pwa/src/lib/v2ExpressClient.ts             [MODIFY sendInteraction/removeInteraction]
✅ apps/uzg-pwa/src/types/feed.ts                      [MODIFY ReactionPayload type]
✅ apps/uzg-pwa/src/hooks/usePostReaction.ts           [MODIFY for ngũ hành]
✅ apps/uzg-pwa/src/components/home-v3/NguHanhBar.tsx  [NEW]
✅ apps/uzg-pwa/src/components/home-v3/NguHanhBar.module.css [NEW]
✅ apps/uzg-pwa/src/components/home-v3/PostCardV3.tsx  [MODIFY swap component]
✅ apps/uzg-pwa/src/components/home-v3/index.ts        [MODIFY barrel]
✅ src/* (KL-05 mirrors)                               [byte-identical]
✅ tests/lane01/audit/04-ngu-hanh-reactions.audit.spec.js [NEW]

UNTOUCHED:
- All Lane_02 namespaces
- V2 backend (Worker, Express, Supabase Auth, Resend)
- Other Lane_01 namespaces (auth-v3/, enta-v3/, profile-v3/, settings-v3/)
- Old ReactionButtonV3 component left in place (no longer imported but preserved for ref)
```

## ENDGAME-2 sprint split progress

Per `runtime/lane_01_uzg/handoff_to_lane01/blockers/LANE01-CLAC1-ENDGAME-2-PARTIAL-HANDOFF-V1.json`:

| Sub-module | Status |
|---|---|
| B Post component X.com-grade | Pending |
| **C 5 Ngũ Hành Reactions** | **DONE this sprint** |
| D Composer media upload + poll + QOT | Pending (fix-only landed PR #98) |
| E Post Detail | Pending |
| F Lightbox | Pending |
| G Comments System | Pending |
| H Share/Quote | Pending |
| I Profile Mini View | Pending |
| J Connect 4 trust levels | Pending |
| K Notifications | Pending |
| L Suggested Resonance | Pending |

**1 of 11 sub-modules complete in single sprint.** Pattern: V2 audit → identify endpoint already supports feature → V3 adapter + component + UI = ~60-90 min sprint each.
