# LANE01-UZG-V3-S5-WALLET-FULL-BUILD-2026-05-01 — Snapshot

**Task ID:** `LANE01-UZG-V3-S5-WALLET-FULL-BUILD-2026-05-01T05-18Z`  
**Branch:** `feat/lane01-s5-wallet-full-build`  

## Delivered

### Components (`src/components/wallet/`, dual-tree `apps/uzg-pwa/`)

1. **WalletOverview** — 4 currency cards (U / UZG / UZGFi / USD Equiv), separate layers copy, Convert / Send / Receive row  
2. **AssetDetail** — hero balance, actions, **TransactionHistory**  
3. **ConvertPanel** — U → UZG, conversion rate wording (not “price”)  
4. **SendFlow** — search, recent recipients, amount, memo ≤200  
5. **ReceiveQR** — `qrcode.react` SVG, copy + share  
6. **TransactionHistory** — filter chips + rows  

Stories: `*.stories.tsx` (5 theme frames per component).  
Hook: `hooks/useWalletState.ts` (mock aggregator for later Supabase).

### Types & data

- `src/types/wallet.ts` (+ mirror)  
- `src/data/v3-mock-wallet.ts` — 4 currencies, 12+ txs for U and UZG, recipients, receive addresses  

### Routes (`V3App.jsx`)

- `/wallet`  
- `/wallet/asset/:currencyId` (supports `u-token` alias → `u` in `getCurrencyById`)  
- `/wallet/convert`  
- `/wallet/send`  
- `/wallet/receive` (`?currency=` optional)  

### KL-030 (canon shell)

- `index.v3.html` critical CSS: `#root` max-width **480px**, desktop ambient sides  
- `vite.config.v3.ts` — `dist-v3/index.html` rename post-build (SPA preview)  
- `v3-shell.css` — `#root` background no longer overridden by shell stylesheet  

### BottomNav

- Wallet tab active for all `/wallet/*`  
- Home active for `/` and `/home`  
- Chat active for `/chat` and `/chat/*`  

### Verification (local)

- `npm run build:v3` — **pass**  
- `tests/visual/s5-wallet-routes.spec.mjs` — **15/15** (3 viewports × 5 routes), KL-030 `480px` assert for tablet + desktop  
- Screenshots: `audits/ecosystem/uzg-plus/sprints/sprint-5/screenshots/` (local preview build)

## Pending (environment)

- `git push` / PR / merge for uzgplus-app (403 possible in sandbox)  
- Production probe KL-028 + 15 prod screenshots + live mirror  

## Canon copy audit (Wallet)

- UI avoids “Trade”, “Swap”, “Exchange”, “Price”, “P/L”; uses **Convert**, **conversion rate**, **currency** naming.
