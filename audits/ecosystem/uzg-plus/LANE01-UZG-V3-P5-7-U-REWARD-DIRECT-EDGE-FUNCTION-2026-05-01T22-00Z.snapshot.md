# Snapshot — Sprint 5.7 U-Reward Direct reward_emit Edge Function

**Audit ID:** LANE01-UZG-V3-P5-7-U-REWARD-DIRECT-EDGE-FUNCTION-2026-05-01T22-00Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane 01) solo
**Pattern:** Direct Edge Function (DEC-08 §1.7)
**MILESTONE:** Financial-adjacent — reward emission writes wallet ledger

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#86](https://github.com/unitonzengarden/uzgplus-app/pull/86) | `28528b1` | MERGED |
| unitonzengarden/Uniton_Shared | (this branch) | TBD | OPEN |

## Files

| Type | Count | Notes |
|---|---|---|
| `u-reward-v3/` components | 16 | Mini app shell, Energy Core (animated SVG), 4 modules, states, cross-module pill |
| Hooks | 7 | useUReward, useEnergyCore, useQuizModule, useTaskModule, useCampaignModule, useRewardEmit, useURewardRealtime |
| Lib extension | 1 | supabaseEdgeFunctions.ts +1 emitReward (12 actionType typed) |
| Types | 1 | uRewardV3.ts (227 lines, 12 actionType union, BASELINE_REWARDS hardcoded) |
| Pages | 2 modified + 1 new | V3App.jsx, V3URewardPage.jsx (new), URewardPillV3 mounted globally |
| Tests | 1 | p5-7-u-reward-prod.spec.mjs (8 tests) |

## Live Routes (200)

- `https://uzg.plus/v3/u-reward` — U-Reward mini app (Tap + Quiz + Task + Campaign)
- URewardPillV3 mounted globally (visible HOME/CHAT/WALLET/ENTA/PLUS, hidden inside U-Reward)

## Verification

| Gate | Status | Evidence |
|---|---|---|
| Build | PASS | V3 bundle 795 KB JS (+27 KB delta from Sprint 5.6) |
| KL-028 production probe | PASS | 19/19 routes 200 |
| Playwright p5-7-u-reward-prod | PASS | 8/8 PASS in 7.7s |
| AC-7 reward_emit smoke (no-JWT) | PASS | 401 auth_required (auth gate verified) |
| AC-7 full smoke with JWT | PARTIAL (B-5) | TEST_USER missing — defer to NTS click verify on real account |
| D6 DRIFT-14 applied | PASS | NO direct REST query to u_reward_baseline_emissions; hardcoded BASELINE_REWARDS in types |
| AC-13 Direct pattern | PASS | NO V2 Express calls; ZERO `/api/v1/reward/*` endpoints exist |
| Sprint 5.1-5.6 regression | PASS | All prior routes still 200 |
| Lane boundaries | PASS | u-reward-v3/ NEW; cross-module emit DEFERRED to 5.7.x |
| Anti-spam + diminishing returns | PASS | Rate limit 5/sec + 50+ tap threshold + bot detection |
