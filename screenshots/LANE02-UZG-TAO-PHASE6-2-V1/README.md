# Screenshots — LANE02-UZG-TAO-PHASE6-2-V1

Auto-capture deferred per `auth-bypass.fixture.js` ENTA gate limitation (well-documented carryover from V2 PLUS Hub task and TAO mini app task).

## Manual NTS verification recommended

Browse on real ENTA-complete browser:

| URL | Expected (post-Phase 6.2) |
|---|---|
| https://uzg.plus/v3/tao | TAO mini app full-screen takeover (PR #115). 5 sub-modules with status: Bazi/Tu Vi/AIER live ✓; Phong Thuy/Van Nien now also "live" status (Phase 6.2 flag flipped) |
| https://uzg.plus/v3/tao/phongthuy | Phong Thuy sub-route loads. V3 component currently displays mock Bat Trach data (Phase 7 wire-pass will swap to real Supabase queries). Real backend tables phong_thuy_records + flying_stars + recommendations exist and are reachable |
| https://uzg.plus/v3/tao/lichvannien | Lich Van Nien sub-route loads. V3 component currently displays mock daily widget (Phase 7 wire-pass will swap to real). Real backend van_nien_events + van_nien_daily exist + Vietnamese lunar engine ready |
| https://uzg.plus/v3/tao/bazi | Bazi real backend (preserved from V502) |
| https://uzg.plus/v3/tao/tuvi | Tu Vi real backend (preserved) |
| https://uzg.plus/v3/tao/aier | AIER chat real backend (preserved from V502 PR #110/#112) |

## Backend verification (deterministic)

```
$ # Migration apply HTTP 201
$ POST /v1/projects/kkhhpecofolmrodyeslp/database/query (phong_thuy migration) → HTTP 201 ✓
$ POST /v1/projects/kkhhpecofolmrodyeslp/database/query (van_nien migration) → HTTP 201 ✓

$ # 5 tables reachable via REST
$ GET /rest/v1/phong_thuy_records?select=id&limit=1 → 200, content-range */0 ✓
$ GET /rest/v1/phong_thuy_flying_stars?select=id&limit=1 → 200 ✓
$ GET /rest/v1/phong_thuy_recommendations?select=id&limit=1 → 200 ✓
$ GET /rest/v1/van_nien_events?select=id&limit=1 → 200 ✓
$ GET /rest/v1/van_nien_daily?select=date&limit=1 → 200 ✓
```

## Code shipped

- PR uzgplus-app#117 merged sha 036f61b1
- 2 migrations + 2 calculator/lunar libs + flag flip + 1 smoke spec
- Build PASS: vite (5.34s) + vite build:v3 (3.30s)
- 0 fear-UX violations, 0 Chinese-school markers, 23 Vietnamese terms

## Phase 7 next

V3 component UI wire-pass: replace MOCK_PHONG_THUY_PROFILE_KHON / MOCK_LICH_VAN_NIEN_* imports with Supabase query hooks consuming new tables.
