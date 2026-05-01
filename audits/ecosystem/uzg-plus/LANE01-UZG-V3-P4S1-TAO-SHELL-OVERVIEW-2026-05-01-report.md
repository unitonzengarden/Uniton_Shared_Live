---
task_id: LANE01-UZG-V3-P4S1-TAO-SHELL-OVERVIEW-2026-05-01T09-07Z
verify_task_id: LANE01-UZG-V3-P4S1-VERIFY-COMPLETE-2026-05-01T10-00Z
lane: Lane_01
executor: CLAC1
mode: solo
model: claude-sonnet-4-6
status: SUCCESS
phase: 4
sprint: 1
prs:
  - repo: unitonzengarden/uzgplus-app
    pr: 71
    sha: a4c40f96c2e9ef8a281c79fba3499afeed31e562
  - repo: unitonzengarden/uzgplus-app
    pr: null
    sha: 6a0003db1bcec97982ccf28b3a35b76e1070a947
    note: hot-fix
project: uzg-plus
---

# CLAC1 Solo Report: Sprint 4.1 TAO shell — SUCCESS (with hot-fix)

## Status
**SUCCESS** — Sprint 4.1 TAO LIVE at `uzg.plus/v3/app/tao/*` after hot-fix `6a0003d`.

## ⭐ NTS VERIFICATION URLS

```
https://uzg.plus/v3/app/tao              ← TAO shell with Overview + NAM TAO 南道
https://uzg.plus/v3/app/tao/overview     ← Overview (composes Pentagon-related ENTA preview + 3 sub-module tiles + Lịch widget)
https://uzg.plus/v3/app/tao/bazi         ← Sprint 4.2 placeholder
https://uzg.plus/v3/app/tao/ziwei        ← Sprint 4.3 placeholder
https://uzg.plus/v3/app/tao/phong-thuy   ← Sprint 4.5 placeholder
https://uzg.plus/v3/app/tao/lich-van-nien ← Sprint 4.6 placeholder (LichVanNienDailyWidget full variant)
```

