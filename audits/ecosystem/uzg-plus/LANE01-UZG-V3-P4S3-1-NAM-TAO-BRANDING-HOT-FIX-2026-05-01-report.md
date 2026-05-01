---
task_id: LANE01-UZG-V3-P4S3-1-NAM-TAO-BRANDING-HOT-FIX-2026-05-01T12-35Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-opus-4-7
status: SUCCESS
phase: 4
sprint: 3.1
type: HOT-FIX
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 75
    sha: 9aa13754b0dde1aec5035fe9038b35febdc1472a
project: uzg-plus
canon_added:
  - canon/uzg-plus/uiux/v3/UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md
---

# CLAC1 Solo Report: Sprint 4.3.1 NAM TAO Branding Hot-Fix — SUCCESS

## Status
**SUCCESS** — NAM TAO 南道 branding consistency LIVE on every TAO surface + ENTA Pentagon. Branding canon v1.0 published to lock pattern for Sprint 4.4-4.6.

## NTS verbatim quality bar
> "Chữ 南道 NAM TAO để trên tab trên cùng của toàn mục uzg.plus/tao/... có chữ trên tab chính. 南道 NAM TAO chữ này để nhỏ ở trên khung giữa của lá số tử vi, của bảng phong thủy bát trạch, của bảng Bát tự, của bảng ENTA.... bộ chữ thương hiệu '南道 NAM TAO' là branding của hệ thống triết lý Nam Tao." — NTS, 2026-05-01

## ⭐ NTS VERIFICATION URLS

```
https://uzg.plus/v3/app/tao              ← TAO Overview với top bar 南道 NAM TAO medium
https://uzg.plus/v3/app/tao/bazi         ← Bazi Overview với top bar
https://uzg.plus/v3/app/tao/bazi/chart   ← Bazi Chart với top bar
https://uzg.plus/v3/app/tao/ziwei        ← Tử Vi Wizard/Chart với top bar + center small 南道
https://uzg.plus/v3/enta                 ← ENTA Pentagon center với 南道 SVG text subtle
```

NTS verification flow:
1. Click `/v3/app/tao` (or any TAO sub-route) — see **南道 NAM TAO medium centered in TOP BAR** (sticky position, cosmic purple, visible across ALL tabs)
2. Click "Tử Vi" tab → chart renders with 4×3 cung grid + center panel — see **南道 NAM TAO small subtle in center panel** (smaller than top bar, both visible simultaneously)
3. Click `/v3/enta` → ENTA Pentagon — see **南道 SVG text at SVG center** above element label (subtle 0.55 opacity, decorative branding presence)
4. Compare to Sprint 4.3 (pre-hot-fix): Sprint 4.3 had only center panel 南道 (no top bar) and Pentagon had no 南道 at all — Sprint 4.3.1 fixes both gaps.

## What was deployed (Sprint 4.3.1)

### 1. NamTaoBadge size system extended

`src/types/tao.ts`:
```typescript
export type NamTaoSize = 'pentagon' | 'compact' | 'small' | 'medium' | 'hero';
```

`src/components/tao/NamTaoBadge.module.css`:
```css
.pentagon .han { font-size: 14px; line-height: 1; opacity: 0.6; }
.pentagon .romanized { font-size: 7px; margin-top: 1px; opacity: 0.55; }

.compact .han { font-size: 18px; }
.compact .romanized { font-size: 9px; margin-top: 2px; }

.small .han { font-size: 20px; line-height: 1.1; }
.small .romanized { font-size: 9px; margin-top: 2px; letter-spacing: 0.18em; }

.medium .han { font-size: 28px; }
.medium .romanized { font-size: 11px; margin-top: 4px; }

.hero .han { font-size: 40px; line-height: 1; }  /* was 56px */
.hero .romanized { font-size: 12px; margin-top: 6px; }  /* was 13px */
```

### 2. TaoMiniAppShell top bar

```tsx
<header className={styles.topBar} data-component="tao-top-bar">
  <NamTaoBadge size="medium" showRomanized centered />
</header>
```

CSS sticky position with z-index 6, padding `12px 12px 10px`, border-bottom subtle separator.

### 3. Center panel resizing

| Component | Before | After | Reason |
|---|---|---|---|
| ZiweiCenterPanel | `size="medium"` 28px | `size="small"` 20px | Subtle in geometric center |
| ZiweiInputWizard hero | `size="hero"` 40px | `size="medium"` 28px | Don't compete with top bar |
| ZiweiLoadingReveal | `size="hero"` 40px | `size="medium"` 28px | Consistent with wizard |

### 4. ENTA PentagonWheel center 南道

`src/components/enta/PentagonWheel.tsx` — added SVG text inside `<g className={styles.center}>`:

```jsx
<text
  x={cx}
  y={cy - preset.fontSize}
  textAnchor="middle"
  dominantBaseline="middle"
  fontSize={preset.fontSize - 6}
  fontWeight="700"
  fill="var(--nam-tao-primary, #5B4FA5)"
  fillOpacity="0.55"
  data-han
  lang="zh-Hant"
  style={{ letterSpacing: '0.05em' }}
>
  南道
</text>
```

