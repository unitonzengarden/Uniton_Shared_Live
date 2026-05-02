# V2 OTP-via-Resend Auth Implementation — Audit Report

**Audit ID:** LANE01-UZG-V2-AUTH-OTP-VIA-RESEND-VERIFY-2026-05-02T03-15Z
**Date:** 2026-05-02
**Auditor:** CLAC1 (Lane 01)
**Scope:** READ-ONLY pre-Sprint 5.10 verify
**Output:** Single report → feeds Sprint 5.10 task spec

---

## §1 Executive Summary

**CONFIRMED:** V2 production uses **Supabase OTP via Cloudflare Worker + Resend custom delivery** for authentication. NO password authentication exists in V2 user flow.

**Auth flow (V2):**
1. User enters email/phone identifier
2. Frontend calls `POST /api/v1/auth/otp/request` (Cloudflare Worker, NOT Express)
3. Worker calls Supabase Admin `/auth/v1/admin/generate_link` (type: `magiclink`) → receives `email_otp` code
4. Worker calls Resend API `https://api.resend.com/emails` → delivers branded email with 6-digit code
5. User enters 6-digit code → frontend calls `supabase.auth.verifyOtp({email, token, type:'email'})`
6. Supabase verifies → returns native session → user logged in

**Sprint 5.10 fix complexity:** **MEDIUM** — refactor V3 LoginForm/SignupForm to OTP, delete password-related Sprint 5.9 components. ~80-100 min.

**Architecture insight:** V2 effectively uses Supabase OTP backend BUT bypasses Supabase's email delivery for branding via Resend. OTP generation + verification are still Supabase-native. This means V3 fix is straightforward — same Supabase Auth API.

---

## §2 V2 Frontend Auth Components

### File paths:
- `apps/uzg-pwa/src/pages/LoginPage.jsx` (397 lines) — primary auth UI
- `apps/uzg-pwa/src/services/authService.js` (961 lines) — auth client logic
- `apps/uzg-pwa/src/components/auth/AuthShell` — UI shell wrapper
- `apps/uzg-pwa/src/services/authTraceService.js` — telemetry/tracing

### UI flow steps (LoginPage.jsx):

| Stage | UI |
|---|---|
| 1. Identifier entry | Single text field `identifier` (email or phone, auto-detected via `@`) |
| 2. Send OTP | Submit → `requestOtp()` → `sendOtp(identifier)` |
| 3. OTP code entry | 6-8 digit input, `OTP_MIN_LENGTH=6, OTP_MAX_LENGTH=8`, slot UI display |
| 4. Verify OTP | Submit → `verifyOtpCode(identifier, otpDigits)` |
| 5. Session created | Supabase session populated, redirect by role |

### Form fields:
- **Identifier:** `<input type="text" id="identifier" autoComplete="username">` — accepts email OR phone
- **OTP code:** `<input type="text" id="otpCode" inputMode="numeric" autoComplete="one-time-code" maxLength={8}>`
- **Cooldown timer:** computed `cooldownRemaining` displays "Resend in Xs" countdown
- **No password field** anywhere

### Resend countdown logic:
- `DEFAULT_OTP_RESEND_COOLDOWN_SECONDS = 60`
- `cooldownEndsAt = Date.now() + resolved * 1000`
- 1s interval refreshes UI display
- Server can override via `result.cooldownSeconds`

### Form states:
- `loadingSend` / `loadingVerify` — async pending
- `error` — `nextError?.message` from sendOtp/verifyOtp throws
- `message` — success notice (Vietnamese: "login.successLogin")
- `isOtpSent` — toggles UI between identifier-entry stage and verify stage

### Channel auto-detection:
```js
isEmailIdentifier(identifier) // includes('@')
normalizePhone(identifier) // prefixes '+' if missing
```

### Error normalization (`normalizeOtpAuthError`):
- 429 / `over_email_send_rate_limit` / `over_request_rate_limit` → "Email delivery is cooling down. Wait about Xs..."
- `otp_expired` / "expired" / "invalid" / "token" → "That code is no longer valid..."
- Network errors → "We could not reach the login service..."

