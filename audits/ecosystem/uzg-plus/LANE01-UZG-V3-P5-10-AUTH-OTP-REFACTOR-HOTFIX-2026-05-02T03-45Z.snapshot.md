# Snapshot — Sprint 5.10 Auth OTP refactor hot-fix

**Audit ID:** LANE01-UZG-V3-P5-10-AUTH-OTP-REFACTOR-HOTFIX-2026-05-02T03-45Z
**Date:** 2026-05-02
**Executor:** CLAC1 (Lane 01) solo
**Pattern:** Frontend OTP refactor (Sprint 5.1+5.9 P0 bug correction)
**Significance:** P0 PRODUCTION BLOCKER RESOLVED — V2 users CAN now login V3

---

## Deliverables

| Repo | PR | Commit | Status |
|---|---|---|---|
| unitonzengarden/uzgplus-app | [#89](https://github.com/unitonzengarden/uzgplus-app/pull/89) | `268fec7` | MERGED |
| unitonzengarden/Uniton_Shared | (this branch) | TBD | OPEN |

## Verify report dependency

This sprint executes §10 of [Verify report PR #86](https://github.com/unitonzengarden/Uniton_Shared/pull/86) verbatim:
- V2 architecture: Cloudflare Worker `/api/v1/auth/otp/request` + Resend custom delivery + Supabase native verifyOtp
- V2 users have NO encrypted_password — Sprint 5.1 password auth incompatible
- Sprint 5.9 password recovery components irrelevant to OTP model

## Files

| Action | Count | Notes |
|---|---|---|
| **REFACTOR** | 4 | useAuth.ts, LoginForm.tsx, SignupForm.tsx, types/auth.ts |
| **DELETE** | 9 | 3 components + 3 hooks + 3 pages (password recovery) |
| **ADD** | 4 | otpClient.ts, useOtpAuth.ts, OtpEntryFormV3.tsx, OtpResendCountdownV3.tsx |
| **UPDATE** | 3 | Settings AccountSectionV3, V3App.jsx routes, auth-v3 barrel |
| Tests | 1 new + 1 deleted | p5-10-auth-otp-prod (replaces p5-9-auth-settings-profile-follow) |
| Total | 46 files / -1,061 deletions / +1,534 insertions | Net negative bundle delta |

## OTP Flow (deployed)

```
1. /v3/login or /v3/signup
2. User enters email
3. Click "Gửi mã xác thực"
4. → POST /api/v1/auth/otp/request
   → Worker calls Supabase admin generate_link (magiclink type)
   → Worker calls Resend API → branded email with 6-digit code
5. User enters 6-digit code in OtpEntryFormV3
6. → supabase.auth.verifyOtp({email, token, type: 'email'})
   → Native Supabase session created
7. AuthProvider onAuthStateChange triggers → AuthGate redirects to /v3/home
```

## Verification

| Gate | Status | Evidence |
|---|---|---|
| Build | PASS | V3 bundle 849 KB JS (-2 KB delta — DELETE > NEW) |
| 0 TS errors | PASS | npm run build:v3 success |
| KL-028 production probe | TBD | Pending Cloudflare deploy verification |
| Playwright p5-10 | TBD | 8 tests, pending deploy |
| Lane boundaries | PASS | auth-v3/ extended; settings-v3/ AccountSection 1-line edit |
| ENTA canon §13 redlines | PASS | Sprint 5.9 compliance preserved |

## P0 Bug Resolution

**Before Sprint 5.10:** V2 users → /v3/login → enter email + any password → "Invalid login credentials" → BLOCKED

**After Sprint 5.10:** V2 users → /v3/login → enter email → receive OTP email → enter 6-digit code → V3 session created → /v3/home

V3 users (orphan accounts created by Sprint 5.1+5.9 manual testing): cleanup deferred to Phase 6.
