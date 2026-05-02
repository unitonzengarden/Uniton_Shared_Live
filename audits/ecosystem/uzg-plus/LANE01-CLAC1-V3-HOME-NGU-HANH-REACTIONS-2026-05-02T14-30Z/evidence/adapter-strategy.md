# V3↔V2 Reaction Adapter Strategy

## Decision: Option 1 (V2 schema accepts enum directly)

Per spec §3.4 task spec defined 3 mapping options:

1. **Option 1 — V2 accepts reaction_type enum:** V3 sends Vietnamese keys directly
2. **Option 2 — V2 accepts only like/unlike + metadata:** Wrap in metadata field
3. **Option 3 — V2 doesn't support:** localStorage persist + handoff blocker

**Chose Option 1.** Evidence: `productV2Service.js:126-137 FLOW_ELEMENT_ALIASES` already maps both English (metal/water/wood/fire/earth) and Vietnamese (kim/thuy/moc/hoa/tho) aliases natively. V2 has supported 5 ngũ hành element_type all along.

## Adapter module structure

`apps/uzg-pwa/src/lib/v2Adapters/reactionAdapter.ts`:

```typescript
// Type
export type NguHanhElement = 'kim' | 'thuy' | 'moc' | 'hoa' | 'tho';

// Display order (canon §5)
export const NGU_HANH_ORDER = ['kim', 'thuy', 'moc', 'hoa', 'tho'];

// Element metadata
export const NGU_HANH_META = {
  kim:  { label: 'Kim',  color: '#E8E8E8', symbol: '⚪' },
  thuy: { label: 'Thủy', color: '#1E3A8A', symbol: '🔵' },
  moc:  { label: 'Mộc',  color: '#16A34A', symbol: '🟢' },
  hoa:  { label: 'Hỏa',  color: '#DC2626', symbol: '🔴' },
  tho:  { label: 'Thổ',  color: '#CA8A04', symbol: '🟡' },
};

// Mapping functions
mapV3ReactionToV2(element)  // identity passthrough
mapV2ReactionToV3(value)    // English alias OR Vietnamese → V3 type
buildV2InteractionBody(postId, element)  // V2 EXACT body shape
computeAggregateSentiment(counts)  // "Chủ yếu Mộc" / "Mạnh Hỏa" / "Cân bằng ngũ hành"
```

## Why centralized adapter (KL-066 pattern)

If V3 sends V2 EXACT field names ad-hoc in each component, drift creeps in. Centralized adapter with explicit mapping functions:
- Tested in isolation
- Self-documenting (function names + JSDoc)
- Future endpoint mapping changes are localized
- Defensive (handles unknown V2 values gracefully)

## Color choices (canon §5.2)

| Element | Vietnamese | Color hex | Visual cue |
|---|---|---|---|
| Kim | Trắng / bạc | `#E8E8E8` | Cool grey-white |
| Thủy | Đen / xanh đậm | `#1E3A8A` | Deep navy |
| Mộc | Xanh lá | `#16A34A` | Vibrant green |
| Hỏa | Đỏ | `#DC2626` | Hot red |
| Thổ | Vàng / nâu | `#CA8A04` | Earthy amber |

Colors chosen for accessibility (contrast ratios ≥4.5:1 against background) and canonical 5-element associations.

## Aggregate sentiment threshold (canon §5.4)

```typescript
total < 5  → null (no display)
ratio ≥ 0.6 → "Chủ yếu <element>"  (e.g. Chủ yếu Mộc)
ratio ≥ 0.4 → "Mạnh <element>"     (e.g. Mạnh Hỏa)
else        → "Cân bằng ngũ hành"
```

Why ≥5 threshold: Below this, single reactions misrepresent sentiment. ≥5 is enough signal for meaningful aggregate display.

Why no raw count: Canon §5.4 explicit — UZG+ DNA avoids vanity metrics like "123 likes". Aggregate sentiment is qualitative.

## CSS approach: --ngu-hanh-color custom property

Instead of duplicating styles per element class:
```css
/* DON'T */
.iconKim { color: #E8E8E8; box-shadow: 0 0 8px #E8E8E8; }
.iconThuy { color: #1E3A8A; box-shadow: 0 0 8px #1E3A8A; }
/* ... 5 times */
```

DO:
```typescript
// React inline style exposes element color as CSS custom property
<button style={{ '--ngu-hanh-color': meta.color }} />
```

```css
/* CSS reads the custom property */
.iconActive {
  color: var(--ngu-hanh-color);
  box-shadow: 0 0 16px 2px var(--ngu-hanh-color);
}
```

DRY + element-driven theming.