NTS verification flow:
1. Click `/v3/app/tao` — see NAM TAO 南道 Han chữ centered (cosmic purple #5B4FA5).
2. Cultural framing strip top: "Tri thức cấu trúc Á Đông được nghiên cứu hàng ngàn năm. UZG+ trình bày để bạn tự hiểu cấu trúc của mình."
3. 3 sub-module tiles render with element-tinted left borders (Bazi amber / Tử Vi purple / Phong Thủy green) + "Sprint 4.X" Coming badges.
4. Lịch Vạn Niên Daily widget compact: "Hôm nay — Thứ Năm 01/05/2026" + Bính Tý + Hỏa element + ENTA match Hợp.

## What was deployed (Sprint 4.1)

### 6 components (`src/components/tao/`, dual-tree mirrored)

| Component | Purpose |
|---|---|
| `NamTaoBadge` | 3 sizes (compact 18px / medium 32px / hero 56px); renders 南道 Han chữ + romanized "NAM TAO"; cosmic purple #5B4FA5; font fallback Noto Sans CJK SC → TC → Serif → MS YaHei → PingFang SC |
| `CulturalFramingStrip` | 3 variants (default / short / reading); subtle purple-tinted bg; verbatim Vietnamese text per Phase 4 Design Pack Amendment 001 v2 |
| `TaoSubModuleTile` | 3 module variants (bazi/ziwei/phong-thuy) with element-tinted left border + Han chữ icon glyphs (柱/紫/羅) + Coming badge support |
| `LichVanNienDailyWidget` | Compact + full variants; ENTA match computation (sinh/khắc/hợp/trung); Vietnamese weekday formatter; element badge per dominant day element |
| `TaoOverview` | Composes all above + hasChart=false (Tạo lá số CTA) vs hasChart=true (preview card with Day Master + Mệnh palace + Cung Mệnh) + AIER Tao CTA bottom |
| `TaoMiniAppShell` | 5-tab nav (Overview/Bazi/Tử Vi/Phong Thủy/Lịch); sub-module placeholders for Sprints 4.2/4.3/4.5/4.6 |

Plus `tao-tokens.ts` (TAO color design tokens) + v3-shell.css :root vars + types/tao.ts + data/v3-mock-tao.ts (today's Lịch + 2 user states + ENTA match algorithm).

### V3MiniAppPage extension

```jsx
if (appName === 'tao') {
  return (
    <MiniAppTakeover appName="TAO" onClose={handleClose}>
      <TaoMiniAppShell user={user} initialTab={state || 'overview'} onClose={handleClose} />
    </MiniAppTakeover>
  );
}
```

`/v3/app/tao/:state` route allows direct deep-link to specific tab.

### NAM TAO 南道 branding canon enforced
- Han chữ rendered everywhere (compact top bar + medium hero + future hero in Sprint 4.3).
- Cosmic purple `#5B4FA5` verbatim per Amendment 001 v2.
- Font fallback chain handles Windows + Linux + macOS CJK rendering.
- **NEVER** 理數越南 / lyso.vn / Lý Số Hội Quán / PhuongSoft watermark.

### Cultural framing redlines
- Cultural pattern reflection framing on every TAO surface.
- Verbatim Vietnamese strings per Phase 4 Design Pack.
- NO destiny prescription / NO thầy-phán framing.

## Critical incident: build failure + hot-fix

### Initial state (during verify task at 10:00Z)
PR #71 merged at `a4c40f9` (09:18:54Z), but production version.json showed `930a7caa6bbc` (Sprint 8 SHA from 08:57:37Z) — Sprint 4.1 deploy never landed.

### Investigation (10:01–10:08Z)
- gh workflow runs showed:
  - "Deploy to Cloudflare Pages (Stable)" for PR #71 at 09:18:57Z → **FAILED in 46s**
  - "Deploy to Cloudflare Pages (Stable)" for my empty-commit retry at 10:01:46Z → **FAILED in 37s**
  - "TAO Bazi CI Regression" for PR #71 at 09:18:57Z → **FAILED in 1m33s**
- Build log root cause:
  ```
  Could not resolve "../../../../lib/tao/calendar/index.js"
  from "apps/uzg-pwa/src/components/tao/aier/AierTaoChatSurface.jsx"
  ```

### Root cause analysis
Sprint 4.1 mirror command `cp -R src/components/tao/. apps/uzg-pwa/src/components/tao/` recursively copied the **entire** src/-tree into apps/-tree, **overwriting** pre-existing Lane_02 files in `aier/` and `ziwei/` subdirs:

| File | Lines changed | Effect |
|---|---|---|
| `aier/AierTaoChatSurface.jsx` | 2 | Import path changed from 6-level (apps/-tree → root `lib/`) to 4-level (src/-tree → root `lib/`); 4-level resolves to nonexistent `apps/uzg-pwa/lib/` from apps/ position |
| `ziwei/ZiweiCenterPanel.jsx` | -38 | Lane_02 enhancements lost |
| `ziwei/ZiweiChartGrid.jsx` | -13 | Lane_02 enhancements lost |
| `ziwei/ZiweiPalaceCell.jsx` | -29 | Lane_02 enhancements lost |
| `ziwei/ZiweiYearSelector.jsx` | 2 | Minor change |

### Fix (commit `6a0003d`)
```bash
git checkout 930a7ca -- apps/uzg-pwa/src/components/tao/aier/ apps/uzg-pwa/src/components/tao/ziwei/
git commit -m "fix(p4s1): restore Lane_02 apps/.../tao/{aier,ziwei}/* clobbered by mirror"
git push origin main
```

5 files reverted to Sprint 8 (last successful build) state. 80 lines restored. Build PASS locally + Cloudflare deploy completed in ~90s.

### Lessons learned (KL candidate)

**KL-32 — KL-05 dual-tree caveat:** KL-05 byte-identical does NOT apply to relative-import paths that differ by tree depth. `src/components/.../foo.jsx` and `apps/uzg-pwa/src/components/.../foo.jsx` may have different relative `../../...` paths to shared targets in `lib/` because apps/-tree is 2 levels deeper than src/-tree.

**KL-33 — Mirror scope discipline:** Mirror commands must scope to NEW files only, never recursively copy entire shared subdirs. Use explicit file lists or selective `cp` instead of `cp -R dir/.`. When in doubt, check `git diff --stat <prev>..<my>` — any unexpected file in shared dirs (especially Lane_02/03/04 territory) means scope leak.

## Verification (post-fix)

### KL-028 production probe — PASS
```
GET https://uzg.plus/v3/app/tao              → 200 + product-v3-pages-shell ✅
GET https://uzg.plus/v3/app/tao/overview     → 200 + product-v3-pages-shell ✅
GET https://uzg.plus/v3/app/tao/bazi         → 200 + product-v3-pages-shell ✅
GET https://uzg.plus/v3/app/tao/ziwei        → 200 + product-v3-pages-shell ✅
GET https://uzg.plus/v3/app/tao/phong-thuy   → 200 + product-v3-pages-shell ✅
GET https://uzg.plus/v3/app/tao/lich-van-nien → 200 + product-v3-pages-shell ✅
```

### Existing V3 routes — no regression
7 sample routes probed: `/v3/{login,home,chat,wallet,enta,plus,app/u-reward}` — all 200 OK + product-v3-pages-shell.

### V2 baseline — no regression
`/`, `/login` → 200 OK + product-v2-pages-shell.

### Deploy SHA verified
```
GET https://uzg.plus/runtime/version.json → {"commit":"6a0003db1bce","time":"2026-05-01T10:11:..Z"}
```

### Bundle TAO identifier verification
```
curl https://uzg.plus${main-bundle.js} | grep -oE "(NamTaoBadge|TaoMiniAppShell|TaoOverview|LichVanNien|cultural-framing|nam-tao)"
→ LichVanNien, cultural-framing, nam-tao (minified — minifier shortened other names but TAO module is bundled)
```

### KL-030 production Playwright — PASS
```
QA_BASE_URL=https://uzg.plus npx playwright test tests/visual/p4s1-tao-routes-prod.spec.mjs --config playwright.v3.config.js
Result: 21 passed (25.9s)
```

- 18 routes × viewports: `#root max-width = 480px` on tablet (768) + desktop (1920) ✅
- NAM TAO 南道 Han chữ renders ✅
- 3 sub-module tiles render ✅
- Cultural framing strip present ✅

### 18 production screenshots captured
`audits/ecosystem/uzg-plus/sprints/phase-4-sprint-1/screenshots/`:
```
{mobile-380, tablet-768, desktop-1920} × {tao-overview, tao-bazi-placeholder, tao-ziwei-placeholder, tao-phong-thuy-placeholder, tao-lich-placeholder, home-baseline}
```

## Self-Check (24/24 ✓)

1. ☑ Sprint 1-7+8 dependencies verified
2. ☑ TAO design tokens added
3. ☑ NamTaoBadge with 3 size variants
4. ☑ NAM TAO 南道 Han chữ renders correctly
5. ☑ CulturalFramingStrip with 3 variants
6. ☑ TaoSubModuleTile with 3 module variants
7. ☑ LichVanNienDailyWidget compact + full
8. ☑ ENTA match computation (sinh/khắc/hợp/trung)
9. ☑ TaoOverview composes all
10. ☑ TaoMiniAppShell 5-tab nav
11. ☑ V3MiniAppPage wires `appName='tao'`
12. ☑ Mock fixtures complete
13. ☑ Build exit 0 (after hot-fix)
14. ☑ Dual-tree pattern preserved (Lane_02 territory restored)
15. ☑ 21/21 local Playwright PASS (in original Sprint 4.1 task)
16. ☑ KL-030 #root max-width 480px tablet+desktop
17. ☑ uzgplus-app PR #71 merged + hot-fix `6a0003d` deployed
18. ☑ KL-028 6 NEW + 7 EXISTING V3 + 2 V2 baseline (no regression)
19. ☑ 18 production screenshots cross-published (this PR)
20. ☑ 3 DOT at ROOT + Live mirror verify (post-merge)
21. ☑ No secrets in any commit
22. ☑ Lane_02 territory restored (apps/.../tao/{aier,ziwei})
23. ☑ Cloudflare deploy verified (version.json `6a0003db1bce`)
24. ☑ KL-32/33 documented in §Lessons learned

## Time
- Original Sprint 4.1 build: ~75 min (per p4s1 task report)
- Verify task + diagnose + fix + KL-028 + KL-030 + 3 DOT: ~30 min
- **Combined Sprint 4.1 total: ~105 min**

## CRSP report-to-runtime: COMPLETE

CLA fetches Live mirror automatically. Sprint 4.1 SUCCESS confirmed. Ready for CLA to dispatch Sprint 4.2 Bazi.

End of report.
