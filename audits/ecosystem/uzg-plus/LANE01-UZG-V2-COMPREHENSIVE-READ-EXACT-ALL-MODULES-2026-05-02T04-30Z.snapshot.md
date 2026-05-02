# Snapshot — V2 EXACT Comprehensive Read (8 modules)

**Audit ID:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES-2026-05-02T04-30Z
**Date:** 2026-05-02
**Auditor:** CLAC1 (Lane 01) solo
**Mode:** READ-ONLY (zero code/data modifications)
**Significance:** P0 GO-LIVE BLOCKER UNBLOCKED — comprehensive V2 reference for Sprint 5.11

---

## Mission

NTS frustrated 2× wrong Auth fixes (Sprint 5.1 password, Sprint 5.10 OTP 6-digit). This audit applied EXACT mindset:
- COUNT digit length in code (no assumption)
- COPY Vietnamese labels exact (no paraphrase)
- CITE file:line for every claim (mandatory)

## Scope: 8 modules

| # | Module | Status | Documents |
|---|---|---|---|
| 1 | AUTH (P0) | ❌ 46% match — Sprint 5.10 wrong (6 slots vs 8) | V2_FLOW_AUTH_EXACT_v1.md |
| 2 | HOME/Feed | ✅ 85% | V2_FLOW_HOME_EXACT_v1.md |
| 3 | CHAT | ✅ 95% | V2_FLOW_CHAT_EXACT_v1.md |
| 4 | WALLET | ⚠️ 75% — send/receive not wired | V2_FLOW_WALLET_EXACT_v1.md |
| 5 | ENTA | ✅ 85% | V2_FLOW_ENTA_EXACT_v1.md |
| 6 | PLUS+Membership | ✅ 95% | V2_FLOW_PLUS_MEMBERSHIP_EXACT_v1.md |
| 7 | U-Reward | ✅ 95% (backend) | V2_FLOW_U_REWARD_EXACT_v1.md |
| 8 | TAO | ⚠️ 70% — V2 has 15 pages (correction!) | V2_FLOW_TAO_EXACT_v1.md |

## Deliverables

| File | Purpose |
|---|---|
| `V2_EXACT_MASTER_SUMMARY_GO_LIVE_v1.md` | Master summary + GO LIVE recommendation |
| 8× `V2_FLOW_<MODULE>_EXACT_v1.md` | Per-module EXACT documentation |
| 3 DOT files (snapshot/report/audit_log) | Audit governance |

## Critical findings

1. **Auth OTP UI**: V2 = **8 slots** (`OTP_MAX_LENGTH=8`), V3 Sprint 5.10 hardcoded 6 — MISMATCH
2. **Auth Vietnamese**: V3 Sprint 5.10 paraphrased ("Đăng nhập" vs V2 EXACT "Vào UZG+", "Xác thực" vs "Xác minh", etc.)
3. **Auth Phone OTP**: V2 supports phone (auto-detect via @), V3 currently email-only
4. **Wallet send/receive**: V3 routes exist but not wired to V2 endpoints
5. **TAO correction**: V2 has 15 TAO pages (NTS earlier "V2 chưa có TAO" was wrong); V3 mock acceptable for go-live

## GO LIVE Recommendation

✅ **GO** with Sprint 5.11 critical fix (~60-80 min):
- Auth OTP refactor (8 slots + Vietnamese labels match V2)
- Wallet send/receive wiring

Other modules acceptable as-is. Phone OTP + ENTA avatar + signup unify deferred 5.11.x or Phase 6.
