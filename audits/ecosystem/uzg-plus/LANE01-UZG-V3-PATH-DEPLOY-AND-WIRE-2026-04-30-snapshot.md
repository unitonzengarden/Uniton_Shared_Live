# LANE01-UZG-V3-PATH-DEPLOY-AND-WIRE — Snapshot

**Task ID:** `LANE01-UZG-V3-PATH-DEPLOY-AND-WIRE-2026-04-30T19-22Z`
**Issued by:** CLA Lane_01 (UZG+ CTO)
**Executor:** Cursor (Sonnet 4.6) — Dev2
**Issued:** 2026-04-30T19:22Z
**Completed:** 2026-04-30T20:24Z (worker fix deployed) — total ~62 min
**Priority:** P0 URGENT — NTS verification unblock
**Status:** SUCCESS

## Outcome

V3 build is now live at `https://uzg.plus/v3/*` for NTS visual verification.
Sprint 2 foundation chrome (TopBar, URewardPill, FAB, BottomNav, AvatarMenu)
and Sprint 3 HOME components (FeedItem, LongPressWheel, ComposeFlowSheet,
QOTTraceSheet, ThreadExpand) are wired into a mock-authenticated V3App shell
with 6 page stubs (Login/Home/Chat/Wallet/ENTA/PLUS). V2 production
(`uzg.plus/*`) is byte-unchanged; both versions ship in a single Cloudflare
Pages deployment.

## Repos touched

- `unitonzengarden/uzgplus-app` (PR #56 + PR #57)
- `unitonzengarden/Uniton_Shared` (this PR — deliverable cross-publish)

NOT touched: Uniton_OS, AIER LIFE repos, AIFI LIFE repos, Lane_02/03/04
territory, Supabase migrations, real auth flow.

## Files committed (uzgplus-app)

### PR #56 `feat(v3-deploy)` @ `a7cde87`

- `vite.config.v3.ts` — V3 Vite config (`base: '/v3/'`, output `dist-v3/`, `publicDir: false`).
- `index.v3.html` + `apps/uzg-pwa/index.v3.html` — V3 HTML entry with `data-theme="hoa"`.
- `src/main.v3.jsx` + mirror — V3 React entry, `BrowserRouter basename="/v3"`.
- `src/V3App.jsx` + mirror — V3 app shell wiring S2 foundation + mock-auth state.
- `src/v3-shell.css` + mirror — V3 layout styles (consumes `var(--t-*)` only).
- `src/pages/v3/V3LoginPage.jsx` + mirror.
- `src/pages/v3/V3HomePage.jsx` + mirror — 3 sample feed posts wired through `FeedItem`; `ComposeFlowSheet`, `QOTTraceSheet`, `ThreadExpand` integrated.
- `src/pages/v3/V3ChatPage.jsx` + mirror — 5-thread mock list with element-tinted avatars.
- `src/pages/v3/V3WalletPage.jsx` + mirror — 4 currencies + recent activity.
- `src/pages/v3/V3EntaPage.jsx` + mirror — live SVG Pentagon with element distribution.
- `src/pages/v3/V3PlusPage.jsx` + mirror — 9-tile mini-app springboard with `MiniAppTakeover` + `MiniAppTopBar`.
- `public/_redirects` + `apps/uzg-pwa/public/_redirects` — added `/v3/* /v3/index.html 200` rule before existing fallback (kept for parity with non-worker mode).
- `package.json` — added `build:v3` script + chained into `build`.
- `scripts/merge_v3_into_dist.mjs` — copies `dist-v3/*` to `dist/v3/`, renames `index.v3.html` to `index.html`.
- `playwright.v3.config.js` — V3-only Playwright config (testDir `tests/visual/`).
- `tests/visual/v3-authenticated.spec.mjs` — V3 mock-auth visual capture spec.
- `.gitignore` — added `dist-v3/`.
- `.lane_01/screenshots/v3-deploy/*.png` — 6 local-preview captures.
- `.lane_01/audits/v3-path-deploy-audit-log.md` — execution log.

### PR #57 `fix(v3-deploy)` @ `62255a6`

- `public/_worker.js` + `apps/uzg-pwa/public/_worker.js` (KL-05 byte-identical, SHA256 `94C2DFCFBD38BB20BEFE88799C4FF369C5D6704DE51F24D0533A15E2A8024B8C`):
  - Added `V3_ASSET_EXTENSIONS`, `isV3StaticAssetPath`, `serveV3ShellAsset` helpers.
  - Added explicit `/v3/*` branch in `fetch` handler before default `serveShellAwareAsset`.
  - V3 SPA paths rewrite to `/v3/index.html` for BrowserRouter hydration.
  - V3 asset paths pass through; missing assets surface clean 404 instead of V2 HTML.
  - `x-uzg-runtime: product-v3-pages-shell` for V3 HTML responses.

## PR + SHA summary

| PR | Title | SHA | Merged at |
|---|---|---|---|
| #56 | `feat(v3-deploy): path-based V3 deployment at uzg.plus/v3 + wire S2+S3 components` | `a7cde87` | 2026-04-30T20:09:05Z |
| #57 | `fix(v3-deploy): explicit /v3/* worker handler — _redirects ignored in advanced mode (P0)` | `62255a6` | 2026-04-30T20:19:40Z |

uzgplus-app `main` HEAD: `62255a6`.

## Coverage

- **V3 Vite config**: 1 file (V3-isolated build).
- **V3 React entry**: 1 file mirrored in dual-tree.
- **V3 app shell + CSS**: 2 files mirrored.
- **V3 page stubs**: 6 files mirrored.
- **Cloudflare Pages routing**: `_redirects` updated + `_worker.js` patched.
- **Build chain**: `package.json` + `merge_v3_into_dist.mjs`.
- **Playwright spec**: 1 file + dedicated config.
- **Production captures**: 6 PNG screenshots from `https://uzg.plus/v3/*`.
- **Total file-pairs verified KL-05 byte-identical**: 12/12 (incl. `_worker.js`).

## Spec adaptation

Original task §3.4/§5.6/§5.7 assumed Cloudflare Pages with
`.github/workflows/deploy.yml` + `_routes.json` + `wrangler.toml`. None
exist in this repo. Cloudflare Pages here uses **direct git integration**
(auto-runs `npm run build` on push to `main`) with `public/_worker.js` in
**advanced mode**. Per task §4.4 ("whichever simpler given current setup"),
the deploy chain was wired through `package.json` and routing through
`_redirects` + worker passthrough. After PR #56 deploy, production probe
revealed `_redirects` is silently ignored when `_worker.js` is present in
advanced mode — added explicit `/v3/*` worker handler in PR #57.

Net behavior matches §5.7 expectations: V2 + V3 ship in a single `dist/`
deployment, V3 reachable at `/v3/*`, V2 unchanged.
