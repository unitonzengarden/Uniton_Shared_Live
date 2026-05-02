# Sprint 5.11 V2-EXACT wire critical + optional — Final Report

**Audit ID:** LANE01-UZG-V3-P5-11-V2-EXACT-WIRE-CRITICAL-OPTIONAL-2026-05-02T05-00Z
**Date:** 2026-05-02
**Executor:** CLAC1 solo (Lane 01, Sonnet 4.6 / Opus 4.7 finalize)
**Mode:** Frontend V2 EXACT compliance (Strangler Fig — V3 UI + V2 backend)

---

## §1 Status

✅ **COMPLETE — V3 PWA OS PRODUCTION-READY for V2 user rollout**

4/5 fixes shipped (2/2 CRITICAL + 2/3 OPTIONAL). Fix 4 (ENTA avatar V2 endpoint)
deferred Phase 6 — does NOT block GO LIVE.

## §2 Deliverables

- **UZGPLUS PR #91** merged at `32cd9e264fadd811e0543621e0a73cdc0ea26c3c` at `2026-05-02T06:13:52Z`
- **Uniton_Shared PR #(this)** — opened, pending self-merge

## §3 5 Fixes Status

| Fix | Type | Status | Evidence |
|---|---|---|---|
| Fix 1 OTP 8-slot + VI labels | CRITICAL | ✅ | evidence/vietnamese_labels_grep_verify.txt |
| Fix 2 Wallet endpoints | CRITICAL | ✅ | evidence/wallet_endpoints_verify.txt |
| Fix 3 Phone OTP | OPTIONAL | ✅ | evidence/phone_otp_email_grep.txt |
| Fix 4 ENTA avatar V2 endpoint | OPTIONAL | ⏭ DEFERRED | evidence/fix_4_status.txt |
| Fix 5 Signup unified | OPTIONAL | ✅ | evidence/signup_redirect_verify.txt |

## §4 V2 EXACT compliance

| Item | V2 source | V3 implementation |
|---|---|---|
| `OTP_MIN_LENGTH` | V2 LoginPage.jsx:24 = 6 | OtpEntryFormV3.tsx const = 6 ✓ |
| `OTP_MAX_LENGTH` | V2 LoginPage.jsx:25 = 8 | OtpEntryFormV3.tsx const = 8 ✓ |
| `titleRequest` | languageFoundation.js:2970 = 'Vào UZG+' | LoginForm.tsx:102 ✓ |
| `continueAction` | languageFoundation.js:2970 = 'Gửi mã' | LoginForm.tsx:137, SignupForm.tsx:178 ✓ |
| `titleVerify` | languageFoundation.js:2970 = 'Nhập mã xác minh' | OtpEntryFormV3.tsx:73 ✓ |
| `verifyAction` | languageFoundation.js:2970 = 'Xác minh' | OtpEntryFormV3.tsx:117 ✓ |
| `sentTo` | languageFoundation.js:2970 = 'Đã gửi tới' | OtpEntryFormV3.tsx:75 ✓ |
| `resendIn` | languageFoundation.js:2970 = 'Gửi lại sau {seconds}s' | OtpResendCountdownV3.tsx:40 ✓ |
| Wallet transfer endpoint | V2 aier_server.js:18554 POST /api/v1/wallet/transfer | v2ExpressClient.walletTransfer ✓ |
| Deposit address endpoint | V2 aier_server.js:18316 POST /api/v1/deposits/address | v2ExpressClient.getDepositAddress ✓ |
| Email vs phone detect | V2 authService.js:673 isEmailIdentifier(@ check) | otpClient.ts:20-22 ✓ |

## §5 Verification

| Gate | Status |
|---|---|
| Build PASS | V3 bundle 597 modules, 0 TS errors |
| Local Playwright | 15/15 PASS (15.2s) |
| Production Playwright | 15/15 PASS warm cache (16.7s) |
| KL-028 production probe | 24/24 V3 routes 200; 0 5xx |
| Cloudflare deploy | SUCCESS — bundle live globally |
| Lane boundaries | CLEAN — only auth-v3, wallet-v3, lib touched |
| KL-05 mirror | PASS — all 9 files byte-identical |

