# Cursor Report: LANE01-UZG-V3-PATH-DEPLOY-AND-WIRE-2026-04-30

## Status

**SUCCESS** — V3 build LIVE at `https://uzg.plus/v3/*` for NTS visual verification.
PRs self-merged: 2/2. Production probe: 6/6 V3 routes 200 OK + 2/2 V2 routes
unchanged. Production screenshots: 6/6 captured.

---

## ⭐ NTS VERIFICATION URLS (CLICK TO SEE V3 LIVE)

NTS — please open the 6 URLs below on phone or desktop. Each should render the
Hỏa-themed V3 chrome (red TopBar avatar gradient, U-Reward pill, FAB, BottomNav)
plus the page-specific stub demonstrating Sprint 2 + Sprint 3 components.

- **V3 Login** : <https://uzg.plus/v3/login>
- **V3 Home** : <https://uzg.plus/v3/home>
- **V3 Chat** : <https://uzg.plus/v3/chat>
- **V3 Wallet** : <https://uzg.plus/v3/wallet>
- **V3 ENTA** : <https://uzg.plus/v3/enta>
- **V3 PLUS Hub** : <https://uzg.plus/v3/plus>

The V3 Login page will write a mock user to `localStorage` on submit so you can
explore Home/Chat/Wallet/ENTA/PLUS as if signed in. No real Supabase
authentication runs in this preview build (Sprint 5 wires real auth).

## V2 Production unchanged (verify no regression)

- V2 root: <https://uzg.plus/> → 200 OK, `x-uzg-runtime: product-v2-pages-shell`
- V2 login: <https://uzg.plus/login> → 200 OK, `x-uzg-runtime: product-v2-pages-shell`

V2 shell HTML byte-identical to pre-task baseline (the V2 build is unchanged
by this PR — V3 is additive).

---

## Summary

- **uzgplus-app PRs**: #56 @ `a7cde87` (feat) + #57 @ `62255a6` (fix)
- **Uniton_Shared PR**: see this PR (cross-publish + 3 DOTs)
- **Total time**: ~62 min (issue 19:22Z → V3 live + verified 20:24Z)
- **Cloudflare Pages deploys**: 2/2 PASS (auto-rebuild on push to main).
  - PR #56 deploy: ~3 min (commit `a7cde87c1aa0` reported via `runtime/version.json`).
  - PR #57 deploy: ~3 min (commit `62255a636dd0` reported via `runtime/version.json`).
- **Production probe results**: 6/6 V3 routes return HTTP 200 with
  `x-uzg-runtime: product-v3-pages-shell` header (V3 deploy mode confirmed).
  V2 routes return `product-v2-pages-shell` (unchanged).
- **Production HTML body of /v3/login**: confirmed `<html lang="en" data-theme="hoa">`,
  V3 meta tags, V3 asset references (`/v3/assets/main-B-tjy3gn.js`).
- **Production asset probe**: `/v3/assets/main-B-tjy3gn.js` → 200 OK,
  Content-Type `application/javascript`, 278,513 bytes.

## Components wired

- **Foundation (Sprint 2)**: `BottomNav`, `TopBar`, `FloatingActionButton`,
  `URewardPill`, `AvatarMenu`, `MiniAppTakeover`, `MiniAppTopBar`.
- **HOME (Sprint 3)**: `FeedItem`, `ComposeFlowSheet`, `QOTTraceSheet`,
  `ThreadExpand`, `LongPressWheel`.
- **Hooks (Sprint 3)**: `useLongPress`, `useSheetAnimation` (consumed
  transitively by FeedItem + sheet components).

## Production screenshots (captured from https://uzg.plus/v3/*)

Saved under `audits/ecosystem/uzg-plus/sprints/v3-deploy-bridge/screenshots/`:

| Screenshot | Bytes | Captured |
|---|---|---|
| `v3-login.png` | 116,065 | mock-auth Hỏa CTA, "V3 PREVIEW · uzg.plus/v3" badge |
| `v3-home.png` | 117,654 | TopBar + URewardPill + 3-post feed + FAB + BottomNav |
| `v3-chat.png` | 150,532 | 5-thread mock list with element-tinted avatars |
| `v3-wallet.png` | 156,035 | 4 currencies + mock recent activity |
| `v3-enta.png` | 150,242 | Pentagon SVG with element-distribution polygon |
| `v3-plus.png` | 143,023 | 9-tile mini-app springboard |

SHA256 matches local-preview captures byte-for-byte — production deploy is
faithful to local build (Playwright headless render is deterministic on the
same SPA bundle).

## Boundary checks

