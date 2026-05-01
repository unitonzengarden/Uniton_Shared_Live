---
task_id: LANE01-UZG-V3-P4S4-AIER-TAO-TIER-GATING-2026-05-01T12-35Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-opus-4-7
status: SUCCESS
phase: 4
sprint: 4
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 76
    sha: 9809f077bf5ccf709310d1ac73c90594ea732f90
project: uzg-plus
---

# CLAC1 Solo Report: Sprint 4.4 AIER TAO Reading + 4-tier gating — SUCCESS

## Status
**SUCCESS** — AIER TAO Reading System with 4-tier membership gating LIVE at `uzg.plus/v3/app/tao/ziwei/reading/:palaceIndex`. Clean merge first try, no hot-fix.

## NTS verbatim authority
> "12 cung này nhấn vào hỏi AIER TAO lý giải chi tiết, có dạng hỏi free và hỏi membership có trả phí" — NTS, 2026-05-01

P0 priority: revenue model surface. Sprint 4.4 establishes the membership monetization pattern that Sprint 4.5+ surfaces will inherit.

## ⭐ NTS VERIFICATION URLS

```
https://uzg.plus/v3/app/tao/ziwei              ← Tử Vi chart (Sprint 4.3) → tap any cung
https://uzg.plus/v3/app/tao/ziwei/reading/7    ← MỆNH (B.Tý) reading direct
https://uzg.plus/v3/app/tao/ziwei/reading/0    ← NÔ BỘC (K.Tị) reading direct
```

NTS verification flow:
1. Click `/v3/app/tao/ziwei` → chart renders → tap any palace cell → detail sheet opens.
2. Bottom of detail sheet, click "Hỏi AIER TAO lý giải cung này →" → navigate to AIER TAO Reading Surface.
3. Reading Surface shows:
   - TOP BAR: Back button + 南道 NAM TAO medium centered + Tier badge (FREE EXPLORER / MEMBER / BUILDER / SOVEREIGN)
   - HERO: "Cung B.Tý / MỆNH / Thái Dương (H)" chip
   - CAP METER: Bar fill + "X/N cung hôm nay" or "Unlimited (tier)"
   - READING CONTENT: Tier-gated (Free 50-từ / Seeker structured / Builder + comparisons / Sovereign + expert review)
   - LIÊN KẾT MODULE KHÁC: Bazi/ENTA/Lịch refs with per-tier locks
   - AIER TAO CHAT: Builder+ launches chat session, lower tiers see Upgrade CTA
   - FOOTER: Cultural framing reminder
4. Test tier switching via DevTools localStorage:
   - `uzg-mock-user` → set `tier` to "explorer" / "seeker" / "builder" / "sovereign" → reload to see different content
   - `uzg-aier-tao-cap-state` → set `{capUsed: 3, capTotal: 3}` → cap-exhausted UI

## What was deployed (Sprint 4.4)

### 6 components (`src/components/tao/aier-tao-v3/`, dual-tree mirrored)

| Component | Lines (TSX/CSS) | Purpose |
|---|---|---|
| `TierContentGate` | 71 / 99 | Foundational reusable gate. 3 states: `tier-locked` (shows lockedPreview + upgrade card), `cap-exhausted` (shows cap message + reset time + upgrade), `unlocked` (renders children). data-state attr for assertion. |
| `CapMeter` | 33 / 53 | Daily reading counter visual. Bar fill ratio used/total, tier-aware color (purple → red on exhausted, green-purple gradient on unlimited). Reset time legend. |
| `ReadingContent` | 152 / 214 | Tier-aware content renderer. Wraps content in TierContentGate. 4 sub-renderers: FreeReading (50-từ summary + inline upgrade CTA) / SeekerReadingBlock (5 sections: chính tinh + phụ tinh + tứ hóa + bazi-combination + cultural-framing) / BuilderExtras (luu-nien-3-year + dai-van) / SovereignExtras (expert-review-queue + pdf-export). |
| `CrossModuleRefs` | 86 / 129 | Bazi/ENTA/Lịch links with per-ref tier requirements. Each ref card has data-ref + data-locked attrs. Locked refs show educational message + Upgrade CTA. Unlocked refs show body + Navigate CTA. |
| `AierTaoChatLauncher` | 41 / 91 | Builder+ chat session launcher. Locked variant shows tier requirement explanation + Upgrade Builder CTA. data-locked attr. |
| `AierTaoReadingSurface` | 99 / 116 | Root composer. Sticky top bar (back + NamTaoBadge medium + tier badge) + hero (cung label + name + chinh tinh chip) + CapMeter + ReadingContent + CrossModuleRefs + AierTaoChatLauncher + footer. data-component="aier-tao-reading-surface" data-palace-index data-user-tier. |

