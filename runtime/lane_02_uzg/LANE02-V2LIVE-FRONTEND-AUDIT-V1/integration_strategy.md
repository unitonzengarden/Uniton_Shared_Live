# LANE02-V2LIVE-FRONTEND-AUDIT-V1 — Integration Strategy

## Key Correction from Task Spec

The task spec assumed "TAO V2 = CHƯA CÓ". **This is incorrect.**

TAO module exists in V2 at `/tao/*` with:
- 189 files in `src/components/tao/`
- 16 routes fully registered in `src/App.jsx`
- Both V2 native components AND V3 upgrade components embedded in same folder
- `TAO_DATA_SOURCE.bazi='real'`, `TAO_DATA_SOURCE.ziwei='real'` (LIVE backend)
- `TAO_DATA_SOURCE.aierTao='real'` just wired (migration pending)

## Strategic Pivot — V3 = Upgrade V2 UI/UX (corrected understanding)

The pivot means:
1. V2 pages at `/tao/*`, `/chat`, `/wallet`, `/app`, `/u-earnings`, `/membership` continue operating
2. V3 upgrade components (`*-v3/`) already exist in codebase
3. Task: **swap V2 component imports for V3 upgrade imports** in each page

## 4-Step Plan

### Step 1: Apply AIER TAO Chat Migration (30 min — NTS/Lane_01)
```sql
-- Apply to Supabase kkhhpecofolmrodyeslp via Studio SQL editor:
-- File: supabase/migrations/20260502093001_lane02_aier_kb_rag_v1.sql
-- This creates search_aier_kb RPC + HNSW index on aier_kb_entries
```
- Unblocks `/tao/aier` chat functionality
- `TAO_DATA_SOURCE.aierTao='real'` already set (LANE02-PHASE6-AIER-CHAT-WIRE-V1)
- Worker route `/api/v1/tao/aier/chat` already in `public/_worker.js`

### Step 2: Wire V3 Bazi + Ziwei Pages (3-4h — CLAC-2)

**Bazi:**
```javascript
// TaoBaziLuckPillarsPage.jsx — swap to V3
import { LuckPillarCard, LuckPillarsTimeline } from '../components/tao/bazi-premium-v3'
// (instead of legacy BaziLuckPillarCard.jsx, BaziLuckPillarsTimeline.jsx)
```

**Tu Vi (Ziwei):**
```javascript
// TaoZiweiNatalChartPage.jsx — swap to V3
import { ZiweiInputWizard, ZiweiPalaceChartFull, ZiweiPalaceDetailSheet } from '../components/tao/ziwei-v3'
// (instead of legacy ZiweiBirthInputForm.jsx, ZiweiChartGrid.jsx)
```

**AIER TAO Chat:**
```javascript
// TaoAierPage.jsx — swap to V3 chat surface
import { AierTaoChatSurface } from '../components/tao/aier-tao-chat-v3'
// (already partially done in Sprint 4.3+)
```

### Step 3: Flip Phong Thủy + Lịch Vạn Niên Backend (4-6h — CLAC-2)

```typescript
// src/data/v3-tao-data-layer.ts
export const TAO_DATA_SOURCE: TaoDataSourceConfig = {
  bazi: 'real',      // already
  ziwei: 'real',     // already
  phongthuy: 'real', // FLIP THIS — requires: phong_thuy DDL + fetchRealPhongThuy()
  vannien: 'real',   // FLIP THIS — requires: vannien DDL + fetchRealVanNien()
  aierTao: 'real',   // already (pending migration Step 1)
};
```

### Step 4: UI Upgrade Per Module (1.5-2h each — CLAC-2)

For each module, the pattern is:
```javascript
// OLD (V2 page using legacy components)
import { ChatInbox } from '../components/chat/ChatInbox'  // V2 legacy

// NEW (V2 page using V3 upgrade component)
import { ChatInboxV3 } from '../components/chat-v3/ChatInboxV3'  // V3 upgrade
```

**Module priority:**
1. CHAT (highest user impact, components ready)
2. WALLET (revenue-critical)
3. U-Reward (engagement)
4. PLUS+Membership (conversion)

### Timeline Estimate
| Step | Owner | Est Hours | Risk |
|------|-------|-----------|------|
| Step 1: Migration apply | NTS/Lane_01 | 0.5h | LOW |
| Step 2: Bazi/Ziwei V3 | CLAC-2 | 3-4h | LOW |
| Step 3: PhongThuy/VanNien DDL | CLAC-2 | 4-6h | MEDIUM |
| Step 4 CHAT upgrade | CLAC-2 | 1.5-2h | LOW-MEDIUM |
| Step 4 WALLET upgrade | CLAC-2 | 1.5-2h | LOW-MEDIUM |
| Step 4 U-Reward upgrade | CLAC-2 | 1.5h | LOW |
| Step 4 PLUS+Membership | CLAC-2 | 1.5h | LOW |
| **TOTAL** | | **~14-18h** | |
