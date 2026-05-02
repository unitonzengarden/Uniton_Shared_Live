# Snapshot — Sprint 5.11 V2-EXACT wire critical + optional

**Audit ID:** LANE01-UZG-V3-P5-11-V2-EXACT-WIRE-CRITICAL-OPTIONAL-2026-05-02T05-00Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane 01) solo
**Pattern:** V2 EXACT compliance — auth labels, wallet endpoints, identifier flexibility, signup unification
**Significance:** V3 PWA OS production-ready for V2 user rollout (4/5 fixes; Fix 4 deferred Phase 6)

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#91](https://github.com/unitonzengarden/uzgplus-app/pull/91) | `32cd9e2` | MERGED |
| unitonzengarden/Uniton_Shared | (this branch) | TBD | OPEN |

## Source-of-truth references

V2 EXACT contracts read directly from V2 codebase (KL-048 NEW):
- `apps/uzg-pwa/src/system/languageFoundation.js:2970-3030` — Vietnamese auth labels
- V2 `LoginPage.jsx:24-25` — `OTP_MIN_LENGTH=6`, `OTP_MAX_LENGTH=8`
- V2 `aier_server.js:18554` — `POST /api/v1/wallet/transfer` contract
- V2 `aier_server.js:18316` — `POST /api/v1/deposits/address` contract
- V2 `authService.js:673` — `isEmailIdentifier` auto-detect via `@` char

## Files

| Action | Count | Notes |
|---|---|---|
| **MODIFY** | 9 | LoginForm.tsx, OtpEntryFormV3.tsx, OtpResendCountdownV3.tsx, SignupForm.tsx, otpClient.ts, v2ExpressClient.ts, V3App.jsx, V3SendPage.jsx, V3ReceivePage.jsx |
| **MIRROR** | 9 | Same 9 files mirrored byte-identical to `src/` root tree (KL-05) |
| **NEW** | 2 | scripts/test-static-server.mjs (test infra), tests/visual/p5-11-v2-exact-wire.spec.mjs (15 tests) |
| **CONFIG** | 1 | playwright.v3.config.js — default baseURL → 4199, webServer auto-start |
| Total | 21 files / +867 / -151 (net +716) | Net positive (test infra + new endpoints) |

## V2-EXACT Auth Flow (deployed)

```
1. /v3/login (heading: "Vào UZG+", step: "Bước 1 / 2")
2. User enters identifier (email OR phone) — id="login-identifier" type="text"
3. Click "Gửi mã" (data-cta="send-otp")
4. requestOtp() routes:
   - email path → POST /api/v1/auth/otp/request (Worker → Resend)
   - phone path → supabase.auth.signInWithOtp({ phone }) DIRECT
5. OTP form: 8 visual slots, "Nhập mã xác minh" + "Đã gửi tới {ident}"
6. Submit enabled at >= 6 digits, auto-submit at 8
7. Click "Xác minh"
8. verifyOtp() with type='email' OR type='sms' depending on identifier
9. AuthGate redirects to /v3/home
```

## V2-EXACT Wallet Wiring (deployed)

```
/v3/wallet/send → V3SendPage → walletTransfer(jwt, payload):
  POST /api/v1/wallet/transfer
  Headers: Idempotency-Key: <uuid>
  Body: { asset, amount, to_wallet_id, note?, idempotency_key }

/v3/wallet/receive → V3ReceivePage → getDepositAddress(jwt, asset):
  POST /api/v1/deposits/address
  Body: { asset }
  Returns: { ok, data: { address, asset?, network? } }
```

## Verification

| Gate | Status | Evidence |
|---|---|---|
| Build | PASS | npm run build:v3 success, 597 modules |
| 0 TS errors | PASS | clean compile |
| Local Playwright | 15/15 PASS | evidence/playwright_local_15_pass.txt |
| KL-028 production probe | 24/24 V3 routes 200, 0 5xx | evidence/kl_028_production_probe.txt |
| Production Playwright | 15/15 PASS (warm cache) | evidence/playwright_production_run.txt |
| Cloudflare deploy | SUCCESS | evidence/cloudflare_deploy_status.txt |
| Lane boundaries | PASS | auth-v3/, wallet-v3/, lib/ extended; other namespaces UNTOUCHED |
| KL-05 mirror | PASS | All 9 source files byte-identical in apps/uzg-pwa/src/ AND src/ |

## Fix matrix

| Fix | Type | Status | File evidence |
|---|---|---|---|
| Fix 1: OTP 8-slot + VI labels | CRITICAL | ✅ DONE | OtpEntryFormV3, LoginForm, SignupForm, OtpResendCountdownV3 |
| Fix 2: Wallet endpoints | CRITICAL | ✅ DONE | v2ExpressClient.walletTransfer + getDepositAddress, V3SendPage, V3ReceivePage |
| Fix 3: Phone OTP | OPTIONAL | ✅ DONE | otpClient.isEmailIdentifier + dual path requestOtp/verifyOtp |
| Fix 4: ENTA avatar V2 endpoint | OPTIONAL | ⏭ DEFERRED | Phase 6 (current Supabase Storage works; see evidence/fix_4_status.txt) |
| Fix 5: Signup → login redirect | OPTIONAL | ✅ DONE | V3App.jsx `<Navigate to="/login" replace />` |

**4/5 fixes shipped (2/2 CRITICAL + 2/3 OPTIONAL). GO LIVE NOT blocked by Fix 4.**

## Lane boundaries (Sprint 5.11 changed scope only)

```
apps/uzg-pwa/src/
├── components/auth-v3/    ← Fix 1 (4 files)
├── lib/auth-v3/           ← Fix 3 (1 file: otpClient.ts)
├── lib/                   ← Fix 2 (1 file: v2ExpressClient.ts new exports)
├── pages/v3/              ← Fix 2 (2 files: V3SendPage, V3ReceivePage)
└── V3App.jsx              ← Fix 5 (1 line: Navigate)

src/ (KL-05 mirror) — same 9 files byte-identical
```

All other namespaces (chat-v3, profile-v3, enta-v3, plus-v3, tao-v3, settings-v3,
membership-v3, wallet-v3 internals, hooks, utils, services, system) UNTOUCHED.
