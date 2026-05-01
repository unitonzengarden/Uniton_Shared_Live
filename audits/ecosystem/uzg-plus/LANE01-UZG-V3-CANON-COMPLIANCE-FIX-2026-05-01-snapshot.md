# LANE01-UZG-V3-CANON-COMPLIANCE-FIX-2026-05-01 — Snapshot

**Task ID:** `LANE01-UZG-V3-CANON-COMPLIANCE-FIX-2026-05-01T04-36Z`  
**Branch (UZGPLUS):** `feat/lane01-v3-canon-compliance-fix`  
**Executor:** Cursor (Dev2)  

## Delta (mechanical shell only)

| Path | Change |
|------|--------|
| `index.v3.html` | Viewport meta (`user-scalable=no`), critical inline CSS: `body` flex center, `#root` max-width 480px, desktop ambient gradients, standalone PWA exception |
| `src/v3-shell.css` + `apps/uzg-pwa/src/v3-shell.css` | No longer overrides `#root` background / `body` flex; `data-foundation` positioning; `data-takeover` hide rule; `.v3-app-shell` width 100% |
| `src/V3App.jsx` + mirror | Wrappers `data-foundation` on chrome; `data-takeover` when chat takeover routes |
| `vite.config.v3.ts` | `closeBundle` rename `dist-v3/index.v3.html` → `index.html` so `vite preview` and hosts resolve `/v3/*` SPA fallback |
| `tests/visual/v3-canon-compliance.spec.mjs` | 3 viewports × 6 routes; asserts `getComputedStyle(#root).maxWidth === '480px'` |

## Local verification (2026-05-01)

- `npm run build:v3` — exit 0  
- `npx vite preview --config vite.config.v3.ts --host 127.0.0.1 --port 4173` + `npx playwright test tests/visual/v3-canon-compliance.spec.mjs --config playwright.v3.config.js` — **18/18 passed**  
- Artifacts: `.lane_01/screenshots/v3-canon-compliance/*.png` (mirrored under Uniton_Shared `sprints/canon-compliance-fix/screenshots/`)

## Production

Deploy and KL-028 / production screenshots are **pending** push + merge + Cloudflare deploy from this branch (environment here: `git fetch` to `origin` returned **403**; commit prepared locally for NTS push).

## Dual-tree (KL-05)

`fc /b` — no differences: `main.v3.jsx`, `v3-shell.css`, `V3App.jsx` between `src/` and `apps/uzg-pwa/src/`.