---

## §3 V2 Backend OTP Endpoints

**LOCATION SURPRISE:** OTP endpoint is in **Cloudflare Worker** (`apps/uzg-pwa/public/_worker.js`), NOT in `server/aier_server.js`.

### Endpoint catalog:

| Endpoint | Method | Location | Notes |
|---|---|---|---|
| `/api/v1/auth/otp/request` | POST | Cloudflare Worker `_worker.js:47494` → `handleAuthOtpRequest` | Email-only; phone returns 400 `AUTH_OTP_EMAIL_ONLY_GATEWAY` |
| (No `/verify` endpoint) | — | — | Verify happens client-side via `supabase.auth.verifyOtp()` direct |

### Request body schema:
```json
{
  "identifier": "user@example.com",   // email
  "emailRedirectTo": "https://uzg.plus/dashboard"  // optional, defaults to origin/dashboard
}
```

### Response shape (success):
```json
{
  "ok": true,
  "data": {
    "sent": true,
    "channel": "email",
    "email_hint": "u***[r@example.com](mailto:r@example.com)",
    "delivery_owner": "worker-resend-email-gateway",
    "verify_owner": "supabase-auth-verifyOtp",
    "cooldown_seconds": 60,
    "requested_at": "2026-05-02T03:00:00Z"
  }
}
```

### Response codes:
| Code | Status | Meaning |
|---|---|---|
| `AUTH_OTP_IDENTIFIER_REQUIRED` | 400 | Missing email |
| `AUTH_OTP_EMAIL_ONLY_GATEWAY` | 400 | Phone identifier rejected |
| `AUTH_OTP_GATEWAY_NOT_CONFIGURED` | 503 | Supabase env missing |
| `AUTH_EMAIL_PROVIDER_NOT_CONFIGURED` | 503 | RESEND_API_KEY or AUTH_OTP_EMAIL_FROM missing |
| `AUTH_OTP_GENERATE_FAILED` | varies | Supabase admin API error |
| `AUTH_EMAIL_PROVIDER_RATE_LIMITED` | 429 | Resend rate limit |
| `AUTH_EMAIL_PROVIDER_DELIVERY_FAILED` | 502 | Resend failure |

---

## §4 Resend Integration

### SDK usage (Worker `_worker.js:3934-3956`):

```js
const response = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${gatewayConfig.resendApiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    from: gatewayConfig.fromName ? `${fromName} <${fromEmail}>` : fromEmail,
    to: [email],
    subject: 'Your UZG+ sign-in code',
    html: buildAuthOtpEmailHtml({ otpCode, supportEmail }),
    text: buildAuthOtpEmailText({ otpCode, supportEmail }),
    ...(replyTo ? { reply_to: replyTo } : {}),
  }),
})
```

**Note:** Direct `fetch` to `api.resend.com` — NO Resend SDK. Lightweight HTTP integration.

### Email subject:
`Your UZG+ sign-in code`

### Email HTML template (excerpt):
```html
<div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;...">
  <p style="...color:#2563eb;">UZG+ Access</p>
  <h1 style="...color:#0f172a;">Your sign-in code</h1>
  <p>Enter this one-time code in the UZG+ app to continue.</p>
  <div style="...background:#eff6ff;border:1px solid #bfdbfe;text-align:center;">
    <span style="font-size:34px;font-weight:700;letter-spacing:0.22em;color:#1d4ed8;">${safeCode}</span>
  </div>
  <p>Enter the code directly in the UZG+ app. Only the newest code stays valid.</p>
  <p>This code expires automatically. If you need help, reply to ${safeSupportEmail}.</p>
</div>
```

### Email text fallback:
```
Your UZG+ sign-in code is:

${otpCode}

Use this code in the UZG+ app. Only the newest code stays valid.
Need help? Contact ${supportEmail}
```

