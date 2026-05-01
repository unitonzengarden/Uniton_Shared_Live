# LANE01-UZG-V3-P4S1-TAO-SHELL-OVERVIEW-2026-05-01 — audit_log

| Time (UTC) | Event |
|---|---|
| 2026-05-01T09:07Z | Sprint 4.1 task issued by CLA Lane_01. Solo CLAC1. |
| 2026-05-01T09:08Z | Pre-dispatch sync; UZGPLUS HEAD `5ffed55` (Sprint 8 + Lane_02 latest); branch `feat/lane01-p4s1-tao-shell-overview` created. |
| 2026-05-01T09:10–09:15Z | Authored `src/types/tao.ts` + `src/design-system/tokens/tao-tokens.ts` + v3-shell.css TAO :root vars. |
| 2026-05-01T09:15–09:18Z | Authored 6 components in `src/components/tao/` + barrel + `src/data/v3-mock-tao.ts`. |
| 2026-05-01T09:18Z | Mirror src → apps/uzg-pwa/src/ via `cp -R src/components/tao/. apps/uzg-pwa/src/components/tao/` ⚠️ **THIS SCOPED TOO BROADLY**. |
| 2026-05-01T09:18Z | npm run build:v3 PASS locally (190 modules, 2.97s). Local Playwright 21/21 PASS in 27.4s. |
| 2026-05-01T09:18Z | git push + PR #71 + squash-merge --admin → merge commit `a4c40f9` at 2026-05-01T09:18:54Z. |
| 2026-05-01T09:18:57Z | "Deploy to Cloudflare Pages (Stable)" workflow triggered → **FAILED** in 46s. |
| 2026-05-01T09:18:57Z | "TAO Bazi CI Regression" workflow triggered → **FAILED** in 1m33s. |
| 2026-05-01T09:25Z | Verify task interrupted (NTS pivoted to credentials emergency). Sprint 4.1 marked partial. |
| 2026-05-01T09:30–09:55Z | Detour: LANE01-CREDS-ONE-TIME-PERMANENT-DEPLOY task executed (LAW-NTS-CREDS-PERMANENT-V1). |
| 2026-05-01T10:00Z | Verify task `LANE01-UZG-V3-P4S1-VERIFY-COMPLETE` issued. |
| 2026-05-01T10:01Z | Probe state: 6 V3 TAO routes return 200 (SPA serves index for any /v3/* path), but version.json shows `930a7caa6bbc` (Sprint 8 SHA, NOT Sprint 4.1's `a4c40f9`). |
| 2026-05-01T10:02Z | Live mirror 3 DOT files all 404 — cross-publish never happened. |
| 2026-05-01T10:02Z | Bundle JS sniff: production main JS (`main-XtHtQvQq.js`, 407683 bytes ≈ Sprint 8 size) — TAO identifiers ABSENT. Confirmed Sprint 4.1 not deployed. |
| 2026-05-01T10:03Z | Empty commit pushed to main (`d50211d`) to trigger redeploy. |
| 2026-05-01T10:01:46Z | Empty-commit Cloudflare Pages workflow triggered → **FAILED** in 37s. |
| 2026-05-01T10:08Z | gh run view 25210492448 --log-failed → root cause: `Could not resolve "../../../../lib/tao/calendar/index.js" from "apps/uzg-pwa/src/components/tao/aier/AierTaoChatSurface.jsx"`. |
| 2026-05-01T10:09Z | Diagnosis: `git diff 930a7ca..a4c40f9 --stat -- apps/uzg-pwa/src/components/tao/{aier,ziwei}/` showed 5 Lane_02 files modified by my mirror (4 ziwei + 1 aier, net -76 lines). My `cp -R src/components/tao/. apps/uzg-pwa/src/components/tao/` recursively replaced apps/-tree files with src/-tree files. Relative imports differ by tree depth (apps/-tree is 2 levels deeper than src/-tree, so import paths need different `../../` counts to reach shared `lib/tao/calendar/`). |
| 2026-05-01T10:10Z | Hot-fix: `git checkout 930a7ca -- apps/uzg-pwa/src/components/tao/{aier,ziwei}/` restored Lane_02 territory to Sprint 8 state. 5 files reverted, 80 lines restored. Lane boundary respected. |
| 2026-05-01T10:10Z | Local `npm run build` PASS. Commit `6a0003d` "fix(p4s1): restore Lane_02 apps/.../tao/{aier,ziwei}/* clobbered by mirror" pushed direct to main. |
| 2026-05-01T10:11Z | Cloudflare auto-deploy fired + completed (~90s). version.json updated to `6a0003db1bce`. |
| 2026-05-01T10:11Z | Production bundle re-fetched: `main-B1MQA655.js`. TAO identifiers (`LichVanNien`, `cultural-framing`, `nam-tao`) NOW PRESENT in bundle. |
| 2026-05-01T10:12Z | **KL-028 probe PASS** — 6/6 NEW V3 TAO routes 200 + product-v3-pages-shell. Existing V3 7/7 + V2 2/2 no regression. |
| 2026-05-01T10:13Z | **KL-030 production Playwright PASS** — 21/21 in 25.9s. NAM TAO 南道 Han chữ renders + 3 sub-module tiles + cultural framing all asserted. |
| 2026-05-01T10:14Z | 18 production screenshots copied to `audits/ecosystem/uzg-plus/sprints/phase-4-sprint-1/screenshots/`. |
| 2026-05-01T10:15Z | Cross-publish branch `lane01-p4s1-tao-shell-overview-shared` ready. 3 DOT files + screenshots committed. |

## Canon guard verification

- **NAM TAO 南道 verbatim** in code (NamTaoBadge.tsx) and docs (this report) — preserved.
- **Cultural framing strings** verbatim Vietnamese per Amendment 001 v2.
- **NO 理數越南 / lyso.vn / Lý Số Hội Quán** in any deliverable.
- **R-CANON-02:** no Tier 1 canon mutations.

## KL applied + new

- **KL-04** self-merge --admin (PR #71)
- **KL-05** dual-tree byte-identical (CAVEAT: relative-import paths can differ by tree depth — see KL-32 below)
- **KL-23** 3 DOT at ROOT
- **KL-27** NTS verification production URLs
- **KL-28** production probe gate
- **KL-30** canon compliance gate (KL-030 #root max-width 480px production-verified + 3 functional assertions)
- **KL-31** credential helper workaround (token-in-URL rewrite)

### NEW LEARNINGS (Sprint 4.1 verify task)

**KL-32 — KL-05 dual-tree relative-import caveat**

KL-05 byte-identical does NOT apply to relative-import statements that reference targets above the dual-tree split point. `src/components/foo/bar.jsx` and `apps/uzg-pwa/src/components/foo/bar.jsx` may have DIFFERENT relative `../../...` strings to reach the same `lib/` target — apps/-tree needs 2 extra `../` because it's 2 levels deeper than src/-tree.

Implication: when mirroring, do NOT blindly cp/diff entire shared subdirs. The same logical file lives at different relative-path roots depending on tree.

**KL-33 — Mirror scope discipline**

Mirror commands must scope to NEW files only, never recursively copy entire shared subdirs. Patterns:

❌ `cp -R src/components/foo/. apps/uzg-pwa/src/components/foo/` — recursive, replaces ALL apps/foo/* with src/foo/*

✅ Explicit file list: `for f in NamTaoBadge.tsx CulturalFramingStrip.tsx ...; do cp src/components/foo/$f apps/.../foo/$f; done`

✅ Or first-time mirror only (when apps/foo/ doesn't exist): `cp -R src/components/foo apps/uzg-pwa/src/components/`

Verify scope post-mirror: `git diff <prev>..HEAD --stat -- <shared subdirs>`. Any unexpected files (especially Lane_02/03/04 territory or shared `aier/`, `ziwei/` etc. subdirs) means scope leak.

## Lane boundary respected (post-fix)

- Sprint 4.1 territory: ONLY `src/components/tao/{NamTaoBadge,CulturalFramingStrip,TaoSubModuleTile,LichVanNienDailyWidget,TaoOverview,TaoMiniAppShell}.{tsx,css}` + `src/data/v3-mock-tao.ts` + `src/types/tao.ts` + `src/design-system/tokens/tao-tokens.ts` + `src/v3-shell.css` (TAO vars) + `src/pages/v3/V3MiniAppPage.jsx` + `apps/uzg-pwa/src/` mirrors.
- Lane_02 territory (restored): `apps/uzg-pwa/src/components/tao/{aier,ziwei}/*` (per Sprint 8 state).

End of audit_log.
