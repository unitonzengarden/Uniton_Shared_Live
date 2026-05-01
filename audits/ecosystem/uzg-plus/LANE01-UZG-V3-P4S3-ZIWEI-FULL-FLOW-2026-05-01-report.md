---
task_id: LANE01-UZG-V3-P4S3-ZIWEI-FULL-FLOW-2026-05-01T11-17Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-opus-4-7
status: SUCCESS
phase: 4
sprint: 3
priority: P0
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 73
    sha: 0b8ee0fa058f800b30a52ae146ce69329b666178
project: uzg-plus
---

# CLAC1 Solo Report: Sprint 4.3 Tử Vi Full Flow PREMIUM — SUCCESS

## Status
**SUCCESS** — Sprint 4.3 Tử Vi Full Flow LIVE at `uzg.plus/v3/app/tao/ziwei`. Clean merge, no hot-fix needed. Premium production-grade per NTS verbatim.

## NTS verbatim quality bar
> **"LÀM CHUẨN GIÚP TÔI BẢN CAO CẤP NHẤT TỬ VI"** — NTS, 2026-05-01

Tử Vi = trang số 1 của UZG+ ecosystem (Sprint rearranged — Tử Vi prioritized #1 product surface).

## ⭐ NTS VERIFICATION URLS

```
https://uzg.plus/v3/app/tao/ziwei              ← Tử Vi root (wizard if no chart, chart if exists)
```

NTS verification flow:
1. Click `/v3/app/tao/ziwei` (first time, no chart in localStorage):
   - **Wizard surface 1** renders with NAM TAO 南道 hero (Han chữ cosmic purple 56px)
   - 5 fields visible: Họ tên / Giới tính (Nam/Nữ segmented) / Ngày sinh (date + Solar/Lunar toggle) / Giờ sinh (12 Can-Chi options + "Tôi không biết" checkbox) / Năm xem (default 2026 Bính Ngọ)
   - CTA "AN SAO TỬ VI" full-width 56px gradient cosmic purple
   - Cultural framing strip "Đây là pattern reflection — hiểu để self-determine."
   - **NO mystical decorations** (NO đèn lồng / NO ông già / NO clouds)
2. Click "AN SAO TỬ VI" → **Loading reveal surface 2a** ~3s:
   - Calm SVG spinner cosmic purple (NO mystical animation)
   - 5 progress bullets: "Đang xử lý thông tin sinh" → "Đang xác định Mệnh + Cục" → etc.
   - Educational tone, NOT "Đang khám phá vận mệnh..."
3. Loading completes → **Chart full surface 2b**:
   - 12 cung 4×3 grid (horizontal scroll on mobile)
   - Center panel showing 南道 NAM TAO + birth info dl (Họ tên / Năm sinh + Can-Chi / etc.)
   - Diagonal lines crossing center (decorative)
   - **MỆNH palace HIGHLIGHTED** with cosmic purple border + box-shadow
   - **Tuần marker** (Mộc green) on Hợi palace (top-left corner)
   - **Triệt marker** (Thổ amber) on Thân palace (top-right corner)
   - Color coding: Chính tinh black bold (Tử Vi / Thái Dương / Vũ Khúc / etc.) / Cát red (Lộc Tồn / Hóa Lộc) / Hung dark (Hóa Kỵ) / Phụ gray (Thiên Khôi / Văn Xương / etc.) / Tứ Hóa italic indigo (L.Hóa Quyền / L.Thiên Khốc / etc.)
   - Brightness suffix in parens: (H) Miếu / (M) Vượng / (V) Đắc địa / (Đ) Đắc / (D) Bình hòa / (B) Hãm — opacity scale
4. Tap any palace → **Detail sheet surface 3** bottom 70%:
   - Header: "Cung B.Tý" / "MỆNH" big title
   - Sections: VAI TRÒ CUNG / CHÍNH TINH (Thái Dương + Miếu badge) / PHỤ TINH list / CÁT TINH / HUNG TINH / TỨ HÓA ẢNH HƯỞNG (italic indigo) / GIAI ĐOẠN VẬN (Đế Vượng cosmic purple)
   - Cultural framing strip
   - "Hỏi AIER Tử Vi về cung này →" CTA cosmic purple
   - "So sánh với Bazi" cross-link Thổ amber

## What was deployed (Sprint 4.3)

### 8 components (`src/components/tao/ziwei-v3/`, dual-tree mirrored)

| Component | Lines (TSX/CSS) | Purpose |
|---|---|---|
| `ZiweiStarLine` | 34 / 34 | Foundational color + brightness rendering. Star type → CSS color + font-style + weight. Brightness → opacity + italic/bold modifier. |
| `ZiweiTuanTrietMarker` | 20 / 22 | Corner badge (top-left for TUẦN, top-right for TRIỆT). Mộc green / Thổ amber background. 9px Syne 700 white text, 2x6px padding, border-radius 0 0 4px 4px. |
| `ZiweiCenterPanel` | 95 / 116 | Info panel between rows 2-3. NAM TAO 南道 hero (medium size showRomanized centered). Birth info `<dl>` (6 rows: Họ tên / Năm sinh / Tháng sinh / Ngày sinh / Giờ sinh / Năm xem) with Can-Chi annotations. Meta info: Âm Dương / Mệnh / Cục / Thân cư / Mệnh chủ / Thân chủ. Footer: UZG+ logo + QOT QR placeholder button. |
| `ZiweiPalaceCell` | 89 / 129 | Single palace 4×3 grid cell. Header row (Can-Chi + cung name + age). Chính tinh row (centered, large Syne 700 with brightness suffix). Phụ + Hung + Cát + Tứ Hóa stars in 2-column rows (chunked). Footer (lifespan stage + nam). Tuần/Triệt corner marker if applicable. data-palace-cell, data-palace-name, data-can-chi, data-is-menh attrs. |
| `ZiweiPalaceDetailSheet` | 141 / 195 | Bottom sheet 70% height with slide-up 240ms cubic-bezier. Esc + backdrop close. Header (Cung label + name + close). Body sections: VAI TRÒ CUNG (educational framing) / CHÍNH TINH (with brightness label badge "Miếu" etc.) / PHỤ TINH (count) / CÁT TINH / HUNG TINH / TỨ HÓA ẢNH HƯỞNG / GIAI ĐOẠN VẬN / TUẦN/TRIỆT marker explanation if applicable. Cultural framing strip. AIER Tử Vi CTA + So sánh Bazi cross-link. |
| `ZiweiLoadingReveal` | 77 / 95 | Calm SVG `<circle>` spinner cosmic purple 1.4s rotate (respects `prefers-reduced-motion`). NamTaoBadge hero. "Đang tính lá số…" Syne 700 + "~3–5 giây" subtitle. 5-step progress bullets cycling 600ms each: ✓ done / ⋯ active / ○ pending. |
| `ZiweiPalaceChartFull` | 67 / 103 | Root composer. Top bar (back + "Lá Số Tử Vi" title + share). Scroll wrapper (mobile horizontal scroll, min-width 460-520px). Grid 4×4 with 4×3 palaces around center 2×2 panel via grid-row/grid-column. SVG diagonal lines decorative (X cross). |
| `ZiweiInputWizard` | 204 / 180 | 5 fields form. NAM TAO 南道 hero 56px. Cultural framing strip. Form fields: Họ tên (text input), Giới tính (segmented radio Nam/Nữ), Ngày sinh (date input + Dương/Âm lịch toggle), Giờ sinh (12 Can-Chi `<select>` + "Tôi không biết" checkbox), Năm xem (number input default 2026). CTA "AN SAO TỬ VI" 56px gradient cosmic purple → accent. Footer note. |

### 3 utils (`src/components/tao/ziwei-v3/utils/`)

| Util | Purpose |
|---|---|
| `palacePosition.ts` | Palace index 0-11 → `{ row, col }` grid position (clockwise from row 1 col 1 around perimeter, skipping center 2×2). |
| `colorMap.ts` | `STAR_COLOR` (CSS var per star type), `STAR_FONT_STYLE` (italic for tu-hoa), `STAR_FONT_WEIGHT` (700 chinh / 600 cat / 500 hung / 400 phu / 500 tu-hoa), `TUAN_TRIET_COLOR` (Mộc green / Thổ amber). |
| `brightnessOpacity.ts` | `BRIGHTNESS_OPACITY` (1.0 H / 0.95 M / 0.9 V / 0.85 Đ / 0.8 D / 0.65 B / 0.55 Hư / 0.5 Hãm), `BRIGHTNESS_LABEL` (Vietnamese labels for detail sheet badge), `BRIGHTNESS_FONT_STYLE` (italic for B/Hư/Hãm), `brightnessFontWeight()`. |

### Routing

`src/components/tao/TaoMiniAppShell.tsx` extended:
- Imports ZiweiInputWizard / ZiweiPalaceChartFull / ZiweiPalaceDetailSheet / ZiweiLoadingReveal from `./ziwei-v3`
- `ZiweiPhase = 'wizard' | 'loading' | 'chart'` state
- `ziweiChart` state from localStorage `uzg-ziwei-chart` key (writeZiweiChart / readZiweiChart helpers)
- `activePalaceIndex` state for detail sheet
- `renderZiweiContent()` switch over phase
- Wizard submit → `setZiweiPhase('loading')` → ZiweiLoadingReveal `onComplete` → `setZiweiPhase('chart')`
- Chart palace tap → `setActivePalaceIndex(idx)` → ZiweiPalaceDetailSheet opens
- "So sánh với Bazi" → `setActiveTab('bazi')` cross-link

### Mock data (`src/data/v3-mock-ziwei.ts`)

`MOCK_ZIWEI_CHART_HOA_USER`:
- birthInfo: Nam Tiên Sinh, Nam, 1984-03-06 mão giờ (5–7), Giáp Tý year, Hải Trung Kim Mệnh, Thủy Nhị Cục, Mệnh sinh Cục, Thân cư Thiên Di, Mệnh chủ Tham Lang, Thân chủ Hỏa Tinh
- 12 palaces with realistic Tử Vi data:
  - Index 0 K.Tị NÔ BỘC Thiên Tướng(Đ) age 52
  - Index 1 C.Ngọ THIÊN DI/THÂN Thiên Lương(M) age 62
  - Index 2 T.Mùi TẬT ÁCH Liêm Trinh(Đ) age 72 (Văn Xương / Văn Khúc / Hóa Lộc cát)
  - Index 3 N.Thân TÀI BẠCH (empty chính tinh) age 82 — **TRIỆT marker top-right**
  - Index 4 Q.Dậu TỬ TỨC (empty chính tinh) age 92 (Hữu Bật cát)
  - Index 5 G.Tuất PHU THÊ Thiên Đồng(H) age 102
  - Index 6 A.Hợi HUYNH ĐỆ Vũ Khúc(H) age 112 — **TUẦN marker top-left**
  - Index 7 B.Tý **MỆNH** Thái Dương(H) age 2 (Tứ Hóa: L.Thiên Khốc / L.Thiên Hư)
  - Index 8 D.Sửu PHỤ MẪU Thiên Phủ(B) age 12
  - Index 9 B.Dần PHÚC ĐỨC Thiên Cơ(H) age 22 (Lộc Tồn / Thiên Y cát; Tứ Hóa L.Hóa Quyền)
  - Index 10 D.Mão ĐIỀN TRẠCH Tử Vi(B) age 32
  - Index 11 M.Thìn QUAN LỘC Cự Môn(H) age 42

### CSS tokens (`src/v3-shell.css` appended)

```css
--nam-tao-accent: #7B6BC9;
--ziwei-chinh-tinh: #1A1410;
--ziwei-cat-tinh: #C92B2B;
--ziwei-hung-tinh: #2D1F1F;
--ziwei-trung-tinh: #4A4642;
--ziwei-tu-hoa: #5B4FA5;
--ziwei-tuan: #1D9E75;
--ziwei-triet: #BA7517;
--ziwei-cell-bg: rgba(255, 255, 255, 0.04);
--ziwei-cell-bg-hover: rgba(255, 255, 255, 0.06);
--ziwei-cell-border: rgba(255, 255, 255, 0.08);
--ziwei-center-bg: rgba(91, 79, 165, 0.04);
--ziwei-center-border: rgba(91, 79, 165, 0.16);
```

Plus light theme override block.

## Verification

### Build
- `npm run build:v3`: PASS, 224 modules, 3.15s
- 0 TypeScript errors, 0 ESLint errors

### Local Playwright (`tests/visual/p4s3-ziwei-routes.spec.mjs`)
- 9 tests:
  1. mobile-380-wizard-renders (NAM TAO 南道 + 5 fields + CTA + KL-030)
  2. tablet-768-wizard-renders
  3. desktop-1920-wizard-renders
  4. mobile-380-chart-renders (12 palace cells + center panel + Mệnh + Tuần + Triệt)
  5. tablet-768-chart-renders
  6. desktop-1920-chart-renders
  7. mobile-380-detail-sheet-opens (cung-info + chinh-tinh + phu-tinh sections)
  8. wizard-submit-shows-loading (contains "Đang tính lá số" not "vận mệnh")
  9. star-color-coding-correct (data-star-type="tu-hoa" + data-star-type="chinh" present)
- Result: **9/9 PASS in 10.1s**

### Production Playwright (`tests/visual/p4s3-ziwei-routes-prod.spec.mjs`)
- Same 9 tests against `https://uzg.plus`
- Result: **9/9 PASS in 13.4s**

### KL-028 production probe (14 routes)

| Status | Path | Type |
|---|---|---|
| 200 | /v3/app/tao/ziwei | NEW Tử Vi |
| 200 | /v3/app/tao | Sprint 4.1 baseline |
| 200 | /v3/app/tao/bazi | Sprint 4.2 |
| 200 | /v3/app/tao/bazi/chart | Sprint 4.2 |
| 200 | /v3/app/tao/bazi/day-master | Sprint 4.2 |
| 200 | /v3/app/tao/bazi/useful-god | Sprint 4.2 |
| 200 | /v3/app/tao/phong-thuy | Sprint 4.1 placeholder |
| 200 | /v3/home | V3 baseline |
| 200 | /v3/login | V3 baseline |
| 200 | /v3/wallet | V3 baseline |
| 200 | /v3/enta | V3 baseline |
| 200 | /v3/plus | V3 baseline |
| 200 | / | V2 baseline |
| 200 | /login | V2 baseline |

Bundle markers verified in `main-BmWuXQ36.js`: `ziwei-input-wizard`, `ziwei-palace-chart-full`, `ziwei-center-panel`, `ziwei-palace-detail-sheet`, `ziwei-loading-reveal`, `南道`, `AN SAO TỬ VI` (7/7 expected markers present).

## Mirror discipline (KL-32 + KL-33 ENFORCED via namespace separation)

Sprint 4.3 strategy: instead of just discipline-enforcement on shared `tao/ziwei/` directory (which Lane_02 owns), I created a NEW `tao/ziwei-v3/` namespace. This eliminates clash possibility entirely:

- `src/components/tao/ziwei/` (Lane_02 territory) — UNTOUCHED
- `apps/uzg-pwa/src/components/tao/ziwei/` (Lane_02 territory) — UNTOUCHED
- `src/components/tao/ziwei-v3/` (NEW Lane_01 V3 UI) — created
- `apps/uzg-pwa/src/components/tao/ziwei-v3/` (NEW Lane_01 V3 UI) — created

Verification commands run pre-commit:
```bash
git diff --stat apps/uzg-pwa/src/components/tao/aier/ apps/uzg-pwa/src/components/tao/ziwei/
# Expected: empty → PASS
diff -rq src/components/tao/ziwei-v3/ apps/uzg-pwa/src/components/tao/ziwei-v3/
# Expected: empty → PASS
```

Result: **First-try clean build + deploy SUCCESS, no hot-fix needed**.

## Canon compliance

- **NAM TAO 南道** (Phase 4 Design Pack v1.2 Amendment 001 v2 §A): Han chữ in 4 surfaces (wizard hero / chart center panel / loading reveal / topbar via NamTaoBadge compact).
- **Cosmic purple #5B4FA5** consistent throughout (data tokens + accents + Mệnh palace highlight).
- **Vietnamese verbatim** labels: HỌ TÊN / GIỚI TÍNH / NGÀY SINH / GIỜ SINH / NĂM XEM TỬ VI / Nam / Nữ / Dương lịch / Âm lịch / Tôi không biết giờ sinh chính xác / AN SAO TỬ VI / Đang tính lá số / Lá số Tử Vi Đẩu Số / Cung B.Tý / MỆNH / VAI TRÒ CUNG / CHÍNH TINH / PHỤ TINH / CÁT TINH / HUNG TINH / TỨ HÓA ẢNH HƯỞNG / GIAI ĐOẠN VẬN / Hỏi AIER Tử Vi về cung này / So sánh với Bazi.
- **Han chữ verbatim**: 南道 in NamTaoBadge.tsx renders with `lang="zh-Hant"` aria-label.
- **Cultural framing strings** verbatim Vietnamese on every surface (wizard / detail sheet / footer).
- **NO 理數越南 / lyso.vn / Lý Số Hội Quán** in any deliverable.
- **NO mystical decorations**: No đèn lồng / no ông già / no clouds / no sun rays / no shooting stars / no chimes / no gongs.
- **Educational tone** in loading reveal: "Đang tính lá số" / "Đang xử lý thông tin sinh" / etc. — NOT fortune-telling language.
- **Polite framing in detail sheet**: "phản ánh pattern X trong cấu trúc Tử Vi của bạn. Đây là tham chiếu cấu trúc, không phải định mệnh."
- **R-CANON-02**: no Tier 1 canon mutations.

## Files changed (56 files, 4622 insertions, 8 deletions)

**Components (`src/components/tao/ziwei-v3/` + apps/-tree mirror):**
- ZiweiStarLine.tsx + .module.css
- ZiweiTuanTrietMarker.tsx + .module.css
- ZiweiCenterPanel.tsx + .module.css
- ZiweiPalaceCell.tsx + .module.css
- ZiweiPalaceDetailSheet.tsx + .module.css
- ZiweiLoadingReveal.tsx + .module.css
- ZiweiPalaceChartFull.tsx + .module.css
- ZiweiInputWizard.tsx + .module.css
- index.ts (barrel)
- utils/palacePosition.ts + colorMap.ts + brightnessOpacity.ts

**Types + data:**
- src/types/ziwei.ts + apps/uzg-pwa/src/types/ziwei.ts
- src/data/v3-mock-ziwei.ts + apps/uzg-pwa/src/data/v3-mock-ziwei.ts

**Shell + tokens:**
- src/components/tao/TaoMiniAppShell.tsx + apps/-tree mirror (added ziwei phase state, conditional render, palace detail sheet)
- src/v3-shell.css + apps/-tree mirror (added 14 ziwei tokens + nam-tao-accent + light theme override)

**Tests + screenshots:**
- tests/visual/p4s3-ziwei-routes.spec.mjs (9 local tests)
- tests/visual/p4s3-ziwei-routes-prod.spec.mjs (9 production tests, this commit)
- .lane_01/screenshots/p4s3-ziwei-local/*.png (5 local screenshots)

End of report.
