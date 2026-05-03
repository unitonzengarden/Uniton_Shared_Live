# Screenshots — LANE02-UZG-PLUS-HUB-CRITICAL-FIXES-V1

Auto-capture deferred per `auth-bypass.fixture.js` ENTA gate carryover limitation (well-documented from prior PLUS Hub + TAO tasks).

## Manual NTS verification recommended

Browse on real ENTA-complete browser to verify 3 bug fixes:

| Test | Expected (post PR #121) |
|---|---|
| Open https://uzg.plus/app | Page loads with V3 springboard layout, dark background edge-to-edge (no white margins on mobile) |
| Scroll vertically | Smooth scroll, momentum on iOS, content reveals "Đề xuất" + "Tất cả ứng dụng" sections + bottom padding clears nav |
| Tap TAO icon | Navigate to /v3/tao with full-screen takeover (PR #115). DevTools shows `data-app-route="/tao"` on TAO button (catalog route) but URL after click is `/v3/tao` (override applied) |
| Mobile viewport (480px) | Shell width 100% fill |
| Desktop viewport (1024px) | Shell centered max-width 480px with subtle box-shadow |
| 7 wired routes | tap each: u-reward→/u-earnings, booking→/booking, membership→/membership, circles→/circles, aier→/aier, tickets→/tickets, tao→/v3/tao |
| 5 stub routes | tap each: marketplace/retreat/governance/stats/business → "Sắp ra mắt — {name}" alert |

## Bundle inspection (deterministic deploy verification)

```
$ curl -s https://uzg.plus/ | grep -oE '/assets/index-[a-zA-Z0-9_-]+\.js' | head -1
/assets/index-<HASH>.js

$ curl -s https://uzg.plus/assets/index-<HASH>.js | grep -c 'data-app-route\|data-testid="app-icon-'
# Expected ≥1 occurrence (post-deploy)
```

## Code shipped

- PR uzgplus-app#121 merged sha 35896e9
- 4 files: 2 CSS module + 2 AppIconV3 (both src trees)
- Build PASS: vite (12.18s) + vite build:v3 (5.36s)
- CF Pages deploy SUCCESS at T+60s