### Types (`src/types/aierTao.ts`)

```typescript
export type AierTaoTier = 'explorer' | 'seeker' | 'builder' | 'sovereign';

export const TIER_ORDER: Record<AierTaoTier, number> = {
  explorer: 0, seeker: 1, builder: 2, sovereign: 3,
};

export interface PalaceReading {
  free: string;                    // 50-từ
  seeker: SeekerReading;           // structured 200-300 từ
  builder: BuilderReading;         // seeker + luuNien3Year + daiVan
  sovereign?: SovereignReading;    // builder + expertReview + pdfExport
}

export function normalizeTier(rawTier: string | undefined): AierTaoTier {
  // 'free' | 'explorer' → explorer
  // 'seeker' | 'member' → seeker
  // 'builder' → builder
  // 'sovereign' | 'premium' → sovereign
}

export function tierGte(userTier, requiredTier): boolean {
  return TIER_ORDER[userTier] >= TIER_ORDER[requiredTier];
}
```

### Mock data (`src/data/v3-mock-aier-tao.ts`)

`MOCK_PALACE_READINGS` Record<number, PalaceReading>:
- **Index 7 MỆNH** (B.Tý) — Thái Dương Miếu showcase chi tiết per spec §5.4
- **Index 0 NÔ BỘC** (K.Tị) — Thiên Tướng Đắc showcase chi tiết
- Indices 1-6, 8-11 — `makeReading(cungName, chinhTinhName, summary, baziCombination)` helper produces consistent structure for all 10 remaining palaces with appropriate Vietnamese cultural framing

`MOCK_USER_TIER_STATE` per tier defaults:
- explorer: `{ capUsed: 1, capTotal: 3 }`
- seeker: `{ capUsed: 5, capTotal: 12 }`
- builder + sovereign: `{ capUsed: 0, capTotal: 'unlimited' }`

`readCapState(tier)` reads localStorage `uzg-aier-tao-cap-state` for user-overrides (used in cap-exhausted Playwright test).

### Routes added

`src/V3App.jsx`:
```jsx
<Route path="/app/:appName/:state/:subState/:detail" element={<V3MiniAppPage />} />
<Route path="/app/:appName/:state/:subState/:detail/:detailId" element={<V3MiniAppPage />} />
```

`src/pages/v3/V3MiniAppPage.jsx`:
- New `<AierTaoReadingPage>` wrapper component reads user + chart + cap state, looks up palace + reading, passes to `<AierTaoReadingSurface>`
- Detection: `appName === 'tao' && state === 'ziwei' && subState === 'reading' && detail !== undefined` → renders AierTaoReadingPage inside MiniAppTakeover (full screen)
- Otherwise: original TaoMiniAppShell render path

`src/components/tao/TaoMiniAppShell.tsx`:
- New prop: `onAierTaoNavigate?: (palaceIndex: number) => void`
- ZiweiPalaceDetailSheet `onAierTaoTap` calls `onAierTaoNavigate(activePalaceIndex)` then closes sheet (instead of just closing)

`src/components/tao/ziwei-v3/ZiweiPalaceDetailSheet.tsx`:
- CTA text: "Hỏi AIER Tử Vi" → "Hỏi AIER TAO lý giải cung này →"
- Added `data-cta="aier-tao-reading"` for Playwright assertion

## Verification

### Build
- `npm run build:v3`: PASS, 239 modules (+15 from Sprint 4.3.1), 3.19s
- 0 TypeScript errors, 0 ESLint errors

### Local Playwright (`tests/visual/p4s4-aier-tao.spec.mjs`)
- 6 tests:
  1. tier-explorer: content < 400 chars + upgrade-member CTA visible
  2. tier-seeker: content 200-2000 chars + Bazi unlocked + ENTA locked
  3. tier-builder: luu-nien-3-year + dai-van sections + ENTA unlocked + chat launcher CTA
  4. tier-sovereign: expert-review-queue + export-pdf CTAs
  5. explorer cap exhausted (3/3) → cap-exhausted state visible + upgrade CTA
  6. palace detail tap → AIER TAO CTA tap → navigates to URL containing `/reading/`
- Result: **6/6 PASS in 7.5s**

### Production Playwright (`tests/visual/p4s4-aier-tao-prod.spec.mjs`)
- Same 6 tests against `https://uzg.plus`
- Result: **6/6 PASS in 10.4s**

### KL-028 production probe (8 routes)

