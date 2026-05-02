# V2 Endpoint Citation — /api/v1/flow/interactions

## Endpoint

**Method:** POST (and DELETE for removal)
**Path:** `/api/v1/flow/interactions`
**V2 source:** `aier_server.js:20245-20316`
**V2 canonical service:** `apps/uzg-pwa/src/services/productV2Service.js:20338-20363` `interactWithFlowPost`

## V2 EXACT body shape (per canonical service)

```javascript
// productV2Service.js:20353-20363
const response = await fetchAuthJson('/api/v1/flow/interactions', session, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    target_id: targetId,
    target_type: targetType,    // default 'flow_post'
    element_type: elementType,  // 5 ngũ hành Vietnamese OR English
  }),
})
```

## V2 element aliases (productV2Service.js:126-137)

```javascript
const FLOW_ELEMENT_ALIASES = {
  // English canonical
  metal: 'metal',
  water: 'water',
  wood:  'wood',
  fire:  'fire',
  earth: 'earth',
  // Vietnamese aliases (UZG+ DNA — V3 sends these)
  kim:   'metal',
  thuy:  'water',
  moc:   'wood',
  hoa:   'fire',
  tho:   'earth',
}
```

V2's `normalizeFlowElement()` (productV2Service.js:16717-16720) accepts any alias and normalizes to English internal:
```javascript
function normalizeFlowElement(value = '') {
  const normalized = String(value || '').trim().toLowerCase()
  return FLOW_ELEMENT_ALIASES[normalized] || ''
}
```

## V3 sends Vietnamese (UZG+ DNA preservation)

V3's `mapV3ReactionToV2(element)` is identity passthrough — sends `kim/thuy/moc/hoa/tho` directly. V2 normalizes to English internally.

## Validation rules (productV2Service.js:20338-20351)

```javascript
const targetType = String(payload?.target_type || 'flow_post').trim().toLowerCase() || 'flow_post'

if (!session?.access_token)  return error // 'flow_interaction.session_missing'
if (!targetId)                return error // 'flow_interaction.target_required'
if (!elementType)             return error // 'flow_interaction.element_required'
```

V2 requires:
- session.access_token (Bearer JWT)
- target_id (post UUID)
- element_type (must normalize to a known element)

## Production bundle verification

Production deploy `main-Dqpw9Wi3.js` after PR #102 merge contains:

```
$ curl -s "https://uzg.plus/v3/assets/main-Dqpw9Wi3.js" | grep -oE "ngu-hanh-bar|element_type|target_type:|target_id:"
ngu-hanh-bar
element_type
target_type:
target_id:
```

V2 EXACT body fields all present. Vietnamese labels Kim/Thủy/Mộc/Hỏa/Thổ + aggregate strings (Chủ yếu/Cân bằng/ngũ hành) also present.

## KL-066/KL-067 application

This sprint reaffirms KL-067: V3 client must follow V2 canonical service field names. The adapter `reactionAdapter.ts` centralizes the V3→V2 mapping per KL-066 pattern.
