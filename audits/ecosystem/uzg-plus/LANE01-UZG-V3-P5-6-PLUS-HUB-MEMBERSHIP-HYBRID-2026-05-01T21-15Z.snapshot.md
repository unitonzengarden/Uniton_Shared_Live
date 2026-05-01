# Snapshot — Sprint 5.6 PLUS Hub + Membership Hybrid

**Audit ID:** LANE01-UZG-V3-P5-6-PLUS-HUB-MEMBERSHIP-HYBRID-2026-05-01T21-15Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane 01) solo
**Pattern:** Hybrid — V2 Express upgrade + Direct Supabase catalog (DEC-08 §1.6)

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#85](https://github.com/unitonzengarden/uzgplus-app/pull/85) | `caa35f8` | MERGED |
| unitonzengarden/Uniton_Shared | (this branch) | TBD | OPEN |

## Files

| Type | Count | Notes |
|---|---|---|
| `plus-v3/` components | 12 | Shell, Sections, Grid, Icon, TierLocked, Search, MiniApp shell, States |
| `membership-v3/` components | 8 | MiniApp, CurrentTier, Catalog, Comparison, UpgradeFlow, BenefitsList, Skeleton, Error |
| Hooks | 5 | usePlusHub, useUserMembership, useTierCatalog, useMembershipUpgrade, useTierGating |
| Lib extension | 1 | v2ExpressClient.ts +2 membership methods |
| Types | 2 | plusV3.ts + membershipV3.ts |
| Pages | 2 modified + 1 new | V3App.jsx, V3PlusPage.jsx, V3MembershipPage.jsx (new) |
| Tests | 1 | p5-6-plus-membership-prod.spec.mjs (6 tests) |

## Live Routes (200)

- `https://uzg.plus/v3/plus` — PLUS Hub springboard (12 mini apps with tier gating)
- `https://uzg.plus/v3/membership` — Membership mini app (4-tier catalog browse + upgrade flow)

## Verification

| Gate | Status | Evidence |
|---|---|---|
| Build | PASS | V3 bundle 768 KB JS (+12 KB delta from Sprint 5.5) |
| KL-028 production probe | PASS | 19/19 routes 200 |
| Playwright p5-6-plus-membership-prod | PASS | 6/6 PASS in 7.3s |
| D6 DRIFT-04 applied | PASS | Zero `memberships.tier` references in code (uses `membership_current_view` JOIN view) |
| AC-13 Hybrid pattern | PASS | V2 Express /api/v1/membership/upgrade for write + Direct Supabase RLS for read |
| Tier gating rule engine | PASS | 4 ranks (free=0, member=1, premium=2, business=3) |
| Sprint 5.1-5.5 regression | PASS | All prior routes still 200 |
| Lane boundaries | PASS | plus-v3/ + membership-v3/ NEW; all prior namespaces UNTOUCHED |
