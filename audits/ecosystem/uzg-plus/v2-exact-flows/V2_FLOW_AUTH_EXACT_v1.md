# V2 AUTH Flow — EXACT Documentation

**Audit:** LANE01-UZG-V2-COMPREHENSIVE-READ-EXACT-ALL-MODULES-2026-05-02T04-30Z
**Module:** 1 of 8 (P0 PRIORITY)
**Status:** LIVE in V2 production

---

## §1 Module status V2

**LIVE.** V2 uses Supabase OTP via Cloudflare Worker + Resend custom email delivery. NO password authentication at all.

---

## §2 Frontend components V2

### File paths
| File | Lines | Role |
|---|---|---|
| `apps/uzg-pwa/src/pages/LoginPage.jsx` | 397 | Primary auth UI (login + signup unified) |
| `apps/uzg-pwa/src/services/authService.js` | 961 | Auth client (sendOtp, verifyOtpCode, logout) |
| `apps/uzg-pwa/src/services/authTraceService.js` | — | Telemetry/tracing |
| `apps/uzg-pwa/src/components/auth/AuthShell` | — | UI shell wrapper |
| `apps/uzg-pwa/src/system/languageFoundation.js:2970-3030` | — | Vietnamese labels |

### State machine

**LoginPage.jsx EXACT state:**
```js
const [identifier, setIdentifier] = useState('')      // email OR phone
const [otpCode, setOtpCode] = useState('')            // OTP digits
const [isOtpSent, setIsOtpSent] = useState(false)     // 2-stage UI flag
const [loadingSend, setLoadingSend] = useState(false)
const [loadingVerify, setLoadingVerify] = useState(false)
const [submittedIdentifier, setSubmittedIdentifier] = useState('')
const [deliveryChannel, setDeliveryChannel] = useState('') // 'email' | 'phone'
const [cooldownEndsAt, setCooldownEndsAt] = useState(0)
const [cooldownNow, setCooldownNow] = useState(Date.now())
const [traceVersion, setTraceVersion] = useState(0)
```

### OTP length constants (EXACT — count from code)

**File:** `apps/uzg-pwa/src/pages/LoginPage.jsx:24-25`
```js
const OTP_MIN_LENGTH = 6
const OTP_MAX_LENGTH = 8
```

**Conclusion:**
- UI displays **8 slots** (max length)
- Accepts **6-8 digits** input (DIGITS ONLY — `replace(/\D/g, '')` enforces)
- Submit button enabled at **≥6 digits**: `disabled={loadingVerify || otpDigits.length < OTP_MIN_LENGTH}`
- Production Supabase configured for **8-digit OTPs** per NTS confirmation

### Vietnamese labels (EXACT copy from `languageFoundation.js:2970-3030`)

| Key | Vietnamese exact |
|---|---|
| `eyebrow` | `'Đăng nhập'` |
| `titleRequest` | `'Vào UZG+'` |
| `titleVerify` | `'Nhập mã xác minh'` |
| `descriptionRequest` | `'Nhập email hoặc số điện thoại để nhận mã đăng nhập.'` |
| `descriptionVerify` | `'Nhập mã mới nhất để tiếp tục.'` |
| `statusEmailCode` | `'Mã email'` |
| `statusSmsCode` | `'Mã SMS'` |
| `requestStep` | `'Bước 1 / 2'` |
| `requestTitle` | `'Nhập email hoặc số điện thoại'` |
| `requestBadge` | `'OTP'` |
| `identifierLabel` | `'Email hoặc số điện thoại'` |
| `identifierPlaceholder` | `'name@example.com hoac +1 555 123 4567'` |
| `requestNote` | `'Chúng tôi gửi mã ngắn thay cho mật khẩu để đăng nhập nhanh hơn trên di động.'` |
| `continueAction` | `'Gửi mã'` |
| `sendingCode` | `'Đang gửi mã...'` |
| `verifyStep` | `'Bước 2 / 2'` |
| `verifyTitle` | `'Nhập mã mới nhất'` |
| `sentTo` | `'Đã gửi tới'` |
| `otpLabel` | `'Mã một lần'` |
| `otpPlaceholder` | `'Nhập mã của bạn'` |
| `verifyAction` | `'Xác minh'` |
| `verifying` | `'Đang xác minh...'` |
| `resend` | `'Gửi lại mã'` |
| `resendIn` | `'Gửi lại sau {seconds}s'` |
| `sendingShort` | `'Đang gửi...'` |
| `changeAddress` | `'Đổi địa chỉ'` |
| `successLogin` | `'Đăng nhập thành công. Đang mở UZG+...'` |
| `sentInbox` | `'Kiểm tra email để lấy mã đăng nhập mới nhất.'` |
| `sentSms` | `'Mã đã được gửi qua SMS.'` |

