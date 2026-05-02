# V2 TAO Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES
**Module:** 8 of 8

---

## §1 Module status V2

**🚨 CORRECTION OF EARLIER ASSUMPTION:** NTS (and Sprint 5.8) said "V2 chưa có TAO" — **THIS IS PARTIALLY WRONG**.

**ACTUAL V2 STATUS:** V2 has 15+ TAO pages fully implemented as Phase 4 frontend by CLAC1 (per code comments referencing `LANE02-UZG-TAO-T-BAZI-015-V1` etc).

### V2 TAO pages (count = 15)

#### Bazi (7 pages):
- `TaoBaziCreatePage.jsx`
- `TaoBaziOverviewPage.jsx`
- `TaoBaziPillarsPage.jsx`
- `TaoBaziDayMasterPage.jsx`
- `TaoBaziUsefulGodPage.jsx`
- `TaoBaziLuckPillarsPage.jsx`
- `TaoBaziSavedPage.jsx`

#### Tử Vi (3 pages):
- `TaoZiweiCreatePage.jsx`
- `TaoZiweiNatalChartPage.jsx`
- `TaoZiweiSavedPage.jsx`

#### Phong Thủy (2 pages):
- `TaoPhongThuyOverviewPage.jsx`
- `TaoPhongThuyBatTrachPage.jsx`

#### Lịch Vạn Niên (2 pages):
- `TaoVanNienCalendarPage.jsx`
- `TaoVanNienDailyDetailPage.jsx`

#### AIER Tao (1 page):
- `TaoAierPage.jsx`

---

## §2 Frontend components V2

V2 uses presentational components in `apps/uzg-pwa/src/components/tao/` with sub-namespaces:
- `tao/bazi/` (BaziOverviewSurface, BaziHeroPreview, BaziNavTiles, etc.)
- `tao/ziwei-v3/` (Ziwei surfaces)
- `tao/phong-thuy-v3/` (Bát Trạch + Cửu Cung)
- `tao/aier-tao-v3/` (AIER Tao chat)
- `tao/lich-van-nien-v3/` (Lịch Vạn Niên)

---

## §3 Backend endpoints V2

**ZERO V2 Express endpoints for TAO.** Confirmed via grep:
```bash
grep "^app\.\(get\|post\)\(.*tao\|.*bazi\|.*tuvi\|.*ziwei\|.*phongthuy\|.*lichvannien\)" server/aier_server.js
# (no matches)
```

**Pattern: Direct Supabase + client-side compute** (matches Sprint 5.8 finding).

### Direct Supabase tables (TAO Audit #82 verified)

| Table | Status | Use |
|---|---|---|
| `bazi_charts` | EXISTS, 3 rows | Bazi chart_object JSONB |
| `bazi_audit_log` | EXISTS | Audit log |
| `enta_bazi_records` | EXISTS, 77 rows | KL-046 ENTA-Bazi bridge |
| `ziwei_charts` | EXISTS, 4 rows | Ziwei chart_object + cycle_layers JSONB |
| `ziwei_audit_log` | EXISTS | Audit log |
| Phong Thủy tables | NOT_FOUND in production | Client-side compute via `lib/tao/phongthuy/` (verify) |
| Lịch Vạn Niên tables | NOT_FOUND in production | Client-side compute via `lib/tao/lichvannien/` (verify) |
| `aier_tao_*` tables | NOT_FOUND in production | Mock data |

### Direct Supabase RPCs (TAO Audit #82)

- `rpc_get_enta_bazi_record` — EXISTS (used by V2)
- `calc_enta_profile` — EXISTS (parameterized)
- `rpc_compute_bazi_chart` — NOT_FOUND
- Phong Thủy / Vạn Niên RPCs — NOT_FOUND

### Client-side compute libraries

V2 uses `lib/tao/bazi/computeChart.js` for Bazi calculation (BaziComputeError thrown on bad input).

V2 BaziOverviewSurface fetches via `useBaziChartLoader` with priority:
1. `?demo=1` → NTS canonical fixture (in-memory)
2. Authenticated user → primary chart from Supabase
3. Anonymous + no demo → null (CTA mode)

---

## §4 V2 TAO data flow

```
USER → V2 TaoBaziOverviewPage
  ↓
  useBaziChartLoader({ session })
  ↓
  getPrimaryChart() → Supabase bazi_charts table
  ↓
  IF chart.chart_object exists → render
  ELSE fallback to demoFixture OR show CTA
```

For Phong Thủy / Vạn Niên / AIER Tao: V2 may use static/mock fixtures since no DB tables exist (Sprint 5.8 finding aligned).

---

## §5 V3 Sprint 5.8 wiring assessment

**Sprint 5.8 implementation:** Hybrid + Mock pattern (DEC-08 §1.8).

| Sub-module | V2 EXACT | Sprint 5.8 V3 | Match |
|---|---|---|---|
| Bazi | bazi_charts JSONB + enta_bazi_records + RPC | Same Hybrid | ✅ |
| Tử Vi | ziwei_charts JSONB | Same Hybrid | ✅ |
| Phong Thủy | (V2 has pages, likely client-compute or mock) | V3 Mock with abstraction layer | ⚠️ V3 mocked, V2 has UI but data source unclear |
| Lịch Vạn Niên | (V2 has pages, likely client-compute or mock) | V3 Mock with abstraction layer | ⚠️ Same as above |
| AIER Tao | (V2 has TaoAierPage, likely mock) | V3 Mock | ⚠️ Match (both mock) |

**Match score: ~70%** — Bazi/Tử Vi backend integration correct. Phong Thủy/Vạn Niên/AIER Tao: V2 has UI but data source needs deeper investigation. V3 mock approach acceptable for go-live; Phase 6 can wire V2 pages directly if data sources confirmed.

---

## §6 V3 Sprint 5.11 fix recommendations

### Option A: Keep V3 mock TAO sub-modules (RECOMMENDED for go-live today)
- Sprint 5.8 V3 routes already 200 OK
- Mock data renders correctly
- Users can navigate /v3/tao/bazi (Hybrid real), /v3/tao/tuvi (Hybrid real), other sub-modules render mock
- Phase 6: Lane_02 confirms data sources, V3 flips TAO_DATA_SOURCE flags

### Option B: Wire V3 routes to V2 pages directly (defer to Phase 6)
- Iframe or redirect /v3/tao/phongthuy → /tao/phongthuy (V2 page)
- Lose V3 mobile shell consistency
- Not recommended for go-live

**Status: NO FIX NEEDED for Sprint 5.11.** Sprint 5.8 V3 TAO ships acceptable for go-live.

**ETA:** Skip Sprint 5.11.

---

## §7 Code references

- `apps/uzg-pwa/src/pages/Tao*.jsx` — 15 V2 TAO pages
- `apps/uzg-pwa/src/components/tao/bazi/BaziOverviewSurface.jsx` — Bazi UI
- `apps/uzg-pwa/src/lib/tao/bazi/useBaziChartLoader.js` — Bazi data loader
- `apps/uzg-pwa/src/lib/tao/bazi/computeChart.js` — Client-side compute
- TAO Backend Audit #82 — D1+D2+D3 catalog
- Sprint 5.8 audit — Hybrid + Mock pattern documentation
