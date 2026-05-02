# Screenshots — LANE02-UZG-TAO-MINIAPP-CHUAN-V1

Screenshot capture deferred per auth-bypass.fixture.js ENTA gate limitation
(documented in V2 PLUS Hub task LANE02-V2LIVE-PLUS-HUB-UPGRADE-V1 PARTIAL).

## Manual NTS verification recommended

Browse on real ENTA-complete browser:

| URL | Expected |
|---|---|
| https://uzg.plus/v3/tao | TAO mini app full-screen takeover loads. Slide up 320ms animation. Top bar: ✕ close button + TAO title + ⋮ actions. 5 sub-module tabs row. Cultural framing strip "góc nhìn văn hóa Á Đông... Không phán xét, không định mệnh". 5 sub-module cards (Bát Tự, Tử Vi, Phong Thủy, Lịch Vạn Niên, AIER Tao) with mock/live status badges. Bottom nav HIDDEN. Floating + HIDDEN. |
| https://uzg.plus/v3/tao/bazi | Bazi sub-route loads (real backend per useBaziChart). Takeover chrome behavior preserved. |
| https://uzg.plus/v3/tao/tuvi | Ziwei sub-route loads (real backend). |
| https://uzg.plus/v3/tao/phongthuy | Phong Thủy sub-route loads (mock content, tier hint Member+ for full features). |
| https://uzg.plus/v3/tao/lichvannien | Lịch Vạn Niên sub-route loads (mock). |
| https://uzg.plus/v3/tao/aier | AIER Tao chat loads (real backend per V502 PR #110/#112). |
| Tap ✕ close | Returns to /v3/plus (PLUS Hub). |

## Bundle inspection (deterministic deploy verification)

```
$ curl -s https://uzg.plus/v3/ | grep -oE '/v3/assets/main-[a-zA-Z0-9_-]+\.js'
/v3/assets/main-BDv6UMcM.js

$ curl -s https://uzg.plus/v3/assets/main-BDv6UMcM.js | wc -c
855422

$ grep -c 'tao-miniapp-shell' [bundle] → 1 occurrence ✓
$ grep -c 'tao-top-bar' [bundle] → 2 occurrences ✓
$ grep -c 'Đóng TAO' [bundle] → 1 occurrence ✓ (close button label)
```

Code IS deployed. Manual visual verification recommended for final UX validation.