### From address:
- `AUTH_OTP_EMAIL_FROM` env (primary)
- Fallback: `RESEND_FROM_EMAIL` or `RESEND_FROM`
- From name: `AUTH_OTP_EMAIL_FROM_NAME` or `RESEND_FROM_NAME` or `'UZG+'`

### Template variables:
- `otpCode` — 6-digit code from Supabase
- `supportEmail` — env: `AUTH_OTP_SUPPORT_EMAIL` || `replyTo` || `fromEmail`

---

## §5 OTP Storage + Validation

**STORAGE: Supabase Auth internal (managed by Supabase Auth service).**

V2 does NOT manage OTP storage itself. Architecture:

1. Worker calls `POST {SUPABASE_URL}/auth/v1/admin/generate_link` with `{ type: 'magiclink', email, redirect_to }`
2. Supabase generates OTP internally + returns `email_otp` field in response
3. Worker delivers code via Resend
4. Frontend calls `supabase.auth.verifyOtp({ email, token, type: 'email' })`
5. Supabase validates against its internal store + returns session

### Implications:
- **No custom OTP table** in V2 (no migrations needed)
- **No custom expiry logic** (Supabase default ~1 hour magiclink, configurable in Supabase dashboard)
- **No custom rate limit table** (Supabase Auth + Resend each enforce)
- **No custom cleanup mechanism** (Supabase manages)

### Implication for Sprint 5.10:
V3 frontend can call `supabase.auth.signInWithOtp({ email })` directly OR call `/api/v1/auth/otp/request` Worker endpoint for branded email. Verify always via `supabase.auth.verifyOtp()`.

---

## §6 Session Creation Post-Verify

**Mechanism:** Supabase native `auth.verifyOtp()` returns session — NO custom JWT signing, NO admin createUser bridge.

### Code snippet (V2 `authService.js:766-822`):

```js
export async function verifyOtpCode(identifier, otpCode) {
  const payload = isEmailIdentifier(normalized)
    ? { email: normalized.toLowerCase(), token, type: 'email' }
    : { phone: normalizePhone(normalized), token, type: 'sms' }

  const { data, error } = await supabase.auth.verifyOtp(payload)
  if (error) throw normalizeOtpAuthError(error, 'verify')

  touchSessionActivity('otp_verified')
  const enrichedSession = enrichSessionAccess(data?.session || null)
  // ...
  return { ...data, session: enrichedSession, user: enrichedUser }
}
```

### Frontend receives session via:
- Direct return from `supabase.auth.verifyOtp()` data object
- Stored automatically in `localStorage` by Supabase JS client (key: `sb-kkhhpecofolmrodyeslp-auth-token`)
- AuthGate / `useAuth` polls via `supabase.auth.getSession()`

### Auto-create on first verify:
**YES** — `signInWithOtp` is signup-on-login pattern. If email doesn't exist, Supabase creates user automatically with:
- `email_confirmed_at` = now (via OTP verify counts as confirmation)
- `user_metadata` = `{}` initially
- `app_metadata.providers` = `['email']`
- NO password set

---

## §7 Supabase Auth Provider Probe

**Probe results (live Supabase 2026-05-02):**

```bash
POST https://kkhhpecofolmrodyeslp.supabase.co/auth/v1/signup
Body: { email: "discovery-probe-test@example.test", password: "TestPassword123aB" }
Response: 200 OK
  access_token: eyJhbGc... (valid Supabase JWT)
  user_metadata: { email_verified: true, phone_verified: false }
  app_metadata: { provider: "email", providers: ["email"] }
```

### Findings:
- **Email/password signup ENABLED** in this Supabase project ✓
- **No email confirmation required** (`email_verified: true` immediately) ✓
- → Sprint 5.1 password signups WORK at Supabase level

### Implications:
- **Sprint 5.1 V3 LoginForm.signInWithPassword would actually succeed** if user has password set
- **BUT:** V2 users (created via OTP `magiclink`) have **NO password** set
- → V2 users → V3 LoginForm → "Invalid login credentials" error
- **Orphan accounts:** V3 SignupForm DOES create orphan users with passwords (Sprint 5.1+5.9 testing may have created these). These users have email + password BUT V2 LoginPage requires OTP, not password.