### UI flow stages

**Stage 1 — Identifier entry (LoginPage.jsx:251-283)**
- Single input field `<input type="text" id="identifier" autoComplete="username">`
- Channel auto-detected by `@` presence (email vs phone)
- Submit button: `'Gửi mã'`

**Stage 2 — OTP entry (LoginPage.jsx:284-360)**
- Display: `'Đã gửi tới {email/phone}'`
- 8 slots `<span className="auth-otp-slot">` for OTP_MAX_LENGTH=8
- Hidden input with `inputMode="numeric"`, `autoComplete="one-time-code"`, `maxLength={OTP_MAX_LENGTH}`
- Verify button: `'Xác minh'` (disabled until ≥6 digits)
- Resend button: `'Gửi lại mã'` / `'Gửi lại sau Xs'`
- Change address button: `'Đổi địa chỉ'`

---

## §3 Backend endpoints V2

### Endpoint 1: Send OTP (Cloudflare Worker)

| Field | Value |
|---|---|
| URL | `POST https://uzg.plus/api/v1/auth/otp/request` |
| Location | `apps/uzg-pwa/public/_worker.js:47494` (route) → `_worker.js:3966-4068` (handler `handleAuthOtpRequest`) |
| Headers | `Content-Type: application/json` |

**Request body:**
```json
{
  "identifier": "user@example.com",
  "emailRedirectTo": "https://uzg.plus/dashboard"
}
```

**Note:** Field name is `identifier` (NOT `email`). Worker accepts `body.identifier || body.email` (both supported, but standard = `identifier`).

**Response (200 OK):**
```json
{
  "ok": true,
  "data": {
    "sent": true,
    "channel": "email",
    "email_hint": "u***r@example.com",
    "delivery_owner": "worker-resend-email-gateway",
    "verify_owner": "supabase-auth-verifyOtp",
    "cooldown_seconds": 60,
    "requested_at": "2026-05-02T03:00:00Z"
  }
}
```

**Error responses (Worker):**
| Status | Code | When |
|---|---|---|
| 400 | `AUTH_OTP_IDENTIFIER_REQUIRED` | Empty body / no identifier |
| 400 | `AUTH_OTP_EMAIL_ONLY_GATEWAY` | Phone identifier (worker rejects, frontend falls back to Supabase direct) |
| 503 | `AUTH_OTP_GATEWAY_NOT_CONFIGURED` | Supabase env missing |
| 503 | `AUTH_EMAIL_PROVIDER_NOT_CONFIGURED` | RESEND_API_KEY or AUTH_OTP_EMAIL_FROM missing |
| 502 | `AUTH_OTP_GENERATE_FAILED` | Supabase admin API error |
| 429 | `AUTH_EMAIL_PROVIDER_RATE_LIMITED` | Resend rate limit |
| 502 | `AUTH_EMAIL_PROVIDER_DELIVERY_FAILED` | Resend failure |

**Phone fallback path:**
V2 `sendOtp()` in `authService.js:730-748` calls `supabase.auth.signInWithOtp({ phone })` direct (skipping Worker).

### Endpoint 2: Verify OTP (Supabase native, NO Worker)

| Field | Value |
|---|---|
| Method | `supabase.auth.verifyOtp({email/phone, token, type})` (Supabase JS SDK) |
| Location call | `apps/uzg-pwa/src/services/authService.js:792` |
| Type values | `'email'` (for email channel) OR `'sms'` (for phone) |

**Code (authService.js:766-822):**
```js
const payload = isEmailIdentifier(normalized)
  ? { email: normalized.toLowerCase(), token, type: 'email' }
  : { phone: normalizePhone(normalized), token, type: 'sms' }

const { data, error } = await supabase.auth.verifyOtp(payload)
```

**Returns:** Native Supabase `{ data: { session, user }, error }` — no Worker involvement.

### Endpoint 3: Logout (Supabase native)

**Code (authService.js:841-848):**
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

---

## §4 Database tables consumed