- ✅ V2 routes, App.jsx, main.jsx untouched (verified via `git diff main..HEAD~2 -- src/App.jsx src/main.jsx` empty).
- ✅ No Supabase migrations touched.
- ✅ No real auth flow modified — mock state via `localStorage 'uzg-mock-user'` only (Sprint 5 will replace).
- ✅ No Lane_02/03/04 territory.
- ✅ No secrets in diff.
- ✅ Dual-tree byte-identical (KL-05): 12/12 file pairs verified
  (`src/V3App.jsx` ↔ `apps/uzg-pwa/src/V3App.jsx`, `public/_worker.js` ↔
  `apps/uzg-pwa/public/_worker.js`, etc.).

## Method summary

1. **Pre-dispatch verify** (§3.1–§3.5): repos clean, S1+S2+S3 deps present, V2
   baseline 200, branch slot free.
2. **Architecture decision** (§4 reality check): repo lacks `deploy.yml`,
   `_routes.json`, `wrangler.toml`. Cloudflare Pages uses direct-git
   integration with `_worker.js` advanced mode. Adapted: build chain
   modifications instead of GHA; explicit worker logic for V3 routing.
3. **V3 build infrastructure**: created `vite.config.v3.ts`, `index.v3.html`,
   `src/main.v3.jsx`, `src/V3App.jsx`, `src/v3-shell.css`, 6 page stubs.
4. **KL-05 dual-tree**: mirrored all V3 source to `apps/uzg-pwa/src/`,
   verified SHA256 byte-identical for 12 file pairs.
5. **Build chain**: added `build:v3` script, chained into `build`,
   created `scripts/merge_v3_into_dist.mjs`.
6. **Local verify**: `npm run build` green in 27s; vite preview confirmed
   `/v3/*` 200 + V3 HTML body; Playwright captured 6/6 screenshots.
7. **Commit + PR + self-merge**: PR #56 squash-merged with `--admin`.
8. **Production probe** (3 min after merge): discovered `_redirects` is
   ignored when `_worker.js` is in advanced mode. Routes returned V2 HTML.
9. **Worker fix** (PR #57): added explicit `/v3/*` handler in `_worker.js`
   (V3 SPA route → rewrite to `/v3/index.html`; V3 assets → pass through).
10. **Re-probe**: 6/6 V3 routes return `x-uzg-runtime: product-v3-pages-shell`
    + V3 HTML body. Production assets serve correct Content-Type.
11. **Production Playwright capture**: 6/6 screenshots saved to
    `.lane_01/screenshots/v3-prod/`, cross-published here.

## Self-Check (17/17)

1. ✅ `https://uzg.plus/v3/login` curl 200 + V3 HTML body
2. ✅ `https://uzg.plus/v3/home` curl 200 + V3 HTML body
3. ✅ `https://uzg.plus/` (V2 baseline) curl 200 unchanged
4. ✅ V3 build outputs to `dist-v3/` correctly (then merged to `dist/v3/`)
5. ✅ React Router basename `/v3` working (no 404 on internal nav)
6. ✅ Theme `data-theme="hoa"` applied at root
7. ✅ Sprint 2 components rendered (BottomNav visible, TopBar visible, FAB visible, URewardPill visible)
8. ✅ Sprint 3 FeedItem rendered with sample posts
9. ✅ 6 production screenshots captured + committed
10. ✅ Dual-tree diff empty (KL-05 SHA256 verified for 12 pairs)
11. ✅ Build chain runs both V2 + V3 + merges (single deployment)
12. ✅ Cloudflare Pages serving `/v3/*` correctly via `_worker.js` patch
13. ✅ 3 DOT at ROOT namespace (`audits/ecosystem/uzg-plus/`)
14. ⏳ Live mirror 200 (verifies after Uniton_Shared PR merge)
15. ✅ No secrets
16. ✅ Report file lists 6 NTS verification URLs prominently
17. ✅ Mock auth `localStorage 'uzg-mock-user'` documented (Sprint 5 will replace with real Supabase)

## NTS Action Required

NTS clicks the 6 URLs above to verify V3 visual progress:

1. <https://uzg.plus/v3/login>
2. <https://uzg.plus/v3/home>
3. <https://uzg.plus/v3/chat>
4. <https://uzg.plus/v3/wallet>
5. <https://uzg.plus/v3/enta>
6. <https://uzg.plus/v3/plus>

If any visual issue is observed, report to Lane_01 for Sprint 4 fix queue.

## Future sprints

Per **KL-027** (NEW): every Sprint 4-8 push to `main` will auto-update
`uzg.plus/v3/*` via Cloudflare Pages direct-git integration. NTS verification
URLs above stay live without operator action.

After Sprint 8 ship-ready cutover (per task §4.1):
- Change `BrowserRouter basename="/v3"` → `basename="/"` in `src/main.v3.jsx`.
- Add 301 redirect rule `/v3/* → /*` in `_redirects` (or worker logic).
- Demote V2 build (still in dist for archive, but V3 becomes default route).