Position: above existing element label (`cy - 4`) and "dominant" caption (`cy + preset.fontSize - 4`). Stack: 南道 (top, subtle) → element label (middle, dominant) → "dominant" caption (bottom, muted).

### 5. Branding canon doc

`canon/uzg-plus/uiux/v3/UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md` — 10 sections:
- §0 NTS verbatim authority
- §1 NAM TAO = triết lý hệ thống branding
- §2 Sizing rules table (per surface type)
- §3 NamTaoBadge size variant contract (5 variants with px + opacity)
- §4 Color (cosmic purple #5B4FA5)
- §5 Typography (Noto Sans CJK + DM Sans)
- §6 Placement rules (top bar / center / Pentagon)
- §7 Forbidden (NO 理數越南, NO mystical decorations, NO competing brand marks)
- §8 Required elements per surface (forward-binding for Sprint 4.4 / 4.5 / 4.6)
- §9 Versioning
- §10 Verification Playwright snippets

Forward bindings for future sprints:
- Sprint 4.4 (Bazi Premium): `<NamTaoBadge size="small" />` in 4-pillars chart center
- Sprint 4.5 (Phong Thủy): `<NamTaoBadge size="small" />` in compass center + Cửu Cung 9-grid center
- Sprint 4.6 (Lịch Vạn Niên Detail): `<NamTaoBadge size="medium" />` in detail header

## Verification

### Build
- `npm run build:v3`: PASS, 224 modules, 3.09s
- 0 TypeScript errors, 0 ESLint errors

### Local Playwright (`tests/visual/p4s3-1-branding.spec.mjs`)
- 8 tests:
  1-5: TAO Overview / Bazi Overview / Bazi Chart / Tử Vi Wizard / Tử Vi Chart all show 南道 NAM TAO in `[data-component="tao-top-bar"]`
  6: ZiweiCenterPanel Han font-size ≤ 24px (size constraint enforced)
  7: Top bar Han font-size 24-32px (medium range verified)
  8: ENTA Pentagon center has SVG `<text data-han>南道</text>`
- Result: **8/8 PASS in 8.5s**

### Production Playwright (`tests/visual/p4s3-1-branding-prod.spec.mjs`)
- Same 8 tests against `https://uzg.plus`
- Result: **8/8 PASS in 11.8s**

### KL-028 production probe
| Status | Path | Type |
|---|---|---|
| 200 | /v3/app/tao | TAO Overview |
| 200 | /v3/app/tao/bazi | Bazi Overview |
| 200 | /v3/app/tao/bazi/chart | Bazi Chart |
| 200 | /v3/app/tao/ziwei | Tử Vi Wizard/Chart |
| 200 | /v3/enta | ENTA (Pentagon visible) |
| 200 | /v3/home | V3 baseline |
| 200 | / | V2 baseline |

Bundle markers verified in `main-BDqrdlfB.js`: `tao-top-bar`, `nam-tao-badge`, `pentagon-wheel` (3/3 expected markers present).

## Mirror discipline (KL-32 + KL-33 enforced)

8 files explicitly mirrored:
- `src/components/tao/NamTaoBadge.module.css`
- `src/types/tao.ts`
- `src/components/tao/TaoMiniAppShell.tsx`
- `src/components/tao/TaoMiniAppShell.module.css`
- `src/components/tao/ziwei-v3/ZiweiCenterPanel.tsx`
- `src/components/tao/ziwei-v3/ZiweiInputWizard.tsx`
- `src/components/tao/ziwei-v3/ZiweiLoadingReveal.tsx`
- `src/components/enta/PentagonWheel.tsx`

Pre-commit `git diff --cached --stat apps/uzg-pwa/src/components/tao/{aier,ziwei}/` returned EMPTY (Lane_02 untouched). Dual-tree byte-identical verified per file.

Result: First-try clean build + deploy SUCCESS, no hot-fix-on-hot-fix.

## Files changed (16 files + screenshots + tests + canon doc)

**Components (`src/components/` + apps/-tree mirror):**
- tao/NamTaoBadge.module.css (+10 lines: pentagon + small variants, hero reduce)
- tao/TaoMiniAppShell.tsx (+1 line: data-component attr, +1 line: changed compact → medium)
- tao/TaoMiniAppShell.module.css (+5 lines: sticky position + z-index)
- tao/ziwei-v3/ZiweiCenterPanel.tsx (size="medium" → "small")
- tao/ziwei-v3/ZiweiInputWizard.tsx (size="hero" → "medium")
- tao/ziwei-v3/ZiweiLoadingReveal.tsx (size="hero" → "medium")
- enta/PentagonWheel.tsx (+13 lines: SVG `<text data-han>南道</text>`)

**Types:**
- types/tao.ts (added 'pentagon' | 'small' to NamTaoSize)

**Tests + screenshots:**
- tests/visual/p4s3-1-branding.spec.mjs (8 local tests)
- tests/visual/p4s3-1-branding-prod.spec.mjs (8 production tests)
- .lane_01/screenshots/p4s3-1-branding-local/*.png (6 local screenshots)

**Canon (Uniton_Shared):**
- canon/uzg-plus/uiux/v3/UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md

End of report.