V2 Auth uses **Supabase Auth managed tables** (not user-defined):

| Table | Used | Notes |
|---|---|---|
| `auth.users` | Read by Supabase | Created on first OTP verify (signup-on-login) |
| `auth.sessions` | Managed by Supabase | Auto-managed |
| `auth.refresh_tokens` | Managed by Supabase | Auto-managed |
| (No custom OTP table) | — | Supabase generates + stores OTP internally |

**No user-defined tables** for OTP storage. Supabase Admin API `/auth/v1/admin/generate_link` (type=magiclink) generates and stores OTP server-side; returns `email_otp` in response.

---

## §5 RPCs consumed

V2 Auth does NOT use any custom RPCs. Pure Supabase Auth API:
- `supabase.auth.signInWithOtp()` (Supabase native, fallback path)
- `supabase.auth.verifyOtp()` (Supabase native)
- `supabase.auth.signOut()` (Supabase native)
- `supabase.auth.getSession()` (Supabase native)
- `supabase.auth.onAuthStateChange()` (Supabase native)

Worker uses: `POST /auth/v1/admin/generate_link` (Supabase Admin REST, type=magiclink).

---

## §6 Realtime channels

**None.** Auth doesn't subscribe to Realtime. Session state managed via Supabase JS client localStorage + `onAuthStateChange` callback.

---

## §7 Email template (Resend) — EXACT

### Subject
```
Your UZG+ sign-in code
```

### From address
- **Env:** `AUTH_OTP_EMAIL_FROM` (primary)
- **Fallback:** `RESEND_FROM_EMAIL` OR `RESEND_FROM`
- **Format:** `${fromName} <${fromEmail}>` (e.g. `UZG+ <noreply@uzg.plus>`)
- **Reply-to:** `AUTH_OTP_REPLY_TO` OR `RESEND_REPLY_TO` (optional)

### HTML template (`_worker.js:3867-3888` EXACT)
```html
<div style="font-family:Arial,sans-serif;background:#f6f7fb;padding:24px;color:#111827;">
  <div style="max-width:520px;margin:0 auto;background:#ffffff;border-radius:20px;padding:32px;border:1px solid #e5e7eb;">
    <p style="margin:0 0 12px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#2563eb;">UZG+ Access</p>
    <h1 style="margin:0 0 12px;font-size:28px;line-height:1.2;color:#0f172a;">Your sign-in code</h1>
    <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">Enter this one-time code in the UZG+ app to continue.</p>
    <div style="margin:0 0 24px;padding:18px 20px;border-radius:18px;background:#eff6ff;border:1px solid #bfdbfe;text-align:center;">
      <span style="display:block;font-size:34px;line-height:1.1;font-weight:700;letter-spacing:0.22em;color:#1d4ed8;">${safeCode}</span>
    </div>
    <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#334155;">Enter the code directly in the UZG+ app. Only the newest code stays valid.</p>
    <p style="margin:0;font-size:13px;line-height:1.6;color:#64748b;">This code expires automatically. ${safeSupportEmail ? `If you need help, reply to ${safeSupportEmail}.` : ''}</p>
  </div>
</div>
```

### Text fallback (`_worker.js:3853-3865` EXACT)
```
Your UZG+ sign-in code is:

${otpCode}

Use this code in the UZG+ app. Only the newest code stays valid.
Need help? Contact ${supportEmail}
```

