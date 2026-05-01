---
canon_id: UZG-PLUS-V3-NAM-TAO-BRANDING-CANON-V1
version: 1.0
status: ACTIVE
authority: NTS verbatim 2026-05-01
applies_to: All UZG+ V3 TAO + ENTA + future-Phong-Thủy + Lịch surfaces
issued: 2026-05-01
---

# UZG+ V3 — NAM TAO 南道 Branding Canon v1.0

## §0 NTS verbatim authority

> **"Chữ 南道 NAM TAO để trên tab trên cùng của toàn mục uzg.plus/tao/... có chữ trên tab chính. 南道 NAM TAO chữ này để nhỏ ở trên khung giữa của lá số tử vi, của bảng phong thủy bát trạch, của bảng Bát tự, của bảng ENTA.... bộ chữ thương hiệu '南道 NAM TAO' là branding của hệ thống triết lý Nam Tao."**
> — NTS, 2026-05-01

## §1 NAM TAO 南道 = triết lý hệ thống branding

NAM TAO 南道 ("Nam Đạo" — Way of the South) là **branding xuyên suốt** của UZG+ ecosystem. Không chỉ là TAO module label — là **identity của triết lý hệ thống** (cosmic purple #5B4FA5 represents both NAM TAO branding + ENTA Pentagon dominant axis).

Pattern:
- **TOP placement**: NAM TAO appears at top bar of TAO mini-app shell — visible on ALL TAO surfaces (Overview / Bazi / Tử Vi / Phong Thủy / Lịch).
- **CENTER placement**: NAM TAO appears subtle (small) in the geometric/visual CENTER of charts and grids:
  - Tử Vi center panel (between 4×3 cung grid)
  - Bazi 4-pillars chart center (Sprint 4.4 future)
  - Phong Thủy Bát Trạch compass center (Sprint 4.5 future)
  - Cửu Cung Phi Tinh 9-grid center (Sprint 4.5 future)
  - Lịch Vạn Niên detail header (Sprint 4.6 future)
  - ENTA Pentagon center (Sprint 6 — extended via this canon)

## §2 Sizing rules

| Context | Han size | Romanized | Variant |
|---|---|---|---|
| TaoMiniAppShell top bar | 28px | 11px | `medium` |
| TaoOverview hero | 28px | 11px | `medium` |
| Tử Vi wizard hero | 28px | 11px | `medium` (reduced from `hero`) |
| Tử Vi loading reveal | 28px | 11px | `medium` (reduced from `hero`) |
| Tử Vi chart center panel | 20px | 9px | `small` |
| Bazi 4-pillars center | 20px | 9px | `small` (Sprint 4.4) |
| Phong Thủy compass center | 20px | 9px | `small` (Sprint 4.5) |
| Cửu Cung Phi Tinh grid center | 20px | 9px | `small` (Sprint 4.5) |
| Lịch Vạn Niên detail header | 28px | 11px | `medium` (Sprint 4.6) |
| ENTA Pentagon center | 14px (SVG text) | none | `pentagon` (subtle 0.55 opacity) |
| Compact label / icon | 18px | 9px | `compact` |
| Hero (rare) | 40px | 12px | `hero` (reserved for marketing splash) |

## §3 NamTaoBadge size variants (component contract)

```typescript
type NamTaoSize = 'pentagon' | 'compact' | 'small' | 'medium' | 'hero';
```

| Size | Han px | Romanized px | Use case | Opacity |
|---|---|---|---|---|
| `pentagon` | 14 | 7 (or hidden) | ENTA Pentagon SVG center, micro inline mention | 0.55 (subtle) |
| `compact` | 18 | 9 | Toolbar, navigation chip, list item | 1.0 |
| `small` | 20 | 9 | Geometric center of chart/grid (Tử Vi / Bazi / Phong Thủy) | 1.0 |
| `medium` | 28 | 11 | Top bar, hero of input wizards, loading reveals, page heroes | 1.0 |
| `hero` | 40 | 12 | Reserved for marketing splash / onboarding intro | 1.0 |

Hero reduced from 56px (Sprint 4.3) → 40px (Sprint 4.3.1) per NTS feedback.

## §4 Color

- Han chữ 南道: `var(--nam-tao-primary, #5B4FA5)` — cosmic purple
- Romanized "NAM TAO": `var(--nam-tao-primary, #5B4FA5)` — cosmic purple
- Pentagon center variant: same color, opacity 0.55 to read as decorative branding rather than primary content

## §5 Typography

- Han 南道: `'Noto Sans CJK SC', 'Noto Sans CJK TC', 'Noto Serif CJK SC', 'Microsoft YaHei', 'PingFang SC', sans-serif` font weight 700, letter-spacing 0.05em
- Romanized "NAM TAO": `'DM Sans', system-ui, sans-serif` font weight 600, letter-spacing 0.15em (small) / 0.18em (small specifically)
- All caps for romanized

## §6 Placement rules

### §6.1 Top bar (sticky)

- ALL TAO mini-app surfaces MUST render NamTaoBadge `medium` centered in `<header className={styles.topBar}>`
- Position: sticky top, z-index above tab nav
- Below top bar: 5-tab nav (Overview / Bazi / Tử Vi / Phong Thủy / Lịch)
- Border-bottom 1px subtle separator

### §6.2 Center placement

- ALL chart/grid surfaces with a geometric center MUST render NamTaoBadge `small` centered in the center area
- Stack order: NAM TAO at top of center area, followed by domain-specific content (birth info, element label, etc.)
- Subtle but always present — represents triết lý anchor at center of the structure

### §6.3 ENTA Pentagon

- PentagonWheel SVG MUST render `<text data-han>南道</text>` at SVG center
- Font size: `preset.fontSize - 6` (smaller than element label)
- Opacity: 0.55 (subtle decorative)
- Position: above element label (cy - preset.fontSize)

## §7 Forbidden

- ❌ NO 理數越南 / lyso.vn / Lý Số Hội Quán branding anywhere
- ❌ NO mystical decorations (đèn lồng, ông già, clouds, sun rays)
- ❌ NO sound effects on NAM TAO appearance
- ❌ NO competing brand marks at same position as NAM TAO
- ❌ NO hero size (40px+) outside marketing splash
- ❌ NO romanized without Han 南道 (always pair both)

## §8 Required elements per surface

| Surface | Top bar | Center | Hero | Pentagon |
|---|---|---|---|---|
| TAO Overview | ✅ medium | — | ❌ (use top bar only) | — |
| Bazi Overview | ✅ medium | — | — | — |
| Bazi 4-Pillars Chart | ✅ medium | ✅ small (Sprint 4.4) | — | — |
| Bazi Day Master Analysis | ✅ medium | — | — | — |
| Bazi Useful God Reading | ✅ medium | — | — | — |
| Tử Vi Wizard | ✅ medium | — | ✅ medium (reduced) | — |
| Tử Vi Loading Reveal | ✅ medium | — | ✅ medium (reduced) | — |
| Tử Vi Chart Full | ✅ medium | ✅ small | — | — |
| Tử Vi Palace Detail Sheet | ✅ medium | — | — | — |
| Phong Thủy Bát Trạch | ✅ medium | ✅ small (Sprint 4.5) | — | — |
| Cửu Cung Phi Tinh | ✅ medium | ✅ small (Sprint 4.5) | — | — |
| Lịch Vạn Niên (compact widget) | — | — | — | — |
| Lịch Vạn Niên Detail | ✅ medium | — | ✅ medium (Sprint 4.6) | — |
| ENTA Identity / Resonance / Circles / Journey | — | — | — | ✅ pentagon (Sprint 4.3.1+) |
| ENTA Onboarding | — | — | — | ✅ pentagon |
| ENTA Public View | — | — | — | ✅ pentagon |

## §9 Versioning + amendments

- v1.0 (2026-05-01): Initial canon per NTS verbatim feedback post Sprint 4.3
- Amendments via Sprint task spec only, NOT inline edits

## §10 Verification

Playwright tests MUST verify NAM TAO presence:

```javascript
// Top bar visibility on every TAO surface
const topBarHan = page.locator('[data-component="tao-top-bar"] [data-han]').first();
await expect(topBarHan).toHaveText('南道');

// Center panel size constraint (≤24px)
const centerHan = page.locator('[data-component="ziwei-center-panel"] [data-han]').first();
const fontSize = await centerHan.evaluate(el => parseFloat(getComputedStyle(el).fontSize));
expect(fontSize).toBeLessThanOrEqual(24);

// Pentagon center 南道 SVG text
const pentagonHan = page.locator('[data-component="pentagon-wheel"] text[data-han]');
await expect(pentagonHan).toHaveText('南道');
```

End of canon.
