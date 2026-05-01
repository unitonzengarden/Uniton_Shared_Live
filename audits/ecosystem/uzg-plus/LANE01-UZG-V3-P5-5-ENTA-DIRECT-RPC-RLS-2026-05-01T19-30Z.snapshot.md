# Snapshot — Sprint 5.5 ENTA Direct RPC + RLS

**Audit ID:** LANE01-UZG-V3-P5-5-ENTA-DIRECT-RPC-RLS-2026-05-01T19-30Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane 01) solo
**Pattern:** Direct RPC + RLS (DEC-08 §1.5)
**Backend Deep Audit ref:** Uniton_Shared #78 D1+D3+D5

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#84](https://github.com/unitonzengarden/uzgplus-app/pull/84) | `80707ed` | MERGED |
| unitonzengarden/Uniton_Shared | (this branch) | TBD | OPEN |

## Files

| Type | Count | Notes |
|---|---|---|
| Components (`enta-v3/`) | 19 | Shell, Wheel, Tabs, Onboarding, States |
| Hooks | 7 | useEnta, useEntaWheel, useEntaResonance, useEntaCircles, useEntaJourney, useEntaOnboarding, useEntaRealtime |
| Lib | 1 | supabaseRpc.ts (14 ENTA RPCs typed) |
| Types | 1 | entaV3.ts |
| Pages modified | 3 | V3App.jsx, V3EntaPage.jsx, V3OnboardingPage.jsx |
| Tests | 1 | p5-5-enta-prod.spec.mjs (8 tests) |
| Total | 99 files | dual-tree byte-identical (KL-05) |

## Live Routes

- `https://uzg.plus/v3/enta` — ENTA Shell (Wheel + 4 tabs in-shell state) ✓ 200
- `https://uzg.plus/v3/enta/onboarding` — 5-step wizard ✓ 200
- `https://uzg.plus/v3/enta/identity|resonance|circles|journey` — redirect to `/v3/enta` ✓

## Verification

| Gate | Status | Evidence |
|---|---|---|
| Build | ✓ | 0 TS errors, V3 bundle ~756KB JS |
| KL-028 production probe | ✓ | 15/15 routes 200 |
| Playwright p5-5-enta-prod | ✓ | 8/8 PASS in 8.8s |
| ENTA RPCs reachable | ✓ | rpc_get_enta_profile, rpc_create_enta_profile, fn_enta_suggest_resonance |
| ENTA invariant | ✓ | sum_rule_ok column verified in enta_current_fields |
| AC-13 NO V2 Express | ✓ | All ENTA reads via Supabase REST/RPC, no /api/v1/profile/* calls |
| Sprint 5.1-5.4 regression | ✓ | All prior routes still 200 |
| Lane boundaries | ✓ | Lane_02 + sprints 5.1-5.4 namespaces UNTOUCHED |

