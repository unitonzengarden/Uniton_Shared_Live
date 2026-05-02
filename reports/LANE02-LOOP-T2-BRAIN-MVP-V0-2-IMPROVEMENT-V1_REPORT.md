# LANE02-LOOP-T2-BRAIN-MVP-V0-2-IMPROVEMENT-V1 — REPORT

**Task ID**: LANE02-LOOP-T2-BRAIN-MVP-V0-2-IMPROVEMENT-V1
**Loop**: 2/5
**Type**: Brain MVP version bump v0.1.0 → v0.2.0
**Authority**: AMD_LANE02_CTO_AUTO_APPROVE_TECH_NON_CANON (scripts/brain + tests)
**Date**: 2026-04-28
**Verdict**: PASS

## §1 Scope

- `scripts/brain/__init__.py`: version 0.1.0 → 0.2.0
- `scripts/brain/intent_parser.py`: keyword extensions (5 intents +13 keywords; 9 domains +21 keywords; 2 NEW domains: `governance`, `runtime`); confidence base bumped 0.2 → 0.3; 6 NEW self-test fixtures
- `scripts/brain/lane_matcher.py`: priors tuned (Lane_01 build/fix/deploy bumped; Lane_02 test/document bumped; Lane_03 analyze bumped); 2 NEW domain priors per Lane (governance, runtime); scoring weights bumped (domain ×0.3 → ×0.35; intent ×0.2 → ×0.25); 4 NEW self-test fixtures
- 8 NEW pytest tests (4 + 4)

## §2 Test count delta

- Before: 112 tests (T1 baseline)
- After: 120 tests
- Added: 8

## §3 Confidence improvement

| Real-test query | v0.1 score | v0.2 score | Verdict |
|---|---|---|---|
| "Lane_3 viết tôi spec ví thanh toán" | 0.55 | 0.50 | ≈ stable; Lane_03 ✓ |
| "Audit canon để check drift" | 0.45 | 0.56 | +24% improvement; Lane_03 ✓ |
| "Build worker mới" | 0.17 | 0.24 | +41% improvement; Lane_01 ✓ |

## §4 Backward compatibility

- 16 v0.1 tests: ALL PASS
- 5 v0.1 intent_parser self-test fixtures: ALL PASS
- 4 v0.1 lane_matcher self-test fixtures: ALL PASS
- 3 original real-test scenarios still match expected lanes

## §5 New keywords summary

**Intents (+13)**:
- build: construct, develop, scaffold, set up, tạo mới, phát triển, xây dựng
- fix: debug, troubleshoot, remediate, rectify, gỡ lỗi
- analyze: profile, benchmark, explore, đo lường, đánh giá
- test: regression, kiểm thử hồi quy
- document: specify, annotate, describe, soạn, ghi chép, mô tả

**Domains (+21 + 2 NEW)**:
- canon: constitution, ranh giới
- skill: capability, ability, khả năng, chức năng
- workflow: automation, ci/cd, github action, tự động hoá
- test: unit test, integration test, kiểm thử đơn vị, thử nghiệm tích hợp
- doc: manual, tutorial, reference, sổ tay, tham khảo
- infrastructure: vps, container, docker, kubernetes, máy chủ
- wallet: crypto, blockchain, transaction, tiền mã hoá, giao dịch
- **governance** (NEW): approval, compliance, audit, review, duyệt, kiểm soát, tuân thủ
- **runtime** (NEW): runtime, current_state, checklist, ledger, hot-memory, trạng thái, sổ ghi

## §6 Boundary compliance

- ✅ scripts/brain/ scope only
- ✅ tests/ scope only (ADD-only — 16 v0.1 tests untouched)
- ✅ No SHARED/, CANON/, Lane_01/, Lane_03/ touched
- ✅ No external dependencies added (stdlib only)
- ✅ No LLM, no daemon
- ✅ Ledger/checklist/current_state hot-memory updates within allowed scope

## §7 Files changed

**Modified (5)**:
- scripts/brain/__init__.py (version bump)
- scripts/brain/intent_parser.py (keyword extensions + fixtures + confidence base)
- scripts/brain/lane_matcher.py (priors + fixtures + weights)
- tests/test_intent_parser.py (4 new tests appended)
- tests/test_lane_matcher.py (4 new tests appended)

**New (4)**:
- reports/LANE02-LOOP-T2-BRAIN-MVP-V0-2-IMPROVEMENT-V1_REPORT.md
- snapshots/LANE02-LOOP-T2-BRAIN-MVP-V0-2-IMPROVEMENT-V1_snapshot.live.json
- audit_logs/LANE02-LOOP-T2-BRAIN-MVP-V0-2-IMPROVEMENT-V1_audit.log
- handoffs/outbox/Lane_02/RSP-L02-L01-T2-COMPLETE-20260428-001.json

## §8 Commit

- HEAD before: `004a1652b557957da483a0bcecfbce02a62b2309`
- Message: "feat(brain): v0.2 improvements - keyword extensions + scoring tuning [vercel skip]"