### Cleanup recommendation:
Sprint 5.10 audit + clean up any V3-test-created users with passwords (Supabase dashboard query: `SELECT * FROM auth.users WHERE encrypted_password IS NOT NULL`). Defer to Phase 6 if no real user impact.

---

## §8 V2 Password Recovery / "Forgot Login"

**FINDING: V2 has NO password recovery flow** (because no passwords exist).

### Grep results:
```bash
grep "forgot.*password\|reset.*password" apps/uzg-pwa/src/services/ apps/uzg-pwa/src/pages/LoginPage.jsx
# (no matches)

grep "resetPassword\|forgot.*password" server/aier_server.js apps/uzg-pwa/public/_worker.js
# (no matches)
```

### V2 user lockout recovery:
- If user loses email access → manual customer support OR no recovery
- No "forgot login" UI exists in V2

### Implication for Sprint 5.10:

**DELETE all Sprint 5.9 password-recovery components** — they are irrelevant to OTP model:
- `ForgotPasswordFormV3.tsx` ❌ DELETE
- `ResetPasswordFormV3.tsx` ❌ DELETE
- `ChangePasswordFormV3.tsx` ❌ DELETE
- `useForgotPassword.ts` ❌ DELETE
- `useResetPassword.ts` ❌ DELETE
- `useChangePassword.ts` ❌ DELETE
- Routes: `/v3/forgot-password`, `/v3/reset-password`, `/v3/account/change-password` ❌ DELETE

**Reasoning:** OTP IS the recovery mechanism. User loses access → enter email → receive new OTP → log in. No separate "reset" flow needed.

---

## §9 V2 Logout

**Mechanism:** `supabase.auth.signOut()` — Supabase native.

### Code (V2 `authService.js:841-848`):
```js
export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
  clearActivityTs()
  clearRoleContext()
  clearRecentVerifiedSessionMarker()
  logSessionEvent('session_logout', { reason: 'manual' })
}
```

### Compatible with Sprint 5.1 V3 useAuth.signOut?
**YES** — both call `supabase.auth.signOut()`. Sprint 5.9 `useLogout` is fully compatible.

### Implication for Sprint 5.10:
- KEEP `useLogout.ts` ✓
- KEEP `LogoutConfirmV3.tsx` ✓
- KEEP `UserMenuV3.tsx` (already wires to logout) ✓
- KEEP `SessionExpiredOverlayV3.tsx` ✓ (auth state change listener works for OTP too)

---

## §10 Sprint 5.10 Fix Recommendation

### Architecture:

V3 should mirror V2 OTP flow exactly:
1. Email entry → call `/api/v1/auth/otp/request` (Cloudflare Worker)
2. 6-digit code entry → call `supabase.auth.verifyOtp()` direct (no V3 backend)
3. Session received from Supabase → AuthGate detects → routes to `/v3/home`

### Components to REFACTOR:

| File | Current | Refactor to |
|---|---|---|
| `apps/uzg-pwa/src/components/auth-v3/LoginForm.tsx` | email + password | email-only → "Send code" button → OTP entry stage |
| `apps/uzg-pwa/src/components/auth-v3/SignupForm.tsx` | email + password + metadata | email-only (signup-on-OTP-verify), or DELETE if redundant |
| `apps/uzg-pwa/src/hooks/useAuth.ts` | `signInWithPassword`, `signUp` | `sendOtp`, `verifyOtp` |
| `apps/uzg-pwa/src/types/auth.ts` | password params | identifier + token params |

### Components to DELETE (Sprint 5.9):