### Resend API call (`_worker.js:3934-3956` EXACT)
```js
fetch('https://api.resend.com/emails', {
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

---

## §8 Edge cases V2 handles

| Edge case | V2 behavior |
|---|---|
| Empty identifier | Throw `'Email or phone is required.'` |
| Phone identifier via Worker | Worker returns 400 `AUTH_OTP_EMAIL_ONLY_GATEWAY`, frontend falls back to `supabase.auth.signInWithOtp({phone})` direct |
| Worker unavailable (404 / `AUTH_OTP_GATEWAY_NOT_CONFIGURED` / `AUTH_EMAIL_PROVIDER_NOT_CONFIGURED`) | Falls back to `supabase.auth.signInWithOtp({email})` direct |
| OTP expired | Error message: `'That code is no longer valid. Request a new code and try again.'` |
| Rate limit (429) | Error message: `'Email delivery is cooling down. Wait about Xs, then request a new code.'` (uses `cooldown_seconds` from response) |
| Network error | Error message: `'We could not reach the login service. Check your connection and try again.'` |
| Resend cooldown | Default 60s, configurable via `AUTH_OTP_RESEND_COOLDOWN_SECONDS` env |
| First-time user (signup-on-login) | Supabase Admin `generate_link` creates user automatically; `app_metadata.providers = ['email']`, NO password set |

### V2 frontend signup vs login
**V2 has NO separate signup form.** Single `LoginPage` handles both:
- Existing user → OTP verify → session
- New user → first OTP verify → user auto-created → session
- Identical flow at frontend, signup-on-login pattern

**Verified:** No `SignupPage*` exists in `apps/uzg-pwa/src/pages/` for V2.

---

## §9 V3 Sprint 5.1 + 5.10 wiring assessment

### Sprint 5.1 (initial) — ❌ COMPLETELY WRONG
- Used `signInWithPassword` and `signUp` with password
- V2 users have no password → all logins failed

### Sprint 5.10 (hotfix) — ⚠️ PARTIAL FIX (50% match)

| Item | V2 EXACT | Sprint 5.10 V3 | Match |
|---|---|---|---|
| Endpoint URL | `/api/v1/auth/otp/request` | `/api/v1/auth/otp/request` | ✅ |
| Request field name | `identifier` | `identifier` | ✅ |
| `emailRedirectTo` value | `${origin}/dashboard` (V2 default) | `${origin}/v3/` | ⚠️ DIFFERENT (V3 redirects to /v3/) |
| OTP UI slots | **8 slots** (OTP_MAX_LENGTH=8) | **6 slots** hardcoded | ❌ MISMATCH |
| OTP min length | **6** (OTP_MIN_LENGTH=6) | **6** | ✅ |
| OTP max length | **8** (OTP_MAX_LENGTH=8) | **6** hardcoded | ❌ MISMATCH |
| Auto-submit on N digits | At 6+ (button enabled) | At 6 (auto-submit) | ⚠️ V3 too aggressive |
| Verify mechanism | `supabase.auth.verifyOtp({type: 'email'})` | `supabase.auth.verifyOtp({type: 'email'})` | ✅ |
| Phone identifier support | YES (auto-detect via @) | NO (email-only enforced) | ❌ MISMATCH |
| Worker fallback | YES (Supabase direct on Worker fail) | YES | ✅ |
| Vietnamese labels | "Vào UZG+", "Gửi mã", "Xác minh", "Nhập mã xác minh" | "Đăng nhập", "Gửi mã xác thực", "Xác thực", "Nhập mã xác thực" | ⚠️ PARAPHRASE (different wording) |
| Logout | `supabase.auth.signOut()` | `supabase.auth.signOut()` | ✅ |
| Signup form | NO separate (single LoginPage) | YES separate `/v3/signup` route | ⚠️ DIVERGENT (V3 has signup page V2 doesn't) |

**Match score: 6/13 items match (46%) — significant divergence**

---

## §10 V3 Sprint 5.11 fix recommendations (CRITICAL)

### Priority 1: OTP UI 8 slots (P0 — primary user complaint)

**File:** `apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx`
**Change:** `const OTP_LENGTH = 6` → `const OTP_MIN_LENGTH = 6; const OTP_MAX_LENGTH = 8`
- UI: render 8 slots (matching V2)
- Accept 6-8 digits input
- Auto-submit ONLY when reaching MAX_LENGTH (8) OR user explicit click "Xác minh" at 6+ digits
- Pattern: replicate V2 LoginPage.jsx state machine

### Priority 2: Vietnamese labels match V2 EXACT

**File:** `apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx` + `LoginForm.tsx`

| Sprint 5.10 V3 | Should be V2 EXACT |
|---|---|
| "Nhập mã xác thực" | `'Nhập mã xác minh'` |
| "Xác thực" | `'Xác minh'` |
| "Gửi mã xác thực" | `'Gửi mã'` |
| "Mã 6 số đã gửi tới X" | `'Đã gửi tới X'` |
| "Đăng nhập" (title) | `'Vào UZG+'` |

### Priority 3: Phone OTP support

**File:** `apps/uzg-pwa/src/lib/auth-v3/otpClient.ts`
**Change:** Identifier accepts email OR phone (auto-detect `@`). Phone path → direct `supabase.auth.signInWithOtp({phone})`. Match V2 `sendOtp()` exactly.

### Priority 4: Decide signup separate route OR unified

**Option A (V2 EXACT):** Delete `/v3/signup` route + `SignupForm.tsx`. Use single `/v3/login` for both new + existing users (signup-on-login). UPDATE `LoginForm` description: `'Đăng nhập / Đăng ký không cần mật khẩu'`.

**Option B (V3 keep separate):** Keep `/v3/signup` page but route both signup and login through SAME OTP flow. Display different headline/copy only.

**Recommendation:** Option A (matches V2 EXACT, simpler).

### Priority 5: emailRedirectTo

**File:** `apps/uzg-pwa/src/lib/auth-v3/otpClient.ts:14-19`
**Current:** `${origin}/v3/`
**V2:** `${origin}/dashboard` (V2 standard) but V3 should use `${origin}/v3/home` to land in V3 logged-in state.

**Recommendation:** Keep V3-specific `${origin}/v3/home` (different app, different landing). Document this divergence.

### Priority 6: Auto-submit threshold

**File:** `apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx:35-40`
**Current:** Auto-submit when 6 digits entered
**V2:** Submit button enabled at 6+ digits but user must click

**Recommendation:** Keep auto-submit BUT only when MAX_LENGTH (8) reached for keyboard fast-typers. For 6-7 digit codes, user clicks "Xác minh" manually.

### Sprint 5.11 scope estimate
- OtpEntryFormV3 refactor: ~15 min
- LoginForm Vietnamese labels: ~5 min
- otpClient.ts phone support: ~10 min
- Decision A (delete /v3/signup) OR B (keep): ~10-20 min
- Tests + audit: ~15 min
- **Total: ~50-65 min**

---

## §11 Code references

### LoginPage.jsx (V2 frontend)
- `:24-25` — OTP_MIN_LENGTH=6, OTP_MAX_LENGTH=8
- `:35-47` — useState declarations
- `:79-80` — otpDigits computed memo
- `:80` — otpSlots Array.from({ length: OTP_MAX_LENGTH }) — **UI shows 8 slots**
- `:88-130` — requestOtp function (sendOtp + cooldown)
- `:154-189` — handleVerifyOtp function
- `:208-210` — handleOtpChange (digits-only filter)
- `:251-283` — Stage 1 identifier form
- `:284-360` — Stage 2 OTP form
- `:334` — `disabled={loadingVerify || otpDigits.length < OTP_MIN_LENGTH}` — submit at 6+

### authService.js (V2 client)
- `:14` — DEFAULT_OTP_RESEND_COOLDOWN_SECONDS = 60
- `:589-622` — requestEmailOtpGateway (Worker call)
- `:624-632` — shouldFallbackToDirectEmailOtp
- `:673-748` — sendOtp (full email + phone branches)
- `:766-822` — verifyOtpCode
- `:841-848` — logout

### _worker.js (V2 backend)
- `:47494` — Route: `if (pathname === '/api/v1/auth/otp/request' && request.method === 'POST') return handleAuthOtpRequest(request, env)`
- `:3966-4068` — handleAuthOtpRequest
- `:3890-3928` — generateAuthOtpEmailPayload (Supabase admin generate_link)
- `:3930-3964` — sendResendAuthOtpEmail (Resend API call)
- `:3853-3865` — buildAuthOtpEmailText
- `:3867-3888` — buildAuthOtpEmailHtml
- `:3822-3851` — resolveAuthOtpEmailGatewayConfig (envs: RESEND_API_KEY, AUTH_OTP_EMAIL_FROM)

### languageFoundation.js (Vietnamese labels)
- `:2970-3030` — Vietnamese login section EXACT

### Sprint 5.10 V3 (current incorrect)
- `apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx:8` — `const OTP_LENGTH = 6` (HARDCODED 6, should be 6-8)
- `apps/uzg-pwa/src/components/auth-v3/OtpEntryFormV3.tsx:27` — `digits.padEnd(OTP_LENGTH, ' ').split('').slice(0, OTP_LENGTH)` — only 6 slots
- `apps/uzg-pwa/src/lib/auth-v3/otpClient.ts:13` — `WORKER_OTP_ENDPOINT = '/api/v1/auth/otp/request'` (CORRECT)
- `apps/uzg-pwa/src/lib/auth-v3/otpClient.ts:38` — `JSON.stringify({ identifier: trimmed, emailRedirectTo })` (CORRECT field name)
