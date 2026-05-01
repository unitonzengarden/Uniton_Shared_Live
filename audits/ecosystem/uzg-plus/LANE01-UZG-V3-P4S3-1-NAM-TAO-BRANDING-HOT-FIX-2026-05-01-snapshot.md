---
task_id: LANE01-UZG-V3-P4S3-1-NAM-TAO-BRANDING-HOT-FIX-2026-05-01T12-35Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-opus-4-7
status: SUCCESS
phase: 4
sprint: 3.1
type: HOT-FIX (branding consistency)
priority: P0
nts_verbatim: "Chữ 南道 NAM TAO để trên tab trên cùng của toàn mục uzg.plus/tao/... có chữ trên tab chính. 南道 NAM TAO chữ này để nhỏ ở trên khung giữa của lá số tử vi, của bảng phong thủy bát trạch, của bảng Bát tự, của bảng ENTA.... bộ chữ thương hiệu '南道 NAM TAO' là branding của hệ thống triết lý Nam Tao."
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 75
    sha: 9aa13754b0dde1aec5035fe9038b35febdc1472a
    note: "NAM TAO branding consistency hot-fix; clean merge first try"
project: uzg-plus
canon_added:
  - canon/uzg-plus/uiux/v3/UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md
canon_compliance:
  - section: NAM TAO 南道 visible on every TAO surface (top bar)
    status: PASS (verified 5 surfaces)
  - section: NAM TAO 南道 subtle in geometric centers (small variant)
    status: PASS
  - section: ENTA Pentagon center has 南道 SVG text (pentagon variant)
    status: PASS
  - section: KL-32 + KL-33 mirror discipline
    status: PASS (Lane_02 untouched)
---

# LANE01-UZG-V3-P4S3-1-NAM-TAO-BRANDING-HOT-FIX-2026-05-01 — Snapshot

**Status:** SUCCESS (clean merge first try, ~30 min total)

## NTS verbatim authority
> "Chữ 南道 NAM TAO để trên tab trên cùng của toàn mục uzg.plus/tao/... có chữ trên tab chính. 南道 NAM TAO chữ này để nhỏ ở trên khung giữa của lá số tử vi, của bảng phong thủy bát trạch, của bảng Bát tự, của bảng ENTA.... bộ chữ thương hiệu '南道 NAM TAO' là branding của hệ thống triết lý Nam Tao."
> — NTS, 2026-05-01

## Highlights
- 5 changes deployed in single hot-fix sprint
- NEW canon doc `UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md` locks branding pattern for Sprint 4.4 / 4.5 / 4.6
- 8/8 production Playwright PASS in 11.8s
- KL-028 PASS: 7/7 sample routes 200, bundle markers verified (`tao-top-bar`, `nam-tao-badge`, `pentagon-wheel`)
- KL-32 + KL-33 enforced — Lane_02 territory untouched

## Changes

### 1. NamTaoBadge size system extended

| Variant | Han px | Romanized px | Use | Opacity |
|---|---|---|---|---|
| pentagon (NEW) | 14 | 7 | ENTA Pentagon center (subtle) | 0.55 |
| compact | 18 | 9 | Toolbar / nav chip (existing) | 1.0 |
| small (NEW) | 20 | 9 | Chart/grid centers | 1.0 |
| medium | 28 (was 32) | 11 | TOP BAR + page heroes | 1.0 |
| hero | 40 (was 56) | 12 | Marketing splash only | 1.0 |

### 2. TaoMiniAppShell top bar (NEW)

Renders `<NamTaoBadge size="medium" showRomanized centered />` in sticky top bar with `data-component="tao-top-bar"`. Visible on ALL TAO surfaces (Overview / Bazi / Tử Vi / Phong Thủy / Lịch).

### 3. Center panel resizing

| Component | Before | After |
|---|---|---|
| ZiweiCenterPanel | medium 28px | small 20px |
| ZiweiInputWizard hero | hero 40px | medium 28px |
| ZiweiLoadingReveal | hero 40px | medium 28px |

### 4. ENTA PentagonWheel center 南道 (NEW)

Added SVG `<text data-han lang="zh-Hant">南道</text>` at SVG center:
- Position: `cy - preset.fontSize` (above element label)
- fontSize: `preset.fontSize - 6` (smaller than element)
- fillOpacity: 0.55 (decorative subtle)
- Color: `var(--nam-tao-primary)` cosmic purple

### 5. Branding canon doc (NEW)

`canon/uzg-plus/uiux/v3/UZG_PLUS_V3_NAM_TAO_BRANDING_CANON_v1.md` — locks:
- §1 NAM TAO = triết lý hệ thống branding (TOP placement + CENTER placement pattern)
- §2 Sizing rules table per surface type
- §3 NamTaoBadge size variant contract
- §6 Placement rules (top bar / center / Pentagon)
- §7 Forbidden (NO 理數越南, NO mystical decorations, etc.)
- §8 Required elements per surface (with Sprint 4.4-4.6 forward bindings)
- §10 Verification Playwright snippets

## PRs
| Repo | PR | Merge SHA | Merged | Notes |
|---|---|---|---|---|
| unitonzengarden/uzgplus-app | #75 | `9aa1375` | 2026-05-01T12:47:32Z | NAM TAO branding hot-fix; deploy SUCCESS in ~90s |
| unitonzengarden/Uniton_Shared | TBD | TBD | TBD | 3 DOT + canon doc + 6 prod screenshots |

## Verification

### Local Playwright (8 tests)
- 5 surfaces × top bar 南道 NAM TAO assertion (TAO Overview / Bazi Overview / Bazi Chart / Tử Vi Wizard / Tử Vi Chart)
- ZiweiCenterPanel Han ≤ 24px size constraint
- Top bar Han 24-32px medium range
- ENTA Pentagon center has SVG `<text data-han>南道</text>`
- Result: **8/8 PASS in 8.5s**

### Production Playwright
- Same 8 tests against `https://uzg.plus`
- Result: **8/8 PASS in 11.8s**

### KL-028 production probe
- 7/7 sample routes 200 (`/v3/app/tao`, `/bazi`, `/bazi/chart`, `/ziwei`, `/enta`, `/home`, `/`)
- Bundle markers verified in `main-BDqrdlfB.js`: `tao-top-bar`, `nam-tao-badge`, `pentagon-wheel`

### KL-030
- Top bar font-size verified within 24-32px medium range
- Center panel font-size verified ≤ 24px small constraint

## Mirror discipline (KL-32 + KL-33 ENFORCED)
- Explicit file-by-file copy (8 files mirrored)
- `git diff --cached --stat apps/.../{aier,ziwei}/` verified empty
- Dual-tree byte-identical for: NamTaoBadge.module.css, types/tao.ts, TaoMiniAppShell.tsx, TaoMiniAppShell.module.css, ZiweiCenterPanel.tsx, ZiweiInputWizard.tsx, ZiweiLoadingReveal.tsx, PentagonWheel.tsx
- Result: clean build first try, no hot-fix-on-hot-fix

## Live mirror URL (CRSP)
`https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/LANE01-UZG-V3-P4S3-1-NAM-TAO-BRANDING-HOT-FIX-2026-05-01-report.md`

End of snapshot.
