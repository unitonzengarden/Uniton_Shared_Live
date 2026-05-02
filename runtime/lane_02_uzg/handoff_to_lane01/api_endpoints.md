# API endpoints — Lane_01 perspective

**For:** Lane_01 (CLA1) UI integration
**Source:** uzgplus repo as of 2026-05-02
**Status:** TAO module is in-process JS — endpoints below are AIER chat + adjacent services only

---

## TAO compute (in-process — no network)

Import from `lib/tao/*`. See `../api_contracts/ziwei_engine_endpoints.md` for full inventory.

```js
import { computeZiweiCore } from '@uniton/lib/tao/ziwei/computeZiweiCore'
import { computeBaziPillars } from '@uniton/lib/tao/bazi/pillars'
import { buildAierContextPack } from '@uniton/lib/tao/ziwei/aier/context-pack'
```

## AIER Tao chat (network)

The chat endpoint is provided by the AIER backend (separate Lane_03 service). Lane_01 should:
1. Build `context_pack` client-side using `buildAierContextPack`
2. POST to AIER chat endpoint with the pack
3. Render returned `reading_object` per schema

The exact AIER chat URL is environment-dependent; consult `runtime/PROJECT_STATUS.md` or backend canon for the active deployment.

## AIER Wisdom OS (separate surface)

`api/wisdom.js` is a different surface — AIER ops brain, not TAO chat. Lane_01 generally does not touch this.

## Backend coordination

- Phase 5.1 (Auth + Identity) — LIVE Sprint 5.1 fix
- Phase 5.6 (PLUS Hub + Membership Hybrid) — LIVE Sprint 5.6
- Phase 5.8 (TAO Hybrid + Mock integration) — LIVE Sprint 5.8

Lane_01 components consume mocked TAO compute when offline; when online, real engines run client-side.

---

End of file.