## §6 V2 EXACT smoke test status

| Flow | Status | Notes |
|---|---|---|
| Auth login OTP (email path) | ✅ verified locally + prod label tests | Real OTP requires NTS click test (Step 4 manual) |
| Auth login OTP (phone path) | ✅ code path implemented | Real SMS OTP requires Supabase phone provider config (verify Phase 6) |
| Wallet send (POST /transfer) | ✅ endpoint registered, page renders | Real send requires authenticated session (NTS) |
| Wallet receive (POST /deposits) | ✅ endpoint registered, page renders | Real address fetch requires authenticated session (NTS) |
| Signup → login redirect | ✅ verified prod | `<Navigate>` works |

## §7 Lane boundaries verification

```
✅ apps/uzg-pwa/src/components/auth-v3/    [extended: 4 files modified]
✅ apps/uzg-pwa/src/lib/auth-v3/            [extended: otpClient.ts]
✅ apps/uzg-pwa/src/lib/                    [extended: v2ExpressClient.ts new exports]
✅ apps/uzg-pwa/src/pages/v3/               [extended: V3SendPage, V3ReceivePage]
✅ apps/uzg-pwa/src/V3App.jsx               [1-line route change]
✅ src/ (KL-05 mirror)                      [byte-identical]
✅ tests/visual/                            [new spec file]
✅ scripts/                                 [new test infra file]
✅ playwright.v3.config.js                  [config update]

UNTOUCHED:
- chat-v3/, profile-v3/, enta-v3/, plus-v3/, tao-v3/, settings-v3/,
  membership-v3/, hooks/, utils/, services/, system/
```

## §8 KL-048 NEW

> NEVER assume detail. Read EXACT from V2 code with file:line citation.

Sprint 5.11 applied verbatim:
- `languageFoundation.js:2970` → V3 LoginForm.tsx:102 'Vào UZG+'
- `LoginPage.jsx:24-25` → V3 OtpEntryFormV3.tsx OTP_MIN/MAX constants
- `aier_server.js:18554` → V3 v2ExpressClient.walletTransfer
- `aier_server.js:18316` → V3 v2ExpressClient.getDepositAddress
- `authService.js:673` → V3 otpClient.isEmailIdentifier

Every V2 EXACT label/endpoint/constant cited with file:line in code comments.

## §9 GO LIVE recommendation

✅ **V3 PWA OS PRODUCTION-READY**

- 4/5 fixes applied (Fix 4 deferred Phase 6, NOT blocking)
- V2 EXACT compliance verified across labels, endpoints, slot count
- Lane boundaries clean
- KL-028 production probe: 24/24 V3 routes 200
- Production Playwright: 15/15 PASS warm cache
- KL-05 mirror integrity verified

**NTS click verify steps (5 min, post-merge):**
1. Open https://uzg.plus/v3/login
2. Verify heading reads "Vào UZG+" (NOT "Đăng nhập")
3. Verify identifier field accepts email OR phone, button text "Gửi mã"
4. Enter V2 email → click "Gửi mã"
5. Receive 6-or-8-digit OTP via email
6. Enter code in 8-slot OTP form (heading "Nhập mã xác minh", subtitle "Đã gửi tới")
7. Click "Xác minh" → V3 session created → redirected to /v3/home
8. Navigate to /v3/wallet/send + /v3/wallet/receive — pages render

## §10 Phase 6 backlog (deferred)

- **Fix 4**: ENTA avatar via V2 endpoint (current Supabase Storage works; audit V2 path)
- **TAO V2 backend wire**: V2 has 15 TAO pages — flip TAO_DATA_SOURCE for backend integration
- **Orphan password users cleanup**: Sprint 5.1+5.9 manual test accounts (no encrypted_password)
- **Cross-module reward emit**: Reward triggers across membership/plus/tao
- **Web Push, i18n, 2FA**: Phase 6 P1 features
- **Bundle code-splitting** (OBS-02): V3 bundle currently 849 KB JS
- **Phone OTP Supabase config**: Verify phone provider enabled in Supabase project