| File | Reason |
|---|---|
| `apps/uzg-pwa/src/components/auth-v3/ForgotPasswordFormV3.tsx` | OTP IS recovery |
| `apps/uzg-pwa/src/components/auth-v3/ResetPasswordFormV3.tsx` | OTP IS recovery |
| `apps/uzg-pwa/src/components/auth-v3/ChangePasswordFormV3.tsx` | No passwords to change |
| `apps/uzg-pwa/src/hooks/useForgotPassword.ts` | unused |
| `apps/uzg-pwa/src/hooks/useResetPassword.ts` | unused |
| `apps/uzg-pwa/src/hooks/useChangePassword.ts` | unused |
| `apps/uzg-pwa/src/pages/v3/V3ForgotPasswordPage.jsx` | route removed |
| `apps/uzg-pwa/src/pages/v3/V3ResetPasswordPage.jsx` | route removed |
| `apps/uzg-pwa/src/pages/v3/V3ChangePasswordPage.jsx` | route removed |
| `apps/uzg-pwa/src/components/auth-v3/AccountDeletionConfirmV3.tsx` | KEEP — deletion is independent of password |
| Routes `/v3/forgot-password`, `/v3/reset-password`, `/v3/account/change-password` | DELETE |

### Routes to ADJUST:
- DELETE: `/v3/forgot-password`, `/v3/reset-password`, `/v3/account/change-password`
- KEEP: `/v3/account/delete`, `/v3/settings`, `/v3/profile/me`, `/v3/connections`
- Settings AccountSection — remove "Change password" link

### NEW components needed:

| File | Purpose |
|---|---|
| `apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx` | 6-digit OTP input UI (slot display + auto-fill from clipboard) |
| `apps/uzg-pwa/src/components/auth-v3/OtpResendCountdownV3.tsx` | "Resend in 60s" timer button |
| `apps/uzg-pwa/src/hooks/useOtpAuth.ts` | Combined sendOtp + verifyOtp + cooldown state machine |

### NEW lib (or reuse V2):

**OPTION A:** Import from V2 directly
```ts
// In useAuth.ts:
import { sendOtp, verifyOtpCode } from '../services/authService.js';
```
Pros: zero duplication. Cons: tight coupling V2/V3.

**OPTION B (RECOMMENDED):** Replicate logic in V3 namespace
```ts
// New: apps/uzg-pwa/src/lib/auth-v3/otpClient.ts
export async function sendOtp(email) { /* call /api/v1/auth/otp/request OR fallback supabase.auth.signInWithOtp */ }
export async function verifyOtp(email, token) { /* supabase.auth.verifyOtp({ email, token, type: 'email' }) */ }
```

### Backend integration (NO BACKEND CHANGES NEEDED):
- V3 frontend calls EXISTING Cloudflare Worker `/api/v1/auth/otp/request`
- V3 frontend calls EXISTING Supabase Auth `verifyOtp` direct
- V2 backend reuse: 100% — Sprint 5.10 is frontend-only refactor

### Estimated Sprint 5.10 scope:
- **REFACTOR:** 2 components (LoginForm + SignupForm) + 1 hook (useAuth) + 1 type file
- **DELETE:** 6-9 files (forgot/reset/change password components + hooks + pages)
- **NEW:** 2-3 components (OtpEntryForm + OtpResendCountdown) + 1 hook (useOtpAuth) + 1 lib (otpClient)
- **ROUTES:** Delete 3, keep 6
- **ETA:** ~80-100 min (medium sprint)

### KEEP unchanged (Sprint 5.1+5.9):
- `AuthProvider.tsx` ✓
- `AuthGate.tsx` ✓
- `UserMenuV3.tsx` ✓
- `LogoutConfirmV3.tsx` ✓
- `useLogout.ts` ✓
- `SessionExpiredOverlayV3.tsx` ✓
- `useSessionExpiry.ts` ✓
- `AccountDeletionConfirmV3.tsx` ✓ (deletion independent of password)
- `Settings*` ✓ (except remove "Change password" link)
- `Profile*` ✓
- `Connect*` ✓

---

## §11 Critical Findings

