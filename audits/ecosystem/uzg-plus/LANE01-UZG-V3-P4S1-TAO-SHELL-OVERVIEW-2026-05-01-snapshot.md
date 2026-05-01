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
    note: "TAO components + V3MiniAppPage extension; build failed due to clobbered Lane_02 import paths"
  - repo: unitonzengarden/uzgplus-app
    pr: null
    sha: 6a0003db1bcec97982ccf28b3a35b76e1070a947
    note: "Hot-fix on main: revert apps/uzg-pwa/src/components/tao/{aier,ziwei}/ to Sprint 8 (930a7ca) state to restore Lane_02 import paths; build PASS, deploy SUCCESS"
project: uzg-plus
canon_compliance:
  - section: NAM TAO 南道 branding (Phase 4 Design Pack Amendment 001 v2)
    status: PASS
  - section: Cultural framing strip on TAO surfaces
    status: PASS
  - section: KL-05 dual-tree caveat (relative imports differ by tree depth — documented in fix commit)
    status: NEW_LEARNING
---

# LANE01-UZG-V3-P4S1-TAO-SHELL-OVERVIEW-2026-05-01 — Snapshot

**Status:** SUCCESS (after hot-fix `6a0003d` on main)

## Highlights
- Sprint 4.1 TAO mini app shell + Overview + 6 sub-module/lich routes LIVE at `uzg.plus/v3/app/tao/*`
- 6 components dual-tree (NamTaoBadge / CulturalFramingStrip / TaoSubModuleTile / LichVanNienDailyWidget / TaoOverview / TaoMiniAppShell)
- NAM TAO 南道 Han chữ verified rendering (Playwright `[data-han]` text content `南道`)
- 21/21 production Playwright PASS in 25.9s (18 routes × viewports + 3 functional assertions: Han chữ + 3 sub-module tiles + cultural framing)
- KL-028 PASS: 6 NEW V3 TAO routes 200 + product-v3-pages-shell

## Critical incident + fix (during verify task)

**Initial state:** PR #71 merged at `a4c40f9` (09:18:54Z) but Cloudflare deploy FAILED:
```
Could not resolve "../../../../lib/tao/calendar/index.js" from
"apps/uzg-pwa/src/components/tao/aier/AierTaoChatSurface.jsx"
```

**Root cause:** Sprint 4.1 mirror command `cp -R src/components/tao/. apps/uzg-pwa/src/components/tao/` recursively copied src/-tree into apps/-tree, OVERWRITING pre-existing Lane_02 files in `aier/` and `ziwei/` subdirs. Those Lane_02 files had relative imports calibrated for apps/-tree depth (6 levels up to repo root), but src/-tree versions used 4 levels up — when forced into apps/-tree, the 4-level path resolved to nonexistent `apps/uzg-pwa/lib/tao/calendar/`.

**Fix (commit `6a0003d`):** `git checkout 930a7ca -- apps/uzg-pwa/src/components/tao/{aier,ziwei}/` reverted Lane_02 territory to Sprint 8 (last successful build) state. 5 files reverted (4 ZiWei + 1 AierTaoChat), 80 lines restored.

**Lessons learned (KL candidate KL-32):** KL-05 dual-tree byte-identical does NOT apply to relative-import paths that differ by tree depth. Mirror commands must scope to NEW files only, never recursively copy entire shared subdirs.

## PRs
| Repo | PR | Merge SHA | Merged | Notes |
|---|---|---|---|---|
| unitonzengarden/uzgplus-app | #71 | `a4c40f9` | 2026-05-01T09:18:54Z | TAO components + V3MiniAppPage; build FAILED |
| unitonzengarden/uzgplus-app | (direct main) | `6a0003d` | 2026-05-01T10:10Z | Hot-fix: restore Lane_02 imports; build + deploy PASS |
| unitonzengarden/Uniton_Shared | TBD (this commit) | TBD | TBD | 3 DOT cross-publish |

## Deploy timeline (verify task)
- 10:00Z — Verify task issued; production version.json shows Sprint 8 SHA (Sprint 4.1 deploy never landed)
- 10:01Z — Investigation: gh workflow runs show "Deploy to Cloudflare Pages" FAILED for PR #71 + my empty-commit retry
- 10:08Z — Build log inspected: `Could not resolve` error in clobbered Lane_02 file
- 10:10Z — Hot-fix commit `6a0003d` pushed; Cloudflare auto-deploy triggered
- 10:11Z — Production version.json updated to `6a0003db1bce`
- 10:11Z — KL-028 probe PASS (6/6 V3 TAO routes 200)
- 10:12Z — KL-030 production Playwright PASS (21/21 in 25.9s)

## Live mirror URL (CRSP)
`https://raw.githubusercontent.com/unitonzengarden/Uniton_Shared_Live/main/audits/ecosystem/uzg-plus/LANE01-UZG-V3-P4S1-TAO-SHELL-OVERVIEW-2026-05-01-report.md`

End of snapshot.
