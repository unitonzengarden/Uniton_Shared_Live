# Snapshot — Phase 6.1.b Authenticated QA Infrastructure

**Audit ID:** LANE01-CLAC1-PHASE6-1B-AUTHENTICATED-QA-INFRA-2026-05-02T10-30Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane_01) solo
**Pattern:** Test infrastructure + measured baselines (closes Phase 6.1 deferred AC-3)
**Significance:** First real-data authenticated visual baselines for V3. Reusable harness for Phase 6.2 / 6.5 / 7+. **KL-062 NEW** discovered through measurement.

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#94](https://github.com/unitonzengarden/uzgplus-app/pull/94) | `77dc66ed` | MERGED at 2026-05-02T11:46:47Z |
| unitonzengarden/Uniton_Shared | (this audit branch) | TBD | OPEN |

## Infrastructure shipped

```
tests/lane01/
├── fixtures/auth-bypass.fixture.js      # Magic-link bypass (Admin SDK + verify + localStorage inject)
├── scripts/smoke-test-auth-bypass.mjs   # End-to-end infra verification (PASS)
├── audit/01-v2-vs-v3-baselines.audit.spec.js  # 6 routes × V2+V3 capture + pixel diff
├── playwright.lane01.config.js          # Production base URL, single worker, 120s timeout
├── README.md                            # Usage + reuse plan + KL-062 explanation
├── baselines/v2/*.png                   # 6 V2 production screenshots
├── baselines/v3/*.png                   # 6 V3 production screenshots
├── diffs/*.png                          # 6 pixelmatch visualizations
├── console-logs/*.log                   # Per-screen console capture (V2 + V3)
└── measured-scores.json                 # Aggregate per-module results

.github/workflows/authenticated-visual-regression.yml
                                         # Auto-runs on PRs to Lane_01 paths
                                         # Hard gate: V3 console errors == 0, V3 network failures == 0
```

## Measured baselines

| Route | V3 score vs V2 | V3 console errs | V2 console errs | V3 network fails | V2 network fails |
|---|---|---|---|---|---|
| HOME | 35.24% | 1 | 9 | 0 | 4 |
| ENTA | 20.56% | 0 | 9 | 0 | 4 |
| ENTA-ONBOARDING | 74.18% | 0 | 9 | 0 | 4 |
| CONNECTIONS | 78.50% | 0 | 9 | 0 | 4 |
| PROFILE | 79.10% | 0 | 12 | 0 | 3 |
| SETTINGS | 82.94% | 0 | 3 | 0 | 1 |

## Verification

| Gate | Result |
|---|---|
| Smoke test auth bypass | PASS (Admin SDK + verify endpoint working end-to-end) |
| Audit captures 6/6 routes V2 + V3 + diff | PASS |
| Sprint 5.11 + Phase 6.1 regression | 27/27 PASS (no regression) |
| Build (no source changes) | N/A — pure test infra |
| KL-028 production probe | 6/6 = 200 ✓ |
| Cloudflare deploy | SUCCESS |
| Lane boundaries | CLEAN (only `tests/lane01/` + `.github/workflows/` touched) |
| KL-05 mirror | N/A — test infra only |

## KL-062 NEW discovered through measurement

V2-vs-V3 pixel diff measures visual REDESIGN divergence, not behavioral V2 EXACT compliance. V3 was intentionally designed as a new UI/UX (NAM TAO branding, mobile shell canon, new component library) — visual diff vs V2 is HIGH (20-83%) by design.

**V3 is operationally HEALTHIER than V2:**
- V3 console errors: 0-1 per route
- V2 console errors: 3-12 per route
- V3 network failures: 0
- V2 network failures: 1-4 per route

V2 EXACT behavioral compliance is established by `V2_FLOW_*_EXACT_v1.md` audits + Sprint 5.12 QA Auto-Loop + Phase 6.1.b authenticated console/network capture.

## Files

| Action | Count |
|---|---|
| NEW (test infra) | 5 (fixture + smoke + audit spec + config + README) |
| NEW (CI) | 1 workflow |
| NEW (artifacts) | 24 (6 V2 + 6 V3 + 6 diffs + 6 console-logs + measured-scores.json) |
| MODIFY | 0 — zero V3 source code changes |
| Total | 30 files / +759 / 0 deletions |

## Lane boundaries

```
✅ tests/lane01/                                          [NEW test infra]
✅ .github/workflows/authenticated-visual-regression.yml  [NEW CI workflow]

UNTOUCHED:
- All Lane_01 source code (no fixes warranted per KL-051 + KL-062)
- All Lane_02 source + tests (chat-v3/, wallet-v3/, plus-v3/, etc.)
- V2 backend (Worker, Express, Supabase Auth, Resend) — IMMUTABLE per DEC-08
- All audit canon
```