1. **Sprint 5.1 V3 LoginForm is actively broken for V2 users.** V2 users (created via OTP) have NO `encrypted_password` in `auth.users`. Login attempt → Supabase 400 "Invalid login credentials".

2. **Sprint 5.9 password recovery components are completely irrelevant.** OTP serves as recovery. Sprint 5.10 should DELETE all 6 components + 3 hooks + 3 routes. Net file delete count: 9-12.

3. **Backend is already perfect.** Cloudflare Worker `/api/v1/auth/otp/request` + Resend integration battle-tested. V3 only needs frontend changes — zero backend modifications.

4. **Resend env vars required for branded delivery:** `RESEND_API_KEY`, `AUTH_OTP_EMAIL_FROM`. Already configured in production worker. V3 inherits — no env changes needed.

5. **Supabase password signup IS enabled** in this project, but V2 doesn't use it. Sprint 5.10 should NOT disable Supabase password auth (could break Phase 6 features). Just route V3 to OTP instead.

6. **Orphan V3 test users may exist** from Sprint 5.1+5.9 manual testing. Check `auth.users WHERE encrypted_password IS NOT NULL` count. Cleanup deferred Phase 6 if no production impact.

7. **OTP fallback path:** V2 `sendOtp` falls back to `supabase.auth.signInWithOtp()` direct if Worker returns 404 / `auth_otp_gateway_not_configured`. V3 should preserve this fallback for resilience.

8. **No quiz/recovery answers backup.** If user loses email access AND can't receive OTP, no in-app recovery exists. Customer support manual process out of scope.

9. **Phone OTP supported by Supabase** but Worker email gateway rejects phone (`AUTH_OTP_EMAIL_ONLY_GATEWAY`). V3 Sprint 5.10 may ship email-only initially; phone later via direct `signInWithOtp({phone})` if needed (skipping Worker).

---

## §12 Pattern Lessons (KL-047 NEW)

**KL-047 NEW:** Backend Audit (Uniton_Shared #78) audited DB schema + RPCs but **DID NOT verify Auth provider configuration** (signInWithPassword vs signInWithOtp vs custom). Sprint 5.1 KL claim "no email confirmation required" was misinterpreted as endorsement of password auth model — actual model was OTP-only.

**Future Backend Audit scope expansion:**
- Probe `auth.users` for `encrypted_password IS NOT NULL` count
- Check Cloudflare Worker `/api/v1/auth/*` endpoints (NOT just Express)
- Document Auth provider config (email/password vs OTP vs OAuth)
- Document email delivery owner (Supabase native vs Resend custom vs SendGrid etc.)

This audit (LANE01-UZG-V2-AUTH-OTP-VIA-RESEND-VERIFY) closes the gap. Phase 6 backend audit template should include AUTH section.

---

## §13 References

- `apps/uzg-pwa/src/pages/LoginPage.jsx` — V2 OTP UI flow
- `apps/uzg-pwa/src/services/authService.js` — V2 auth client (sendOtp, verifyOtpCode, logout)
- `apps/uzg-pwa/public/_worker.js:3800-4068` — Cloudflare Worker `/api/v1/auth/otp/request` handler
- `apps/uzg-pwa/public/_worker.js:3934-3956` — Resend API integration
- `apps/uzg-pwa/src/hooks/useAuth.ts:47` — V3 BUG (signInWithPassword)
- `apps/uzg-pwa/src/components/auth-v3/LoginForm.tsx:28` — V3 BUG (signIn with password)
- Supabase project: `kkhhpecofolmrodyeslp` — password signup enabled, OTP also enabled
- Sprint 5.1 task spec — created V3 password auth assuming Supabase native model
- Sprint 5.9 task spec — added password recovery components (now irrelevant)
- DEC-08 Phase 5 architecture — Auth assumed Supabase native (incorrect for UZG+ V2)

---

🔒 LANE01-UZG-V2-AUTH-OTP-VIA-RESEND-VERIFY-2026-05-02T03-15Z
End of audit report.
🎯 Sprint 5.10 task spec ready to author from §10.