| Status | Path | Type |
|---|---|---|
| 200 | /v3/app/tao/ziwei/reading/7 | NEW reading surface (MỆNH) |
| 200 | /v3/app/tao/ziwei/reading/0 | NEW reading surface (NÔ BỘC) |
| 200 | /v3/app/tao | Sprint 4.1 baseline |
| 200 | /v3/app/tao/bazi | Sprint 4.2 |
| 200 | /v3/app/tao/ziwei | Sprint 4.3 |
| 200 | /v3/enta | Sprint 4.3.1 Pentagon 南道 |
| 200 | /v3/home | V3 baseline |
| 200 | / | V2 baseline |

Bundle markers verified in `main-BUo1jrtV.js`: `aier-tao-reading-surface`, `aier-tao-chat-launcher`, `cap-meter`, `cross-module-refs`, `expert-review-queue`, `reading-content`, `upgrade-member` (7/7 expected markers present).

## LAW 4 enforcement

✅ **Educational tone**:
- Free reading: "Pattern năng lượng dương vượng tại đỉnh, ánh sáng + sức ảnh hưởng tự nhiên."
- Seeker tu-hoa: "L.Thiên Khốc: cảm xúc sâu" (descriptive, not prescriptive)
- Builder dai-van: "pattern ổn định + biểu hiện cá nhân, tăng cường trong giai đoạn 32-42" (pattern reflection)

✅ **Cultural framing every reading**:
- "Đây là cấu trúc tham chiếu, không phải định mệnh. Pattern này phản chiếu cách năng lượng phân bố — bạn quyết định hành động."
- "Cấu trúc tham chiếu, không phải định mệnh. UZG+ trình bày để bạn tự hiểu cấu trúc của mình."

✅ **Polite upgrade CTAs**:
- "Nâng cấp Member để mở khóa"
- "mở khóa hiểu biết sâu"
- "Xem các tier khác"

❌ **NO thầy-phán** ("anh sẽ giàu", "chị sẽ gặp người", "năm nay gặp tài lộc")
❌ **NO fortune-telling** ("destiny", "fate", "auspicious days", "lucky")
❌ **NO fear-conversion** ("không nâng cấp = thiếu kiến thức", "thiếu thông tin nguy hiểm")

## NAM TAO 南道 branding (Sprint 4.3.1 canon §6.1 inheritance)

AierTaoReadingSurface top bar uses `<NamTaoBadge size="medium" showRomanized centered />` per branding canon §6.1. Visible across all reading routes (palace 0-11). Tier badge inline right side.

## Mirror discipline (KL-32 + KL-33 ENFORCED via namespace separation)

Sprint 4.4 demonstrates the namespace separation pattern (introduced Sprint 4.3): `aier-tao-v3/` directory NEW + SEPARATE from Lane_02 `aier/`:

- `src/components/tao/aier/` — Lane_02 territory, UNTOUCHED
- `src/components/tao/aier-tao-v3/` — NEW Lane_01 V3 UI, 13 files
- `apps/uzg-pwa/src/components/tao/aier/` — Lane_02 mirror, UNTOUCHED
- `apps/uzg-pwa/src/components/tao/aier-tao-v3/` — NEW dual-tree mirror, 13 files byte-identical

Pre-commit verification: `git diff --cached --stat apps/uzg-pwa/src/components/tao/{aier,ziwei}/` returned EMPTY.

Result: First-try clean build + deploy SUCCESS, no hot-fix.

## Files changed (44 files, 3345 insertions, 8 deletions)

**Components (`src/components/tao/aier-tao-v3/` + apps/-tree mirror):**
- TierContentGate.tsx + .module.css
- CapMeter.tsx + .module.css
- ReadingContent.tsx + .module.css
- CrossModuleRefs.tsx + .module.css
- AierTaoChatLauncher.tsx + .module.css
- AierTaoReadingSurface.tsx + .module.css
- index.ts (barrel)

**Types + data:**
- src/types/aierTao.ts + apps/-tree mirror (156 lines)
- src/data/v3-mock-aier-tao.ts + apps/-tree mirror (180 lines)

**Wired:**
- src/components/tao/TaoMiniAppShell.tsx (added onAierTaoNavigate prop) + apps/-tree mirror
- src/components/tao/ziwei-v3/ZiweiPalaceDetailSheet.tsx (CTA text + data-cta attr) + apps/-tree mirror
- src/V3App.jsx (added 4-segment + 5-segment routes) + apps/-tree mirror
- src/pages/v3/V3MiniAppPage.jsx (AierTaoReadingPage wrapper + state detection) + apps/-tree mirror

**Tests + screenshots:**
- tests/visual/p4s4-aier-tao.spec.mjs (6 local tests)
- tests/visual/p4s4-aier-tao-prod.spec.mjs (6 production tests)
- .lane_01/screenshots/p4s4-aier-tao-local/*.png (5 screenshots)

End of report.
